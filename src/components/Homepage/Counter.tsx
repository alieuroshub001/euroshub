'use client';

import { motion, useAnimation } from 'framer-motion';
import { Aperture, CheckCircle, Globe, Clock, Users } from 'lucide-react';
import { useCallback, useEffect, useRef, useState, memo } from 'react';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';

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
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
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
      className="-mt-[5rem] relative py-24 bg-transparent text-[var(--foreground)] overflow-hidden"
    >
      {/* Background elements with primary color accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-[var(--primary)]/10 to-purple-500/10 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-blue-500/10 to-[var(--primary)]/10 rounded-full blur-3xl opacity-30"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            Delivering Excellence <br className="hidden md:block" />
            <span className="text-[var(--primary)]">Across The Globe</span>
          </h2>
        </motion.div>

        {/* Image + Counters */}
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Image */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <Image
              src="/assets/images/counter.png"
              alt="Counter Illustration"
              width={500}
              height={500}
              className="rounded-xl shadow-lg backdrop-blur-sm"
              priority
            />
          </div>

          {/* Counters */}
          <div className="w-full lg:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
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
                        stiffness: 100,
                        damping: 10,
                      },
                    },
                  }}
                >
                  <div className="p-4 bg-[var(--primary)]/10 rounded-full mb-3 border border-[var(--primary)]/20">
                    <Icon className="w-8 h-8 text-[var(--primary)]" />
                  </div>
                  <div className="text-4xl md:text-5xl font-bold text-[var(--primary)]">
                    {counter.value}
                    {counter.suffix}
                  </div>
                  <div className="text-sm md:text-base text-[var(--foreground)] mt-1 opacity-80">
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