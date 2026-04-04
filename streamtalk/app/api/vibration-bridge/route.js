const bridgeCommandQueues = new Map();
const bridgeClients = new Map();
const INACTIVITY_TIMEOUT_MS = 5 * 60 * 1000;
let lastCleanup = Date.now();

const cleanupBridgeState = () => {
  const now = Date.now();

  for (const [clientId, client] of bridgeClients.entries()) {
    if (now - client.lastSeen > INACTIVITY_TIMEOUT_MS) {
      bridgeClients.delete(clientId);
    }
  }

  for (const [roomId, queue] of bridgeCommandQueues.entries()) {
    if (queue.length === 0) {
      bridgeCommandQueues.delete(roomId);
    }
  }
};

const ensureRoomQueue = (roomId) => {
  if (!bridgeCommandQueues.has(roomId)) {
    bridgeCommandQueues.set(roomId, []);
  }
  return bridgeCommandQueues.get(roomId);
};

const enqueueBridgeCommand = (roomId, command) => {
  const queue = ensureRoomQueue(roomId);
  queue.push({
    ...command,
    createdAt: Date.now(),
  });
};

const drainBridgeCommands = (roomId) => {
  const queue = ensureRoomQueue(roomId);
  const commands = [...queue];
  queue.length = 0;
  return commands;
};

