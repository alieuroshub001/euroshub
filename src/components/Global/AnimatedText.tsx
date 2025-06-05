import React, { useEffect, useState, useCallback } from 'react';
import { motion, useAnimation } from 'framer-motion';

const CosmicConnectionText: React.FC<{ text: string }> = ({ text }) => {
  const letters = text.split('');
  const controls = useAnimation();
  const [isMounted, setIsMounted] = useState(false);

  // Generate stable star positions
  const generateStarPositions = () => {
    const stars = [];
    const seed = 12345;
    
    for (let i = 0; i < 15; i++) {
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

  const startAnimation = useCallback(async () => {
    await controls.start({
      opacity: 0,
      y: 50,
      rotate: 10,
      scale: 0.8,
    });
    
    await controls.start({
      opacity: 0,
      y: 50,
      rotate: 10,
      scale: 0.8,
      transition: { duration: 0 }
    });
    
    // Animate letters with special treatment for 'E'
    await controls.start(i => {
      const isE = letters[i] === 'E';
      return {
        opacity: 1,
        y: isE ? 8 : 0, // E is slightly lower
        rotate: isE ? -5 : 0, // E is tilted
        scale: 1,
        textShadow: [
          '0 0 0px rgba(255,255,255,0)',
          '0 0 15px rgba(23, 182, 178, 0.9)',
          '0 0 25px rgba(23, 182, 178, 0.7)',
          '0 0 15px rgba(23, 182, 178, 0.9)',
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
      };
    });

    // Add blinking effect specifically for 'E' letters
    letters.forEach((letter, index) => {
      if (letter === 'E') {
        controls.start({
          opacity: [1, 0.1, 1, 0.1, 1, 0.1, 1],
          transition: {
            delay: index * 0.1 + 1.5,
            duration: 2,
            repeat: Infinity,
            repeatDelay: 3,
            ease: "easeInOut"
          }
        });
      }
    });
  }, [controls, letters]);

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
            className={`inline-block text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight ${
              letter === 'E' ? 'relative top-[8px]' : ''
            }`}
            custom={index}
            initial={{ 
              opacity: 0,
              y: 50,
              rotate: letter === 'E' ? -5 : 10,
              scale: 0.8,
              textShadow: '0 0 0px rgba(255,255,255,0)'
            }}
            animate={controls}
            style={{
              background: 'linear-gradient(135deg, #17b6b2, #0FB8AF)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              display: 'inline-block',
              filter: 'drop-shadow(0 0 8px rgba(23, 182, 178, 0.9))',
              transform: letter === 'E' ? 'rotate(-5deg)' : 'none',
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