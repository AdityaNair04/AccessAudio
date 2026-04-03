import { Mic, Video, PhoneOff, MicOff, VideoOff, Settings, Captions, CaptionsOff, Bot, Monitor, MonitorOff, Keyboard, Volume2 } from "lucide-react";

const FloatingControls = ({
  muted,
  playing,
  toggleAudio,
  toggleVideo,
  leaveRoom,
  onTroubleshoot,
  isSpeechEnabled,
  toggleSpeechToText,
  isAvatarEnabled,
  toggleAvatar,
  isMorseEnabled,
  toggleMorse,
  isMorseOutputEnabled,
  toggleMorseOutput,
}) => {
  return (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
      {/* Main Control Bar */}
      <div className="flex items-center space-x-3 px-4 py-3 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl">
        {/* Audio Control */}
        <button
          onClick={toggleAudio}
          className={`p-3 rounded-2xl transition-all duration-200 shadow-lg ${
            muted
              ? "bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white transform hover:scale-105"
              : "bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-gray-200 hover:text-white"
          }`}
          title={muted ? "Unmute microphone" : "Mute microphone"}
        >
          {muted ? <MicOff size={18} /> : <Mic size={18} />}
        </button>

        {/* Video Control */}
        <button
          onClick={toggleVideo}
          className={`p-3 rounded-2xl transition-all duration-200 shadow-lg ${
            !playing
              ? "bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white transform hover:scale-105"
              : "bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-gray-200 hover:text-white"
          }`}
          title={!playing ? "Turn on camera" : "Turn off camera"}
        >
          {!playing ? <VideoOff size={18} /> : <Video size={18} />}
        </button>


        {/* Leave Call */}
        <button
          onClick={leaveRoom}
          className="p-3 rounded-2xl transition-all duration-200 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white shadow-lg transform hover:scale-105"
          title="Leave call"
        >
          <PhoneOff size={18} />
        </button>

        {/* Separator */}
        <div className="w-px h-8 bg-white/20 mx-1"></div>

        {/* Speech to Text Control */}
        <button
          onClick={toggleSpeechToText}
          className={`p-3 rounded-2xl transition-all duration-200 shadow-lg ${
            isSpeechEnabled
              ? "bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white transform hover:scale-105"
              : "bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-gray-200 hover:text-white"
          }`}
          title={isSpeechEnabled ? "Turn off Live Speech Captions" : "Turn on Live Speech Captions"}
        >
          {isSpeechEnabled ? <Captions size={18} /> : <CaptionsOff size={18} />}
        </button>

        {/* Separator */}
        <div className="w-px h-8 bg-white/20 mx-1"></div>

        {/* 3D Avatar Control */}
        <button
          onClick={toggleAvatar}
          className={`p-3 rounded-2xl transition-all duration-200 shadow-lg relative ${
            isAvatarEnabled
              ? "bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white transform hover:scale-105"
              : "bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-gray-200 hover:text-white"
          }`}
          title={isAvatarEnabled ? "Turn off 3D Interpreter Avatar" : "Turn on 3D Interpreter Avatar"}
        >
          {isAvatarEnabled && (
             <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-yellow-300 border-2 border-emerald-500 rounded-full animate-pulse"></span>
          )}
          <Bot size={18} />
        </button>

        {/* Morse Code Control */}
        <button
          onClick={toggleMorse}
          className={`p-3 rounded-2xl transition-all duration-200 shadow-lg ${
            isMorseEnabled
              ? "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white transform hover:scale-105"
              : "bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-gray-200 hover:text-white"
          }`}
          title={isMorseEnabled ? "Turn off Morse Code Input" : "Turn on Morse Code Input"}
        >
          <Keyboard size={18} />
        </button>

        {/* Morse Output Control */}
        <button
          onClick={toggleMorseOutput}
          className={`p-3 rounded-2xl transition-all duration-200 shadow-lg ${
            isMorseOutputEnabled
              ? "bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white transform hover:scale-105"
              : "bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-gray-200 hover:text-white"
          }`}
          title={isMorseOutputEnabled ? "Turn off Morse Code Output" : "Turn on Morse Code Output"}
        >
          <Volume2 size={18} />
        </button>

      </div>
    </div>
  );
};

export default FloatingControls;
