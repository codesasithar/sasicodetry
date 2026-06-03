import React, { useEffect, useState } from "react";

interface SparkTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Renders text with an electric-spark text explosion effect,
 * completely bypassed if the text is "Application Developer".
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
  // If the text is exactly "Application Developer", skip the processing entirely
  if (text === "Application Developer") {
    return <span className={className} style={style}>{text}</span>;
  }

  const chars = Array.from(text);
  const lastIdx = chars.length - 1;

  // Responsive fine-tuning parameters for standard text
  const shardCount = isMobile ? 6 : 10;
  const explosionScale = isMobile ? "1.2" : "1.5";
  const particleSpread = isMobile ? "30px" : "60px";
  const effectDuration = isMobile ? "0.3s" : "0.5s";

  return (
    <span className={className} style={{ ...style, position: "relative" }}>
      <style>{`
        .spark-letter {
          display: inline-block;
          position: relative;
        }
        
        .spark-letter-active {
          animation: letter-jolt ${effectDuration} ease-out;
        }

        @keyframes letter-jolt {
          0% { transform: scale(1); color: #fff; }
          20% { transform: scale(${explosionScale}); text-shadow: 0 0 12px currentColor; }
          100% { transform: scale(1); }
        }

        .spark-explosion {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none;
          z-index: 20;
        }

        .spark-flash {
          position: absolute;
          width: calc(${explosionScale} * 20px);
          height: calc(${explosionScale} * 20px);
          background: radial-gradient(circle, #fff 20%, rgba(147, 51, 234, 0.8) 60%, transparent 100%);
          transform: translate(-50%, -50%);
          animation: flash-burn ${effectDuration} ease-out forwards;
        }

        @keyframes flash-burn {
          0% { transform: translate(-50%, -50%) scale(0.5); opacity: 1; }
          100% { transform: translate(-50%, -50%) scale(2); opacity: 0; }
        }

        .spark-ring {
          position: absolute;
          width: 10px;
          height: 10px;
          border: 2px solid #3b82f6;
          border-radius: 50%;
          transform: translate(-50%, -50%);
          animation: ring-expand ${effectDuration} cubic-bezier(0.1, 0.8, 0.3, 1) forwards;
        }

        @keyframes ring-expand {
          0% { width: 4px; height: 4px; opacity: 1; border-color: #fff; }
          50% { border-color: #a855f7; }
          100% { width: calc(${particleSpread} * 2); height: calc(${particleSpread} * 2); opacity: 0; }
        }

        .spark-shard {
          position: absolute;
          width: ${isMobile ? "3px" : "4px"};
          height: ${isMobile ? "3px" : "4px"};
          background-color: #fff;
          box-shadow: 0 0 8px #3b82f6, 0 0 12px #a855f7;
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
                {Array.from({ length: shardCount }).map((_, k) => (
                  <span 
                    key={k} 
                    className="spark-shard" 
                    style={{
                      animation: `shard-fly-${k} ${effectDuration} cubic-bezier(0.25, 1, 0.5, 1) forwards`,
                    }}
                  />
                ))}
                <style>{`
                  ${Array.from({ length: shardCount }).map((_, k) => {
                    const angle = (k * 360) / shardCount + Math.random() * 15;
                    const radians = (angle * Math.PI) / 180;
                    const x = (Math.cos(radians) * parseFloat(particleSpread)).toFixed(1);
                    const y = (Math.sin(radians) * parseFloat(particleSpread)).toFixed(1);
                    return `
                      @keyframes shard-fly-${k} {
                        0% { transform: translate(-50%, -50%) translate(0, 0) scale(1); opacity: 1; }
                        100% { transform: translate(-50%, -50%) translate(${x}px, ${y}px) scale(0.2); opacity: 0; }
                      }
