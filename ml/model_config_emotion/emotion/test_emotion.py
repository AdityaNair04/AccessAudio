import torch
import sys
import os

# Add current directory to path so it finds configs/ and models/
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from models.mobilenet_emotion import create_mobilenet_model
from configs.config import config

def test():
    model_path = "mobilenetv2.pth.zip"
    print(f"\n--- Testing Emotion Model: {model_path} ---")
    
    try:
        print(f"[INFO] Initializing MobileNetV2 architecture with {config.NUM_CLASSES} classes...")
        model = create_mobilenet_model(
            num_classes=config.NUM_CLASSES,
            pretrained=False, # We don't need ImageNet weights since we load ours
            dropout=config.DROPOUT,
            version='v1'
        )
        
        print("[INFO] Architecture created successfully. Loading weights...")
        
        # Load weights
        weights = torch.load(model_path, map_location=torch.device('cpu'), weights_only=False)
        
        # Check if the weights are wrapped in a dict (e.g. from a checkpoint)
        if 'model_state_dict' in weights:
            weights = weights['model_state_dict']
            
        model.load_state_dict(weights)
        model.eval()
        
        print("[SUCCESS] Model weights loaded into architecture successfully!")
        
        # Test Inference
        print("[INFO] Testing inference with dummy tensor (1 image, 3 channels, 224x224)...")
        # Typical MobileNetV2 input size is 224x224. Check config if different.
        input_size = getattr(config, 'INPUT_SIZE', 224)
        dummy_input = torch.randn(1, 3, input_size, input_size)
        
        with torch.no_grad():
            output = model(dummy_input)
            
        print(f"[SUCCESS] Inference works! Output shape: {output.shape} (Expected: 1, {config.NUM_CLASSES})")
        print(f"Sample raw logits: {output[0].numpy()}")
        
    except Exception as e:
        print(f"[ERROR] Failed to load/run model: {e}")

if __name__ == "__main__":
    test()
