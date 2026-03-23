import { useEffect, useRef, useState } from "react";

export default function usePythonAI(stream, isVideoEnabled, isActive, onTranslationReceived) {
    const wsRef = useRef(null);
    const [aiStatus, setAiStatus] = useState("disconnected");
    const [aiBuffer, setAiBuffer] = useState([]);
    const [aiEmotion, setAiEmotion] = useState("Neutral");
    
    // We use a ref so the interval loop can read the latest value without restarting
    const isVideoEnabledRef = useRef(isVideoEnabled);
    const isActiveRef = useRef(isActive);
    const onTranslationReceivedRef = useRef(onTranslationReceived);

    useEffect(() => {
        isVideoEnabledRef.current = isVideoEnabled;
    }, [isVideoEnabled]);

    useEffect(() => {
        isActiveRef.current = isActive;
    }, [isActive]);

    useEffect(() => {
        onTranslationReceivedRef.current = onTranslationReceived;
    }, [onTranslationReceived]);

    useEffect(() => {
        if (!stream || !isActive) return;

        console.log("🤖 Initializing Python AI WebSocket connection...");
        const video = document.createElement("video");
        video.srcObject = stream;
        video.muted = true;
        video.playsInline = true;
        video.play().catch(e => console.warn("AI Video play failed:", e));

        const canvas = document.createElement("canvas");
        // Reverting to higher resolution for better model accuracy now that we have Hugging Face resources
        canvas.width = 320; 
        canvas.height = 320;
        const ctx = canvas.getContext("2d");

        // Fallback to Hugging Face URL if no env var is set and we are in production
        const defaultWsUrl = typeof window !== 'undefined' && window.location.hostname !== 'localhost' 
            ? "wss://an1204-accessaudio.hf.space/ws" 
            : "ws://localhost:8000/ws";
            
        const wsUrl = process.env.NEXT_PUBLIC_AI_WS_URL || defaultWsUrl;
        console.log(`🔌 Attempting to connect to AI WebSocket at: ${wsUrl}`);
        
        let reconnectTimeout;
        let loopId;

        const connect = () => {
            const ws = new WebSocket(wsUrl);
            wsRef.current = ws;
            ws.waitingForAck = false;

            const sendFrames = () => {
                if (ws.readyState === WebSocket.OPEN && isVideoEnabledRef.current && isActiveRef.current) {
                    if (video.videoWidth > 0 && video.videoHeight > 0 && !ws.waitingForAck) {
                        ws.waitingForAck = true;
                        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                        // Increased quality to 0.7 for better detection accuracy
                        const b64 = canvas.toDataURL("image/jpeg", 0.7);
                        ws.send(JSON.stringify({ type: "frame", image: b64 }));
                    }
                }
                // Polling rate at 33ms (~30 FPS) to match localhost performance
                loopId = setTimeout(sendFrames, 33);
            };

            ws.onopen = () => {
                console.log("✅ AI WebSocket Connected");
                setAiStatus("connected");
                sendFrames();
            };

            ws.onmessage = (event) => {
                try {
                    const data = JSON.parse(event.data);
                    if (data.type === "buffer_update") {
                        setAiBuffer(data.words);
                    } else if (data.type === "emotion_update") {
                        setAiEmotion(data.emotion);
                    } else if (data.type === "translating") {
                        setAiStatus("translating");
                    } else if (data.type === "translation_result") {
                        setAiStatus("connected");
                        setAiBuffer([]);
                        if (onTranslationReceivedRef.current) {
                            onTranslationReceivedRef.current({
                                text: data.sentence,
                                emotion: data.emotion,
                                source: data.source ? data.source.join(" ") : ""
                            });
                        }
                    } else if (data.type === "ack") {
                        ws.waitingForAck = false;
                    }
                } catch (e) {
                    console.error("Failed to parse AI message:", e);
                }
            };

            ws.onclose = (e) => {
                console.log(`❌ AI Backend Disconnected (Code: ${e.code}). Reconnecting in 3s...`);
                setAiStatus("disconnected");
                if (loopId) clearTimeout(loopId);
                reconnectTimeout = setTimeout(connect, 3000);
            };

            ws.onerror = (err) => {
                console.error("⚠️ WebSocket Error:", err);
                ws.close();
            };
        };

        connect();

        return () => {
            if (loopId) clearTimeout(loopId);
            if (reconnectTimeout) clearTimeout(reconnectTimeout);
            video.pause();
            video.srcObject = null;
            if (wsRef.current) {
                wsRef.current.onclose = null; // Prevent reconnection on intentional close
                wsRef.current.close();
            }
        };
    }, [stream, isActive]); 

    const triggerTranslation = (e) => {
        if (e) { e.preventDefault(); e.stopPropagation(); }
        console.log("👆 TRANSLATE Button Clicked! Dispatching to Python.");
        if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
            wsRef.current.send(JSON.stringify({ type: "approve" }));
        }
    };

    const clearBuffer = (e) => {
        if (e) { e.preventDefault(); e.stopPropagation(); }
        console.log("🗑️ CLEAR Button Clicked! Dispatching to Python.");
        if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
            wsRef.current.send(JSON.stringify({ type: "clear" }));
        }
    };

    return { aiStatus, aiBuffer, aiEmotion, triggerTranslation, clearBuffer };
}
