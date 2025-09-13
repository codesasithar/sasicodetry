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
// Using uploaded profile image
import iRobotBg from "@/assets/irobot-bg.png";
import { useEffect, useState } from "react";
import { useTypingEffect } from "@/hooks/useTypingEffect";

const Hero = () => {

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
    text: "I like to craft solid and scalable mobile products with great user experiences. Passionate about turning innovative ideas into working digital solutions.",
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
        className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 pointer-events-none irobot-blend hidden md:block"
        style={{
          width: "45vw",
          maxWidth: "600px",
          minWidth: "300px",
          opacity: 0.36,
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

        {/* Arc Reactor Center - Futuristic Tech Design */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 scale-75 sm:scale-90 lg:scale-100">
          <div className="arc-reactor-futuristic">
            {/* Outermost Ring with Tech Segments */}
            <div className="arc-outer-tech-ring">
              {[...Array(16)].map((_, i) => (
                <div 
                  key={i} 
                  className={`arc-tech-segment ${i % 4 === 0 ? 'arc-tech-major' : 'arc-tech-minor'}`}
                  style={{ transform: `rotate(${i * 22.5}deg)` }}
                ></div>
              ))}
            </div>
            
            {/* Secondary Ring with Detailed Segments */}
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
            
            {/* Inner Glowing Ring */}
            <div className="arc-inner-glow-ring"></div>
            
            {/* Core Housing */}
            <div className="arc-core-housing">
              {/* Simple Glowing Ring */}
              <div className="arc-glowing-ring"></div>
            </div>
          </div>
        </div>

        {/* Floating Code Snippets */}
        <div className="absolute top-20 right-20 code-snippet overflow-hidden w-32 sm:w-48 hidden sm:block">
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
      <div className="section-container relative z-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Desktop Layout */}
          <div className="hidden lg:grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left Column - Text Content */}
            <div className="text-center lg:text-left">
              <div className="inline-block bg-accent/20 text-accent px-3 py-2 sm:px-4 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6 animate-slide-up">
                Welcome to my portfolio
              </div>

              <h1
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 animate-slide-up relative"
                style={{ animationDelay: "0.2s" }}
              >
                <span className="text-foreground relative inline-block">
                  {applicationTyping.displayedText}
                  {!applicationTyping.isComplete && <span className="animate-pulse text-accent">|</span>}
                </span>
                <br />
                <span className="text-primary text-glow glitch-text relative inline-block" data-text="Developer.">
                  {developerTyping.displayedText}
                  {!developerTyping.isComplete && <span className="animate-pulse text-accent">|</span>}
                  {/* Typing sparks */}
                  {!developerTyping.isComplete && (
                    <div className="absolute -right-2 sm:-right-4 top-1/2 transform -translate-y-1/2">
                      <div className="spark-burst">
                        <div className="spark-particle spark-1"></div>
                        <div className="spark-particle spark-2"></div>
                        <div className="spark-particle spark-3"></div>
                        <div className="spark-particle spark-4"></div>
                      </div>
                    </div>
                  )}
                </span>
              </h1>

              <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-xl min-h-[3rem] sm:min-h-[4rem] animate-fade-in mx-auto lg:mx-0" style={{ animationDelay: "0.4s" }}>
                {typingText.displayedText}
                {!typingText.isComplete && <span className="animate-pulse">|</span>}
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

            {/* Right Column - Profile Photo and Badge */}
            <div className="flex flex-col items-center lg:items-end animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <div className="relative">
                <div className="absolute -inset-2 sm:-inset-4 bg-gradient-vibrant rounded-2xl sm:rounded-3xl blur-lg opacity-30 animate-pulse"></div>
                <div className="absolute -top-4 sm:-top-8 -right-4 sm:-right-8 w-16 h-16 sm:w-32 sm:h-32 border-2 border-accent/20 rounded-full"></div>
                <div className="absolute -bottom-4 sm:-bottom-8 -left-4 sm:-left-8 w-12 h-12 sm:w-24 sm:h-24 bg-primary/20 rounded-xl sm:rounded-2xl rotate-45"></div>

                <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-2xl sm:rounded-3xl overflow-hidden border-2 sm:border-4 border-primary/30">
                  <img
                    src="/lovable-uploads/sasicodes_arc_reactor.png"
                    alt="Sasithar M - Application Developer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent"></div>
                </div>

                <div className="absolute -bottom-2 sm:-bottom-4 -right-2 sm:-right-4 bg-card border border-border rounded-xl sm:rounded-2xl p-2 sm:p-4 animate-float">
                  <div className="text-xs sm:text-sm font-medium text-accent">Available for work</div>
                  <div className="text-[10px] sm:text-xs text-muted-foreground">Based in India</div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="lg:hidden flex flex-col items-center text-center space-y-8">
            {/* Text Content */}
            <div>
              <div className="inline-block bg-accent/20 text-accent px-3 py-2 rounded-full text-xs font-medium mb-4 animate-slide-up">
                Welcome to my portfolio
              </div>

              <h1
                className="text-3xl sm:text-4xl font-bold mb-4 animate-slide-up relative"
                style={{ animationDelay: "0.2s" }}
              >
                <span className="text-foreground relative inline-block">
                  {applicationTyping.displayedText}
                  {!applicationTyping.isComplete && <span className="animate-pulse text-accent">|</span>}
                </span>
                <br />
                <span className="text-primary text-glow glitch-text relative inline-block" data-text="Developer.">
                  {developerTyping.displayedText}
                  {!developerTyping.isComplete && <span className="animate-pulse text-accent">|</span>}
                </span>
              </h1>

              <p className="text-base text-muted-foreground mb-6 max-w-lg animate-fade-in" style={{ animationDelay: "0.4s" }}>
                {typingText.displayedText}
                {!typingText.isComplete && <span className="animate-pulse">|</span>}
              </p>

              <div className="flex justify-center space-x-6 mb-6 animate-fade-in" style={{ animationDelay: "0.6s" }}>
                <div className="text-center">
                  <div className="text-xl font-bold text-accent">5+</div>
                  <div className="text-xs text-muted-foreground">Projects Built</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-primary">2+</div>
                  <div className="text-xs text-muted-foreground">Years Experience</div>
                </div>
              </div>

              <div className="mb-8 animate-fade-in" style={{ animationDelay: "0.8s" }}>
                <button
                  onClick={scrollToProjects}
                  className="btn-tech text-base group cursor-glow ripple-effect sparkle-hover relative overflow-hidden hover-scale"
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

            {/* Profile Photo - Now below the button */}
            <div className="flex flex-col items-center animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <div className="relative">
                <div className="absolute -inset-2 bg-gradient-vibrant rounded-2xl blur-lg opacity-30 animate-pulse"></div>
                <div className="absolute -top-4 -right-4 w-16 h-16 border-2 border-accent/20 rounded-full"></div>
                <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-primary/20 rounded-xl rotate-45"></div>

                <div className="relative w-64 h-64 rounded-2xl overflow-hidden border-2 border-primary/30">
                  <img
                    src="/lovable-uploads/sasicodes_arc_reactor.png"
                    alt="Sasithar M - Application Developer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent"></div>
                </div>

                <div className="absolute -bottom-2 -right-2 bg-card border border-border rounded-xl p-2 animate-float">
                  <div className="text-xs font-medium text-accent">Available for work</div>
                  <div className="text-[10px] text-muted-foreground">Based in India</div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex justify-center space-x-3 animate-fade-in" style={{ animationDelay: "1s" }}>
              <a
                href="https://linkedin.com/in/sasitharcodes"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-card/50 rounded-lg text-muted-foreground hover:text-primary hover:bg-card transition-all cursor-magnetic cursor-glow ripple-effect"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href="https://github.com/codesasithar/Projects"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-card/50 rounded-lg text-muted-foreground hover:text-primary hover:bg-card transition-all cursor-magnetic cursor-glow ripple-effect"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href="https://www.instagram.com/sasitharm/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-card/50 rounded-lg text-muted-foreground hover:text-primary hover:bg-card transition-all cursor-magnetic cursor-glow ripple-effect"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="https://www.facebook.com/snazzy.sasithar"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-card/50 rounded-lg text-muted-foreground hover:text-primary hover:bg-card transition-all cursor-magnetic cursor-glow ripple-effect"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="tel:+919443798476"
                className="p-2 bg-card/50 rounded-lg text-muted-foreground hover:text-primary hover:bg-card transition-all cursor-magnetic cursor-glow ripple-effect"
              >
                <Phone className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
