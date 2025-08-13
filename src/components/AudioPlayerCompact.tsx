import { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

const AudioPlayerCompact = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showAutoplayPrompt, setShowAutoplayPrompt] = useState(false);

  useEffect(() => {
    // Always show prompt when page loads to ask user about background music
    const timer = setTimeout(() => {
      setShowAutoplayPrompt(true);
    }, 500); // Small delay to let page load
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
  }, [isMuted]);

  const handleUserEnableAudio = async () => {
    if (audioRef.current) {
      try {
        audioRef.current.muted = false;
        await audioRef.current.play();
        setIsPlaying(true);
        setShowAutoplayPrompt(false);
      } catch (error) {
        console.log('Failed to start audio:', error);
      }
    }
  };

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
    <>
      {showAutoplayPrompt && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-background border border-primary/30 rounded-lg p-6 max-w-sm mx-4">
            <h3 className="text-lg font-semibold mb-2 text-foreground">Enable Background Music?</h3>
            <p className="text-muted-foreground mb-4">Hear me out !</p>
            <div className="flex gap-2">
              <button
                onClick={handleUserEnableAudio}
                className="flex-1 bg-primary text-primary-foreground px-4 py-2 rounded hover:bg-primary/90 transition"
              >
                Enable Audio
              </button>
              <button
                onClick={() => setShowAutoplayPrompt(false)}
                className="flex-1 bg-secondary text-secondary-foreground px-4 py-2 rounded hover:bg-secondary/90 transition"
              >
                No Thanks
              </button>
            </div>
          </div>
        </div>
      )}
      
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
          src="/background-audio.mp3"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        >
          <source src="/background-audio.mp3" type="audio/mpeg" />
          <source src="/background-audio.wav" type="audio/wav" />
          <source src="/background-audio.ogg" type="audio/ogg" />
        </audio>
      </div>
    </>
  );
};

export default AudioPlayerCompact;
