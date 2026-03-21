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
        // Keep resolution extremely low to optimize base64 websocket bandwidth
        canvas.width = 300; 
        canvas.height = 300;
        const ctx = canvas.getContext("2d");

        const ws = new WebSocket("ws://localhost:8000/ws");
        wsRef.current = ws;

        ws.onopen = () => {
            console.log("✅ Connected to Python AI Backend!");
            setAiStatus("connected");
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

        ws.onclose = () => {
            console.log("❌ Disconnected from AI Backend");
            setAiStatus("disconnected");
        };

        let loopId;
        ws.waitingForAck = false;
        
        const sendFrames = () => {
            if (ws.readyState === WebSocket.OPEN && isVideoEnabledRef.current && isActiveRef.current) {
                if (video.videoWidth > 0 && video.videoHeight > 0 && !ws.waitingForAck) {
                    ws.waitingForAck = true; // Block until Python acks
                    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                    const b64 = canvas.toDataURL("image/jpeg", 0.4);
                    ws.send(JSON.stringify({
                        type: "frame",
                        image: b64
                    }));
                }
            }
            // Increase polling rate to 50ms since it's now fully bound by the ACK cycle
            loopId = setTimeout(sendFrames, 50);
        };

        ws.addEventListener("open", sendFrames);

        return () => {
            clearTimeout(loopId);
            video.pause();
            video.srcObject = null;
            if (ws.readyState === WebSocket.OPEN || ws.readyState === WebSocket.CONNECTING) {
                ws.close();
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
