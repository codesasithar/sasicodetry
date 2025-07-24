import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Music } from 'lucide-react';

const AudioPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  // Sync volume and muted properties on audio element
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.muted = isMuted;
    }
  }, [volume, isMuted]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(() => {
        console.log('Audio playback failed - user interaction required');
      });
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    // No need to set audioRef.current.volume here because effect will sync
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  // Format time in mm:ss
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-background/90 backdrop-blur-md border border-primary/30 rounded-xl p-3 shadow-2xl shadow-primary/20 tech-glow max-w-sm">
      <div className="flex items-center gap-3">
        {/* Audio Icon */}
        <div className="p-1 bg-primary/10 rounded-lg flex-shrink-0">
          <Music className="h-4 w-4 text-primary" />
        </div>

        {/* Play/Pause Button */}
        <button
          type="button"
          onClick={togglePlay}
          aria-label={isPlaying ? 'Pause audio' : 'Play audio'}
          className="relative p-2 bg-gradient-to-r from-primary/20 to-primary/30 hover:from-primary/30 hover:to-primary/40 rounded-lg transition-all duration-300 group border border-primary/40 tech-button flex-shrink-0"
        >
          {isPlaying ? (
            <Pause className="h-4 w-4 text-primary group-hover:scale-110 transition-transform" />
          ) : (
            <Play className="h-4 w-4 text-primary group-hover:scale-110 transition-transform ml-0.5" />
          )}
          <div className="absolute inset-0 rounded-lg bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity blur-sm -z-10"></div>
        </button>

        {/* Volume Control */}
        <div className="flex items-center gap-2 bg-accent/50 rounded-lg p-1 border border-accent flex-shrink-0">
          <button
            type="button"
            onClick={toggleMute}
            aria-label={isMuted ? 'Unmute audio' : 'Mute audio'}
            className="p-1 hover:bg-primary/20 rounded transition-all duration-200 hover:scale-110"
          >
            {isMuted ? (
              <VolumeX className="h-4 w-4 text-muted-foreground hover:text-primary transition-colors" />
            ) : (
              <Volume2 className="h-4 w-4 text-muted-foreground hover:text-primary transition-colors" />
            )}
          </button>

          <input
            type="range"
            min={0}
            max={1}
            step={0.05}
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            aria-label="Volume slider"
            className="w-20 h-1 bg-accent rounded-lg appearance-none cursor-pointer tech-slider"
            // Disable input if muted for clarity (optional)
            disabled={isMuted}
          />
        </div>

        {/* Time Display */}
        <div className="text-xs text-muted-foreground font-mono bg-accent/30 px-2 py-1 rounded select-none whitespace-nowrap">
          {formatTime(currentTime)} / {formatTime(duration)}
        </div>
      </div>

      {/* Audio Element */}
      <audio
        ref={audioRef}
        loop
        preload="auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onError={() =>
          console.log('Audio file not found - please add your audio file to public/background-audio.mp3')
        }
      >
        <source src="/background-audio.mp3" type="audio/mpeg" />
        <source src="/background-audio.wav" type="audio/wav" />
        <source src="/background-audio.ogg" type="audio/ogg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default AudioPlayer;
