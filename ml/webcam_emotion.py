import cv2
import torch
import numpy as np
import mediapipe as mp
import time
import sys
import os

# Set paths to point to the architecture folders
ML_DIR = os.path.dirname(os.path.abspath(__file__))
EMOTION_DIR = os.path.join(ML_DIR, "model_config_emotion", "emotion")

def get_emotion_model():
    """Loads the Face Emotion model"""
    sys.path.insert(0, EMOTION_DIR)
    from models.mobilenet_emotion import create_mobilenet_model
    from configs.config import config
    
    # 8 Default emotions from the config
    emotions = config.CLASS_NAMES
    
    model = create_mobilenet_model(num_classes=config.NUM_CLASSES, pretrained=False, version='v1')
    weights = torch.load(os.path.join(EMOTION_DIR, "mobilenetv2.pth.zip"), map_location='cpu', weights_only=False)
    if 'model_state_dict' in weights: weights = weights['model_state_dict']
    model.load_state_dict(weights)
    model.eval()
    
    # Clean sys path
    sys.path.pop(0)
    for mod in list(sys.modules.keys()):
        if mod.startswith('models') or mod.startswith('configs'):
            del sys.modules[mod]
            
    return model, emotions

def process_face(model, face_image_bgr):
    """Predicts emotion from a cropped BGR face"""
    img = cv2.resize(face_image_bgr, (224, 224))
    img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    
    # Normalize image to [0,1], mean and std for ImageNet
    img = img.astype(np.float32) / 255.0
    img = (img - [0.485, 0.456, 0.406]) / [0.229, 0.224, 0.225]
    
    # HWC to CHW format for Pytorch
    img = np.transpose(img, (2, 0, 1))
    tensor_input = torch.tensor(img, dtype=torch.float32).unsqueeze(0)
    
    with torch.no_grad():
        output = model(tensor_input)
        
    probabilities = torch.nn.functional.softmax(output[0], dim=0)
    confidence, class_idx = torch.max(probabilities, dim=0)
    
    return class_idx.item(), confidence.item()

def main():
    print("Loading MobileNetV2 Emotion Model...")
    model, emotion_labels = get_emotion_model()
    print("Model loaded!")
    
    # Initialize Mediapipe Face Detection
    mp_face_detection = mp.solutions.face_detection
    face_detection = mp_face_detection.FaceDetection(model_selection=0, min_detection_confidence=0.5)
    
    # Open Webcam
    cap = cv2.VideoCapture(0)
    if not cap.isOpened():
        print("Error: Could not open webcam.")
        return
        
    print("\n--- Press 'q' to quit ---")
    
    prev_time = 0
    
    while True:
        ret, frame = cap.read()
        if not ret: break
        
        # Calculate FPS
        current_time = time.time()
        fps = 1 / (current_time - prev_time) if prev_time > 0 else 0
        prev_time = current_time
        
        # Convert to RGB for Mediapipe
        rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        results = face_detection.process(rgb_frame)
        
        h, w, _ = frame.shape
        
        if results.detections:
            for detection in results.detections:
                bboxC = detection.location_data.relative_bounding_box
                
                # Get Face Bounding Box Coordinates
                xmin = int(bboxC.xmin * w)
                ymin = int(bboxC.ymin * h)
                width = int(bboxC.width * w)
                height = int(bboxC.height * h)
                
                # Add padding to face crop (models usually like full head, not just tight face)
                padding_x = int(width * 0.2)
                padding_y = int(height * 0.2)
                
                x1 = max(0, xmin - padding_x)
                y1 = max(0, ymin - padding_y)
                x2 = min(w, xmin + width + padding_x)
                y2 = min(h, ymin + height + padding_y)
                
                # Draw Rectangle
                cv2.rectangle(frame, (x1, y1), (x2, y2), (255, 0, 0), 2)
                
                # Crop and Predict
                if (x2 - x1) > 10 and (y2 - y1) > 10: # Ensure valid crop
                    face_crop = frame[y1:y2, x1:x2]
                    try:
                        class_idx, confidence = process_face(model, face_crop)
                        emotion = emotion_labels[class_idx]
                        
                        # Display Text
                        text = f"{emotion} ({confidence*100:.1f}%)"
                        color = (0, 255, 0) if confidence > 0.5 else (0, 165, 255)
                        cv2.putText(frame, text, (x1, y1 - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.8, color, 2)
                    except Exception as e:
                        print(f"Prediction Error: {e}")
                        
        # Display FPS
        cv2.putText(frame, f"FPS: {fps:.1f}", (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (255, 255, 255), 2)
        
        cv2.imshow('Emotion Recognition Test', frame)
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break
            
    cap.release()
    cv2.destroyAllWindows()
    face_detection.close()

if __name__ == "__main__":
    main()
