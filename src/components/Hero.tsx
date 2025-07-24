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

  // ...matrix rain and binary rain effect hooks as before...

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* (background and decorative code remains unchanged) */}

      <div className="section-container relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
          {/* Left Column - Text Content */}
          <div className="text-left lg:text-left">
            {/* Tagline */}
            <div className="inline-block bg-accent/20 text-accent px-4 py-2 rounded-full text-sm font-medium mb-6 animate-slide-up">
              Welcome to my portfolio
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

          {/* Right Column - Profile Photo with AudioPlayer below */}
          <div className="flex flex-col items-center lg:items-end animate-fade-in" style={{animationDelay: '0.3s'}}>
            <div className="relative">
              {/* Decorative elements */}
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
            
            {/* AudioPlayer: aligned and compact below photo */}
            <div className="mt-4 w-full max-w-xs flex justify-center lg:justify-end">
              <AudioPlayer />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
