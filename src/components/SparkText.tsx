import React, { useEffect, useState } from "react";

interface SparkTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Renders text with an energetic, small electric spark explosion
 * on whichever character is currently active. Bypasses for
 * specific technical job titles.
 */
const SparkText: React.FC<SparkTextProps> = ({ text, className, style }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Only run screen checks if we aren't bypassing the component
    if (text === "Application Developer") return;

    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [text]);

  // --- EXCLUSION GUARD ---
  // If the text matches exactly, render as standard text.
  if (text === "Application Developer") {
    return <span className={className} style={style}>{text}</span>;
  }

  const chars = Array.from(text);
  const lastIdx = chars.length - 1;

  // Responsive fine-tuning parameters for the small explosion
  // Fewer particles and tighter spread on mobile
  const shardCount = isMobile ? 6 : 10;
  const explosionScale = isMobile ? "1.15" : "1.4"; // Controls text letter scale
  const particleSpread = isMobile ? "25px" : "55px"; // Controls particle explosion radius
  const effectDuration = isMobile ? "0.3s" : "0.5s";

  return (
    <span className={className} style={{ ...style, position: "relative" }}>
      <style>{`
        /* The container for the entire effect */
        .spark-letter {
          display: inline-block;
          position: relative;
        }
        
        /* The character itself flashes bright white and scales up slightly on pop */
        .spark-letter-active {
          animation: letter-pop ${effectDuration} ease-out;
        }

        @keyframes letter-pop {
          0% { transform: scale(1); color: #fff; opacity: 1; }
          20% { transform: scale(${explosionScale}); color: #3b82f6; text-shadow: 0 0 10px #3b82f6, 0 0 20px #fff; }
          100% { transform: scale(1); }
        }

        /* Explosion Wrapper */
        .spark-explosion {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none;
          z-index: 20;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        /* 1. Core Lightning Flash/Arc (Static visual representation of code) */
        .spark-flash {
          position: absolute;
          width: calc(${explosionScale} * 18px);
          height: calc(${explosionScale} * 18px);
          background: radial-gradient(circle, #fff 10%, rgba(59, 130, 246, 0.9) 50%, rgba(168, 85, 247, 0) 70%);
          transform: translate(-50%, -50%);
          animation: flash-burn ${effectDuration} ease-out forwards;
        }

        @keyframes flash-burn {
          0% { transform: translate(-50%, -50%) scale(0.4); opacity: 1; }
          100% { transform: translate(-50%, -50%) scale(2.2); opacity: 0; }
        }

        /* 2. Concentric Shockwave Ring */
        .spark-ring {
          position: absolute;
          width: 8px;
          height: 8px;
          border: 2px solid #3b82f6;
          border-radius: 50%;
          transform: translate(-50%, -50%);
          animation: ring-expand ${effectDuration} cubic-bezier(0.1, 0.8, 0.3, 1) forwards;
        }

        @keyframes ring-expand {
          0% { width: 4px; height: 4px; opacity: 1; border-color: #fff; }
          40% { border-color: #a855f7; }
          100% { width: calc(${particleSpread} * 2); height: calc(${particleSpread} * 2); opacity: 0; }
        }

        /* 3. Small, flying shards/particles with blue and purple trace */
        .spark-shard {
          position: absolute;
          width: ${isMobile ? "3px" : "4px"};
          height: ${isMobile ? "3px" : "4px"};
          background-color: #fff;
          box-shadow: 0 0 6px #3b82f6, 0 0 10px #a855f7;
          border-radius: 50%;
          transform: translate(-50%, -50%);
        }
      `}</style>

      {chars.map((ch, i) => {
        const isActive = i === lastIdx;
        return (
          <span
            key={i}
            className={`spark-letter${isActive ? " spark-letter-active" : ""}`}
          >
            {ch === " " ? "\u00A0" : ch}
            
            {isActive && ch !== " " && (
              <span className="spark-explosion" aria-hidden="true">
                <span className="spark-flash" />
                <span className="spark-ring" />
                
                {/* Dynamically generate shards with trigonometric trajectories */}
                {Array.from({ length: shardCount }).map((_, k) => (
                  <span 
                    key={k} 
                    className="spark-shard" 
                    style={{
                      animation: `shard-fly-${k} ${effectDuration} cubic-bezier(0.25, 1, 0.5, 1) forwards`,
                    }}
                  />
                ))}

                {/* Inline style block to register the per-particle trajectories */}
                <style>{`
                  ${Array.from({ length: shardCount }).map((_, k) => {
                    const angle = (k * 360) / shardCount + Math.random() * 10;
                    const radians = (angle * Math.PI) / 180;
                    const x = (Math.cos(radians) * parseFloat(particleSpread)).toFixed(1);
                    const y = (Math.sin(radians) * parseFloat(particleSpread)).toFixed(1);
                    return `
                      @keyframes shard-fly-${k} {
                        0% { transform: translate(-50%, -50%) translate(0, 0) scale(1); opacity: 1; }
                        100% { transform
