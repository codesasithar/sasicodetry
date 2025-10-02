import { useState, useEffect } from "react";
import { Menu, X, Code2 } from "lucide-react";
import AudioPlayerCompact from "@/components/AudioPlayerCompact"; // Adjust path correctly

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "projects", label: "Projects" },
    { id: "services", label: "Services" },
    { id: "writings", label: "Writings" },
    { id: "achievements", label: "Achievements" },
    { id: "bookshelf", label: "My Library" },
    { id: "movies", label: "Movies I Love" },
    { id: "role-models", label: "Role Models" },
    { id: "contact", label: "Contact" },
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
    <nav className="fixed top-10 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border transition-all duration-300">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 lg:h-18">
          {/* Logo */}
          <div className="flex items-center space-x-3 transition-all duration-300 hover:scale-105">
            <Code2 className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-primary transition-all duration-300" />
            <span className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground transition-all duration-300">SasiCodes</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navItems.map((item, index) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`
                  relative px-3 xl:px-4 py-2 text-sm xl:text-base font-medium rounded-lg
                  transition-all duration-300 ease-in-out transform hover:scale-105
                  ${activeSection === item.id 
                    ? "text-primary bg-primary/10 shadow-sm" 
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
                {item.label}
              </button>
            ))}

            {/* Compact AudioPlayer inside desktop nav */}
            <div className="ml-6 xl:ml-8 flex items-center border-l border-border pl-6 xl:pl-8">
              <div className="transform transition-all duration-300 hover:scale-105">
                <AudioPlayerCompact />
              </div>
            </div>
          </div>

          {/* Tablet Navigation (md-lg) */}
          <div className="hidden md:flex lg:hidden items-center space-x-1">
            {navItems.slice(0, 6).map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`
                  px-2 py-1.5 text-xs font-medium rounded-md
                  transition-all duration-300 ease-in-out
                  ${activeSection === item.id 
                    ? "text-primary bg-primary/10" 
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                  }
                `}
                type="button"
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="ml-2 p-2 text-foreground hover:text-primary transition-all duration-300 hover:scale-110"
              aria-label="More options"
              type="button"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div className="ml-3 border-l border-border pl-3">
              <AudioPlayerCompact />
            </div>
          </div>

          {/* Mobile Menu Button with AudioPlayer */}
          <div className="md:hidden flex items-center space-x-3 sm:space-x-4">
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

        {/* Mobile Navigation */}
        <div className={`
          md:hidden overflow-hidden transition-all duration-500 ease-in-out
          ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
        `}>
          <div className="py-4 border-t border-border bg-background/95 backdrop-blur-lg">
            <div className="flex flex-col space-y-1">
              {navItems.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`
                    text-left px-4 py-3 text-base font-medium rounded-lg mx-2
                    transition-all duration-300 ease-in-out transform
                    ${activeSection === item.id 
                      ? "text-primary bg-primary/10 translate-x-2 shadow-sm" 
                      : "text-muted-foreground hover:text-foreground hover:bg-accent/50 hover:translate-x-1"
                    }
                  `}
                  style={{ 
                    animationDelay: `${index * 75}ms`,
                    animation: isOpen ? 'slide-in-right 0.4s ease-out forwards' : undefined
                  }}
                  type="button"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tablet Dropdown for remaining items */}
        {isOpen && (
          <div className="hidden md:flex lg:hidden absolute top-full right-4 mt-2 bg-background/95 backdrop-blur-lg border border-border rounded-lg shadow-lg p-2 min-w-48 animate-fade-in">
            {navItems.slice(6).map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`
                  w-full text-left px-3 py-2 text-sm font-medium rounded-md
                  transition-all duration-300 ease-in-out
                  ${activeSection === item.id 
                    ? "text-primary bg-primary/10" 
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                  }
                `}
                type="button"
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
