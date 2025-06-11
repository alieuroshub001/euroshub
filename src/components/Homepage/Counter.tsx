'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { Aperture, CheckCircle, Clock, Globe, Users } from 'lucide-react';

const ICONS = [CheckCircle, Globe, Clock, Users];
const TARGETS = [150, 50, 10, 20];
const LABELS = [
  'Projects Completed',
  'Global Clients',
  'Years Experience',
  'Team Experts',
];

export default function Counter() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ref, inView] = useInView({ threshold: 0.3 });

  const [hasZoomedOut, setHasZoomedOut] = useState(false);
  const [hasAnimatedCounters, setHasAnimatedCounters] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  // Check screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 1024); // lg breakpoint
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Track zoom-out completion - only for large screens
  useEffect(() => {
    if (!isLargeScreen) {
      setHasZoomedOut(true); // Always true for small screens
      return;
    }

    const unsubscribe = scrollYProgress.onChange((value) => {
      if (value > 0.6 && !hasZoomedOut) {
        setHasZoomedOut(true);
      }
    });
    return () => unsubscribe();
  }, [hasZoomedOut, isLargeScreen, scrollYProgress]);

  // Video transforms - only apply on large screens
  const videoScale = useTransform(
    scrollYProgress, 
    [0.2, 0.6], 
    isLargeScreen ? [1.2, 0.9] : [1, 1]
  );
  const videoX = useTransform(
    scrollYProgress, 
    [0.2, 0.6], 
    isLargeScreen ? ['0%', '-15%'] : ['0%', '0%']
  );
  const videoBorderRadius = useTransform(
    scrollYProgress, 
    [0.2, 0.6], 
    isLargeScreen ? [0, 24] : [0, 0]
  );
  const videoWidth = useTransform(
    scrollYProgress, 
    [0.2, 0.6], 
    isLargeScreen ? ['100%', '70%'] : ['100%', '100%']
  );

  // Content animates differently based on screen size
  const contentOpacity = useTransform(
    scrollYProgress, 
    isLargeScreen ? [0.65, 0.75] : [0.3, 0.5], 
    [0, 1]
  );
  const contentY = useTransform(
    scrollYProgress, 
    isLargeScreen ? [0.65, 0.75] : [0.3, 0.5], 
    [40, 0]
  );
  const contentScale = useTransform(
    scrollYProgress, 
    isLargeScreen ? [0.65, 0.75] : [0.3, 0.5], 
    [0.95, 1]
  );

  const [counters, setCounters] = useState(
    TARGETS.map((target, i) => ({
      value: 0,
      target,
      label: LABELS[i],
      suffix: '+',
      icon: ICONS[i],
    }))
  );

  // Animate counters
  useEffect(() => {
    if (!inView || !hasZoomedOut || hasAnimatedCounters) return;

    setHasAnimatedCounters(true);

    const duration = 2000;
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      setCounters(
        TARGETS.map((target, i) => ({
          value: Math.round(target * eased),
          target,
          label: LABELS[i],
          suffix: '+',
          icon: ICONS[i],
        }))
      );

      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);

    videoRef.current?.play().catch(console.error);
  }, [inView, hasZoomedOut, hasAnimatedCounters]);

  return (
    <section
      ref={sectionRef}
      className={`relative bg-transparent text-[var(--foreground)] ${
        isLargeScreen ? 'h-[220vh]' : 'h-auto min-h-screen'
      }`}
    >
      {/* Large Screen Layout */}
      {isLargeScreen ? (
        <div className="sticky top-0 h-screen flex items-center overflow-hidden">
          {/* VIDEO SECTION */}
          <motion.div
            style={{
              scale: videoScale,
              x: videoX,
              borderRadius: videoBorderRadius,
              width: videoWidth,
            }}
            className="h-full relative overflow-hidden transition-all duration-700"
          >
            <video
              ref={videoRef}
              src="/videos/counter.webm"
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--background)]/30 via-transparent to-transparent" />
          </motion.div>

          {/* COUNTER SECTION */}
          {hasZoomedOut && (
            <motion.div
              ref={ref}
              style={{
                opacity: contentOpacity,
                y: contentY,
                scale: contentScale,
              }}
              className="absolute right-0 w-full md:w-1/2 lg:w-1/3 h-full flex flex-col justify-center px-6 sm:px-10 lg:px-16"
            >
              <div className="mb-12">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] border border-[var(--primary)]/20 mb-4">
                  <Aperture className="w-5 h-5 mr-2" />
                  <span className="text-sm font-medium">OUR ACHIEVEMENTS</span>
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                  Numbers That Speak<br />
                  <span className="bg-gradient-to-r from-[var(--primary)] to-[#0d8f8c] bg-clip-text text-transparent">
                    Volumes
                  </span>
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {counters.map((counter, i) => {
                  const Icon = counter.icon;
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={inView && hasZoomedOut ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.6, delay: i * 0.1 }}
                      className="flex items-center space-x-4"
                    >
                      <div className="p-4 rounded-full bg-[var(--primary)]/10 border border-[var(--primary)]/20">
                        <Icon className="w-6 h-6 text-[var(--primary)]" />
                      </div>
                      <div>
                        <div className="text-3xl font-bold text-[var(--primary)]">
                          {counter.value}
                          <span className="text-[var(--primary)]">{counter.suffix}</span>
                        </div>
                        <div className="text-sm text-[var(--foreground)]/80">{counter.label}</div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </div>
      ) : (
        /* Small Screen Layout - Stacked */
        <div className="space-y-8 py-8">
          {/* VIDEO SECTION - Appears first on small screens */}
          <div className="w-full px-4">
            <div className="relative w-full h-[50vh] sm:h-[60vh] rounded-2xl overflow-hidden">
              <video
                ref={videoRef}
                src="/videos/counter.mp4"
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)]/50 via-transparent to-transparent" />
            </div>
          </div>

          {/* COUNTER SECTION - Appears after video on small screens */}
          <motion.div
            ref={ref}
            style={{
              opacity: contentOpacity,
              y: contentY,
              scale: contentScale,
            }}
            className="w-full px-4 sm:px-6"
          >
            <div className="mb-8 text-center sm:text-left">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] border border-[var(--primary)]/20 mb-4">
                <Aperture className="w-5 h-5 mr-2" />
                <span className="text-sm font-medium">OUR ACHIEVEMENTS</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight">
                Numbers That Speak<br />
                <span className="bg-gradient-to-r from-[var(--primary)] to-[#0d8f8c] bg-clip-text text-transparent">
                  Volumes
                </span>
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto sm:mx-0">
              {counters.map((counter, i) => {
                const Icon = counter.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView && hasZoomedOut ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: i * 0.1 }}
                    className="flex items-center space-x-4 p-4 rounded-xl bg-[var(--background)]/50 backdrop-blur-sm border border-[var(--primary)]/10"
                  >
                    <div className="p-3 rounded-full bg-[var(--primary)]/10 border border-[var(--primary)]/20">
                      <Icon className="w-5 h-5 text-[var(--primary)]" />
                    </div>
                    <div>
                      <div className="text-2xl sm:text-3xl font-bold text-[var(--primary)]">
                        {counter.value}
                        <span className="text-[var(--primary)]">{counter.suffix}</span>
                      </div>
                      <div className="text-xs sm:text-sm text-[var(--foreground)]/80">{counter.label}</div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
}