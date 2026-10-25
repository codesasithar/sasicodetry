import { useEffect, useRef } from "react";

const rotors = [
  { x: 46, y: 43 },
  { x: 234, y: 43 },
  { x: 46, y: 143 },
  { x: 234, y: 143 },
];

const FlyingDrone = () => {
  const droneRef = useRef<HTMLDivElement>(null);
  const gimbalRef = useRef<SVGGElement>(null);

  useEffect(() => {
    const drone = droneRef.current;
    if (!drone) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let phase = 0;
    let previousTime = performance.now();
    let currentX = window.innerWidth / 2;
    let currentY = window.innerHeight / 2;
    let currentAngle = 0;

    const updatePosition = (now: number) => {
      if (reducedMotion.matches) {
        currentX = window.innerWidth * 0.82;
        currentY = window.innerHeight * 0.4;
        currentAngle = 0;
      } else {
        const elapsed = Math.min(now - previousTime, 48);
        previousTime = now;
        phase += elapsed * 0.0003;

        const radiusX = window.innerWidth * (window.innerWidth < 768 ? 0.28 : 0.32);
        const radiusY = window.innerHeight * (window.innerWidth < 768 ? 0.2 : 0.25);
        currentX = window.innerWidth / 2 + radiusX * Math.sin(phase);
        currentY = window.innerHeight / 2 + radiusY * Math.sin(phase * 2) / 2;
        currentAngle = Math.atan2(
          radiusY * Math.cos(phase * 2),
          radiusX * Math.cos(phase)
        ) * 180 / Math.PI;
      }

      drone.style.left = currentX + "px";
      drone.style.top = currentY + "px";
      drone.style.transform = "translate(-50%, -50%) rotate(" + currentAngle + "deg)";

      if (!reducedMotion.matches) frame = window.requestAnimationFrame(updatePosition);
    };

    const followPointer = (event: PointerEvent) => {
      const gimbal = gimbalRef.current;
      if (!gimbal) return;
      const direction = Math.atan2(event.clientY - currentY, event.clientX - currentX) * 180 / Math.PI;
      const relativeDirection = direction - currentAngle;
      const turn = Math.max(-22, Math.min(22, relativeDirection));
      gimbal.style.transform = "rotate(" + turn + "deg)";
    };

    const resetReducedMotionPosition = () => {
      if (reducedMotion.matches) updatePosition(performance.now());
    };

    window.addEventListener("pointermove", followPointer, { passive: true });
    window.addEventListener("resize", resetReducedMotionPosition);

    if (reducedMotion.matches) updatePosition(performance.now());
    else frame = window.requestAnimationFrame(updatePosition);

    return () => {
      window.removeEventListener("pointermove", followPointer);
      window.removeEventListener("resize", resetReducedMotionPosition);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={droneRef} className="flying-drone" aria-hidden="true">
      <svg className="flying-drone-svg" viewBox="0 0 280 180" role="presentation">
        <defs>
          <linearGradient id="drone-carbon" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#344b5d" />
            <stop offset="0.5" stopColor="#101c28" />
            <stop offset="1" stopColor="#536879" />
          </linearGradient>
          <linearGradient id="drone-shell" x1="0" y1="0" x2="0.8" y2="1">
            <stop offset="0" stopColor="#f4fbff" />
            <stop offset="0.42" stopColor="#aebdca" />
            <stop offset="1" stopColor="#607487" />
          </linearGradient>
          <linearGradient id="drone-shell-dark" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#374a5b" />
            <stop offset="1" stopColor="#0a141e" />
          </linearGradient>
          <radialGradient id="drone-lens">
            <stop offset="0" stopColor="#8effff" />
            <stop offset="0.24" stopColor="#09d9ff" />
            <stop offset="0.65" stopColor="#08719f" />
            <stop offset="1" stopColor="#071827" />
          </radialGradient>
          <filter id="drone-soft-glow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="drone-shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" />
          </filter>
        </defs>

        <ellipse cx="140" cy="158" rx="82" ry="8" fill="#02070c" opacity=".3" filter="url(#drone-shadow)" />

        {/* Reinforced carbon arms and brushed-metal edge rails */}
        <g fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="M116 74 L56 47 M164 74 L224 47 M116 106 L56 139 M164 106 L224 139" stroke="#09121b" strokeWidth="16" />
          <path d="M116 74 L56 47 M164 74 L224 47 M116 106 L56 139 M164 106 L224 139" stroke="url(#drone-carbon)" strokeWidth="11" />
          <path d="M113 72 L58 48 M167 72 L222 48 M113 108 L58 138 M167 108 L222 138" stroke="#a9bdcc" strokeOpacity=".42" strokeWidth="1.5" />
          <path d="M82 59 L72 55 M198 59 L208 55 M82 125 L72 131 M198 125 L208 131" stroke="#30dcff" strokeOpacity=".86" strokeWidth="2.5" filter="url(#drone-soft-glow)" />
        </g>

        {/* Four motor housings with fast, blurred twin propellers */}
        {rotors.map((rotor, index) => (
          <g key={index} transform={"translate(" + rotor.x + " " + rotor.y + ")"}>
            <ellipse cx="0" cy="0" rx="34" ry="9" fill="#84dfff" opacity=".09" />
            <g className="drone-prop-blur">
              <path d="M-30 -2 C-20 -5 -7 -4 0 0 C-8 3 -21 4 -30 2 Z M30 2 C20 5 7 4 0 0 C8 -3 21 -4 30 -2 Z" fill="#dce9f0" fillOpacity=".62" />
              <path d="M-2 -30 C-5 -20 -4 -7 0 0 C3 -8 4 -21 2 -30 Z M2 30 C5 20 4 7 0 0 C-3 8 -4 21 -2 30 Z" fill="#dce9f0" fillOpacity=".38" />
            </g>
            <circle r="10.5" fill="url(#drone-carbon)" stroke="#b7c9d6" strokeWidth="1.5" />
            <circle r="6.5" fill="url(#drone-shell)" stroke="#eef9ff" strokeWidth="1" />
            <circle r="2.2" fill="#253746" />
            <circle cx="0" cy="-13" r="2.2" fill={index < 2 ? "#48eaff" : "#f3a66e"} filter="url(#drone-soft-glow)" />
          </g>
        ))}

        {/* Lower chassis, fuselage and service details */}
        <path d="M140 39 C158 40 170 52 173 72 L170 106 C168 121 155 131 140 134 C125 131 112 121 110 106 L107 72 C110 52 122 40 140 39 Z" fill="url(#drone-shell-dark)" stroke="#758da0" strokeWidth="1.5" />
        <path d="M140 43 C156 43 166 54 168 73 L165 102 C163 114 153 123 140 127 C127 123 117 114 115 102 L112 73 C114 54 124 43 140 43 Z" fill="url(#drone-shell)" stroke="#f1faff" strokeOpacity=".8" strokeWidth="1.5" />
        <path d="M140 47 C151 48 159 56 161 72 L159 81 L121 81 L119 72 C121 56 129 48 140 47 Z" fill="#dfe9ef" stroke="#9fb3c1" strokeWidth="1" />
        <path d="M128 56 Q140 52 152 56 L155 70 Q140 75 125 70 Z" fill="#253847" stroke="#91a8b7" strokeWidth="1" />
        <path d="M129 59 L140 57 L151 59 L149 67 L131 67 Z" fill="#10212e" />
        <path d="M133 61 L140 60 L147 61" fill="none" stroke="#67f0ff" strokeWidth="1.5" strokeLinecap="round" filter="url(#drone-soft-glow)" />
        <path d="M115 91 Q140 98 165 91 L163 106 Q140 119 117 106 Z" fill="url(#drone-shell-dark)" stroke="#647c8e" strokeWidth="1" />
        <path d="M125 101 L155 101 M128 106 L152 106 M132 111 L148 111" stroke="#9bb0bf" strokeOpacity=".45" strokeWidth="1" strokeLinecap="round" />
        <circle cx="140" cy="87" r="2.5" fill="#52eaff" filter="url(#drone-soft-glow)" />
        <circle cx="119" cy="77" r="2" fill="#ee786f" filter="url(#drone-soft-glow)" />
        <circle cx="161" cy="77" r="2" fill="#57eaff" filter="url(#drone-soft-glow)" />

        {/* Landing skids and stabilized front camera */}
        <path d="M119 108 L108 136 Q108 141 114 141 L119 139 L128 116 M161 108 L172 136 Q172 141 166 141 L161 139 L152 116" fill="none" stroke="#142330" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M108 138 L103 141 L115 143 M172 138 L177 141 L165 143" fill="none" stroke="url(#drone-shell)" strokeWidth="3" strokeLinecap="round" />
        <g ref={gimbalRef} className="drone-gimbal" transform="rotate(0 140 145)">
          <path d="M124 126 L120 139 Q120 147 128 150 M156 126 L160 139 Q160 147 152 150" fill="none" stroke="url(#drone-carbon)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M126 130 L128 140 M154 130 L152 140" stroke="#9caebb" strokeWidth="1.4" strokeLinecap="round" />
          <rect x="127" y="136" width="26" height="22" rx="9" fill="url(#drone-shell-dark)" stroke="#b7c8d4" strokeWidth="1.5" />
          <circle cx="140" cy="146" r="8.2" fill="#07131d" stroke="#d7e8f2" strokeWidth="1.5" />
          <circle cx="140" cy="146" r="5.7" fill="url(#drone-lens)" stroke="#58eaff" strokeWidth="1" />
          <circle cx="138" cy="144" r="1.8" fill="#e9ffff" opacity=".9" />
          <path d="M133 156 Q140 160 147 156" fill="none" stroke="#31dfff" strokeWidth="1.5" strokeLinecap="round" />
        </g>
      </svg>
    </div>
  );
};

export default FlyingDrone;
