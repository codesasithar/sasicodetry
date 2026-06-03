import React, { useEffect, useState } from "react";

interface SparkTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}

const SparkText: React.FC<SparkTextProps> = ({ text, className, style }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Exact match bypass for "Application developer"
    if (text === "Application developer") return;

    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile, { passive: true });
    return () => window.removeEventListener("resize", checkMobile);
  }, [text]);

  // --- EXCLUSION GUARD ---
  // If the text matches "Application developer", skip processing and render plain text
  if (text === "Application developer") {
    return <span className={className} style={style}>{text}</span>;
  }

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
                
                {Array.from({ length: strikeCount }).map((_, k) => {
                  const baseAngle = (k * 360) / strikeCount;
                  const randomAngle = baseAngle + (Math.random() * 40 - 20);
                  const rads = (randomAngle * Math.PI) / 180;
                  const maxReach = lightningRadius * (0.5 + Math.random() * 0.6);
                  
                  const segments = 4;
                  let currentX = 0;
                  let currentY = 0;
                  let pathSegments = ["M 0 0"];

                  for (let s = 1; s <= segments; s++) {
                    const progress = s / segments;
                    const targetX = Math.cos(rads) * maxReach * progress;
                    const targetY = Math.sin(rads) * maxReach * progress;

                    const driftFactor = isMobile ? 6 : 12;
                    const perpAngle = randomAngle + 90;
                    const perpRads = (perpAngle * Math.PI) / 180;
                    const displacement = (Math.random() * driftFactor - driftFactor / 2) * (1 - progress * 0.4);

                    currentX = targetX + Math.cos(perpRads) * displacement;
                    currentY = targetY + Math.sin(perpRads) * displacement;

                    pathSegments.push(`L ${currentX.toFixed(1)} ${currentY.toFixed(1)}`);

                    if (s === 2 && Math.random() > 0.4) {
                      const forkAngle = randomAngle + (Math.random() * 60 - 30);
                      const forkRads = (forkAngle * Math.PI) / 180;
                      const forkX = currentX + Math.cos(forkRads) * (maxReach * 0.4);
                      const forkY = currentY + Math.sin(forkRads) * (maxReach * 0.4);
                      
                      pathSegments.push(`M ${currentX.toFixed(1)} ${currentY.toFixed(1)} L ${forkX.toFixed(1)} ${forkY.toFixed(1)}`);
                      pathSegments.push(`M ${currentX.toFixed(1)} ${currentY.toFixed(1)}`);
                    }
                  }

                  return (
                    <svg 
                      key={k} 
                      className="realistic-bolt" 
                      viewBox={`-${lightningRadius} -${lightningRadius} ${lightningRadius * 2} ${lightningRadius * 2}`}
                      style={{
                        transform: `translate(-50%, -50%) rotate(${(Math.random() * 14 - 7).toFixed(1)}deg)`,
                        animationDelay: `${Math.random() * 0.04}s`
                      }}
                    >
                      <path d={pathSegments.join(" ")} />
                    </svg>
                  );
                })}
              </span>
            )}
          </span>
        );
      })}
    </span>
  );
};

export default SparkText;
