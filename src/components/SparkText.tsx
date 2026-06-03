import React, { useEffect, useState } from "react";

interface SparkTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}

const SparkText: React.FC<SparkTextProps> = ({ text, className, style }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile, { passive: true });
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const isMinimalWord = text.trim().toLowerCase() === "application developer";

  // --- 1. MINIMALISTIC DESIGN FOR TARGET WORDS ---
  if (isMinimalWord) {
    return (
      <>
        <style>{`
          .minimal-dev-text {
            display: inline-block;
            font-weight: 600;
            letter-spacing: 0.05em;
            color: #ffffff;
            position: relative;
            animation: minimal-glow 4s ease-in-out infinite alternate;
          }

          @keyframes minimal-glow {
            0% { text-shadow: 0 0 4px rgba(0, 240, 255, 0.2); }
            100% {
              text-shadow: 0 0 12px rgba(0, 240, 255, 0.6), 0 0 20px rgba(59, 130, 246, 0.3);
              color: #f8fafc;
            }
          }
        `}</style>
        <span className={`${className || ""} minimal-dev-text`} style={style}>
          {text}
        </span>
      </>
    );
  }

  // --- 2. DYNAMIC PLASMA LIGHTNING EFFECT FOR POPPING LETTERS ---
  const chars = Array.from(text);
  const lastIdx = chars.length - 1;

  const strikeCount = isMobile ? 6 : 12; 
  const lightningRadius = isMobile ? 40 : 85; 

  return (
    <span className={className} style={{ ...style, position: "relative" }}>
      <style>{`
        .spark-letter {
          display: inline-block;
          position: relative;
          will-change: transform;
        }
        
        .spark-letter-active {
          animation: letter-lightning-shock 0.22s cubic-bezier(0.15, 0.85, 0.3, 1) forwards;
        }

        @keyframes letter-lightning-shock {
          0% { transform: scale(1); color: #fff; text-shadow: 0 0 10px #00f0ff, 0 0 20px #3b82f6; }
          15% { transform: scale(var(--exp-scale, 1.25)); color: #fff; text-shadow: 0 0 30px #00f0ff, 0 0 60px #fff; }
          35% { color: #00f0ff; }
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
          width: 50px;
          height: 50px;
          background: radial-gradient(circle, #ffffff 20%, rgba(0, 240, 255, 0.85) 50%, rgba(59, 130, 246, 0.3) 75%, transparent 100%);
          transform: translate(-50%, -50%) scale(0);
          animation: core-discharge var(--duration, 0.3s) cubic-bezier(0.1, 0.8, 0.2, 1) forwards;
          will-change: transform, opacity;
        }

        @keyframes core-discharge {
          0% { transform: translate(-50%, -50%) scale(0.2); opacity: 1; filter: brightness(2); }
          20% { opacity: 0.95; }
          50% { filter: brightness(1.2); }
          100% { transform: translate(-50%, -50%) scale(2.6); opacity: 0; }
        }

        .realistic-bolt {
          position: absolute;
          width: calc(var(--rad) * 2px);
          height: calc(var(--rad) * 2px);
          transform: translate(-50%, -50%);
          fill: none;
          stroke: #ffffff;
          stroke-width: 1.5px;
          stroke-linecap: round;
          stroke-linejoin: round;
          filter: drop-shadow(0 0 3px #00f0ff) drop-shadow(0 0 8px #3b82f6) drop-shadow(0 0 15px rgba(0, 240, 255, 0.4));
          opacity: 0;
          animation: bolt-crackle var(--duration, 0.3s) steps(5, end) forwards;
          will-change: opacity, filter;
        }

        @keyframes bolt-crackle {
          0% { opacity: 0; stroke-dasharray: 400; stroke-dashoffset: 400; }
          8% { opacity: 1; stroke-dashoffset: 150; }
          22% { opacity: 0.5; filter: brightness(1.8) drop-shadow(0 0 5px #00f0ff); }
          3
