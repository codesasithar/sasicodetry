import { useState, useEffect } from "react";
import { Menu, X, Code2, User, Briefcase, Wrench, BookOpen, Library, Newspaper, Trophy, Film, Heart, Mail } from "lucide-react";
import AudioPlayerCompact from "@/components/AudioPlayerCompact";
import ThemeSwitcher from "@/components/ThemeSwitcher";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const navItems = [
    { id: "about", label: "About", icon: User },
    { id: "projects", label: "Projects", icon: Briefcase },
    { id: "services", label: "Services", icon: Wrench },
    { id: "writings", label: "Writings", icon: BookOpen },
    { id: "bookshelf", label: "My Library", icon: Library },
    { id: "news", label: "Tech News", icon: Newspaper },
    { id: "achievements", label: "Achievements", icon: Trophy },
    { id: "movies", label: "Movies I Love", icon: Film },
    { id: "role-models", label: "Role Models", icon: Heart },
    { id: "contact", label: "Contact", icon: Mail },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border transition-all duration-300">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="flex items-center justify-between h-16 lg:h-20 gap-4">
          {/* Logo */}
          <div className="flex items-center gap-3 transition-all duration-500 hover:scale-110 cursor-pointer group" onClick={() => scrollToSection('home')}>
            <div className="relative">
              {/* Hexagonal background */}
              <div className="absolute inset-0 -m-2">
                <div className="w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-primary/20 via-primary/10 to-transparent rotate-12 transition-all duration-500 group-hover:rotate-45 group-hover:from-primary/30 group-hover:via-primary/20" 
                  style={{clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'}}
                />
              </div>
              
              {/* Icon with glow effect */}
              <div className="relative z-10 bg-background/50 backdrop-blur-sm rounded-xl p-2 lg:p-3 border border-primary/20 group-hover:border-primary/40 transition-all duration-500">
                <Code2 className="h-7 w-7 sm:h-8 sm:w-8 lg:h-10 lg:w-10 text-primary transition-all duration-500 group-hover:rotate-12 group-hover:text-primary drop-shadow-[0_0_8px_hsl(var(--primary)/0.5)]" />
              </div>
              
              {/* Animated glow */}
              <div className="absolute inset-0 bg-primary/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
            </div>
            
            <div className="flex flex-col -space-y-1">
              <div className="relative">
                <span className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent bg-size-200 animate-gradient tracking-tight transition-all duration-300">
                  SasiCodes
                </span>
                
                {/* Animated underline with gradient */}
                <svg className="absolute -bottom-1 left-0 w-full h-3 overflow-visible" viewBox="0 0 200 8" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
                      <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="1" />
                      <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M0,4 Q50,2 100,4 T200,4"
                    stroke="url(#lineGradient)"
                    strokeWidth="2.5"
                    fill="none"
                    strokeLinecap="round"
                    className="animate-draw-line drop-shadow-[0_0_4px_hsl(var(--primary)/0.5)]"
                  />
                </svg>
                
                {/* Enhanced pencil icon */}
                <div className="absolute -bottom-1 right-0 animate-pencil-draw">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-primary rotate-[-15deg] drop-shadow-[0_0_4px_hsl(var(--primary)/0.8)]">
                    <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" 
                      stroke="currentColor" 
                      strokeWidth="2.5" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                      fill="hsl(var(--primary))"
                    />
                  </svg>
                </div>
              </div>
              <span className="text-xs sm:text-sm lg:text-base text-primary/80 font-semibold tracking-[0.25em] uppercase">Developer</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-0.5">
            {navItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`
                    group relative px-1.5 py-1.5 text-[10px] font-medium rounded-md
                    transition-all duration-300 ease-in-out transform hover:scale-105
                    ${activeSection === item.id 
                      ? "text-primary bg-primary/10 shadow-sm shadow-primary/20" 
                      : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                    }
                    after:absolute after:bottom-0 after:left-1/2 after:transform after:-translate-x-1/2
                    after:w-0 after:h-0.5 after:bg-primary after:transition-all after:duration-300
                    ${activeSection === item.id ? "after:w-full" : "hover:after:w-3/4"}
                  `}
                  style={{ 
                    animationDelay: `${index * 50}ms`,
                    animation: 'fade-in 0.6s ease-out forwards'
                  }}
                  type="button"
                >
                  <div className="flex items-center gap-0.5">
                    <Icon className={`h-3 w-3 transition-all duration-300 ${activeSection === item.id ? 'text-primary drop-shadow-[0_0_4px_hsl(var(--primary)/0.5)]' : 'group-hover:scale-110 group-hover:text-primary'}`} />
                    <span className="whitespace-nowrap">{item.label}</span>
                  </div>
                </button>
              );
            })}

            {/* Theme Switcher and AudioPlayer in desktop nav */}
            <div className="ml-1 flex items-center gap-1 border-l border-border pl-1">
              <ThemeSwitcher />
              <div className="transform transition-all duration-300 hover:scale-105">
                <AudioPlayerCompact />
              </div>
            </div>
          </div>

          {/* Tablet Navigation (md-lg) */}
          <div className="hidden md:flex lg:hidden items-center space-x-1">
            {navItems.slice(0, 6).map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`
                    group px-2 py-1.5 text-[10px] font-medium rounded-md
                    transition-all duration-300 ease-in-out hover:scale-105
                    ${activeSection === item.id 
                      ? "text-primary bg-primary/10 shadow-sm shadow-primary/20" 
                      : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                    }
                  `}
                  type="button"
                >
                  <div className="flex items-center gap-1.5">
                    <Icon className={`h-4 w-4 transition-all duration-300 ${activeSection === item.id ? 'text-primary' : 'group-hover:scale-110'}`} />
                    <span>{item.label}</span>
                  </div>
                </button>
              );
            })}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="ml-2 p-2 text-foreground hover:text-primary transition-all duration-300 hover:scale-110"
              aria-label="More options"
              type="button"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div className="ml-3 flex items-center gap-2 border-l border-border pl-3">
              <ThemeSwitcher />
              <AudioPlayerCompact />
            </div>
          </div>

          {/* Mobile Menu Button with Theme Switcher and AudioPlayer */}
          <div className="md:hidden flex items-center gap-2 sm:gap-3">
            {/* Theme Switcher */}
            <ThemeSwitcher />
            
            {/* Compact AudioPlayer in mobile navbar */}
            <div className="flex items-center transform transition-all duration-300 hover:scale-105">
              <AudioPlayerCompact />
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-foreground hover:text-primary transition-all duration-300 transform hover:scale-110 hover:rotate-3"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              type="button"
            >
              <div className="relative">
                <Menu className={`h-6 w-6 transition-all duration-300 ${isOpen ? 'opacity-0 rotate-45' : 'opacity-100 rotate-0'}`} />
                <X className={`h-6 w-6 absolute top-0 left-0 transition-all duration-300 ${isOpen ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-45'}`} />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation with Glass Effect */}
        <div className={`
          md:hidden overflow-hidden transition-all duration-500 ease-in-out
          ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
        `}>
          <div className="py-4 border-t border-border backdrop-blur-xl bg-background/60 shadow-lg relative">
            {/* Glassmorphism overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-card/40 to-card/20 backdrop-blur-xl" style={{ backdropFilter: 'blur(20px)' }} />
            
            <div className="relative z-10 flex flex-col space-y-1">
              {navItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`
                      group text-left px-4 py-3 text-sm font-medium rounded-lg mx-2
                      transition-all duration-300 ease-in-out transform
                      ${activeSection === item.id 
                        ? "text-primary bg-primary/10 translate-x-2 shadow-sm shadow-primary/20" 
                        : "text-muted-foreground hover:text-foreground hover:bg-accent/50 hover:translate-x-1"
                      }
                    `}
                    style={{ 
                      animationDelay: `${index * 75}ms`,
                      animation: isOpen ? 'slide-in-right 0.4s ease-out forwards' : undefined
                    }}
                    type="button"
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`h-6 w-6 transition-all duration-300 ${activeSection === item.id ? 'text-primary drop-shadow-[0_0_4px_hsl(var(--primary)/0.5)]' : 'group-hover:scale-110 group-hover:text-primary'}`} />
                      <span>{item.label}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Tablet Dropdown for remaining items */}
        {isOpen && (
          <div className="hidden md:flex md:flex-col lg:hidden absolute top-full right-4 mt-2 bg-background/95 backdrop-blur-lg border border-border rounded-lg shadow-lg p-2 min-w-48 animate-fade-in z-50">
            {navItems.slice(6).map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`
                    group w-full text-left px-3 py-2 text-xs font-medium rounded-md
                    transition-all duration-300 ease-in-out hover:scale-105
                    ${activeSection === item.id 
                      ? "text-primary bg-primary/10 shadow-sm shadow-primary/20" 
                      : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                    }
                  `}
                  type="button"
                >
                  <div className="flex items-center gap-2">
                    <Icon className={`h-5 w-5 transition-all duration-300 ${activeSection === item.id ? 'text-primary' : 'group-hover:scale-110'}`} />
                    <span>{item.label}</span>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
