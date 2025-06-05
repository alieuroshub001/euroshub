// components/Global/Counter.tsx
'use client';

import { motion, useAnimation } from 'framer-motion';
import { Aperture, CheckCircle, Clock, Globe, Users } from 'lucide-react';
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
          <motion.div
            className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] border border-[var(--primary)]/20 mb-4"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Aperture className="w-5 h-5 mr-2" />
            <span className="text-sm font-medium">OUR ACHIEVEMENTS</span>
          </motion.div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
            Numbers That Speak
            <br className="hidden md:block" />
            <span className="bg-gradient-to-r from-[var(--primary)] to-[#0d8f8c] bg-clip-text text-transparent">
              Volumes
            </span>
          </h2>
        </motion.div>

        {/* Counters Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
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
                <motion.div
                  className="relative w-24 h-24 mb-6 flex items-center justify-center"
                  whileHover={{ scale: 1.1 }}
                >
                  {/* Animated circle background */}
                  <motion.div
                    className="absolute inset-0 rounded-full bg-[var(--primary)]/10 border border-[var(--primary)]/20"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                  />
                  <motion.div
                    className="absolute inset-0 rounded-full bg-[var(--primary)]/5 border border-[var(--primary)]/10"
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 0.9, opacity: 1 }}
                    transition={{ delay: index * 0.1 + 0.4 }}
                  />
                  
                  {/* Icon */}
                  <div className="p-4 bg-[var(--primary)]/10 rounded-full border border-[var(--primary)]/20 z-10">
                    <Icon className="w-8 h-8 text-[var(--primary)]" />
                  </div>
                </motion.div>

                {/* Counter */}
                <motion.div 
                  className="text-4xl sm:text-5xl font-bold text-[var(--primary)] mb-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.5 }}
                >
                  {counter.value}
                  <span className="text-[var(--primary)]">{counter.suffix}</span>
                </motion.div>

                {/* Label */}
                <motion.div
                  className="text-sm sm:text-base text-[var(--foreground)] mt-1 opacity-80"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.8 }}
                  transition={{ delay: index * 0.1 + 0.6 }}
                >
                  {counter.label}
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default memo(Counter);