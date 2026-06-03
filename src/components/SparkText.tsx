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

  // Optimized configuration limits for lightning tendrils
  const tendrilCount = isMobile ? 6 : 12; // More tendrils for a denser, more realistic fractal look
  const tendrilSpread = isMobile ? 25 : 50; // Distance of lightning branching

  return (
    <span className={className} style={{ ...style, position: "relative" }}>
      {/* PERFORMANCE OPTIMIZATION: One static style block. 
        Using hardware-accelerated transforms and opacity avoids layout thrashing.
      */}
      <style>{`
        .spark-letter {
          display: inline-block;
          position: relative;
          will-change: transform;
        }
        
        /* The character flashes bright white/blue instantly */
        .spark-letter-active {
          animation: letter-lightning-pop 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes letter-lightning-pop {
          0% { transform: scale(1); color: #fff; text-shadow: 0 0 5px #00f0ff, 0 0 10px #00f0ff; }
          20% { transform: scale(var(--exp-scale, 1.3)); color: #3b82f6; text-shadow: 0 0 20px #00f0ff, 0 0 40px #00f0ff; }
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

        /* 1. Intensive lightning flash core (brighter, more focused gradient) */
        .spark-flash {
          position: absolute;
          width: 30px;
          height: 30px;
          background: radial-gradient(circle, #ffffff 10%, rgba(59, 130, 246, 0.9) 40%, rgba(0, 240, 255, 0.8) 60%, transparent 80%);
          transform: translate(-50%, -50%) scale(0);
          animation: flash-lightning-zap 0.3s ease-out forwards;
          will-change: transform, opacity;
        }

        @keyframes flash-lightning-zap {
          0% { transform: translate(-50%, -50%) scale(0.4); opacity: 1; }
          100% { transform: translate(-50%, -50%) scale(2.5); opacity: 0; }
        }

        /* 2. Focused Blue Shockwave Ring (like in image_4.png) */
        .spark-ring {
          position: absolute;
          width: 80px;
          height: 80px;
          border: 2px solid #00f0ff;
          border-radius: 50%;
          transform: translate(-50%, -50%) scale(0);
          animation: shock-lightning-ring 0.35s cubic-bezier(0.1, 0.8, 0.1, 1) forwards;
          will-change: transform, opacity;
        }

        @keyframes shock-lightning-ring {
          0% { transform: translate(-50%, -50%) scale(0.05); opacity: 1; border-color: #ffffff; }
          100% { transform: translate(-50%, -50%) scale(var(--ring-scale, 1.1)); opacity: 0; border-color: #3b82f6; }
        }

        /* 3. Intricate branching lightning tendrils (like image_4.png) */
        .spark-tendril {
          position: absolute;
          /* Each tendril is an SVG path for realistic forking */
          width: 100%;
          height: 100%;
          fill: none;
          stroke: #ffffff; /* Brighter tendrils */
          stroke-width: 0.8px;
          stroke-linecap: round;
          filter: drop-shadow(0 0 3px #3b82f6) drop-shadow(0 0 6px #00f0ff);
          opacity: 0;
          animation: tendril-lightning-zap 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          will-change: transform, opacity;
          transform-origin: center;
        }

        @keyframes tendril-lightning-zap {
          0% { transform: scale(0); opacity: 1; stroke-dasharray: 200; stroke-dashoffset: 200; }
          50% { opacity: 1; }
          100% { transform: scale(var(--tendril-final-scale, 1)); opacity: 0; stroke-dashoffset: 0; }
        }
      `}</style>

      {chars.map((ch, i) => {
        const isActive = i === lastIdx;
        return (
          <span
            key={i}
            className={`spark-letter${isActive ? " spark-letter-active" : ""}`}
            style={{ "--exp-scale": isMobile ? "1.15" : "1.35" } as React.CSSProperties}
          >
            {ch === " " ? "\u00A0" : ch}
            
            {isActive && ch !== " " && (
              <span 
                className="spark-explosion" 
                aria-hidden="true"
                style={{
                  "--ring-scale": isMobile ? "0.6" : "1.1",
                  "--tendril-final-scale": isMobile ? "1.0" : "1.2",
                } as React.CSSProperties}
              >
                <span className="spark-flash" />
                <span className="spark-ring" />
                
                {/* Dynamically create intricate lightning tendrils using SVG paths */}
                {Array.from({ length: tendrilCount }).map((_, k) => {
                  // Calculate dynamic angles to create a complex branching effect
                  const baseAngle = (k * 360) / tendrilCount;
                  const branchAngle1 = baseAngle + (Math.random() * 20 - 10);
                  const branchAngle2 = branchAngle1 + (Math.random() * 20 - 10);
                  
                  // Trigonometry to define path segments that branch fractal-style
                  const radians1 = (branchAngle1 * Math.PI) / 180;
                  const radians2 = (branchAngle2 * Math.PI) / 180;
                  
                  // Use particleSpread as the maximum extent for the path
                  const segmentLength = tendrilSpread;
                  const pathExt1 = segmentLength * 0.5; // distance of first branch point
                  const pathExt2 = segmentLength; // final extent
                  
                  const x1 = (Math.cos(radians1) * pathExt1).toFixed(1);
                  const y1 = (Math.sin(radians1) * pathExt1).toFixed(1);
                  
                  const x2a = (Math.cos(radians2) * pathExt2).toFixed(1); // main continuation
                  const y2a = (Math.sin(radians2) * pathExt2).toFixed(1);

                  const radians2b = ((branchAngle2 + (Math.random()*40-20)) * Math.PI) / 180;
                  const x2b = (Math.cos(radians2b) * (pathExt2 * 1.1)).toFixed(1); // sub-fork
                  const y2b = (Math.sin(radians2b) * (pathExt2 * 1.1)).toFixed(1);

                  // Complex SVG path to simulate lightning forking like image_4.png
                  const pathData = `M 0 0 L ${x1} ${y1} C ${x1} ${y1}, ${x2a} ${y2a}, ${x2a} ${y2a} L ${x2b} ${y2b}`;
                  
                  return (
                    <svg 
                      key={k} 
                      className="spark-tendril" 
                      viewBox={`-${segmentLength} -${segmentLength} ${segmentLength * 2} ${segmentLength * 2}`} 
                      style={{
                        animationDelay: `${k * 0.015}s`,
                      }}
                    >
                      <path d={pathData} />
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
