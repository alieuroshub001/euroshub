// components/Global/Counter.tsx
'use client';

import { motion, useAnimation } from 'framer-motion';
import { Aperture, CheckCircle, Clock, Globe, Users } from 'lucide-react';
import Image from 'next/image';
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';

const ICONS = [CheckCircle, Globe, Clock, Users];
const TARGETS = [150, 50, 10, 20];
const LABELS = [
  'Projects Completed',
  'Global Clients',
  'Years Experience',
  'Team Experts',
];

const Counter = () => {
  const [counters, setCounters] = useState(
    TARGETS.map((target, i) => ({
      value: 0,
      target,
      label: LABELS[i],
      suffix: '+',
      icon: ICONS[i],
    }))
  );

  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const rafRef = useRef<number | null>(null);

  const animateCounters = useCallback(() => {
    const startTime = performance.now();
    const duration = 2000;

    const step = (timestamp: number) => {
      const progress = Math.min((timestamp - startTime) / duration, 1);

      setCounters(prev =>
        prev.map(counter => ({
          ...counter,
          value: Math.round(counter.target * progress),
        }))
      );

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
      }
    };

    rafRef.current = requestAnimationFrame(step);
  }, []);

  useEffect(() => {
    if (inView) {
      controls.start('visible');
      animateCounters();
    }
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [inView, controls, animateCounters]);

  return (
    <section
      ref={ref}
      className="relative py-24 bg-transparent text-[var(--foreground)] overflow-hidden"
    >
      {/* Background accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-56 h-56 bg-gradient-to-br from-[var(--primary)]/10 to-purple-500/10 rounded-full blur-3xl opacity-30" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-gradient-to-br from-blue-500/10 to-[var(--primary)]/10 rounded-full blur-3xl opacity-30" />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-16 lg:px-32 relative z-10">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
          }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] border border-[var(--primary)]/20 mb-4">
            <Aperture className="w-5 h-5 mr-2" />
            <span className="text-sm font-medium">OUR ACHIEVEMENTS</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
            Delivering Excellence
            <br className="hidden md:block" />
            <span className="text-[var(--primary)]">Across The Globe</span>
          </h2>
        </motion.div>

        {/* Image and Counters */}
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Illustration */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <Image
              src="/assets/images/counter.png"
              alt="Counter Illustration"
              width={500}
              height={500}
              className="rounded-xl shadow-lg"
              priority
            />
          </div>

          {/* Counters Grid */}
          <div className="w-full lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-8">
            {counters.map((counter, index) => {
              const Icon = counter.icon;
              return (
                <motion.div
                  key={index}
                  className="flex flex-col items-center text-center"
                  initial={{ opacity: 0, y: 30 }}
                  animate={controls}
                  variants={{
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        delay: index * 0.1,
                        type: 'spring',
                        stiffness: 120,
                        damping: 12,
                      },
                    },
                  }}
                >
                  <div className="p-4 bg-[var(--primary)]/10 rounded-full mb-3 border border-[var(--primary)]/20">
                    <Icon className="w-8 h-8 text-[var(--primary)]" />
                  </div>
                  <div className="text-3xl sm:text-4xl font-bold text-[var(--primary)]">
                    {counter.value}
                    {counter.suffix}
                  </div>
                  <div className="text-sm sm:text-base text-[var(--foreground)] mt-1 opacity-80">
                    {counter.label}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(Counter);
