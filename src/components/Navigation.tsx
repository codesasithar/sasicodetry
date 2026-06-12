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
    <nav className="fixed top-0 left-0 right-0 z-[9999] w-full bg-background border-b border-border/40 block">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between relative z-[10000]">
        
        {/* Minimal Brand Logo */}
        <div 
          className="flex items-center gap-2 cursor-pointer text-foreground hover:text-primary transition-colors group" 
          onClick={() => scrollToSection('home')}
        >
          <Code2 className="h-5 w-5 text-primary" />
          <span className="font-semibold tracking-tight text-md">SasiCodes</span>
        </div>

        {/* Desktop Navigation */}
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

        {/* Mobile Menu Action Block */}
        <div className="lg:hidden flex items-center gap-4 relative z-[10001]">
          <ThemeSwitcher />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-foreground hover:text-primary transition-colors focus:outline-none"
            aria-label="Toggle Menu"
            type="button"
          >
            {isOpen ? <X className="h-6 w-6 block" /> : <Menu className="h-6 w-6 block" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay Elements */}
      {isOpen && (
        <>
          {/* Background Backdrop Layer */}
          <div
            className="lg:hidden fixed inset-0 top-16 left-0 right-0 bottom-0 z-[999] w-screen h-screen bg-black/60 backdrop-blur-sm block"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Standard CSS Responsive Fallback Container */}
          <div className="lg:hidden fixed inset-x-0 top-16 left-0 right-0 z-[1000] w-full bg-background border-b border-border shadow-2xl block opacity-100 visible max-h-[calc(100vh-4rem)] overflow-y-auto">
            <div className="px-6 py-4 space-y-1 bg-background relative z-[1001]">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`w-full text-left px-4 py-3 text-sm rounded-xl font-medium flex items-center justify-between transition-colors ${
                    activeSection === item.id 
                      ? "text-primary bg-primary/10 font-bold" 
                      : "text-muted-foreground hover:bg-muted/40"
                  }`}
                  type="button"
                >
                  <span>{item.label}</span>
                  {activeSection === item.id && (
                    <span className="h-2 w-2 rounded-full bg-primary" />
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
