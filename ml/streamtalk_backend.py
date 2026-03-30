import asyncio
import cv2
import torch
import numpy as np
import pandas as pd
import mediapipe as mp
import time
import sys
import os
import json
import base64
from collections import deque
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from google import genai
from google.genai.errors import APIError
from dotenv import load_dotenv

# Load environment variables from .env file for local development
load_dotenv()

os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'
import tensorflow as tf

ML_DIR = os.path.dirname(os.path.abspath(__file__))
EMOTION_DIR = os.path.join(ML_DIR, "model_config_emotion", "emotion")
TFLITE_MODEL_PATH = os.path.join(ML_DIR, "models", "model.tflite")

# --- Model Loaders ---
def load_v3_label_map():
    csv_path = os.path.join(ML_DIR, "models", "train.csv")
    try:
        train = pd.read_csv(csv_path)
        train['sign_ord'] = train['sign'].astype('category').cat.codes
        ord2sign = train[['sign_ord', 'sign']].set_index('sign_ord').squeeze().to_dict()
        return ord2sign
    except Exception as e:
        print(f"[WARNING] Could not load TFLite label map. Error: {e}")
        return {i: f"Class {i}" for i in range(250)}

def get_emotion_model():
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

def get_sign_model_tflite():
    interpreter = tf.lite.Interpreter(model_path=TFLITE_MODEL_PATH)
    prediction_fn = interpreter.get_signature_runner("serving_default")
    seq_len = 30
    return prediction_fn, seq_len

def extract_keypoints_tflite(results):
    pose = np.array([[res.x, res.y, res.z] for res in results.pose_landmarks.landmark]).flatten() if results.pose_landmarks else np.full(33*3, np.nan)
    face = np.array([[res.x, res.y, res.z] for res in results.face_landmarks.landmark]).flatten() if results.face_landmarks else np.full(468*3, np.nan)
    lh = np.array([[res.x, res.y, res.z] for res in results.left_hand_landmarks.landmark]).flatten() if results.left_hand_landmarks else np.full(21*3, np.nan)
    rh = np.array([[res.x, res.y, res.z] for res in results.right_hand_landmarks.landmark]).flatten() if results.right_hand_landmarks else np.full(21*3, np.nan)
    
    all_keypoints = np.concatenate([face, lh, pose, rh])
    return np.reshape(all_keypoints, (543, 3))

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

async def fetch_gemini_translation(words, emotion):
    # Ensure key is available
    api_key = os.environ.get("GEMINI_API_KEY")
    if not api_key:
        error_msg = "[GEMINI ERROR] API key not configured on the server."
        print(error_msg)
        return error_msg

    print(f"💎 Initializing Gemini with key: {api_key[:5]}...{api_key[-5:]}")
    try:
        client = genai.Client(api_key=api_key)
        
        prompt = (
            f"Translate the following sequence of sign language words into a single, grammatically correct, natural-flowing sentence: '{' '.join(words)}'. "
            f"The user's detected emotion is '{emotion}'. "
            f"The final output MUST be only the translated sentence, followed by the emotion in parentheses. "
            f"For example: 'This is a translated sentence. (Happy)'. "
            f"DO NOT include any other explanatory text, quotes, or markdown."
        )
        
        print(f"📝 PROMPT FOR GEMINI:\n---\n{prompt}\n---")
        
        loop = asyncio.get_event_loop()
        
        def _call(model_name):
            print(f"🔄 Attempting translation with model: {model_name}")
            return client.models.generate_content(model=model_name, contents=prompt)
            
        try:
            # First choice: Gemini 2.0 Flash (latest speed/intelligence)
            response = await loop.run_in_executor(None, _call, 'gemini-2.0-flash')
        except Exception as e:
            print(f"⚠️ Primary model failed: {e}")
            # Fallback choice: Gemini Flash Latest (Stable 1.5 Flash line with high quota)
            print("🔄 Falling back to stable 'gemini-flash-latest'...")
            response = await loop.run_in_executor(None, _call, 'gemini-flash-latest')
        
        if not response or not hasattr(response, 'text') or not response.text:
            error_msg = f"[GEMINI ERROR] Received an empty or invalid response from the API. Response: {response}"
            print(f"⚠️ {error_msg}")
            return error_msg
            
        translated_text = response.text.strip()
        print(f"✅ Gemini Translated: {translated_text}")
        
        if f"({emotion})" not in translated_text:
            translated_text = f"{translated_text} ({emotion})"
            
        return translated_text
        
    except APIError as e:
        error_msg = f"[GEMINI API ERROR] {type(e).__name__}: {e}. Check your API key, billing, and permissions."
        print(f"❌ {error_msg}")
        return error_msg
    except Exception as e:
        error_msg = f"[GEMINI HANDLER ERROR] {type(e).__name__}: {e}"
        print(f"❌ {error_msg}")
        return error_msg

# --- FastAPI Initialization ---
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

print("Loading Models for Backend...")
emotion_model, emotion_labels = get_emotion_model()
sign_prediction_fn, SEQUENCE_LENGTH = get_sign_model_tflite()
sign_labels = load_v3_label_map()
print("Models Ready on ws://localhost:8000/ws !")

mp_holistic = mp.solutions.holistic
mp_face_detection = mp.solutions.face_detection

class ConnectionState:
    def __init__(self):
        self.sequence = []
        self.sign_buffer = []
        self.current_emotion = "Neutral"
        self.last_word_time = time.time()
        self.last_predicted_word = None
        
        self.prediction_history = deque(maxlen=3) # Reduced from 5 for faster detection
        self.in_cooldown = False
        self.cooldown_duration = 1.5 # Adjusted to perfectly balance natural sequence delays
        self.cooldown_start_time = 0
        self.epoch = 0
        
        self.frame_count = 0
        self.is_translating = False

