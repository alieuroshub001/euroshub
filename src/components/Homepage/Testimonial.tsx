'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, PanInfo, useAnimation } from 'framer-motion';
import { UserCircle2 } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'CEO, North Data',
    content: 'Working with this team transformed our digital presence. Their attention to detail and creative solutions exceeded our expectations.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'CTO, Proventas',
    content: 'The technical expertise and professionalism demonstrated were outstanding. Delivered our complex project ahead of schedule.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Emma Rodriguez',
    role: 'Marketing Director',
    content: 'Our engagement metrics improved by 300% after implementing their strategies. Truly understands business growth.',
    rating: 4,
  },
  {
    id: 4,
    name: 'David Kim',
    role: 'Founder, MSS',
    content: 'Reliable, innovative, and consistently delivers quality. Multiple projects completed without disappointment.',
    rating: 5,
  },
  {
    id: 5,
    name: 'James Wilson',
    role: 'Product Manager',
    content: 'Exceptional problem-solving skills. Turned our vague ideas into a polished product that users love.',
    rating: 5,
  },
  {
    id: 6,
    name: 'Lisa Wong',
    role: 'UX Lead',
    content: 'Their design thinking approach revolutionized our user experience. Conversion rates up by 45%.',
    rating: 4,
  },
  {
    id: 7,
    name: 'Robert Garcia',
    role: 'Startup Founder',
    content: 'Punched above their weight class. Delivered enterprise-grade solutions at startup speed.',
    rating: 5,
  },
  {
    id: 8,
    name: 'Priya Patel',
    role: 'E-commerce Director',
    content: 'Our Black Friday infrastructure handled 3x traffic with zero downtime. Flawless execution.',
    rating: 5,
  },
  {
    id: 9,
    name: 'Thomas Müller',
    role: 'Engineering Manager',
    content: 'Clean, maintainable code with excellent documentation. Onboarded our team quickly.',
    rating: 4,
  },
  {
    id: 10,
    name: 'Olivia Smith',
    role: 'Content Strategist',
    content: 'Transformed our content workflow. Now producing 2x more content with higher quality.',
    rating: 5,
  },
  {
    id: 11,
    name: 'Ahmed Khan',
    role: 'CTO, FinTech',
    content: 'Implemented robust security measures that passed our strict compliance audit on first try.',
    rating: 5,
  },
  {
    id: 12,
    name: 'Sophie Martin',
    role: 'Brand Director',
    content: 'Rebranded our company with precision. Customer recognition improved dramatically.',
    rating: 4,
  },
  {
    id: 13,
    name: 'Daniel Brown',
    role: 'Operations Lead',
    content: 'Automated 80% of our manual processes. Team can now focus on strategic work.',
    rating: 5,
  },
  {
    id: 14,
    name: 'Yuki Tanaka',
    role: 'Mobile Lead',
    content: 'Our app ratings went from 3.8 to 4.9 stars after their optimizations. Incredible work.',
    rating: 5,
  },
  {
    id: 15,
    name: 'Carlos Ruiz',
    role: 'VP Sales',
    content: 'Built the analytics dashboard that helped us identify our most profitable customer segments.',
    rating: 4,
  }
];

export default function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();

  const positionRef = useRef(0);
  const lastTimeRef = useRef(0);
  const animationFrameRef = useRef<number | null>(null);

  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // Cursor state
  const mousePosRef = useRef({ x: 0, y: 0 });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [showCursor, setShowCursor] = useState(false);

  // Throttle mouse move with RAF
  const requestMousePosUpdate = useRef(false);

  const duplicatedTestimonials = [...testimonials, ...testimonials];

  // Animation loop for auto-scroll
  const animate = useCallback((time: number) => {
    if (!lastTimeRef.current) lastTimeRef.current = time;
    const delta = time - lastTimeRef.current;
    lastTimeRef.current = time;

    if (!isHovered && !isDragging && containerRef.current) {
      positionRef.current -= delta * 0.1; // speed factor
      const containerWidth = containerRef.current.scrollWidth / 2;

      if (Math.abs(positionRef.current) >= containerWidth) {
        positionRef.current = 0;
      }

      controls.set({ x: positionRef.current });
    }

    animationFrameRef.current = requestAnimationFrame(animate);
  }, [controls, isHovered, isDragging]);

  useEffect(() => {
    animationFrameRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [animate]);

  // Drag handler: update positionRef only
  const handleDrag = useCallback((_: unknown, info: PanInfo) => {
    positionRef.current += info.delta.x;
    controls.set({ x: positionRef.current });
  }, [controls]);

  // Mouse move with throttling for smooth cursor
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    mousePosRef.current = { x: e.clientX, y: e.clientY };

    if (!requestMousePosUpdate.current) {
      requestMousePosUpdate.current = true;
      requestAnimationFrame(() => {
        setMousePos(mousePosRef.current);
        requestMousePosUpdate.current = false;
      });
    }
  }, []);

  return (
    <section className="-mt-[10rem] py-76 w-full overflow-hidden relative">
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
            className="flex gap-4 w-max items-stretch pl-4 cursor-grab"
            drag="x"
            dragConstraints={containerRef}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={() => setIsDragging(false)}
            onDrag={handleDrag}
            animate={controls}
            dragElastic={0}
          >
            {duplicatedTestimonials.map((testimonial, index) => (
              <motion.div
                key={`${testimonial.id}-${index}`}
                className="flex-shrink-0 w-[280px] h-[280px] px-2"
                whileHover={{ scale: 1.03 }}
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
                      <svg
                        key={i}
                        className={`w-4 h-4 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Custom cursor */}
         {showCursor && !isDragging && (
  <motion.div
    className="fixed pointer-events-none z-50 w-16 h-16 rounded-full border border-white bg-transparent"
    style={{
      top: mousePos.y - 32,
      left: mousePos.x - 32,
    }}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
  >
    {/* Left arrow outside */}
    <span 
      className="absolute -left-6 top-1/2 -translate-y-1/2 text-white select-none text-xl"
      aria-hidden="true"
    >
      &larr;
    </span>
    {/* Right arrow outside */}
    <span
      className="absolute -right-6 top-1/2 -translate-y-1/2 text-white select-none text-xl"
      aria-hidden="true"
    >
      &rarr;
    </span>
  </motion.div>
)}
        </div>
      </div>
    </section>
  );
}