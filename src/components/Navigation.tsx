import { useState, useEffect, useRef } from "react";
import { Menu, X, Code2 } from "lucide-react";
import ThemeSwitcher from "@/components/ThemeSwitcher";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const isScrollingRef = useRef(false);

  const navItems = [
    { id: "about", label: "About" },
    { id: "projects", label: "Projects" },
    { id: "services", label: "Services" },
    { id: "writings", label: "Writings" },
    { id: "bookshelf", label: "Library" },
    { id: "news", label: "News" },
    { id: "achievements", label: "Awards" },
    { id: "movies", label: "Movies" },
    { id: "games", label: "Games" },
    { id: "role-models", label: "Inspiration" },
    { id: "contact", label: "Contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (isScrollingRef.current) return;

      const scrollPosition = window.scrollY + 120;
      
      if (window.scrollY < 100) {
        setActiveSection("home");
        return;
      }

      for (let i = navItems.length - 1; i >= 0; i--) {
        const el = document.getElementById(navItems[i].id);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id);
          return;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    setIsOpen(false);
    const element = document.getElementById(sectionId);
    if (!element) return;

    setActiveSection(sectionId);
    isScrollingRef.current = true;

    element.scrollIntoView({ behavior: "smooth" });

    setTimeout(() => {
      isScrollingRef.current = false;
    }, 800);
  };

  // Prevent background document scrolling when mobile navigation panel overlay drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    // Explicit high z-index tier layout block
    <nav className="fixed top-0 left-0 right-0 z-[100] w-full bg-background/90 backdrop-blur-md border-b border-border/40 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between relative z-[110]">
        
        {/* Minimal Brand Logo */}
        <div 
          className="flex items-center gap-2 cursor-pointer text-foreground hover:text-primary transition-colors group" 
          onClick={() => scrollToSection('home')}
        >
          <Code2 className="h-5 w-5 text-primary transition-transform group-hover:scale-105" />
          <span className="font-semibold tracking-tight text-md">SasiCodes</span>
        </div>

        {/* Clean Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-200 ${
                activeSection === item.id 
                  ? "text-primary bg-primary/5 font-semibold" 
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              }`}
              type="button"
            >
              {item.label}
            </button>
          ))}

          <div className="ml-2 pl-2 border-l border-border/60">
            <ThemeSwitcher />
          </div>
        </div>

        {/* Mobile / Tablet Menu Button */}
        <div className="lg:hidden flex items-center gap-4">
          <ThemeSwitcher />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-muted-foreground hover:text-foreground transition-colors focus:outline-none relative z-[120]"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            type="button"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Modern, Simple Mobile Dropdown Overlays */}
      {isOpen && (
        <>
          {/* Backdrop Blur Layer - Absolute Viewport Coverage */}
          <div
            className="lg:hidden fixed inset-0 top-16 left-0 right-0 bottom-0 z-[90] w-screen h-screen bg-background/60 backdrop-blur-md"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          
          {/* Mobile Panel Drawer Dropdown */}
          <div className="lg:hidden fixed inset-x-0 top-16 left-0 right-0 z-[100] w-full bg-background border-b border-border shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200 max-h-[calc(100vh-4rem)] overflow-y-auto">
            <div className="px-6 py-4 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`w-full text-left px-4 py-3 text-sm rounded-xl transition-colors font-medium flex items-center justify-between ${
                    activeSection === item.id 
                      ? "text-primary bg-primary/10 font-bold" 
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                  type="button"
                >
                  <span>{item.label}</span>
                  {activeSection === item.id && (
                    <span className="h-2 w-2 rounded-full bg-primary shadow-sm shadow-primary/50" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </nav>
  );
};

export default Navigation;
