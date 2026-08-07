import {
  ArrowRight,
  Github,
  Linkedin,
  Mail,
  Phone,
  Code,
  Terminal,
  Zap,
  Instagram,
  Facebook,
  Play,
} from "lucide-react";
import iRobotBg from "@/assets/irobot-bg.png";
import { useEffect, useState } from "react";
import { useTypingEffect } from "@/hooks/useTypingEffect";
import SparkText from "@/components/SparkText";

const Hero = () => {
  const [sparkIntensity, setSparkIntensity] = useState(70);
  const [glowStrength, setGlowStrength] = useState(60);
  const [controlsOpen, setControlsOpen] = useState(false);

  const glowOpacity = glowStrength / 100;
  const glowBlur = 24 + glowStrength * 0.6;
  const sparkOpacity = sparkIntensity / 100;
  const sparkScale = 0.7 + (sparkIntensity / 100) * 0.6;

  const applicationTyping = useTypingEffect({
    text: "Application",
    speed: 120,
    delay: 400
  });

  const developerTyping = useTypingEffect({
    text: "Developer",
    speed: 150,
    delay: 1600
  });

  const typingText = useTypingEffect({
    text: "I like to craft solid and scalable mobile products with great user experiences. Passionate about turning innovative ideas into working digital solutions. Currently pursuing PG in AI/ML.",
    speed: 30,
    delay: 2500
  });

  const scrollToProjects = () => {
    const element = document.getElementById("projects");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Matrix rain effect
  useEffect(() => {
    const matrixContainer = document.querySelector(".matrix-bg");
    if (!matrixContainer) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const characters = "01ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz</>{}[];";

    const createMatrixColumn = () => {
      if (document.hidden || matrixContainer.childElementCount > 40) return;
      const column = document.createElement("div");
      column.className = "matrix-column";
      column.style.left = Math.random() * 100 + "%";
      column.style.animationDuration = (Math.random() * 10 + 10) + "s";
      column.style.animationDelay = Math.random() * 5 + "s";
      let text = "";
      for (let i = 0; i < 20; i++) {
        text += characters[Math.floor(Math.random() * characters.length)] + "\n";
      }
      column.textContent = text;

      matrixContainer.appendChild(column);

      setTimeout(() => {
        if (column.parentNode) {
          column.parentNode.removeChild(column);
        }
      }, 15000);
    };

    const interval = setInterval(createMatrixColumn, 300);

    return () => {
      clearInterval(interval);
      if (matrixContainer) matrixContainer.innerHTML = "";
    };
  }, []);

  // Binary rain effect
  useEffect(() => {
    const binaryContainer = document.querySelector(".binary-rain");
    if (!binaryContainer) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const createBinaryColumn = () => {
      if (document.hidden || binaryContainer.childElementCount > 30) return;
      const column = document.createElement("div");
      column.className = "binary-column";
      column.style.left = Math.random() * 100 + "%";
      column.style.animationDuration = (Math.random() * 8 + 12) + "s";
      column.style.animationDelay = Math.random() * 3 + "s";
      let binary = "";
      for (let i = 0; i < 15; i++) {
        binary += Math.random() > 0.5 ? "1" : "0";
        if (i < 14) binary += "\n";
      }
      column.textContent = binary;

      binaryContainer.appendChild(column);

      setTimeout(() => {
        if (column.parentNode) {
          column.parentNode.removeChild(column);
        }
      }, 20000);
    };

    const interval = setInterval(createBinaryColumn, 500);

    return () => {
      clearInterval(interval);
      if (binaryContainer) binaryContainer.innerHTML = "";
    };
  }, []);

  const socials = [
    { href: "https://www.linkedin.com/in/sasitharcodes/", icon: Linkedin, label: "LinkedIn" },
    { href: "https://github.com/codesasithar", icon: Github, label: "GitHub" },
    { href: "https://www.instagram.com/sasitharm/", icon: Instagram, label: "Instagram" },
    { href: "https://www.facebook.com/snazzy.sasithar", icon: Facebook, label: "Facebook" },
    { href: "tel:+919443798476", icon: Phone, label: "Phone" },
  ];

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* -- I, Robot-inspired visual layer -- */}
      <img
        src={iRobotBg}
        alt="Futuristic humanoid robot"
        loading="lazy"
        decoding="async"
        className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 pointer-events-none irobot-blend hidden lg:block"
        style={{
          width: "clamp(200px, 50vw, 600px)",
          opacity: 0.25,
          filter: "blur(0.5px)",
          mixBlendMode: "lighten",
        }}
      />

      {/* Dynamic Tech Background */}
      <div className="absolute inset-0 gradient-hero">
        <div className="matrix-bg hidden sm:block"></div>
        <div className="binary-rain hidden sm:block"></div>
        <div className="tech-grid absolute inset-0 opacity-30 sm:opacity-100"></div>
        <div className="circuit-pattern opacity-20 sm:opacity-100"></div>
        <div className="interactive-orb top-20 left-20 hidden sm:block"></div>
        <div className="interactive-orb bottom-32 right-32 hidden sm:block" style={{ animationDelay: "2s" }}></div>
        <div className="interactive-orb top-1/2 left-1/4 hidden lg:block" style={{ animationDelay: "4s" }}></div>

        {/* Arc Reactor Center - desktop only */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 scale-75 sm:scale-90 lg:scale-100 hidden md:block">
          <div className="arc-reactor-futuristic">
            <div className="arc-outer-tech-ring">
              {[...Array(16)].map((_, i) => (
                <div
                  key={i}
                  className={`arc-tech-segment ${i % 4 === 0 ? 'arc-tech-major' : 'arc-tech-minor'}`}
                  style={{ transform: `rotate(${i * 22.5}deg)` }}
                ></div>
              ))}
            </div>
            <div className="arc-secondary-ring">
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="arc-secondary-segment"
                  style={{
                    transform: `rotate(${i * 30}deg)`,
                    animationDelay: `${i * 0.1}s`
                  }}
                ></div>
              ))}
            </div>
            <div className="arc-inner-glow-ring"></div>
            <div className="arc-core-housing">
              <div className="arc-glowing-ring"></div>
            </div>
          </div>
        </div>

        {/* Floating Code Snippets */}
        <div className="absolute top-20 right-40 code-snippet overflow-hidden w-32 sm:w-48 hidden lg:block">
          <span className="text-accent">const</span>{" "}
          <span className="text-primary">developer</span> = <span className="text-accent">'Sasithar'</span>;
        </div>
        <div
          className="absolute bottom-40 left-20 code-snippet overflow-hidden w-28 sm:w-40 hidden sm:block"
          style={{ animationDelay: "1s" }}
        >
          <span className="text-primary">function</span>{" "}
          <span className="text-accent">buildApp()</span> {"{"}
          ...{"}"}
        </div>
        <div
          className="absolute top-1/3 right-1/4 code-snippet overflow-hidden w-24 sm:w-32 hidden lg:block"
          style={{ animationDelay: "2s" }}
        >
          <span className="text-accent">import</span> <span className="text-primary">React</span>{" "}
          <span className="text-accent">from</span> 'react';
        </div>

        {/* Particle Tech Elements */}
        <div className="particle-tech top-32 left-32 hidden sm:block" style={{ animationDelay: "0s" }}></div>
        <div className="particle-tech top-40 right-40 hidden sm:block" style={{ animationDelay: "1s" }}></div>
        <div className="particle-tech bottom-32 left-1/3 hidden lg:block" style={{ animationDelay: "2s" }}></div>
        <div className="particle-tech bottom-40 right-1/3 hidden lg:block" style={{ animationDelay: "3s" }}></div>
        <div className="particle-tech top-1/2 left-1/2 hidden lg:block" style={{ animationDelay: "4s" }}></div>
        <div className="particle-tech top-60 right-60 hidden lg:block" style={{ animationDelay: "5s" }}></div>

        {/* Animated Tech Icons */}
        <div className="absolute top-24 left-1/3 text-primary/20 animate-float hidden sm:block">
          <Code className="w-6 h-6 sm:w-8 sm:h-8" />
        </div>
        <div className="absolute bottom-24 right-1/3 text-accent/20 animate-float hidden sm:block" style={{ animationDelay: "1.5s" }}>
          <Terminal className="w-4 h-4 sm:w-6 sm:h-6" />
        </div>
        <div className="absolute top-1/3 right-20 text-primary/20 animate-float hidden lg:block" style={{ animationDelay: "3s" }}>
          <Zap className="w-5 h-5 sm:w-7 sm:h-7" />
        </div>
      </div>

      {/* Content Wrapper */}
      <div className="section-container relative z-20 px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-0 w-full">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 xl:gap-20 items-center">

            {/* Left Column - Identity & Copy */}
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
              {/* Headline */}
              <h1 className="space-y-1 sm:space-y-2 mb-4 sm:mb-6 animate-slide-up leading-tight" style={{ animationDelay: "0.2s" }}>
                <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground/90">
                  <SparkText text={applicationTyping.displayedText} variant="minimal" />
                  {!applicationTyping.isComplete && <span className="animate-pulse text-accent ml-0.5">|</span>}
                </span>
                <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-primary">
                  <SparkText text={developerTyping.displayedText} variant="minimal" />
                  {!developerTyping.isComplete && <span className="animate-pulse text-accent ml-0.5">|</span>}
                </span>
              </h1>

              {/* Tagline Card */}
              <div className="relative w-full max-w-md lg:max-w-none p-4 sm:p-5 rounded-2xl bg-card/40 border border-white/5 backdrop-blur-xl mb-6 sm:mb-8 animate-fade-in">
                <div className="absolute -top-px left-8 right-8 sm:left-12 sm:right-12 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed text-center lg:text-left">
                  <SparkText text={typingText.displayedText} variant="text-only" />
                  {!typingText.isComplete && <span className="animate-pulse text-primary font-bold">|</span>}
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4 w-full max-w-xs sm:max-w-sm mb-6 sm:mb-8 animate-fade-in" style={{ animationDelay: "0.6s" }}>
                <div className="flex flex-col items-center p-3 sm:p-4 rounded-xl bg-white/5 border border-white/5 backdrop-blur-sm">
                  <span className="text-2xl sm:text-3xl font-black text-accent">5+</span>
                  <span className="text-[10px] sm:text-xs uppercase tracking-widest text-muted-foreground font-semibold">Projects Built</span>
                </div>
                <div className="flex flex-col items-center p-3 sm:p-4 rounded-xl bg-white/5 border border-white/5 backdrop-blur-sm">
                  <span className="text-2xl sm:text-3xl font-black text-primary">2+</span>
                  <span className="text-[10px] sm:text-xs uppercase tracking-widest text-muted-foreground font-semibold">Years Experience</span>
                </div>
              </div>

              {/* CTA */}
              <div className="mb-6 sm:mb-8 animate-fade-in" style={{ animationDelay: "0.8s" }}>
                <button
                  onClick={scrollToProjects}
                  className="group relative inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 bg-primary text-primary-foreground rounded-xl font-bold uppercase tracking-widest text-xs sm:text-sm overflow-hidden shadow-[0_0_30px_rgba(0,240,255,0.18)] transition-all hover:bg-primary/90 active:scale-[0.98]"
                >
                  <span className="mr-1">🚀</span>
                  View My Work
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>

              {/* Social Links */}
              <div className="flex justify-center lg:justify-start gap-3 sm:gap-4 animate-fade-in" style={{ animationDelay: "1s" }}>
                {socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target={social.href.startsWith("http") ? "_blank" : undefined}
                    rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    aria-label={social.label}
                    className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 text-muted-foreground hover:text-primary hover:border-primary/40 hover:bg-white/10 transition-all cursor-magnetic cursor-glow ripple-effect touch-manipulation"
                  >
                    <social.icon className="h-4 w-4 sm:h-5 sm:w-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Right Column - Video Player */}
            <div className="flex flex-col items-center lg:items-end animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <div className="relative w-full max-w-md lg:max-w-full group">
                <div className="absolute -inset-2 sm:-inset-4 bg-gradient-vibrant rounded-2xl sm:rounded-3xl blur-lg opacity-25 animate-pulse" />
                <div className="absolute -top-3 sm:-top-6 -right-3 sm:-right-6 w-14 h-14 sm:w-24 sm:h-24 border-2 border-accent/20 rounded-full" />
                <div className="absolute -bottom-3 sm:-bottom-6 -left-3 sm:-left-6 w-10 h-10 sm:w-18 sm:h-18 bg-primary/20 rounded-xl sm:rounded-2xl rotate-45" />

                <div className="relative aspect-video rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-primary/30 bg-black/40 shadow-2xl">
                  <video
                    src="/videos/skills-video.mp4"
                    poster="/videos/skills-video-thumb.jpg"
                    loop
                    playsInline
                    controls
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/30 to-transparent pointer-events-none" />

                  {/* Play hint overlay - hidden when video is interacted with */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/30 backdrop-blur-[2px] opacity-100 group-hover:opacity-0 transition-opacity duration-500 pointer-events-none">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-primary/90 border-4 border-primary/30 flex items-center justify-center shadow-[0_0_20px_rgba(0,240,255,0.5)]">
                      <Play className="w-5 h-5 sm:w-6 sm:h-6 text-primary-foreground fill-current ml-1" />
                    </div>
                    <div className="mt-3 px-3 py-1 rounded-lg bg-black/60 border border-white/10">
                      <p className="text-[10px] sm:text-xs font-mono text-primary uppercase tracking-widest">About SASITHAR M</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Bottom Decorative Blur */}
      <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-80 h-80 bg-primary/20 rounded-full blur-[120px] pointer-events-none" />

      {/* Floating Controls */}
      <div className="fixed bottom-4 right-4 z-40 select-none">
        {controlsOpen ? (
          <div className="w-64 rounded-xl border border-primary/30 bg-background/80 backdrop-blur-md p-4 shadow-xl animate-fade-in">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold tracking-wide text-primary uppercase">Hero FX</span>
              <button
                onClick={() => setControlsOpen(false)}
                className="text-muted-foreground hover:text-foreground text-sm"
                aria-label="Close controls"
              >
                ✕
              </button>
            </div>
            <label className="block text-[11px] text-muted-foreground mb-1">
              Lightning intensity: <span className="text-foreground">{sparkIntensity}%</span>
            </label>
            <input
              type="range"
              min={0}
              max={100}
              value={sparkIntensity}
              onChange={(e) => setSparkIntensity(Number(e.target.value))}
              className="w-full accent-primary mb-3"
            />
            <label className="block text-[11px] text-muted-foreground mb-1">
              Glow strength: <span className="text-foreground">{glowStrength}%</span>
            </label>
            <input
              type="range"
              min={0}
              max={100}
              value={glowStrength}
              onChange={(e) => setGlowStrength(Number(e.target.value))}
              className="w-full accent-accent"
            />
          </div>
        ) : (
          <button
            onClick={() => setControlsOpen(true)}
            className="flex items-center gap-2 rounded-full border border-primary/30 bg-background/80 backdrop-blur-md px-3 py-2 text-xs text-foreground hover:bg-background shadow-md"
            aria-label="Open hero effect controls"
          >
            <Zap className="h-3.5 w-3.5 text-primary" />
            FX
          </button>
        )}
      </div>
    </section>
  );
};

export default Hero;
