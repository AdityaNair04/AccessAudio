const rooms = new Map();
const userSessions = new Map();

const cleanupOldSessions = () => {
  const now = Date.now();
  const fiveMinutes = 5 * 60 * 1000;

  for (const [sessionId, session] of userSessions.entries()) {
    if (now - session.lastSeen > fiveMinutes) {
      if (session.roomId && rooms.has(session.roomId)) {
        const room = rooms.get(session.roomId);
        room.users = room.users.filter((user) => user.id !== session.userId);
        if (room.users.length === 0) {
          rooms.delete(session.roomId);
        }
      }
      userSessions.delete(sessionId);
    }
  }
};

let lastCleanupTime = Date.now();

export async function GET(request) {
  if (Date.now() - lastCleanupTime > 60000) {
    cleanupOldSessions();
    lastCleanupTime = Date.now();
  }

  const { searchParams } = new URL(request.url);
  const action = searchParams.get('action');
  const roomId = searchParams.get('roomId');

  switch (action) {
    case 'get-room-users': {
      if (!roomId) {
        return new Response(JSON.stringify({ error: 'Missing roomId' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }
      const roomData = rooms.get(roomId);
      if (!roomData) {
        return new Response(JSON.stringify({ users: [] }), {
          headers: { 'Content-Type': 'application/json' },
        });
      }
      return new Response(
        JSON.stringify({
          users: roomData.users.map((u) => u.id),
          screenSharePeerId: roomData.screenSharePeerId || null,
        }),
        { headers: { 'Content-Type': 'application/json' } }
      );
    }
    default:
      return new Response(JSON.stringify({ error: 'Invalid action' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
  }
}

export async function POST(request) {
  if (Date.now() - lastCleanupTime > 60000) {
    cleanupOldSessions();
    lastCleanupTime = Date.now();
  }

  try {
    const body = await request.json();
    const { action, roomId, userId, sessionId } = body;
    return await handleRequest(action, roomId, userId, sessionId);
  } catch (error) {
    console.error('API Error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

async function handleRequest(action, roomId, userId, sessionId) {
  switch (action) {
    case 'join-room': {
      if (!roomId || !userId) {
        return new Response(JSON.stringify({ error: 'Missing roomId or userId' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      const newSessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      userSessions.set(newSessionId, {
        userId,
        roomId,
        lastSeen: Date.now(),
      });

      if (!rooms.has(roomId)) {
        rooms.set(roomId, { users: [], screenSharePeerId: null });
      }

      const room = rooms.get(roomId);
      const existingUserIndex = room.users.findIndex((user) => user.id === userId);

      if (existingUserIndex >= 0) {
        room.users[existingUserIndex] = {
          id: userId,
          sessionId: newSessionId,
          joinedAt: Date.now(),
        };
      } else {
        room.users.push({
          id: userId,
          sessionId: newSessionId,
          joinedAt: Date.now(),
        });
      }

      return new Response(
        JSON.stringify({
          success: true,
          sessionId: newSessionId,
          roomUsers: room.users.map((u) => u.id),
        }),
        { headers: { 'Content-Type': 'application/json' } }
      );
    }

    case 'get-room-users': {
      if (!roomId) {
        return new Response(JSON.stringify({ error: 'Missing roomId' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }
      const roomData = rooms.get(roomId);
      if (!roomData) {
        return new Response(JSON.stringify({ users: [] }), {
          headers: { 'Content-Type': 'application/json' },
        });
      }
      return new Response(
        JSON.stringify({
          users: roomData.users.map((u) => u.id),
          screenSharePeerId: roomData.screenSharePeerId || null,
        }),
        { headers: { 'Content-Type': 'application/json' } }
      );
    }

    case 'leave-room': {
      if (!roomId || !userId) {
        return new Response(JSON.stringify({ error: 'Missing roomId or userId' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      if (rooms.has(roomId)) {
        const room = rooms.get(roomId);
        room.users = room.users.filter((user) => user.id !== userId);
        if (room.screenSharePeerId === userId) {
          room.screenSharePeerId = null;
        }
        if (room.users.length === 0) {
          rooms.delete(roomId);
        }
      }

      for (const [id, session] of userSessions.entries()) {
        if (session.userId === userId && session.roomId === roomId) {
          userSessions.delete(id);
          break;
        }
      }

      return new Response(JSON.stringify({ success: true }), {
        headers: { 'Content-Type': 'application/json' },
      });
    }

    case 'user-screen-share-start': {
      if (!roomId || !userId) {
        return new Response(JSON.stringify({ error: 'Missing roomId or userId' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }
      if (rooms.has(roomId)) {
        const room = rooms.get(roomId);
        room.screenSharePeerId = userId;
      }
      return new Response(
        JSON.stringify({ success: true, screenSharePeerId: userId }),
        { headers: { 'Content-Type': 'application/json' } }
      );
    }

    case 'user-screen-share-stop': {
      if (!roomId || !userId) {
        return new Response(JSON.stringify({ error: 'Missing roomId or userId' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }
      if (rooms.has(roomId)) {
        const room = rooms.get(roomId);
        if (room.screenSharePeerId === userId) {
          room.screenSharePeerId = null;
        }
      }
      return new Response(
        JSON.stringify({ success: true, screenSharePeerId: null }),
        { headers: { 'Content-Type': 'application/json' } }
      );
    }

    case 'ping':
    case 'toggle-audio':
    case 'toggle-video': {
      if (sessionId || userId) {
        const session = sessionId ? userSessions.get(sessionId) : true;
        if (session) {
          if (typeof session === 'object') session.lastSeen = Date.now();
          return new Response(JSON.stringify({ success: true }), {
            headers: { 'Content-Type': 'application/json' },
          });
        }
      }
      return new Response(JSON.stringify({ success: true }), {
        headers: { 'Content-Type': 'application/json' },
      });
    }

    default:
      return new Response(JSON.stringify({ error: 'Invalid action' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
  }
}
