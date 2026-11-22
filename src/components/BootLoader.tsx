import { useEffect, useState } from "react";

const BootLoader = ({ onDone }: { onDone?: () => void }) => {
  const [phase, setPhase] = useState<"loading" | "fading" | "gone">("loading");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    const duration = reducedMotion ? 680 : isMobile ? 950 : 1300;
    const fadeDuration = reducedMotion ? 70 : 480;
    const previousOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    const start = performance.now();
    let frame = 0;
    let lastPaint = 0;

    const updateProgress = (now: number) => {
      const ratio = Math.min(1, (now - start) / duration);
      if (now - lastPaint >= 32 || ratio === 1) {
        setProgress(Math.round(ratio * 100));
        lastPaint = now;
      }
      if (ratio < 1) frame = window.requestAnimationFrame(updateProgress);
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
      document.documentElement.style.overflow = previousOverflow;
    };
  }, [onDone]);

  if (phase === "gone") return null;

  const progressLabel = progress < 34
    ? "GATHERING THE DETAILS"
    : progress < 78
      ? "BRINGING IDEAS TO LIFE"
      : "MAKING ROOM FOR WONDER";

  return (
    <div
      className={`creative-loader fixed inset-0 z-[10050] overflow-hidden ${phase === "fading" ? "creative-loader-exit" : ""}`}
      role="status"
      aria-label="Preparing your portfolio experience"
    >
      <div className="creative-loader-grid" aria-hidden="true" />
      <div className="creative-loader-light creative-loader-light-one" aria-hidden="true" />
      <div className="creative-loader-light creative-loader-light-two" aria-hidden="true" />

      <div className="creative-loader-shell">
        <header className="creative-loader-header">
          <div className="creative-loader-brand">
            <span className="creative-loader-mark" aria-hidden="true"><i /><i /><i /></span>
            <span className="creative-loader-brand-copy">
              <strong>SASITHAR</strong>
              <span>CREATIVE PORTFOLIO</span>
            </span>
          </div>
          <span className="creative-loader-live"><i /> A LITTLE WORLD IN THE MAKING</span>
        </header>

        <main className="creative-loader-main">
          <section className="creative-loader-copy">
            <p className="creative-loader-kicker"><span>01</span> DESIGN · CODE · CURIOSITY</p>
            <h1>Ideas, taking<br /><em>shape.</em></h1>
            <p className="creative-loader-description">
              A portfolio of thoughtful design, curious experiments, and technology made human.
            </p>
          </section>

          <div className="creative-loader-art" aria-hidden="true">
            <div className="creative-loader-orbit creative-loader-orbit-one"><span /></div>
            <div className="creative-loader-orbit creative-loader-orbit-two"><span /></div>
            <div className="creative-loader-orbit creative-loader-orbit-three" />
            <div className="creative-loader-orb">
              <span className="creative-loader-orb-glint" />
              <span className="creative-loader-orb-ribbon" />
              <span className="creative-loader-orb-core" />
            </div>
            <span className="creative-loader-star creative-loader-star-one">✦</span>
            <span className="creative-loader-star creative-loader-star-two">✧</span>
            <span className="creative-loader-art-note">STAY CURIOUS <span>✳</span></span>
          </div>
        </main>

        <footer className="creative-loader-footer">
          <div className="creative-loader-progress-heading">
            <span>{progressLabel}</span>
            <span className="creative-loader-percent">{String(progress).padStart(2, "0")}<small>%</small></span>
          </div>
          <div
            className="creative-loader-progress"
            role="progressbar"
            aria-label="Portfolio loading progress"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={progress}
          >
            <span style={{ width: `${progress}%` }} />
          </div>
          <div className="creative-loader-footer-note">
            <span>MADE WITH INTENTION <i>·</i> OPENED WITH WONDER</span>
            <span>PORTFOLIO <b>—</b> 01 / 01</span>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default BootLoader;
