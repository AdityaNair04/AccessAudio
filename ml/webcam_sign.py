import cv2
import torch
import numpy as np
import mediapipe as mp
import time
import sys
import os
import json

# Set paths to point to the architecture folders
ML_DIR = os.path.dirname(os.path.abspath(__file__))
SIGN_DIR = os.path.join(ML_DIR, "model_config_sign", "sign")

def load_label_map():
    """Loads the words dictionary from label_map_30.json"""
    json_path = os.path.join(ML_DIR, "label_map_30.json")
    try:
        with open(json_path, 'r') as f:
            data = json.load(f)
        
        # Build an array where the index matches the 'class_id'
        # The JSON uses video IDs as keys, so we extract the unique classes
        class_map = {}
        for video_id, meta in data.items():
            class_map[meta['class_id']] = meta['class_name']
            
        # Ensure we have 0-29 contiguous (or up to max)
        max_idx = max(class_map.keys())
        labels = ["Unknown"] * (max_idx + 1)
        for idx in class_map:
            labels[idx] = class_map[idx]
            
        return labels
    except Exception as e:
        print(f"[WARNING] Could not load label map. Outputting class indices instead. Error: {e}")
        return [f"Class {i}" for i in range(30)]

def get_sign_model():
    """Loads the Sign Language LSTM model"""
    sys.path.insert(0, SIGN_DIR)
    from models.sign_lstm import create_model
    from configs.config import config
    
    model = create_model(
        model_type=config.MODEL_TYPE,
        input_size=config.FEATURE_DIM,
        hidden_size=config.HIDDEN_SIZE,
        num_layers=config.NUM_LAYERS,
        num_classes=config.NUM_CLASSES,
        dropout=config.DROPOUT,
        bidirectional=config.BIDIRECTIONAL,
        use_attention=getattr(config, 'USE_ATTENTION', True)
    )
    
    weights = torch.load(os.path.join(SIGN_DIR, "best_model.pth.zip"), map_location='cpu', weights_only=False)
    if 'model_state_dict' in weights: weights = weights['model_state_dict']
    model.load_state_dict(weights)
    model.eval()
    
    # Clean sys path
    sys.path.pop(0)
    for mod in list(sys.modules.keys()):
        if mod.startswith('models') or mod.startswith('configs'):
            del sys.modules[mod]
            
    return model, config.SEQUENCE_LENGTH

def extract_keypoints(results):
    """
    Extracts 225 landmarks from Mediapipe Holistic model output.
    Format corresponds to the sign_lstm input:
    33 Pose Landmarks (x,y,z) + 21 Left Hand Landmarks (x,y,z) + 21 Right Hand Landmarks (x,y,z)
    (33 + 21 + 21) * 3 = 225
    """
    # Helper to flatten and default to zeros if not detected
    def to_array(landmark_list, count):
        if landmark_list:
            return np.array([[res.x, res.y, res.z] for res in landmark_list.landmark]).flatten()
        return np.zeros(count * 3)

    pose = to_array(results.pose_landmarks, 33)
    left_hand = to_array(results.left_hand_landmarks, 21)
    right_hand = to_array(results.right_hand_landmarks, 21)
    
    # Concatenate into 225-feature vector
    return np.concatenate([pose, left_hand, right_hand])

def main():
    print("Loading Sign Language LSTM Model...")
    model, SEQUENCE_LENGTH = get_sign_model()
    labels = load_label_map()
    print(f"Model loaded! Expecting {SEQUENCE_LENGTH} frame sequence.")
    
    # Initialize Mediapipe
    mp_holistic = mp.solutions.holistic
    mp_drawing = mp.solutions.drawing_utils
    
    # 30-Frame Rolling Window
    sequence = []
    
    # Inference Data tracking
    current_prediction = "Waiting for data..."
    current_confidence = 0.0
    
    # Open Webcam
    cap = cv2.VideoCapture(0)
    if not cap.isOpened():
        print("Error: Could not open webcam.")
        return
        
    print("\n--- Press 'q' to quit ---")
    
    prev_time = 0
    
    with mp_holistic.Holistic(min_detection_confidence=0.5, min_tracking_confidence=0.5) as holistic:
        while True:
            ret, frame = cap.read()
            if not ret: break
            
            # FPS Calculation
            current_time = time.time()
            fps = 1 / (current_time - prev_time) if prev_time > 0 else 0
            prev_time = current_time
            
            # Recolor Feed
            image = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            image.flags.writeable = False
            
            # Make Detections
            results = holistic.process(image)
            
            # Extract landmarks for model
            keypoints = extract_keypoints(results)
            sequence.append(keypoints)
            
            # Keep only the last SEQUENCE_LENGTH (30) frames
            if len(sequence) > SEQUENCE_LENGTH:
                sequence = sequence[-SEQUENCE_LENGTH:]
                
            # Run Inference if we have a full sequence window
            if len(sequence) == SEQUENCE_LENGTH:
                # Add batch dimension and convert to Tensor
                input_tensor = torch.tensor(np.array(sequence), dtype=torch.float32).unsqueeze(0)
                
                with torch.no_grad():
                    output = model(input_tensor)
                    probabilities = torch.nn.functional.softmax(output[0], dim=0)
                    confidence, class_idx = torch.max(probabilities, dim=0)
                    
                    # Store Result for display if confidence > threshold
                    if confidence.item() > 0.4:  # 40% confidence threshold
                        current_prediction = labels[class_idx.item()]
                        current_confidence = confidence.item()
            
            
            # Draw Mediapipe Landmarks visually on screen
            image.flags.writeable = True
            image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)
            
            # Hand Connections
            mp_drawing.draw_landmarks(image, results.left_hand_landmarks, mp_holistic.HAND_CONNECTIONS)
            mp_drawing.draw_landmarks(image, results.right_hand_landmarks, mp_holistic.HAND_CONNECTIONS)
            # Upper Pose Connections
            mp_drawing.draw_landmarks(image, results.pose_landmarks, mp_holistic.POSE_CONNECTIONS)
            
            # --- UI Overlays ---
            # Box for Word
            cv2.rectangle(image, (0,0), (640, 40), (245, 117, 16), -1)
            
            try:
                # Text for Word
                display_text = f"{current_prediction} ({(current_confidence*100):.1f}%)"
                cv2.putText(image, display_text, (10,30), cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 255, 255), 2, cv2.LINE_AA)
            except Exception as e:
                pass
                
            # FPS Overlay
            cv2.putText(image, f"FPS: {fps:.1f}", (10, 70), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 255, 0), 2)
            # Frame Count Overlay
            cv2.putText(image, f"Frames: {len(sequence)}/{SEQUENCE_LENGTH}", (10, 100), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 255, 0), 2)
            
            # Show to screen
            cv2.imshow('Sign Language Recognition Test', image)
            
            # Break gracefully
            if cv2.waitKey(10) & 0xFF == ord('q'):
                break
                
    cap.release()
    cv2.destroyAllWindows()

if __name__ == "__main__":
    main()
