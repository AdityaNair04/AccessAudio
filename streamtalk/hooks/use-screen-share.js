import { useState, useEffect, useCallback, useRef, useMemo } from "react";

/**
 * Custom hook for managing screen sharing in WebRTC peer connections
 * Handles graceful switching between camera and screen display
 * Maintains audio stream while sharing screen
 * Broadcasts screen share state to other peers
 *
 * @param {MediaStream} cameraStream - Original camera media stream
 * @param {Object} users - Active peer calls to update with screen stream
 * @param {Object} socket - Socket.io connection for broadcasting
 * @param {string} myId - Current user's peer ID
 * @param {string} roomId - Current room ID
 * @param {function} onScreenShareStatusChange - Callback when screen share starts/stops
 * @param {function} onLocalStreamUpdate - Callback when local displayed stream changes
 * @returns {Object} Screen sharing state and controls
 */
const useScreenShare = (
  cameraStream,
  users = {},
  socket = null,
  myId = "",
  roomId = "",
  onScreenShareStatusChange = () => {},
  onLocalStreamUpdate = () => {}
) => {
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [screenShareError, setScreenShareError] = useState(null);
  const [localScreenStream, setLocalScreenStream] = useState(null);

  const screenStreamRef = useRef(null);
  const originalVideoTrackRef = useRef(null);
  const stopScreenShareRef = useRef(null);
  const isScreenSharingRef = useRef(false);

  useEffect(() => {
    isScreenSharingRef.current = isScreenSharing;
  }, [isScreenSharing]);

  const activeStream = useMemo(() => {
    if (isScreenSharing && screenStreamRef.current) {
      return screenStreamRef.current;
    }
    return cameraStream;
  }, [isScreenSharing, cameraStream]);

  const replaceTrackOnPeers = useCallback(
    async (nextTrack) => {
      if (!nextTrack || !users) return;

      const tasks = Object.entries(users).map(async ([peerId, call]) => {
        if (!call) return;

        if (typeof call.replaceTrack === "function") {
          try {
            await call.replaceTrack(nextTrack);
            console.log(`🔁 call.replaceTrack() used for peer: ${peerId}`);
            return;
          } catch (err) {
            console.warn(`Failed call.replaceTrack for ${peerId}:`, err);
          }
        }

        const pc = call.peerConnection || call._pc || null;
        if (pc && typeof pc.getSenders === "function") {
          const senderTasks = pc
            .getSenders()
            .filter((sender) => sender.track && sender.track.kind === "video")
            .map((sender) =>
              sender.replaceTrack(nextTrack).catch((err) => {
                console.warn(`Failed sender.replaceTrack for ${peerId}:`, err);
              })
            );

          await Promise.all(senderTasks);
        }
      });

      await Promise.all(tasks);
    },
    [users]
  );

  /**
   * Start screen sharing
   * Gets display media, replaces video track in all active calls
   * Keeps audio from camera mic
   * Broadcasts screen share state to other peers
   */
  const startScreenShare = useCallback(async () => {
    if (!cameraStream) {
      const error = "❌ No camera stream available";
      console.error(error);
      setScreenShareError(error);
      return false;
    }

    try {
      console.log("🖥️ Starting screen share...");

      const displayStream = await navigator.mediaDevices.getDisplayMedia({
        video: {
          cursor: "always",
        },
        audio: false,
      });

      const screenVideoTrack = displayStream.getVideoTracks()[0];
      const cameraVideoTrack = cameraStream.getVideoTracks()[0];

      if (!screenVideoTrack || !cameraVideoTrack) {
        throw new Error("Failed to obtain video tracks for screen sharing");
      }

      originalVideoTrackRef.current = cameraVideoTrack;
      screenStreamRef.current = displayStream;

      await replaceTrackOnPeers(screenVideoTrack);

      setIsScreenSharing(true);
      setLocalScreenStream(displayStream);

      onLocalStreamUpdate(displayStream);
      onScreenShareStatusChange("start", myId);

      if (socket && myId && roomId) {
        socket.emit("user-screen-share-start", myId, roomId);
        console.log(`📡 Emitted screen share start for ${myId} to room ${roomId}`);
      }

      screenVideoTrack.onended = async () => {
        console.warn("🖥️ Screen share track ended event", {
          event: "onended",
          readyState: screenVideoTrack.readyState,
          label: screenVideoTrack.label,
          muted: screenVideoTrack.muted,
          enabled: screenVideoTrack.enabled,
        });

        if (!isScreenSharingRef.current) {
          console.warn("🛡️ Ignoring onended because local screen-share flag is false");
          return;
        }

        if (screenVideoTrack.readyState === "live") {
          console.warn("🛡️ Ignoring onended while track is still live (browser may signal transient end)");
          return;
        }

        // Wait briefly (120ms) to reject transient/duplicate events
        await new Promise((resolve) => setTimeout(resolve, 120));
        if (!isScreenSharingRef.current) {
          console.warn("🛡️ Aborting onended flow after delay: screen share already stopped");
          return;
        }

        console.warn("🛠️ onended handler will call stopScreenShare now");
        const stopFn = stopScreenShareRef.current;
        if (typeof stopFn === "function") {
          await stopFn();
        }
      };

      screenVideoTrack.oninactive = () => {
        console.warn("🖥️ Screen share track inactive event", {
          event: "oninactive",
          readyState: screenVideoTrack.readyState,
          label: screenVideoTrack.label,
          muted: screenVideoTrack.muted,
          enabled: screenVideoTrack.enabled,
        });
      };

      screenVideoTrack.onmute = () => {
        console.warn("🖥️ Screen share track muted", {
          event: "onmute",
          readyState: screenVideoTrack.readyState,
          label: screenVideoTrack.label,
        });
      };

      screenVideoTrack.onunmute = () => {
        console.warn("🖥️ Screen share track unmuted", {
          event: "onunmute",
          readyState: screenVideoTrack.readyState,
          label: screenVideoTrack.label,
        });
      };

      setScreenShareError(null);
      console.log("✅ Screen share started successfully");
      return true;
    } catch (error) {
      if (error.name === "NotAllowedError") {
        const msg = "Screen share permission denied by user";
        console.warn(`⚠️ ${msg}`);
        setScreenShareError(msg);
      } else if (error.name === "NotFoundError") {
        const msg = "No screen/window available to share";
        console.warn(`⚠️ ${msg}`);
        setScreenShareError(msg);
      } else {
        console.error("❌ Screen share error:", error);
        setScreenShareError(error.message || String(error));
      }
      return false;
    }
  }, [cameraStream, myId, roomId, socket, onLocalStreamUpdate, onScreenShareStatusChange, replaceTrackOnPeers]);

  /**
   * Stop screen sharing
   * Reverts to camera video track
   * Updates all active calls
   * Broadcasts screen share stop to other peers
   */
  const stopScreenShare = useCallback(async () => {
    if (!isScreenSharingRef.current || !originalVideoTrackRef.current) {
      console.warn("⚠️ Screen share not active");
      return false;
    }

    try {
      console.log("🖥️ Stopping screen share...");

      setIsScreenSharing(false);
      setLocalScreenStream(null);

      const cameraVideoTrack = originalVideoTrackRef.current;

      await replaceTrackOnPeers(cameraVideoTrack);

      onScreenShareStatusChange("stop", myId);

      if (socket && myId && roomId) {
        socket.emit("user-screen-share-stop", myId, roomId);
        console.log(`📡 Emitted screen share stop for ${myId} in room ${roomId}`);
      }

      if (screenStreamRef.current) {
        screenStreamRef.current.getTracks().forEach((track) => track.stop());
        screenStreamRef.current = null;
      }

      originalVideoTrackRef.current = null;
      onLocalStreamUpdate(cameraStream);
      setScreenShareError(null);
      console.log("✅ Screen share stopped successfully");
      return true;
    } catch (error) {
      console.error("❌ Error stopping screen share:", error);
      setScreenShareError(error.message || String(error));
      return false;
    }
  }, [cameraStream, myId, roomId, socket, onLocalStreamUpdate, onScreenShareStatusChange, replaceTrackOnPeers]);

  /**
   * Toggle screen share on/off
   */
  const toggleScreenShare = useCallback(async () => {
    console.log("🖱️ toggleScreenShare invoked", { isScreenSharing });
    console.trace();

    // Guard against accidental double toggles in quick succession
    if (isScreenSharingRef.current && !isScreenSharing) {
      console.warn("🛡️ toggleScreenShare called while isScreenSharingRef says true but state is false; ignoring until stable.");
      return false;
    }

    if (isScreenSharing) {
      return await stopScreenShare();
    } else {
      return await startScreenShare();
    }
  }, [isScreenSharing, startScreenShare, stopScreenShare]);

  useEffect(() => {
    stopScreenShareRef.current = stopScreenShare;
  }, [stopScreenShare]);

  // Cleanup on unmount
  const cleanup = useCallback(() => {
    if (screenStreamRef.current) {
      screenStreamRef.current.getTracks().forEach(track => track.stop());
    }
    if (isScreenSharing) {
      stopScreenShare();
    }
  }, [isScreenSharing, stopScreenShare]);

  return {
    isScreenSharing,
    screenShareError,
    localScreenStream,
    startScreenShare,
    stopScreenShare,
    toggleScreenShare,
    cleanup,
    activeStream,
  };
};

export default useScreenShare;
