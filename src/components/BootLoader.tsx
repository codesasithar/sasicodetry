import { useEffect, useRef, useState } from "react";

/**
 * Boot sequence: blocks of code drop from the sky, stack into a futuristic
 * skyline, then robots power up in the finished world.
 */
const SNIPPETS = [
  "const", "()=>{}", "async", "if(x)", "return", "npm i", "0x1F", "<div>", "}", "{",
  "await", "let n=1", "print()", "AI/ML", "for(;;)", "true", "null", "fn()", "#!/bin",
];

const BootLoader = ({ onDone }: { onDone?: () => void }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [phase, setPhase] = useState<"drop" | "world" | "gone">("drop");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Preload above-the-fold assets while the loader plays so the reveal is instant.
    const preloads: HTMLLinkElement[] = [];
    for (const href of ["/videos/skills-video-thumb.jpg"]) {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "image";
      link.href = href;
      document.head.appendChild(link);
      preloads.push(link);
    }

    const canvas = canvasRef.current;
    if (!canvas) return () => preloads.forEach((l) => l.remove());
    const ctx = canvas.getContext("2d", { alpha: true, desynchronized: true }) as
      | CanvasRenderingContext2D
      | null;
    if (!ctx) return () => preloads.forEach((l) => l.remove());

    const css = getComputedStyle(document.documentElement);
    const primary = `hsl(${css.getPropertyValue("--primary").trim()})`;
    const accent = `hsl(${css.getPropertyValue("--accent").trim()})`;

    const isMobile = window.innerWidth < 768;
    // Lower backing-store resolution on mobile: biggest single GPU/CPU win.
    const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.25 : 2);
    let w = 0, h = 0;

    // Settled blocks are painted once into an offscreen layer instead of being
    // re-stroked every frame, so per-frame cost stays flat.
    const layer = document.createElement("canvas");
    const lctx = layer.getContext("2d")!;

    const FONT = "600 13px 'Roboto Mono', 'Fira Mono', monospace";
    const resize = () => {
      w = window.innerWidth; h = window.innerHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      canvas.style.width = w + "px"; canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      layer.width = w * dpr; layer.height = h * dpr;
      lctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      lctx.font = FONT;
      lctx.textBaseline = "middle";
      ctx.font = FONT;
      ctx.textBaseline = "middle";
    };
    resize();

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const colCount = Math.max(5, Math.min(isMobile ? 9 : 18, Math.floor(w / (isMobile ? 78 : 90))));
    const colW = w / colCount;
    const stack = new Array(colCount).fill(0); // stacked height per column

    type Block = { col: number; y: number; vy: number; text: string; hot: boolean };
    let blocks: Block[] = [];
    const blockH = 22;
    const MAX_BLOCKS = isMobile ? 26 : 55;
    const SPAWN_PER_FRAME = reduced ? 1 : isMobile ? 1 : 2;

    const spawn = () => {
      if (blocks.length >= MAX_BLOCKS) return;
      const col = Math.floor(Math.random() * colCount);
      blocks.push({
        col,
        y: -30 - Math.random() * 200,
        vy: 5 + Math.random() * 5,
        text: SNIPPETS[Math.floor(Math.random() * SNIPPETS.length)],
        hot: Math.random() > 0.75,
      });
    };

    const paintSettled = (x: number, y: number, text: string, hot: boolean) => {
      lctx.fillStyle = hot ? "hsl(199 89% 48% / 0.18)" : "hsl(200 98% 39% / 0.14)";
      lctx.fillRect(x + 2, y - blockH / 2, colW - 4, blockH - 3);
      lctx.strokeStyle = hot ? accent : primary;
      lctx.globalAlpha = 0.55;
      lctx.strokeRect(x + 2, y - blockH / 2, colW - 4, blockH - 3);
      lctx.globalAlpha = 1;
      lctx.fillStyle = hot ? accent : primary;
      lctx.fillText(text, x + 8, y);
    };

    let raf = 0;
    let last = performance.now();
    const start = last;
    const DURATION = reduced ? 900 : 2600;
    let lastProgress = -1;

    const draw = (now: number) => {
      const dt = Math.min(2.5, (now - last) / 16.67);
      last = now;
      const elapsed = now - start;
      // Batch React updates: only commit when the bar visibly moves.
      const p = Math.min(100, Math.round((elapsed / (DURATION + 900)) * 100));
      if (p - lastProgress >= 4 || p === 100) { lastProgress = p; setProgress(p); }

      if (elapsed < DURATION) for (let i = 0; i < SPAWN_PER_FRAME; i++) spawn();

      ctx.clearRect(0, 0, w, h);
      // one blit for the whole settled skyline
      ctx.drawImage(layer, 0, 0, w, h);

      // falling blocks, batched by colour to minimise state changes
      const next: Block[] = [];
      const hotB: Block[] = [];
      const coldB: Block[] = [];
      for (const b of blocks) {
        b.y += b.vy * dt;
        b.vy += 0.18 * dt;
        const ground = h - 110;
        const floor = ground - stack[b.col] * blockH - blockH / 2;
        if (b.y >= floor) {
          if (stack[b.col] * blockH < h * 0.46) {
            paintSettled(b.col * colW, floor, b.text, b.hot);
            stack[b.col] += 1;
          }
          continue;
        }
        next.push(b);
        (b.hot ? hotB : coldB).push(b);
      }
      blocks = next;

      for (const group of [coldB, hotB]) {
        if (!group.length) continue;
        ctx.fillStyle = group === hotB ? accent : primary;
        ctx.globalAlpha = 0.9;
        for (const b of group) ctx.fillText(b.text, b.col * colW + 8, b.y);
        ctx.globalAlpha = 0.25;
        for (const b of group) ctx.fillRect(b.col * colW + 6, b.y - 14, 1.5, 12);
        ctx.globalAlpha = 1;
      }

      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    // Stop burning cycles when the tab/app is backgrounded.
    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf);
        raf = 0;
      } else if (!raf) {
        last = performance.now();
        raf = requestAnimationFrame(draw);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    const t1 = window.setTimeout(() => setPhase("world"), DURATION);
    const t2 = window.setTimeout(() => {
      setPhase("gone");
      onDone?.();
    }, DURATION + 1200);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("visibilitychange", onVisibility);
      preloads.forEach((l) => l.remove());
      clearTimeout(t1); clearTimeout(t2);
    };
  }, [onDone]);

  if (phase === "gone") return null;

  return (
    <div
      className={`fixed inset-0 z-[10050] bg-background overflow-hidden transition-opacity duration-500 ${
        phase === "world" ? "opacity-100" : "opacity-100"
      }`}
      style={{ animation: phase === "world" ? "boot-fade-out 1.2s ease-in forwards" : undefined }}
      aria-hidden="true"
    >
      {/* horizon glow */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-primary/20 via-accent/5 to-transparent" />
      <canvas ref={canvasRef} className="absolute inset-0" style={{ contain: "strict" }} />

      {/* robots wake up in the finished world */}
      {phase === "world" && (
        <div
        className={`absolute bottom-0 left-0 right-0 flex items-end justify-center gap-6 sm:gap-14 pb-10 transition-all duration-700 ${
          phase === "world" ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
        style={{ willChange: "opacity, transform" }}
        >
        {[0, 1, 2].map((i) => (
          <Robot key={i} delay={i * 0.18} scale={i === 1 ? 1 : 0.75} />
        ))}
        </div>
      )}

      {/* status */}
      <div className="absolute inset-x-0 top-[18%] text-center px-6">
        <p className="font-mono text-xs sm:text-sm tracking-[0.3em] text-accent uppercase">
          {phase === "world" ? "world online" : "compiling world"}
        </p>
        <div className="mx-auto mt-4 h-[3px] w-48 sm:w-64 rounded-full bg-primary/20 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary to-accent transition-[width] duration-150"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

const Robot = ({ delay, scale }: { delay: number; scale: number }) => (
  <svg
    viewBox="0 0 60 90"
    className="w-12 sm:w-16 text-primary animate-boot-robot"
    style={{ animationDelay: `${delay}s`, transform: `scale(${scale})`, height: "auto" }}
    role="presentation"
  >
    <g fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round">
      <line x1="30" y1="6" x2="30" y2="16" />
      <circle cx="30" cy="4" r="3" className="text-accent" stroke="currentColor" />
      <rect x="14" y="16" width="32" height="24" rx="6" />
      <rect x="10" y="42" width="40" height="30" rx="5" />
      <line x1="10" y1="54" x2="0" y2="62" />
      <line x1="50" y1="54" x2="60" y2="62" />
      <line x1="20" y1="72" x2="20" y2="88" />
      <line x1="40" y1="72" x2="40" y2="88" />
    </g>
    <g className="text-accent" fill="currentColor">
      <circle cx="23" cy="28" r="3.2" className="animate-boot-eye" />
      <circle cx="37" cy="28" r="3.2" className="animate-boot-eye" />
      <rect x="18" y="50" width="24" height="4" rx="2" opacity="0.7" />
    </g>
  </svg>
);

export default BootLoader;
