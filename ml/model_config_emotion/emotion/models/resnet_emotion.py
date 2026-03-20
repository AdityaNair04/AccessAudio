"""
ResNet50 model for emotion recognition
"""
import torch
import torch.nn as nn
from torchvision import models

class EmotionResNet50(nn.Module):
    """
    ResNet50 backbone for emotion classification
    """
    
    def __init__(self, num_classes=8, pretrained=True, dropout=0.5):
        """
        Args:
            num_classes: Number of emotion classes (8 for AffectNet)
            pretrained: Use ImageNet pretrained weights
            dropout: Dropout probability before final layer
        """
        super(EmotionResNet50, self).__init__()
        
        # Load pretrained ResNet50
        self.resnet = models.resnet50(pretrained=pretrained)
        
        # Get number of features from the last layer
        num_features = self.resnet.fc.in_features
        
        # Replace the final fully connected layer
        # Add dropout for regularization
        self.resnet.fc = nn.Sequential(
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
        return self.resnet(x)
    
    def get_features(self, x):
        """
        Extract features before the final classification layer
        Useful for visualization or transfer learning
        
        Args:
            x: Input tensor (B, 3, 224, 224)
        
        Returns:
            Feature vector (B, 2048)
        """
        # Forward through all layers except the final FC
        x = self.resnet.conv1(x)
        x = self.resnet.bn1(x)
        x = self.resnet.relu(x)
        x = self.resnet.maxpool(x)
        
        x = self.resnet.layer1(x)
        x = self.resnet.layer2(x)
        x = self.resnet.layer3(x)
        x = self.resnet.layer4(x)
        
        x = self.resnet.avgpool(x)
        x = torch.flatten(x, 1)
        
        return x
    
    def freeze_backbone(self):
        """
        Freeze all layers except the final classification layer
        Useful for fine-tuning on small datasets
        """
        for name, param in self.resnet.named_parameters():
            if 'fc' not in name:
                param.requires_grad = False
    
    def unfreeze_backbone(self):
        """Unfreeze all layers for full training"""
        for param in self.resnet.parameters():
            param.requires_grad = True
    
    def unfreeze_last_n_blocks(self, n=2):
        """
        Unfreeze the last n residual blocks for fine-tuning
        
        Args:
            n: Number of blocks to unfreeze (1-4)
        """
        # First freeze everything
        self.freeze_backbone()
        
        # Unfreeze last n layers
        layers_to_unfreeze = []
        if n >= 1:
            layers_to_unfreeze.append('layer4')
        if n >= 2:
            layers_to_unfreeze.append('layer3')
        if n >= 3:
            layers_to_unfreeze.append('layer2')
        if n >= 4:
            layers_to_unfreeze.append('layer1')
        
        for name, param in self.resnet.named_parameters():
            for layer_name in layers_to_unfreeze:
                if layer_name in name or 'fc' in name:
                    param.requires_grad = True
                    break


class EmotionResNet50V2(nn.Module):
    """
    Alternative ResNet50 with more sophisticated head
    Better for complex emotion recognition tasks
    """
    
    def __init__(self, num_classes=8, pretrained=True, dropout=0.5):
        super(EmotionResNet50V2, self).__init__()
        
        # Load pretrained ResNet50
        resnet = models.resnet50(pretrained=pretrained)
        
        # Remove the final FC layer
        self.features = nn.Sequential(*list(resnet.children())[:-1])
        
        # Custom classification head
        num_features = 2048  # ResNet50 output features
        
        self.classifier = nn.Sequential(
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


def create_model(num_classes=8, pretrained=True, dropout=0.5, version='v1'):
    """
    Factory function to create emotion recognition model
    
    Args:
        num_classes: Number of emotion classes
        pretrained: Use ImageNet pretrained weights
        dropout: Dropout probability
        version: 'v1' (simple) or 'v2' (complex head)
    
    Returns:
        Emotion recognition model
    """
    if version == 'v1':
        model = EmotionResNet50(num_classes, pretrained, dropout)
    elif version == 'v2':
        model = EmotionResNet50V2(num_classes, pretrained, dropout)
    else:
        raise ValueError(f"Unknown version: {version}")
    
    return model


if __name__ == "__main__":
    # Test model creation
    model = create_model(num_classes=8, pretrained=True)
    
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
