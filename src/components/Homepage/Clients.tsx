'use client';

import Image from 'next/image';
import React, { useState, useRef, useEffect } from 'react';

const logos = [
  'BH.png',
  'Bucksaw.png',
  'InData.png',
  'Jimmy.png',
  'Mastery Learning.png',
  'Miss Meno.png',
  'motiV8.png',
  'My math experts.png',
  'My speaking score.png',
  'North Data.png',
  'Proventas.png',
  'Sheffield.png',
  'Sisters Helping Seniors.png',
  'SW.png',
  'Zuri bella.png',
];

// Function to shuffle array
const shuffleArray = (array: string[]) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

export default function Clients() {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const marqueeRef1 = useRef<HTMLDivElement>(null);
  const marqueeRef2 = useRef<HTMLDivElement>(null);
  const marqueeRef3 = useRef<HTMLDivElement>(null);
  const marqueeRef4 = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const animationRef = useRef<number | null>(null);
  const positionRef = useRef(0);
  const speed = 1;
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Create shuffled versions of the logos
  const shuffledLogos1 = useRef(shuffleArray(logos)).current;
  const shuffledLogos2 = useRef(shuffleArray(logos)).current;
  const shuffledLogos3 = useRef(shuffleArray(logos)).current;
  const shuffledLogos4 = useRef(shuffleArray(logos)).current;

  // Calculate marquee width once
  const marqueeWidth = useRef(0);

  useEffect(() => {
    if (marqueeRef1.current) {
      const firstItem = marqueeRef1.current.children[0] as HTMLElement;
      if (firstItem) {
        const itemWidth = firstItem.offsetWidth;
        marqueeWidth.current = itemWidth * logos.length;
      }
    }

    // Infinite animation loop
    const animate = () => {
      if (!isPaused && !isDragging) {
        positionRef.current += speed;
        
        // Apply the same position to all marquees with modulo for infinite effect
        const modPosition = positionRef.current % marqueeWidth.current;
        
        if (marqueeRef1.current) {
          marqueeRef1.current.style.transform = `translateX(${-modPosition}px)`;
        }
        if (marqueeRef2.current) {
          marqueeRef2.current.style.transform = `translateX(${-modPosition}px)`;
        }
        if (marqueeRef3.current) {
          marqueeRef3.current.style.transform = `translateX(${-modPosition}px)`;
        }
        if (marqueeRef4.current) {
          marqueeRef4.current.style.transform = `translateX(${-modPosition}px)`;
        }
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPaused, isDragging]);

  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    if (!isDragging) {
      setIsPaused(false);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setScrollLeft(positionRef.current);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsPaused(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    const x = e.clientX;
    const walk = (x - startX) * 2;
    
    const newPosition = scrollLeft - walk;
    positionRef.current = newPosition;

    // Use modulo to create infinite scroll effect
    const modPosition = newPosition % marqueeWidth.current;
    
    if (marqueeRef1.current) {
      marqueeRef1.current.style.transform = `translateX(${-modPosition}px)`;
    }
    if (marqueeRef2.current) {
      marqueeRef2.current.style.transform = `translateX(${-modPosition}px)`;
    }
    if (marqueeRef3.current) {
      marqueeRef3.current.style.transform = `translateX(${-modPosition}px)`;
    }
    if (marqueeRef4.current) {
      marqueeRef4.current.style.transform = `translateX(${-modPosition}px)`;
    }
  };

  // Generate 10 sets of logo duplicates for truly infinite scrolling
  const generateInfiniteLogos = (logos: string[]) => {
    return Array(10).fill(null).flatMap(() => [...logos]);
  };

  return (
    <section className="relative -top-[165px] py-0 text-[var(--foreground)] w-full bg-transparent">
      <div className="w-full mx-auto">
        {/* First two marquees (above the heading) */}
        <div 
          ref={containerRef}
          className="relative overflow-hidden w-full rounded-xl cursor-grab bg-transparent mb-12"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
          {/* First Marquee (Left to Right) */}
          <div 
            ref={marqueeRef1}
            className="flex whitespace-nowrap items-center py-8 w-max will-change-transform"
          >
            {generateInfiniteLogos(shuffledLogos1).map((logo, i) => (
              <div 
                key={`top1-${i}`}
                className="mx-10 flex-shrink-0"
              >
                <div className="p-4 rounded-lg">
                  <Image
                    src={`/assets/clients/${logo}`}
                    alt={`Client Logo ${i}`}
                    width={200}
                    height={100}
                    className={`object-contain h-24 w-auto hover:scale-110 transition-transform duration-300 [filter:drop-shadow(0_0_1px_rgba(0,0,0,0.3))_drop-shadow(0_0_1px_rgba(0,0,0,0.3))] dark:[filter:drop-shadow(0_0_1px_rgba(255,255,255,0.3))_drop-shadow(0_0_1px_rgba(255,255,255,0.3))]`}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Second Marquee (Right to Left) */}
          <div 
            ref={marqueeRef2}
            className="flex whitespace-nowrap items-center py-8 w-max will-change-transform"
          >
            {generateInfiniteLogos(shuffledLogos2).map((logo, i) => (
              <div 
                key={`top2-${i}`}
                className="mx-10 flex-shrink-0"
              >
                <div className="p-4 rounded-lg">
                  <Image
                    src={`/assets/clients/${logo}`}
                    alt={`Client Logo ${i}`}
                    width={200}
                    height={100}
                    className={`object-contain h-24 w-auto hover:scale-110 transition-transform duration-300 [filter:drop-shadow(0_0_1px_rgba(0,0,0,0.3))_drop-shadow(0_0_1px_rgba(0,0,0,0.3))] dark:[filter:drop-shadow(0_0_1px_rgba(255,255,255,0.3))_drop-shadow(0_0_1px_rgba(255,255,255,0.3))]`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Trusted by Global Brands
        </h2>

        {/* Last two marquees (below the heading) */}
        <div 
          ref={containerRef}
          className="relative overflow-hidden w-full rounded-xl cursor-grab bg-transparent"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
          {/* Third Marquee (Left to Right) */}
          <div 
            ref={marqueeRef3}
            className="flex whitespace-nowrap items-center py-8 w-max will-change-transform"
          >
            {generateInfiniteLogos(shuffledLogos3).map((logo, i) => (
              <div 
                key={`bottom1-${i}`}
                className="mx-10 flex-shrink-0"
              >
                <div className="p-4 rounded-lg">
                  <Image
                    src={`/assets/clients/${logo}`}
                    alt={`Client Logo ${i}`}
                    width={200}
                    height={100}
                    className={`object-contain h-24 w-auto hover:scale-110 transition-transform duration-300 [filter:drop-shadow(0_0_1px_rgba(0,0,0,0.3))_drop-shadow(0_0_1px_rgba(0,0,0,0.3))] dark:[filter:drop-shadow(0_0_1px_rgba(255,255,255,0.3))_drop-shadow(0_0_1px_rgba(255,255,255,0.3))]`}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Fourth Marquee (Right to Left) */}
          <div 
            ref={marqueeRef4}
            className="flex whitespace-nowrap items-center py-8 w-max will-change-transform"
          >
            {generateInfiniteLogos(shuffledLogos4).map((logo, i) => (
              <div 
                key={`bottom2-${i}`}
                className="mx-10 flex-shrink-0"
              >
                <div className="p-4 rounded-lg">
                  <Image
                    src={`/assets/clients/${logo}`}
                    alt={`Client Logo ${i}`}
                    width={200}
                    height={100}
                    className={`object-contain h-24 w-auto hover:scale-110 transition-transform duration-300 [filter:drop-shadow(0_0_1px_rgba(0,0,0,0.3))_drop-shadow(0_0_1px_rgba(0,0,0,0.3))] dark:[filter:drop-shadow(0_0_1px_rgba(255,255,255,0.3))_drop-shadow(0_0_1px_rgba(255,255,255,0.3))]`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}