import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
}

const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

  const init = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = 700; // Fixed height for hero section
      initParticles();
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mousePositionRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };

    window.addEventListener('resize', handleResize);
    canvas.addEventListener('mousemove', handleMouseMove);
    
    handleResize();
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  };

  const initParticles = () => {
    if (!canvasRef.current) return;
    
    const particles: Particle[] = [];
    const particleCount = Math.min(Math.floor(window.innerWidth / 10), 100);
    const baseColor = isDarkMode ? '255, 255, 255' : '0, 0, 128'; 
    
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvasRef.current.width,
        y: Math.random() * canvasRef.current.height,
        size: Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        color: `rgba(${baseColor}, ${Math.random() * 0.3 + 0.1})`
      });
    }
    
    particlesRef.current = particles;
  };

  const animate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particlesRef.current.forEach((particle, i) => {
      // Move particles
      particle.x += particle.speedX;
      particle.y += particle.speedY;
      
      // Boundary check
      if (particle.x > canvas.width) particle.x = 0;
      else if (particle.x < 0) particle.x = canvas.width;
      
      if (particle.y > canvas.height) particle.y = 0;
      else if (particle.y < 0) particle.y = canvas.height;
      
      // Draw particle
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fillStyle = particle.color;
      ctx.fill();
      
      // Connect particles
      connectParticles(particle, i, ctx);
      
      // React to mouse
      const dx = mousePositionRef.current.x - particle.x;
      const dy = mousePositionRef.current.y - particle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < 100) {
        const angle = Math.atan2(dy, dx);
        particle.speedX += Math.cos(angle) * 0.02;
        particle.speedY += Math.sin(angle) * 0.02;
        
        // Limit speed
        const maxSpeed = 1.5;
        const speed = Math.sqrt(particle.speedX * particle.speedX + particle.speedY * particle.speedY);
        if (speed > maxSpeed) {
          particle.speedX = (particle.speedX / speed) * maxSpeed;
          particle.speedY = (particle.speedY / speed) * maxSpeed;
        }
      } else {
        // Apply drag to return to original speed
        particle.speedX *= 0.99;
        particle.speedY *= 0.99;
      }
    });
    
    requestAnimationFrame(animate);
  };

  const connectParticles = (particle: Particle, i: number, ctx: CanvasRenderingContext2D) => {
    const maxDistance = 100;
    
    for (let j = i + 1; j < particlesRef.current.length; j++) {
      const other = particlesRef.current[j];
      const dx = particle.x - other.x;
      const dy = particle.y - other.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < maxDistance) {
        const opacity = 1 - distance / maxDistance;
        const baseColor = isDarkMode ? '255, 255, 255' : '0, 0, 128';
        ctx.beginPath();
        ctx.strokeStyle = `rgba(${baseColor}, ${opacity * 0.2})`;
        ctx.lineWidth = 0.5;
        ctx.moveTo(particle.x, particle.y);
        ctx.lineTo(other.x, other.y);
        ctx.stroke();
      }
    }
  };

  useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 -z-10"
    />
  );
};

export default ParticleBackground;