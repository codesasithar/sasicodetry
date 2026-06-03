import React, { useEffect, useState } from "react";

interface SparkTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Renders text with a sharp, electric blue lightning shock explosion
 * on whichever character is currently active. Bypasses for
 * specific technical job titles.
 */
const SparkText: React.FC<SparkTextProps> = ({ text, className, style }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (text === "Application Developer") return;

    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [text]);

  // --- EXCLUSION GUARD ---
  if (text === "Application Developer") {
    return <span className={className} style={style}>{text}</span>;
  }

  const chars = Array.from(text);
  const lastIdx = chars.length - 1;

  // Responsive parameters for the clean lightning strike
  const shardCount = isMobile ? 5 : 8; // Slightly fewer shards for a cleaner "zap" look
  const explosionScale = isMobile ? "1.15" : "1.35";
  const particleSpread = isMobile ? "20px" : "45px"; // Slightly tighter for high voltage look
  const effectDuration = isMobile ? "0.2s" : "0.35s"; // Snappier duration for lightning speed

  return (
    <span className={className} style={{ ...style, position: "relative" }}>
      <style>{`
        .spark-letter {
          display: inline-block;
          position: relative;
        }
        
        /* The character flashes instantly to pure white/cyan like a neon filament */
        .spark-letter-active {
          animation: letter-shock ${effectDuration} cubic-bezier(0.19, 1, 0.22, 1);
        }

        @keyframes letter-shock {
          0% { transform: scale(1); color: #fff; filter: drop-shadow(0 0 15px #00f0ff); }
          15% { transform: scale(${explosionScale}); color: #00f0ff; }
          100% { transform: scale(1); filter: drop-shadow(0 0 0px transparent); }
        }

        /* Lightning Explosion Center */
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

        /* 1. Electrical Core Zap */
        .spark-flash {
          position: absolute;
          width: calc(${explosionScale} * 15px);
          height: calc(${explosionScale} * 15px);
          /* Shifted completely to white and intense electric blues */
          background: radial-gradient(circle, #ffffff 0%, rgba(0, 240, 255, 0.9) 45%, rgba(59, 130, 246, 0) 70%);
          transform: translate(-50%, -50%);
          animation: flash-zap ${effectDuration} ease-out forwards;
        }

        @keyframes flash-zap {
          0% { transform: translate(-50%, -50%) scale(0.3); opacity: 1; }
          50% { opacity: 1; }
          100% { transform: translate(-50%, -50%) scale(2.5); opacity: 0; }
        }

        /* 2. Sharp Cyan Shockwave Arc */
        .spark-ring {
          position: absolute;
          width: 6px;
          height: 6px;
          border: 1.5px solid #00f0ff;
          border-radius: 50%;
          transform: translate(-50%, -50%);
          /* Standard exponential bezier for a realistic "snapping" expansion */
          animation: shock-ring ${effectDuration} cubic-bezier(0.1, 0.8, 0.1, 1) forwards;
        }

        @keyframes shock-ring {
          0% { width: 2px; height: 2px; opacity: 1; border-color: #fff; }
          100% { width: calc(${particleSpread} * 2); height: calc(${particleSpread} * 2); opacity: 0; border-color: #3b82f6; }
        }

        /* 3. Plasma Shards/Sparks */
        .spark-shard {
          position
