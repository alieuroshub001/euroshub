'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useMotionValue, useReducedMotion } from 'framer-motion';
import { UserCircle2 } from 'lucide-react';
import Cursor from '@/components/Global/Cursor';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  { id: 1, name: 'Sarah Johnson', role: 'CEO, North Data', content: 'Working with this team transformed our digital presence. Their attention to detail and creative solutions exceeded our expectations.', rating: 5 },
  { id: 2, name: 'Michael Chen', role: 'CTO, Proventas', content: 'The technical expertise and professionalism demonstrated were outstanding. Delivered our complex project ahead of schedule.', rating: 5 },
  { id: 3, name: 'Emma Rodriguez', role: 'Marketing Director', content: 'Our engagement metrics improved by 300% after implementing their strategies. Truly understands business growth.', rating: 4 },
  { id: 4, name: 'David Kim', role: 'Founder, MSS', content: 'Reliable, innovative, and consistently delivers quality. Multiple projects completed without disappointment.', rating: 5 },
  { id: 5, name: 'James Wilson', role: 'Product Manager', content: 'Exceptional problem-solving skills. Turned our vague ideas into a polished product that users love.', rating: 5 },
  { id: 6, name: 'Lisa Wong', role: 'UX Lead', content: 'Their design thinking approach revolutionized our user experience. Conversion rates up by 45%.', rating: 4 },
  { id: 7, name: 'Robert Garcia', role: 'Startup Founder', content: 'Punched above their weight class. Delivered enterprise-grade solutions at startup speed.', rating: 5 },
  { id: 8, name: 'Priya Patel', role: 'E-commerce Director', content: 'Our Black Friday infrastructure handled 3x traffic with zero downtime. Flawless execution.', rating: 5 },
  { id: 9, name: 'Thomas Müller', role: 'Engineering Manager', content: 'Clean, maintainable code with excellent documentation. Onboarded our team quickly.', rating: 4 },
  { id: 10, name: 'Olivia Smith', role: 'Content Strategist', content: 'Transformed our content workflow. Now producing 2x more content with higher quality.', rating: 5 },
  { id: 11, name: 'Ahmed Khan', role: 'CTO, FinTech', content: 'Implemented robust security measures that passed our strict compliance audit on first try.', rating: 5 },
  { id: 12, name: 'Sophie Martin', role: 'Brand Director', content: 'Rebranded our company with precision. Customer recognition improved dramatically.', rating: 4 },
  { id: 13, name: 'Daniel Brown', role: 'Operations Lead', content: 'Automated 80% of our manual processes. Team can now focus on strategic work.', rating: 5 },
  { id: 14, name: 'Yuki Tanaka', role: 'Mobile Lead', content: 'Our app ratings went from 3.8 to 4.9 stars after their optimizations. Incredible work.', rating: 5 },
  { id: 15, name: 'Carlos Ruiz', role: 'VP Sales', content: 'Built the analytics dashboard that helped us identify our most profitable customer segments.', rating: 4 }
];

export default function Testimonials() {
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

  const infiniteTestimonials = Array(3).fill(testimonials).flat();
  const cardWidth = 280;
  const gap = 16;
  const singleSetWidth = testimonials.length * (cardWidth + gap);

  const moveMarquee = useCallback((timestamp: number) => {
    if (isHovered || isDragging || shouldReduceMotion) return;

    if (!lastFrameTime.current) lastFrameTime.current = timestamp;
    const delta = timestamp - lastFrameTime.current;

    if (delta > 16) {
      const currentX = x.get();
      x.set(currentX - 0.8);
      lastFrameTime.current = timestamp;
    }

    animationRef.current = requestAnimationFrame(moveMarquee);
  }, [isHovered, isDragging, shouldReduceMotion, x]);

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
    if (shouldReduceMotion) return;

    const frame = (time: number) => moveMarquee(time);
    animationRef.current = requestAnimationFrame(frame);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [moveMarquee, shouldReduceMotion]);

  useEffect(() => {
    x.set(-singleSetWidth);
  }, [x, singleSetWidth]);

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

  const handlePointerUp = (testimonialId: number, e: React.PointerEvent) => {
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

  return (
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
            {infiniteTestimonials.map((testimonial, index) => (
              <motion.div
                key={`${testimonial.id}-${Math.floor(index / testimonials.length)}-${index % testimonials.length}`}
                className="flex-shrink-0 w-[280px] h-[280px] px-2 cursor-pointer"
                whileHover={{ scale: 1.015 }}
                transition={{ type: 'spring', stiffness: 250, damping: 20 }}
                onPointerDown={handlePointerDown}
                onPointerUp={(e) => handlePointerUp(testimonial.id, e)}
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
          </motion.div>

          <Cursor 
            mousePos={mousePos} 
            isDragging={isDragging} 
            showCursor={showCursor}
          />
        </div>
      </div>
    </section>
  );
}
