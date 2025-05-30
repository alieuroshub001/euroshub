'use client';

import { motion, useAnimation } from 'framer-motion';
import { Aperture, CheckCircle, Clock, Globe, Users } from 'lucide-react';
import { useCallback, useEffect, useRef, useState, memo } from 'react';
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
      progress: '0%',
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
        prev.map(counter => {
          const newValue = Math.round(counter.target * progress);
          return {
            ...counter,
            value: newValue,
            progress: `${Math.min(100, (newValue / counter.target) * 100)}%`,
          };
        })
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
      className="relative py-35 text-[var(--foreground)] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
          }}
          className="text-center mb-16"
        >
          <div className="mt-65 inline-flex items-center justify-center px-4 py-2 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] mb-4">
            <Aperture className="w-5 h-5 mr-2" />
            <span className="text-sm font-medium">OUR ACHIEVEMENTS</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            Delivering Excellence <br className="hidden md:block" />
            <span className="text-[var(--primary)]">Across The Globe</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {counters.map((counter, index) => {
            const Icon = counter.icon;
            return (
              <motion.div
                key={index}
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
                whileHover={{
                  scale: 1.05,
                  zIndex: 10,
                  transition: {
                    type: 'spring',
                    stiffness: 400,
                    damping: 10,
                  },
                }}
                className="bg-[var(--card-bg)] border border-[var(--secondary)]/20 rounded-xl p-6 shadow-sm transition-all duration-300 relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-[var(--primary)]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative z-10">
                  <div className="flex items-center mb-4">
                    <motion.div
                      whileHover={{
                        rotate: 360,
                        scale: 1.2,
                        transition: { duration: 0.5 },
                      }}
                      className={`p-3 rounded-lg bg-[var(--primary)]/10`}
                    >
                      <Icon className={`w-6 h-6 text-[var(--primary)]`} />
                    </motion.div>
                    <motion.h3
                      className="ml-3 text-lg font-medium"
                      whileHover={{
                        x: 5,
                        transition: { type: 'spring', stiffness: 500 },
                      }}
                    >
                      {counter.label}
                    </motion.h3>
                  </div>

                  <div className="flex items-end mb-4">
                    <motion.span
                      whileHover={{
                        scale: 1.1,
                        transition: { type: 'spring', stiffness: 500 },
                      }}
                      className={`text-3xl md:text-4xl font-bold text-[var(--primary)]`}
                    >
                      {counter.value}
                    </motion.span>
                    <motion.span
                      whileHover={{
                        scale: 1.3,
                        y: -4,
                        transition: { type: 'spring', stiffness: 500 },
                      }}
                      className="text-xl md:text-2xl ml-1 text-[var(--primary)]"
                    >
                      {counter.suffix}
                    </motion.span>
                  </div>

                  <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: '0%' }}
                      animate={{
                        width: counter.progress,
                        transition: {
                          duration: 2,
                          ease: 'easeOut',
                        },
                      }}
                      whileHover={{
                        scaleY: 1.8,
                        originY: 'bottom',
                        transition: {
                          type: 'spring',
                          stiffness: 500,
                          damping: 10,
                        },
                      }}
                      className={`h-full bg-[var(--primary)] rounded-full`}
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default memo(Counter);
