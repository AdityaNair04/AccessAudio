"use client";

import { useEffect, useState, useRef } from "react";
import { cloneDeep } from "lodash";
import { useParams } from "next/navigation";
import io from 'socket.io-client';

import { useSocket } from "@/store/socket";
import usePeer from "@/hooks/use-peer";
import useMediaStream from "@/hooks/use-media-stream";
import usePlayer from "@/hooks/use-player";
import useChat from "@/hooks/use-chat";

import CopySection from "@/components/copy-section";

import usePythonAI from "@/hooks/use-python-ai";
import useSpeechToText from "@/hooks/use-speech-to-text";
import CaptionsOverlay from "@/components/ui/captions-overlay";

// Modern UI Components
import SimpleCallLayout from "@/components/ui/simple-call-layout";
import FloatingControls from "@/components/ui/floating-controls";
import SimpleVideoGrid from "@/components/ui/simple-video-grid";
import SimpleChat from "@/components/ui/simple-chat";
import PermissionRequest from "@/components/ui/permission-request";
import MorseCode from "@/components/ui/morse-code";
import { VibrationSetupModal } from "@/components/ui/vibration-setup-modal";

const MORSE_CODE = {
  '.-': 'A',
  '-...': 'B',
  '-.-.': 'C',
  '-..': 'D',
  '.': 'E',
  '..-.': 'F',
  '--.': 'G',
  '....': 'H',
  '..': 'I',
  '.---': 'J',
  '-.-': 'K',
  '.-..': 'L',
  '--': 'M',
  '-.': 'N',
  '---': 'O',
  '.--.': 'P',
  '--.-': 'Q',
  '.-.': 'R',
  '...': 'S',
  '-': 'T',
  '..-': 'U',
  '...-': 'V',
  '.--': 'W',
  '-..-': 'X',
  '-.--': 'Y',
  '--..': 'Z',
  '.----': '1',
  '..---': '2',
  '...--': '3',
  '....-': '4',
  '.....': '5',
  '-....': '6',
  '--...': '7',
  '---..': '8',
  '----.': '9',
  '-----': '0'
};

const textToMorse = (text) => {
  return text.toUpperCase().split('').map(char => MORSE_CODE[char] || '').join(' ');
};

const playMorseAudio = (morseCode) => {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator.frequency.setValueAtTime(100, audioContext.currentTime); // Bass frequency
  gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);

  let time = audioContext.currentTime;
  const dotDuration = 0.1;
  const dashDuration = 0.3;
  const pauseDuration = 0.1;
  const letterPause = 0.3;
  const wordPause = 0.7;

  morseCode.split(' ').forEach((symbol) => {
    if (symbol === '/') {
      time += wordPause;
    } else {
      symbol.split('').forEach(char => {
        oscillator.frequency.setValueAtTime(100, time);
        gainNode.gain.setValueAtTime(0.3, time);
        const duration = char === '.' ? dotDuration : dashDuration;
        gainNode.gain.setValueAtTime(0, time + duration);
        time += duration + pauseDuration;
      });
      time += letterPause - pauseDuration;
    }
  });

  oscillator.start(audioContext.currentTime);
  oscillator.stop(time);
};

const speakText = (text) => {
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  }
};

const retryMediaStream = async () => {
  if (typeof window !== 'undefined' && process.env.NODE_ENV === "development") {
    try {
      const { quickAudioCheck } = await import("@/utils/audio-diagnostics");
      console.log("🔍 Running audio diagnostics before retry...");
      await quickAudioCheck();
    } catch (e) {
      console.warn("Audio diagnostics not available:", e);
    }
  }
  window.location.reload();
};

