import { useEffect, useState } from "react";

const BootLoader = ({ onDone }: { onDone?: () => void }) => {
  const [phase, setPhase] = useState<"loading" | "fading" | "gone">("loading");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    const duration = reducedMotion ? 250 : isMobile ? 450 : 900;
    const fadeDuration = reducedMotion ? 80 : isMobile ? 160 : 300;
    const start = performance.now();
    let frame = 0;
    let lastProgress = -1;

    const updateProgress = (now: number) => {
      const nextProgress = Math.min(100, Math.floor(((now - start) / duration) * 10) * 10);
      if (nextProgress !== lastProgress) {
        lastProgress = nextProgress;
        setProgress(nextProgress);
      }
      if (nextProgress < 100) frame = window.requestAnimationFrame(updateProgress);
    };

    frame = window.requestAnimationFrame(updateProgress);
    const fadeTimer = window.setTimeout(() => setPhase("fading"), duration);
    const doneTimer = window.setTimeout(() => {
      setPhase("gone");
      onDone?.();
    }, duration + fadeDuration);

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(fadeTimer);
      window.clearTimeout(doneTimer);
    };
  }, [onDone]);

  if (phase === "gone") return null;

  const progressLabel = progress < 36
    ? "INITIALIZING QUBITS"
    : progress < 78
      ? "CALIBRATING COHERENCE"
      : "ESTABLISHING ENTANGLEMENT";

  return (
    <div
      className={`quantum-boot-screen fixed inset-0 z-[10050] overflow-hidden ${phase === "fading" ? "quantum-boot-exit" : ""}`}
      role="status"
      aria-label="Loading quantum computing experience"
    >
      <div className="quantum-boot-grid" aria-hidden="true" />
      <div className="quantum-boot-glow quantum-boot-glow-one" aria-hidden="true" />
      <div className="quantum-boot-glow quantum-boot-glow-two" aria-hidden="true" />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-6 py-12">
        <div className="w-full max-w-xl text-center">
          <div className="quantum-orbit-stage mb-8 sm:mb-10" aria-hidden="true">
            <div className="quantum-probability-cloud" />
            <div className="quantum-orbit quantum-orbit-one">
              <span className="quantum-electron" />
            </div>
            <div className="quantum-orbit quantum-orbit-two">
              <span className="quantum-electron quantum-electron-accent" />
            </div>
            <div className="quantum-orbit quantum-orbit-three">
              <span className="quantum-electron quantum-electron-soft" />
            </div>
            <div className="quantum-nucleus">
              <span>ψ</span>
              <small>QUBIT</small>
            </div>
            <span className="quantum-node quantum-node-one" />
            <span className="quantum-node quantum-node-two" />
            <span className="quantum-node quantum-node-three" />
            <span className="quantum-node quantum-node-four" />
          </div>

          <p className="font-mono text-[0.62rem] font-semibold tracking-[0.28em] text-primary sm:text-xs">
            QUANTUM COMPUTING <span className="px-1 text-accent">/</span> SYSTEM BOOT
          </p>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Computing in<br />
            <span className="text-primary">superposition.</span>
          </h1>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
            Preparing qubits, calibrating coherence, and linking entangled states.
          </p>

          <div
            className="mx-auto mt-9 w-full max-w-sm"
            role="progressbar"
            aria-label="Quantum system initialization"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={progress}
          >
            <div className="quantum-progress-track">
              <div className="quantum-progress-fill" style={{ width: `${progress}%` }} />
            </div>
            <div className="mt-3 flex items-center justify-between font-mono text-[0.6rem] tracking-[0.14em] text-muted-foreground sm:text-[0.65rem]">
              <span>{progressLabel}</span>
              <span className="tabular-nums text-foreground">{String(progress).padStart(2, "0")}%</span>
            </div>
          </div>

          <p className="mt-8 font-mono text-[0.55rem] tracking-[0.2em] text-muted-foreground/65">
            0 · 1 · ψ <span className="mx-2 text-primary/60">—</span> YOUR EXPERIENCE IS ABOUT TO COLLAPSE INTO VIEW
          </p>
        </div>
      </div>
    </div>
  );
};

export default BootLoader;
