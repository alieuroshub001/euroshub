'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef } from 'react';

export default function Hero() {
  const spaceRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (spaceRef.current) {
      const space = spaceRef.current;
      const starsCount = 150;
      const largeStarsCount = 15;
      const shootingStarsCount = 5;
      
      // Clear existing stars
      space.innerHTML = '';
      
      // Create small stars
      for (let i = 0; i < starsCount; i++) {
        const star = document.createElement('div');
        star.className = 'space-star';
        
        const size = Math.random() * 2 + 0.5;
        const duration = Math.random() * 50 + 50;
        const delay = Math.random() * -50;
        const opacity = Math.random() * 0.3 + 0.2;
        
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.opacity = `${opacity}`;
        star.style.animation = `floatStar ${duration}s linear ${delay}s infinite`;
        star.style.setProperty('--distance-x', `${Math.random() * 100 - 50}px`);
        star.style.setProperty('--distance-y', `${Math.random() * 50 - 25}px`);
        
        space.appendChild(star);
      }

      // Create larger twinkling stars
      for (let i = 0; i < largeStarsCount; i++) {
        const star = document.createElement('div');
        star.className = 'space-star-large';
        
        const size = Math.random() * 4 + 2;
        const duration = Math.random() * 10 + 5;
        const delay = Math.random() * -10;
        const opacity = Math.random() * 0.5 + 0.3;
        
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.opacity = `${opacity}`;
        star.style.animation = `pulseStar ${duration}s ease-in-out ${delay}s infinite`;
        
        space.appendChild(star);
      }

      // Create shooting stars
      for (let i = 0; i < shootingStarsCount; i++) {
        const star = document.createElement('div');
        star.className = 'shooting-star';
        
        const size = Math.random() * 2 + 1;
        const duration = Math.random() * 5 + 3;
        const delay = Math.random() * 20;
        const length = Math.random() * 100 + 50;
        const angle = Math.random() * 360;
        
        star.style.width = `${length}px`;
        star.style.height = `${size}px`;
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.animation = `shootStar ${duration}s ease-in ${delay}s infinite`;
        star.style.transform = `rotate(${angle}deg)`;
        
        space.appendChild(star);
      }
    }
  }, []);

  return (
    <section className="relative text-[var(--foreground)] pt-24 pb-32 px-6 md:px-16 lg:px-32 overflow-hidden">
      {/* Space background with moving stars */}
      <div 
        ref={spaceRef}
        className="absolute -z-20 top-0 left-0 w-full h-full overflow-hidden"
      >
        {/* Nebula gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/10 via-transparent to-[var(--primary)]/5" />
      </div>

      {/* Content container */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 items-center gap-12 relative z-10">
        {/* Text Content */}
        <div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            Empowering Global Innovation with <span className="text-[var(--primary)]">Tailored Tech Solutions</span>
          </h1>
          <p className="text-lg md:text-xl text-[var(--foreground)] opacity-80 mb-8">
            At EurosHub, we partner with businesses worldwide to build scalable, smart, and sustainable technology that transforms vision into value.
          </p>
          <div className="flex gap-4 flex-wrap">
            <Link href="#contact">
              <button className="bg-[var(--primary)] text-white px-6 py-3 rounded-full font-medium hover:opacity-90 transition hover:shadow-lg hover:shadow-[var(--primary)]/30">
                Let&apos;s Talk Business
              </button>
            </Link>
            <Link href="#careers">
              <button className="border border-[var(--primary)] text-[var(--primary)] px-6 py-3 rounded-full font-medium hover:bg-[var(--primary)] hover:text-white transition hover:shadow-lg hover:shadow-[var(--primary)]/20">
                Explore Careers
              </button>
            </Link>
          </div>
        </div>

        {/* Hero Image */}
        <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px]">
          <Image
            src="/assets/images/hero.png"
            alt="Team working illustration"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>
    </section>
  );
}