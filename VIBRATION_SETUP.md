# 📱 Vibration Feature Setup Guide

## 🎉 NEW: Production-Ready Web-Based Bridge (Zero Terminal Commands!)

The vibration feature is now **completely UI-controlled** with **zero terminal commands required**! Everything runs in the browser and works in production environments like Vercel.

## How It Works Now

```
┌─────────────────────┐
│  Web App (Browser)  │  Speech input, Morse input
│   [Vibration BTN]   │
└──────────┬──────────┘
           │ Text: "hello"
           │ Emotion: "Speaking"
           ▼
┌─────────────────────────┐
│  Web Bridge Popup      │  Next.js API Route
│  (/api/vibration-bridge)│  postMessage communication
└──────────┬──────────────┘
           │ Morse Pattern
           │ Vibration Commands
           ▼
┌─────────────────────┐
│ Mobile Device       │  USB Tethered
│ (Web Vibration API) │  Popup window on mobile
└─────────────────────┘
```

---

## 🚀 Quick Start (3 Simple Steps)

### Step 1: Connect Your Mobile
1. Connect phone to laptop with USB cable
2. Enable USB Tethering:
   - **Android:** Settings → Network → USB Tethering
   - **iOS:** Settings → Personal Hotspot → USB Tethering
3. Your laptop should show a network connection notification

### Step 2: Start the Bridge
1. Open the StreamTalk app in your browser
2. Click the **📱 Vibration** button to open setup
3. Click **"🚀 Start Bridge"** button in the modal
4. A popup window will open automatically

### Step 3: Use Vibration
1. Keep the bridge popup open on your phone
2. Enable **Vibration Output** (📱 button) in the main app
3. Speak text or input Morse code
4. Your phone vibrates in Morse code patterns!

---

## 🎯 Technical Details

### Morse Code Patterns
- **Dot (·)** = Short vibration (200ms)
- **Dash (−)** = Long vibration (600ms)
- **Letter Gap** = 200ms pause
- **Word Gap** = 1000ms pause

### Browser Compatibility
- **Web Vibration API** supported on:
  - ✅ Android Chrome
  - ✅ iOS Safari (limited)
  - ✅ Modern mobile browsers

### Production Ready
- ✅ Works in Vercel serverless
- ✅ No terminal commands needed
- ✅ No external servers required
- ✅ USB tethering only
- ✅ Fully accessible for disabled users

---

## 🧪 Testing the Implementation

### Local Testing
```bash
cd streamtalk
npm run dev
# Open http://localhost:3000/test-room
```

### Production Testing
The changes have been pushed to GitHub and should automatically deploy to:
- **Vercel:** https://your-app.vercel.app
- **Hugging Face Spaces:** https://your-space.hf.space

### Test Steps
1. **Open the app** in your browser
2. **Connect mobile** via USB tethering
3. **Click "Enable Vibration"** → **"Start Bridge"**
4. **Verify popup opens** on your mobile screen
5. **Speak text** in the main app
6. **Feel vibrations** on your mobile device!

---

## 🔧 Troubleshooting

### Bridge Popup Doesn't Open
- Ensure popup blockers are disabled
- Check browser console for errors
- Try refreshing the page

### No Vibration on Mobile
- Verify USB tethering is active
- Check that popup is open on mobile
- Ensure mobile browser supports Web Vibration API

### Connection Issues
- Restart USB tethering
- Try different USB cable
- Check mobile battery level

---

## 📚 Legacy Documentation (Deprecated)

The old Python server approach has been replaced with the web-based bridge above. The following is kept for reference only:

### Android
1. Connect phone to laptop with USB cable
2. Open **Settings** → **Network & Internet** → **Tethering** (or **Mobile Hotspot & Tethering**)
3. Enable **USB Tethering**
4. Your laptop should detect a new network connection

### iOS (if supported)
1. Connect iPhone to Mac/laptop with USB cable
2. Open **Settings** → **Personal Hotspot**
3. Enable **Bluetooth** or **USB Tethering** (if available)
4. Your laptop should detect a new network connection

### Windows Verification
Open **Device Manager** or **Settings** → **Network & Internet** to verify the connection.

---

## Step 3: Start the Haptic Bridge Server

Open Terminal/PowerShell in the project root and run:

```bash
# Navigate to ml directory
cd ml

# Run the haptic bridge
python haptic_bridge.py
```

You should see:
```
============================================================
📱 MOBILE HAPTIC BRIDGE STARTED
============================================================
🌐 Web Dashboard:        http://localhost:5000
🔗 WebSocket Server:     ws://localhost:5000
✅ Ready to connect mobile devices via USB tethering

📋 SETUP INSTRUCTIONS:
   1. Connect mobile device via USB and enable USB tethering
   2. On mobile, visit: http://<your-laptop-ip>:5000
   3. Web app should connect to ws://localhost:5000 automatically
   4. When you speak/input text, mobile will vibrate in Morse

⚠️  Make sure:
   - Mobile and laptop are on same network (or USB tethered)
   - Port 5000 is not blocked by firewall
   - haptic_bridge.py is running while using vibration feature
============================================================
```

The bridge is now running and waiting for mobile clients to connect.

---

## Step 4: Connect Mobile Device to Haptic Bridge

