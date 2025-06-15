'use client';

import { useState, useEffect, useRef, useCallback, JSX } from 'react';
import { motion, AnimatePresence, useMotionValue, useReducedMotion } from 'framer-motion';
import { UserCircle2 } from 'lucide-react';
import Cursor from '@/components/Global/Cursor';
import { Testimonial } from '@/types/testimonial';

const testimonialCategories = ['All', '5 Stars', 'Featured'];

export default function Testimonials() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Animation and interaction state
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const animationRef = useRef<number | null>(null);
  const lastFrameTime = useRef<number | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [showCursor, setShowCursor] = useState(false);
  const pointerDownPos = useRef<{ x: number; y: number } | null>(null);
  const clickTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await fetch('/api/testimonials');
        if (!res.ok) throw new Error('Failed to fetch testimonials');
        const data = await res.json();
        setTestimonials(data);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Something went wrong';
        setError(message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  const filteredTestimonials = testimonials.filter(testimonial => {
    if (activeCategory === 'All') return true;
    if (activeCategory === '5 Stars') return testimonial.rating === 5;
    if (activeCategory === 'Featured') return testimonial.isFeatured;
    return true;
  });

  const infiniteTestimonials = Array(3).fill(filteredTestimonials).flat();
  const cardWidth = 280;
  const gap = 16;
  const singleSetWidth = filteredTestimonials.length * (cardWidth + gap);

  const moveMarquee = useCallback((timestamp: number) => {
    if (isHovered || isDragging || shouldReduceMotion || filteredTestimonials.length === 0) return;

    if (!lastFrameTime.current) lastFrameTime.current = timestamp;
    const delta = timestamp - lastFrameTime.current;

    if (delta > 16) {
      const currentX = x.get();
      x.set(currentX - 0.8);
      lastFrameTime.current = timestamp;
    }

    animationRef.current = requestAnimationFrame(moveMarquee);
  }, [isHovered, isDragging, shouldReduceMotion, x, filteredTestimonials.length]);

  const handleInfiniteLoop = useCallback(() => {
    const currentX = x.get();
    if (currentX <= -singleSetWidth * 2) {
      x.set(currentX + singleSetWidth);
    } else if (currentX >= 0) {
      x.set(currentX - singleSetWidth);
    }
  }, [x, singleSetWidth]);

  useEffect(() => {
    const unsubscribe = x.onChange(handleInfiniteLoop);
    return unsubscribe;
  }, [x, handleInfiniteLoop]);

  useEffect(() => {
    if (shouldReduceMotion || filteredTestimonials.length === 0) return;

    const frame = (time: number) => moveMarquee(time);
    animationRef.current = requestAnimationFrame(frame);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [moveMarquee, shouldReduceMotion, filteredTestimonials.length]);

  useEffect(() => {
    if (filteredTestimonials.length > 0) {
      x.set(-singleSetWidth);
    }
  }, [x, singleSetWidth, filteredTestimonials.length]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    pointerDownPos.current = { x: e.clientX, y: e.clientY };
    if (clickTimeout.current) {
      clearTimeout(clickTimeout.current);
      clickTimeout.current = null;
    }
  };

  const handlePointerUp = (testimonialId: string, e: React.PointerEvent) => {
    if (!pointerDownPos.current) return;
    const dx = Math.abs(e.clientX - pointerDownPos.current.x);
    const dy = Math.abs(e.clientY - pointerDownPos.current.y);

    if (dx < 10 && dy < 10) {
      clickTimeout.current = setTimeout(() => {
        console.log(`Clicked testimonial ${testimonialId}`);
      }, 150);
    }

    pointerDownPos.current = null;
  };

  const renderStatusSection = (content: JSX.Element) => (
    <section className="py-10 w-full overflow-hidden relative">
      <div className="w-full mx-auto px-0">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-center mb-12 px-4"
        >
          What Our Clients Say
        </motion.h2>
        {content}
      </div>
    </section>
  );

  if (isLoading) {
    return renderStatusSection(
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin h-12 w-12 border-t-2 border-b-2 border-[var(--primary)] rounded-full" />
      </div>
    );
  }

  if (error) {
    return renderStatusSection(
      <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded text-center max-w-md mx-auto">
        {error}
      </div>
    );
  }

  if (filteredTestimonials.length === 0) {
    return renderStatusSection(
      <div className="text-center py-12 text-[var(--foreground)]/70">
        No testimonials found in this category.
      </div>
    );
  }

  return renderStatusSection(
    <>
      {/* Category Buttons */}
      <div className="flex flex-wrap justify-center gap-2 mb-12">
        {testimonialCategories.map(category => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 rounded-full font-medium transition-all ${
              activeCategory === category
                ? 'bg-[var(--primary)] text-white'
                : 'bg-[var(--secondary)] hover:bg-[var(--secondary)]/80'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Testimonials Carousel */}
      <div
        ref={containerRef}
        className="relative w-full overflow-x-hidden py-8"
        onMouseEnter={() => {
          setIsHovered(true);
          setShowCursor(true);
        }}
        onMouseLeave={() => {
          setIsHovered(false);
          setShowCursor(false);
        }}
        onMouseMove={handleMouseMove}
      >
        <motion.div
          className="flex gap-4 w-max items-stretch pl-4 cursor-grab active:cursor-grabbing"
          style={{ x }}
          drag="x"
          dragConstraints={{ left: -Infinity, right: Infinity }}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={() => setIsDragging(false)}
          dragElastic={0}
          dragMomentum={false}
        >
          <AnimatePresence>
            {infiniteTestimonials.map((testimonial, index) => (
              <motion.div
                key={`${testimonial._id}-${Math.floor(index / filteredTestimonials.length)}-${index % filteredTestimonials.length}`}
                className="flex-shrink-0 w-[280px] h-[280px] px-2 cursor-pointer"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                whileHover={{ scale: 1.015 }}
                transition={{ type: 'spring', stiffness: 250, damping: 20 }}
                onPointerDown={handlePointerDown}
                onPointerUp={(e) => handlePointerUp(String(testimonial._id), e)}
                onPointerCancel={() => {
                  if (clickTimeout.current) {
                    clearTimeout(clickTimeout.current);
                    clickTimeout.current = null;
                  }
                  pointerDownPos.current = null;
                }}
              >
                <div className="bg-[var(--secondary)]/30 backdrop-blur-lg border border-[var(--primary)]/20 p-6 h-full w-full flex flex-col justify-between rounded-lg transition-all duration-300 hover:bg-[var(--secondary)]/50 hover:shadow-xl">
                  <div>
                    <div className="flex items-center mb-4">
                      <div className="relative w-10 h-10 mr-4 flex items-center justify-center bg-[var(--primary)]/10 rounded-full">
                        <UserCircle2 className="w-6 h-6 text-[var(--primary)]" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-[var(--foreground)]">{testimonial.name}</h3>
                        <p className="text-sm text-[var(--foreground)]/80">{testimonial.role}</p>
                      </div>
                    </div>
                    <blockquote className="text-sm text-[var(--foreground)] italic line-clamp-4">
                      &apos;{testimonial.content}&apos;
                    </blockquote>
                  </div>

                  <div className="flex mt-4">
                    {[...Array(5)].map((_, i) => (
                      <motion.svg
                        key={i}
                        className={`w-4 h-4 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        whileHover={{ scale: 1.2 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </motion.svg>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <Cursor 
          mousePos={mousePos} 
          isDragging={isDragging} 
          showCursor={showCursor}
        />
      </div>
    </>
  );
}