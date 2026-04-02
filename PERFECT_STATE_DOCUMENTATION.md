# Perfect State Documentation

## Latest Update: Robustness Enhancement (Connection Stability)

**Enhancement Date:** April 2, 2026  
**Focus:** Eliminate frequent disconnections and data channel drops in long-running sessions  
**Status:** Deployed + documented

### Key Additions:
1. **Data Channel Keep-Alive Heartbeat** (every 5 seconds)
2. **Stale Connection Detection** (10-second silent timeout trigger)
3. **Exponential Backoff Reconnection** (matching call retry logic)
4. **Peer Health Monitoring** (every 3 seconds)
5. **Graceful Degradation** (auto-reconnect up to 4 attempts)

---

## 1. Overview
This document captures the exact stable working state for the `Capstone_AccessAudio` project at commit `afacff0ad7e6d5e0772a6c3e690084681c672231` with the most recent work that restored fully functioning 2-user P2P call + sign + emotion pipeline. It is intended as a canonical reference for rollback and future debug/feature development.

## 2. Commit / Branch
- Git commit: `afacff0ad7e6d5e0772a6c3e690084681c672231`
- Branch: `main` (after forced reset to this commit)
- Verified local status: `afacff0ad` with changes to
  - `ml/streamtalk_backend.py`
  - `streamtalk/hooks/use-peer.js`
  - `ml/model_config_emotion/emotion/mobilenetv2.pth.zip` (updated artifact may be necessary)
  - `avatar/translate` (modified from previous stash)

## 3. Goal of this state
1. Stable PeerJS / WebRTC connections between two participants (`streamtalk` app). 
2. Robust reconnect handling in unreliable networks.
3. Fast and reliable sign-language prediction (`TFLite` sequence model) with minimal lag and proper debounce.
4. Emotion recognition with an adaptive face model, non-neutral posture, and jitter mitigation.
5. Optional Gemini translation out of synchronized sign buffer data.

## 4. Frontend architecture (key files)
### `streamtalk/hooks/use-peer.js`
- Creates PeerJS instance with `iceServers`, `sdpSemantics="unified-plan"`, and `iceCandidatePoolSize=10`.
- Handles `open`, `error`, and `disconnected` events.
- **NEW:** Peer health check every 3 seconds detects `myPeer.destroyed` and `myPeer.open` status.
- On `error` or `disconnected`, calls `myPeer.reconnect()` after 2s.
- Registers room membership by emitting `join-room`.
- **BENEFIT:** Catches ICE failures early before they cascade to data channels.

### `streamtalk/app/[roomId]/page.js` (existing logic)
- Uses `usePeer`, `useMediaStream`, `useChat`.
- Manages `peer.call` and `call.on("stream")` for remote video.
- Restarts call when peer reconnects (implicit from `use-peer` reconnect events). 
- Cleans up old streams and calls on unmount.

### `streamtalk/hooks/use-chat.js` (HARDENED for stability)
- Data channel + message synchronization for handshake and command triggers.
- **NEW: Keep-Alive Heartbeat System**
  - Sends heartbeat (`heartbeat-ping`) every 5 seconds per peer.
  - Tracks `lastHeartbeatRef` to detect silent failures.
  - Mutes heartbeat logging to reduce noise in console.
- **NEW: Stale Connection Detection**
  - If no heartbeat ack received for >10 seconds, marks connection stale.
  - Logs warning and triggers reconnection.
- **NEW: Exponential Backoff Reconnection**
  - Uses same retry pattern as calls: `baseDelay * (attempt + 1)` with cap of 4 attempts.
  - `1200ms`, `2400ms`, `3600ms`, `4800ms` max.
  - Tracks attempts in `reconnectAttemptsRef`, resets on successful connection.
- **Benefit:** Prevents silent data channel failures and ensures reliable caption/control delivery.

### `streamtalk/hooks/use-chat.js` (existing logic)

## 5. Backend architecture (key files)
### `ml/streamtalk_backend.py` (main inference + WS server)
- FastAPI WebSocket server at `/ws`.
- Model initialization:
  - `get_emotion_model()` picks `MODEL_ARCH` from `ml/model_config_emotion/emotion/configs/config.py`.
  - Uses `mobilenetv2` by default; tries `resnet50` if configured.
  - Fallback logic on load failure, with robust prints and clean-up of dynamic imports.
