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

  // Optimized configuration limits
  const shardCount = isMobile ? 4 : 8; // Kept low for mobile GPU safety
  const particleSpread = isMobile ? 22 : 45; 

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
        
        .spark-letter-active {
          animation: letter-shock-opt 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes letter-shock-opt {
          0% { transform: scale(1); color: #fff; }
          20% { transform: scale(var(--exp-scale, 1.3)); color: #00f0ff; }
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
          width: 25px;
          height: 25px;
          background: radial-gradient(circle, #ffffff 0%, rgba(0, 240, 255, 0.9) 45%, rgba(59, 130, 246, 0) 70%);
          transform: translate(-50%, -50%) scale(0);
          animation: flash-zap-opt 0.3s ease-out forwards;
          will-change: transform, opacity;
        }

        @keyframes flash-zap-opt {
          0% { transform: translate(-50%, -50%) scale(0.3); opacity: 1; }
          100% { transform: translate(-50%, -50%) scale(2.2); opacity: 0; }
        }

        .spark-ring {
          position: absolute;
          width: 80px;
          height: 80px;
          border: 1.5px solid #00f0ff;
          border-radius: 50%;
          transform: translate(-50%, -50%) scale(0);
          animation: shock-ring-opt 0.35s cubic-bezier(0.1, 0.8, 0.1, 1) forwards;
          will-change: transform, opacity;
        }

        @keyframes shock-ring-opt {
          0% { transform: translate(-50%, -50%) scale(0.05); opacity: 1; }
          100% { transform: translate(-50%, -50%) scale(var(--ring-scale, 1)); opacity: 0; }
        }

        .spark-shard {
          position: absolute;
          width: 3px;
          height: 3px;
          background-color: #ffffff;
          box-shadow: 0 0 4px #00f0ff; /* Simplified shadow to avoid pixel fill rate limits */
          border-radius: 50%;
          transform: translate(-50%, -50%);
          animation: shard-zap-opt 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          will-change: transform, opacity;
        }

        @keyframes shard-zap-opt {
          0% { transform: translate(-50%, -50%) translate(0, 0) scale(1.2); opacity: 1; }
          100% { transform: translate(-50%, -50%) translate(var(--x), var(--y)) scale(0.1); opacity: 0; }
        }
      `}</style>

      {chars.map((ch, i) => {
        const isActive = i === lastIdx;
        return (
