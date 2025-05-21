'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { UserCircle2, ChevronLeft, ChevronRight } from 'lucide-react';

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
    content: 'Working with this team transformed our digital presence. Their attention to detail and creative solutions exceeded our expectations at every turn.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'CTO, Proventas',
    content: 'The technical expertise and professionalism demonstrated were outstanding. They delivered our complex project ahead of schedule with zero defects.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Emma Rodriguez',
    role: 'Marketing Director, Zuri Bella',
    content: 'Our engagement metrics improved by 300% after implementing their strategies. Truly a partner that understands business growth.',
    rating: 4,
  },
  {
    id: 4,
    name: 'David Kim',
    role: 'Founder, My Speaking Score',
    content: 'Reliable, innovative, and consistently delivers quality. We\'ve partnered with them for multiple projects and they never disappoint.',
    rating: 5,
  },
];

const CARDS_TO_SHOW = 3;
const AUTO_SCROLL_INTERVAL = 5000;

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => 
      prev === testimonials.length - CARDS_TO_SHOW ? 0 : prev + 1
    );
    setIsAutoPlaying(false);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => 
      prev === 0 ? testimonials.length - CARDS_TO_SHOW : prev - 1
    );
    setIsAutoPlaying(false);
  };

  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(() => {
        setCurrentIndex((prev) => 
          prev === testimonials.length - CARDS_TO_SHOW ? 0 : prev + 1
        );
      }, AUTO_SCROLL_INTERVAL);
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying]);

  const visibleTestimonials = testimonials.slice(currentIndex, currentIndex + CARDS_TO_SHOW);
  if (visibleTestimonials.length < CARDS_TO_SHOW) {
    visibleTestimonials.push(...testimonials.slice(0, CARDS_TO_SHOW - visibleTestimonials.length));
  }

  return (
    <section className="py-16 bg-[var(--card-bg)] overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-center mb-12"
        >
          What Our Clients Say
        </motion.h2>

        <div className="max-w-7xl mx-auto relative">
          <div 
            ref={containerRef}
            className="overflow-hidden px-4"
          >
            <motion.div 
              className="flex gap-6"
              animate={{ x: `${-currentIndex * (100 / CARDS_TO_SHOW)}%` }}
              transition={{ type: "spring", stiffness: 150, damping: 20 }}
            >
              {visibleTestimonials.map((testimonial, index) => (
                <motion.div
                  key={`${testimonial.id}-${index}`}
                  className="flex-shrink-0 w-full md:w-[calc(33.333%-1rem)]"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="bg-[var(--secondary)] p-6 rounded-xl shadow-sm h-full">
                    <div className="flex items-center mb-4">
                      <div className="relative w-12 h-12 mr-4 flex items-center justify-center bg-[var(--primary)]/10 rounded-full">
                        <UserCircle2 className="w-8 h-8 text-[var(--primary)]" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">{testimonial.name}</h3>
                        <p className="text-sm text-[var(--foreground)] opacity-80">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>

                    <div className="flex mb-4">
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: i * 0.1 }}
                        >
                          <svg
                            className={`w-4 h-4 ${
                              i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        </motion.div>
                      ))}
                    </div>

                    <blockquote className="text-sm text-[var(--foreground)] italic">
                     &apos;{testimonial.content}&apos;
                    </blockquote>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <div className="flex justify-center items-center mt-8 gap-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prevTestimonial}
              className="p-2 rounded-full bg-[var(--primary)] text-white hover:bg-opacity-90 transition"
              aria-label="Previous testimonials"
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>

            <div className="flex space-x-2">
              {[...Array(testimonials.length - CARDS_TO_SHOW + 1)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentIndex(index);
                    setIsAutoPlaying(false);
                  }}
                  className="group relative"
                  aria-label={`Go to testimonial group ${index + 1}`}
                >
                  <span 
                    className={`block w-2 h-2 rounded-full transition-all duration-300 ${
                      currentIndex === index 
                        ? 'bg-[var(--primary)]' 
                        : 'bg-gray-300 hover:bg-[var(--primary)]/50'
                    }`}
                  />
                </button>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={nextTestimonial}
              className="p-2 rounded-full bg-[var(--primary)] text-white hover:bg-opacity-90 transition"
              aria-label="Next testimonials"
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}