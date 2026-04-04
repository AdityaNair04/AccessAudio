# Mobile Haptic Bridge Setup

This feature allows Morse code vibrations to be sent to a mobile phone for tactile feedback.

## Setup Instructions

1. **Install Python Dependencies**:
   ```bash
   pip install -r haptic_requirements.txt
   ```

2. **Start the Haptic Bridge Server**:
   ```bash
   python haptic_bridge.py
   ```
   The server will print your local IP address (e.g., 192.168.1.100).

3. **Connect Your Phone**:
   - Connect phone to laptop via USB cable (enable USB tethering in phone settings)
   - Open browser on phone and go to: `http://[LOCAL_IP]:5000`
   - Tap "Activate Haptics" to enable vibration

4. **Enable in App**:
   - In the StreamTalk room, click the Smartphone icon in controls to enable vibration output
   - When text is generated (from sign language or speech), it will be converted to Morse and sent as vibrations

## How It Works

- Text → Morse Code → Vibration Pattern
- Dot: 200ms vibration + 200ms pause
- Dash: 600ms vibration + 200ms pause
- Word gap: 1000ms silence
- Letter gap: 400ms silence

## Troubleshooting

- Ensure phone is connected via USB tethering
- Check that haptic_bridge.py is running
- Verify phone browser supports navigator.vibrate()
- Connection status shown in console logs