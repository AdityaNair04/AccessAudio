import torch

def test_model(model_path):
    print(f"\n--- Testing {model_path} ---")
    try:
        # 1. Try loading it as a complete TorchScript model
        model = torch.jit.load(model_path, map_location=torch.device('cpu'))
        model.eval() # Set model to evaluation mode
        print(f"[SUCCESS] Successfully loaded {model_path} as a full TorchScript model!")
        print("You can pass inputs directly to this model to get predictions.")
        return model
    except Exception as e:
        print("Could not load as TorchScript. Checking if it's a State Dictionary...")
        try:
            import sys
            import types
            # Mock the configs module
            if 'configs' not in sys.modules:
                configs = types.ModuleType('configs')
                sys.modules['configs'] = configs
                config_mod = types.ModuleType('configs.config')
                class Config: pass
                config_mod.Config = Config
                config_mod.config = Config()
                sys.modules['configs.config'] = config_mod
                configs.config = config_mod
            
            # Mock the models module
            if 'models' not in sys.modules:
                models = types.ModuleType('models')
                sys.modules['models'] = models
                resnet_mod = types.ModuleType('models.resnet_emotion')
                mobilenet_mod = types.ModuleType('models.mobilenet_emotion')
                sys.modules['models.resnet_emotion'] = resnet_mod
                sys.modules['models.mobilenet_emotion'] = mobilenet_mod
            
            # 2. Try loading it as a State Dictionary (weights only)
            weights = torch.load(model_path, map_location=torch.device('cpu'), weights_only=False)
            print(f"[SUCCESS] Successfully loaded {model_path} as a State Dictionary!")
            print("[WARNING] IMPORTANT: Because this is just weights, you MUST define the original PyTorch model class first, instantiate it, and then run `model.load_state_dict(weights)` to use it.")
        except Exception as e2:
            print(f"[ERROR] Failed to load {model_path}. Is the file corrupted? Error: {e2}")

if __name__ == "__main__":
    import os
    
    # Ensure we are running from the Project root
    ml_dir = os.path.join(os.path.dirname(__file__), "ml")
    
    # Test both downloaded models (the zip files)
    mobilenet_path = os.path.join(ml_dir, "mobilenetv2.pth.zip")
    best_model_path = os.path.join(ml_dir, "best_model.pth.zip")
    
    if os.path.exists(mobilenet_path):
        test_model(mobilenet_path)
    else:
        print(f"[ERROR] Could not find {mobilenet_path}")
        
    if os.path.exists(best_model_path):
        test_model(best_model_path)
    else:
        print(f"[ERROR] Could not find {best_model_path}")
