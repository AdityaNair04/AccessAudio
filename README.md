---
title: AccessAudio
emoji: 🎙️
colorFrom: purple
colorTo: blue
sdk: docker
app_port: 7860
pinned: false
---

# AccessAudio ML Backend

This Hugging Face Space hosts the machine learning backend for AccessAudio, a multimodal online meet platform.

## Architecture
- **Framework**: FastAPI with WebSockets
- **Models**: 
  - MediaPipe Holistic (Pose, Face, Hands)
  - TensorFlow Lite (Sign Language Detection)
  - PyTorch (Emotion Detection)
  - Google Gemini (Translation)

## Deployment
This repository is automatically synced to Hugging Face Spaces using GitHub Actions.

### Environment Variables Required
- `GEMINI_API_KEY`: Your Google AI Studio API Key.
