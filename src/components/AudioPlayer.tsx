import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

const AudioPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.3);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      
      // Try to autoplay (will be blocked by most browsers)
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch(() => {
            // Autoplay was prevented
            setIsPlaying(false);
          });
      }
    }
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 bg-background/80 backdrop-blur-md border border-border rounded-lg p-3 shadow-lg">
      <div className="flex items-center gap-3">
        {/* Play/Pause Button */}
        <button
          onClick={togglePlay}
          className="p-2 bg-primary/20 hover:bg-primary/30 rounded-lg transition-all duration-200 group"
        >
          {isPlaying ? (
            <Pause className="h-4 w-4 text-primary group-hover:scale-110 transition-transform" />
          ) : (
            <Play className="h-4 w-4 text-primary group-hover:scale-110 transition-transform" />
          )}
        </button>

        {/* Volume Control */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleMute}
            className="p-1 hover:bg-accent rounded transition-colors"
          >
            {isMuted ? (
              <VolumeX className="h-4 w-4 text-muted-foreground" />
            ) : (
              <Volume2 className="h-4 w-4 text-muted-foreground" />
            )}
          </button>
          
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={handleVolumeChange}
            className="w-16 h-1 bg-accent rounded-lg appearance-none cursor-pointer tech-slider"
          />
        </div>

        {/* Audio Element */}
        <audio
          ref={audioRef}
          loop
          preload="auto"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onError={() => console.log('Audio file not found - please add your audio file to public/background-audio.mp3')}
        >
          <source src="/background-audio.mp3" type="audio/mpeg" />
          <source src="/background-audio.wav" type="audio/wav" />
          <source src="/background-audio.ogg" type="audio/ogg" />
          Your browser does not support the audio element.
        </audio>
      </div>
    </div>
  );
};

export default AudioPlayer;