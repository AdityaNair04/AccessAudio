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
  const avatarIframeRef = useRef(null);

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

  // Call duration timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCallDuration(Math.floor((Date.now() - callStartTime) / 1000));
    }, 1000);

    return () => clearInterval(timer);
  }, [callStartTime]);

  // Add yourself to players when stream is ready
  useEffect(() => {
    if (myId && stream) {
      setPlayers((prev) => ({
        ...prev,
        [myId]: {
          url: stream,
          muted: true, // Always mute own audio to prevent feedback
          playing: isVideoEnabled,
          audioEnabled: isAudioEnabled, // Track actual audio state
        },
      }));
    }
  }, [myId, stream, isAudioEnabled, isVideoEnabled, setPlayers]);

  // Enhanced retry media stream with audio diagnostics
  const retryMediaStream = async () => {
    if (process.env.NODE_ENV === "development") {
      const { quickAudioCheck } = await import("@/utils/audio-diagnostics");
      console.log("🔍 Running audio diagnostics before retry...");
      await quickAudioCheck();
    }
    window.location.reload();
  };

  useEffect(() => {
    if (!socket || !peer || !stream) return;

    const handleUserConnected = (newUser) => {
      console.log(`user connected in room with userId ${newUser}`);
      const call = peer.call(newUser, stream);

      call.on("stream", (incomingStream) => {
        console.log(`incoming stream from ${newUser}`);
        setPlayers((prev) => ({
          ...prev,
          [newUser]: {
            url: incomingStream,
            muted: false, // Allow remote audio to be heard
            playing: true,
            audioEnabled: true, // Track actual audio state
          },
        }));

        setUsers((prev) => ({
          ...prev,
          [newUser]: call,
        }));
      });

      // Handle call close event for outgoing calls
      call.on("close", () => {
        console.log(`Outgoing call closed with ${newUser}`);
        setPlayers((prev) => {
          const copy = cloneDeep(prev);
          delete copy[newUser];
          return copy;
        });

        setUsers((prev) => {
          const copy = cloneDeep(prev);
          delete copy[newUser];
          return copy;
        });
      });

      // Handle call error event for outgoing calls
      call.on("error", (error) => {
        console.error(`Outgoing call error with ${newUser}:`, error);
        setPlayers((prev) => {
          const copy = cloneDeep(prev);
          delete copy[newUser];
          return copy;
        });

        setUsers((prev) => {
          const copy = cloneDeep(prev);
          delete copy[newUser];
          return copy;
        });
      });
    };

    socket.on("user-connected", handleUserConnected);

    return () => {
      socket.off("user-connected", handleUserConnected);
    };
  }, [peer, setPlayers, socket, stream]);

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

    socket.on("user-toggle-audio", handleToggleAudio);
    socket.on("user-toggle-video", handleToggleVideo);
    socket.on("user-leave", handleUserLeave);

    return () => {
      socket.off("user-toggle-audio", handleToggleAudio);
      socket.off("user-toggle-video", handleToggleVideo);
      socket.off("user-leave", handleUserLeave);
    };
  }, [players, setPlayers, socket, users, cleanupPeerDataChannel]);

  useEffect(() => {
    if (!peer || !stream) return;

    peer.on("call", (call) => {
      const { peer: callerId } = call;
      call.answer(stream);

      call.on("stream", (incomingStream) => {
        console.log(`incoming stream from ${callerId}`);
        setPlayers((prev) => ({
          ...prev,
          [callerId]: {
            url: incomingStream,
            muted: false, // Allow remote audio to be heard
            playing: true,
            audioEnabled: true, // Track actual audio state
          },
        }));

        setUsers((prev) => ({
          ...prev,
          [callerId]: call,
        }));
      });

      // Handle call close event
      call.on("close", () => {
        console.log(`Call closed with ${callerId}`);
        // Remove from players and users when call is closed
        setPlayers((prev) => {
          const copy = cloneDeep(prev);
          delete copy[callerId];
          return copy;
        });

        setUsers((prev) => {
          const copy = cloneDeep(prev);
          delete copy[callerId];
          return copy;
        });
      });

      // Handle call error event
      call.on("error", (error) => {
        console.error(`Call error with ${callerId}:`, error);
        // Remove from players and users on error
        setPlayers((prev) => {
          const copy = cloneDeep(prev);
          delete copy[callerId];
          return copy;
        });

        setUsers((prev) => {
          const copy = cloneDeep(prev);
          delete copy[callerId];
          return copy;
        });
      });
    });
  }, [peer, setPlayers, stream]);

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
  }, [myId, setPlayers, stream, isVideoEnabled]); // Removed isAudioEnabled dependency

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
                allow="camera; microphone; display-capture; clipboard-read; clipboard-write; autoplay"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
                allowFullScreen
              />
            </div>
          )}

          {/* Video Grid */}
          <div className="flex-1 w-full p-4 overflow-hidden relative">
            <SimpleVideoGrid
              players={players}
              highlightedPlayerId={
                playerHighlighted
                  ? Object.keys(players).find(
                      (id) => players[id] === playerHighlighted
                    )
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
            />
          </div>

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