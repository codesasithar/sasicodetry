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
      // Skip active-state computation if user triggered a smooth scroll click
      if (isScrollingRef.current) return;

      const scrollPosition = window.scrollY + 120;
      
      // Handle edge case for top of the page
      if (window.scrollY < 100) {
        setActiveSection("home");
        return;
      }

      // Check sections from bottom up
      for (let i = navItems.length - 1; i >= 0; i--) {
        const el = document.getElementById(navItems[i].id);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id);
          return;
        }
      }
    };

    // Passive listener improves scrolling performance drastically
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

    // Re-enable scroll spy calculations after smooth scroll finishes
    setTimeout(() => {
      isScrollingRef.current = false;
    }, 800);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/70 backdrop-blur-md border-b border-border/40 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        
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
            className="p-1 text-muted-foreground hover:text-foreground transition-colors"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            type="button"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Modern, Simple Mobile Dropdown Overlays */}
      {isOpen && (
        <>
          {/* Backdrop to close on outside tap */}
          <div
            className="lg:hidden fixed inset-0 top-16 z-40 bg-background/40 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          <div className="lg:hidden fixed inset-x-0 top-16 z-50 bg-background border-b border-border shadow-xl animate-in fade-in slide-in-from-top-4 duration-200 max-h-[calc(100vh-4rem)] overflow-y-auto">
            <div className="px-4 py-4 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`w-full text-left px-4 py-3 text-sm rounded-xl transition-colors font-medium flex items-center justify-between ${
                  activeSection === item.id 
                    ? "text-primary bg-primary/5 font-semibold" 
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
                }`}
                type="button"
              >
                {item.label}
                {activeSection === item.id && (
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
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
