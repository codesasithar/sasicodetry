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
          {i === lastIdx && ch !== " " && (
            <span className="spark-explosion" aria-hidden="true">
              <span className="spark-flash" />
              <span className="spark-ring" />
              {Array.from({ length: 10 }).map((_, k) => (
                <span key={k} className={`spark-shard spark-shard-${k}`} />
              ))}
            </span>
          )}
        </span>
      ))}
    </span>
  );
};

export default SparkText;