import { useEffect, useState } from "react";

const FlyingDrone = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [angle, setAngle] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cameraAngle, setCameraAngle] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    // Calculate camera angle to point at mouse
    const dx = mousePosition.x - position.x;
    const dy = mousePosition.y - position.y;
    const angleToMouse = Math.atan2(dy, dx) * (180 / Math.PI);
    setCameraAngle(angleToMouse - angle);
  }, [mousePosition, position, angle]);

  useEffect(() => {
    let animationFrameId: number;
    let time = 0;

    const animate = () => {
      time += 0.005;
      
      // Create a figure-8 pattern across the screen
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const radiusX = window.innerWidth * 0.35;
      const radiusY = window.innerHeight * 0.3;
      
      const x = centerX + radiusX * Math.sin(time);
      const y = centerY + radiusY * Math.sin(time * 2) / 2;
      
      // Calculate angle based on movement direction
      const newAngle = Math.atan2(
        radiusY * Math.cos(time * 2),
        radiusX * Math.cos(time)
      ) * (180 / Math.PI);

      setPosition({ x, y });
      setAngle(newAngle);
      
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <div
      className="fixed pointer-events-none z-30"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: `translate(-50%, -50%) rotate(${angle}deg)`,
      }}
    >
      <div className="relative w-24 h-24">
        {/* Propeller animations at each corner */}
        <div className="absolute -top-1 -left-1 w-6 h-6">
          <div className="w-full h-full animate-spin" style={{ animationDuration: '0.1s' }}>
            <div className="w-full h-0.5 bg-primary/60 absolute top-1/2 left-0 transform -translate-y-1/2"></div>
            <div className="w-0.5 h-full bg-primary/60 absolute left-1/2 top-0 transform -translate-x-1/2"></div>
          </div>
        </div>
        
        <div className="absolute -top-1 -right-1 w-6 h-6">
          <div className="w-full h-full animate-spin" style={{ animationDuration: '0.1s' }}>
            <div className="w-full h-0.5 bg-primary/60 absolute top-1/2 left-0 transform -translate-y-1/2"></div>
            <div className="w-0.5 h-full bg-primary/60 absolute left-1/2 top-0 transform -translate-x-1/2"></div>
          </div>
        </div>
        
        <div className="absolute -bottom-1 -left-1 w-6 h-6">
          <div className="w-full h-full animate-spin" style={{ animationDuration: '0.1s' }}>
            <div className="w-full h-0.5 bg-primary/60 absolute top-1/2 left-0 transform -translate-y-1/2"></div>
            <div className="w-0.5 h-full bg-primary/60 absolute left-1/2 top-0 transform -translate-x-1/2"></div>
          </div>
        </div>
        
        <div className="absolute -bottom-1 -right-1 w-6 h-6">
          <div className="w-full h-full animate-spin" style={{ animationDuration: '0.1s' }}>
            <div className="w-full h-0.5 bg-primary/60 absolute top-1/2 left-0 transform -translate-y-1/2"></div>
            <div className="w-0.5 h-full bg-primary/60 absolute left-1/2 top-0 transform -translate-x-1/2"></div>
          </div>
        </div>

        {/* Drone arms */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-1 bg-primary/80 rotate-45"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-1 bg-primary/80 -rotate-45"></div>
        
        {/* Drone body */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-8 h-6 bg-green-500 rounded-lg shadow-[0_0_15px_rgba(34,197,94,0.6)] flex items-center justify-center">
            <span className="text-[8px] font-bold text-white">&lt;/&gt;</span>
            {/* Camera gimbal */}
            <div 
              className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-red-500 rounded-full transition-transform duration-100 shadow-[0_0_10px_rgba(239,68,68,0.6)]"
              style={{ transform: `translateX(-50%) rotate(${cameraAngle}deg)` }}
            >
              <div className="w-1 h-2 bg-red-600 absolute -bottom-1 left-1/2 transform -translate-x-1/2"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlyingDrone;
