"use client";

import { useEffect, useState, useRef } from "react";
import { cloneDeep } from "lodash";
import { useParams } from "next/navigation";

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
  const [morseText, setMorseText] = useState('');
  const avatarIframeRef = useRef(null);
  const morseSequenceRef = useRef('');
  const morseTextRef = useRef('');
  const lastKeyUpTimeRef = useRef(0);
  const isSpacePressedRef = useRef(false);
  const spaceDownTimeRef = useRef(0);

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
    if (isAvatarEnabled && avatarIframeRef.current && captions?.length > 0) {
      const latestCaption = captions[captions.length - 1];
      if (latestCaption.text) {
        // Use postMessage to push the text seamlessly into the Angular NGXS Store without reloading the page
        console.log("Piping text to 3D Avatar:", latestCaption.text);
        
        // Ensure we send a default signed language if none is present to avoid "Access Denied"
        avatarIframeRef.current.contentWindow.postMessage({
          type: 'SET_TEXT',
          text: latestCaption.text,
          signedLanguage: 'ase' // Default to American Sign Language if not specified
        }, '*');
      }
    }
  }, [captions, isAvatarEnabled]);

  // Morse Code Input Handling
  useEffect(() => {
    if (!isMorseEnabled) return;

    const handleKeyDown = (e) => {
      if (e.code === 'Space' && !isSpacePressedRef.current) {
        e.preventDefault();
        isSpacePressedRef.current = true;
        spaceDownTimeRef.current = Date.now();
      }
    };

    const handleKeyUp = (e) => {
      if (e.code === 'Space' && isSpacePressedRef.current) {
        e.preventDefault();
        isSpacePressedRef.current = false;
        const duration = Date.now() - spaceDownTimeRef.current;
        const signal = duration > 200 ? '-' : '.';
        morseSequenceRef.current += signal;
        lastKeyUpTimeRef.current = Date.now();
      }
    };

    const checkForLetter = () => {
      const now = Date.now();
      if (morseSequenceRef.current && (now - lastKeyUpTimeRef.current) > 500) {
        const letter = MORSE_CODE[morseSequenceRef.current];
        if (letter) {
          morseTextRef.current += letter;
          console.log(`Morse Letter: ${letter}, Text: ${morseTextRef.current}`);
        }
        morseSequenceRef.current = '';
      }
      if (morseTextRef.current && (now - lastKeyUpTimeRef.current) > 1000) {
        // Send the word as a chat message
        if (sendMessage && morseTextRef.current.trim()) {
          sendMessage(`[Morse] ${morseTextRef.current}`);
          console.log(`Sent Morse message: ${morseTextRef.current}`);
        }
        morseTextRef.current = '';
      }
    };

    const interval = setInterval(checkForLetter, 100);

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      clearInterval(interval);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [isMorseEnabled, sendMessage]);

  // Call duration timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCallDuration(Math.floor((Date.now() - callStartTime) / 1000));
    }, 1000);

    return () => clearInterval(timer);
  }, [callStartTime]);

  // Morse Code handlers
  const handleMorseSignal = (signal) => {
    if (socket) {
      socket.emit("morse_signal", { signal });
    }
  };

  const handleMorseEndLetter = () => {
    if (socket) {
      socket.emit("morse_end_letter");
    }
  };

  const handleMorseTranslate = () => {
    if (socket) {
      socket.emit("approve", { epoch: Date.now() });
    }
  };

  const handleMorseClear = () => {
    setMorseText('');
    if (socket) {
      socket.emit("clear", { epoch: Date.now() });
    }
  };

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
            onSignal={handleMorseSignal}
            onEndLetter={handleMorseEndLetter}
            onTranslate={handleMorseTranslate}
            onClear={handleMorseClear}
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
    </>
  );
};

export default Room;