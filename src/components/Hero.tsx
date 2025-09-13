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
import { useEffect } from "react";
import { useTypingEffect } from "@/hooks/useTypingEffect";

const Hero = () => {
  const applicationTyping = useTypingEffect({
    text: "Application",
    speed: 120,
    delay: 400,
  });
  const developerTyping = useTypingEffect({
    text: "Developer.",
    speed: 150,
    delay: 1600,
  });
  const typingText = useTypingEffect({
    text:
      "I like to craft solid and scalable mobile products with great user experiences. Passionate about turning innovative ideas into working digital solutions.",
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
    const characters =
      "01ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz</>{}[];";
    const createMatrixColumn = () => {
      const column = document.createElement("div");
      column.className = "matrix-column";
      column.style.left = Math.random() * 100 + "%";
      column.style.animationDuration = Math.random() * 10 + 10 + "s";
      column.style.animationDelay = Math.random() * 5 + "s";
      let text = "";
      for (let i = 0; i < 20; i++) {
        text +=
          characters[Math.floor(Math.random() * characters.length)] + "\n";
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
        {/* ...Other background elements unchanged... */}
      </div>
      {/* Content Wrapper */}
      <div className="section-container relative z-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Desktop Layout */}
          <div className="hidden lg:grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left Column - Text Content */}
            <div className="text-center lg:text-left">
              {/* ...Text, buttons, and social links unchanged... */}
            </div>
            {/* Right Column - Profile Photo and Badge */}
            <div
              className="flex flex-col items-center lg:items-end animate-fade-in"
              style={{ animationDelay: "0.3s" }}
            >
              <div className="relative">
                <div className="absolute -inset-2 sm:-inset-4 bg-gradient-vibrant rounded-2xl sm:rounded-3xl blur-lg opacity-30 animate-pulse"></div>
                <div className="absolute -top-4 sm:-top-8 -right-4 sm:-right-8 w-16 h-16 sm:w-32 sm:h-32 border-2 border-accent/20 rounded-full"></div>
                <div className="absolute -bottom-4 sm:-bottom-8 -left-4 sm:-left-8 w-12 h-12 sm:w-24 sm:h-24 bg-primary/20 rounded-xl sm:rounded-2xl rotate-45"></div>
                <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-2xl sm:rounded-3xl border-2 sm:border-4 border-primary/30 bg-card flex items-center justify-center">
                  <img
                    src="/lovable-uploads/sasicodes_arc_reactor.png"
                    alt="Sasithar M - Application Developer"
                    className="w-full h-full object-contain"
                    style={{ borderRadius: "inherit" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent pointer-events-none"></div>
                </div>
                <div className="absolute -bottom-2 sm:-bottom-4 -right-2 sm:-right-4 bg-card border border-border rounded-xl sm:rounded-2xl p-2 sm:p-4 animate-float">
                  <div className="text-xs sm:text-sm font-medium text-accent">
                    Available for work
                  </div>
                  <div className="text-[10px] sm:text-xs text-muted-foreground">
                    Based in India
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Mobile Layout */}
          <div className="lg:hidden flex flex-col items-center text-center space-y-8">
            {/* Text Content ... */}
            <div>
              {/* ...Text, buttons, and counts unchanged... */}
            </div>
            {/* Profile Photo */}
            <div
              className="flex flex-col items-center animate-fade-in"
              style={{ animationDelay: "0.3s" }}
            >
              <div className="relative">
                <div className="absolute -inset-2 bg-gradient-vibrant rounded-2xl blur-lg opacity-30 animate-pulse"></div>
                <div className="absolute -top-4 -right-4 w-16 h-16 border-2 border-accent/20 rounded-full"></div>
                <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-primary/20 rounded-xl rotate-45"></div>
                <div className="relative w-64 h-64 rounded-2xl border-2 border-primary/30 bg-card flex items-center justify-center">
                  <img
                    src="/lovable-uploads/sasicodes_arc_reactor.png"
                    alt="Sasithar M - Application Developer"
                    className="w-full h-full object-contain"
                    style={{ borderRadius: "inherit" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent pointer-events-none"></div>
                </div>
                <div className="absolute -bottom-2 -right-2 bg-card border border-border rounded-xl p-2 animate-float">
                  <div className="text-xs font-medium text-accent">
                    Available for work
                  </div>
                  <div className="text-[10px] text-muted-foreground">
                    Based in India
                  </div>
                </div>
              </div>
            </div>
            {/* Social Links ... */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
