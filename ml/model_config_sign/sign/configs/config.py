"""
Configuration for Sign Language Recognition - Top 30 Signs
Uses original preprocessed 225-feature data for fastest results.
"""
import torch


class Config:
    # Dataset paths
    WLASL_PATH = "./wlasl"
    SPLIT_FILE = "nslt_100.json"
    CLASS_LIST_FILE = "wlasl_class_list.txt"
    PREPROCESSED_DIR = "./preprocessed"  # Original 225-feature data
    LABEL_MAP_FILE = "label_map_30.json"  # Top 30 signs
    
    # Number of classes
    NUM_CLASSES = 30
    
    # Feature dimensions (original MediaPipe landmarks)
    NUM_POSE_LANDMARKS = 33
    NUM_HAND_LANDMARKS = 21
    LANDMARK_DIM = 3
    FEATURE_DIM = (NUM_POSE_LANDMARKS + 2 * NUM_HAND_LANDMARKS) * LANDMARK_DIM  # 225
    
    # Sequence settings
    SEQUENCE_LENGTH = 30
    
    # Model - back to the LSTM that worked best
    MODEL_TYPE = 'lstm'
    HIDDEN_SIZE = 256
    NUM_LAYERS = 2
    BIDIRECTIONAL = True
    DROPOUT = 0.3
    USE_ATTENTION = True
    
    # Training
    BATCH_SIZE = 32
    LEARNING_RATE = 1e-3
    WEIGHT_DECAY = 1e-4
    NUM_EPOCHS = 100
    LABEL_SMOOTHING = 0.1
    
    # Scheduler
    SCHEDULER_TYPE = 'cosine'
    SCHEDULER_STEP = 20
    SCHEDULER_GAMMA = 0.5
    
    # Early stopping
    EARLY_STOPPING_PATIENCE = 20
    
    # Checkpointing
    CHECKPOINT_DIR = './checkpoints_30'
    SAVE_BEST_ONLY = True
    
    # Device
    DEVICE = 'cuda' if torch.cuda.is_available() else 'cpu'
    
    # DataLoader
    NUM_WORKERS = 4
    
    # TensorBoard
    TENSORBOARD = True
    
    # MediaPipe
    MIN_DETECTION_CONFIDENCE = 0.5
    MIN_TRACKING_CONFIDENCE = 0.5


config = Config()
