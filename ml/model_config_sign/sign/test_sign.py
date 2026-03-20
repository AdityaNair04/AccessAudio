import torch
import sys
import os

# Add current directory to path so it finds configs/ and models/
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from models.sign_lstm import create_model
from configs.config import config

def test():
    model_path = "best_model.pth.zip"
    print(f"\n--- Testing Sign Model: {model_path} ---")
    
    try:
        print(f"[INFO] Initializing {config.MODEL_TYPE.upper()} architecture with {config.NUM_CLASSES} classes...")
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
        # Typically the input is (batch_size, sequence_length, feature_dim)
        seq_len = getattr(config, 'SEQUENCE_LENGTH', 30)
        feat_dim = config.FEATURE_DIM
        print(f"[INFO] Testing inference with dummy tensor (1 sequence, {seq_len} frames, {feat_dim} features)...")
        
        dummy_input = torch.randn(1, seq_len, feat_dim)
        
        with torch.no_grad():
            output = model(dummy_input)
            
        print(f"[SUCCESS] Inference works! Output shape: {output.shape} (Expected: 1, {config.NUM_CLASSES})")
        print(f"Sample raw logits: {output[0].numpy()[:5]}...") # print first 5
        
    except Exception as e:
        print(f"[ERROR] Failed to load/run model: {e}")

if __name__ == "__main__":
    test()
