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
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-background/95 backdrop-blur-sm border border-primary/30 rounded-xl p-8 max-w-sm mx-4 shadow-2xl animate-scale-in transform-gpu">
            <div className="text-center">
              <div className="mb-4 animate-fade-in" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center mb-4 animate-pulse">
                  <Volume2 className="h-8 w-8 text-primary" />
                </div>
              </div>
              
              <h3 className="text-xl font-bold mb-3 text-foreground animate-fade-in" style={{ animationDelay: '0.3s', animationFillMode: 'both' }}>
                Enable Background Music?
              </h3>
              
              <p className="text-muted-foreground mb-6 text-lg font-medium animate-fade-in" style={{ animationDelay: '0.4s', animationFillMode: 'both' }}>
                Hear me out ! 🎵
              </p>
              
              <div className="flex gap-3 animate-fade-in" style={{ animationDelay: '0.5s', animationFillMode: 'both' }}>
                <button
                  onClick={handleUserEnableAudio}
                  className="flex-1 bg-gradient-to-r from-primary to-primary/90 text-primary-foreground px-6 py-3 rounded-lg hover:from-primary/90 hover:to-primary/80 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-primary/25 font-medium"
                >
                  Enable Audio
                </button>
                <button
                  onClick={() => setShowAutoplayPrompt(false)}
                  className="flex-1 bg-secondary/80 backdrop-blur-sm text-secondary-foreground px-6 py-3 rounded-lg hover:bg-secondary/90 transition-all duration-300 transform hover:scale-105 font-medium"
                >
                  No Thanks
                </button>
              </div>
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
