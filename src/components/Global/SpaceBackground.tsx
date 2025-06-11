'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

type Star = {
  x: number;
  y: number;
  brightness: number;
  size: number;
  twinkleSpeed: number;
  twinklePhase: number;
}

type Planet = {
  x: number;
  y: number;
  radius: number;
  color: string;
  opacity: number;
  ringOpacity?: number;
  ringRadius?: number;
};

export default function MinimalSpaceBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const starsRef = useRef<Star[]>([]);
  const planetsRef = useRef<Planet[]>([]);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const STAR_COUNT = 80;
  const PLANET_COUNT = 2;

  const rand = (min: number, max: number) => Math.random() * (max - min) + min;

  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.clientWidth;
    let height = canvas.clientHeight;
    const pixelRatio = window.devicePixelRatio || 1;

    const resize = () => {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * pixelRatio;
      canvas.height = height * pixelRatio;
      ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    };

    resize();
    window.addEventListener('resize', resize);

    // Generate realistic star field
    starsRef.current = Array.from({ length: STAR_COUNT }, () => ({
      x: rand(0, width),
      y: rand(0, height),
      brightness: rand(0.3, 1.0),
      size: rand(0.5, 1.5),
      twinkleSpeed: rand(0.01, 0.03),
      twinklePhase: rand(0, Math.PI * 2),
    }));

    // Generate distant planets
    planetsRef.current = Array.from({ length: PLANET_COUNT }, (_, i) => {
      const hasRings = Math.random() > 0.7;
      const radius = rand(20, 40);
      const colors = ['#4a5568', '#2d3748', '#1a202c', '#2c5282'];
      
      return {
        x: i === 0 ? rand(50, width * 0.3) : rand(width * 0.7, width - 50),
        y: rand(50, height - 50),
        radius,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: rand(0.15, 0.3),
        ringOpacity: hasRings ? rand(0.1, 0.2) : undefined,
        ringRadius: hasRings ? radius * rand(1.5, 2.2) : undefined,
      };
    });

    const animate = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      // Draw subtle nebula effect
      const nebula = ctx.createRadialGradient(
        width * 0.3, height * 0.2, 0,
        width * 0.3, height * 0.2, width * 0.8
      );
      nebula.addColorStop(0, 'rgba(25, 25, 50, 0.08)');
      nebula.addColorStop(0.5, 'rgba(15, 15, 30, 0.04)');
      nebula.addColorStop(1, 'rgba(5, 5, 15, 0)');
      ctx.fillStyle = nebula;
      ctx.fillRect(0, 0, width, height);

      // Draw distant planets
      for (const planet of planetsRef.current) {
        // Planet shadow effect
        const gradient = ctx.createRadialGradient(
          planet.x - planet.radius * 0.3,
          planet.y - planet.radius * 0.3,
          0,
          planet.x,
          planet.y,
          planet.radius
        );
        gradient.addColorStop(0, `${planet.color}${Math.floor(planet.opacity * 255).toString(16).padStart(2, '0')}`);
        gradient.addColorStop(1, `${planet.color}${Math.floor(planet.opacity * 0.3 * 255).toString(16).padStart(2, '0')}`);

        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.arc(planet.x, planet.y, planet.radius, 0, Math.PI * 2);
        ctx.fill();

        // Draw rings if present
        if (planet.ringOpacity && planet.ringRadius) {
          ctx.save();
          ctx.globalAlpha = planet.ringOpacity;
          ctx.strokeStyle = planet.color;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.ellipse(planet.x, planet.y, planet.ringRadius, planet.ringRadius * 0.2, 0, 0, Math.PI * 2);
          ctx.stroke();
          ctx.restore();
        }
      }

      // Draw stars with realistic twinkling
      for (const star of starsRef.current) {
        star.twinklePhase += star.twinkleSpeed;
        const twinkle = 0.6 + Math.sin(star.twinklePhase) * 0.4;
        const currentBrightness = star.brightness * twinkle;

        // Realistic star colors based on brightness
        let color;
        if (currentBrightness > 0.8) {
          color = `rgba(255, 255, 255, ${currentBrightness})`;
        } else if (currentBrightness > 0.6) {
          color = `rgba(255, 248, 240, ${currentBrightness})`;
        } else {
          color = `rgba(240, 240, 255, ${currentBrightness})`;
        }

        ctx.beginPath();
        ctx.fillStyle = color;
        
        // Subtle glow for brighter stars
        if (currentBrightness > 0.7) {
          ctx.shadowColor = color;
          ctx.shadowBlur = 2;
        }
        
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Add very subtle star field depth with tiny distant stars
      ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
      for (let i = 0; i < 200; i++) {
        const x = (time * 0.001 + i * 137.5) % width;
        const y = (time * 0.0007 + i * 234.7) % height;
        ctx.fillRect(x, y, 0.5, 0.5);
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resize);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDarkMode(document.body.classList.contains('dark'));
    });

    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    setIsDarkMode(document.body.classList.contains('dark'));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isDarkMode) return initCanvas();
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
  }, [isDarkMode, initCanvas]);

  if (!isDarkMode) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-50 w-full h-full pointer-events-none"
      style={{ 
        background: 'linear-gradient(180deg, #000008 0%, #000015 50%, #000008 100%)'
      }}
    />
  );
}