import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      title="Back to top"
      className={`
        fixed bottom-5 left-4 sm:bottom-6 sm:left-6 z-[9999]
        h-12 w-12 sm:h-14 sm:w-14 rounded-full
        flex items-center justify-center
        border-2 border-primary/80 bg-background/90 backdrop-blur text-primary
        shadow-[0_0_26px_hsl(var(--primary)/0.5)]
        transition-all duration-300 ease-in-out
        hover:scale-110 hover:-translate-y-1 hover:bg-primary hover:text-primary-foreground
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16 pointer-events-none"}
      `}
      aria-label="Scroll to top"
      type="button"
    >
      <ArrowUp className="h-6 w-6 sm:h-7 sm:w-7" strokeWidth={2.5} />
    </button>
  );
};

export default ScrollToTop;