### Find Your Laptop IP Address

**Windows (via Command Prompt/PowerShell):**
```powershell
ipconfig
```
Look for **IPv4 Address** (e.g., `192.168.x.x` or similar)

**Or use localhost if on same machine:**
```
http://localhost:5000
```

### On Your Mobile Device

1. **Open a web browser** (Chrome, Safari, etc.)
2. **Visit:** `http://<your-laptop-ip>:5000`
   - For example: `http://192.168.1.100:5000`
   - Or if USB tethered: `http://localhost:5000`

3. You should see a **purple page** with:
   - 📱 **Haptic Receiver** title
   - Connection status indicator
   - Instructions about vibration patterns

4. Wait for status to show: **✅ Connected - Waiting for data...**

---

## Step 5: Test Vibration in the App

### Enable Vibration Feature
1. Click the **📱 Mobile Button** in the web app floating controls
2. A setup guide modal should appear showing all the steps
3. Follow through and agree to the setup

### Test Vibration
**Method 1: Speech Input**
1. Click the **🎤 Microphone button** (if available)
2. Say "Hello"
3. The text should appear in captions with emotion: `(Speaking)`
4. Your mobile should **vibrate** in Morse code pattern
5. Press the **speaker button** or press **'e'** in Morse mode to hear the text spoken aloud

**Method 2: Morse Input**
1. Click the **⌨️ Morse button**
2. Input Morse code or text
3. Your phone should vibrate in the corresponding Morse pattern

### Console Logs
Check your browser console (F12 → Console tab) for debug messages:
- `✅ Connected to haptic bridge at localhost:5000` - Connection successful
- `📳 Sent vibration for text: "hello"` - Vibration sent
- `❌ Haptic bridge connection error` - Connection failed

---

## Step 6: Understanding Vibration Patterns

The app converts text → Morse code → vibration pattern:

| Morse | Vibration | Duration |
|-------|-----------|----------|
| `.` (Dot) | Short vibration | 200ms |
| `-` (Dash) | Long vibration | 600ms |
| *gap* | Silent pause | 200ms |
| *letter gap* | Silent pause | 1000ms |
| *word gap* | Silent pause | 1500ms |

**Example:** "HI" in Morse
- H = `....` → 4 short vibrations
- I = `..` → 2 short vibrations

---

## Troubleshooting

### Problem: Mobile doesn't vibrate
**Check:**
1. ✅ Haptic bridge is running (`python haptic_bridge.py`)
2. ✅ Mobile is connected to `http://<laptop-ip>:5000` and shows "Connected"
3. ✅ Browser console shows "✅ Connected to haptic bridge"
4. ✅ Vibration toggle is enabled (📱 button is highlighted)
5. ✅ Your mobile device has vibration enabled in settings
6. ✅ No firewall blocking port 5000

### Problem: Can't reach laptop IP from mobile
**Solutions:**
1. Check laptop IP with `ipconfig` (Windows) or `ifconfig` (Mac/Linux)
2. Ensure mobile and laptop are on **same network**
3. If using USB tethering, make sure it's properly enabled
4. Try: `http://localhost:5000` if on same WiFi

### Problem: Port 5000 already in use
```bash
# Kill process using port 5000 (Windows PowerShell)
Stop-Process -Id (Get-NetTCPConnection -LocalPort 5000).OwningProcess

# Or use a different port by editing haptic_bridge.py:
# Change: socketio.run(app, host='0.0.0.0', port=5000)
# To:     socketio.run(app, host='0.0.0.0', port=5001)
```

### Problem: Bridge crashes
1. Make sure `flask` and `flask-socketio` are installed
2. Check Python version (3.8+)
3. Run from the `ml/` directory

---

## Testing Checklist

- [ ] `python haptic_bridge.py` starts without errors
- [ ] Mobile can reach `http://<laptop-ip>:5000` 
- [ ] Mobile page shows "✅ Connected" status
- [ ] Browser console shows "✅ Connected to haptic bridge"
- [ ] Click vibration button (📱) - setup modal appears
- [ ] Speak "hello" - phone vibrates in Morse pattern
- [ ] Enable TTS (speaker button) - hears text read aloud
- [ ] Morse input - phone vibrates for Morse code
- [ ] Can hear TTS for Morse when pressing 'e' key

---

## Production Deployment

For deploying to Vercel with vibration feature:

1. **Haptic bridge runs locally only** - users must run `python haptic_bridge.py` on their laptop
2. **Mobile tethering required** - USB connection enables local network access
3. **Port 5000** - must be open locally and not blocked by firewall
4. **CORS enabled** - bridge accepts connections from any origin

---

## Additional Resources

- [Socket.IO Documentation](https://socket.io/docs/)
- [Flask Documentation](https://flask.palletsprojects.com/)
- [Web Vibration API](https://developer.mozilla.org/en-US/docs/Web/API/Vibration_API)
- [Morse Code Reference](https://en.wikipedia.org/wiki/Morse_code)

---

## Questions or Issues?

- Check the browser console (F12) for detailed error messages
- Verify haptic bridge is running with correct startup message
- Ensure mobile device vibration is enabled in phone settings
- Try restarting haptic bridge if connection issues persist
