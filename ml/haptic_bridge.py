"""
Mobile Haptic Bridge - WebSocket server for Morse code vibration output
Converts text → Morse code → vibration patterns for USB-tethered mobile devices
"""

import os
import sys
from flask import Flask, render_template_string
from flask_socketio import SocketIO, emit, request
import logging
from datetime import datetime

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

app = Flask(__name__)
app.config['SECRET_KEY'] = 'mobile-haptic-bridge-secret-key'
socketio = SocketIO(app, cors_allowed_origins="*", async_mode='threading')

# Store connected clients
connected_clients = {}

# Morse code definitions
MORSE_CODE_MAP = {
    'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
    'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
    'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
    'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
    'Y': '-.--', 'Z': '--..', '0': '-----', '1': '.----', '2': '..---',
    '3': '...--', '4': '....-', '5': '.....', '6': '-....', '7': '--...',
    '8': '---..', '9': '----.', ' ': '/'
}

def text_to_morse(text):
    """Convert text to Morse code"""
    morse = []
    for char in text.upper():
        if char in MORSE_CODE_MAP:
            morse.append(MORSE_CODE_MAP[char])
        elif char == ' ':
            morse.append('/')
    return ' '.join(morse)

def morse_to_vibration_pattern(morse_code):
    """
    Convert Morse code to vibration pattern
    Dot:      200ms vibration
    Dash:     600ms vibration
    Gap:      200ms silence between dot/dash
    Letter:   1000ms silence between letters
    Word:     1500ms silence between words
    """
    pattern = []
    dot_duration = 200      # ms
    dash_duration = 600     # ms
    gap_duration = 200      # ms between symbols
    letter_gap = 1000       # ms between letters
    word_gap = 1500         # ms between words
    
    symbols = morse_code.split(' ')
    
    for i, symbol in enumerate(symbols):
        if symbol == '/':  # Word separator
            if pattern and pattern[-1] != 0:
                pattern.append(0)
            pattern.append(word_gap)
        else:
            for j, char in enumerate(symbol):
                if char == '.':
                    pattern.append(dot_duration)      # Vibrate
                elif char == '-':
                    pattern.append(dash_duration)     # Vibrate
                
                if j < len(symbol) - 1:  # Gap between dot/dash
                    pattern.append(0)
                    pattern.append(gap_duration)
            
            if i < len(symbols) - 1 and symbols[i+1] != '/':  # Letter gap
                pattern.append(0)
                pattern.append(letter_gap)
    
    return pattern

@app.route('/')
def index():
    """Serve a test page for development"""
    html = '''
    <!DOCTYPE html>
    <html>
    <head>
        <title>Mobile Haptic Bridge</title>
        <script src="https://cdn.socket.io/4.5.4/socket.io.min.js"></script>
        <style>
            body { font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto; }
            .status { padding: 10px; margin: 10px 0; border-radius: 5px; }
            .connected { background: #d4edda; color: #155724; }
            .disconnected { background: #f8d7da; color: #721c24; }
            .log { background: #f5f5f5; padding: 10px; border-radius: 5px; max-height: 300px; overflow-y: auto; font-size: 12px; font-family: monospace; }
            input { width: 100%; padding: 8px; margin: 10px 0; }
            button { padding: 10px 20px; background: #007bff; color: white; border: none; border-radius: 5px; cursor: pointer; }
            button:hover { background: #0056b3; }
        </style>
    </head>
    <body>
        <h1>📱 Mobile Haptic Bridge</h1>
        <div id="status" class="status disconnected">🔌 Disconnected</div>
        
        <h2>Test Vibration</h2>
        <input type="text" id="textInput" placeholder="Enter text to vibrate (e.g., 'hello')" />
        <button onclick="testVibration()">Send Vibration</button>
        
        <h2>Connection Info</h2>
        <p><strong>Clients Connected:</strong> <span id="clientCount">0</span></p>
        
        <h2>Log</h2>
        <div class="log" id="log"></div>
    </body>
    <script>
        const socket = io();
        
        socket.on('connect', () => {
            updateStatus('✅ Connected - Waiting for mobile devices...', true);
            log('Connected to haptic bridge');
        });
        
        socket.on('disconnect', () => {
            updateStatus('🔌 Disconnected', false);
            log('Disconnected from haptic bridge');
        });
        
        socket.on('client_connected', (data) => {
            log(`Mobile device connected: ${data.client_id}`);
            document.getElementById('clientCount').textContent = data.client_count;
        });
        
        socket.on('vibration_sent', (data) => {
            log(`Vibration sent: "${data.text}" (Morse: ${data.morse})`);
        });
        
        function testVibration() {
            const text = document.getElementById('textInput').value;
            if (!text) {
                alert('Please enter some text');
                return;
            }
            socket.emit('vibrate', { text });
            document.getElementById('textInput').value = '';
        }
        
        function updateStatus(message, connected) {
            const status = document.getElementById('status');
            status.textContent = message;
            status.className = 'status ' + (connected ? 'connected' : 'disconnected');
        }
        
        function log(message) {
            const logEl = document.getElementById('log');
            const timestamp = new Date().toLocaleTimeString();
            logEl.innerHTML += `[${timestamp}] ${message}<br>`;
            logEl.scrollTop = logEl.scrollHeight;
        }
    </script>
    </html>
    '''
    return render_template_string(html)

