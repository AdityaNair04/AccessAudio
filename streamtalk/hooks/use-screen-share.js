import { useState, useCallback, useRef } from "react";

/**
 * Custom hook for managing screen sharing in WebRTC peer connections
 * Handles graceful switching between camera and screen display
 * Maintains audio stream while sharing screen
 * 
 * @param {MediaStream} cameraStream - Original camera media stream
 * @param {Object} users - Active peer calls to update with screen stream
 * @returns {Object} Screen sharing state and controls
 */
const useScreenShare = (cameraStream, users = {}) => {
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [screenShareError, setScreenShareError] = useState(null);
  const screenStreamRef = useRef(null);
  const originalVideoTrackRef = useRef(null);

  /**
   * Start screen sharing
   * Gets display media, replaces video track in all active calls
   * Keeps audio from camera mic
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

      // Get screen display
      const displayStream = await navigator.mediaDevices.getDisplayMedia({
        video: {
          cursor: "always", // Show cursor on shared screen
        },
        audio: false, // Don't capture screen audio, use mic instead
      });

      const screenVideoTrack = displayStream.getVideoTracks()[0];
      const cameraVideoTrack = cameraStream.getVideoTracks()[0];

      if (!screenVideoTrack || !cameraVideoTrack) {
        throw new Error("Failed to get video tracks");
      }

      // Store original video track for later
      originalVideoTrackRef.current = cameraVideoTrack;
      screenStreamRef.current = displayStream;

      // Replace video track in main camera stream with screen video
      await cameraStream.removeTrack(cameraVideoTrack);
      await cameraStream.addTrack(screenVideoTrack);

      // Update all active peer calls with new stream (implicit via ontrack event)
      Object.entries(users).forEach(([peerId, call]) => {
        if (call && call.open) {
          try {
            // PeerJS automatically detects track changes
            console.log(`🖥️ Screen share active for peer: ${peerId}`);
          } catch (err) {
            console.warn(`Failed to update call for ${peerId}:`, err);
          }
        }
      });

      // Handle screen share stop (user clicks stop in browser UI)
      screenVideoTrack.onended = () => {
        console.log("🖥️ Screen share stopped by user");
        stopScreenShare();
      };

      setIsScreenSharing(true);
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
        setScreenShareError(error.message);
      }
      return false;
    }
  }, [cameraStream, users]);

  /**
   * Stop screen sharing
   * Reverts to camera video track
   * Updates all active calls
   */
  const stopScreenShare = useCallback(async () => {
    if (!isScreenSharing || !originalVideoTrackRef.current) {
      console.warn("⚠️ Screen share not active");
      return false;
    }

    try {
      console.log("🖥️ Stopping screen share...");

      const screenVideoTrack = cameraStream.getVideoTracks()[0];
      const cameraVideoTrack = originalVideoTrackRef.current;

      // Remove screen video track
      if (screenVideoTrack) {
        await cameraStream.removeTrack(screenVideoTrack);
        screenVideoTrack.stop();
      }

      // Add back camera video track
      await cameraStream.addTrack(cameraVideoTrack);

      // Update all active peer calls
      Object.entries(users).forEach(([peerId, call]) => {
        if (call && call.open) {
          try {
            console.log(`📷 Camera restored for peer: ${peerId}`);
          } catch (err) {
            console.warn(`Failed to update call for ${peerId}:`, err);
          }
        }
      });

      // Clean up
      if (screenStreamRef.current) {
        screenStreamRef.current.getTracks().forEach(track => track.stop());
        screenStreamRef.current = null;
      }
      originalVideoTrackRef.current = null;

      setIsScreenSharing(false);
      setScreenShareError(null);
      console.log("✅ Screen share stopped successfully");
      return true;
    } catch (error) {
      console.error("❌ Error stopping screen share:", error);
      setScreenShareError(error.message);
      return false;
    }
  }, [isScreenSharing, cameraStream, users]);

  /**
   * Toggle screen share on/off
   */
  const toggleScreenShare = useCallback(async () => {
    if (isScreenSharing) {
      return await stopScreenShare();
    } else {
      return await startScreenShare();
    }
  }, [isScreenSharing, startScreenShare, stopScreenShare]);

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
    startScreenShare,
    stopScreenShare,
    toggleScreenShare,
    cleanup,
  };
};

export default useScreenShare;
