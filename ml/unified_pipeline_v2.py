import cv2
import torch
import numpy as np
import mediapipe as mp
import time
import sys
import os
import json
import threading
from google import genai
from google.genai.errors import APIError

# Suppress TF logging
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3' 
import tensorflow as tf

# Set paths to point to the architecture folders
ML_DIR = os.path.dirname(os.path.abspath(__file__))
EMOTION_DIR = os.path.join(ML_DIR, "model_config_emotion", "emotion")

# --- Model Loading Functions ---

def load_v2_label_map():
    json_path = os.path.join(ML_DIR, "label_map.json")
    try:
        with open(json_path, 'r') as f:
            data = json.load(f)
        
        # Max ID check
        max_idx = max(int(k) for k in data.keys())
        labels = ["Unknown"] * (max_idx + 1)
        
        for k, v in data.items():
            idx = int(k)
            # v looks like "40. I" or "1. Religion". Let's strip the number.
            if ". " in v:
                labels[idx] = v.split(". ", 1)[1].strip()
            else:
                labels[idx] = v.strip()
                
        return labels
    except Exception as e:
        print(f"[WARNING] Could not load label map. Error: {e}")
        return [f"Class {i}" for i in range(100)]

def get_emotion_model():
    # We still use PyTorch for the emotion model
    sys.path.insert(0, EMOTION_DIR)
    from models.mobilenet_emotion import create_mobilenet_model
    from configs.config import config as em_config
    
    emotions = em_config.CLASS_NAMES
    model = create_mobilenet_model(num_classes=em_config.NUM_CLASSES, pretrained=False, version='v1')
    weights = torch.load(os.path.join(EMOTION_DIR, "mobilenetv2.pth.zip"), map_location='cpu', weights_only=False)
    if 'model_state_dict' in weights: weights = weights['model_state_dict']
    model.load_state_dict(weights)
    model.eval()
    
    sys.path.pop(0)
    for mod in list(sys.modules.keys()):
        if mod.startswith('models') or mod.startswith('configs'):
            del sys.modules[mod]
    return model, emotions

def get_sign_model_keras():
    model_path = os.path.join(ML_DIR, "best_model_v2.h5")
    # Load Keras model
    model = tf.keras.models.load_model(model_path)
    seq_len = 30 # Matches the X.npy shape we verified
    return model, seq_len

def extract_keypoints(results):
    def to_array(landmark_list, count):
        if landmark_list:
            return np.array([[res.x, res.y, res.z] for res in landmark_list.landmark]).flatten()
        return np.zeros(count * 3)
    pose = to_array(results.pose_landmarks, 33)
    left_hand = to_array(results.left_hand_landmarks, 21)
    right_hand = to_array(results.right_hand_landmarks, 21)
    return np.concatenate([pose, left_hand, right_hand])

def process_face(model, face_image_bgr):
    img = cv2.resize(face_image_bgr, (224, 224))
    img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    img = img.astype(np.float32) / 255.0
    img = (img - [0.485, 0.456, 0.406]) / [0.229, 0.224, 0.225]
    img = np.transpose(img, (2, 0, 1))
    tensor_input = torch.tensor(img, dtype=torch.float32).unsqueeze(0)
    with torch.no_grad():
        output = model(tensor_input)
    probabilities = torch.nn.functional.softmax(output[0], dim=0)
    confidence, class_idx = torch.max(probabilities, dim=0)
    return class_idx.item(), confidence.item()

# --- LLM Integration ---
class LLMWorker(threading.Thread):
    def __init__(self, callback):
        super().__init__()
        self.callback = callback
        self.words = []
        self.emotion = ""
        self.active = False
        self.client = None
        
        # Check API Key
        if "GEMINI_API_KEY" not in os.environ:
            print("[WARNING] GEMINI_API_KEY environment variable not set. LLM translation will fail.")
            os.environ["GEMINI_API_KEY"] = "AIzaSyA7QoJ-arxPITlr0qnCuDM9RRw13WSPLao"
            
    def run(self):
        try:
            if not self.client:
                self.client = genai.Client()
                
            prompt = (
                f"You are a helpful translator. Translate these disjointed sign language words "
                f"into a single, grammatically correct, natural flowing sentence: {self.words}. "
                f"The user is feeling {self.emotion}. Give the response a subtle natural emotional tone matching this feeling. "
                f"Return ONLY the spoken sentence without any quotes or extra text."
            )
            
            response = self.client.models.generate_content(
                model='gemini-2.5-flash',
                contents=prompt
            )
            self.callback(response.text.strip(), self.words)
        except APIError as e:
            self.callback(f"[API Error - Check Key] {e}", self.words)
        except Exception as e:
            self.callback(f"[Translation Failed] {e}", self.words)
        finally:
            self.active = False

