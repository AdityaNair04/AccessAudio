"use client";

import React, { useEffect, useRef, useState } from "react";
import { Volume2, Loader2, Link2Off, Send, X, Mic } from "lucide-react";

export default function CaptionsOverlay({ captions, aiStatus, aiBuffer, aiEmotion, onApprove, onClear, isSpeechEnabled, interimTranscript }) {
  // TTS Playback Reference
  const synthRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      synthRef.current = window.speechSynthesis;
    }
  }, []);

  const playTTS = (text, emotion) => {
    if (!synthRef.current) return;
    
    // Optional: Stop anything currently playing
    synthRef.current.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    // You can adjust rate/pitch based on emotion if desired!
    if (emotion?.toLowerCase() === 'sad') utterance.pitch = 0.8;
    if (emotion?.toLowerCase() === 'happy') utterance.pitch = 1.2;
    
    synthRef.current.speak(utterance);
  };

  // Keep only the most recent 2 captions for readability
  const displayCaptions = captions.slice(-2);

  return (
    <div className="w-full flex flex-col items-center justify-end z-40 pointer-events-none">
      
      {/* Sender's Real-time Buffer & Manual Controls (Pointer Events Auto to allow clicks) */}
      {aiBuffer && aiBuffer.length > 0 && (
        <div className="mb-3 w-full bg-slate-900/90 border border-slate-700/50 rounded-xl p-4 shadow-xl backdrop-blur-md pointer-events-auto flex flex-col gap-3 transition-all duration-300">
           <div className="flex flex-col">
             <span className="text-slate-400 text-xs uppercase tracking-wider font-semibold mb-1">Detecting Signs (Local)</span>
             <div className="text-yellow-400 font-mono text-sm leading-relaxed">
               {aiBuffer.join(" → ")} <span className="ml-1 text-slate-500">[{aiEmotion}]</span>
             </div>
           </div>
           
           <div className="flex gap-2 justify-end mt-1">
              <button 
                onClick={onClear} 
                className="px-4 py-1.5 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white text-sm font-medium transition-colors flex items-center gap-1.5"
              >
                <X className="w-4 h-4" /> Clear
              </button>
              <button 
                onClick={onApprove} 
                className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium shadow-md shadow-blue-900/20 transition-all flex items-center gap-1.5"
              >
                <Send className="w-4 h-4" /> Translate
              </button>
           </div>
        </div>
      )}

      {/* Speech-to-Text Live Transcript (Voice Only) */}
      {isSpeechEnabled && interimTranscript && (
        <div className="mb-3 w-full bg-slate-900/90 border border-slate-700/50 rounded-xl p-4 shadow-xl backdrop-blur-md flex flex-col gap-3 transition-all duration-300 pointer-events-auto">
           <div className="flex flex-col">
             <span className="text-slate-400 text-xs uppercase tracking-wider font-semibold mb-1 flex items-center gap-2">
               <Mic className="w-3.5 h-3.5 text-blue-400 animate-pulse" /> Subtitling Voice (Local)
             </span>
             <div className="text-blue-400 font-medium text-sm leading-relaxed italic">
               &quot;{interimTranscript}&quot;
             </div>
           </div>
        </div>
      )}

      {/* AI Status Indicators */}
      {aiStatus === 'translating' && (
        <div className="mb-2 bg-blue-600/90 text-white text-xs px-4 py-1.5 flex items-center gap-2 rounded-full shadow-lg">
           <Loader2 className="w-3.5 h-3.5 animate-spin"/> Gemini is Translating Context...
        </div>
      )}
      
      {aiStatus === 'connected' && (!aiBuffer || aiBuffer.length === 0) && !isSpeechEnabled && (
        <div className="mb-2 bg-emerald-600/90 text-white text-xs px-4 py-1.5 flex items-center gap-2 rounded-full shadow-lg transition-all">
           <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
           Analyzing Video [{aiEmotion || "Neutral"}]
        </div>
      )}

      {/* Actual Captions Area */}
      <div className="w-full flex flex-col gap-2">
        {displayCaptions.map((cap) => (
          <div 
            key={cap.id} 
            className="flex items-center gap-3 bg-black/70 backdrop-blur-md border border-white/10 rounded-2xl p-4 shadow-2xl transition-all duration-300 transform translate-y-0 opacity-100 pointer-events-auto hover:bg-black/80"
          >
            <div className="flex-1 text-center font-medium text-lg tracking-wide text-white drop-shadow-md">
              &quot;{cap.text}&quot;
              {cap.emotion && cap.emotion !== "Neutral" && (
                <span className="ml-2 text-sm text-gray-300 italic opacity-80 border border-white/20 px-2 py-0.5 rounded-full">
                  ({cap.emotion})
                </span>
              )}
            </div>

            <button
              onClick={() => playTTS(cap.text, cap.emotion)}
              className="p-3 rounded-full bg-indigo-600/40 hover:bg-indigo-500 transition-colors tooltip-trigger"
              title="Play Text-to-Speech"
            >
              <Volume2 className="w-5 h-5 text-white" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
