"use client";
import React, { useRef, useEffect, useState } from 'react';

interface MarqueeProps {
  direction: 'left' | 'right';
  speed?: number;
  className?: string;
  children: React.ReactNode;
}

const Marquee: React.FC<MarqueeProps> = ({
  children,
  direction = 'left',
  speed = 25,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!scrollerRef.current || !containerRef.current) return;
    
    // Clone the content multiple times (3 copies total) for seamless looping
    const content = Array.from(scrollerRef.current.children);
    for (let i = 0; i < 4; i++) {
      content.forEach(item => {
        const clone = item.cloneNode(true);
        scrollerRef.current?.appendChild(clone);
      });
    }

    const updateAnimationDuration = () => {
      if (!scrollerRef.current) return;
      
      // Calculate duration based on one set of content (original + 2 clones = 3 sets)
      const scrollerWidth = scrollerRef.current.offsetWidth / 3;
      const duration = scrollerWidth / speed;
      
      scrollerRef.current.style.animationDuration = `${duration}s`;
    };

    updateAnimationDuration();
    window.addEventListener('resize', updateAnimationDuration);

    return () => {
      window.removeEventListener('resize', updateAnimationDuration);
    };
  }, [speed]);

  const marqueeStyles: React.CSSProperties = {
    display: 'inline-flex',
    gap: '1rem',
    flexWrap: 'nowrap',
    whiteSpace: 'nowrap',
    willChange: 'transform',
    animation: `marquee-${direction} linear infinite`,
    animationPlayState: isHovered ? 'paused' : 'running',
  };

  const containerStyles: React.CSSProperties = {
    overflow: 'hidden',
    position: 'relative',
  };

  return (
    <div 
      ref={containerRef}
      style={containerStyles}
      className={className}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <style>
        {`
          @keyframes marquee-left {
            0% { transform: translateX(0); }
            100% { transform: translateX(-33.333%); }
          }
          @keyframes marquee-right {
            0% { transform: translateX(-33.333%); }
            100% { transform: translateX(0); }
          }
        `}
      </style>
      <div
        ref={scrollerRef}
        style={marqueeStyles}
      >
        {children}
      </div>
    </div>
  );
};

export default Marquee;