import { useSocket } from "@/store/socket";
import { useParams } from "next/navigation";

const { useState, useEffect, useRef } = require("react");

const usePeer = () => {
  const socket = useSocket();
  const { roomId } = useParams(); // Updated to use app directory router
  const [peer, setPeer] = useState(null);
  const [myId, setMyId] = useState("");
  const isPeerSet = useRef(false);
  const peerHealthCheckRef = useRef(null);

  useEffect(() => {
    if (isPeerSet.current || !roomId || !socket) return;
    isPeerSet.current = true;
    let myPeer;

    const initPeer = async () => {
      try {
        console.log("🔄 Initializing PeerJS...");
        const Peer = (await import("peerjs")).default;
        myPeer = new Peer({
          config: {
            iceServers: [
              { urls: "stun:stun.l.google.com:19302" },
              { urls: "stun:stun1.l.google.com:19302" },
              { urls: "stun:global.stun.twilio.com:3478" },
              {
                urls: "turn:openrelay.metered.ca:80",
                username: "openrelayproject",
                credential: "openrelayproject"
              },
              {
                urls: "turn:openrelay.metered.ca:443",
                username: "openrelayproject",
                credential: "openrelayproject"
              },
              {
                urls: "turn:openrelay.metered.ca:443?transport=tcp",
                username: "openrelayproject",
                credential: "openrelayproject"
              }
            ],
            sdpSemantics: "unified-plan", 
            iceCandidatePoolSize: 10,
            iceTransportPolicy: "all"
          },
          // Add debug logging
          debug: process.env.NODE_ENV === "development" ? 2 : 0,
        });
        setPeer(myPeer);

        myPeer.on("open", (id) => {
          console.log("✅ PeerJS connected! Your peer ID:", id);
          setMyId(id);

          // Start health check to detect connection drops early
          if (peerHealthCheckRef.current) {
            clearInterval(peerHealthCheckRef.current);
          }
          peerHealthCheckRef.current = setInterval(() => {
            if (myPeer.destroyed) {
              console.warn("⚠️ Peer instance destroyed, recreating...");
              clearInterval(peerHealthCheckRef.current);
              isPeerSet.current = false;
              initPeer();
              return;
            }
            if (!myPeer.open) {
              console.warn("⚠️ Peer connection lost, attempting to recover...");
              if (myPeer.disconnected) {
                myPeer.reconnect();
              }
            }
          }, 3000); // Check every 3 seconds

          // Always try to join room - socket will handle connection state
          console.log("📡 Joining room:", roomId, "with peer ID:", id);
          socket.emit("join-room", roomId, id);
        });

        myPeer.on("error", (error) => {
          console.error("❌ PeerJS error:", error);
          // Retry connection after a delay
          setTimeout(() => {
            if (!myPeer.destroyed) {
              console.log("🔄 Retrying PeerJS connection...");
              myPeer.reconnect();
            }
          }, 2000);
        });

        myPeer.on("disconnected", () => {
          console.log("⚠️ PeerJS disconnected, attempting to reconnect...");
          if (!myPeer.destroyed) {
            myPeer.reconnect();
          }
        });

        myPeer.on("close", () => {
          console.warn("❌ PeerJS connection fully closed");
          clearInterval(peerHealthCheckRef.current);
        });
      } catch (error) {
        console.error("❌ Failed to initialize PeerJS:", error);
        isPeerSet.current = false; // Allow retry
      }
    };

    initPeer();

    // Cleanup function
    return () => {
      if (peerHealthCheckRef.current) {
        clearInterval(peerHealthCheckRef.current);
      }
      if (myPeer && !myPeer.destroyed) {
        console.log("🧹 Cleaning up PeerJS connection...");
        myPeer.destroy();
      }
    };
  }, [roomId, socket]);

  return {
    peer,
    myId,
  };
};

export default usePeer;
