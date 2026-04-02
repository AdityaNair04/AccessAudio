import { useState, useEffect, useCallback, useRef } from "react";
import { cloneDeep } from "lodash";

/**
 * Custom hook for managing chat functionality within WebRTC peer connections
 * Integrates with existing PeerJS connections using native DataConnections
 * 
 * @param {Object} peer - PeerJS instance
 * @param {string} myId - Current user's peer ID
 * @param {Object} users - Object containing user connections from usePlayer
 * @returns {Object} Chat functionality and state
 */
const useChat = (peer, myId, users = {}) => {
  const [messages, setMessages] = useState([]);
  const [captions, setCaptions] = useState([]);
  
  // Track active PeerJS DataConnections natively 
  const [dataConnections, setDataConnections] = useState({});
  const [connectedPeers, setConnectedPeers] = useState(new Set());
  
  const connectionCreationRef = useRef(new Set());
  const heartbeatIntervalRef = useRef({});
  const lastHeartbeatRef = useRef({});
  const reconnectAttemptsRef = useRef({});
  const reconnectTimeoutRef = useRef({});

  const addMessage = useCallback((message) => {
    const newMessage = {
      id: message.id || `${Date.now()}-${Math.random()}`,
      text: message.text,
      senderId: message.senderId,
      senderName: message.senderName || message.senderId,
      timestamp: message.timestamp || new Date().toISOString(),
      isOwn: message.senderId === myId
    };

    setMessages(prev => {
      if (prev.some(msg => msg.id === newMessage.id)) return prev;
      return [...prev, newMessage];
    });
  }, [myId]);

  const addCaption = useCallback((caption) => {
    setCaptions(prev => {
      const newCaptions = [...prev, caption];
      return newCaptions.slice(-5);
    });
  }, []);

  const sendMessage = useCallback((messageText) => {
    if (!messageText || !messageText.trim()) return false;

    const message = {
      id: `${myId}-${Date.now()}-${Math.random()}`,
      text: messageText.trim(),
      senderId: myId,
      senderName: myId,
      timestamp: new Date().toISOString(),
      type: 'chat-message'
    };

    addMessage(message);

    let sentCount = 0;
    Object.entries(dataConnections).forEach(([peerId, conn]) => {
      if (conn && conn.open) {
        conn.send(message);
        sentCount++;
      }
    });
    return sentCount > 0;
  }, [myId, dataConnections, addMessage]);

  const sendCaption = useCallback((captionData) => {
    if (!captionData) return false;

    const captionMsg = {
      id: `${myId}-${Date.now()}-${Math.random()}`,
      ...captionData,
      senderId: myId,
      timestamp: new Date().toISOString(),
      type: 'caption'
    };

    addCaption(captionMsg);

    let sentCount = 0;
    Object.entries(dataConnections).forEach(([peerId, conn]) => {
      if (conn && conn.open) {
        conn.send(captionMsg);
        sentCount++;
      }
    });

    return sentCount > 0;
  }, [myId, dataConnections, addCaption]);

  const handleIncomingData = useCallback((data) => {
    try {
      if (data.type === 'chat-message') {
        if (data.senderId && data.text && data.id) addMessage(data);
      } else if (data.type === 'caption') {
        if (data.senderId && data.text) addCaption(data);
      } else if (data.type === 'heartbeat-ping') {
        // Update last heartbeat timestamp and respond with pong
        // Don't log every heartbeat to reduce noise
      } else if (data.type === 'heartbeat-pong') {
        // Just acknowledge received
      }
    } catch (error) {
      console.error('Error handling incoming data:', error);
    }
  }, [addMessage, addCaption]);

  // Send heartbeat to keep connection alive
  const sendHeartbeat = useCallback((conn, peerId) => {
    try {
      if (conn && conn.open) {
        conn.send({ type: 'heartbeat-ping', timestamp: Date.now() });
        lastHeartbeatRef.current[peerId] = Date.now();
      }
    } catch (error) {
      console.warn(`Failed to send heartbeat to ${peerId}:`, error.message);
    }
  }, []);

  // Check for stale connections and trigger reconnect
  const checkConnectionHealth = useCallback((peerId) => {
    const conn = dataConnections[peerId];
    if (!conn || !conn.open) return;

    const lastHeartbeat = lastHeartbeatRef.current[peerId] || Date.now();
    const timeSinceLastHeartbeat = Date.now() - lastHeartbeat;

    // If no heartbeat ack in 10 seconds, connection is stale
    if (timeSinceLastHeartbeat > 10000) {
      console.warn(`⚠️ Stale data connection detected for ${peerId} (no ack for ${timeSinceLastHeartbeat}ms). Reconnecting...`);
      try {
        conn.close();
      } catch (e) {}
      setDataConnections(prev => {
        const updated = cloneDeep(prev);
        delete updated[peerId];
        return updated;
      });
      // Trigger reconnection
      scheduleDataChannelReconnect(peerId);
    }
  }, [dataConnections]);

  // Schedule reconnection with exponential backoff (same as call retry)
  const scheduleDataChannelReconnect = useCallback((peerId) => {
    if (reconnectTimeoutRef.current[peerId]) {
      clearTimeout(reconnectTimeoutRef.current[peerId]);
    }

    const attempts = reconnectAttemptsRef.current[peerId] || 0;
    const MAX_RECONNECT_ATTEMPTS = 4;

    if (attempts >= MAX_RECONNECT_ATTEMPTS) {
      console.warn(`📍 Data channel to ${peerId} exceeded reconnect attempts (${MAX_RECONNECT_ATTEMPTS})`);
      reconnectAttemptsRef.current[peerId] = 0;
      return;
    }

    const baseDelay = 1200; // Match call retry base delay
    const delay = baseDelay * (attempts + 1);

    reconnectAttemptsRef.current[peerId] = attempts + 1;
    console.log(`🔄 Scheduling data channel reconnect for ${peerId} in ${delay}ms (attempt ${attempts + 1}/${MAX_RECONNECT_ATTEMPTS})`);

    reconnectTimeoutRef.current[peerId] = setTimeout(() => {
      if (peer && myId && users[peerId]) {
        console.log(`♻️ Attempting data channel reconnect to ${peerId}...`);
        // Trigger reconnection by creating new connection if ID ordering permits
        if (myId > peerId) {
          const conn = peer.connect(peerId, { reliable: true });
          setupDataConnectionEvents(conn, peerId);
        }
      }
    }, delay);
  }, [peer, myId, users]);

  // Start heartbeat interval for a connection
  const startHeartbeat = useCallback((peerId) => {
    if (heartbeatIntervalRef.current[peerId]) {
      clearInterval(heartbeatIntervalRef.current[peerId]);
    }

    // Send heartbeat every 5 seconds
    heartbeatIntervalRef.current[peerId] = setInterval(() => {
      const conn = dataConnections[peerId];
      sendHeartbeat(conn, peerId);
      // Also check health every heartbeat cycle
      checkConnectionHealth(peerId);
    }, 5000);

    lastHeartbeatRef.current[peerId] = Date.now();
  }, [dataConnections, sendHeartbeat, checkConnectionHealth]);

  // Stop heartbeat interval
  const stopHeartbeat = useCallback((peerId) => {
    if (heartbeatIntervalRef.current[peerId]) {
      clearInterval(heartbeatIntervalRef.current[peerId]);
      delete heartbeatIntervalRef.current[peerId];
    }
    if (reconnectTimeoutRef.current[peerId]) {
      clearTimeout(reconnectTimeoutRef.current[peerId]);
      delete reconnectTimeoutRef.current[peerId];
    }
  }, []);

  // Bind events to a verified DataConnection seamlessly
  const setupDataConnectionEvents = useCallback((conn, peerId) => {
    conn.on('open', () => {
      console.log(`💬 Data connection natively opened with peer ${peerId}`);
      setDataConnections(prev => ({ ...prev, [peerId]: conn }));
      setConnectedPeers(prev => new Set([...prev, peerId]));
      
      // Reset reconnection attempts on successful connection
      reconnectAttemptsRef.current[peerId] = 0;
      
      // Start heartbeat to keep connection alive
      startHeartbeat(peerId);
      
      // Send initial heartbeat immediately
      sendHeartbeat(conn, peerId);
    });

    conn.on('data', handleIncomingData);

    conn.on('close', () => {
      console.log(`💬 Data connection closed with peer ${peerId}`);
      
      // Stop heartbeat first
      stopHeartbeat(peerId);
      
      setDataConnections(prev => {
        const updated = cloneDeep(prev);
        delete updated[peerId];
        return updated;
      });
      setConnectedPeers(prev => {
        const updated = new Set(prev);
        updated.delete(peerId);
        return updated;
      });
      connectionCreationRef.current.delete(`${myId}-${peerId}`);
      
      // Attempt reconnection if this wasn't an intentional cleanup
      if (!reconnectAttemptsRef.current[peerId] || reconnectAttemptsRef.current[peerId] < 4) {
        scheduleDataChannelReconnect(peerId);
      }
    });

    conn.on('error', (err) => {
      console.error(`💬 Data connection error with peer ${peerId}:`, err);
      // Don't immediately close, let PeerJS handle it
      // Only trigger reconnect if the connection hasn't already closed
      if (conn.open) {
        try {
          conn.close();
        } catch (e) {}
      }
    });
  }, [myId, handleIncomingData, startHeartbeat, stopHeartbeat, scheduleDataChannelReconnect, sendHeartbeat]);

  // 1. Listen for ALL INCOMING DataConnections from other remote peers globally
  useEffect(() => {
    if (!peer) return;

    const handleConnection = (conn) => {
      console.log(`💬 Received incoming data connection from ${conn.peer}`);
      setupDataConnectionEvents(conn, conn.peer);
    };

    peer.on('connection', handleConnection);
    return () => {
      peer.off('connection', handleConnection);
    };
  }, [peer, setupDataConnectionEvents]);

  // 2. Actively Connect to peers who join the room
  useEffect(() => {
    if (!peer || !myId) return;

    Object.keys(users).forEach((peerId) => {
      if (dataConnections[peerId]) return;
      
      const channelKey = `${myId}-${peerId}`;
      if (connectionCreationRef.current.has(channelKey)) return;

      // Only the structurally "larger" ID actively triggers the outbound connect() call 
      // preventing race conditions where both peers spam connect() simultaneously
      if (myId > peerId) {
        console.log(`💬 Actively initiating data connection to ${peerId}`);
        connectionCreationRef.current.add(channelKey);
        const conn = peer.connect(peerId, { reliable: true });
        setupDataConnectionEvents(conn, peerId);
      }
    });
  }, [peer, myId, users, dataConnections, setupDataConnectionEvents]);

  const cleanupPeerDataChannel = useCallback((peerId) => {
    const conn = dataConnections[peerId];
    if (conn) {
      try { conn.close(); } catch (e) {}
    }

    // Stop heartbeat
    stopHeartbeat(peerId);

    setDataConnections(prev => {
      const updated = cloneDeep(prev);
      delete updated[peerId];
      return updated;
    });

    setConnectedPeers(prev => {
      const updated = new Set(prev);
      updated.delete(peerId);
      return updated;
    });

    connectionCreationRef.current.delete(`${myId}-${peerId}`);
  }, [dataConnections, myId, stopHeartbeat]);

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  useEffect(() => {
    return () => {
      // Stop all heartbeats
      Object.keys(heartbeatIntervalRef.current).forEach(peerId => {
        stopHeartbeat(peerId);
      });
      
      // Cancel all pending reconnects
      Object.keys(reconnectTimeoutRef.current).forEach(peerId => {
        clearTimeout(reconnectTimeoutRef.current[peerId]);
      });
      
      // Close all connections
      Object.entries(dataConnections).forEach(([peerId, conn]) => {
        try { conn.close(); } catch (e) {}
      });
    };
  }, [dataConnections, stopHeartbeat]);

  return {
    messages,
    captions,
    connectedPeers: Array.from(connectedPeers),
    isConnected: connectedPeers.size > 0,
    sendMessage,
    addMessage,
    sendCaption,
    addCaption,
    clearMessages,
    cleanupPeerDataChannel,
    messageCount: messages.length,
    hasMessages: messages.length > 0
  };
};

export default useChat;