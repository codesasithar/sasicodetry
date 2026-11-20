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
      className="nav-theme-toggle group relative grid h-9 w-9 place-items-center rounded-xl border border-border/60 bg-card/55 text-muted-foreground transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      aria-label="Toggle theme"
      title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      type="button"
    >
      <span className={`nav-theme-glyph relative z-[1] ${isAnimating ? "is-animating" : ""}`}>
        {theme === "dark" ? (
          <Sun className="h-4 w-4" aria-hidden="true" />
        ) : (
          <Moon className="h-4 w-4" aria-hidden="true" />
        )}
      </span>
    </button>
  );
};

export default ThemeSwitcher;
