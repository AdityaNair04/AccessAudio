import { useEffect, useRef } from "react";

const MediaStreamPlayer = ({
  stream,
  muted = false,
  playing = true,
  className = "",
  selectedAudioOutput,
}) => {
  const videoRef = useRef(null);

  const playbackInProgressRef = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (video.srcObject !== stream) {
      video.srcObject = stream || null;
    }

    if (!stream || !playing) {
      return;
    }

    if (playbackInProgressRef.current) {
      return;
    }

    const playPromise = video.play();
    if (playPromise !== undefined && typeof playPromise.then === "function") {
      playbackInProgressRef.current = true;
      playPromise
        .catch((err) => {
          if (err.name === "AbortError") {
            console.debug("MediaStreamPlayer play() aborted by new load request.");
          } else {
            console.warn("MediaStreamPlayer playback error:", err);
          }
        })
        .finally(() => {
          playbackInProgressRef.current = false;
        });
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
