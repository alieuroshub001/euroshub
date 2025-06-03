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
  const animationRef = useRef<number | undefined>(undefined);
  const starsRef = useRef<Star[]>([]);
  const shootingStarsRef = useRef<ShootingStar[]>([]);
  const dustCloudsRef = useRef<DustCloud[]>([]);
  const lastTimeRef = useRef<number>(0);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const SMALL_STARS_COUNT = 150;
  const LARGE_STARS_COUNT = 15;
  const SHOOTING_STARS_COUNT = 5;
  const DUST_CLOUDS_COUNT = 8;

  const initCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.clientWidth;
    let height = canvas.clientHeight;

    const resizeCanvas = () => {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width;
      canvas.height = height;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const randRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const stars: Star[] = [];
    for (let i = 0; i < SMALL_STARS_COUNT; i++) {
      stars.push({
        x: randRange(0, width),
        y: randRange(0, height),
        radius: randRange(0.5, 2),
        speed: randRange(0.05, 0.2),
        twinklePhase: randRange(0, Math.PI * 2),
        isLarge: false,
      });
    }
    for (let i = 0; i < LARGE_STARS_COUNT; i++) {
      stars.push({
        x: randRange(0, width),
        y: randRange(0, height),
        radius: randRange(2, 6),
        speed: randRange(0.02, 0.1),
        twinklePhase: randRange(0, Math.PI * 2),
        isLarge: true,
      });
    }
    starsRef.current = stars;

    const shootingStars: ShootingStar[] = [];
    for (let i = 0; i < SHOOTING_STARS_COUNT; i++) {
      shootingStars.push({
        x: randRange(0, width),
        y: randRange(0, height),
        length: randRange(60, 120),
        speed: randRange(0.8, 1.5),
        angle: randRange(-Math.PI / 4, Math.PI / 4),
        progress: 0,
        active: false,
      });
    }
    shootingStarsRef.current = shootingStars;

    const dustClouds: DustCloud[] = [];
    for (let i = 0; i < DUST_CLOUDS_COUNT; i++) {
      const radius = randRange(80, 200);
      const angle = randRange(0, Math.PI * 2);
      const speed = randRange(0.005, 0.02);
      dustClouds.push({
        x: randRange(0, width),
        y: randRange(0, height),
        radius,
        opacity: randRange(0.02, 0.08),
        speed,
        dx: Math.cos(angle),
        dy: Math.sin(angle),
      });
    }
    dustCloudsRef.current = dustClouds;

    const animate = (time: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = time;
      const delta = (time - lastTimeRef.current) / 16;
      lastTimeRef.current = time;

      ctx.clearRect(0, 0, width, height);

      dustCloudsRef.current.forEach((cloud) => {
        cloud.x += cloud.dx * cloud.speed * delta * 50;
        cloud.y += cloud.dy * cloud.speed * delta * 50;

        if (cloud.x - cloud.radius > width) cloud.x = -cloud.radius;
        if (cloud.x + cloud.radius < 0) cloud.x = width + cloud.radius;
        if (cloud.y - cloud.radius > height) cloud.y = -cloud.radius;
        if (cloud.y + cloud.radius < 0) cloud.y = height + cloud.radius;

        const grd = ctx.createRadialGradient(cloud.x, cloud.y, 0, cloud.x, cloud.y, cloud.radius);
        grd.addColorStop(0, `rgba(23, 23, 23, ${cloud.opacity})`);
        grd.addColorStop(1, 'rgba(23, 23, 23, 0)');
        ctx.beginPath();
        ctx.fillStyle = grd;
        ctx.arc(cloud.x, cloud.y, cloud.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      starsRef.current.forEach((star) => {
        star.twinklePhase += 0.02 * (star.isLarge ? 0.5 : 1);
        const baseAlpha = star.isLarge ? 0.6 : 0.3;
        const twinkle = baseAlpha + Math.sin(star.twinklePhase) * (star.isLarge ? 0.4 : 0.2);

        ctx.beginPath();
        ctx.fillStyle = star.isLarge ? `rgba(23, 182, 178, ${twinkle})` : `rgba(255,255,255, ${twinkle})`;
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();

        star.x += (Math.cos(star.twinklePhase) * star.speed * delta * 10);
        star.y += (Math.sin(star.twinklePhase) * star.speed * delta * 10);

        if (star.x > width + star.radius) star.x = -star.radius;
        if (star.x < -star.radius) star.x = width + star.radius;
        if (star.y > height + star.radius) star.y = -star.radius;
        if (star.y < -star.radius) star.y = height + star.radius;
      });

      shootingStarsRef.current.forEach((shoot) => {
        if (!shoot.active && Math.random() < 0.001 * delta) {
          shoot.active = true;
          shoot.x = randRange(0, width);
          shoot.y = randRange(0, height * 0.5);
          shoot.progress = 0;
          shoot.angle = randRange(-Math.PI / 3, -Math.PI / 6);
          shoot.speed = randRange(1.0, 1.5);
          shoot.length = randRange(80, 140);
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
          ctx.fillRect(0, -2, shoot.length, 4);
          ctx.restore();

          shoot.x += Math.cos(shoot.angle) * shoot.speed * delta * 15;
          shoot.y += Math.sin(shoot.angle) * shoot.speed * delta * 15;
          shoot.progress += shoot.speed * delta;

          if (shoot.x < -shoot.length || shoot.x > width + shoot.length ||
              shoot.y < -shoot.length || shoot.y > height + shoot.length ||
              shoot.progress > (width + height) / 100) {
            shoot.active = false;
          }
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  };

  useEffect(() => {
    const updateDarkMode = () => {
      const dark = document.body.classList.contains('dark');
      setIsDarkMode(dark);
    };

    updateDarkMode(); // initial check

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') updateDarkMode();
      });
    });

    observer.observe(document.body, { attributes: true });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      const cleanup = initCanvas();
      return cleanup;
    } else {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = undefined;
      }
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
