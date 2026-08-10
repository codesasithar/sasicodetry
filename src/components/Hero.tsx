import {
  ArrowRight,
  Github,
  Linkedin,
  Phone,
  Code,
  Terminal,
  Instagram,
  Facebook,
  Play,
  Sparkles,
} from "lucide-react";
import teslaRobot from "@/assets/tesla-robot.png";
import { useEffect, useState } from "react";
import { useTypingEffect } from "@/hooks/useTypingEffect";
import SparkText from "@/components/SparkText";

const Hero = () => {
  const applicationTyping = useTypingEffect({
    text: "Application",
    speed: 120,
    delay: 400,
  });

  const developerTyping = useTypingEffect({
    text: "Developer",
    speed: 150,
    delay: 1600,
  });

  const typingText = useTypingEffect({
    text: "I like to craft solid and scalable mobile products with great user experiences. Passionate about turning innovative ideas into working digital solutions. Currently pursuing PG in AI/ML.",
    speed: 30,
    delay: 2500,
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
      column.style.animationDuration = Math.random() * 10 + 10 + "s";
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
      column.style.animationDuration = Math.random() * 8 + 12 + "s";
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
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20 pb-16 lg:py-0"
    >
      {/* Visual Background Layers */}
      <img
        src={iRobotBg}
        alt="Futuristic humanoid robot"
        loading="lazy"
        decoding="async"
        className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 pointer-events-none irobot-blend hidden lg:block opacity-20 filter blur-[0.5px] mix-blend-lighten"
        style={{ width: "clamp(200px, 45vw, 550px)" }}
      />

      <div className="absolute inset-0 gradient-hero">
        <div className="matrix-bg hidden sm:block opacity-40"></div>
        <div className="binary-rain hidden sm:block opacity-40"></div>
        <div className="tech-grid absolute inset-0 opacity-25"></div>
        <div className="circuit-pattern opacity-15"></div>

        {/* Ambient Glow Orbs */}
        <div className="interactive-orb top-1/4 left-10 hidden sm:block"></div>
        <div className="interactive-orb bottom-20 right-1/4 hidden sm:block" style={{ animationDelay: "2s" }}></div>

        {/* Desktop Code Snippets */}
        <div className="absolute top-28 right-1/3 code-snippet overflow-hidden w-40 hidden lg:block text-xs font-mono backdrop-blur-md bg-black/30 p-2 rounded-lg border border-white/10">
          <span className="text-accent">const</span> <span className="text-primary">developer</span> = <span className="text-accent">'Sasithar'</span>;
        </div>
        <div className="absolute bottom-28 left-16 code-snippet overflow-hidden w-36 hidden sm:block text-xs font-mono backdrop-blur-md bg-black/30 p-2 rounded-lg border border-white/10" style={{ animationDelay: "1s" }}>
          <span className="text-primary">function</span> <span className="text-accent">buildApp()</span>
        </div>

        {/* Animated Tech Icons */}
        <div className="absolute top-24 left-1/4 text-primary/20 animate-float hidden sm:block">
          <Code className="w-6 h-6" />
        </div>
        <div className="absolute bottom-32 right-1/3 text-accent/20 animate-float hidden sm:block" style={{ animationDelay: "1.5s" }}>
          <Terminal className="w-5 h-5" />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="section-container relative z-20 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline, Bio & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
            
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-medium text-primary mb-6 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-primary animate-pulse" />
              <span>Available for New Projects</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight font-sans leading-[1.05] mb-6">
              <span className="text-foreground block">
                {applicationTyping.displayedText}
                {!applicationTyping.isComplete && <span className="animate-pulse text-primary ml-1">|</span>}
              </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary/90 to-accent block mt-1">
                {developerTyping.displayedText}
                {!developerTyping.isComplete && applicationTyping.isComplete && (
                  <span className="animate-pulse text-accent ml-1">|</span>
                )}
              </span>
            </h1>

            {/* Bio Card */}
            <div className="relative w-full max-w-xl p-5 sm:p-6 rounded-2xl bg-card/40 border border-white/10 backdrop-blur-xl mb-8 shadow-2xl overflow-hidden">
              {/* Mobile Arc Reactor behind the bio text */}
              <div className="lg:hidden absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none z-0">
                <div className="arc-reactor scale-[0.7] sm:scale-90">
                  <div className="arc-core" />
                  <div className="arc-ring arc-ring-1" />
                  <div className="arc-ring arc-ring-2" />
                  <div className="arc-ring arc-ring-3" />
                  <div className="arc-particles">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div key={i} className="arc-particle" />
                    ))}
                  </div>
                </div>
              </div>

              <div className="absolute -top-px left-12 right-12 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
              <p className="relative z-10 text-sm sm:text-base text-muted-foreground leading-relaxed">
                <SparkText text={typingText.displayedText} variant="text-only" />
                {!typingText.isComplete && <span className="animate-pulse text-primary font-bold">|</span>}
              </p>
            </div>

            {/* Social Links Bar */}
            <div className="flex items-center justify-center sm:justify-start gap-2.5 w-full max-w-xl">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={social.label}
                  className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-muted-foreground hover:text-primary hover:border-primary/40 hover:bg-white/10 transition-all shadow-sm"
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>

            {/* Experience Pill Counters */}
            <div className="grid grid-cols-2 gap-4 mt-8 w-full max-w-xl">
              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white/5 border border-white/5 backdrop-blur-sm">
                <span className="text-2xl font-black text-accent">5+</span>
                <div className="flex flex-col text-left">
                  <span className="text-[11px] font-bold text-foreground uppercase tracking-wider">Projects</span>
                  <span className="text-[10px] text-muted-foreground">Built & Deployed</span>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white/5 border border-white/5 backdrop-blur-sm">
                <span className="text-2xl font-black text-primary">2+</span>
                <div className="flex flex-col text-left">
                  <span className="text-[11px] font-bold text-foreground uppercase tracking-wider">Years</span>
                  <span className="text-[10px] text-muted-foreground">Practical Experience</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Showcase Video Frame */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div className="relative w-full max-w-md lg:max-w-none group">
              
              {/* Outer Decorative Glow Rings */}
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-accent/30 rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition duration-500" />
              
              {/* Main Player Frame */}
              <div className="relative aspect-video rounded-2xl sm:rounded-3xl overflow-hidden border border-white/15 bg-black/60 shadow-2xl backdrop-blur-md">
                <video
                  src="/videos/skills-video.mp4"
                  poster="/videos/skills-video-thumb.jpg"
                  loop
                  playsInline
                  controls
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

                {/* Overlay Play Hint */}
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/20 backdrop-blur-[1px] group-hover:opacity-0 transition-opacity duration-300 pointer-events-none">
                  <div className="w-12 h-12 rounded-full bg-primary/90 border border-white/20 flex items-center justify-center shadow-lg">
                    <Play className="w-5 h-5 text-primary-foreground fill-current ml-0.5" />
                  </div>
                  <div className="mt-3 px-3 py-1 rounded-md bg-black/70 border border-white/10">
                    <p className="text-[10px] font-mono text-primary uppercase tracking-widest">Interactive Skills Demo</p>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* End-of-Hero CTA */}
        <div className="relative z-20 flex justify-center w-full mt-10 lg:mt-14">
          <button
            onClick={scrollToProjects}
            className="group relative inline-flex items-center justify-center gap-3 px-10 py-4 bg-primary text-primary-foreground rounded-xl font-semibold tracking-wider text-xs sm:text-sm uppercase overflow-hidden shadow-[0_0_25px_rgba(0,240,255,0.25)] transition-all hover:bg-primary/90 active:scale-[0.98]"
          >
            <span>View My Work</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
