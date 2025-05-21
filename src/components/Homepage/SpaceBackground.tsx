'use client';

import { useEffect, useRef } from 'react';

export default function SpaceBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas to full window size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Stars array
    const stars: { x: number; y: number; radius: number; vx: number; vy: number }[] = [];
    const STAR_COUNT = 300;
    const STAR_SPEED = 0.03;

    // Planets array
    const planets = [
      {
        x: canvas.width * 0.2,
        y: canvas.height * 0.3,
        radius: 40,
        color: 'rgba(23, 182, 178, 0.2)', // Using primary color
        orbitRadius: 150,
        angle: 0,
        speed: 0.002
      },
      {
        x: canvas.width * 0.7,
        y: canvas.height * 0.6,
        radius: 30,
        color: 'rgba(142, 45, 226, 0.2)', // Purple
        orbitRadius: 100,
        angle: Math.PI,
        speed: 0.003
      }
    ];

    // Create stars
    for (let i = 0; i < STAR_COUNT; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5,
        vx: Math.floor(Math.random() * 50) - 25,
        vy: Math.floor(Math.random() * 50) - 25
      });
    }

    // Animation loop
    let animationFrameId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw stars
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
        
        // Move stars
        star.x += star.vx * STAR_SPEED;
        star.y += star.vy * STAR_SPEED;
        
        // Reset stars that go off screen
        if (star.x < 0 || star.x > canvas.width || star.y < 0 || star.y > canvas.height) {
          star.x = Math.random() * canvas.width;
          star.y = Math.random() * canvas.height;
        }
      });

      // Draw planets
      planets.forEach(planet => {
        // Update planet position in orbit
        planet.angle += planet.speed;
        const orbitX = canvas.width / 2 + Math.cos(planet.angle) * planet.orbitRadius;
        const orbitY = canvas.height / 2 + Math.sin(planet.angle) * planet.orbitRadius;
        
        // Draw planet
        ctx.beginPath();
        ctx.arc(orbitX, orbitY, planet.radius, 0, Math.PI * 2);
        ctx.fillStyle = planet.color;
        ctx.fill();
        
        // Add glow effect
        const gradient = ctx.createRadialGradient(
          orbitX, orbitY, planet.radius * 0.5,
          orbitX, orbitY, planet.radius * 1.5
        );
        gradient.addColorStop(0, planet.color);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        
        ctx.beginPath();
        ctx.arc(orbitX, orbitY, planet.radius * 1.5, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      });

      // Add some shooting stars occasionally
      if (Math.random() > 0.99) {
        const shootingStar = {
          x: Math.random() * canvas.width,
          y: 0,
          radius: 2,
          vx: (Math.random() - 0.5) * 10,
          vy: 5 + Math.random() * 5
        };
        
        const animateShootingStar = () => {
          ctx.beginPath();
          ctx.arc(shootingStar.x, shootingStar.y, shootingStar.radius, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
          ctx.fill();
          
          // Create tail
          ctx.beginPath();
          ctx.moveTo(shootingStar.x, shootingStar.y);
          ctx.lineTo(
            shootingStar.x - shootingStar.vx * 3,
            shootingStar.y - shootingStar.vy * 3
          );
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
          ctx.lineWidth = 1;
          ctx.stroke();
          
          shootingStar.x += shootingStar.vx;
          shootingStar.y += shootingStar.vy;
          
          if (shootingStar.y < canvas.height && shootingStar.x > 0 && shootingStar.x < canvas.width) {
            requestAnimationFrame(animateShootingStar);
          }
        };
        
        animateShootingStar();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10 opacity-20 pointer-events-none"
    />
  );
}