def main():
    print("Loading V2 Models (This might take a moment)...")
    emotion_model, emotion_labels = get_emotion_model()
    sign_model, SEQUENCE_LENGTH = get_sign_model_keras()
    sign_labels = load_v2_label_map()
    print("Models ready!")
    
    # State tracking
    sequence = []
    sign_buffer = []
    current_emotion = "Neutral"
    last_word_time = time.time()
    last_predicted_word = None
    
    # LLM State
    final_sentence = "Start signing..."
    llm_worker = None
    
    def on_llm_complete(sentence, words_used):
        nonlocal final_sentence
        final_sentence = f"{sentence} ({current_emotion})"
        print(f"\n[LLM Result] Source: {words_used} + Expected Emotion: {current_emotion}")
        print(f"Translation: {final_sentence}")
    
    # Initialization
    mp_holistic = mp.solutions.holistic
    mp_face_detection = mp.solutions.face_detection
    face_detection = mp_face_detection.FaceDetection(min_detection_confidence=0.5)
    
    cap = cv2.VideoCapture(0)
    frame_count = 0
    
    print("\n--- StreamTalk Unified Pipeline (V2 - Keras) ---")
    print("Sign words to build a sentence. Put hands down for 3 seconds to trigger LLM translation.")
    print("Press 'q' to quit.")
    
    with mp_holistic.Holistic(min_detection_confidence=0.5, min_tracking_confidence=0.5) as holistic:
        while True:
            ret, frame = cap.read()
            if not ret: break
            frame_count += 1
            
            image = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            image.flags.writeable = False
            
            # --- 1. Process Holistic (Signs) ---
            results = holistic.process(image)
            keypoints = extract_keypoints(results)
            sequence.append(keypoints)
            
            if len(sequence) > SEQUENCE_LENGTH:
                sequence = sequence[-SEQUENCE_LENGTH:]
                
            if len(sequence) == SEQUENCE_LENGTH:
                # Keras expects shape (batch, sequence, features)
                input_array = np.expand_dims(np.array(sequence), axis=0)
                
                # Predict
                probs = sign_model(input_array, training=False).numpy()[0]
                sign_idx = np.argmax(probs)
                sign_conf = probs[sign_idx]
                
                if sign_conf > 0.6:  # 60% confidence
                    word = sign_labels[sign_idx]
                    # Debounce: don't add the same word repeatedly
                    if word != last_predicted_word:
                        sign_buffer.append(word)
                        last_predicted_word = word
                        last_word_time = time.time()
                        print(f"[Sign Detected] {word} (Buffering...)")
            
            # --- 2. Process Face Emotion ---
            # Run emotion inference every 10 frames to save CPU
            if frame_count % 10 == 0:
                face_results = face_detection.process(image)
                if face_results.detections:
                    detection = face_results.detections[0] # Take first face
                    bboxC = detection.location_data.relative_bounding_box
                    h, w, _ = frame.shape
                    xmin, ymin = int(bboxC.xmin * w), int(bboxC.ymin * h)
                    width, height = int(bboxC.width * w), int(bboxC.height * h)
                    
                    pad_x, pad_y = int(width * 0.2), int(height * 0.2)
                    x1, y1 = max(0, xmin - pad_x), max(0, ymin - pad_y)
                    x2, y2 = min(w, xmin + width + pad_x), min(h, ymin + height + pad_y)
                    
                    if (x2 - x1) > 10 and (y2 - y1) > 10:
                        face_crop = frame[y1:y2, x1:x2]
                        try:
                            em_idx, em_conf = process_face(emotion_model, face_crop)
                            if em_conf > 0.4:
                                current_emotion = emotion_labels[em_idx]
                        except: pass
            
            # --- 3. Trigger LLM Logic ---
            # If we have at least 2 words and hands have been down/inactive for 3.0 seconds
            # Note: The buffer continues accumulating infinitely if the user signs continuously!
            time_since_last_word = time.time() - last_word_time
            if len(sign_buffer) >= 2 and time_since_last_word > 3.0:
                # Trigger LLM if not already running
                if llm_worker is None or not llm_worker.active:
                    final_sentence = "Translating sentence using LLM..."
                    
                    # Offload API call to a thread so webcam doesn't freeze
                    llm_worker = LLMWorker(callback=on_llm_complete)
                    llm_worker.words = list(sign_buffer) # Copy buffer
                    llm_worker.emotion = current_emotion
                    llm_worker.active = True
                    llm_worker.start()
                    
                    # Clear state for next sentence
                    sign_buffer.clear()
                    last_predicted_word = None
                    last_word_time = time.time() 
            
            # --- UI Rendering ---
            image.flags.writeable = True
            image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)
            
            # Overlay Backgrounds
            cv2.rectangle(image, (0, 0), (640, 90), (40, 40, 40), -1) # Top Header
            cv2.rectangle(image, (0, 420), (640, 480), (20, 20, 20), -1) # Bottom Footer
            
            # Text Overlays
            cv2.putText(image, f"Emotion: {current_emotion}", (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (200, 200, 255), 2)
            
            buffer_txt = " + ".join(sign_buffer) if sign_buffer else "(Waiting for signs...)"
            cv2.putText(image, f"Buffer: {buffer_txt}", (10, 65), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 255, 0), 2)
            
            cv2.putText(image, final_sentence, (10, 460), cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 255, 255), 2)
            
            cv2.imshow('V2 Keras Model Tester', image)
            
            if cv2.waitKey(10) & 0xFF == ord('q'):
                break
                
    cap.release()
    cv2.destroyAllWindows()
    face_detection.close()

if __name__ == "__main__":
    main()
