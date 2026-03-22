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
      }
    } catch (error) {
      console.error('Error handling incoming data:', error);
    }
  }, [addMessage, addCaption]);

  // Bind events to a verified DataConnection seamlessly
  const setupDataConnectionEvents = useCallback((conn, peerId) => {
    conn.on('open', () => {
      console.log(`💬 Data connection natively opened with peer ${peerId}`);
      setDataConnections(prev => ({ ...prev, [peerId]: conn }));
      setConnectedPeers(prev => new Set([...prev, peerId]));
    });

    conn.on('data', handleIncomingData);

    conn.on('close', () => {
      console.log(`💬 Data connection closed with peer ${peerId}`);
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
    });

    conn.on('error', (err) => {
      console.error(`💬 Data connection error with peer ${peerId}:`, err);
    });
  }, [myId, handleIncomingData]);

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
  }, [dataConnections, myId]);

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  useEffect(() => {
    return () => {
      Object.entries(dataConnections).forEach(([peerId, conn]) => {
        try { conn.close(); } catch (e) {}
      });
    };
  }, []);

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