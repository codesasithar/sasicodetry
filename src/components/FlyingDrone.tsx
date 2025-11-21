import { useEffect, useState } from "react";
import { Plane } from "lucide-react";

const FlyingDrone = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [angle, setAngle] = useState(0);

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
      className="fixed pointer-events-none z-30 transition-transform duration-100"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: `translate(-50%, -50%) rotate(${angle}deg)`,
      }}
    >
      <Plane 
        className="h-8 w-8 text-primary drop-shadow-[0_0_8px_rgba(var(--primary),0.6)]" 
        fill="currentColor"
      />
    </div>
  );
};

export default FlyingDrone;
