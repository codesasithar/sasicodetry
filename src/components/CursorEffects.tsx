import { useEffect, useState, useRef, useCallback } from 'react';

interface Particle {
  tx: number;
  ty: number;
  duration: number;
  size: number;
  type: 'cyan' | 'hot' | 'white';
}

interface FissionExplosion {
  id: number;
  x: number;
  y: number;
  particles: Particle[];
}

export const CursorEffects = () => {
  const [isMobile, setIsMobile] = useState<boolean>(true);
  const [cursorText, setCursorText] = useState('');
  const [showCursorText, setShowCursorText] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [explosions, setExplosions] = useState<FissionExplosion[]>([]);
  const [clockText, setClockText] = useState('');

  // Refs for zero-rerender performance
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRefs = useRef<(HTMLDivElement | null)[]>([]);
  const coordsRef = useRef({
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
    history: Array.from({ length: 4 }, () => ({ x: 0, y: 0 })),
  });
  const lastTimeRef = useRef<number>(performance.now());

  // 1. Precise hardware & pointer detection
  useEffect(() => {
    const checkMobile = () => {
      const isTouch = window.matchMedia('(pointer: coarse)').matches || window.innerWidth <= 768;
      setIsMobile(isTouch);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 2. High-precision Clock update
  useEffect(() => {
    if (isMobile) return;

    const updateClock = () => {
      setClockText(
        new Date().toLocaleTimeString('en-US', {
          hour12: true,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
      );
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, [isMobile]);

  // 3. Hardware-Accelerated Animation Loop (Delta LERP)
  useEffect(() => {
    if (isMobile) return;

    let animationFrameId: number;

    const renderLoop = (time: number) => {
      const delta = Math.min((time - lastTimeRef.current) / 1000, 0.1);
      lastTimeRef.current = time;

      const coords = coordsRef.current;
      // Snappy, responsive interpolation
      const lerpFactor = 0.45;

      coords.x += (coords.targetX - coords.x) * lerpFactor;
      coords.y += (coords.targetY - coords.y) * lerpFactor;

      // Direct DOM hardware transform for main cursor
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${coords.x}px, ${coords.y}px, 0)`;
      }

      // Record positional history for trail smoothing
      coords.history.unshift({ x: coords.x, y: coords.y });
      coords.history.pop();

      // Update trailing nodes smoothly along history curve
      trailRefs.current.forEach((trailEl, index) => {
        if (!trailEl) return;
        const historyPoint = coords.history[index + 1] || coords;
        trailEl.style.transform = `translate3d(${historyPoint.x}px, ${historyPoint.y}px, 0)`;
      });

      animationFrameId = requestAnimationFrame(renderLoop);
    };

    animationFrameId = requestAnimationFrame(renderLoop);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isMobile]);

  // 4. Centralized Interaction Delegation
  const handleMouseMove = useCallback((e: MouseEvent) => {
    coordsRef.current.targetX = e.clientX;
    coordsRef.current.targetY = e.clientY;
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const matchConfig = target.closest?.('button, a, .btn-tech, .nav-link, .tech-card, .interactive-orb');

      if (matchConfig) {
        setIsHovering(true);
        if (target.closest('button, .btn-tech')) setCursorText('Click');
        else if (target.closest('a')) setCursorText('Link');
        else if (target.closest('.nav-link')) setCursorText('Navigate');
        else if (target.closest('.tech-card')) setCursorText('Explore');
        else if (target.closest('.interactive-orb')) setCursorText('Interact');
        setShowCursorText(true);
      } else {
        setIsHovering(false);
        setShowCursorText(false);
      }

      // Magnetic offset handler
      const magnetic = target.closest('.cursor-magnetic') as HTMLElement;
      if (magnetic) {
        const rect = magnetic.getBoundingClientRect();
        const deltaX = (e.clientX - (rect.left + rect.width / 2)) * 0.15;
        const deltaY = (e.clientY - (rect.top + rect.height / 2)) * 0.15;
        magnetic.style.transform = `translate3d(${deltaX}px, ${deltaY}px, 0)`;
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const magnetic = target?.closest('.cursor-magnetic') as HTMLElement;
      if (magnetic) {
        magnetic.style.transform = 'translate3d(0px, 0px, 0)';
      }
    };

    const onClick = (e: MouseEvent) => {
      // Fission Particle Burst
      const particleCount = 14;
      const particles: Particle[] = Array.from({ length: particleCount }, () => {
        const angle = Math.random() * Math.PI * 2;
        const distance = 30 + Math.random() * 45;
        return {
          tx: Math.cos(angle) * distance,
          ty: Math.sin(angle) * distance,
          duration: 0.35 + Math.random() * 0.25,
          size: 2 + Math.random() * 3,
          type: (['cyan', 'hot', 'white'] as const)[Math.floor(Math.random() * 3)],
        };
      });

      const expId = performance.now() + Math.random();
      setExplosions(prev => [...prev, { id: expId, x: e.clientX, y: e.clientY, particles }]);
      setTimeout(() => setExplosions(prev => prev.filter(exp => exp.id !== expId)), 600);

      // Ripple Injector
      const target = e.target as HTMLElement;
      const rippleBtn = target?.closest('.ripple-effect, button, .btn-tech') as HTMLElement | null;
      if (rippleBtn) {
        const rect = rippleBtn.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const ripple = document.createElement('span');
        ripple.className = 'ripple-node';
        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
        ripple.style.top = `${e.clientY - rect.top - size / 2}px`;

        if (getComputedStyle(rippleBtn).position === 'static') {
          rippleBtn.style.position = 'relative';
        }
        rippleBtn.appendChild(ripple);
        setTimeout(() => ripple.remove(), 450);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown, { passive: true });
    window.addEventListener('mouseup', onMouseUp, { passive: true });
    document.addEventListener('mouseover', onMouseOver, { passive: true });
    document.addEventListener('mouseout', onMouseOut, { passive: true });
    document.addEventListener('click', onClick);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
      document.removeEventListener('click', onClick);
    };
  }, [isMobile, handleMouseMove]);

  if (isMobile) return null;

  return (
    <div className="cursor-effects-wrapper pointer-events-none fixed inset-0 z-[9999] overflow-hidden select-none">
      {/* Dynamic Cursor Tail Trail Nodes */}
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          ref={el => { trailRefs.current[i] = el; }}
          className="cursor-trail-node"
          style={{ opacity: 0.5 - i * 0.08, scale: 1 - i * 0.12 }}
        />
      ))}

      {/* Main Accelerated Cursor Object */}
      <div
        ref={cursorRef}
        className={`custom-cursor ${isHovering ? 'hovering' : ''} ${isClicking ? 'clicking' : ''}`}
      >
        <div className="cursor-nucleus" />
        <div className="cursor-orbit orbit-1" />
        <div className="cursor-orbit orbit-2" />
        <div className="cursor-electron electron-1" />
        <div className="cursor-electron electron-2" />

        {/* Floating System Clock */}
        <div className="cursor-clock-badge">
          <span>{clockText}</span>
        </div>

        {/* Contextual Action Label */}
        <div className={`cursor-action-label ${showCursorText ? 'visible' : ''}`}>
          {cursorText}
        </div>
      </div>

      {/* Fission Explosion Overlay */}
      {explosions.map(exp => (
        <div key={exp.id} className="fission-explosion" style={{ transform: `translate3d(${exp.x}px, ${exp.y}px, 0)` }}>
          <div className="fission-flash" />
          <div className="fission-shockwave" />
          {exp.particles.map((p, i) => (
            <div
              key={i}
              className={`fission-particle ${p.type}`}
              style={{
                '--tx': `${p.tx}px`,
                '--ty': `${p.ty}px`,
                '--duration': `${p.duration}s`,
                width: `${p.size}px`,
                height: `${p.size}px`,
              } as React.CSSProperties}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default CursorEffects;
