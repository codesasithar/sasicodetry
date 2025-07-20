import { useEffect, useRef, useState } from 'react';

const MatrixBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size to window size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Matrix characters - authentic mix of Katakana, Latin letters, and numbers
    const matrix = "アィゥエォカガキギクグケゲコゴサザシジスズセゼソゾタダチヂツヅテデトドナニヌネノハバパヒビピフブプヘベペホボポマミムメモヤユヨラリルレロヮワヰヱヲンヴヵヶABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&%+-/~{[|`]}";

    // Create array of characters
    const matrixChars = matrix.split("");

    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);

    // Array to hold y-position of each column
    const drops: number[] = [];

    // Initialize drops array
    for (let x = 0; x < columns; x++) {
      drops[x] = 1;
    }

    // Draw function
    const draw = () => {
      // Black background with slight transparency for trail effect
      ctx.fillStyle = "rgba(0, 0, 0, 0.04)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Green text
      ctx.fillStyle = "#00ff00";
      ctx.font = fontSize + "px 'Courier New', monospace";

      // Loop over drops
      for (let i = 0; i < drops.length; i++) {
        // Random character from matrix string
        const text = matrixChars[Math.floor(Math.random() * matrixChars.length)];

        // Draw the character
        ctx.fillStyle = "#00ff00";
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // Make the leading character slightly brighter (white)
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        // Increment Y coordinate
        drops[i]++;

        // Reset drop to top randomly
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
      }
    };

    // Animation loop
    const animate = () => {
      draw();
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup function
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="matrix-background"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
        pointerEvents: 'none',
      }}
    />
  );
};

export default MatrixBackground;