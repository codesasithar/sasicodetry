import { useEffect, useRef } from 'react';

const MatrixBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const mobileViewport = window.matchMedia('(max-width: 767px)');
    let fontSize = mobileViewport.matches ? 18 : 14;
    let drops: number[] = [];

    // Set canvas size to window size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      fontSize = mobileViewport.matches ? 18 : 14;
      drops = Array.from({ length: Math.floor(canvas.width / fontSize) }, () => 1);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Matrix characters - authentic mix of Katakana, Latin letters, and numbers
    const matrix = "アィゥエォカガキギクグケゲコゴサザシジスズセゼソゾタダチヂツヅテデトドナニヌネノハバパヒビピフブプヘベペホボポマミムメモヤユヨラリルレロヮワヰヱヲンヴヵヶABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&%+-/~{[|`]}";

    // Create array of characters
    const matrixChars = matrix.split("");

    // Draw function
    const draw = () => {
      // Keep the familiar dark trail and classic green Matrix glyphs.
      ctx.fillStyle = "rgba(0, 0, 0, 0.04)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

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
    let lastFrame = 0;
    const animate = (time: number) => {
      if (document.hidden) {
        animationRef.current = undefined;
        lastFrame = 0;
        return;
      }
      const frameInterval = mobileViewport.matches ? 1000 / 30 : 0;
      if (!lastFrame || !frameInterval || time - lastFrame >= frameInterval) {
        draw();
        lastFrame = time;
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    const onVisibilityChange = () => {
      if (!document.hidden && !animationRef.current) {
        lastFrame = 0;
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    document.addEventListener('visibilitychange', onVisibilityChange);
    animationRef.current = requestAnimationFrame(animate);

    // Cleanup function
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      document.removeEventListener('visibilitychange', onVisibilityChange);
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
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
};

export default MatrixBackground;
