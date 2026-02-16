import { useEffect, useState, useCallback } from 'react';

interface FissionExplosion {
  x: number;
  y: number;
  id: number;
  particles: Array<{ tx: number; ty: number; duration: number; type: 'cyan' | 'hot' | 'white' }>;
}

const CursorEffects = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [trails, setTrails] = useState<Array<{ x: number; y: number; id: number }>>([]);
  const [cursorText, setCursorText] = useState('');
  const [showCursorText, setShowCursorText] = useState(false);
  const [clock, setClock] = useState(new Date());
  const [isMobile, setIsMobile] = useState(false);
  const [touchRipples, setTouchRipples] = useState<Array<{ x: number; y: number; id: number }>>([]);
  const [explosions, setExplosions] = useState<FissionExplosion[]>([]);

  const createExplosion = useCallback((x: number, y: number) => {
    const particleCount = 10 + Math.floor(Math.random() * 6);
    const particles = Array.from({ length: particleCount }, () => {
      const angle = Math.random() * Math.PI * 2;
      const distance = 25 + Math.random() * 50;
      const types: Array<'cyan' | 'hot' | 'white'> = ['cyan', 'hot', 'white'];
      return {
        tx: Math.cos(angle) * distance,
        ty: Math.sin(angle) * distance,
        duration: 0.35 + Math.random() * 0.3,
        type: types[Math.floor(Math.random() * 3)],
      };
    });

    const explosion: FissionExplosion = { x, y, id: Date.now() + Math.random(), particles };
    setExplosions(prev => [...prev, explosion]);

    // Screen shake
    document.documentElement.classList.add('screen-shake');
    setTimeout(() => document.documentElement.classList.remove('screen-shake'), 300);

    setTimeout(() => {
      setExplosions(prev => prev.filter(e => e.id !== explosion.id));
    }, 700);
  }, []);

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    let trailId = 0;

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });

      // Add trail effect
      const newTrail = { x: e.clientX, y: e.clientY, id: trailId++ };
      setTrails((prev) => [...prev.slice(-6), newTrail]);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      if (target.matches('button, a, .btn-tech, .nav-link, .tech-card, .interactive-orb')) {
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

      if (target.matches('.cursor-magnetic')) {
        const rect = target.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const deltaX = (e.clientX - centerX) * 0.1;
        const deltaY = (e.clientY - centerY) * 0.1;
        target.style.setProperty('--cursor-x', `${deltaX}px`);
        target.style.setProperty('--cursor-y', `${deltaY}px`);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.matches('.cursor-magnetic')) {
        target.style.setProperty('--cursor-x', '0px');
        target.style.setProperty('--cursor-y', '0px');
      }
    };

    const handleClick = (e: MouseEvent) => {
      // Fission explosion on every click
      createExplosion(e.clientX, e.clientY);

      const target = e.target as HTMLElement;
      if (target.matches('.ripple-effect, button, .btn-tech')) {
        const rect = target.getBoundingClientRect();
        const ripple = document.createElement('div');
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.className = 'ripple';
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';

        const pos = getComputedStyle(target).position;
        if (pos !== 'absolute' && pos !== 'relative') {
          target.style.position = 'relative';
        }

        target.appendChild(ripple);
        setTimeout(() => ripple.remove(), 400);
      }
    };

    document.addEventListener('mousemove', updateMousePosition);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('mousemove', updateMousePosition);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      document.removeEventListener('click', handleClick);
    };
  }, [createExplosion]);

  // Touch event handlers for mobile
  useEffect(() => {
    if (!isMobile) return;

    let touchId = 0;

    const handleTouchStart = (e: TouchEvent) => {
      Array.from(e.touches).forEach((touch) => {
        // Create ripple effect
        const ripple = {
          x: touch.clientX,
          y: touch.clientY,
          id: touchId++
        };
        setTouchRipples((prev) => [...prev, ripple]);

        // Remove ripple after animation
        setTimeout(() => {
          setTouchRipples((prev) => prev.filter(r => r.id !== ripple.id));
        }, 600);
      });
    };

    const handleTouchMove = (e: TouchEvent) => {
      Array.from(e.touches).forEach((touch) => {
        // Create touch trail
        const trail = {
          x: touch.clientX,
          y: touch.clientY,
          id: touchId++
        };
        setTrails((prev) => [...prev.slice(-3), trail]);
      });
    };

    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchmove', handleTouchMove, { passive: true });

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
    };
  }, [isMobile]);

  // Clean up old trails
  useEffect(() => {
    const interval = setInterval(() => {
      setTrails((prev) => prev.slice(1));
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // Update clock every second
  useEffect(() => {
    const interval = setInterval(() => {
      setClock(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

const formatClock = (date: Date) => {
  return date
    .toLocaleTimeString('en-US', {
      hour12: true,       // 12-hour format
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
};

  return (
    <>
      {/* Custom white cursor */}
      <div
        className={`custom-cursor ${isHovering ? 'hovering' : ''} ${isClicking ? 'clicking' : ''}`}
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
        }}
      >
        {/* Nucleus */}
        <div className="cursor-nucleus" />
        {/* Orbit rings */}
        <div className="cursor-orbit cursor-orbit-1" />
        <div className="cursor-orbit cursor-orbit-2" />
        <div className="cursor-orbit cursor-orbit-3" />
        {/* Electrons */}
        <div className="cursor-electron cursor-electron-1" />
        <div className="cursor-electron cursor-electron-2" />
        <div className="cursor-electron cursor-electron-3" />
      </div>

      {/* Tech Clock near cursor - Hidden on mobile */}
      {!isMobile && (
        <div
          className="cursor-clock"
          style={{
            left: mousePosition.x + 36,
            top: mousePosition.y - 8,
          }}
        >
          <span>{formatClock(clock)}</span>
        </div>
      )}
      {/* Cursor Text */}
      <div
        className={`cursor-text ${showCursorText ? 'visible' : ''}`}
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
        }}
      >
        {cursorText}
      </div>

      {/* Cursor Trails */}
      {trails.map((trail, index) => (
        <div
          key={trail.id}
          className="cursor-trail"
          style={{
            left: trail.x,
            top: trail.y,
            opacity: ((index + 1) / trails.length) * 0.5,
            transform: `scale(${(index + 1) / trails.length})`,
          }}
        />
      ))}

      {/* Touch Ripples for Mobile */}
      {isMobile && touchRipples.map((ripple) => (
        <div
          key={ripple.id}
          className="touch-ripple"
          style={{
            left: ripple.x,
            top: ripple.y,
          }}
        />
      ))}

      {/* Fission Explosions */}
      {explosions.map((exp) => (
        <div
          key={exp.id}
          className="fission-explosion"
          style={{ left: exp.x, top: exp.y }}
        >
          <div className="fission-flash" />
          <div className="fission-shockwave" />
          {exp.particles.map((p, i) => (
            <div
              key={i}
              className={`fission-particle ${p.type === 'hot' ? 'hot' : p.type === 'white' ? 'white' : ''}`}
              style={{
                '--tx': `${p.tx}px`,
                '--ty': `${p.ty}px`,
                '--duration': `${p.duration}s`,
              } as React.CSSProperties}
            />
          ))}
        </div>
      ))}
    </>
  );
};

export default CursorEffects;
