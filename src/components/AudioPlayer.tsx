import { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

const AudioPlayerCompact = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
  }, [isMuted]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    }
  };

  const toggleMute = () => setIsMuted((prev) => !prev);

  return (
    <div className="flex items-center gap-1 bg-background/80 border border-primary/30 rounded px-1 py-1 shadow h-8">
      <button
        onClick={togglePlay}
        aria-label={isPlaying ? "Pause" : "Play"}
        className="hover:bg-primary/20 rounded transition"
        style={{ padding: 2 }}
      >
        {isPlaying ? (
          <Pause className="h-4 w-4 text-primary" />
        ) : (
          <Play className="h-4 w-4 text-primary" />
        )}
      </button>
      <button
        onClick={toggleMute}
        aria-label={isMuted ? "Unmute" : "Mute"}
        className="hover:bg-accent/40 rounded transition"
        style={{ padding: 2 }}
      >
        {isMuted ? (
          <VolumeX className="h-4 w-4 text-muted-foreground" />
        ) : (
          <Volume2 className="h-4 w-4 text-muted-foreground" />
        )}
      </button>
      <audio
        ref={audioRef}
        loop
        preload="auto"
        src="/background-audio.mp3"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      >
        <source src="/background-audio.mp3" type="audio/mpeg" />
        <source src="/background-audio.wav" type="audio/wav" />
        <source src="/background-audio.ogg" type="audio/ogg" />
      </audio>
    </div>
  );
};

export default AudioPlayerCompact;
