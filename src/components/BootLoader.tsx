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
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const css = getComputedStyle(document.documentElement);
    const primary = `hsl(${css.getPropertyValue("--primary").trim()})`;
    const accent = `hsl(${css.getPropertyValue("--accent").trim()})`;

    let w = 0, h = 0, dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      w = window.innerWidth; h = window.innerHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      canvas.style.width = w + "px"; canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const colCount = Math.max(6, Math.min(18, Math.floor(w / 90)));
    const colW = w / colCount;
    const stack = new Array(colCount).fill(0); // stacked height per column
    const settled: { x: number; y: number; text: string; hot: boolean }[] = [];

    type Block = { col: number; y: number; vy: number; text: string; hot: boolean };
    let blocks: Block[] = [];
    const blockH = 22;

    const spawn = () => {
      const col = Math.floor(Math.random() * colCount);
      blocks.push({
        col,
        y: -30 - Math.random() * 200,
        vy: 5 + Math.random() * 5,
        text: SNIPPETS[Math.floor(Math.random() * SNIPPETS.length)],
        hot: Math.random() > 0.75,
      });
    };

    let raf = 0;
    let last = performance.now();
    const start = last;
    const DURATION = reduced ? 900 : 2600;

    const draw = (now: number) => {
      const dt = Math.min(2.5, (now - last) / 16.67);
      last = now;
      const elapsed = now - start;
      setProgress(Math.min(100, Math.round((elapsed / (DURATION + 900)) * 100)));

      if (elapsed < DURATION) for (let i = 0; i < 2; i++) spawn();

      ctx.clearRect(0, 0, w, h);
      ctx.font = "600 13px 'Roboto Mono', 'Fira Mono', monospace";
      ctx.textBaseline = "middle";

      // settled skyline
      for (const s of settled) {
        ctx.fillStyle = s.hot ? "hsl(199 89% 48% / 0.18)" : "hsl(200 98% 39% / 0.14)";
        ctx.fillRect(s.x + 2, s.y - blockH / 2, colW - 4, blockH - 3);
        ctx.strokeStyle = s.hot ? accent : primary;
        ctx.globalAlpha = 0.55;
        ctx.strokeRect(s.x + 2, s.y - blockH / 2, colW - 4, blockH - 3);
        ctx.globalAlpha = 1;
        ctx.fillStyle = s.hot ? accent : primary;
        ctx.fillText(s.text, s.x + 8, s.y);
      }

      // falling blocks
      const next: Block[] = [];
      for (const b of blocks) {
        b.y += b.vy * dt;
        b.vy += 0.18 * dt;
        const ground = h - 110;
        const floor = ground - stack[b.col] * blockH - blockH / 2;
        if (b.y >= floor) {
          if (stack[b.col] * blockH < h * 0.46) {
            settled.push({ x: b.col * colW, y: floor, text: b.text, hot: b.hot });
            stack[b.col] += 1;
          }
          continue;
        }
        next.push(b);
        const x = b.col * colW;
        ctx.fillStyle = b.hot ? accent : primary;
        ctx.globalAlpha = 0.9;
        ctx.fillText(b.text, x + 8, b.y);
        ctx.globalAlpha = 0.25;
        ctx.fillRect(x + 6, b.y - 14, 1.5, 12);
        ctx.globalAlpha = 1;
      }
      blocks = next;

      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    const t1 = window.setTimeout(() => setPhase("world"), DURATION);
    const t2 = window.setTimeout(() => {
      setPhase("gone");
      onDone?.();
    }, DURATION + 1200);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
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
      <canvas ref={canvasRef} className="absolute inset-0" />

      {/* robots wake up in the finished world */}
      <div
        className={`absolute bottom-0 left-0 right-0 flex items-end justify-center gap-6 sm:gap-14 pb-10 transition-all duration-700 ${
          phase === "world" ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        {[0, 1, 2].map((i) => (
          <Robot key={i} delay={i * 0.18} scale={i === 1 ? 1 : 0.75} />
        ))}
      </div>

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
