import React, { useEffect, useState, useCallback } from 'react';
import { motion, useAnimation } from 'framer-motion';

const CosmicConnectionText: React.FC<{ text: string }> = ({ text }) => {
  const letters = text.split('');
  const controls = useAnimation();
  const [isMounted, setIsMounted] = useState(false);

  // Generate stable star positions
  const generateStarPositions = () => {
    const stars = [];
    // Use a fixed seed for consistent positions
    const seed = 12345;
    
    for (let i = 0; i < 15; i++) {
      // Simple pseudo-random generator using the seed
      const x = Math.sin(i + seed) * 8000;
      const rand = x - Math.floor(x);
      
      stars.push({
        width: `${rand * 3 + 1}px`,
        height: `${rand * 3 + 1}px`,
        top: `${rand * 100}%`,
        left: `${(Math.sin(i * 10 + seed) * 8000 - Math.floor(Math.sin(i * 10 + seed) * 8000)) * 100}%`,
      });
    }
    
    return stars;
  };

  // Floating stars background - only render on client
  const FloatingStars = () => {
    if (!isMounted) return null;
    
    const starPositions = generateStarPositions();
    
    return (
      <div className="absolute inset-0 overflow-hidden -z-20">
        {starPositions.map((star, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.8, 0] }}
            transition={{
              duration: 3 + (i % 4),
              delay: i * 0.2,
              repeat: Infinity,
              repeatType: 'loop',
            }}
            className="absolute rounded-full bg-white"
            style={{
              width: star.width,
              height: star.height,
              top: star.top,
              left: star.left,
              boxShadow: '0 0 5px 1px rgba(23, 182, 178, 0.8)',
            }}
          />
        ))}
      </div>
    );
  };

  // Animation sequence wrapped in useCallback to prevent recreation on every render
  const startAnimation = useCallback(async () => {
    await controls.start({
      opacity: 0,
      y: 50,
      rotate: 10,
      scale: 0.8,
    });
    
    // Reset all letters to initial state
    await controls.start({
      opacity: 0,
      y: 50,
      rotate: 10,
      scale: 0.8,
      transition: { duration: 0 }
    });
    
    // Animate letters in one by one
    await controls.start(i => ({
      opacity: 1,
      y: 0,
      rotate: 0,
      scale: 1,
      textShadow: [
        '0 0 0px rgba(255,255,255,0)',
        '0 0 10px rgba(23, 182, 178, 0.8)',
        '0 0 20px rgba(23, 182, 178, 0.5)',
        '0 0 10px rgba(23, 182, 178, 0.8)',
      ],
      transition: {
        delay: i * 0.1,
        duration: 1.5,
        type: 'spring',
        damping: 10,
        stiffness: 100,
        textShadow: {
          duration: 4,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut',
        }
      }
    }));
  }, [controls]);

  useEffect(() => {
    setIsMounted(true);
    startAnimation();
    
    const interval = setInterval(() => {
      startAnimation();
    }, 8000);

    return () => clearInterval(interval);
  }, [startAnimation]);

  return (
    <div className="relative inline-block">
      <FloatingStars />
      
      <div className="flex items-center justify-center">
        {letters.map((letter, index) => (
          <motion.span
            key={index}
            className="inline-block text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-black dark:text-white"
            custom={index}
            initial={{ 
              opacity: 0,
              y: 50,
              rotate: 10,
              scale: 0.8,
              textShadow: '0 0 0px rgba(255,255,255,0)'
            }}
            animate={controls}
            style={{
              background: 'linear-gradient(135deg, #17b6b2, #17b6b2)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              display: 'inline-block',
            }}
          >
            {letter === ' ' ? '\u00A0' : letter}
          </motion.span>
        ))}
      </div>
    </div>
  );
};

export default CosmicConnectionText;