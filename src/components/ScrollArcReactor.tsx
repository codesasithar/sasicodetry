import { useEffect, useRef } from "react";

/**
 * ScrollArcReactor
 *
 * A fixed-position arc reactor that reacts to page scroll:
 * - Glow intensity increases with scroll progress
 * - Ring rotation speeds up with scroll velocity
 * - Core pulse quickens and scales up as you scroll
 * - Overall opacity and scale grow with scroll depth
 *
 * Hidden on mobile/tablet to keep the layout clean.
 */
const ScrollArcReactor = () => {
  const reactorRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const lastScrollRef = useRef(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const handleScroll = () => {
      if (rafRef.current !== null) return;

      rafRef.current = requestAnimationFrame(() => {
        const scrollTop = window.scrollY;
        const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = Math.min(
          Math.max(scrollableHeight > 0 ? scrollTop / scrollableHeight : 0, 0),
          1
        );
        const velocity = Math.min(Math.abs(scrollTop - lastScrollRef.current) / 25, 1);
        lastScrollRef.current = scrollTop;

        if (reactorRef.current) {
          reactorRef.current.style.setProperty("--scroll-progress", progress.toFixed(3));
          reactorRef.current.style.setProperty("--scroll-velocity", velocity.toFixed(3));
        }

        rafRef.current = null;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      ref={reactorRef}
      className="fixed left-4 xl:left-8 top-1/2 -translate-y-1/2 z-0 pointer-events-none hidden lg:block"
      style={{
        opacity: "calc(0.22 + var(--scroll-progress, 0) * 0.58)",
        transform: "translateY(-50%) scale(calc(0.78 + var(--scroll-progress, 0) * 0.32))",
        filter: "drop-shadow(0 0 calc(20px + var(--scroll-progress, 0) * 40px) hsl(200 100% 55% / 0.5))",
      }}
      aria-hidden="true"
    >
      <div className="scroll-arc-reactor">
        <div className="scroll-arc-core" />
        <div className="scroll-arc-ring scroll-arc-ring-1" />
        <div className="scroll-arc-ring scroll-arc-ring-2" />
        <div className="scroll-arc-ring scroll-arc-ring-3" />
        <div className="scroll-arc-particles">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="scroll-arc-particle"
              style={{ animationDelay: `${-i * 0.5}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScrollArcReactor;
