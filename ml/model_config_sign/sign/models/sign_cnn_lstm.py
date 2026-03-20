"""
CNN-LSTM Hybrid model for sign language recognition.
1D CNN extracts local temporal features, LSTM captures long-range dependencies.
Much more data-efficient than pure LSTM.
"""
import torch
import torch.nn as nn


class TemporalCNN(nn.Module):
    """1D CNN backbone for extracting local temporal patterns."""
    
    def __init__(self, input_dim, cnn_dim=128, dropout=0.3):
        super(TemporalCNN, self).__init__()
        
        self.conv_block = nn.Sequential(
            # Conv1: input_dim -> cnn_dim
            nn.Conv1d(input_dim, cnn_dim, kernel_size=3, padding=1),
            nn.BatchNorm1d(cnn_dim),
            nn.ReLU(inplace=True),
            nn.Dropout(dropout),
            
            # Conv2: cnn_dim -> cnn_dim
            nn.Conv1d(cnn_dim, cnn_dim, kernel_size=3, padding=1),
            nn.BatchNorm1d(cnn_dim),
            nn.ReLU(inplace=True),
            nn.Dropout(dropout),
            
            # Conv3: cnn_dim -> cnn_dim (with dilation for wider receptive field)
            nn.Conv1d(cnn_dim, cnn_dim, kernel_size=3, padding=2, dilation=2),
            nn.BatchNorm1d(cnn_dim),
            nn.ReLU(inplace=True),
            nn.Dropout(dropout),
        )
    
    def forward(self, x):
        """
        Args:
            x: (batch, seq_len, input_dim)
        Returns:
            (batch, seq_len, cnn_dim)
        """
        # Conv1d expects (batch, channels, seq_len)
        x = x.permute(0, 2, 1)
        x = self.conv_block(x)
        x = x.permute(0, 2, 1)
        return x


class Attention(nn.Module):
    """Attention over temporal dimension."""
    
    def __init__(self, hidden_size):
        super(Attention, self).__init__()
        self.attention = nn.Sequential(
            nn.Linear(hidden_size, hidden_size // 2),
            nn.Tanh(),
            nn.Linear(hidden_size // 2, 1)
        )
    
    def forward(self, rnn_output):
        attn_weights = self.attention(rnn_output).squeeze(-1)
        attn_weights = torch.softmax(attn_weights, dim=1)
        context = torch.bmm(attn_weights.unsqueeze(1), rnn_output).squeeze(1)
        return context, attn_weights


class SignLanguageCNNLSTM(nn.Module):
    """
    CNN-LSTM Hybrid for sign language recognition.
    
    Architecture:
        Input (batch, 30, 675)
        → 1D CNN backbone (local temporal features)
        → Bidirectional LSTM (long-range dependencies)
        → Attention (focus on important frames)
        → Classifier
    """
    
    def __init__(self, input_size=675, cnn_dim=128, hidden_size=128,
                 num_layers=2, num_classes=100, dropout=0.4,
                 bidirectional=True):
        super(SignLanguageCNNLSTM, self).__init__()
        
        self.num_directions = 2 if bidirectional else 1
        
        # 1D CNN backbone
        self.cnn = TemporalCNN(input_size, cnn_dim, dropout)
        
        # LSTM on top of CNN features
        self.lstm = nn.LSTM(
            input_size=cnn_dim,
            hidden_size=hidden_size,
            num_layers=num_layers,
            batch_first=True,
            dropout=dropout if num_layers > 1 else 0,
            bidirectional=bidirectional
        )
        
        # Attention
        rnn_output_size = hidden_size * self.num_directions
        self.attention = Attention(rnn_output_size)
        
        # Classifier
        self.classifier = nn.Sequential(
            nn.Linear(rnn_output_size, hidden_size),
            nn.ReLU(inplace=True),
            nn.BatchNorm1d(hidden_size),
            nn.Dropout(dropout),
            nn.Linear(hidden_size, num_classes)
        )
        
        self.num_classes = num_classes
    
    def forward(self, x):
        """
        Args:
            x: (batch, seq_len, feature_dim)
        Returns:
            logits: (batch, num_classes)
        """
        # CNN: extract local temporal features
        cnn_out = self.cnn(x)  # (batch, seq_len, cnn_dim)
        
        # LSTM: capture long-range dependencies
        lstm_out, _ = self.lstm(cnn_out)  # (batch, seq_len, hidden*2)
        
        # Attention: focus on important frames
        context, _ = self.attention(lstm_out)  # (batch, hidden*2)
        
        # Classify
        logits = self.classifier(context)
        return logits


def create_model(model_type='cnn_lstm', input_size=675, hidden_size=128,
                 num_layers=2, num_classes=100, dropout=0.4,
                 bidirectional=True, **kwargs):
    """
    Factory function for sign language models.
    """
    if model_type == 'cnn_lstm':
        model = SignLanguageCNNLSTM(
            input_size=input_size,
            cnn_dim=128,
            hidden_size=hidden_size,
            num_layers=num_layers,
            num_classes=num_classes,
            dropout=dropout,
            bidirectional=bidirectional
        )
    else:
        # Fallback to pure LSTM
        from models.sign_lstm import SignLanguageLSTM
        model = SignLanguageLSTM(
            input_size=input_size,
            hidden_size=hidden_size,
            num_layers=num_layers,
            num_classes=num_classes,
            dropout=dropout,
            bidirectional=bidirectional,
            use_attention=kwargs.get('use_attention', True)
        )
    
    return model


if __name__ == "__main__":
    # Test CNN-LSTM model
    model = create_model('cnn_lstm', input_size=675, num_classes=100)
    dummy = torch.randn(4, 30, 675)
    output = model(dummy)
    print(f"Input:  {dummy.shape}")
    print(f"Output: {output.shape}")
    
    total = sum(p.numel() for p in model.parameters())
    trainable = sum(p.numel() for p in model.parameters() if p.requires_grad)
    print(f"Total params:     {total:,}")
    print(f"Trainable params: {trainable:,}")
