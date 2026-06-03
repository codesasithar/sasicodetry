import React from "react";

interface SparkTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Renders text one character at a time with a brief electric-spark
 * flash on whichever character was most recently appended.
 */
const SparkText: React.FC<SparkTextProps> = ({ text, className, style }) => {
  const chars = Array.from(text);
  const lastIdx = chars.length - 1;
  return (
    <span className={className} style={style}>
      {chars.map((ch, i) => (
        <span
          key={i}
          className={`spark-letter${i === lastIdx ? " spark-letter-active" : ""}`}
        >
          {ch === " " ? "\u00A0" : ch}
        </span>
      ))}
    </span>
  );
};

export default SparkText;