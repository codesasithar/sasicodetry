import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

const ThemeSwitcher = () => {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Check for saved theme preference or default to dark
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    const preferredTheme = savedTheme || "dark";
    setTheme(preferredTheme);
    document.documentElement.classList.toggle("light", preferredTheme === "light");
  }, []);

  const toggleTheme = () => {
    setIsAnimating(true);
    const newTheme = theme === "dark" ? "light" : "dark";
    
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("light", newTheme === "light");

    setTimeout(() => setIsAnimating(false), 500);
  };

  return (
    <button
      onClick={toggleTheme}
      className="relative group p-2.5 rounded-lg bg-card/50 border border-border/50 hover:border-primary/40 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
      aria-label="Toggle theme"
      type="button"
    >
      {/* Animated background glow */}
      <div className="absolute inset-0 bg-primary/10 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Icon container with smooth rotation */}
      <div className={`relative transition-all duration-500 ${isAnimating ? 'rotate-180 scale-90' : 'rotate-0 scale-100'}`}>
        {theme === "dark" ? (
          <Sun className="h-5 w-5 text-primary transition-all duration-300 group-hover:text-accent group-hover:scale-110 drop-shadow-[0_0_8px_hsl(var(--primary)/0.5)]" />
        ) : (
          <Moon className="h-5 w-5 text-primary transition-all duration-300 group-hover:text-accent group-hover:scale-110 drop-shadow-[0_0_8px_hsl(var(--primary)/0.5)]" />
        )}
      </div>

      {/* Ripple effect on click */}
      {isAnimating && (
        <div className="absolute inset-0 rounded-lg border-2 border-primary/50 animate-ping" />
      )}
    </button>
  );
};

export default ThemeSwitcher;
