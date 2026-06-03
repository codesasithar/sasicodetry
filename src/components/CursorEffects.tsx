import { useEffect, useState, useRef } from 'react';

interface FissionExplosion {
  x: number;
  y: number;
  id: number;
  particles: Array<{ tx: number; ty: number; duration: number; type: 'cyan' | 'hot' | 'white' }>;
}

const CursorEffects = () => {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  const [cursorText, setCursorText] = useState('');
  const [showCursorText, setShowCursorText] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [explosions, setExplosions] = useState<FissionExplosion[]>([]);
  const [clockText, setClockText] = useState('');

  const containerRef = useRef<HTMLDivElement>(null);
  const coordsRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  // 1. Device detection ran only once safely post-mount
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 2. High performance frame loop for smoothing coordinates (LERP)
  useEffect(() => {
    if (isMobile !== false) return;

    let animationFrameId: number;
    
    const updateLoop = () => {
      const coords = coordsRef.current;
      // Linear interpolation creates an ultra-smooth glide trail natively
      coords.x += (coords.targetX - coords.x) * 0.2;
      coords.y += (coords.targetY - coords.y) * 0.2;

      if (containerRef.current) {
        containerRef.current.style.setProperty('--cx', `${coords.x}px`);
        containerRef.current.style.setProperty('--cy', `${coords.y}px`);
        containerRef.current.style.setProperty('--raw-x', `${coords.targetX}px`);
        containerRef.current.style.setProperty('--raw-y', `${coords.targetY}px`);
      }
      animationFrameId = requestAnimationFrame(updateLoop);
    };
    
    animationFrameId = requestAnimationFrame(updateLoop);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isMobile]);

  // 3. Isolated Clock state engine updating strictly outside tracking layouts
  useEffect(() => {
    if (isMobile !== false) return;

    const updateClock = () => {
      setClockText(new Date().toLocaleTimeString('en-US', {
        hour12: true,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }));
    };
    
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, [isMobile]);

  // 4. Central Event Handler (Event Delegation Loop)
  useEffect(() => {
    if (isMobile !== false) return;

    const onMouseMove = (e: MouseEvent) => {
      coordsRef.current.targetX = e.clientX;
      coordsRef.current.targetY = e.clientY;
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      // Compound evaluation minimizes layout calls
      const matchConfig = target.closest?.('button, a, .btn-tech, .nav-link, .tech-card, .interactive-orb');
      
      if (matchConfig) {
        setIsHovering(true);
        if (target.matches('button, .btn-tech')) setCursorText('Click');
        else if (target.matches('a')) setCursorText('Link');
        else if (target.matches('.nav-link')) setCursorText('Navigate');
        else if (target.matches('.tech-card')) setCursorText('Explore');
        else if (target.matches('.interactive-orb')) setCursorText('Interact');
        setShowCursorText(true);
      } else {
        setIsHovering(false);
        setShowCursorText(false);
      }

      // Magnetic Core styling elements
      const magnetic = target.closest('.cursor-magnetic') as HTMLElement;
      if (magnetic) {
        const rect = magnetic.getBoundingClientRect();
        const deltaX = (e.clientX - (rect.left + rect.width / 2)) * 0.1;
        const deltaY = (e.clientY - (rect.top + rect.height / 2)) * 0.1;
        magnetic.style.setProperty('--cursor-x', `${deltaX}px`);
        magnetic.style.setProperty('--cursor-y', `${deltaY}px`);
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target?.matches?.('.cursor-magnetic')) {
        target.style.setProperty('--cursor-x', '0px');
        target.style.setProperty('--cursor-y', '0px');
      }
    };

    const onClick = (e: MouseEvent) => {
      // Exploded Particle Generation
      const particleCount = 12;
      const particles = Array.from({ length: particleCount }, () => {
        const angle = Math.random() * Math.PI * 2;
        const distance = 25 + Math.random() * 40;
        return {
          tx: Math.cos(angle) * distance,
          ty: Math.sin(angle) * distance,
          duration: 0.3 + Math.random() * 0.2,
          type: (['cyan', 'hot', 'white'] as const)[Math.floor(Math.random() * 3)],
        };
      });

      const expId = Date.now() + Math.random();
      setExplosions(prev => [...prev, { x: e.clientX, y: e.clientY, id: expId, particles }]);

      document.documentElement.classList.add('screen-shake');
      setTimeout(() => document.documentElement.classList.remove('screen-shake'), 150);
      setTimeout(() => setExplosions(prev => prev.filter(exp => exp.id !== expId)), 500);

      // Clean inline CSS ripple inject mechanics
      const target = e.target as HTMLElement;
      const rippleBtn = target?.closest('.ripple-effect, button, .btn-tech');
      if (rippleBtn) {
        const rect = rippleBtn.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const ripple = document.createElement('div');
        ripple.className = 'ripple';
        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
        ripple.style.top = `${e.clientY - rect.top - size / 2}px`;

        if (!['absolute', 'relative', 'fixed'].includes(getComputedStyle(rippleBtn).position)) {
          rippleBtn.style.position = 'relative';
        }
        rippleBtn.appendChild(ripple);
        setTimeout(() => ripple.remove(), 400);
      }
    };

    document.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mousedown', onMouseDown, { passive: true });
    document.addEventListener('mouseup', onMouseUp, { passive: true });
    document.addEventListener('mouseover', onMouseOver, { passive: true });
    document.addEventListener('mouseout', onMouseOut, { passive: true });
    document.addEventListener('click', onClick);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
      document.removeEventListener('click', onClick);
    };
  }, [isMobile]);

  // Drop processing completely for mobile screens
  if (isMobile !== false) return null;

  return (
    <div ref={containerRef} className="cursor-effects-wrapper pointer-events-none fixed inset-0 z-[9999]">
      {/* Custom Core Cursor Component */}
      <div className={`custom-cursor ${isHovering ? 'hovering' : ''} ${isClicking ? 'clicking' : ''}`}>
        <div className="cursor-nucleus" />
        <div className="cursor-orbit cursor-orbit-1" />
        <div className="cursor-orbit cursor-orbit-2" />
        <div className="cursor-orbit cursor-orbit-3" />
        <div className="cursor-electron cursor-electron-1" />
        <div className="cursor-electron cursor-electron-2" />
        <div className="cursor-electron cursor-electron-3" />
      </div>

      {/* Floating System Clock */}
      <div className="cursor-clock">
        <span>{clockText}</span>
      </div>

      {/* Dynamic Action Helper Text */}
      <div className={`cursor-text ${showCursorText ? 'visible' : ''}`}>
        {cursorText}
      </div>

      {/* Pure CSS Tail Trails mapped to hardware coordinates */}
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="cursor-trail-optimized"
          style={{ '--delay': `${i * 25}ms` } as React.CSSProperties}
        />
      ))}

      {/* Optimized Explosions Node Pool */}
      {explosions.map((exp) => (
        <div key={exp.id} className="fission-explosion" style={{ left: exp.x, top: exp.y }}>
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
              } as React.CSSProperties}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default CursorEffects;
