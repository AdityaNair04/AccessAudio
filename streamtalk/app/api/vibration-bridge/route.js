import { NextResponse } from 'next/server';

export async function GET() {
  const html = `
<!DOCTYPE html>
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
            max-width: 400px;
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

        @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
        }

        .vibration-display {
            background: #f5f5f5;
            padding: 20px;
            border-radius: 10px;
            margin: 20px 0;
            min-height: 100px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }

        .vibration-text {
            font-size: 28px;
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
            <p class="subtitle">Connecting laptop to mobile</p>
        </div>

        <div id="statusIndicator" class="status-indicator disconnected">
            <span class="status-dot"></span>
            <span id="statusText">Connecting to main app...</span>
        </div>

        <div class="vibration-display">
            <div id="vibrationText" class="vibration-text">-</div>
            <div id="vibrationMorse" class="vibration-morse"></div>
            <div id="vibrationIndicator" class="vibration-indicator" style="display: none;">📳</div>
            <div class="dot-pattern" id="dotPattern"></div>
            <div class="vibration-status" id="vibrationStatus">Waiting for vibration data...</div>
        </div>

        <div class="info-box">
            <strong>ℹ️ Bridge Status:</strong><br>
            <br>
            This page acts as a bridge between your laptop and mobile device. Keep this page open on your phone while using the vibration feature in the main app.
            <br><br>
            <strong>Connection:</strong> <span id="connectionStatus">Establishing...</span>
        </div>
    </div>

    <script>
        let mainAppWindow = null;

        // Try to find the main app window (opener)
        if (window.opener) {
            mainAppWindow = window.opener;
            console.log('✅ Found main app window (opener)');
        } else {
            // Fallback: try to find it by iterating through windows
            try {
                const windows = window.parent.frames;
                for (let i = 0; i < windows.length; i++) {
                    if (windows[i] !== window) {
                        mainAppWindow = windows[i];
                        break;
                    }
                }
            } catch (e) {
                console.warn('Could not find main app window');
            }
        }

        const statusIndicator = document.getElementById('statusIndicator');
        const statusText = document.getElementById('statusText');
        const vibrationText = document.getElementById('vibrationText');
        const vibrationMorse = document.getElementById('vibrationMorse');
        const vibrationStatus = document.getElementById('vibrationStatus');
        const vibrationIndicator = document.getElementById('vibrationIndicator');
        const dotPattern = document.getElementById('dotPattern');
        const connectionStatus = document.getElementById('connectionStatus');

        // Vibration strengths (ms)
        const DOT_DURATION = 200;
        const DASH_DURATION = 600;
        const GAP_DURATION = 200;

        // Listen for messages from main app
        window.addEventListener('message', async (event) => {
            if (event.data.type === 'MAIN_APP_READY') {
                console.log('✅ Main app confirmed ready');
                updateStatus('Connected to main app', true);
                connectionStatus.textContent = '✅ Connected';
                connectionStatus.style.color = '#28a745';

                // Send ready signal back
                if (mainAppWindow) {
                    mainAppWindow.postMessage({ type: 'BRIDGE_READY' }, '*');
                }
            } else if (event.data.type === 'VIBRATE_MOBILE') {
                const { text, morse, pattern } = event.data.data;

                console.log(\`📳 Received vibration: "\${text}"\`);
                console.log(\`    Morse: \${morse}\`);
                console.log(\`    Pattern: \${pattern}\`);

                // Update display
                vibrationText.textContent = text;
                vibrationMorse.textContent = morse;
                vibrationStatus.textContent = 'Vibrating...';

                // Show dot pattern visualization
                displayDotPattern(morse);

                // Execute vibration pattern
                await playVibrationPattern(pattern);

                vibrationStatus.textContent = 'Complete ✓';
            }
        });

        // Handle window close
        window.addEventListener('beforeunload', () => {
            if (mainAppWindow) {
                mainAppWindow.postMessage({ type: 'BRIDGE_CLOSED' }, '*');
            }
        });

        // Initialize
        if (mainAppWindow) {
            updateStatus('Connecting to main app...', true);
            connectionStatus.textContent = '🔄 Connecting...';
            console.log('🌉 Vibration Bridge initialized');
            console.log('🔗 Waiting for main app signal...');
        } else {
            updateStatus('No main app connection found', false);
            connectionStatus.textContent = '❌ No connection';
            connectionStatus.style.color = '#dc3545';
            vibrationStatus.textContent = 'Cannot connect to main app. Please refresh.';
        }

        function updateStatus(text, connected) {
            statusText.textContent = text;
            if (connected) {
                statusIndicator.className = 'status-indicator connected';
            } else {
                statusIndicator.className = 'status-indicator disconnected';
            }
        }

        function displayDotPattern(morse) {
            dotPattern.innerHTML = '';
            const symbols = morse.split(' ');
            let delay = 0;

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
                        dot.textContent = char;
                        dot.style.fontSize = '10px';
                        dot.style.display = 'flex';
                        dot.style.alignItems = 'center';
                        dot.style.justifyContent = 'center';
                        dot.style.color = 'white';
                        dot.style.fontWeight = 'bold';
                        dotPattern.appendChild(dot);

                        // Animate dot activation
                        setTimeout(() => {
                            dot.classList.add('active');
                            setTimeout(() => dot.classList.remove('active'), 300);
                        }, delay);

                        delay += char === '.' ? DOT_DURATION + GAP_DURATION : DASH_DURATION + GAP_DURATION;
                    }
                    const spacer = document.createElement('div');
                    spacer.style.width = '2px';
                    dotPattern.appendChild(spacer);
                }
            }
        }

        async function playVibrationPattern(pattern) {
            vibrationIndicator.style.display = 'block';

            for (let i = 0; i < pattern.length; i++) {
                const duration = pattern[i];

                if (duration > 0) {
                    // Vibrate
                    if (navigator.vibrate) {
                        navigator.vibrate(duration);
                    } else if (navigator.webkitVibrate) {
                        navigator.webkitVibrate(duration);
                    }
                    console.log(\`🔔 Vibrating for \${duration}ms\`);
                    await sleep(duration);
                } else {
                    // Silence (wait)
                    console.log(\`⏸️  Silent for \${Math.abs(duration)}ms\`);
                    await sleep(Math.abs(duration));
                }
            }

            vibrationIndicator.style.display = 'none';

            // Stop any remaining vibration
            if (navigator.vibrate) {
                navigator.vibrate(0);
            } else if (navigator.webkitVibrate) {
                navigator.webkitVibrate(0);
            }
        }

        function sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }

        // Log initial connection attempt
        console.log('🌉 Vibration Bridge initialized');
        console.log('🔗 Connecting to main app...');
    </script>
</body>
</html>
  `;

  return new Response(html, {
    headers: {
      'Content-Type': 'text/html',
    },
  });
}