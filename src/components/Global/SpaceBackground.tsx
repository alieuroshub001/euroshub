// components/Global/SpaceBackground.tsx
'use client';

import { useEffect, useRef } from 'react';
import { SpaceMovement, SpaceElement } from './spacemovement';

export default function SpaceBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const movementRef = useRef<SpaceMovement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const starsCount = 150;
    const largeStarsCount = 15;
    const shootingStarsCount = 5;
    const dustCloudsCount = 8;

    // Clear existing elements
    container.innerHTML = '';
    
    // Initialize movement system
    movementRef.current = new SpaceMovement(container);
    const movableElements: SpaceElement[] = [];

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
      movableElements.push({ element: star, speed, direction });
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
      movableElements.push({ element: star, speed, direction });
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
      
      container.appendChild(star);
      
      // Use the movement system's shooting star method
      movementRef.current.createShootingStar(star, speed, direction);
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
      movableElements.push({ element: cloud, speed, direction });
    }

    // Add all movable elements to the movement system
    movementRef.current.addElements(movableElements);
    
    // Start the animation
    movementRef.current.start();

    return () => {
      if (movementRef.current) {
        movementRef.current.stop();
        movementRef.current = null;
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