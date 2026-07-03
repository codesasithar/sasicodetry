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
} from "lucide-react";
import iRobotBg from "@/assets/irobot-bg.png";
import profilePicture from "@/assets/profile-hero-cartoon.png";
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
    text: "Developer.",
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
    const characters = "01ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz</>{}[];";

    const createMatrixColumn = () => {
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

    const createBinaryColumn = () => {
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

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* -- I, Robot-inspired visual layer -- */}
      <img
        src={iRobotBg}
        alt="Futuristic humanoid robot"
        className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 pointer-events-none irobot-blend"
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

        {/* Arc Reactor Center */}
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

        {/* Profile Picture & Welcome Badge Elegant Placement */}
        <div
          className="absolute top-6 left-6 sm:top-12 sm:left-12 z-30 animate-fade-in pointer-events-none flex items-center gap-4"
          style={{ animationDelay: "0.5s" }}
        >
          <div className="relative">
            <div
              className="absolute -inset-6 rounded-full"
              style={{
                background:
                  "radial-gradient(closest-side, rgba(0,240,255,0.35), rgba(59,130,246,0.18) 45%, transparent 75%)",
                opacity: glowOpacity,
                filter: `blur(${glowBlur * 0.6}px)`,
                transition: "opacity 0.2s ease, filter 0.2s ease",
              }}
            />
            <div
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{
                opacity: sparkOpacity,
                transform: `scale(${sparkScale})`,
                background:
                  "conic-gradient(from 0deg, transparent 0deg, rgba(0,240,255,0.5) 20deg, transparent 40deg, transparent 120deg, rgba(168,85,247,0.4) 140deg, transparent 160deg, transparent 240deg, rgba(0,240,255,0.5) 260deg, transparent 280deg, transparent 360deg)",
                mixBlendMode: "screen",
                filter: `blur(${2 + sparkIntensity * 0.05}px)`,
                animation: "spin 6s linear infinite",
                transition: "opacity 0.2s ease, transform 0.2s ease",
              }}
            />
            <img
              src={profilePicture}
              alt="Sasithar M"
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                }
              }}
              title="Get in touch"
              className="relative w-20 h-20 sm:w-28 sm:h-28 lg:w-36 lg:h-36 object-contain object-bottom select-none border border-primary/20 rounded-full p-1 bg-background/40 backdrop-blur-sm shadow-lg animate-cartoon-wiggle hover:animate-cartoon-pop cursor-pointer"
              style={{
                WebkitMaskImage:
                  "radial-gradient(circle at 50% 50%, #000 60%, rgba(0,0,0,0.8) 85%, transparent 100%)",
                maskImage:
                  "radial-gradient(circle at 50% 50%, #000 60%, rgba(0,0,0,0.8) 85%, transparent 100%)",
                filter: `drop-shadow(0 8px 16px rgba(0,0,0,0.45)) drop-shadow(0 0 ${glowStrength * 0.2}px rgba(0,240,255,${glowOpacity * 0.5})) contrast(1.02)`,
                transition: "filter 0.2s ease",
              }}
            />
          </div>

          {/* Badge position directly next to the display picture */}
          <div className="bg-accent/20 text-accent px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium backdrop-blur-md border border-accent/30 shadow-sm animate-slide-up h-fit whitespace-nowrap">
            Welcome to my portfolio
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
      <div className="section-container relative z-20 px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32 lg:pt-0">
        <div className="max-w-7xl mx-auto">
          {/* Desktop Layout */}
          <div className="hidden lg:grid lg:grid-cols-2 gap-12 xl:gap-16 items-center">
            {/* Left Column - Text Content */}
            <div className="text-center lg:text-left">
              {/* Top typography edits for precision typography scale */}
              <h1
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl tracking-tight font-light mb-5 animate-slide-up leading-tight pt-12 lg:pt-0"
                style={{ animationDelay: "0.2s" }}
              >
                <span className="text-foreground/90 block font-light tracking-wide mb-1 opacity-90">
                  <SparkText text={applicationTyping.displayedText} variant="minimal" />
                  {!applicationTyping.isComplete && <span className="animate-pulse text-accent ml-0.5">|</span>}
                </span>
                <span className="text-primary block font-semibold tracking-normal text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
                  <SparkText text={developerTyping.displayedText} variant="minimal" />
                  {!developerTyping.isComplete && <span className="animate-pulse text-accent ml-0.5">|</span>}
                </span>
              </h1>

              <p className="text-base sm:text-md text-muted-foreground mb-6 sm:mb-8 max-w-xl min-h-[4rem] sm:min-h-[5rem] animate-fade-in mx-auto lg:mx-0 glass-bg px-4 py-3 rounded-xl border border-white/5 backdrop-blur-sm" style={{ animationDelay: "0.4s" }}>
                <SparkText text={typingText.displayedText} variant="text-only" />
                {!typingText.isComplete && <span className="animate-pulse text-primary font-bold">|</span>}
              </p>

              <div className="flex justify-center lg:justify-start space-x-6 sm:space-x-8 mb-6 sm:mb-8 animate-fade-in" style={{ animationDelay: "0.6s" }}>
                <div className="text-center">
                  <div className="text-xl sm:text-2xl font-bold text-accent">5+</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">Projects Built</div>
                </div>
                <div className="text-center">
                  <div className="text-xl sm:text-2xl font-bold text-primary">2+</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">Years Experience</div>
                </div>
              </div>

              <div className="mb-6 sm:mb-8 animate-fade-in flex justify-center lg:justify-start" style={{ animationDelay: "0.8s" }}>
                <button
                  onClick={scrollToProjects}
                  className="btn-tech text-base sm:text-lg group cursor-glow ripple-effect sparkle-hover relative overflow-hidden hover-scale"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out"></span>
                  <span className="absolute inset-0 bg-primary/10 scale-0 group-hover:scale-100 transition-transform duration-300 ease-out rounded-lg"></span>
                  <span className="relative z-10 flex items-center">
                    <span className="mr-2">🚀</span>
                    View My Work
                    <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 transition-all duration-300 group-hover:translate-x-2 group-hover:scale-110" />
                  </span>
                  <div className="absolute inset-0 border border-primary/30 rounded-lg group-hover:border-primary/60 transition-colors duration-300"></div>
                </button>
              </div>

              <div className="flex justify-center lg:justify-start space-x-3 sm:space-x-4 animate-fade-in" style={{ animationDelay: "1s" }}>
                <a
                  href="https://linkedin.com/in/sasitharcodes"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 sm:p-3 bg-card/50 rounded-lg text-muted-foreground hover:text-primary hover:bg-card transition-all cursor-magnetic cursor-glow ripple-effect"
                >
                  <Linkedin className="h-4 w-4 sm:h-5 sm:w-5" />
                </a>
                <a
                  href="https://github.com/codesasithar/Projects"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 sm:p-3 bg-card/50 rounded-lg text-muted-foreground hover:text-primary hover:bg-card transition-all cursor-magnetic cursor-glow ripple-effect"
                >
                  <Github className="h-4 w-4 sm:h-5 sm:w-5" />
                </a>
                <a
                  href="https://www.instagram.com/sasitharm/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 sm:p-3 bg-card/50 rounded-lg text-muted-foreground hover:text-primary hover:bg-card transition-all cursor-magnetic cursor-glow ripple-effect"
                >
                  <Instagram className="h-4 w-4 sm:h-5 sm:w-5" />
                </a>
                <a
                  href="https://www.facebook.com/snazzy.sasithar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 sm:p-3 bg-card/50 rounded-lg text-muted-foreground hover:text-primary hover:bg-card transition-all cursor-magnetic cursor-glow ripple-effect"
                >
                  <Facebook className="h-4 w-4 sm:h-5 sm:w-5" />
                </a>
                <a
                  href="tel:+919443798476"
                  className="p-2 sm:p-3 bg-card/50 rounded-lg text-muted-foreground hover:text-primary hover:bg-card transition-all cursor-magnetic cursor-glow ripple-effect"
                >
                  <Phone className="h-4 w-4 sm:h-5 sm:w-5" />
                </a>
              </div>
            </div>

            {/* Right Column - Profile Card */}
            <div className="flex flex-col items-center lg:items-end animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <div className="relative group">
                <div className="absolute -inset-2 sm:-inset-4 bg-gradient-vibrant rounded-2xl sm:rounded-3xl blur-lg opacity-30 animate-pulse"></div>
                <div className="absolute -top-4 sm:-top-8 -right-4 sm:-right-8 w-16 h-16 sm:w-32 sm:h-32 border-2 border-accent/20 rounded-full"></div>
                <div className="absolute -bottom-4 sm:-bottom-8 -left-4 sm:-left-8 w-12 h-12 sm:w-24 sm:h-24 bg-primary/20 rounded-xl sm:rounded-2xl rotate-45"></div>

                <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-[420px] lg:h-[320px] rounded-2xl sm:rounded-3xl overflow-hidden border-2 sm:border-4 border-primary/30 bg-card/60 backdrop-blur-md flex flex-col items-center justify-center gap-4 sm:gap-6">
                  <img
                    src={profilePicture}
                    alt="Sasithar M"
                    className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 object-contain object-bottom rounded-full p-2 bg-background/40 border border-primary/20 shadow-lg animate-cartoon-wiggle hover:animate-cartoon-pop"
                    style={{
                      WebkitMaskImage:
                        "radial-gradient(circle at 50% 50%, #000 60%, rgba(0,0,0,0.8) 85%, transparent 100%)",
                      maskImage:
                        "radial-gradient(circle at 50% 50%, #000 60%, rgba(0,0,0,0.8) 85%, transparent 100%)",
                      filter: "drop-shadow(0 8px 16px rgba(0,0,0,0.45))",
                    }}
                  />
                  <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary animate-gradient bg-[length:200%_auto]">
                    Hi!
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="lg:hidden flex flex-col items-center text-center space-y-6 sm:space-y-8">
            <div className="w-full max-w-lg">
              {/* Mobile heading wrapper has an extra margin adjustments to give space to top DP position */}
              <h1
                className="text-2xl sm:text-3xl md:text-4xl tracking-tight font-light mb-4 animate-slide-up leading-tight pt-16"
                style={{ animationDelay: "0.2s" }}
              >
                <span className="text-foreground/90 block font-light tracking-wide mb-0.5">
                  <SparkText text={applicationTyping.displayedText} variant="minimal" />
                  {!applicationTyping.isComplete && <span className="animate-pulse text-accent ml-0.5">|</span>}
                </span>
                <span className="text-primary block font-semibold text-3xl sm:text-4xl md:text-5xl">
                  <SparkText text={developerTyping.displayedText} variant="minimal" />
                  {!developerTyping.isComplete && <span className="animate-pulse text-accent ml-0.5">|</span>}
                </span>
              </h1>

              <p className="text-base sm:text-md text-muted-foreground mb-6 sm:mb-8 max-w-lg mx-auto animate-fade-in leading-relaxed glass-bg px-4 py-3 rounded-xl border border-white/5 backdrop-blur-sm" style={{ animationDelay: "0.4s" }}>
                <SparkText text={typingText.displayedText} variant="text-only" />
                {!typingText.isComplete && <span className="animate-pulse text-primary font-bold">|</span>}
              </p>

              <div className="flex justify-center space-x-8 sm:space-x-12 mb-8 animate-fade-in" style={{ animationDelay: "0.6s" }}>
                <div className="text-center">
                  <div className="text-xl sm:text-2xl font-bold text-accent">5+</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">Projects Built</div>
                </div>
                <div className="text-center">
                  <div className="text-xl sm:text-2xl font-bold text-primary">2+</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">Years Experience</div>
                </div>
              </div>

              <div className="mb-8 animate-fade-in" style={{ animationDelay: "0.8s" }}>
                <button
                  onClick={scrollToProjects}
                  className="btn-tech text-base sm:text-lg group cursor-glow ripple-effect sparkle-hover relative overflow-hidden hover-scale min-h-[48px] px-6 sm:px-8"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out"></span>
                  <span className="absolute inset-0 bg-primary/10 scale-0 group-hover:scale-100 transition-transform duration-300 ease-out rounded-lg"></span>
                  <span className="relative z-10 flex items-center">
                    <span className="mr-2">🚀</span>
                    View My Work
                    <ArrowRight className="ml-2 h-4 w-4 transition-all duration-300 group-hover:translate-x-2 group-hover:scale-110" />
                  </span>
                  <div className="absolute inset-0 border border-primary/30 rounded-lg group-hover:border-primary/60 transition-colors duration-300"></div>
                </button>
              </div>
            </div>

            {/* Showcase Profile Card */}
            <div className="flex flex-col items-center animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <div className="relative group">
                <div className="absolute -inset-2 bg-gradient-vibrant rounded-2xl blur-lg opacity-30 animate-pulse"></div>
                <div className="absolute -top-4 -right-4 w-16 h-16 border-2 border-accent/20 rounded-full"></div>
                <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-primary/20 rounded-xl rotate-45"></div>

                <div className="relative w-72 h-52 rounded-2xl overflow-hidden border-2 border-primary/30 bg-card/60 backdrop-blur-md flex flex-col items-center justify-center gap-3">
                  <img
                    src={profilePicture}
                    alt="Sasithar M"
                    className="w-24 h-24 object-contain object-bottom rounded-full p-1.5 bg-background/40 border border-primary/20 shadow-lg animate-cartoon-wiggle hover:animate-cartoon-pop"
                    style={{
                      WebkitMaskImage:
                        "radial-gradient(circle at 50% 50%, #000 60%, rgba(0,0,0,0.8) 85%, transparent 100%)",
                      maskImage:
                        "radial-gradient(circle at 50% 50%, #000 60%, rgba(0,0,0,0.8) 85%, transparent 100%)",
                      filter: "drop-shadow(0 8px 16px rgba(0,0,0,0.45))",
                    }}
                  />
                  <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary animate-gradient bg-[length:200%_auto]">
                    Hi!
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex justify-center flex-wrap gap-3 sm:gap-4 animate-fade-in" style={{ animationDelay: "1s" }}>
              <a
                href="https://linkedin.com/in/sasitharcodes"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-card/50 rounded-lg text-muted-foreground hover:text-primary hover:bg-card transition-all cursor-magnetic cursor-glow ripple-effect min-w-[44px] min-h-[44px] flex items-center justify-center touch-manipulation"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="https://github.com/codesasithar/Projects"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-card/50 rounded-lg text-muted-foreground hover:text-primary hover:bg-card transition-all cursor-magnetic cursor-glow ripple-effect min-w-[44px] min-h-[44px] flex items-center justify-center touch-manipulation"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://www.instagram.com/sasitharm/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-card/50 rounded-lg text-muted-foreground hover:text-primary hover:bg-card transition-all cursor-magnetic cursor-glow ripple-effect min-w-[44px] min-h-[44px] flex items-center justify-center touch-manipulation"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://www.facebook.com/snazzy.sasithar"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-card/50 rounded-lg text-muted-foreground hover:text-primary hover:bg-card transition-all cursor-magnetic cursor-glow ripple-effect min-w-[44px] min-h-[44px] flex items-center justify-center touch-manipulation"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="tel:+919443798476"
                className="p-3 bg-card/50 rounded-lg text-muted-foreground hover:text-primary hover:bg-card transition-all cursor-magnetic cursor-glow ripple-effect min-w-[44px] min-h-[44px] flex items-center justify-center touch-manipulation"
              >
                <Phone className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

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
