import ReactPlayer from "react-player";
import { Mic, MicOff, UserSquare2, MonitorOff, X } from "lucide-react";
import { memo } from "react";

/**
 * Screen Share Layout Component
 * Displays shared screen full-screen with camera feeds as PiP in corner
 * 
 * @param {Object} screenPlayer - The stream object for the shared screen (from players[sharingPeerId])
 * @param {string} sharingPeerId - ID of peer currently sharing their screen
 * @param {string} myId - Current user's peer ID
 * @param {Object} players - All player streams
 * @param {function} onStopScreenShare - Callback when stopping screen share view
 * @param {string} selectedAudioOutput - Audio output device ID
 */
const ScreenShareLayout = memo(({
  screenPlayer,
  sharingPeerId,
  myId,
  players,
  onStopScreenShare,
  selectedAudioOutput,
}) => {
  if (!screenPlayer) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-800 to-purple-900">
        <div className="text-center">
          <MonitorOff size={48} className="mx-auto text-gray-400 mb-4" />
          <p className="text-gray-300">No screen being shared</p>
        </div>
      </div>
    );
  }

  const isMyScreenShare = sharingPeerId === myId;

  return (
    <div className="relative w-full h-full bg-black flex items-center justify-center overflow-hidden">
      {/* Shared Screen - Full Screen */}
      <div className="absolute inset-0 flex items-center justify-center bg-black">
        {screenPlayer.playing ? (
          <ReactPlayer
            url={screenPlayer.url}
            muted={true}
            playing={true}
            width="100%"
            height="100%"
            className="object-contain"
            progressInterval={1000}
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full bg-gradient-to-br from-slate-800 to-purple-900">
            <UserSquare2 size={80} className="text-purple-300 opacity-50" />
          </div>
        )}
      </div>

      {/* Screen Share Indicator - Top Left */}
      <div className="absolute top-4 left-4 z-30 bg-red-500/90 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">
        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
        <span className="text-white text-sm font-semibold">
          {isMyScreenShare ? "Your screen" : `${sharingPeerId?.slice(0, 8)}... sharing`}
        </span>
      </div>

      {/* Camera PiP - Bottom Right (Floating) */}
      <div className="absolute bottom-6 right-6 z-30 flex flex-col gap-3">
        {Object.entries(players || {}).map(([peerId, player]) => {
          // Skip the screen sharing peer in PiP
          if (peerId === sharingPeerId) return null;
          
          const isMe = peerId === myId;

          return (
            <div
              key={peerId}
              className="relative rounded-xl overflow-hidden border-2 border-white/30 shadow-2xl hover:border-white/50 transition-all duration-300 bg-black"
              style={{
                width: "180px",
                height: "135px", // 4:3 aspect ratio
              }}
            >
              {player.playing ? (
                <ReactPlayer
                  url={player.url}
                  muted={player.muted}
                  playing={player.playing}
                  width="100%"
                  height="100%"
                  className="object-cover"
                  progressInterval={1000}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-700 to-purple-800">
                  <UserSquare2 size={40} className="text-purple-300" />
                </div>
              )}

              {/* Audio Indicator */}
              <div className="absolute bottom-2 left-2 flex items-center gap-1">
                {player.audioEnabled || !isMe ? (
                  <>
                    <Mic size={12} className="text-green-400" />
                    <span className="text-xs text-green-400 bg-black/60 px-2 py-0.5 rounded">
                      {isMe ? "You" : peerId?.slice(0, 6)}
                    </span>
                  </>
                ) : (
                  <>
                    <MicOff size={12} className="text-red-400" />
                    <span className="text-xs text-red-400 bg-black/60 px-2 py-0.5 rounded">
                      Muted
                    </span>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Stop Screen Share Button - Top Right (for presenter) */}
      {isMyScreenShare && (
        <button
          onClick={onStopScreenShare}
          className="absolute top-4 right-4 z-30 p-3 bg-red-500/90 hover:bg-red-600 text-white rounded-full shadow-lg transition-all duration-200 hover:scale-110"
          title="Stop screen share"
        >
          <X size={20} />
        </button>
      )}
    </div>
  );
});

ScreenShareLayout.displayName = "ScreenShareLayout";

export default ScreenShareLayout;
