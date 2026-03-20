"""
Configuration file for emotion recognition training
"""
import torch

class Config:
    # Dataset paths
    AFFECTNET_PATH = "../affectnet"  # Path to folder containing train/val/test subdirectories
    
    # AffectNet has 8 emotions: 
    # 0: Neutral, 1: Happy, 2: Sad, 3: Surprise, 4: Fear, 5: Disgust, 6: Anger, 7: Contempt
    NUM_CLASSES = 8
    CLASS_NAMES = ['Neutral', 'Happy', 'Sad', 'Surprise', 'Fear', 'Disgust', 'Anger', 'Contempt']
    
    # For 7 basic emotions (if you want to exclude Contempt)
    # NUM_CLASSES = 7
    # CLASS_NAMES = ['Neutral', 'Happy', 'Sad', 'Surprise', 'Fear', 'Disgust', 'Anger']
    
    
    # Model configuration
    MODEL_ARCH = 'resnet50'  # Options: 'resnet50', 'mobilenetv2'
    MODEL_NAME = 'resnet50'
    PRETRAINED = True  # Use ImageNet pretrained weights
    INPUT_SIZE = 224  # Standard input size for both models
    DROPOUT = 0.5  # Dropout probability
    
    # Training hyperparameters
    BATCH_SIZE = 64  # Adjust based on GPU memory (32 for smaller GPUs)
    NUM_EPOCHS = 50
    LEARNING_RATE = 0.001
    WEIGHT_DECAY = 1e-4
    
    # Learning rate scheduler
    LR_SCHEDULER = 'StepLR'  # Options: 'StepLR', 'CosineAnnealing', 'ReduceLROnPlateau'
    LR_STEP_SIZE = 10  # For StepLR
    LR_GAMMA = 0.1  # For StepLR
    
    # Data augmentation
    USE_AUGMENTATION = True
    RANDOM_HORIZONTAL_FLIP = 0.5
    RANDOM_ROTATION = 15
    COLOR_JITTER = True
    
    # Training settings
    NUM_WORKERS = 4  # DataLoader workers
    PIN_MEMORY = True
    DEVICE = 'cuda' if torch.cuda.is_available() else 'cpu'
    
    # Checkpointing
    CHECKPOINT_DIR = './checkpoints'
    SAVE_FREQUENCY = 5  # Save every N epochs
    SAVE_BEST_ONLY = True  # Save only when validation accuracy improves
    
    # Early stopping
    EARLY_STOPPING_PATIENCE = 10  # Stop if no improvement for N epochs
    
    # Mixed precision training (faster on modern GPUs)
    USE_AMP = True  # Automatic Mixed Precision
    
    # For class imbalance (AffectNet is imbalanced)
    USE_CLASS_WEIGHTS = True  # Apply weighted loss
    
    # Validation
    VAL_SPLIT = 0.1  # 10% for validation if not using official split
    
    # Logging
    LOG_INTERVAL = 10  # Log every N batches
    TENSORBOARD = True  # Use TensorBoard logging
    
    # Inference
    CONFIDENCE_THRESHOLD = 0.5  # Minimum confidence for prediction

config = Config()
