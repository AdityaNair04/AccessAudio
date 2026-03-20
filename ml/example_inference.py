import torch
import cv2
import numpy as np
import sys
import os

# Set paths to point to the architecture folders we unzipped
ML_DIR = os.path.dirname(os.path.abspath(__file__))
EMOTION_DIR = os.path.join(ML_DIR, "model_config_emotion", "emotion")
SIGN_DIR = os.path.join(ML_DIR, "model_config_sign", "sign")

def get_emotion_model():
    """Loads the Face Emotion model"""
    sys.path.insert(0, EMOTION_DIR)
    from models.mobilenet_emotion import create_mobilenet_model
    from configs.config import config
    
    model = create_mobilenet_model(num_classes=config.NUM_CLASSES, pretrained=False, version='v1')
    weights = torch.load(os.path.join(EMOTION_DIR, "mobilenetv2.pth.zip"), map_location='cpu', weights_only=False)
    if 'model_state_dict' in weights: weights = weights['model_state_dict']
    model.load_state_dict(weights)
    model.eval()
    
    # Clean sys path and clear modules to prevent collisions
    sys.path.pop(0)
    for mod in list(sys.modules.keys()):
        if mod.startswith('models') or mod.startswith('configs'):
            del sys.modules[mod]
            
    return model

def get_sign_model():
    """Loads the Sign Language LSTM model"""
    sys.path.insert(0, SIGN_DIR)
    from models.sign_lstm import create_model
    from configs.config import config
    
    model = create_model(model_type=config.MODEL_TYPE, input_size=config.FEATURE_DIM, hidden_size=config.HIDDEN_SIZE, num_layers=config.NUM_LAYERS, num_classes=config.NUM_CLASSES, dropout=config.DROPOUT, bidirectional=config.BIDIRECTIONAL)
    weights = torch.load(os.path.join(SIGN_DIR, "best_model.pth.zip"), map_location='cpu', weights_only=False)
    if 'model_state_dict' in weights: weights = weights['model_state_dict']
    model.load_state_dict(weights)
    model.eval()
    
    # Clean sys path
    sys.path.pop(0)
    return model

def predict_emotion(model, face_image_bgr):
    """
    Args:
        model: The loaded Pytorch Emotion Model
        face_image_bgr: A cropped face image directly from cv2.imread or webcam
    """
    # 1. Preprocess the image
    img = cv2.resize(face_image_bgr, (224, 224))
    img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    
    # Normalize image to [0,1], mean and std for ImageNet
    img = img.astype(np.float32) / 255.0
    img = (img - [0.485, 0.456, 0.406]) / [0.229, 0.224, 0.225]
    
    # HWC to CHW format for Pytorch
    img = np.transpose(img, (2, 0, 1))
    
    # Convert to tensor and add batch dimension
    tensor_input = torch.tensor(img, dtype=torch.float32).unsqueeze(0)
    
    # 2. Run Inference
    with torch.no_grad():
        output = model(tensor_input)
        
    # 3. Get best prediction
    probabilities = torch.nn.functional.softmax(output[0], dim=0)
    confidence, class_idx = torch.max(probabilities, dim=0)
    
    return class_idx.item(), confidence.item()

def predict_sign(model, sequence_of_landmarks):
    """
    Args:
        model: The loaded Pytorch Sign LSTM Model
        sequence_of_landmarks: A numpy array or list of shape (30, 225)
    """
    # Convert features to tensor and add batch dimension
    tensor_input = torch.tensor(sequence_of_landmarks, dtype=torch.float32).unsqueeze(0)
    
    # Run Inference
    with torch.no_grad():
        output = model(tensor_input)
        
    probabilities = torch.nn.functional.softmax(output[0], dim=0)
    confidence, class_idx = torch.max(probabilities, dim=0)
    
    return class_idx.item(), confidence.item()

if __name__ == "__main__":
    print("Loading models...")
    emotion_model = get_emotion_model()
    sign_model = get_sign_model()
    print("Models loaded successfully and ready for webcam integration!")
