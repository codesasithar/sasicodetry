import { ArrowRight, Github, Linkedin, Mail, Phone, Code, Terminal, Zap, Instagram, Facebook } from "lucide-react";
import sasitharPortrait from "@/assets/sasithar-portrait.jpg";
import AudioPlayer from "@/components/AudioPlayer";
import { useEffect } from "react";

const Hero = () => {
  const scrollToProjects = () => {
    const element = document.getElementById('projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Matrix Rain effect
  useEffect(() => {
    const matrixContainer = document.querySelector('.matrix-bg');
    if (!matrixContainer) return;

    const characters = '01ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz</>{}[];';
    const createMatrixColumn = () => {
      const column = document.createElement('div');
      column.className = 'matrix-column';
      column.style.left = Math.random() * 100 + '%';
      column.style.animationDuration = (Math.random() * 10 + 10) + 's';
      column.style.animationDelay = Math.random() * 5 + 's';
      let text = '';
      for (let i = 0; i < 20; i++) {
        text += characters[Math.floor(Math.random() * characters.length)] + '\n';
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
      if (matrixContainer) {
        matrixContainer.innerHTML = '';
      }
    };
  }, []);

  // Binary Rain effect
  useEffect(() => {
    const binaryContainer = document.querySelector('.binary-rain');
    if (!binaryContainer) return;
    const createBinaryColumn = () => {
      const column = document.createElement('div');
      column.className = 'binary-column';
      column.style.left = Math.random() * 100 + '%';
      column.style.animationDuration = (Math.random() * 8 + 12) + 's';
      column.style.animationDelay = Math.random() * 3 + 's';
      let binary = '';
      for (let i = 0; i < 15; i++) {
        binary += Math.random() > 0.5 ? '1' : '0';
        if (i < 14) binary += '\n';
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
      if (binaryContainer) {
        binaryContainer.innerHTML = '';
      }
    };
  }, []);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Dynamic Tech Background */}
      <div className="absolute inset-0 gradient-hero">
        {/* Matrix Rain Effect */}
        <div className="matrix-bg"></div>
        {/* Binary Rain Effect */}
        <div className="binary-rain"></div>
        {/* Tech Grid Pattern */}
        <div className="tech-grid absolute inset-0"></div>
        {/* Circuit Pattern */}
        <div className="circuit-pattern"></div>
        {/* Interactive Floating Orbs */}
        <div className="interactive-orb top-20 left-20"></div>
        <div className="interactive-orb bottom-32 right-32" style={{animationDelay: '2s'}}></div>
        <div className="interactive-orb top-1/2 left-1/4" style={{animationDelay: '4s'}}></div>
        {/* Floating Code Snippets */}
        <div className="absolute top-20 right-20 code-snippet overflow-hidden w-48">
          <span className="text-accent">const</span> <span className="text-primary">developer</span> = <span className="text-accent">'Sasithar'</span>;
        </div>
        <div className="absolute bottom-40 left-20 code-snippet overflow-hidden w-40" style={{animationDelay: '1s'}}>
          <span className="text-primary">function</span> <span className="text-accent">buildApp()</span> {'{'}...{'}'}
        </div>
        <div className="absolute top-1/3 right-1/4 code-snippet overflow-hidden w-32" style={{animationDelay: '2s'}}>
          <span className="text-accent">import</span> <span className="text-primary">React</span> <span className="text-accent">from</span> 'react';
        </div>
        {/* Particle Tech Elements */}
        <div className="particle-tech top-32 left-32" style={{animationDelay: '0s'}}></div>
        <div className="particle-tech top-40 right-40" style={{animationDelay: '1s'}}></div>
        <div className="particle-tech bottom-32 left-1/3" style={{animationDelay: '2s'}}></div>
        <div className="particle-tech bottom-40 right-1/3" style={{animationDelay: '3s'}}></div>
        <div className="particle-tech top-1/2 left-1/2" style={{animationDelay: '4s'}}></div>
        <div className="particle-tech top-60 right-60" style={{animationDelay: '5s'}}></div>
        {/* Animated Tech Icons */}
        <div className="absolute top-24 left-1/3 text-primary/20 animate-float">
          <Code className="w-8 h-8" />
        </div>
        <div className="absolute bottom-24 right-1/3 text-accent/20 animate-float" style={{animationDelay: '1.5s'}}>
          <Terminal className="w-6 h-6" />
        </div>
        <div className="absolute top-1/3 right-20 text-primary/20 animate-float" style={{animationDelay: '3s'}}>
          <Zap className="w-7 h-7" />
        </div>
      </div>

      <div className="section-container relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
          {/* Left Column - Text Content */}
          <div className="text-left lg:text-left">
            {/* Tagline */}
            <div className="inline-block bg-accent/20 text-accent px-4 py-2 rounded-full text-sm font-medium mb-6 animate-slide-up">
              Welcome to my portfolio
            </div>

            {/* Audio Player below Welcome heading */}
            <div className="mb-6 mt-2 max-w-xs mx-auto">
              <AudioPlayer />
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 animate-slide-up" style={{animationDelay: '0.2s'}}>
              <span className="text-foreground">Mobile App</span>
              <br />
              <span className="text-primary text-glow glitch-text" data-text="Developer.">Developer.</span>
            </h1>

            {/* Description */}
            <p className="text-xl text-muted-foreground mb-8 max-w-xl animate-fade-in" style={{animationDelay: '0.4s'}}>
              I like to craft solid and scalable mobile products with great user experiences. 
              Passionate about turning innovative ideas into working digital solutions.
            </p>

            {/* Stats */}
            <div className="flex space-x-8 mb-8 animate-fade-in" style={{animationDelay: '0.6s'}}>
              <div>
                <div className="text-2xl font-bold text-accent">5+</div>
                <div className="text-sm text-muted-foreground">Projects Built</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">2+</div>
                <div className="text-sm text-muted-foreground">Years Experience</div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="mb-8 animate-fade-in" style={{animationDelay: '0.8s'}}>
              <button
                onClick={scrollToProjects}
                className="btn-tech text-lg group mr-4 cursor-glow ripple-effect sparkle-hover"
              >
                View My Work
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </button>
              <a
                href="mailto:sasicodes@gmail.com"
                className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors cursor-glow"
              >
                <Mail className="mr-2 h-5 w-5" />
                Get In Touch
              </a>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4 animate-fade-in" style={{animationDelay: '1s'}}>
              <a
                href="https://linkedin.com/in/sasitharcodes"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-card/50 rounded-lg text-muted-foreground hover:text-primary hover:bg-card transition-all cursor-magnetic cursor-glow ripple-effect"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="https://github.com/codesasithar/Projects"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-card/50 rounded-lg text-muted-foreground hover:text-primary hover:bg-card transition-all cursor-magnetic cursor-glow ripple-effect"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://www.instagram.com/sasitharm/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-card/50 rounded-lg text-muted-foreground hover:text-primary hover:bg-card transition-all cursor-magnetic cursor-glow ripple-effect"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://www.facebook.com/snazzy.sasithar"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-card/50 rounded-lg text-muted-foreground hover:text-primary hover:bg-card transition-all cursor-magnetic cursor-glow ripple-effect"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="tel:+919443798476"
                className="p-3 bg-card/50 rounded-lg text-muted-foreground hover:text-primary hover:bg-card transition-all cursor-magnetic cursor-glow ripple-effect"
              >
                <Phone className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Right Column - Profile Photo */}
          <div className="flex flex-col items-center lg:items-end animate-fade-in" style={{animationDelay: '0.3s'}}>
            <div className="relative">
              {/* Decorative Elements */}
              <div className="absolute -inset-4 bg-gradient-vibrant rounded-3xl blur-lg opacity-30 animate-pulse"></div>
              <div className="absolute -top-8 -right-8 w-32 h-32 border-2 border-accent/20 rounded-full"></div>
              <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-primary/20 rounded-2xl rotate-45"></div>
              
              {/* Main Photo */}
              <div className="relative w-80 h-80 lg:w-96 lg:h-96 rounded-3xl overflow-hidden border-4 border-primary/30">
                <img
                  src={sasitharPortrait}
                  alt="Sasithar M - Mobile App Developer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent"></div>
              </div>

              {/* Floating Badge */}
              <div className="absolute -bottom-4 -right-4 bg-card border border-border rounded-2xl p-4 animate-float">
                <div className="text-sm font-medium text-accent">Available for work</div>
                <div className="text-xs text-muted-foreground">Based in India</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
