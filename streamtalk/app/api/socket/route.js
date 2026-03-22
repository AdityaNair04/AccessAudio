import { NextRequest } from "next/server";

// In-memory store for room data (in production, use Redis or similar)
const rooms = new Map();
const userSessions = new Map();

// Clean up old sessions (older than 5 minutes)
const cleanupOldSessions = () => {
  const now = Date.now();
  const fiveMinutes = 5 * 60 * 1000;

  for (const [sessionId, session] of userSessions.entries()) {
    if (now - session.lastSeen > fiveMinutes) {
      // Remove user from room
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
  // Lazy cleanup (only run if 60 seconds have passed since last cleanup)
  if (Date.now() - lastCleanupTime > 60000) {
    cleanupOldSessions();
    lastCleanupTime = Date.now();
  }
  const { searchParams } = new URL(request.url);
  const action = searchParams.get("action");
  const roomId = searchParams.get("roomId");
  const userId = searchParams.get("userId");
  const sessionId = searchParams.get("sessionId");

  return handleRequest(action, roomId, userId, sessionId);
}

export async function POST(request) {
  // Lazy cleanup (only run if 60 seconds have passed since last cleanup)
  if (Date.now() - lastCleanupTime > 60000) {
    cleanupOldSessions();
    lastCleanupTime = Date.now();
  }

  try {
    const body = await request.json();
    const { action, roomId, userId, sessionId } = body;
    return handleRequest(action, roomId, userId, sessionId);
  } catch (error) {
    console.error("API Error:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

async function handleRequest(action, roomId, userId, sessionId) {
  try {
    switch (action) {
      case "join-room":
        if (!roomId || !userId) {
          return Response.json(
            { error: "Missing roomId or userId" },
            { status: 400 }
          );
        }

        // Create session
        const newSessionId = `session_${Date.now()}_${Math.random()
          .toString(36)
          .substr(2, 9)}`;
        userSessions.set(newSessionId, {
          userId,
          roomId,
          lastSeen: Date.now(),
        });

        // Add user to room
        if (!rooms.has(roomId)) {
          rooms.set(roomId, { users: [] });
        }

        const room = rooms.get(roomId);
        const existingUserIndex = room.users.findIndex(
          (user) => user.id === userId
        );

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

        return Response.json({
          success: true,
          sessionId: newSessionId,
          roomUsers: room.users.map((u) => u.id),
        });

      case "get-room-users":
        if (!roomId) {
          return Response.json({ error: "Missing roomId" }, { status: 400 });
        }

        const roomData = rooms.get(roomId);
        if (!roomData) {
          return Response.json({ users: [] });
        }
        return Response.json({ users: roomData.users.map((u) => u.id) });

      case "leave-room":
        if (!roomId || !userId) {
          return Response.json(
            { error: "Missing roomId or userId" },
            { status: 400 }
          );
        }

        if (rooms.has(roomId)) {
          const room = rooms.get(roomId);
          room.users = room.users.filter((user) => user.id !== userId);
          if (room.users.length === 0) {
            rooms.delete(roomId);
          }
        }

        // Clean up session
        for (const [id, session] of userSessions.entries()) {
          if (session.userId === userId && session.roomId === roomId) {
            userSessions.delete(id);
            break;
          }
        }

        return Response.json({ success: true });

      case "ping":
      case "toggle-audio":
      case "toggle-video":
        // For compatibility, return success for these actions as they are currently "silent"
        if (sessionId || userId) {
          const session = sessionId ? userSessions.get(sessionId) : true;
          if (session) {
            if (typeof session === 'object') session.lastSeen = Date.now();
            return Response.json({ success: true });
          }
        }
        return Response.json({ success: true }); // Fallback success

      default:
        return Response.json({ error: "Invalid action" }, { status: 400 });
    }
  } catch (error) {
    console.error("API Error:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
