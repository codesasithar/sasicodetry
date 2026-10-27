import { useEffect, useRef, useState } from "react";
import { Facebook, Github, Instagram, Linkedin, Phone, Pin, Play, Shuffle } from "lucide-react";
import { Button } from "@/components/ui/button";
import profileHeroCutout from "@/assets/profile-hero-cutout.webp";

const socials = [
  { href: "https://www.linkedin.com/in/sasitharcodes/", icon: Linkedin, label: "LinkedIn" },
  { href: "https://github.com/codesasithar", icon: Github, label: "GitHub" },
  { href: "https://www.instagram.com/sasitharm/", icon: Instagram, label: "Instagram" },
  { href: "https://www.facebook.com/snazzy.sasithar", icon: Facebook, label: "Facebook" },
  { href: "tel:+919443798476", icon: Phone, label: "Phone" },
];

const ROLE_TITLE = "Developer.";

const heroNotePool = [
  { id: "experience", tone: "gold", source: "The journey", text: "2+ years building. 5+ projects shipped." },
  { id: "ux", tone: "cyan", source: "Writing desk", text: "Great mobile UX starts with understanding people." },
  { id: "ar", tone: "coral", source: "Project log", text: "AR road safety, Android apps, and VR experiments." },
  { id: "craft", tone: "mint", source: "Studio rule", text: "Clean code is a kindness to whoever comes next." },
  { id: "excelpro", tone: "lavender", source: "Build note", text: "Turning spreadsheet data into student-ready tools." },
  { id: "resilient", tone: "peach", source: "Writing desk", text: "Build for the rough edges, and apps stay resilient." },
  { id: "library", tone: "gold", source: "Off-screen", text: "10 books on the shelf. Countless rabbit holes." },
  { id: "delivery", tone: "cyan", source: "Studio rule", text: "Fast delivery, thoughtful details, useful results." },
  { id: "future", tone: "coral", source: "Writing desk", text: "The future gets interesting when AR feels useful." },
  { id: "book-atomic-habits", tone: "cyan", source: "Library · Atomic Habits", text: "Tiny habits are votes cast for the person you are becoming." },
  { id: "book-history", tone: "gold", source: "Library · A Brief History of Time", text: "The universe is strange enough to make curiosity a daily habit." },
  { id: "book-ikigai", tone: "coral", source: "Library · Ikigai", text: "A meaningful life can begin with one useful thing, done with care." },
  { id: "book-dopamine", tone: "lavender", source: "Library · Dopamine Detox", text: "When every ping feels urgent, silence becomes a superpower." },
  { id: "book-brain", tone: "mint", source: "Library · Brain Surgeon", text: "Your brain is a city that keeps rebuilding itself." },
  { id: "movie-inception", tone: "gold", source: "Movies · Inception", text: "An idea is the world's stickiest sticky note. Plant the good ones." },
  { id: "movie-matrix", tone: "cyan", source: "Movies · The Matrix", text: "There is no spoon — and half the time, no actual bug either." },
  { id: "movie-kung-fu-panda", tone: "lavender", source: "Movies · Kung Fu Panda", text: "There is no secret ingredient. It was you all along." },
  { id: "movie-social-network", tone: "peach", source: "Movies · The Social Network", text: "Ship it from your dorm; history rarely books a conference room." },
  { id: "game-horizon", tone: "mint", source: "Game shelf · Horizon Zero Dawn", text: "Ancient machines, open wilds, and a mystery worth chasing." },
  { id: "game-skyrim", tone: "coral", source: "Game shelf · Skyrim", text: "Some open worlds keep calling you back for one more quest." },
  { id: "game-forza", tone: "cyan", source: "Game shelf · Forza Horizon 5", text: "Open roads, vivid landscapes, full throttle." },
  { id: "rolemodel-tesla", tone: "gold", source: "Role models · Nikola Tesla", text: "Curiosity can change how the whole world is powered." },
  { id: "rolemodel-einstein", tone: "lavender", source: "Role models · Albert Einstein", text: "Keep asking questions about the world around you." },
  { id: "rolemodel-bruce-lee", tone: "peach", source: "Role models · Bruce Lee", text: "Stay adaptable. Keep improving." },
  { id: "achievement-git", tone: "mint", source: "Achievements · Git and GitHub", text: "Small commits, clear history, better teamwork." },
  { id: "achievement-itfest", tone: "coral", source: "Achievements · IT Fest", text: "Inter-college IT Fest winner — one for the highlight reel." },
];

