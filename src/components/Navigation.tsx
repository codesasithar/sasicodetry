import { useState, useEffect } from "react";
import { 
  Menu, 
  X, 
  User, 
  Briefcase, 
  Cpu, 
  PenTool, 
  BookOpen, 
  Newspaper, 
  Trophy, 
  Film, 
  Gamepad2, 
  Flame, 
  Mail 
} from "lucide-react";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import profilePicture from "@/assets/profile-hero-cartoon.png";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // Nav items array mapped with clean, semantic modern icons
  const navItems = [
    { id: "about", label: "About", icon: User },
    { id: "projects", label: "Projects", icon: Briefcase },
    { id: "services", label: "Services", icon: Cpu },
    { id: "writings", label: "Writings", icon: PenTool },
    { id: "bookshelf", label: "Library", icon: BookOpen },
    { id: "news", label: "News", icon: Newspaper },
    { id: "achievements", label: "Awards", icon: Trophy },
    { id: "movies", label: "Movies", icon: Film },
    { id: "games", label: "Games", icon: Gamepad2 },
    { id: "role-models", label: "Inspiration", icon: Flame },
    { id: "contact", label: "Contact", icon: Mail },
  ];

  // Global body scroll lock when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const scrollToSection = (sectionId: string) => {
    setIsOpen(false);
    const element = document.getElementById(sectionId);
    if (!element) return;
    setActiveSection(sectionId);
    element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 w-full h-16 sm:h-20 bg-background border-b border-border z-[99999] block clear-both">
      <div className="w-full max-w-7xl mx-auto h-full px-4 flex items-center justify-between relative z-[100000]">
        
        {/* Brand Header - Profile + Welcome */}
        <div
          className="flex items-center gap-3 sm:gap-4 cursor-pointer group"
          onClick={() => scrollToSection('home')}
        >
          {/* Re-styled Avatar Container */}
          <div className="relative h-12 w-12 sm:h-14 sm:w-14 rounded-full p-1 bg-background border-2 border-border shadow-lg transition-all duration-300 group-hover:border-primary group-hover:shadow-xl">
            <img
              src={profilePicture}
              alt="Sasithar M"
              className="w-full h-full object-cover object-center rounded-full bg-background"
              decoding="async"
            />
          </div>
          <div className="flex flex-col items-start leading-none">
            <span className="text-[10px] sm:text-xs font-semibold tracking-wider uppercase text-primary/90">Welcome to my portfolio</span>
            <span className="text-xs sm:text-sm font-bold text-foreground hidden sm:inline-block">SasiCodes</span>
          </div>
        </div>


        {/* Desktop Links Panel */}
        <div className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors flex items-center gap-1.5 ${
                  activeSection === item.id ? "text-primary bg-primary/10 font-semibold" : "text-muted-foreground hover:text-foreground"
                }`}
                type="button"
              >
                <IconComponent className="h-3.5 w-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
          <div className="ml-2 pl-2 border-l border-border">
            <ThemeSwitcher />
          </div>
        </div>

        {/* Mobile Shell Controls */}
        <div className="flex lg:hidden items-center gap-3 relative z-[100001]">
          <ThemeSwitcher />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 border border-border rounded-md text-foreground bg-muted/20 hover:bg-muted/50 active:scale-95 transition-all"
            aria-label="Toggle Navigation Grid"
            type="button"
          >
            {isOpen ? <X className="h-5 w-5 stroke-[2.5]" /> : <Menu className="h-5 w-5 stroke-[2.5]" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Structural Block */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 top-16 sm:top-20 left-0 w-screen h-[calc(100vh-4rem)] sm:h-[calc(100vh-5rem)] z-[99998] overflow-hidden block">
          {/* Opaque Background Layer */}
          <div 
            className="absolute inset-0 bg-background/95 w-full h-full" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Scrollable Navigation Grid Link Block */}
          <div className="absolute top-0 left-0 right-0 w-full bg-background border-b border-border shadow-2xl overflow-y-auto max-h-full pb-8 relative z-[99999]">
            <div className="px-4 py-4 space-y-1">
              {navItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`w-full text-left px-4 py-3.5 text-sm font-semibold rounded-xl transition-all border flex items-center justify-between ${
                      activeSection === item.id 
                        ? "text-primary bg-primary/10 border-primary/20" 
                        : "text-muted-foreground bg-transparent border-transparent"
                    }`}
                    type="button"
                  >
                    <div className="flex items-center gap-3">
                      <IconComponent className={`h-4 w-4 ${activeSection === item.id ? "text-primary" : "text-muted-foreground"}`} />
                      <span>{item.label}</span>
                    </div>
                    {activeSection === item.id && (
                      <span className="h-2 w-2 rounded-full bg-primary" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