const Room = () => {
  const socket = useSocket();
  const { roomId } = useParams(); 
  const { peer, myId } = usePeer();
  const {
    stream,
    isAudioEnabled,
    isVideoEnabled,
    toggleAudio: toggleStreamAudio,
    toggleVideo: toggleStreamVideo,
    error: mediaError,
    permissions,
    audioDevices,
    selectedAudioInput,
    selectedAudioOutput,
    switchAudioInput,
    switchAudioOutput,
  } = useMediaStream();
  const {
    players,
    setPlayers,
    playerHighlighted,
    nonHighlightedPlayers,
    toggleAudio,
    toggleVideo,
    leaveRoom,
  } = usePlayer(myId, roomId, peer, {
    toggleAudio: toggleStreamAudio,
    toggleVideo: toggleStreamVideo,
    isAudioEnabled,
    isVideoEnabled,
  });

  const [users, setUsers] = useState([]);
  const [callStartTime] = useState(Date.now());
  const [callDuration, setCallDuration] = useState(0);
  const [showTroubleshooter, setShowTroubleshooter] = useState(false);
  const [isSpeechEnabled, setIsSpeechEnabled] = useState(false);
  const [isAvatarEnabled, setIsAvatarEnabled] = useState(false);
  const [isMorseEnabled, setIsMorseEnabled] = useState(false);
  const [isVibrationEnabled, setIsVibrationEnabled] = useState(false);
  const [morseText, setMorseText] = useState('');
  const avatarIframeRef = useRef(null);
  const [morseDraft, setMorseDraft] = useState('');
  const [showMorseReady, setShowMorseReady] = useState(false);
  const hapticSocketRef = useRef(null);
  const lastSpokenCaptionRef = useRef(null);
  const [showVibrationSetup, setShowVibrationSetup] = useState(false);
  const [hapticBridgeConnected, setHapticBridgeConnected] = useState(false);

  const callState = useRef({});
  const CALL_RETRY_MAX = 4;
  const CALL_RETRY_BASE_MS = 1200;

  const isPeerInRoom = (peerId) => !!peerId && Object.keys(players).includes(peerId);

  const cleanupPeerCall = (peerId, isRetrying = false) => {
    if (!peerId) return;
    if (users[peerId]) {
      try {
        users[peerId].close();
      } catch (e) {
        console.warn(`Unable to close call for ${peerId}:`, e);
      }
    }

    if (!isRetrying) {
      setPlayers((prev) => {
        const copy = cloneDeep(prev);
        delete copy[peerId];
        return copy;
      });
      delete callState.current[peerId];
    } else {
      // Retain the video frame but mark it as reconnecting
      setPlayers((prev) => {
        const copy = cloneDeep(prev);
        if (copy[peerId]) {
          copy[peerId].isReconnecting = true;
          copy[peerId].playing = false;
        }
        return copy;
      });
    }

    setUsers((prev) => {
      const copy = cloneDeep(prev);
      delete copy[peerId];
      return copy;
    });
  };

  const schedulePeerCallRetry = (peerId, callback) => {
    if (!peerId || !callback) return;

    const failCount = callState.current[peerId]?.retryCount || 0;
    if (failCount >= CALL_RETRY_MAX) {
      console.warn(`⚠️ Peer ${peerId} exceeded retry limit (${CALL_RETRY_MAX})`);
      cleanupPeerCall(peerId);
      return;
    }

    callState.current[peerId] = { retryCount: failCount + 1 };
    const delay = CALL_RETRY_BASE_MS * (failCount + 1);
    console.log(`🔄 Scheduling reconnect for ${peerId} in ${delay}ms`);

    setTimeout(() => {
      if (peer && stream && isPeerInRoom(peerId)) {
        callback();
      }
    }, delay);
  };

  // Initialize chat functionality
  const {
    messages,
    connectedPeers,
    isConnected: isChatConnected,
    sendMessage,
    cleanupPeerDataChannel,
    sendCaption, 
    captions
  } = useChat(peer, myId, users);

  // Disable AI processing completely if the user is the only one in the room
  // Also disable Sign Language AI if they have manually enabled Voice STT (since they are mutually exclusive)
  const isAlone = Object.keys(players).length <= 1;

  // Initialize WebRTC-to-Python AI Bridge (Sign Language)
  const { aiStatus, aiBuffer, aiEmotion, triggerTranslation, clearBuffer } = usePythonAI(
    stream, 
    isVideoEnabled, 
    (!isAlone && !isSpeechEnabled), // isActive parameter
    (translation) => {
      // Broadcast translation to remote peers natively
      sendCaption(translation);
    }
  );

  // Initialize Native Browser Speech-to-Text Pipeline
  const { interimTranscript } = useSpeechToText(isSpeechEnabled, (finalText) => {
    // Automatically broadcast Voice captions as soon as an utterance finishes
    sendCaption({ text: finalText, emotion: "Speaking" });
  });

  // Automatically pipe finished transcriptions to the 3D Avatar Angular Application 
  useEffect(() => {
    if (captions?.length > 0) {
      const latestCaption = captions[captions.length - 1];
      if (latestCaption.text) {
        // Pipe to 3D Avatar if enabled
        if (isAvatarEnabled && avatarIframeRef.current) {
          console.log("Piping text to 3D Avatar:", latestCaption.text);
          avatarIframeRef.current.contentWindow.postMessage({
            type: 'SET_TEXT',
            text: latestCaption.text,
            signedLanguage: 'ase'
          }, '*');
        }

        // Speak text only if: (1) speech synthesis is enabled AND (2) this is a speech-generated caption (emotion === 'Speaking') AND (3) it hasn't been spoken already
        if (isSpeechEnabled && latestCaption.emotion === 'Speaking') {
          const captionId = `${latestCaption.text}-${latestCaption.emotion}`;
          if (lastSpokenCaptionRef.current !== captionId) {
            speakText(latestCaption.text);
            lastSpokenCaptionRef.current = captionId;
          }
        }

        // Send vibration if enabled
        if (isVibrationEnabled) {
          sendVibration(latestCaption.text);
        }
      }
    }
  }, [captions, isAvatarEnabled, isSpeechEnabled, isVibrationEnabled]);


  // Call duration timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCallDuration(Math.floor((Date.now() - callStartTime) / 1000));
    }, 1000);

    return () => clearInterval(timer);
  }, [callStartTime]);

  // Morse Code handlers (user-driven explicit workflow)
  const handleMorseSubmit = (text) => {
    if (!text || !socket) return;
    // Send as normal chat message with user identity (You / peer)
    sendMessage(text);
    sendCaption({ text, emotion: 'Speaking' });
    setMorseText('');
    setShowMorseReady(false);
  };

  const handleMorseSpeak = (text) => {
    if (!text) return;
    speakText(text);
    setShowMorseReady(true);
  };

  const handleMorseClear = () => {
    setMorseText('');
    setShowMorseReady(false);
  };

  // Vibration output logic
  const sendVibration = (text) => {
    if (!isVibrationEnabled || !text || !hapticSocketRef.current) return;

    try {
      hapticSocketRef.current.emit('vibrate', { text });
      console.log(`📳 Sent vibration for text: "${text}"`);
    } catch (error) {
      console.warn('❌ Failed to send vibration:', error);
    }
  };

  // Connect/disconnect to haptic bridge
  useEffect(() => {
    if (isVibrationEnabled && typeof window !== 'undefined') {
      // Show setup guide on first vibration enable
      setShowVibrationSetup(true);

      try {
        hapticSocketRef.current = io('http://localhost:5000', {
          transports: ['websocket', 'polling'],
          reconnection: true,
          reconnectionDelay: 1000,
          reconnectionDelayMax: 5000,
          reconnectionAttempts: 5
        });

        hapticSocketRef.current.on('connect', () => {
          console.log('✅ Connected to haptic bridge at localhost:5000');
          setHapticBridgeConnected(true);
        });

        hapticSocketRef.current.on('connect_error', (error) => {
          console.warn('❌ Haptic bridge connection error:', error?.message || error);
          console.warn('⚠️ Make sure haptic_bridge.py is running: python haptic_bridge.py');
          setHapticBridgeConnected(false);
        });

        hapticSocketRef.current.on('disconnect', () => {
          console.log('🔌 Disconnected from haptic bridge');
          setHapticBridgeConnected(false);
        });

        return () => {
          if (hapticSocketRef.current) {
            hapticSocketRef.current.disconnect();
            hapticSocketRef.current = null;
          }
        };
      } catch (error) {
        console.warn('❌ Could not initialize haptic bridge connection:', error?.message || error);
        console.warn('⚠️ Make sure haptic_bridge.py is running on localhost:5000');
        setHapticBridgeConnected(false);
      }
    } else {
      if (hapticSocketRef.current) {
        hapticSocketRef.current.disconnect();
        hapticSocketRef.current = null;
      }
      setHapticBridgeConnected(false);
    }
  }, [isVibrationEnabled]);

  useEffect(() => {
    if (!socket || !peer || !stream) return;

    const attachCallHandlers = (remoteId, call) => {
      let isConnected = false;
      let timeoutId;

      const cleanupAndRetry = () => {
        clearTimeout(timeoutId);
        console.warn(`Call with ${remoteId} closed or errored, cleaning up and possibly retrying.`);
        cleanupPeerCall(remoteId, true); // True = Retrying

        if (socket && peer && stream) {
          schedulePeerCallRetry(remoteId, () => {
            // Check if player still meant to be in room
            if (isPeerInRoom(remoteId)) {
              makeCall(remoteId);
            }
          });
        }
      };

      timeoutId = setTimeout(() => {
        if (!isConnected && isPeerInRoom(remoteId)) {
          console.warn(`⏳ Connection to ${remoteId} timed out. Forcing retry.`);
          cleanupAndRetry();
        }
      }, 5000);

      call.on("stream", (incomingStream) => {
        clearTimeout(timeoutId);
        isConnected = true;
        console.log(`incoming stream from ${remoteId}`);
        if (callState.current[remoteId]) {
          callState.current[remoteId].retryCount = 0;
        } else {
          callState.current[remoteId] = { retryCount: 0 };
        }
        setPlayers((prev) => ({
          ...prev,
          [remoteId]: {
            url: incomingStream,
            muted: false,
            playing: true,
            audioEnabled: true,
          },
        }));

        setUsers((prev) => ({
          ...prev,
          [remoteId]: call,
        }));
      });

      call.on("close", cleanupAndRetry);
      call.on("error", (err) => {
        console.error(`Outgoing call error with ${remoteId}:`, err);
        cleanupAndRetry();
      });
    };

    const makeCall = (remoteId) => {
      if (!peer || !remoteId || remoteId === myId) return;
      if (users[remoteId] && users[remoteId].open) {
        console.log(`Already have an active call to ${remoteId}, skipping new call.`);
        return;
      }

      const outgoingStream = stream;
      if (!outgoingStream) {
        console.warn("No outgoing stream available for makeCall");
        return;
      }

      console.log(`user connected in room with userId ${remoteId}`);
      const call = peer.call(remoteId, outgoingStream);
      attachCallHandlers(remoteId, call);
      if (!callState.current[remoteId]) {
        callState.current[remoteId] = { retryCount: 0 };
      }
    };

    const handleUserConnected = (newUser) => {
      makeCall(newUser);
    };

    socket.on("user-connected", handleUserConnected);

    return () => {
      socket.off("user-connected", handleUserConnected);
    };
  }, [peer, setPlayers, socket, stream, users, myId]);

  useEffect(() => {
    if (!socket) return;

    const handleToggleAudio = (userId) => {
      console.log(`user with id ${userId} toggled audio`);
      setPlayers((prev) => {
        const copy = cloneDeep(prev);
        if (copy[userId]) {
          // Toggle the audioEnabled state for display purposes
          copy[userId].audioEnabled = !copy[userId].audioEnabled;
          // Set muted based on audioEnabled state - if audio is disabled, mute it
          copy[userId].muted = !copy[userId].audioEnabled;
        }
        return { ...copy };
      });
    };

    const handleToggleVideo = (userId) => {
      console.log(`user with id ${userId} toggled video`);
      setPlayers((prev) => {
        const copy = cloneDeep(prev);
        copy[userId].playing = !copy[userId].playing;
        return { ...copy };
      });
    };

    const handleUserLeave = (userId) => {
      console.log(`user ${userId} is leaving the room`);

      // Clean up chat data channel for leaving user
      cleanupPeerDataChannel(userId);

      // Clean up peer connection
      if (users[userId]) {
        users[userId].close();
      }

      // Remove from players state
      setPlayers((prev) => {
        const copy = cloneDeep(prev);
        delete copy[userId];
        return copy;
      });

      // Remove from users state
      setUsers((prev) => {
        const copy = cloneDeep(prev);
        delete copy[userId];
        return copy;
      });
    };

    const handleMorseUpdate = (data) => {
      setMorseText(data.text);
    };

    socket.on("user-toggle-audio", handleToggleAudio);
    socket.on("user-toggle-video", handleToggleVideo);
    socket.on("user-leave", handleUserLeave);
    socket.on("morse_update", handleMorseUpdate);


    return () => {
      socket.off("user-toggle-audio", handleToggleAudio);
      socket.off("user-toggle-video", handleToggleVideo);
      socket.off("user-leave", handleUserLeave);
      socket.off("morse_update", handleMorseUpdate);
    };
  }, [players, setPlayers, socket, users, cleanupPeerDataChannel]);

  useEffect(() => {
    if (!peer || !stream) return;

    const handleIncomingCall = (call) => {
      const callerId = call.peer;
      console.log(`✔️ Incoming call from ${callerId}`);
      call.answer(stream);

      call.on("stream", (incomingStream) => {
        console.log(`incoming stream from ${callerId}`);

        if (callState.current[callerId]) {
          callState.current[callerId].retryCount = 0;
        } else {
          callState.current[callerId] = { retryCount: 0 };
        }
        setPlayers((prev) => ({
          ...prev,
          [callerId]: {
            url: incomingStream,
            muted: false,
            playing: true,
            audioEnabled: true,
          },
        }));

        setUsers((prev) => ({
          ...prev,
          [callerId]: call,
        }));
      });

      const handleCloseOrError = (reason) => {
        console.warn(`Incoming call with ${callerId} closed/error:`, reason);
        cleanupPeerCall(callerId, true); // True = Retrying

        if (socket && peer && stream && isPeerInRoom(callerId)) {
          schedulePeerCallRetry(callerId, () => {
            if (peer && stream && isPeerInRoom(callerId)) {
              const retryCall = peer.call(callerId, stream);
              let isConnected = false;
              let timeoutId = setTimeout(() => {
                if (!isConnected && isPeerInRoom(callerId)) {
                   console.warn(`⏳ Incoming retry to ${callerId} timed out. Forcing failure.`);
                   handleCloseOrError("timeout retry");
                }
              }, 5000);
              
              retryCall.on("stream", (incomingStream) => {
                clearTimeout(timeoutId);
                isConnected = true;
                if (callState.current[callerId]) {
                  callState.current[callerId].retryCount = 0;
                } else {
                  callState.current[callerId] = { retryCount: 0 };
                }
                setPlayers(prev => ({ 
                  ...prev, 
                  [callerId]: { url: incomingStream, muted: false, playing: true, audioEnabled: true, isReconnecting: false } 
                }));
                setUsers(prev => ({ ...prev, [callerId]: retryCall }));
              });

              retryCall.on("close", () => {
                 clearTimeout(timeoutId);
                 handleCloseOrError("closed retry");
              });
              retryCall.on("error", (err) => {
                 clearTimeout(timeoutId);
                 handleCloseOrError(err);
              });
            }
          });
        }
      };

      call.on("close", () => handleCloseOrError("closed"));
      call.on("error", (error) => handleCloseOrError(error));
    };

    peer.on("call", handleIncomingCall);

    return () => {
      peer.off("call", handleIncomingCall);
    };
  }, [peer, setPlayers, stream, socket]);

  useEffect(() => {
    if (!stream || !myId) return;

    console.log(`setting my stream ${myId}`);
    setPlayers((prev) => ({
      ...prev,
      [myId]: {
        url: stream,
        muted: true, // Always mute own audio to prevent feedback
        playing: isVideoEnabled, // Use actual video state
      },
    }));
  }, [myId, setPlayers, stream, isVideoEnabled]);

  // Apply audio output device to all players when it changes
  useEffect(() => {
    if (selectedAudioOutput && selectedAudioOutput !== 'default') {
      // Apply to all video elements in the page
      const videoElements = document.querySelectorAll('video');
      videoElements.forEach(video => {
        if (video.setSinkId) {
          video.setSinkId(selectedAudioOutput).catch(err => {
            console.warn('Failed to set audio output device:', err);
          });
        }
      });
    }
  }, [selectedAudioOutput]);

  return (
    <>
      {/* Permission Request Overlay */}
      {(mediaError || !permissions.audio || !permissions.video) && (
        <PermissionRequest
          error={mediaError}
          permissions={permissions}
          onRetry={retryMediaStream}
        />
      )}

      <SimpleCallLayout
        roomId={roomId}
        participants={Object.keys(players)}
        onShare={() => {
          if (navigator.clipboard) {
            navigator.clipboard.writeText(window.location.href);
          }
        }}
      >
        {/* Main Video Area */}
        <div className="h-full flex flex-col">
          {/* 3D Avatar Translator Modal Overlay */}
          {isAvatarEnabled && (
            <div className="absolute top-20 left-1/2 -translate-x-1/2 w-full max-w-[340px] h-[360px] bg-slate-900/90 backdrop-blur-md border border-slate-700/70 rounded-2xl shadow-2xl z-50 overflow-hidden flex flex-col pointer-events-auto transition-all animate-in fade-in zoom-in-95 duration-200">
              <div className="flex justify-between items-center px-4 py-2.5 bg-slate-800/80 border-b border-slate-700 shadow-sm">
                <span className="text-xs uppercase tracking-wider font-bold text-slate-300 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  3D Sign Interpreter
                </span>
                <button 
                  onClick={() => setIsAvatarEnabled(false)}
                  className="text-slate-400 hover:bg-slate-700/50 hover:text-white transition-colors w-6 h-6 flex items-center justify-center rounded-lg"
                  title="Close Avatar"
                >
                  ✕
                </button>
              </div>
              {/* Angular Subsystem Embedded Execution */}
              <iframe 
               ref={avatarIframeRef}
               src="/3d-avatar" 
               className="w-full flex-1 border-none bg-slate-900"
               title="Avatar Interpreter"
               allow="camera; microphone; display-capture; clipboard-read; clipboard-write; autoplay; storage-access"
               allowFullScreen
             />
            </div>
          )}

          {/* Video Grid / Screen Share Layout */}
          <div className="flex-1 w-full p-4 overflow-hidden relative">
            <SimpleVideoGrid
              players={players}
              highlightedPlayerId={
                playerHighlighted
                  ? Object.keys(players).find((id) => players[id] === playerHighlighted)
                  : null
              }
              onPlayerClick={(playerId) => {
                console.log(`Player ${playerId} clicked`);
              }}
              myId={myId}
              isAudioEnabled={isAudioEnabled}
              selectedAudioOutput={selectedAudioOutput}
              className="h-full"
            />
          </div>

          {/* Global Captions UI Overlay - Flex-stacked below the video grid */}
          <div className="w-full max-w-3xl pb-24 px-4 z-40 self-center">
            <CaptionsOverlay 
              captions={captions || []}
              aiStatus={aiStatus}
              aiBuffer={aiBuffer}
              aiEmotion={aiEmotion}
              onApprove={triggerTranslation}
              onClear={clearBuffer}
              isSpeechEnabled={isSpeechEnabled}
              interimTranscript={interimTranscript}
              myId={myId}
            />
          </div>

          {/* Morse Code Input */}
          <MorseCode
            isEnabled={isMorseEnabled}
            onSubmit={handleMorseSubmit}
            onSpeak={handleMorseSpeak}
            onClear={handleMorseClear}
            onBufferChange={setMorseText}
            morseText={morseText}
          />

          {/* Room ID Copy Section - Hidden */}
          <div className="hidden">
            <CopySection roomId={roomId} />
          </div>
        </div>

        {/* Floating Controls */}
        {myId && socket && (
          <FloatingControls
            muted={!isAudioEnabled} // When audio is OFF, show as muted
            playing={isVideoEnabled}
            toggleAudio={toggleAudio}
            toggleVideo={toggleVideo}
            leaveRoom={leaveRoom}
            onTroubleshoot={() => setShowTroubleshooter(true)}
            isSpeechEnabled={isSpeechEnabled}
            toggleSpeechToText={() => setIsSpeechEnabled(!isSpeechEnabled)}
            isAvatarEnabled={isAvatarEnabled}
            toggleAvatar={() => setIsAvatarEnabled(!isAvatarEnabled)}
            isMorseEnabled={isMorseEnabled}
            toggleMorse={() => setIsMorseEnabled(!isMorseEnabled)}
            isVibrationEnabled={isVibrationEnabled}
            toggleVibration={() => setIsVibrationEnabled(!isVibrationEnabled)}
          />
        )}

        {/* Simple Chat Component */}
        {myId && (
          <SimpleChat
            messages={messages}
            onSendMessage={sendMessage}
            isConnected={isChatConnected}
            connectedPeers={connectedPeers}
            myId={myId}
          />
        )}
      </SimpleCallLayout>

      {/* Vibration Setup Modal */}
      <VibrationSetupModal 
        isOpen={showVibrationSetup}
        onClose={() => setShowVibrationSetup(false)}
        connectionStatus={hapticBridgeConnected}
        hapticBridgeConnected={hapticBridgeConnected}
      />
    </>
  );
};

export default Room;