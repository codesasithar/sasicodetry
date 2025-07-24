import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Music } from 'lucide-react';

const AudioPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().catch(() => {
          console.log('Audio playback failed - user interaction required');
        });
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

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-background/90 backdrop-blur-md border border-primary/30 rounded-xl p-4 shadow-2xl shadow-primary/20 tech-glow">
      <div className="flex items-center gap-4">
        {/* Audio Icon */}
        <div className="p-2 bg-primary/10 rounded-lg">
          <Music className="h-4 w-4 text-primary" />
        </div>

        {/* Play/Pause Button */}
        <button
          onClick={togglePlay}
          className="relative p-3 bg-gradient-to-r from-primary/20 to-primary/30 hover:from-primary/30 hover:to-primary/40 rounded-lg transition-all duration-300 group border border-primary/40 tech-button"
        >
          {isPlaying ? (
            <Pause className="h-5 w-5 text-primary group-hover:scale-110 transition-transform" />
          ) : (
            <Play className="h-5 w-5 text-primary group-hover:scale-110 transition-transform ml-0.5" />
          )}
          <div className="absolute inset-0 rounded-lg bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity blur-sm -z-10"></div>
        </button>

        {/* Volume Control */}
        <div className="flex items-center gap-3 bg-accent/50 rounded-lg p-2 border border-accent">
          <button
            onClick={toggleMute}
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
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={handleVolumeChange}
            className="w-20 h-2 bg-accent rounded-lg appearance-none cursor-pointer tech-slider"
          />
        </div>

        {/* Time Display */}
        <div className="text-xs text-muted-foreground font-mono bg-accent/30 px-2 py-1 rounded">
          {formatTime(currentTime)} / {formatTime(duration)}
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