export async function GET(request) {
  if (Date.now() - lastCleanup > 60000) {
    cleanupBridgeState();
    lastCleanup = Date.now();
  }

  const url = new URL(request.url);
  const roomId = url.searchParams.get('roomId');
  const action = url.searchParams.get('action');
  const clientId = url.searchParams.get('clientId');

  if (action === 'poll') {
    if (!roomId || !clientId) {
      return new Response(JSON.stringify({ error: 'Missing roomId or clientId' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    bridgeClients.set(clientId, { roomId, lastSeen: Date.now() });
    const commands = drainBridgeCommands(roomId);

    return new Response(JSON.stringify({ success: true, commands }), {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (action === 'status') {
    if (!roomId) {
      return new Response(JSON.stringify({ error: 'Missing roomId' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const activeClientCount = Array.from(bridgeClients.values()).filter(
      (client) => client.roomId === roomId
    ).length;

    return new Response(JSON.stringify({ success: true, activeClientCount }), {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vibration Bridge</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 20px;
        }

        .container {
            background: white;
            border-radius: 20px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            padding: 40px;
            max-width: 420px;
            width: 100%;
            text-align: center;
        }

        .header {
            margin-bottom: 30px;
        }

        .icon {
            font-size: 60px;
            margin-bottom: 15px;
        }

        h1 {
            color: #333;
            font-size: 24px;
            margin-bottom: 10px;
        }

        .subtitle {
            color: #999;
            font-size: 14px;
        }

        .status-indicator {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            margin: 20px 0;
            padding: 15px;
            border-radius: 10px;
            font-weight: 500;
            font-size: 16px;
        }

        .status-indicator.connected {
            background: #d4edda;
            color: #155724;
        }

        .status-indicator.disconnected {
            background: #f8d7da;
            color: #721c24;
        }

        .status-dot {
            width: 12px;
            height: 12px;
            border-radius: 50%;
            display: inline-block;
            animation: pulse 2s infinite;
        }

        .status-indicator.connected .status-dot {
            background: #28a745;
        }

        .status-indicator.disconnected .status-dot {
            background: #dc3545;
            animation: none;
        }

        .connection-detail {
            font-size: 12px;
            color: #555;
            margin-top: 4px;
        }

        .status-indicator.disconnected .connection-detail {
            color: #721c24;
        }

        .status-indicator.connected .connection-detail {
            color: #155724;
        }

        @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
        }

        .vibration-display {
            background: #f5f5f5;
            padding: 20px;
            border-radius: 10px;
            margin: 20px 0;
            min-height: 120px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }

        .vibration-text {
            font-size: 26px;
            color: #333;
            font-weight: bold;
            margin-bottom: 10px;
            word-break: break-all;
        }

        .vibration-morse {
            font-family: monospace;
            font-size: 14px;
            color: #666;
            margin-bottom: 10px;
            word-break: break-all;
        }

        .vibration-status {
            font-size: 12px;
            color: #999;
        }

        .vibration-indicator {
            font-size: 40px;
            margin: 10px 0;
            animation: vibrate 0.1s infinite;
        }

        @keyframes vibrate {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-2px); }
            75% { transform: translateX(2px); }
        }

        .info-box {
            background: #e7f3ff;
            border-left: 4px solid #2196F3;
            padding: 15px;
            border-radius: 5px;
            margin-top: 20px;
            text-align: left;
            font-size: 12px;
            color: #333;
        }

        .info-box strong {
            color: #1976D2;
        }

        .dot-pattern {
            display: flex;
            gap: 4px;
            justify-content: center;
            margin-top: 10px;
            flex-wrap: wrap;
        }

        .dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: #ddd;
            transition: all 0.2s;
        }

        .dot.active {
            background: #667eea;
            transform: scale(1.5);
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="icon">🌉</div>
            <h1>Vibration Bridge</h1>
            <p class="subtitle">Open this page on your mobile device</p>
        </div>

        <div id="statusIndicator" class="status-indicator disconnected">
            <span class="status-dot"></span>
            <div>
                <div id="statusText">Waiting for commands...</div>
                <div id="connectionDetail" class="connection-detail">Polling inactive</div>
            </div>
        </div>

        <div class="vibration-display">
            <div id="vibrationText" class="vibration-text">Waiting</div>
            <div id="vibrationMorse" class="vibration-morse">-</div>
            <div id="vibrationIndicator" class="vibration-indicator" style="display: none;">📳</div>
            <div class="dot-pattern" id="dotPattern"></div>
            <div class="vibration-status" id="vibrationStatus">Keep this page open to receive vibration commands.</div>
        </div>

        <div class="info-box">
            <strong>ℹ️ Mobile Bridge:</strong><br>
            <br>
            This page receives vibration commands from the main app and plays them using your phone's vibration motor.
            <br><br>
            <strong>Tip:</strong> Keep the page active while you use the app.
        </div>

        <div class="info-box" style="background: #fff3cd; border-left-color: #ff9800; margin-top: 15px;">
            <strong>🔧 Vibration Troubleshooting:</strong><br>
            <button id="testVibrationBtn" style="margin-top: 10px; padding: 8px 12px; background: #ff9800; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold;">📳 Test Vibration</button>
            <p style="margin-top: 8px; font-size: 11px;">
                <strong>Not feeling vibrations?</strong> 
                <br>✓ Check: Settings → Sound and vibration → Enable vibration
                <br>✓ Check: Settings → Accessibility → Vibration and haptics
                <br>✓ Check: Device is not in silent mode
                <br>✓ Check: Browser tab is active (not in background)
                <br>✓ Check: App permissions allow vibration
            </p>
            <div id="vibrationDiagnostics" style="margin-top: 8px; font-size: 11px; color: #666; background: white; padding: 8px; border-radius: 3px; max-height: 100px; overflow-y: auto; font-family: monospace;">
                Diagnostics: (testing...)
            </div>
        </div>
    </div>

    <script>
        const params = new URLSearchParams(window.location.search);
        const roomId = params.get('roomId');
        const clientId = 'bridge_' + Math.random().toString(36).slice(2);
        const statusIndicator = document.getElementById('statusIndicator');
        const statusText = document.getElementById('statusText');
        const connectionDetail = document.getElementById('connectionDetail');
        const vibrationText = document.getElementById('vibrationText');
        const vibrationMorse = document.getElementById('vibrationMorse');
        const vibrationStatus = document.getElementById('vibrationStatus');
        const vibrationIndicator = document.getElementById('vibrationIndicator');
        const dotPattern = document.getElementById('dotPattern');
        const testVibrationBtn = document.getElementById('testVibrationBtn');
        const diagnosticsDiv = document.getElementById('vibrationDiagnostics');

        const DOT_DURATION = 200;
        const DASH_DURATION = 600;
        const GAP_DURATION = 200;
        const LETTER_GAP = 1000;
        const WORD_GAP = 1500;

        // Diagnostic logging
        function addDiagnostic(message) {
            const timestamp = new Date().toLocaleTimeString();
            const line = '[' + timestamp + '] ' + message;
            console.log(line);
            diagnosticsDiv.textContent = diagnosticsDiv.textContent + '\\n' + line;
            diagnosticsDiv.scrollTop = diagnosticsDiv.scrollHeight;
        }

        // Check vibration support
        function checkVibrationSupport() {
            if (navigator.vibrate) {
                addDiagnostic('✓ Vibration API: SUPPORTED');
                return true;
            } else {
                addDiagnostic('✗ Vibration API: NOT SUPPORTED');
                return false;
            }
        }

        checkVibrationSupport();

        // Test vibration button handler
        if (testVibrationBtn) {
            testVibrationBtn.addEventListener('click', async () => {
                addDiagnostic('🔧 TEST VIBRATION INITIATED');
                try {
                    // Test 1: Simple short vibration
                    addDiagnostic('📳 Test 1: 200ms vibration...');
                    navigator.vibrate(200);
                    await new Promise(resolve => setTimeout(resolve, 300));

                    // Test 2: Pattern vibration
                    addDiagnostic('📳 Test 2: Pattern (200-100-200)...');
                    navigator.vibrate([200, 100, 200]);
                    await new Promise(resolve => setTimeout(resolve, 700));

                    // Test 3: International morse "SOS"
                    addDiagnostic('📳 Test 3: SOS morse pattern...');
                    navigator.vibrate([100, 100, 100, 200, 300, 200, 300, 200, 300, 200, 100, 100, 100]);
                    await new Promise(resolve => setTimeout(resolve, 2000));

                    addDiagnostic('✓ TEST VIBRATION COMPLETE');
                    addDiagnostic('If you felt vibrations above, the API is working!');
                    addDiagnostic('If you felt NOTHING, check Android settings.');
                } catch (error) {
                    addDiagnostic('✗ Error during test: ' + error.message);
                }
            });
        }

        if (!roomId) {
            updateStatus('Missing roomId in URL', false);
            addDiagnostic('✗ ERROR: No roomId parameter in URL');
            vibrationStatus.textContent = 'Open the bridge from the app with a valid room URL.';
        } else {
            addDiagnostic('✓ Room ID: ' + roomId.substring(0, 8) + '...');
            addDiagnostic('✓ Client ID: ' + clientId.substring(0, 8) + '...');
            updateStatus('Ready to receive commands', false, 'Waiting for polling');
            startPolling();
            addDiagnostic('✓ Polling started (every 1.5 seconds)');
        }

        function updateStatus(message, connected, detail = '') {
            statusText.textContent = message;
            connectionDetail.textContent = detail || (connected ? 'Polling active' : 'Polling inactive');
            if (connected) {
                statusIndicator.className = 'status-indicator connected';
            } else {
                statusIndicator.className = 'status-indicator disconnected';
            }
        }

        async function pollCommands() {
            if (!roomId) return;

            try {
                const url = '/api/vibration-bridge?roomId=' + encodeURIComponent(roomId) + '&action=poll&clientId=' + encodeURIComponent(clientId);
                const response = await fetch(url);
                const data = await response.json();

                if (!data.success) {
                    addDiagnostic('⚠️  Poll error: ' + (data.error || 'Unknown error'));
                    updateStatus('Bridge polling error', false, 'Polling disconnected');
                    vibrationStatus.textContent = data.error || 'Unexpected polling response.';
                    return;
                }

                updateStatus('Connected to app bridge', true, 'Polling active');

                if (Array.isArray(data.commands) && data.commands.length > 0) {
                    addDiagnostic('📬 Received ' + data.commands.length + ' command(s)');
                    for (const command of data.commands) {
                        await handleVibrationCommand(command);
                    }
                }
            } catch (error) {
                console.warn('Bridge poll failed', error);
                addDiagnostic('✗ Poll connection failed: ' + error.message);
                updateStatus('Polling failed', false, 'Polling disconnected');
                vibrationStatus.textContent = 'Unable to reach bridge server. Check your network connection.';
            }
        }

        function startPolling() {
            pollCommands();
            setInterval(pollCommands, 1500);
        }

        async function handleVibrationCommand(command) {
            const { text, morse, pattern } = command;
            addDiagnostic('📖 Received command: "' + text + '"');
            vibrationText.textContent = text || 'Vibration';
            vibrationMorse.textContent = morse || '';
            vibrationStatus.textContent = 'Vibrating...';
            displayDotPattern(morse || '');
            addDiagnostic('📳 Playing pattern: ' + JSON.stringify(pattern) + ' (' + pattern.length + ' events)');
            await playVibrationPattern(pattern || []);
            vibrationStatus.textContent = 'Complete ✓';
            addDiagnostic('✓ Vibration playback complete');
        }

        function displayDotPattern(morse) {
            dotPattern.innerHTML = '';
            const symbols = morse.split(' ');

            for (const symbol of symbols) {
                if (symbol === '/') {
                    const space = document.createElement('div');
                    space.style.width = '100%';
                    space.style.height = '4px';
                    dotPattern.appendChild(space);
                } else {
                    for (const char of symbol) {
                        const dot = document.createElement('div');
                        dot.className = 'dot';
                        dotPattern.appendChild(dot);
                    }
                    const spacer = document.createElement('div');
                    spacer.style.width = '2px';
                    dotPattern.appendChild(spacer);
                }
            }
        }

        async function playVibrationPattern(pattern) {
            vibrationIndicator.style.display = 'block';

            for (const duration of pattern) {
                if (duration > 0) {
                    if (navigator.vibrate) {
                        navigator.vibrate(duration);
                        addDiagnostic('📳 Vibrate: ' + duration + 'ms');
                    } else {
                        addDiagnostic('✗ Vibrate called but API not available!');
                    }
                    await sleep(duration);
                } else {
                    addDiagnostic('⏸️  Pause: ' + Math.abs(duration) + 'ms');
                    await sleep(Math.abs(duration));
                }
            }

            vibrationIndicator.style.display = 'none';
            if (navigator.vibrate) {
                navigator.vibrate(0);
            }
        }

        function sleep(ms) {
            return new Promise((resolve) => setTimeout(resolve, ms));
        }
    </script>
</body>
</html>`;

  return new Response(html, {
    headers: {
      'Content-Type': 'text/html',
    },
  });
}

export async function POST(request) {
  if (Date.now() - lastCleanup > 60000) {
    cleanupBridgeState();
    lastCleanup = Date.now();
  }

  try {
    const body = await request.json();
    const { roomId, text, morse, pattern } = body;

    if (!roomId || !text || !morse || !pattern) {
      return new Response(
        JSON.stringify({ error: 'roomId, text, morse, and pattern are required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    enqueueBridgeCommand(roomId, { text, morse, pattern });

    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Vibration bridge POST error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