# Active WebSocket connections
active_connections = {}

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    
    holistic = mp_holistic.Holistic(min_detection_confidence=0.5, min_tracking_confidence=0.5)
    face_detection = mp_face_detection.FaceDetection(min_detection_confidence=0.5)
    state = ConnectionState()
    
    try:
        while True:
            data = await websocket.receive_text()
            message = json.loads(data)
            
            if message.get("type") == "approve":
                print("\n[UI COMMAND] Received APPROVE -> Translating to Gemini...")
                state.epoch = message.get("epoch", state.epoch)
                if len(state.sign_buffer) > 0 and not state.is_translating:
                    state.is_translating = True
                    await websocket.send_json({"type": "translating"})
                    asyncio.create_task(run_translation(websocket, state, list(state.sign_buffer), state.current_emotion, state.epoch))
                    state.sign_buffer.clear()
                    state.last_predicted_word = None
                    state.prediction_history.clear()
                    state.sequence.clear()
                    state.in_cooldown = False
                    
            elif message.get("type") == "clear":
                print("\n[UI COMMAND] Received CLEAR -> Purging Buffer")
                state.epoch = message.get("epoch", state.epoch)
                state.sign_buffer.clear()
                state.last_predicted_word = None
                state.prediction_history.clear()
                state.sequence.clear()
                state.in_cooldown = False
                await websocket.send_json({"type": "buffer_update", "words": [], "status": "cleared", "epoch": state.epoch})
            
            elif message.get("type") == "frame":
                b64_data = message.get("image", "")
                if "," in b64_data:
                    b64_data = b64_data.split(",")[1]
                
                try:
                    img_data = base64.b64decode(b64_data)
                    np_arr = np.frombuffer(img_data, np.uint8)
                    frame = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)
                    if frame is None: continue
                except Exception as e:
                    continue
                
                state.frame_count += 1
                current_time = time.time()
                
                # Cooldown check
                if state.in_cooldown:
                    if (current_time - state.cooldown_start_time) > state.cooldown_duration:
                        state.in_cooldown = False
                        state.prediction_history.clear()
                        state.sequence.clear()
                
                image = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
                
                # --- 1. Sign Language Extraction ---
                if not state.in_cooldown:
                    results = await asyncio.to_thread(holistic.process, image)
                    keypoints = extract_keypoints_tflite(results)
                    state.sequence.append(keypoints)
                    
                    if len(state.sequence) > SEQUENCE_LENGTH:
                        state.sequence = state.sequence[-SEQUENCE_LENGTH:]
                    
                    hands_detected = results.left_hand_landmarks or results.right_hand_landmarks
                    
                    if hands_detected and len(state.sequence) == SEQUENCE_LENGTH:
                        res = np.array(state.sequence, dtype=np.float32)
                        prediction = sign_prediction_fn(inputs=res)
                        probs = prediction['outputs'][0]
                        sign_idx = np.argmax(probs)
                        sign_conf = probs[sign_idx]
                        
                        if sign_conf > 0.55: # Reduced from 0.6 for better sensitivity in cloud deployment
                            word = sign_labels[sign_idx]
                            state.prediction_history.append(word)
                            if len(state.prediction_history) == state.prediction_history.maxlen and len(set(state.prediction_history)) == 1:
                                if word != state.last_predicted_word:
                                    state.sign_buffer.append(word)
                                    state.last_predicted_word = word
                                    state.last_word_time = current_time
                                    state.in_cooldown = True
                                    state.cooldown_start_time = current_time
                                    
                                    # Broadcast buffer status to frontend
                                    await websocket.send_json({
                                        "type": "buffer_update",
                                        "words": list(state.sign_buffer),
                                        "status": "cooling_down",
                                        "epoch": state.epoch
                                    })
                                    print(f"Buffer: {state.sign_buffer}")

                # --- 2. Emotion Extraction (Every 10 frames) ---
                if state.frame_count % 10 == 0:
                    face_results = await asyncio.to_thread(face_detection.process, image)
                    if face_results.detections:
                        det = face_results.detections[0]
                        bboxC = det.location_data.relative_bounding_box
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
                                    if state.current_emotion != emotion_labels[em_idx]:
                                        state.current_emotion = emotion_labels[em_idx]
                                        await websocket.send_json({
                                            "type": "emotion_update",
                                            "emotion": state.current_emotion
                                        })
                            except: pass

                # Tell React client we are ready for the NEXT frame (Backpressure enforcement)
                # Removed explicit 'ack' to save massive downstream bandwidth; frontend now uses native TCP bufferedAmount

                # --- 3. Manual LLM Translation Trigger ---
                # The LLM is now strictly triggered via 'approve' messages 
                # from the sender's client-side React UI buttons. There is no auto-timeout.

    except WebSocketDisconnect:
        print("Client disconnected.")
    finally:
        holistic.close()
        face_detection.close()

async def run_translation(websocket: WebSocket, state: ConnectionState, words, emotion, epoch):
    try:
        sentence = await fetch_gemini_translation(words, emotion)
        await websocket.send_json({
            "type": "translation_result",
            "sentence": sentence,
            "emotion": emotion,
            "source": words,
            "epoch": epoch
        })
    except Exception as e:
        print(f"Translation Failure: {e}")
        # Send a minimal fallback payload so the UI unlocks
        await websocket.send_json({
            "type": "translation_result",
            "sentence": f"Translation error: {str(e)}",
            "emotion": emotion,
            "source": words,
            "epoch": epoch
        })
    finally:
        state.is_translating = False
    
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
