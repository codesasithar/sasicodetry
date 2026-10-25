import { useEffect, useRef, useState } from "react";
import { Facebook, Github, Instagram, Linkedin, Phone, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import teslaRobot from "@/assets/tesla-robot.png";

const socials = [
  { href: "https://www.linkedin.com/in/sasitharcodes/", icon: Linkedin, label: "LinkedIn" },
  { href: "https://github.com/codesasithar", icon: Github, label: "GitHub" },
  { href: "https://www.instagram.com/sasitharm/", icon: Instagram, label: "Instagram" },
  { href: "https://www.facebook.com/snazzy.sasithar", icon: Facebook, label: "Facebook" },
  { href: "tel:+919443798476", icon: Phone, label: "Phone" },
];

const TITLE_LINES = ["Software", "Developer."] as const;
const FIRST_LINE_LEN = TITLE_LINES[0].length;
const TOTAL_CHARS = FIRST_LINE_LEN + TITLE_LINES[1].length;

// Typed characters are visible, the rest stay invisible, so the heading
// reserves its final size from the first frame (no layout shift on mobile).
const TitleLine = ({ text, count, showCursor }: { text: string; count: number; showCursor: boolean }) => (
  <span className="block" aria-hidden="true">
    {text.slice(0, count)}
    {showCursor && <span className="ml-1 inline-block h-[0.72em] w-[0.07em] bg-primary" />}
    <span className="invisible">{text.slice(count)}</span>
  </span>
);

const Hero = () => {
  const showreelRef = useRef<HTMLVideoElement>(null);
  const [showreelPlaying, setShowreelPlaying] = useState(false);
  const [showreelUnavailable, setShowreelUnavailable] = useState(false);
  const [typedCount, setTypedCount] = useState(() =>
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? TOTAL_CHARS
      : 0
  );

  useEffect(() => {
    if (typedCount >= TOTAL_CHARS) return;
    const timer = window.setTimeout(() => setTypedCount((count) => count + 1), 90);
    return () => window.clearTimeout(timer);
  }, [typedCount]);

  const isTyping = typedCount < TOTAL_CHARS;
  const reelStatus = showreelPlaying ? "Now playing" : showreelUnavailable ? "Playback unavailable" : "Ready to play";

  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
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
      className="relative flex min-h-[100svh] items-center overflow-hidden px-5 pb-16 pt-24 sm:px-8 sm:pt-28 lg:px-10"
    >
      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Text */}
        <div className="lg:col-span-7">
          <p className="inline-flex items-center gap-2 text-sm text-muted-foreground">
            <span className="h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
            Available for new projects
          </p>

          <h1 className="mt-6 text-5xl font-semibold leading-[0.95] tracking-tighter text-foreground min-[380px]:text-6xl sm:text-7xl xl:text-8xl">
            <span className="sr-only">Software Developer.</span>
            <TitleLine
              text={TITLE_LINES[0]}
              count={Math.min(typedCount, FIRST_LINE_LEN)}
              showCursor={typedCount < FIRST_LINE_LEN}
            />
            <TitleLine
              text={TITLE_LINES[1]}
              count={Math.max(0, typedCount - FIRST_LINE_LEN)}
              showCursor={isTyping && typedCount >= FIRST_LINE_LEN}
            />
          </h1>

          <p className="mt-6 max-w-sm text-base leading-relaxed text-muted-foreground sm:text-lg">
            2+ years of hands-on experience. 5+ projects built and deployed.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
            <Button
              onClick={scrollToProjects}
              size="lg"
              className="h-12 w-full rounded-full px-8 text-base sm:w-auto"
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
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <social.icon className="h-5 w-5" aria-hidden="true" />
                </a>
              ))}
            </nav>
          </div>
        </div>

        {/* Visuals */}
        <div className="flex flex-col gap-6 lg:col-span-5">
          <div className="relative mx-auto aspect-[5/4] w-full max-w-md lg:max-w-none">
            <div aria-hidden="true" className="absolute inset-[18%] rounded-full bg-primary/10 blur-3xl" />
            <img
              src={teslaRobot}
              alt="Tesla Optimus humanoid robot"
              decoding="async"
              className="relative h-full w-full object-contain"
            />
          </div>

          <div className="relative aspect-video overflow-hidden rounded-2xl border border-border bg-card lg:aspect-[2/1]">
            <video
              ref={showreelRef}
              src="/videos/skills-video.mp4"
              poster="/videos/skills-video-thumb.jpg"
              loop
              playsInline
              controls={showreelPlaying}
              preload="metadata"
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
                className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-background/70 text-foreground backdrop-blur-md transition-colors hover:bg-primary hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-95"
              >
                <Play className="h-5 w-5 fill-current" aria-hidden="true" />
              </button>
            )}

            <div
              className={`pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-gradient-to-t from-background/90 to-transparent px-4 pb-3 pt-10 transition-opacity duration-300 ${
                showreelPlaying ? "opacity-0" : "opacity-100"
              }`}
            >
              <span className="text-sm font-medium text-foreground">Skills showreel</span>
              <span className="flex items-center gap-1.5 text-xs text-muted-foreground" aria-live="polite">
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
