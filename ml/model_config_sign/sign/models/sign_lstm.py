"""
LSTM/GRU model for sign language recognition from landmark sequences
"""
import torch
import torch.nn as nn


class Attention(nn.Module):
    """Simple attention mechanism over temporal dimension"""
    
    def __init__(self, hidden_size):
        super(Attention, self).__init__()
        self.attention = nn.Sequential(
            nn.Linear(hidden_size, hidden_size // 2),
            nn.Tanh(),
            nn.Linear(hidden_size // 2, 1)
        )
    
    def forward(self, rnn_output):
        """
        Args:
            rnn_output: (batch, seq_len, hidden_size)
        Returns:
            context: (batch, hidden_size)
            weights: (batch, seq_len)
        """
        attn_weights = self.attention(rnn_output).squeeze(-1)  # (batch, seq_len)
        attn_weights = torch.softmax(attn_weights, dim=1)
        context = torch.bmm(attn_weights.unsqueeze(1), rnn_output).squeeze(1)  # (batch, hidden_size)
        return context, attn_weights


class SignLanguageLSTM(nn.Module):
    """
    Bidirectional LSTM with attention for sign language recognition.
    
    Input: (batch, sequence_length, feature_dim) - landmark sequences
    Output: (batch, num_classes) - class logits
    """
    
    def __init__(self, input_size=225, hidden_size=256, num_layers=2,
                 num_classes=100, dropout=0.3, bidirectional=True,
                 use_attention=True):
        super(SignLanguageLSTM, self).__init__()
        
        self.hidden_size = hidden_size
        self.num_layers = num_layers
        self.bidirectional = bidirectional
        self.use_attention = use_attention
        self.num_directions = 2 if bidirectional else 1
        
        # Input normalization
        self.input_bn = nn.BatchNorm1d(input_size)
        
        # LSTM layers
        self.lstm = nn.LSTM(
            input_size=input_size,
            hidden_size=hidden_size,
            num_layers=num_layers,
            batch_first=True,
            dropout=dropout if num_layers > 1 else 0,
            bidirectional=bidirectional
        )
        
        # Attention
        rnn_output_size = hidden_size * self.num_directions
        if use_attention:
            self.attention = Attention(rnn_output_size)
        
        # Classification head
        self.classifier = nn.Sequential(
            nn.Linear(rnn_output_size, hidden_size),
            nn.ReLU(inplace=True),
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
        batch_size = x.size(0)
        
        # Apply batch normalization on features
        # Reshape for BN: (batch, feature_dim, seq_len) -> BN -> back
        x = x.permute(0, 2, 1)  # (batch, feature_dim, seq_len)
        x = self.input_bn(x)
        x = x.permute(0, 2, 1)  # (batch, seq_len, feature_dim)
        
        # LSTM
        lstm_out, (h_n, c_n) = self.lstm(x)
        # lstm_out: (batch, seq_len, hidden_size * num_directions)
        
        if self.use_attention:
            # Attention over all timesteps
            context, _ = self.attention(lstm_out)
        else:
            # Use last hidden state
            if self.bidirectional:
                # Concatenate last hidden states from both directions
                h_forward = h_n[-2]  # Last forward layer
                h_backward = h_n[-1]  # Last backward layer
                context = torch.cat([h_forward, h_backward], dim=1)
            else:
                context = h_n[-1]
        
        # Classify
        logits = self.classifier(context)
        return logits


class SignLanguageGRU(nn.Module):
    """
    GRU variant - lighter and sometimes works equally well.
    """
    
    def __init__(self, input_size=225, hidden_size=256, num_layers=2,
                 num_classes=100, dropout=0.3, bidirectional=True,
                 use_attention=True):
        super(SignLanguageGRU, self).__init__()
        
        self.hidden_size = hidden_size
        self.num_layers = num_layers
        self.bidirectional = bidirectional
        self.use_attention = use_attention
        self.num_directions = 2 if bidirectional else 1
        
        # Input normalization
        self.input_bn = nn.BatchNorm1d(input_size)
        
        # GRU layers
        self.gru = nn.GRU(
            input_size=input_size,
            hidden_size=hidden_size,
            num_layers=num_layers,
            batch_first=True,
            dropout=dropout if num_layers > 1 else 0,
            bidirectional=bidirectional
        )
        
        rnn_output_size = hidden_size * self.num_directions
        if use_attention:
            self.attention = Attention(rnn_output_size)
        
        self.classifier = nn.Sequential(
            nn.Linear(rnn_output_size, hidden_size),
            nn.ReLU(inplace=True),
            nn.Dropout(dropout),
            nn.Linear(hidden_size, num_classes)
        )
        
        self.num_classes = num_classes
    
    def forward(self, x):
        batch_size = x.size(0)
        
        x = x.permute(0, 2, 1)
        x = self.input_bn(x)
        x = x.permute(0, 2, 1)
        
        gru_out, h_n = self.gru(x)
        
        if self.use_attention:
            context, _ = self.attention(gru_out)
        else:
            if self.bidirectional:
                h_forward = h_n[-2]
                h_backward = h_n[-1]
                context = torch.cat([h_forward, h_backward], dim=1)
            else:
                context = h_n[-1]
        
        logits = self.classifier(context)
        return logits


def create_model(model_type='lstm', input_size=225, hidden_size=256,
                 num_layers=2, num_classes=100, dropout=0.3,
                 bidirectional=True, use_attention=True):
    """
    Factory function to create sign language recognition model.
    
    Args:
        model_type: 'lstm' or 'gru'
        input_size: Feature dimension per frame
        hidden_size: LSTM/GRU hidden size
        num_layers: Number of RNN layers
        num_classes: Number of sign classes
        dropout: Dropout probability
        bidirectional: Use bidirectional RNN
        use_attention: Use attention mechanism
    
    Returns:
        Sign language recognition model
    """
    if model_type.lower() == 'lstm':
        model = SignLanguageLSTM(
            input_size=input_size,
            hidden_size=hidden_size,
            num_layers=num_layers,
            num_classes=num_classes,
            dropout=dropout,
            bidirectional=bidirectional,
            use_attention=use_attention
        )
    elif model_type.lower() == 'gru':
        model = SignLanguageGRU(
            input_size=input_size,
            hidden_size=hidden_size,
            num_layers=num_layers,
            num_classes=num_classes,
            dropout=dropout,
            bidirectional=bidirectional,
            use_attention=use_attention
        )
    else:
        raise ValueError(f"Unknown model type: {model_type}")
    
    return model


if __name__ == "__main__":
    # Test model
    model = create_model(model_type='lstm', num_classes=100)
    dummy_input = torch.randn(4, 30, 225)  # (batch, seq_len, features)
    output = model(dummy_input)
    print(f"Input shape: {dummy_input.shape}")
    print(f"Output shape: {output.shape}")
    
    total_params = sum(p.numel() for p in model.parameters())
    trainable_params = sum(p.numel() for p in model.parameters() if p.requires_grad)
    print(f"Total parameters: {total_params:,}")
    print(f"Trainable parameters: {trainable_params:,}")
