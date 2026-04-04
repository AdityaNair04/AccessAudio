#!/usr/bin/env python3
"""
MobileHapticBridge: Local Flask-SocketIO server for Morse code vibration output to mobile devices.
Run this server on your laptop, connect phone via USB tethering, and access the client page.
"""

import socket
import threading
from flask import Flask, render_template_string
from flask_socketio import SocketIO, emit

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")

# Morse code dictionary
MORSE_CODE_DICT = {
    'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.',
    'F': '..-.', 'G': '--.', 'H': '....', 'I': '..', 'J': '.---',
    'K': '-.-', 'L': '.-..', 'M': '--', 'N': '-.', 'O': '---',
    'P': '.--.', 'Q': '--.-', 'R': '.-.', 'S': '...', 'T': '-',
    'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-', 'Y': '-.--',
    'Z': '--..', '1': '.----', '2': '..---', '3': '...--', '4': '....-',
    '5': '.....', '6': '-....', '7': '--...', '8': '---..', '9': '----.',
    '0': '-----'
}

def text_to_morse(text):
    """Convert text to Morse code string."""
    morse = []
    for char in text.upper():
        if char in MORSE_CODE_DICT:
            morse.append(MORSE_CODE_DICT[char])
        elif char == ' ':
            morse.append('/')  # Word separator
    return ' '.join(morse)

def morse_to_vibration_pattern(morse_string):
    """
    Convert Morse string to vibration pattern array.
    Dot: 200ms vibration, Dash: 600ms vibration, Gap: 200ms silence.
    """
    pattern = []
    for symbol in morse_string:
        if symbol == '.':
            pattern.extend([200, 200])  # vibrate 200ms, pause 200ms
        elif symbol == '-':
            pattern.extend([600, 200])  # vibrate 600ms, pause 200ms
        elif symbol == ' ':
            pattern.append(400)  # letter gap: 400ms silence
        elif symbol == '/':
            pattern.append(1000)  # word gap: 1000ms silence
    return pattern

@socketio.on('connect')
def handle_connect():
    print("📱 Mobile device connected for haptic feedback")
    emit('status', {'message': 'Connected to haptic bridge'})

@socketio.on('disconnect')
def handle_disconnect():
    print("📱 Mobile device disconnected")

@socketio.on('vibrate')
def handle_vibrate(data):
    """Receive vibration request and broadcast to all connected clients."""
    text = data.get('text', '')
    if not text:
        return

    morse = text_to_morse(text)
    pattern = morse_to_vibration_pattern(morse)

    print(f"🔊 Sending vibration for text: '{text}' -> Morse: '{morse}' -> Pattern: {pattern}")

    # Broadcast to all connected mobile clients
    emit('vibrate', {'pattern': pattern}, broadcast=True)

def get_local_ip():
    """Get the local IP address for USB tethering."""
    try:
        # Create a socket to determine local IP
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(("8.8.8.8", 80))  # Connect to Google DNS
        local_ip = s.getsockname()[0]
        s.close()
        return local_ip
    except Exception as e:
        print(f"❌ Could not determine local IP: {e}")
        return "127.0.0.1"

# HTML template for the mobile client
CLIENT_HTML = """
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mobile Haptic Bridge</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            text-align: center;
            padding: 20px;
            background-color: #f0f0f0;
        }
        button {
            font-size: 24px;
            padding: 20px;
            margin: 20px;
            border: none;
            border-radius: 10px;
            background-color: #4CAF50;
            color: white;
            cursor: pointer;
        }
        button:hover {
            background-color: #45a049;
        }
        #status {
            font-size: 18px;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <h1>Mobile Haptic Bridge</h1>
    <p>Tap to activate haptic feedback for Morse code vibrations</p>
    <button id="activateBtn">Activate Haptics</button>
    <div id="status">Waiting for activation...</div>

    <script src="https://cdn.socket.io/4.0.0/socket.io.min.js"></script>
    <script>
        const socket = io();
        let hapticsActivated = false;

        const activateBtn = document.getElementById('activateBtn');
        const statusDiv = document.getElementById('status');

        activateBtn.addEventListener('click', () => {
            if (!hapticsActivated) {
                // Request permission and activate
                if ('vibrate' in navigator) {
                    navigator.vibrate(100); // Test vibration
                    hapticsActivated = true;
                    activateBtn.textContent = 'Haptics Active';
                    activateBtn.style.backgroundColor = '#2196F3';
                    statusDiv.textContent = 'Haptics activated! Ready for vibrations.';
                } else {
                    statusDiv.textContent = 'Vibration not supported on this device.';
                }
            }
        });

        socket.on('connect', () => {
            statusDiv.textContent = 'Connected to laptop bridge.';
        });

        socket.on('disconnect', () => {
            statusDiv.textContent = 'Disconnected from laptop bridge.';
        });

        socket.on('vibrate', (data) => {
            if (hapticsActivated && 'vibrate' in navigator) {
                const pattern = data.pattern;
                navigator.vibrate(pattern);
                statusDiv.textContent = `Vibrating pattern: ${pattern.join(', ')}`;
            }
        });

        socket.on('status', (data) => {
            statusDiv.textContent = data.message;
        });
    </script>
</body>
</html>
"""

@app.route('/')
def index():
    return render_template_string(CLIENT_HTML)

if __name__ == '__main__':
    local_ip = get_local_ip()
    print("🚀 Starting MobileHapticBridge server...")
    print(f"📡 Local IP: {local_ip}")
    print(f"🌐 Access mobile client at: http://{local_ip}:5000")
    print("📱 Connect your phone via USB tethering and open the URL above")
    print("💡 Make sure your phone is connected to the same network or tethered")

    # Run the server
    socketio.run(app, host='0.0.0.0', port=5000, debug=True)