@socketio.on('connect')
def handle_connect():
    """Handle client connection"""
    client_id = request.sid
    connected_clients[client_id] = {
        'id': client_id,
        'type': 'web',
        'connected_at': datetime.now()
    }
    logger.info(f"✅ Client connected: {client_id}")
    emit('connection_response', {'data': 'Connected to haptic bridge'})

@socketio.on('register_mobile')
def handle_mobile_registration():
    """Handle mobile device registration"""
    client_id = request.sid
    if client_id in connected_clients:
        connected_clients[client_id]['type'] = 'mobile'
        logger.info(f"📱 Mobile device registered: {client_id}")
        emit('mobile_ready', {'client_id': client_id})
        
        # Notify web clients
        emit('client_connected', {
            'client_id': client_id,
            'client_count': len([c for c in connected_clients.values() if c['type'] == 'mobile'])
        }, broadcast=True)

@socketio.on('vibrate')
def handle_vibrate(data):
    """Handle vibration request from web client"""
    text = data.get('text', '')
    if not text:
        logger.warning("⚠️  Empty text received for vibration")
        return
    
    # Convert text to Morse
    morse = text_to_morse(text)
    pattern = morse_to_vibration_pattern(morse)
    
    logger.info(f"📳 Vibration request: '{text}' → {morse}")
    logger.info(f"    Pattern (ms): {pattern}")
    
    # Send to all connected mobile devices
    mobile_clients = [c for c in connected_clients.values() if c['type'] == 'mobile']
    if mobile_clients:
        for client in mobile_clients:
            emit('vibrate_pattern', {
                'text': text,
                'morse': morse,
                'pattern': pattern
            }, room=client['id'])
        logger.info(f"✅ Sent to {len(mobile_clients)} mobile device(s)")
    else:
        logger.warning("⚠️  No mobile devices connected")
        emit('vibration_error', {'message': 'No mobile devices connected'})

@socketio.on('disconnect')
def handle_disconnect():
    """Handle client disconnection"""
    client_id = request.sid
    if client_id in connected_clients:
        client_type = connected_clients[client_id].get('type', 'web')
        del connected_clients[client_id]
        logger.info(f"🔌 {client_type.upper()} client disconnected: {client_id}")
        
        # Update mobile count for all clients
        mobile_count = len([c for c in connected_clients.values() if c['type'] == 'mobile'])
        if mobile_count > 0 or len(connected_clients) > 0:
            emit('client_disconnected', {
                'client_id': client_id,
                'client_count': mobile_count
            }, broadcast=True)

def print_startup_info():
    """Print startup information"""
    print("\n" + "="*60)
    print("📱 MOBILE HAPTIC BRIDGE STARTED")
    print("="*60)
    print("🌐 Web Dashboard:        http://localhost:5000")
    print("🔗 WebSocket Server:     ws://localhost:5000")
    print("✅ Ready to connect mobile devices via USB tethering")
    print("\n📋 SETUP INSTRUCTIONS:")
    print("   1. Connect mobile device via USB and enable USB tethering")
    print("   2. On mobile, visit: http://<your-laptop-ip>:5000")
    print("   3. Web app should connect to ws://localhost:5000 automatically")
    print("   4. When you speak/input text, mobile will vibrate in Morse")
    print("\n⚠️  Make sure:")
    print("   - Mobile and laptop are on same network (or USB tethered)")
    print("   - Port 5000 is not blocked by firewall")
    print("   - haptic_bridge.py is running while using vibration feature")
    print("="*60 + "\n")

if __name__ == '__main__':
    try:
        print_startup_info()
        logger.info("Starting Flask-SocketIO server on http://localhost:5000")
        socketio.run(app, host='0.0.0.0', port=5000, debug=False, allow_unsafe_werkzeug=True)
    except KeyboardInterrupt:
        logger.info("\n⏹️  Haptic bridge stopped")
        sys.exit(0)
    except Exception as e:
        logger.error(f"❌ Error starting haptic bridge: {e}")
        sys.exit(1)
