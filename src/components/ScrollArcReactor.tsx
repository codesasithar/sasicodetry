import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";

/**
 * ScrollArcReactor
 *
 * A centered, fixed-position arc reactor that reacts to page scroll:
 * - Glow intensity increases with scroll progress
 * - Ring rotation speeds up with scroll velocity
 * - Core pulse quickens and scales up as you scroll
 * - Overall opacity and scale grow with scroll depth
 * - Salvaged parts fly together before the core powers on
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

  const scrapParts = [
    { className: "scrap-1", angle: "-18deg", distance: "290px", tilt: "-22deg", delay: "0.15s" },
    { className: "scrap-2", angle: "42deg", distance: "260px", tilt: "18deg", delay: "0.45s" },
    { className: "scrap-3", angle: "94deg", distance: "285px", tilt: "-12deg", delay: "0.75s" },
    { className: "scrap-4", angle: "148deg", distance: "270px", tilt: "25deg", delay: "1.05s" },
    { className: "scrap-5", angle: "202deg", distance: "300px", tilt: "-18deg", delay: "1.35s" },
    { className: "scrap-6", angle: "252deg", distance: "268px", tilt: "16deg", delay: "1.65s" },
    { className: "scrap-7", angle: "306deg", distance: "286px", tilt: "-28deg", delay: "1.95s" },
  ];

  return (
    <div
      ref={reactorRef}
      className="scroll-arc-stage fixed inset-0 z-0 pointer-events-none flex items-center justify-center"
      style={{
        opacity: "calc(0.26 + var(--scroll-progress, 0) * 0.42)",
        transform: "scale(calc(0.82 + var(--scroll-progress, 0) * 0.18))",
        filter: "drop-shadow(0 0 calc(24px + var(--scroll-progress, 0) * 52px) hsl(200 100% 55% / 0.55))",
      }}
      aria-hidden="true"
    >
      <div className="scroll-arc-reactor">
        <div className="scroll-arc-assembly-glow" />
        <div className="scroll-arc-scraps">
          {scrapParts.map((part) => (
            <span
              key={part.className}
              className={`scroll-arc-scrap ${part.className}`}
              style={
                {
                  "--scrap-angle": part.angle,
                  "--scrap-distance": part.distance,
                  "--scrap-tilt": part.tilt,
                  "--scrap-delay": part.delay,
                } as CSSProperties
              }
            />
          ))}
        </div>
        <div className="scroll-arc-chassis" />
        <div className="scroll-arc-brace scroll-arc-brace-a" />
        <div className="scroll-arc-brace scroll-arc-brace-b" />
        <div className="scroll-arc-bolts">
          <span />
          <span />
          <span />
          <span />
        </div>
        <div className="scroll-arc-welding">
          {Array.from({ length: 6 }).map((_, i) => <span key={i} />)}
        </div>
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
