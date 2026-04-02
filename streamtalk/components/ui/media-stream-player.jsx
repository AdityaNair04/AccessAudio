import { useEffect, useRef } from "react";

const MediaStreamPlayer = ({
  stream,
  muted = false,
  playing = true,
  className = "",
  selectedAudioOutput,
}) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (video.srcObject !== stream) {
      video.srcObject = stream || null;
    }

    if (stream && playing) {
      const playPromise = video.play();
      if (playPromise && typeof playPromise.catch === "function") {
        playPromise.catch((err) => {
          console.warn("MediaStreamPlayer playback error:", err);
        });
      }
    }

    return () => {
      if (video && video.srcObject === stream) {
        video.srcObject = null;
      }
    };
  }, [stream, playing]);

  useEffect(() => {
    const video = videoRef.current;
    if (video && selectedAudioOutput && selectedAudioOutput !== "default" && video.setSinkId) {
      video
        .setSinkId(selectedAudioOutput)
        .catch((err) => console.warn("Failed to set audio output device:", err));
    }
  }, [selectedAudioOutput]);

  return (
    <video
      ref={videoRef}
      muted={muted}
      autoPlay
      playsInline
      className={className}
      controls={false}
      style={{ width: "100%", height: "100%", objectFit: "cover" }}
    />
  );
};

export default MediaStreamPlayer;