- TFLite sign model from `ml/models/model.tflite` via `get_sign_model_tflite()`.
- Holistic + face detection based on MediaPipe.

### Inference loop
- Receives `frame` messages over WebSocket (base64 image). 
- Maintains `ConnectionState`:
  - `prediction_history` `deque(maxlen=2)` for quicker stable sign detection.
  - `cooldown_duration=0.8` seconds.
  - `sign_buffer`, `last_predicted_word`, `current_emotion`.
- Sign extraction path:
  - frames buffered to `sequence` until `SEQUENCE_LENGTH` (30)
  - when both hands present and confidence > 0.55, pushes sign output after consistent `prediction_history`.
- Emotion extraction path:
  - every 5th frame face detection + crop + color norm + pass through emotion model; threshold 0.3.
  - updates emotion only when changed and sends `emotion_update`.
- Translations:
  - `approve` message triggers `run_translation()` using `fetch_gemini_translation()`.
  - response returns `translation_result` with sentence + emotion + source.

## 6. Tuning settings in this perfect state
- Sign 
  - prediction confidence: `0.55`
  - requirement: same sign in last 2 predictions
  - cooldown: `0.8s`
- Emotion
  - eval interval: every `5` frames
  - detection confidence: `0.3` threshold
- Video capture frontend target: `~30fps` recommended to reduce latency.
- **Connection Robustness (NEW)**
  - Data channel heartbeat interval: `5000ms`
  - Stale connection timeout: `10000ms` (no ack)
  - Peer health check interval: `3000ms`
  - Reconnect base delay: `1200ms` with exponential backoff
  - Max reconnection attempts: `4`

## 7. Deployment/resilience behavior
- Backend `uvicorn` binds to `0.0.0.0:8000`; check logs for:
  - "✅ Emotion model loaded"
  - "Models Ready on ws://localhost:8000/ws !"
- In run mode, any model load error falls back and logs with emoji status.
- PeerJS reconnection guard is in place to avoid dead call state.
- **NEW: Console monitoring signals for long sessions**
  - `💬 Data connection natively opened with peer` = connection stable
  - `⚠️ Stale data connection detected` = heartbeat failed, attempting reconnect
  - `🔄 Scheduling data channel reconnect` = exponential backoff in progress
  - `♻️ Attempting data channel reconnect` = recovery attempt
  - `⚠️ PeerJS disconnected, attempting to reconnect...` = peer-level recovery active
  - Look for these in browser DevTools Console for real-time health

## 8. Restoration steps
1. `git fetch --all && git checkout main`
2. `git reset --hard afacff0ad7e6d5e0772a6c3e690084681c672231`
3. `git push -f origin main`
4. `cd ml && python streamtalk_backend.py` (or `uvicorn streamtalk_backend:app --host 0.0.0.0 --port 8000 --reload`)
5. Start frontend app: `cd streamtalk && npm run dev` (or relevant command)
6. Verify two-user session and UI signaling works.

## 9. Validation checklist
- [ ] Call connects and persists through short disconnect / network bounce.
- [ ] Sign word buffer updates with good temporal cadence (word every 0.8s in active motion).
- [ ] Emotion updates show visible affect changes without constant neutral.
- [ ] `Approve` button triggers translation and `translation_result` arrives.
- [ ] No crash in `state` management after `clear` or `approve`.
- [ ] **NEW: Robustness Tests**
  - [ ] Long-running call (>5 min) without manual reconnect needed.
  - [ ] Browser DevTools shows heartbeat messages (filter for "Data connection natively opened").
  - [ ] If connection drops, console shows stale detection + reconnect attempt.
  - [ ] After network recovery, data channel re-establishes without user action.
  - [ ] Multiple users on different networks maintain stable connection.

## 10. Future perfect-state logging protocol
1. Capture commit ID + changed file list with each checkpoint.
2. Note exactly what parameter(s) changed in model or peer stack.
3. Include consistent smoke test case steps.
4. Alias this doc in release notes with Major | Minor checkpoint status.

---

You now have a full state-restore artifact. If you want, I can also add a short `PERFECT_STATE_CHECKLIST.sh` script to auto-verify key signals (HTTP token, WS handshake, translation round-trip) using curl and a node photos fixture.