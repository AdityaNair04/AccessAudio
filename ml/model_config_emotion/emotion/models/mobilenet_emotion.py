"""
MobileNetV2 model for emotion recognition
Lightweight alternative to ResNet50, optimized for speed
"""
import torch
import torch.nn as nn
from torchvision import models

class EmotionMobileNetV2(nn.Module):
    """
    MobileNetV2 backbone for emotion classification
    Much faster and lighter than ResNet50 (14MB vs 95MB)
    """
    
    def __init__(self, num_classes=8, pretrained=True, dropout=0.5):
        """
        Args:
            num_classes: Number of emotion classes (8 for AffectNet)
            pretrained: Use ImageNet pretrained weights
            dropout: Dropout probability before final layer
        """
        super(EmotionMobileNetV2, self).__init__()
        
        # Load pretrained MobileNetV2
        self.mobilenet = models.mobilenet_v2(pretrained=pretrained)
        
        # Get number of features from the last layer
        num_features = self.mobilenet.classifier[1].in_features
        
        # Replace the final classifier
        self.mobilenet.classifier = nn.Sequential(
            nn.Dropout(p=dropout),
            nn.Linear(num_features, num_classes)
        )
        
        self.num_classes = num_classes
    
    def forward(self, x):
        """
        Forward pass
        
        Args:
            x: Input tensor (B, 3, 224, 224)
        
        Returns:
            Output logits (B, num_classes)
        """
        return self.mobilenet(x)
    
    def get_features(self, x):
        """
        Extract features before the final classification layer
        
        Args:
            x: Input tensor (B, 3, 224, 224)
        
        Returns:
            Feature vector (B, 1280)
        """
        x = self.mobilenet.features(x)
        x = nn.functional.adaptive_avg_pool2d(x, (1, 1))
        x = torch.flatten(x, 1)
        return x
    
    def freeze_backbone(self):
        """
        Freeze all layers except the final classification layer
        Useful for fine-tuning on small datasets
        """
        for name, param in self.mobilenet.named_parameters():
            if 'classifier' not in name:
                param.requires_grad = False
    
    def unfreeze_backbone(self):
        """Unfreeze all layers for full training"""
        for param in self.mobilenet.parameters():
            param.requires_grad = True
    
    def unfreeze_last_n_blocks(self, n=2):
        """
        Unfreeze the last n inverted residual blocks for fine-tuning
        MobileNetV2 has 17 inverted residual blocks in total
        
        Args:
            n: Number of blocks to unfreeze from the end (1-17)
        """
        # First freeze everything
        self.freeze_backbone()
        
        # MobileNetV2 features are organized sequentially
        # Unfreeze last n blocks
        total_blocks = len(self.mobilenet.features)
        start_idx = max(0, total_blocks - n)
        
        for idx in range(start_idx, total_blocks):
            for param in self.mobilenet.features[idx].parameters():
                param.requires_grad = True
        
        # Always unfreeze classifier
        for param in self.mobilenet.classifier.parameters():
            param.requires_grad = True


class EmotionMobileNetV2_Enhanced(nn.Module):
    """
    Enhanced MobileNetV2 with custom classification head
    Better accuracy with slightly more parameters
    """
    
    def __init__(self, num_classes=8, pretrained=True, dropout=0.5):
        super(EmotionMobileNetV2_Enhanced, self).__init__()
        
        # Load pretrained MobileNetV2
        mobilenet = models.mobilenet_v2(pretrained=pretrained)
        
        # Extract features (everything except classifier)
        self.features = mobilenet.features
        
        # Custom classification head
        num_features = 1280  # MobileNetV2 output features
        
        self.classifier = nn.Sequential(
            nn.AdaptiveAvgPool2d((1, 1)),
            nn.Flatten(),
            nn.Linear(num_features, 512),
            nn.BatchNorm1d(512),
            nn.ReLU(inplace=True),
            nn.Dropout(p=dropout),
            nn.Linear(512, 256),
            nn.BatchNorm1d(256),
            nn.ReLU(inplace=True),
            nn.Dropout(p=dropout / 2),
            nn.Linear(256, num_classes)
        )
        
        self.num_classes = num_classes
    
    def forward(self, x):
        x = self.features(x)
        x = self.classifier(x)
        return x


def create_mobilenet_model(num_classes=8, pretrained=True, dropout=0.5, version='v1'):
    """
    Factory function to create MobileNetV2 emotion recognition model
    
    Args:
        num_classes: Number of emotion classes
        pretrained: Use ImageNet pretrained weights
        dropout: Dropout probability
        version: 'v1' (simple) or 'v2' (enhanced head)
    
    Returns:
        MobileNetV2 emotion recognition model
    """
    if version == 'v1':
        model = EmotionMobileNetV2(num_classes, pretrained, dropout)
    elif version == 'v2':
        model = EmotionMobileNetV2_Enhanced(num_classes, pretrained, dropout)
    else:
        raise ValueError(f"Unknown version: {version}")
    
    return model


if __name__ == "__main__":
    # Test model creation
    model = create_mobilenet_model(num_classes=8, pretrained=True)
    
    # Test forward pass
    dummy_input = torch.randn(4, 3, 224, 224)
    output = model(dummy_input)
    print(f"Input shape: {dummy_input.shape}")
    print(f"Output shape: {output.shape}")
    
    # Count parameters
    total_params = sum(p.numel() for p in model.parameters())
    trainable_params = sum(p.numel() for p in model.parameters() if p.requires_grad)
    print(f"Total parameters: {total_params:,}")
    print(f"Trainable parameters: {trainable_params:,}")
    
    # Compare with ResNet50
    print("\nComparison:")
    print("MobileNetV2: ~3.5M parameters, ~14MB model size")
    print("ResNet50: ~25M parameters, ~95MB model size")
    print("MobileNetV2 is ~7x smaller and 2-3x faster!")
