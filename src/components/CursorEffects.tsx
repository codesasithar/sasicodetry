import { useEffect, useState } from 'react';

const CursorEffects = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [trails, setTrails] = useState<Array<{ x: number; y: number; id: number }>>([]);
  const [cursorText, setCursorText] = useState('');
  const [showCursorText, setShowCursorText] = useState(false);
  const [clock, setClock] = useState(new Date());

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

        // Only set position if not already relative or absolute
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
  }, []);

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

  // Format time as HH:MM:SS
  const formatClock = (date: Date) => {
    return date
      .toLocaleTimeString('en-GB', { hour12: false })
      .slice(0, 8);
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
      />

      {/* Tech Clock near cursor */}
      <div
        className="cursor-clock"
        style={{
          left: mousePosition.x + 36, // Offset from cursor
          top: mousePosition.y - 8,
        }}
      >
        <span>{formatClock(clock)}</span>
      </div>

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
    </>
  );
};

export default CursorEffects;
