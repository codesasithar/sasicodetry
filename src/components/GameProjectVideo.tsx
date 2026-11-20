const GameProjectVideo = () => (
  <figure className="mt-6 overflow-hidden rounded-xl border border-border/60 bg-black/80 shadow-lg shadow-black/20">
    <figcaption className="flex items-center justify-between px-3 py-2 text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground sm:px-4">
      <span>Game project clip</span>
      <span className="text-primary">BOYS</span>
    </figcaption>
    <video
      className="block aspect-video w-full bg-black object-contain"
      controls
      playsInline
      preload="metadata"
      aria-label="Play the BOYS game project clip"
    >
      <source src="/videos/boys.mp4" type="video/mp4" />
      Your browser does not support MP4 playback.
    </video>
  </figure>
);

export default GameProjectVideo;
