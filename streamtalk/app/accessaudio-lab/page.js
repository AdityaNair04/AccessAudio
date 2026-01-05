"use client";

import React, { useEffect, useRef, useState } from "react";
import { FilesetResolver, FaceLandmarker, HandLandmarker } from "@mediapipe/tasks-vision";

export default function AccessAudioLab() {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    const [status, setStatus] = useState("Idle");
    const [stats, setStats] = useState({ face: 0, hands: 0, fps: 0 });

    useEffect(() => {
        let stream;
        let faceLandmarker;
        let handLandmarker;
        let rafId;

        let lastTs = performance.now();
        let frames = 0;

        const start = async () => {
            try {
                setStatus("Requesting camera...");
                stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });

                const video = videoRef.current;
                const canvas = canvasRef.current;
                if (!video || !canvas) return;

                video.srcObject = stream;
                await video.play();

                setStatus("Loading MediaPipe (WASM + models)...");

                // As per @mediapipe/tasks-vision docs: load WASM via jsDelivr. [web:31]
                const vision = await FilesetResolver.forVisionTasks(
                    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/wasm"
                );

                // Model paths follow official MediaPipe model hosting. [web:31]
                faceLandmarker = await FaceLandmarker.createFromOptions(vision, {
                    baseOptions: {
                        modelAssetPath:
                            "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task",
                    },
                    runningMode: "VIDEO",
                    outputFaceBlendshapes: true,
                    numFaces: 1,
                });

                handLandmarker = await HandLandmarker.createFromOptions(vision, {
                    baseOptions: {
                        modelAssetPath:
                            "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task",
                    },
                    runningMode: "VIDEO",
                    numHands: 2,
                });

                setStatus("Running detections...");

                const ctx = canvas.getContext("2d");

                const loop = () => {
                    const now = performance.now();

                    // Only run once video has pixels. (readyState >= 2 is common practice)
                    if (video.readyState >= 2) {
                        // Keep canvas resolution in sync with the video frame.
                        const w = video.videoWidth;
                        const h = video.videoHeight;
                        if (w && h && (canvas.width !== w || canvas.height !== h)) {
                            canvas.width = w;
                            canvas.height = h;
                        }

                        const faceRes = faceLandmarker.detectForVideo(video, now);
                        const handRes = handLandmarker.detectForVideo(video, now);

                        const faceCount = faceRes?.faceLandmarks?.length || 0;
                        const handCount = handRes?.landmarks?.length || 0;

                        // Draw overlay
                        if (ctx && canvas.width && canvas.height) {
                            ctx.clearRect(0, 0, canvas.width, canvas.height);

                            // Hands (green)
                            ctx.fillStyle = "lime";
                            for (const hand of handRes?.landmarks || []) {
                                for (const p of hand) {
                                    ctx.beginPath();
                                    ctx.arc(p.x * canvas.width, p.y * canvas.height, 3, 0, Math.PI * 2);
                                    ctx.fill();
                                }
                            }

                            // Face (cyan)
                            ctx.fillStyle = "cyan";
                            for (const face of faceRes?.faceLandmarks || []) {
                                for (const p of face) {
                                    ctx.beginPath();
                                    ctx.arc(p.x * canvas.width, p.y * canvas.height, 1.5, 0, Math.PI * 2);
                                    ctx.fill();
                                }
                            }
                        }

                        // FPS stats (updates ~1/sec)
                        frames += 1;
                        const dt = now - lastTs;
                        if (dt >= 1000) {
                            const fps = Math.round((frames * 1000) / dt);
                            frames = 0;
                            lastTs = now;
                            setStats({ face: faceCount, hands: handCount, fps });
                        } else {
                            setStats((s) => ({ ...s, face: faceCount, hands: handCount }));
                        }
                    }

                    rafId = requestAnimationFrame(loop);
                };

                rafId = requestAnimationFrame(loop);
            } catch (e) {
                console.error(e);
                setStatus(`Error: ${e?.message || String(e)}`);
            }
        };

        start();

        return () => {
            if (rafId) cancelAnimationFrame(rafId);
            if (stream) stream.getTracks().forEach((t) => t.stop());
            try {
                faceLandmarker?.close?.();
                handLandmarker?.close?.();
            } catch { }
        };
    }, []);

    return (
        <div style={{ padding: 16, background: "#0b0b12", minHeight: "100vh", color: "white" }}>
            <h1 style={{ fontSize: 22, fontWeight: 700 }}>AccessAudio Lab</h1>
            <p>Status: {status}</p>
            <p>
                Face: {stats.face} | Hands: {stats.hands} | FPS: {stats.fps}
            </p>

            <div style={{ position: "relative", width: "720px", maxWidth: "100%" }}>
                <video
                    ref={videoRef}
                    style={{ width: "100%", borderRadius: 12, background: "#111" }}
                    playsInline
                    muted
                />
                <canvas
                    ref={canvasRef}
                    style={{
                        position: "absolute",
                        left: 0,
                        top: 0,
                        width: "100%",
                        height: "100%",
                        pointerEvents: "none",
                    }}
                />
            </div>

            <p style={{ opacity: 0.8, marginTop: 8 }}>
                Put your face in the frame: you should see cyan dots. Show your palm: you should see green dots.
            </p>
        </div>
    );
}
