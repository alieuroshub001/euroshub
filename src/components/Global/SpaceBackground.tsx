// components/Global/SpaceBackground.tsx
'use client';

import { useEffect, useRef } from 'react';

export default function SpaceBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const starsRef = useRef<Array<{ element: HTMLElement; speed: number; direction: { x: number; y: number } }>>([]);
  const lastTimeRef = useRef<number>(0);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const starsCount = 150;
    const largeStarsCount = 15;
    const shootingStarsCount = 5;
    const dustCloudsCount = 8;

    // Clear existing elements
    container.innerHTML = '';
    starsRef.current = [];

    // Create small moving stars
    for (let i = 0; i < starsCount; i++) {
      const star = document.createElement('div');
      star.className = 'space-star';
      
      // Random properties
      const size = Math.random() * 2 + 0.5;
      const speed = Math.random() * 0.2 + 0.1;
      const direction = {
        x: Math.random() * 2 - 1,
        y: Math.random() * 2 - 1
      };
      
      // Position
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const opacity = Math.random() * 0.7 + 0.3;
      
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.left = `${x}%`;
      star.style.top = `${y}%`;
      star.style.opacity = `${opacity}`;
      
      container.appendChild(star);
      starsRef.current.push({ element: star, speed, direction });
    }

    // Create larger twinkling stars
    for (let i = 0; i < largeStarsCount; i++) {
      const star = document.createElement('div');
      star.className = 'space-star-large';
      
      // Random properties
      const size = Math.random() * 4 + 2;
      const speed = Math.random() * 0.1 + 0.05;
      const direction = {
        x: Math.random() * 2 - 1,
        y: Math.random() * 2 - 1
      };
      const pulseSpeed = Math.random() * 5 + 5;
      
      // Position
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const opacity = Math.random() * 0.5 + 0.5;
      
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.left = `${x}%`;
      star.style.top = `${y}%`;
      star.style.opacity = `${opacity}`;
      star.style.animation = `pulseStar ${pulseSpeed}s ease-in-out infinite`;
      
      container.appendChild(star);
      starsRef.current.push({ element: star, speed, direction });
    }

    // Create shooting stars
    for (let i = 0; i < shootingStarsCount; i++) {
      const star = document.createElement('div');
      star.className = 'shooting-star';
      
      // Random properties
      const size = Math.random() * 2 + 1;
      const length = Math.random() * 100 + 50;
      const angle = Math.random() * 360;
      const speed = Math.random() * 0.5 + 0.3;
      const direction = {
        x: Math.random() * 2 - 1,
        y: Math.random() * 2 - 1
      };
      
      // Position
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      
      star.style.width = `${length}px`;
      star.style.height = `${size}px`;
      star.style.left = `${x}%`;
      star.style.top = `${y}%`;
      star.style.transform = `rotate(${angle}deg)`;
      star.style.opacity = '0';
      
      // Shooting animation
      const shoot = () => {
        star.style.transition = 'none';
        star.style.opacity = '0';
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        
        setTimeout(() => {
          star.style.transition = `opacity 0.5s ease-out, transform ${speed}s linear`;
          star.style.opacity = '1';
          star.style.transform = `translateX(${500 * direction.x}px) translateY(${500 * direction.y}px) rotate(${angle}deg)`;
          
          setTimeout(() => {
            star.style.opacity = '0';
            setTimeout(shoot, Math.random() * 10000 + 5000);
          }, speed * 1000);
        }, 50);
      };
      
      container.appendChild(star);
      shoot();
    }

    // Create cosmic dust clouds
    for (let i = 0; i < dustCloudsCount; i++) {
      const cloud = document.createElement('div');
      cloud.className = 'dust-cloud';
      
      // Random properties
      const size = Math.random() * 200 + 100;
      const speed = Math.random() * 0.05 + 0.02;
      const direction = {
        x: Math.random() * 2 - 1,
        y: Math.random() * 2 - 1
      };
      
      // Position
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const opacity = Math.random() * 0.1 + 0.05;
      
      cloud.style.width = `${size}px`;
      cloud.style.height = `${size}px`;
      cloud.style.left = `${x}%`;
      cloud.style.top = `${y}%`;
      cloud.style.opacity = `${opacity}`;
      
      container.appendChild(cloud);
      starsRef.current.push({ element: cloud, speed, direction });
    }

    // Animation loop
    const animate = (time: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = time;
      const deltaTime = time - lastTimeRef.current;
      lastTimeRef.current = time;

      starsRef.current.forEach((star) => {
        const rect = star.element.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        
        // Calculate current position in percentages
        let x = (rect.left - containerRect.left) / containerRect.width * 100;
        let y = (rect.top - containerRect.top) / containerRect.height * 100;
        
        // Update position based on direction and speed
        x += star.direction.x * star.speed * (deltaTime / 16);
        y += star.direction.y * star.speed * (deltaTime / 16);
        
        // Wrap around when going off screen
        if (x > 100) x = -5;
        if (x < -5) x = 100;
        if (y > 100) y = -5;
        if (y < -5) y = 100;
        
        star.element.style.left = `${x}%`;
        star.element.style.top = `${y}%`;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 -z-50 overflow-hidden pointer-events-none"
    />
  );
}