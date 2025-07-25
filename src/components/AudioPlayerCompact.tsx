import { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

const AudioPlayerCompact = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  // Start muted for autoplay to work on browsers
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
      // Attempt autoplay when component mounts
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        // Autoplay failed, which is expected on many browsers
        console.log('Autoplay blocked, user interaction required');
      });
    }
  }, [isMuted]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      // Unmute on play if muted
      if (isMuted) {
        setIsMuted(false);
        audioRef.current.muted = false;
      }
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          // Autoplay might be blocked if no user interaction yet
          // Can leave empty or handle as needed
        });
    }
  };

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
    if (audioRef.current) {
      // When muting, pause if you prefer or leave playing muted
      // audioRef.current.muted = !isMuted; handled by useEffect
    }
  };

  return (
    <div className="flex items-center gap-1 bg-background/80 border border-primary/30 rounded px-1 py-1 shadow h-8">
      <button
        onClick={togglePlay}
        aria-label={isPlaying ? "Pause" : "Play"}
        className="hover:bg-primary/20 rounded transition"
        style={{ padding: 2 }}
        type="button"
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
        type="button"
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
        autoPlay
        muted={true} // Start muted for autoplay policy
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
