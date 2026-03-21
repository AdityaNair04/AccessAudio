import { useState, useEffect, useRef } from "react";

export default function useSpeechToText(isEnabled, onFinalTranscript) {
  const [interimTranscript, setInterimTranscript] = useState("");
  const recognitionRef = useRef(null);

  // Use a ref for the callback so the latest function is always used without triggering re-renders
  const onFinalTranscriptRef = useRef(onFinalTranscript);
  useEffect(() => {
    onFinalTranscriptRef.current = onFinalTranscript;
  }, [onFinalTranscript]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Check for native browser support
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.warn("Speech Recognition API is not supported natively in this browser.");
      return;
    }

    if (isEnabled && !recognitionRef.current) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = "en-US"; 

      recognition.onresult = (event) => {
        let interim = "";
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            const finalString = event.results[i][0].transcript.trim();
            if (finalString && onFinalTranscriptRef.current) {
              onFinalTranscriptRef.current(finalString);
            }
          } else {
            interim += event.results[i][0].transcript;
          }
        }
        setInterimTranscript(interim);
      };

      recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
      };

      recognition.onend = () => {
         // Auto-restart if it naturally times out but remains 'enabled' globally
         if (recognitionRef.current && isEnabled) {
             try {
                 recognitionRef.current.start();
             } catch(e) {}
         }
      };

      recognitionRef.current = recognition;
      try {
        recognition.start();
      } catch (e) {
         console.error("Could not mount Speech Recognition API", e);
      }
    } else if (!isEnabled && recognitionRef.current) {
      // Cleanup when disabled
      const rec = recognitionRef.current;
      rec.onend = null; 
      rec.stop();
      recognitionRef.current = null;
      setInterimTranscript("");
    }

    // Cleanup on hook unmount
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.onend = null;
        recognitionRef.current.stop();
        recognitionRef.current = null;
      }
    };
  }, [isEnabled]);

  return { interimTranscript };
}
