"use client";
import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react';

interface MarqueeProps {
  direction: 'left' | 'right';
  speed?: number;
  className?: string;
  children: React.ReactNode;
}

const Marquee: React.FC<MarqueeProps> = React.memo(({
  children,
  direction = 'left',
  speed = 25,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);

  // Memoize animation styles
  const animationName = useMemo(() => `marquee-${direction}`, [direction]);
  
  const updateAnimationDuration = useCallback(() => {
    if (!scrollerRef.current) return;
    
    const scrollerWidth = scrollerRef.current.offsetWidth / 3;
    const duration = scrollerWidth / speed;
    
    scrollerRef.current.style.animationDuration = `${duration}s`;
  }, [speed]);

  useEffect(() => {
    if (!scrollerRef.current || !containerRef.current) return;
    
    // Use DocumentFragment for better performance
    const fragment = document.createDocumentFragment();
    const content = Array.from(scrollerRef.current.children);
    
    // Clone content twice
    for (let i = 0; i < 2; i++) {
      content.forEach(item => {
        const clone = item.cloneNode(true) as Element;
        fragment.appendChild(clone);
      });
    }
    
    scrollerRef.current.appendChild(fragment);
    updateAnimationDuration();

    // Use ResizeObserver for better performance than resize event
    resizeObserverRef.current = new ResizeObserver(updateAnimationDuration);
    resizeObserverRef.current.observe(containerRef.current);

    return () => {
      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect();
      }
    };
  }, [updateAnimationDuration]);

  // Memoize styles to prevent recalculation
  const marqueeStyles = useMemo((): React.CSSProperties => ({
    display: 'inline-flex',
    gap: '1rem',
    flexWrap: 'nowrap',
    whiteSpace: 'nowrap',
    willChange: 'transform',
    animation: `${animationName} linear infinite`,
    animationPlayState: isHovered ? 'paused' : 'running',
  }), [animationName, isHovered]);

  const containerStyles = useMemo((): React.CSSProperties => ({
    overflow: 'hidden',
    position: 'relative',
  }), []);

  // Memoize keyframes to prevent recreation
  const keyframes = useMemo(() => `
    @keyframes marquee-left {
      0% { transform: translateX(0); }
      100% { transform: translateX(-33.333%); }
    }
    @keyframes marquee-right {
      0% { transform: translateX(-33.333%); }
      100% { transform: translateX(0); }
    }
  `, []);

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);

  return (
    <div 
      ref={containerRef}
      style={containerStyles}
      className={className}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <style>{keyframes}</style>
      <div
        ref={scrollerRef}
        style={marqueeStyles}
      >
        {children}
      </div>
    </div>
  );
});

Marquee.displayName = 'Marquee';

export default Marquee;