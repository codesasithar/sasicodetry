import React, { useEffect, useState } from "react";

interface SparkTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  variant?: "standard" | "minimal" | "text-only";
}

const SparkText: React.FC<SparkTextProps> = ({ 
  text, 
  className, 
  style, 
  variant = "standard" 
}) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (variant !== "standard") return;

    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile, { passive: true });
    return () => window.removeEventListener("resize", checkMobile);
  }, [variant]);

  // --- 1. TEXT ONLY VARIANT ---
  if (variant === "text-only") {
    return (
      <span className={className} style={style}>
        {text}
      </span>
    );
  }

  // --- 2. MINIMALISTIC DESIGN VARIANT ---
  if (variant === "minimal") {
    return (
      <>
        <style>{`
          .minimal-tech-glow {
            display: inline-block;
            position: relative;
            animation: minimal-pulse-glow 3.5s ease-in-out infinite alternate;
            will-change: text-shadow;
          }

          @keyframes minimal-pulse-glow {
            0% {
              text-shadow: 0 0 8px rgba(0, 240, 255, 0.25);
            }
            100% {
              text-shadow: 0 0 15px rgba(0, 240, 255, 0.55), 0 0 25px rgba(59, 130, 246, 0.25);
            }
          }
        `}</style>
        <span className={`${className || ""} minimal-tech-glow`} style={style}>
          {text}
        </span>
      </>
    );
  }

  // --- 3. STANDARD REALISTIC LIGHTNING EFFECT VARIANT ---
  const chars = Array.from(text);
  const lastIdx = chars.length - 1;

  const strikeCount = isMobile ? 5 : 9; 
  const lightningRadius = isMobile ? 35 : 70; 

  return (
    <span className={className} style={{ ...style, position: "relative" }}>
      <style>{`
        .spark-letter {
          display: inline-block;
          position: relative;
          will-change: transform;
        }
        
        .spark-letter-active {
          animation: letter-lightning-shock 0.25s cubic-bezier(0.15, 0.85, 0.3, 1) forwards;
        }

        @keyframes letter-lightning-shock {
          0% { transform: scale(1); color: #fff; text-shadow: 0 0 8px #00f0ff, 0 0 15px #3b82f6; }
          12% { transform: scale(var(--exp-scale, 1.25)); color: #fff; text-shadow: 0 0 25px #00f0ff, 0 0 50px #fff; }
          30% { color: #00f0ff; }
          100% { transform: scale(1); }
        }

        .spark-explosion {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none;
          z-index: 20;
          will-change: transform;
        }

        .spark-flash {
          position: absolute;
          width: 40px;
          height: 40px;
          background: radial-gradient(circle, #ffffff 15%, rgba(0, 240, 255, 0.8) 45%, rgba(59, 130, 246, 0.2) 70%, transparent 90%);
          transform: translate(-50%, -50%) scale(0);
          animation: core-discharge var(--duration, 0.28s) cubic-bezier(0.1, 0.8, 0.2, 1) forwards;
          will-change: transform, opacity;
        }

        @keyframes core-discharge {
          0% { transform: translate(-50%, -50%) scale(0.2); opacity: 1; filter: brightness(2); }
          15% { opacity: 0.9; }
          45% { filter: brightness(1); }
          100% { transform: translate(-50%, -50%) scale(2.4); opacity: 0; }
        }

        .realistic-bolt {
          position: absolute;
          width: calc(var(--rad) * 2px);
          height: calc(var(--rad) * 2px);
          transform: translate(-50%, -50%);
          fill: none;
          stroke: #ffffff;
          stroke-width: 1.2px;
          stroke-linecap: round;
          stroke-linejoin: round;
          filter: drop-shadow(0 0 2px #00f0ff) drop-shadow(0 0 5px #3b82f6);
          opacity: 0;
          animation: bolt-crackle var(--duration, 0.28s) steps(4, end) forwards;
          will-change: opacity, filter;
        }

        @keyframes bolt-crackle {
          0% { opacity: 0; stroke-dasharray: 300; stroke-dashoffset: 300; }
          10% { opacity: 1; stroke-dashoffset: 120; }
          25% { opacity: 0.4; filter: brightness(1.5) drop-shadow(0 0 4px #00f0ff); }
          40% { opacity: 1; stroke-dashoffset: 0; }
          65% { opacity: 0.7; }
          100% { opacity: 0; }
        }
      `}</style>
