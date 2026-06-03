import React, { useEffect, useState, useMemo } from "react";

interface SparkTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}

const SparkText: React.FC<SparkTextProps> = ({ text, className, style }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

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
          @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');

          .minimal-dev-text {
            font-family: 'Montserrat', sans-serif;
            display: inline-block;
            font-weight: 500;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            color: #ffffff;
            position: relative;
            animation: minimal-glow 4s ease-in-out infinite alternate;
          }

          @keyframes minimal-glow {
            0% { text-shadow: 0 0 6px rgba(0, 240, 255, 0.2); }
            100% {
              text-shadow: 0 0 16px rgba(0, 240, 255, 0.7), 0 0 24px rgba(59, 130, 246, 0.4);
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

  const precalculatedLayout = useMemo(() => {
    const segments = 5;
    const driftFactor = isMobile ? 8 : 16;

    return Array.from({ length: Math.max(chars.length, 50) }).map(() => {
      const charTilt = (Math.random() * 1.6 - 0.8).toFixed(1); 
      const verticalNudge = (Math.random() * 0.8 - 0.4).toFixed(1);

      const bolts = Array.from({ length: strikeCount }).map((_, k) => {
        const baseAngle = (k * 360) / strikeCount;
        const randomAngle = baseAngle + (Math.random() * 30 - 15);
        const rads = (randomAngle * Math.PI) / 180;
        const maxReach = lightningRadius * (0.6 + Math.random() * 0.5);
        
        let currentX = 0;
        let currentY = 0;
        const pathSegments = ["M 0 0"];

        for (let s = 1; s <= segments; s++) {
          const progress = s / segments;
          const targetX = Math.cos(rads) * maxReach * progress;
          const targetY = Math.sin(rads) * maxReach * progress;

          const perpAngle = randomAngle + 90;
          const perpRads = (perpAngle * Math.PI) / 180;
          const displacement = (Math.random() * driftFactor - driftFactor / 2) * (1 - progress * 0.3);

          currentX = targetX + Math.cos(perpRads) * displacement;
          currentY = targetY + Math.sin(perpRads) * displacement;

          pathSegments.push(`L ${currentX.toFixed(1)} ${currentY.toFixed(1)}`);

          if (s === 2 && Math.random() > 0.35) {
            const forkAngle = randomAngle + (Math.random() * 50 - 25);
            const forkRads = (forkAngle * Math.PI) / 180;
            const forkX = currentX + Math.cos(forkRads) * (maxReach * 0.35);
            const forkY = currentY + Math.sin(forkRads) * (maxReach * 0.35);
            
            pathSegments.push(`M ${currentX.toFixed(1)} ${currentY.toFixed(1)} L ${forkX.toFixed(1)} ${forkY.toFixed(1)}`);
            pathSegments.push(`M ${currentX.toFixed(1)} ${currentY.toFixed(1)}`);
          }
        }

        return {
          path: pathSegments.join(" "),
          rotation: (Math.random() * 10 - 5).toFixed(1),
          delay: `${Math.random() * 0.03}s`
        };
      });

      return { bolts, charTilt, verticalNudge };
    });
  }, [strikeCount, lightningRadius, isMobile, chars.length]);

  return (
    <span className={className} style={{ ...style, position: "relative", display: "inline-block" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sacramento&display=swap');

        .spark-container-premium-hand {
          font-family: 'Sacramento', cursive;
          font-size: 2.4em; 
          font-weight: 400;
          color: #f8fafc;
          word-spacing: 0.3em;
          text-shadow: 0 0 1px rgba(255, 255, 255, 0.4), 0 1px 2px rgba(0, 0, 0, 0.15);
          -webkit-font-smoothing: antialiased;
          white-space: nowrap;
          overflow: visible; /* Guarantees layout containers don't mask text edges */
        }

        .spark-letter {
          display: inline-block; /* Changed back to block safely due to padding/margin mitigation */
          position: relative;
          will-change: transform;
          cursor: pointer;
          
          /* CRITICAL FIX: Side padding prevents cursive swashes from being clipped by the bounding box, 
             while matching negative margins pull the adjacent letters back into a true continuous flow */
          padding: 0 0.12em 0 0.08em;
          margin: 0 -0.14em 0 -0.06em;
          
          transition: color 0.25s ease;
        }
        
        .spark-letter-active {
          animation: letter-lightning-shock 0.25s cubic-bezier(0.15, 0.85, 0.3, 1) forwards;
          z-index: 20;
        }

        @keyframes letter-lightning-shock {
          0% { transform: scale(1) rotate(var(--tilt)); color: #fff; text-shadow: 0 0 10px #00f0ff, 0 0 20px #3b82f6; }
          15% { transform: scale(var(--exp-scale, 1.2)) rotate(var(--tilt)); color: #fff; text-shadow: 0 0 35px #00f0ff, 0 0 60px #fff; }
          45% { color: #22d3ee; }
          100% { transform: scale(1) rotate(var(--tilt)); color: #e2e8f0; }
        }

        .spark-explosion {
          position: absolute;
          top: 45%;
          left: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none;
          z-index: 50;
          width: 0;
          height: 0;
          display: block;
        }

        .spark-flash {
          position: absolute;
          width: 65px;
          height: 65px;
          background: radial-gradient(circle, #ffffff 25%, rgba(0, 240, 255, 0.8) 55%, rgba(59, 130, 246, 0.2) 80%, transparent 100%);
          transform: translate(-50%, -50%) scale(0);
          animation: core-discharge var(--duration, 0.3s) cubic-bezier(0.1, 0.8, 0.2, 1) forwards;
          will-change: transform, opacity;
        }

        @keyframes core-discharge {
          0% { transform: translate(-50%, -50%) scale(0.2); opacity: 1; filter: brightness(2); }
          20% { opacity: 0.95; }
          50% { filter: brightness(1.3); }
          100% { transform: translate(-50%, -50%) scale(2.8); opacity: 0; }
        }

        .realistic-bolt {
          position: absolute;
          width: calc(var(--rad) * 2px);
          height: calc(var(--rad) * 2px);
          transform: translate(-50%, -50%);
          overflow: visible !important;
          fill: none;
          stroke: #ffffff;
          stroke-width: 2px;
          stroke-linecap: round;
          stroke-linejoin: round;
          filter: drop-shadow(0 0 5px #00f0ff) drop-shadow(0 0 12px #3b82f6);
          opacity: 0;
          animation: bolt-crackle var(--duration, 0.3s) steps(5, end) forwards;
          will-change: opacity, filter;
        }

        @keyframes bolt-crackle {
          0% { opacity: 0; stroke-dasharray: 400; stroke-dashoffset: 400; }
          10% { opacity: 1; stroke-dashoffset: 160; }
          25% { opacity: 0.6; filter: brightness(1.8) drop-shadow(0 0 6px #00f0ff); }
          45% { opacity: 1; stroke-dashoffset: 0; }
          65% { opacity: 0.7; }
          100% { opacity: 0; }
        }
      `}</style>

      <span className="spark-container-premium-hand">
        {chars.map((ch, i) => {
          const isActive = i === lastIdx || hoveredIndex === i;
          const config = precalculatedLayout[i] || precalculatedLayout[0];
          
          return (
            <span
              key={`${i}-${ch}`}
              className={`spark-letter${isActive ? " spark-letter-active" : ""}`}
              style={{ 
                "--exp-scale": isMobile ? "1.12" : "1.25",
                "--tilt": `${config.charTilt}deg`,
                zIndex: isActive ? 30 : i,
                transform: `rotate(${config.charTilt}deg) translateY(${config.verticalNudge}px)`
              } as React.CSSProperties}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {ch === " " ? "\u00A0" : ch}
              
              {isActive && ch !== " " && (
                <span 
                  className="spark-explosion" 
                  aria-hidden="true"
                  style={{ 
                    "--rad": lightningRadius.toString(),
                    "--duration": isMobile ? "0.24s" : "0.32s"
                  } as React.CSSProperties}
                >
                  <span className="spark-flash" />
                  
                  {config.bolts.map((bolt, k) => (
                    <svg 
                      key={k} 
                      className="realistic-bolt" 
                      viewBox={`-${lightningRadius} -${lightningRadius} ${lightningRadius * 2} ${lightningRadius * 2}`}
                      style={{
                        transform: `translate(-50%, -50%) rotate(${bolt.rotation}deg)`,
                        animationDelay: bolt.delay
                      }}
                    >
                      <path d={bolt.path} />
                    </svg>
                  ))}
                </span>
              )}
            </span>
          );
        })}
      </span>
    </span>
  );
};

export default SparkText;
