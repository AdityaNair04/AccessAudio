import { useSocket } from "@/store/socket";
import { useParams } from "next/navigation";

const { useState, useEffect, useRef } = require("react");

const usePeer = () => {
  const socket = useSocket();
  const { roomId } = useParams(); // Updated to use app directory router
  const [peer, setPeer] = useState(null);
  const [myId, setMyId] = useState("");
  const isPeerSet = useRef(false);

  useEffect(() => {
    if (isPeerSet.current || !roomId || !socket) return;
    isPeerSet.current = true;
    let myPeer;

    const initPeer = async () => {
      try {
        console.log("🔄 Initializing PeerJS...");
        const Peer = (await import("peerjs")).default;

        const peerHost = process.env.NEXT_PUBLIC_PEERJS_HOST || "0.peerjs.com";
        const peerPort = Number(process.env.NEXT_PUBLIC_PEERJS_PORT || 443);
        const peerPath = process.env.NEXT_PUBLIC_PEERJS_PATH || "/peerjs";

        let reconnectAttempts = 0;
        const maxReconnectAttempts = 8;

        const attemptPeerReconnect = () => {
          if (!myPeer || myPeer.destroyed) return;
          if (reconnectAttempts >= maxReconnectAttempts) {
            console.error("❌ PeerJS reconnection limit reached.");
            return;
          }

          reconnectAttempts += 1;
          const delay = Math.min(5000, 1000 * reconnectAttempts);
          console.log(`🔄 PeerJS reconnect attempt ${reconnectAttempts} (delay ${delay}ms)`);

          setTimeout(() => {
            if (myPeer.destroyed) return;
            try {
              myPeer.reconnect();
            } catch (err) {
              console.error("❌ PeerJS reconnect failed:", err);
            }
          }, delay);
        };

        myPeer = new Peer({
          host: peerHost,
          port: peerPort,
          path: peerPath,
          secure: true,
          config: {
            iceServers: [
              { urls: "stun:stun.l.google.com:19302" },
              { urls: "stun:stun1.l.google.com:19302" },
              { urls: "stun:stun2.l.google.com:19302" },
              { urls: "stun:stun3.l.google.com:19302" },
              { urls: "stun:stun4.l.google.com:19302" },
              { urls: "stun:stun.ekiga.net" },
              { urls: "stun:stun.ideasip.com" },
              // Optional TURN server template (uncomment and configure your TURN credentials)
              // { urls: "turn:your-turn-server:3478", username: "USER", credential: "PASS" },
            ],
            sdpSemantics: "unified-plan",
            iceCandidatePoolSize: 10,
          },
          debug: process.env.NODE_ENV === "development" ? 2 : 0,
        });

        setPeer(myPeer);

        myPeer.on("open", (id) => {
          console.log("✅ PeerJS connected! Your peer ID:", id);
          reconnectAttempts = 0; // reset on successful open
          setMyId(id);

          console.log("📡 Joining room:", roomId, "with peer ID:", id);
          socket.emit("join-room", roomId, id);
        });

        myPeer.on("error", (error) => {
          console.error("❌ PeerJS error:", error);
          attemptPeerReconnect();
        });

        myPeer.on("disconnected", () => {
          console.warn("⚠️ PeerJS disconnected, trying reconnect...");
          attemptPeerReconnect();
        });

        myPeer.on("close", () => {
          console.warn("⚠️ PeerJS connection closed. Restarting peer instance ...");
          attemptPeerReconnect();
        });
      } catch (error) {
        console.error("❌ Failed to initialize PeerJS:", error);
        isPeerSet.current = false; // Allow retry
      }
    };

    initPeer();

    // Cleanup function
    return () => {
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
