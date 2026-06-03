import React, { useEffect, useState } from "react";

interface SparkTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}

const SparkText: React.FC<SparkTextProps> = ({ text, className, style }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (text === "Application Developer") return;

    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile, { passive: true });
    return () => window.removeEventListener("resize", checkMobile);
  }, [text]);

  if (text === "Application Developer") {
    return <span className={className} style={style}>{text}</span>;
  }

  const chars = Array.from(text);
  const lastIdx = chars.length - 1;

  // Realism constraints: Tight limits keep performance high while remaining chaotic
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
        
        /* Filament activation - mimics real plasma ionization */
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

        /* 1. Hot Plasma Core Glow */
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

        /* 2. Realistic Jagged Lightning SVGs */
        .realistic-bolt {
          position: absolute;
          width: calc(var(--rad) * 2px);
          height: calc(var(--rad) * 2px);
          transform: translate(-50%, -50%);
          fill: none;
          stroke: #ffffff; /* Brilliant white core */
          stroke-width: 1.2px;
          stroke-linecap: round;
          stroke-linejoin: round;
          /* Dual-layer drop shadow replicates real high-intensity exposure glow */
          filter: drop-shadow(0 0 2px #00f0ff) drop-shadow(0 0 5px #3b82f6);
          opacity: 0;
          animation: bolt-crackle var(--duration, 0.28s) steps(4, end) forwards;
          will-change: opacity, filter;
        }

        /* Real arcs flicker instantly instead of expanding smoothly */
        @keyframes bolt-crackle {
          0% { opacity: 0; stroke-dasharray: 300; stroke-dashoffset: 300; }
          10% { opacity: 1; stroke-dashoffset: 120; }
          25% { opacity: 0.4; filter: brightness(1.5) drop-shadow(0 0 4px #00f0ff); }
          40% { opacity: 1; stroke-dashoffset: 0; }
          65% { opacity: 0.7; }
          100% { opacity: 0; }
        }
      `}</style>

      {chars.map((ch, i) => {
        const isActive = i === lastIdx;
        return (
          <span
            key={i}
            className={`spark-letter${isActive ? " spark-letter-active" : ""}`}
            style={{ "--exp-scale": isMobile ? "1.12" : "1.28" } as React.CSSProperties}
          >
            {ch === " " ? "\u00A0" : ch}
            
            {isActive && ch !== " " && (
              <span 
                className="spark-explosion" 
                aria-hidden="true"
                style={{ 
                  "--rad": lightningRadius.toString(),
                  "--duration": isMobile ? "0.22s" : "0.28s"
                } as React.CSSProperties}
              >
                <span className="spark-flash" />
                
                {/* Procedural Generation of Realistic Lightning Paths */}
                {Array.from({ length: strikeCount }).map((_, k) => {
                  // 1. Establish an organic, non-uniform angle distribution
                  const baseAngle = (k * 360) / strikeCount;
                  const randomAngle = baseAngle + (Math.random() * 40 - 20);
                  const rads = (randomAngle * Math.PI) / 180;

                  // 2. Build out realistic variations in length for each filament path
                  const maxReach = lightningRadius * (0.5 + Math.random() * 0.6);
                  
                  // 3. Create a multi-segment jagged path array manually
                  const segments = 4;
                  let currentX = 0;
                  let currentY = 0;
                  let pathSegments = ["M 0 0"];

                  for (let s = 1; s <= segments; s++) {
                    const progress = s / segments;
                    // Target trajectory line
                    const targetX = Math.cos(rads) * maxReach * progress;
                    const targetY = Math.sin(rads) * maxReach * progress