const pickHeroNotes = (exclude: string[] = []) => {
  const available = heroNotePool.filter((note) => !exclude.includes(note.id));
  for (let index = available.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [available[index], available[swapIndex]] = [available[swapIndex], available[index]];
  }
  return available.slice(0, 3);
};

const Hero = ({ startTyping = true }: { startTyping?: boolean }) => {
  const showreelRef = useRef<HTMLVideoElement>(null);
  const [showreelPlaying, setShowreelPlaying] = useState(false);
  const [showreelUnavailable, setShowreelUnavailable] = useState(false);
  const [heroNotes, setHeroNotes] = useState(() => pickHeroNotes());
  const [canAnimateTitle, setCanAnimateTitle] = useState(
    () => typeof window !== "undefined" && !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  const [typedCount, setTypedCount] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? ROLE_TITLE.length
      : 0
  );
  const reelStatus = showreelPlaying ? "Now playing" : showreelUnavailable ? "Playback unavailable" : "Ready to play";

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMotionPreference = () => {
      const shouldAnimate = !reducedMotion.matches;
      setCanAnimateTitle(shouldAnimate);
      if (!shouldAnimate) setTypedCount(ROLE_TITLE.length);
    };

    syncMotionPreference();
    reducedMotion.addEventListener("change", syncMotionPreference);
    return () => reducedMotion.removeEventListener("change", syncMotionPreference);
  }, []);

  useEffect(() => {
    if (!startTyping || !canAnimateTitle || typedCount >= ROLE_TITLE.length) return;
    const timer = window.setTimeout(() => setTypedCount((count) => count + 1), 72);
    return () => window.clearTimeout(timer);
  }, [canAnimateTitle, startTyping, typedCount]);
  const scrollToProjects = () => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.getElementById("projects")?.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  };

  const playShowreel = () => {
    setShowreelUnavailable(false);
    const playback = showreelRef.current?.play();
    if (playback) {
      void playback.catch(() => {
        setShowreelPlaying(false);
        setShowreelUnavailable(true);
      });
    }
  };

  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className="hero-responsive relative flex min-h-[100svh] items-center overflow-hidden px-4 pb-10 pt-24 font-sans sm:px-8 sm:pb-12 sm:pt-24 lg:px-12 lg:pb-16 lg:pt-28"
    >
      <div className="mx-auto grid w-full max-w-7xl items-center gap-8 sm:gap-10 lg:grid-cols-12 lg:gap-x-12 lg:gap-y-0 xl:gap-x-16">
        <div className="hero-copy relative z-10 lg:col-span-7">
          <p className="mb-0 inline-flex items-center gap-2 text-sm text-muted-foreground">
            <span className="hero-status-dot relative h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
            Available for new projects
          </p>

          <h1
            id="hero-heading"
            aria-label="Software Developer."
            className="mb-0 mt-5 max-w-[11ch] text-5xl font-semibold leading-[0.92] tracking-[-0.06em] text-foreground min-[380px]:text-6xl sm:mt-6 sm:text-7xl xl:text-8xl"
          >
            <span className="block" aria-hidden="true">Software</span>
            <span className="block text-primary" aria-hidden="true">
              <span className="inline-grid align-baseline">
                <span className="col-start-1 row-start-1" style={{ gridArea: "1 / 1", visibility: "hidden" }}>Developer.</span>
                <span className="col-start-1 row-start-1 whitespace-nowrap" style={{ gridArea: "1 / 1" }}>
                  {ROLE_TITLE.slice(0, typedCount)}
                  {typedCount < ROLE_TITLE.length && <span className="hero-title-cursor" aria-hidden="true" />}
                </span>
              </span>
            </span>
          </h1>

          <p className="mb-0 mt-5 max-w-md text-base leading-relaxed text-muted-foreground sm:mt-6 sm:text-lg">
            2+ years of hands-on experience. 5+ projects built and deployed.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:items-center sm:gap-8">
            <Button
              type="button"
              onClick={scrollToProjects}
              size="lg"
              className="hero-primary-cta h-12 w-full rounded-full px-7 text-sm shadow-lg shadow-primary/10 transition-transform hover:-translate-y-0.5 sm:w-auto sm:text-base"
            >
              View my work
            </Button>

            <nav aria-label="Social links" className="flex items-center justify-center gap-1 sm:justify-start">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={social.label}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-transparent text-muted-foreground transition-colors hover:border-border hover:bg-card/70 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <social.icon className="h-5 w-5" aria-hidden="true" />
                </a>
              ))}
            </nav>
          </div>

          <section className="hero-notice-board" aria-labelledby="hero-notice-title">
            <div className="hero-notice-heading">
              <div>
                <p className="hero-notice-kicker">FIELD NOTES / PINNED</p>
                <h2 id="hero-notice-title" className="hero-notice-title">A few things on my mind</h2>
              </div>
              <Button
                type="button"
                size="sm"
                variant="outline"
                className="hero-note-shuffle"
                onClick={() => setHeroNotes((current) => pickHeroNotes(current.map((note) => note.id)))}
                aria-label="Shuffle the pinned notes"
              >
                <Shuffle className="h-3.5 w-3.5" aria-hidden="true" />
                Shuffle
              </Button>
            </div>
            <div className="hero-notes-grid" aria-live="polite" aria-relevant="additions text">
              {heroNotes.map((note) => (
                <article key={note.id} className="hero-sticky-note" data-tone={note.tone}>
                  <span className="hero-note-pin" aria-hidden="true"><Pin size={14} strokeWidth={2.4} /></span>
                  <p>{note.text}</p>
                  <span className="hero-note-source">{note.source}</span>
                </article>
              ))}
            </div>
          </section>
        </div>

        <div className="hero-visual-column mx-auto flex w-full max-w-[32rem] flex-col gap-5 lg:col-span-5 lg:gap-6">
          <div className="hero-composite relative aspect-[0.96] w-full sm:aspect-square">
            <div
              aria-hidden="true"
              className="absolute inset-0 rounded-[2rem] border border-border/70 bg-gradient-to-br from-card/80 via-background/60 to-primary/5 shadow-[inset_0_1px_0_hsl(var(--foreground)/0.05)]"
            />
            <div aria-hidden="true" className="absolute inset-[18%] rounded-full bg-primary/10 blur-3xl" />
            <div aria-hidden="true" className="absolute inset-x-[12%] bottom-[12%] h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
            <img
              src={profileHeroCutout}
              alt="Portrait of Sasithar"
              decoding="async"
              fetchPriority="high"
              className="hero-art-image absolute inset-0 z-10 h-full w-full object-contain object-center"
            />

          </div>
          <div className="hero-showreel-card relative mx-auto aspect-video w-[90%] max-w-md overflow-hidden rounded-2xl border border-border/80 bg-card shadow-[0_1.5rem_3rem_hsl(var(--background)/0.45)]">
            <video
              ref={showreelRef}
              src="/videos/skills-video.mp4"
              poster="/videos/skills-video-thumb.jpg"
              aria-label="Skills showreel"
              loop
              playsInline
              controls={showreelPlaying}
              preload="none"
              onPlay={() => {
                setShowreelUnavailable(false);
                setShowreelPlaying(true);
              }}
              onPause={() => setShowreelPlaying(false)}
              onEnded={() => setShowreelPlaying(false)}
              onError={() => {
                setShowreelUnavailable(true);
                setShowreelPlaying(false);
              }}
              className="absolute inset-0 h-full w-full object-cover"
            />

            {!showreelPlaying && (
              <button
                type="button"
                aria-label={showreelUnavailable ? "Retry skills showreel" : "Play skills showreel"}
                onClick={playShowreel}
                className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-background/80 text-foreground shadow-lg backdrop-blur-md transition-colors hover:bg-primary hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-95 sm:h-14 sm:w-14"
              >
                <Play className="h-5 w-5 fill-current" aria-hidden="true" />
              </button>
            )}

            <div
              className={`pointer-events-none absolute inset-x-0 bottom-0 flex flex-col items-start gap-0.5 bg-gradient-to-t from-background/95 via-background/65 to-transparent px-3 pb-2 pt-8 transition-opacity duration-300 ${showreelPlaying ? "opacity-0" : "opacity-100"} sm:flex-row sm:items-end sm:justify-between sm:gap-2`}
            >
              <span className="text-xs font-medium text-foreground sm:text-sm">Skills showreel</span>
              <span className="flex items-center gap-1.5 text-[0.6rem] text-muted-foreground sm:text-xs" aria-live="polite">
                <span
                  className={`h-1.5 w-1.5 rounded-full ${showreelUnavailable ? "bg-destructive" : "bg-primary"}`}
                  aria-hidden="true"
                />
                {reelStatus}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
