'use client';

import { useEffect, useRef, useState } from 'react';

type Star = {
  x: number;
  y: number;
  radius: number;
  speed: number;
  twinklePhase: number;
  isLarge: boolean;
};

type ShootingStar = {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number;
  progress: number;
  active: boolean;
};

type DustCloud = {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  speed: number;
  dx: number;
  dy: number;
};

export default function SpaceBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const starsRef = useRef<Star[]>([]);
  const shootingStarsRef = useRef<ShootingStar[]>([]);
  const dustCloudsRef = useRef<DustCloud[]>([]);
  const lastTimeRef = useRef<number>(0);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const SMALL_STARS = 150;
  const LARGE_STARS = 15;
  const SHOOTING_STARS = 5;
  const DUST_CLOUDS = 8;

  const rand = (min: number, max: number) => Math.random() * (max - min) + min;

  const initCanvas = () => {
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

    const stars: Star[] = Array.from({ length: SMALL_STARS + LARGE_STARS }, (_, i) => {
      const isLarge = i >= SMALL_STARS;
      return {
        x: rand(0, width),
        y: rand(0, height),
        radius: rand(isLarge ? 2 : 0.5, isLarge ? 6 : 2),
        speed: rand(isLarge ? 0.02 : 0.05, isLarge ? 0.1 : 0.2),
        twinklePhase: rand(0, Math.PI * 2),
        isLarge,
      };
    });
    starsRef.current = stars;

    shootingStarsRef.current = Array.from({ length: SHOOTING_STARS }, () => ({
      x: 0,
      y: 0,
      length: rand(60, 120),
      speed: rand(0.8, 1.5),
      angle: rand(-Math.PI / 4, Math.PI / 4),
      progress: 0,
      active: false,
    }));

    dustCloudsRef.current = Array.from({ length: DUST_CLOUDS }, () => {
      const radius = rand(80, 200);
      const angle = rand(0, Math.PI * 2);
      return {
        x: rand(0, width),
        y: rand(0, height),
        radius,
        opacity: rand(0.03, 0.06),
        speed: rand(0.005, 0.02),
        dx: Math.cos(angle),
        dy: Math.sin(angle),
      };
    });

    const animate = (time: number) => {
      const delta = (time - lastTimeRef.current) / 16;
      lastTimeRef.current = time;

      ctx.clearRect(0, 0, width, height);

      // Dust clouds
      for (const cloud of dustCloudsRef.current) {
        cloud.x += cloud.dx * cloud.speed * delta * 50;
        cloud.y += cloud.dy * cloud.speed * delta * 50;

        if (cloud.x - cloud.radius > width) cloud.x = -cloud.radius;
        if (cloud.x + cloud.radius < 0) cloud.x = width + cloud.radius;
        if (cloud.y - cloud.radius > height) cloud.y = -cloud.radius;
        if (cloud.y + cloud.radius < 0) cloud.y = height + cloud.radius;

        const grd = ctx.createRadialGradient(cloud.x, cloud.y, 0, cloud.x, cloud.y, cloud.radius);
        grd.addColorStop(0, `rgba(80,80,80,${cloud.opacity})`);
        grd.addColorStop(1, 'rgba(80,80,80,0)');
        ctx.beginPath();
        ctx.fillStyle = grd;
        ctx.arc(cloud.x, cloud.y, cloud.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // Stars
      for (const star of starsRef.current) {
        star.twinklePhase += 0.02 * (star.isLarge ? 0.5 : 1);
        const twinkle = (star.isLarge ? 0.6 : 0.3) + Math.sin(star.twinklePhase) * (star.isLarge ? 0.4 : 0.2);

        ctx.beginPath();
        ctx.fillStyle = star.isLarge
          ? `rgba(173,216,230,${twinkle})`
          : `rgba(255,255,255,${twinkle})`;
        ctx.shadowColor = 'rgba(255,255,255,0.2)';
        ctx.shadowBlur = star.isLarge ? 8 : 4;
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        star.x += Math.cos(star.twinklePhase) * star.speed * delta * 5;
        star.y += Math.sin(star.twinklePhase) * star.speed * delta * 5;

        if (star.x > width + star.radius) star.x = -star.radius;
        if (star.x < -star.radius) star.x = width + star.radius;
        if (star.y > height + star.radius) star.y = -star.radius;
        if (star.y < -star.radius) star.y = height + star.radius;
      }

      // Shooting stars
      for (const shoot of shootingStarsRef.current) {
        if (!shoot.active && Math.random() < 0.001 * delta) {
          shoot.active = true;
          shoot.x = rand(0, width);
          shoot.y = rand(0, height * 0.5);
          shoot.progress = 0;
          shoot.angle = rand(-Math.PI / 3, -Math.PI / 6);
          shoot.speed = rand(1.0, 1.5);
          shoot.length = rand(80, 140);
        }

        if (shoot.active) {
          ctx.save();
          ctx.translate(shoot.x, shoot.y);
          ctx.rotate(shoot.angle);
          const grad = ctx.createLinearGradient(0, 0, shoot.length, 0);
          grad.addColorStop(0, 'rgba(255,255,255,0)');
          grad.addColorStop(0.5, 'rgba(255,255,255,0.8)');
          grad.addColorStop(1, 'rgba(255,255,255,0)');
          ctx.fillStyle = grad;
          ctx.fillRect(0, -1.5, shoot.length, 3);
          ctx.restore();

          shoot.x += Math.cos(shoot.angle) * shoot.speed * delta * 15;
          shoot.y += Math.sin(shoot.angle) * shoot.speed * delta * 15;
          shoot.progress += shoot.speed * delta;

          if (
            shoot.x < -shoot.length ||
            shoot.x > width + shoot.length ||
            shoot.y < -shoot.length ||
            shoot.y > height + shoot.length ||
            shoot.progress > (width + height) / 100
          ) {
            shoot.active = false;
          }
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame((time) => {
      lastTimeRef.current = time;
      animate(time);
    });

    return () => {
      window.removeEventListener('resize', resize);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  };

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
  }, [isDarkMode]);

  if (!isDarkMode) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-50 w-full h-full pointer-events-none"
      style={{ background: 'radial-gradient(circle at center, #000010, #000000)' }}
    />
  );
}
