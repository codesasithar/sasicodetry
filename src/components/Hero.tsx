import { ArrowRight, Github, Linkedin, Mail, Phone } from "lucide-react";

const Hero = () => {
  const scrollToProjects = () => {
    const element = document.getElementById('projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 gradient-hero">
        <div className="absolute inset-0 opacity-20">
          {/* Floating tech elements */}
          <div className="absolute top-20 left-20 w-2 h-2 bg-primary rounded-full animate-float"></div>
          <div className="absolute top-40 right-32 w-1 h-1 bg-accent rounded-full animate-float" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-32 left-1/4 w-3 h-3 bg-primary-glow rounded-full animate-float" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-20 right-20 w-2 h-2 bg-accent rounded-full animate-float" style={{animationDelay: '0.5s'}}></div>
        </div>
      </div>

      <div className="section-container text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-slide-up">
            <span className="text-foreground">Hi, I'm </span>
            <span className="text-primary text-glow animate-glow">Sasithar</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 animate-fade-in" style={{animationDelay: '0.3s'}}>
            A passionate <span className="text-primary font-semibold">app developer</span> and{' '}
            <span className="text-accent font-semibold">technology enthusiast</span>
          </p>

          {/* Welcome Message */}
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto animate-fade-in" style={{animationDelay: '0.6s'}}>
            Welcome to my digital space where <span className="text-primary">code meets creativity</span>!
            I turn innovative ideas into working digital products.
          </p>

          {/* CTA Button */}
          <div className="mb-12 animate-fade-in" style={{animationDelay: '0.9s'}}>
            <button
              onClick={scrollToProjects}
              className="btn-tech text-lg group"
            >
              Explore My Work
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          {/* Quick Contact Links */}
          <div className="flex justify-center space-x-6 animate-fade-in" style={{animationDelay: '1.2s'}}>
            <a
              href="mailto:sasicodes@gmail.com"
              className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <Mail className="h-5 w-5" />
              <span>Email</span>
            </a>
            <a
              href="tel:+919443798476"
              className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <Phone className="h-5 w-5" />
              <span>Call</span>
            </a>
            <a
              href="https://linkedin.com/in/sasitharcodes"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <Linkedin className="h-5 w-5" />
              <span>LinkedIn</span>
            </a>
            <a
              href="https://github.com/codesasithar/Projects"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <Github className="h-5 w-5" />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;