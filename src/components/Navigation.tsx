import { useState, useEffect } from "react";
import { Menu, X, Code2 } from "lucide-react";
import ThemeSwitcher from "@/components/ThemeSwitcher";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

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
    /* CRITICAL FIX: 
      - Set z-[99999] to ensure it stays on top of video wrappers, canvases, and grids.
      - Removed conditional backdrop blur filters on the bar itself in case a parent context overrides filters.
    */
    <nav className="fixed top-0 left-0 right-0 w-full h-16 bg-background border-b border-border z-[99999] block clear-both">
      <div className="w-full max-w-7xl mx-auto h-full px-4 flex items-center justify-between relative z-[100000]">
        
        {/* Brand Header Logo (Always Visible) */}
        <div 
          className="flex items-center gap-2 cursor-pointer text-foreground"
          onClick={() => scrollToSection('home')}
        >
          <Code2 className="h-5 w-5 text-primary" />
          <span className="font-semibold text-md text-foreground">SasiCodes</span>
        </div>

        {/* Desktop Links Panel */}
        <div className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${
                activeSection === item.id ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground"
              }`}
              type="button"
            >
              {item.label}
            </button>
          ))}
          <div className="ml-2 pl-2 border-l border-border">
            <ThemeSwitcher />
          </div>
        </div>

        {/* Mobile Shell Controls (Forces block/flex on screens below 1024px) */}
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
        <div className="lg:hidden fixed inset-0 top-16 left-0 w-screen h-[calc(100vh-4rem)] z-[99998] overflow-hidden block">
          {/* Opaque Background Layer to separate from text underneath */}
          <div 
            className="absolute inset-0 bg-background/95 w-full h-full" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Scrollable Navigation Grid Link Block */}
          <div className="absolute top-0 left-0 right-0 w-full bg-background border-b border-border shadow-2xl overflow-y-auto max-h-full pb-8 relative z-[99999]">
            <div className="px-4 py-4 space-y-1">
              {navItems.map((item) => (
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
                  <span>{item.label}</span>
                  {activeSection === item.id && (
                    <span className="h-2 w-2 rounded-full bg-primary" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
