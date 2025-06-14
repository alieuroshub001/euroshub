'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import {  CheckCircle, Clock, Globe, Users, TrendingUp } from 'lucide-react';

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
  const [ref, inView] = useInView({ threshold: 0.2 });

  const [hasAnimatedCounters, setHasAnimatedCounters] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const [shouldShowCounters, setShouldShowCounters] = useState(false);

  // Check screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

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

  // Counter section appears only when video is overlapping
  const contentOpacity = useTransform(
    scrollYProgress, 
    isLargeScreen ? [0.5, 0.7] : [0.4, 0.6], 
    [0, 1]
  );
  const contentY = useTransform(
    scrollYProgress, 
    isLargeScreen ? [0.5, 0.7] : [0.4, 0.6], 
    [60, 0]
  );
  const contentScale = useTransform(
    scrollYProgress, 
    isLargeScreen ? [0.5, 0.7] : [0.4, 0.6], 
    [0.9, 1]
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

  // Update shouldShowCounters based on scroll progress
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      if (isLargeScreen) {
        setShouldShowCounters(latest >= 0.5);
      } else {
        setShouldShowCounters(latest >= 0.4);
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress, isLargeScreen]);

  // Animate counters when in view and video has scrolled past
  useEffect(() => {
    if (!inView || hasAnimatedCounters || !shouldShowCounters) return;

    setHasAnimatedCounters(true);

    const duration = 2500;
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);

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
  }, [inView, hasAnimatedCounters, shouldShowCounters]);

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
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--background)]/40 via-transparent to-[var(--background)]/20" />
          </motion.div>

          {/* COUNTER SECTION - Appears only when video is scrolled past */}
          <motion.div
            ref={ref}
            style={{
              opacity: contentOpacity,
              y: contentY,
              scale: contentScale,
            }}
            className="absolute right-0 w-full md:w-1/2 lg:w-2/5 h-full flex flex-col justify-center px-6 sm:px-10 lg:px-16"
          >
            <div className="relative z-10">
              {/* Header Section */}
              <div className="mb-12">
                {shouldShowCounters && (
                  <>
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      className="inline-flex items-center px-5 py-3 rounded-2xl bg-gradient-to-r from-[var(--primary)]/20 to-[var(--primary)]/10 backdrop-blur-sm border border-[var(--primary)]/30 mb-6 shadow-lg"
                    >
                      <TrendingUp className="w-5 h-5 mr-3 text-[var(--primary)]" />
                      <span className="text-sm font-semibold tracking-wide text-[var(--primary)]">OUR ACHIEVEMENTS</span>
                    </motion.div>
                    
                    <motion.h2 
                      initial={{ opacity: 0, y: 20 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.6, delay: 0.3 }}
                      className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4"
                    >
                      Numbers That
                      <br />
                      <span className="bg-gradient-to-r from-[var(--primary)] via-[#0d8f8c] to-[var(--primary)] bg-clip-text text-transparent">
                        Define Excellence
                      </span>
                    </motion.h2>
                    
                    <motion.p 
                      initial={{ opacity: 0, y: 20 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.6, delay: 0.4 }}
                      className="text-lg text-[var(--foreground)]/70 leading-relaxed max-w-md"
                    >
                      Every milestone tells a story of dedication, innovation, and the relentless pursuit of perfection.
                    </motion.p>
                  </>
                )}
              </div>

              {/* Counter Grid */}
              {shouldShowCounters && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {counters.map((counter, i) => {
                    const Icon = counter.icon;
                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 30, scale: 0.9 }}
                        animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                        transition={{ 
                          duration: 0.8, 
                          delay: 0.5 + i * 0.15,
                          type: "spring",
                          stiffness: 100
                        }}
                        className="group"
                      >
                        <div className="p-6 rounded-3xl border border-[var(--primary)]/20 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:border-[var(--primary)]/40">
                          <div className="flex items-start space-x-4">
                            <div className="relative">
                              <div className="absolute inset-0 bg-gradient-to-r from-[var(--primary)]/30 to-[var(--primary)]/20 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-500" />
                              <div className="relative p-4 rounded-2xl bg-gradient-to-br from-[var(--primary)]/20 to-[var(--primary)]/10 border border-[var(--primary)]/30">
                                <Icon className="w-7 h-7 text-[var(--primary)]" />
                              </div>
                            </div>
                            <div className="flex-1">
                              <div className="flex items-baseline space-x-1 mb-2">
                                <span className="text-4xl font-bold bg-gradient-to-r from-[var(--primary)] to-[#0d8f8c] bg-clip-text text-transparent">
                                  {counter.value}
                                </span>
                                <span className="text-2xl font-bold text-[var(--primary)]/80">
                                  {counter.suffix}
                                </span>
                              </div>
                              <p className="text-sm font-medium text-[var(--foreground)]/80 leading-relaxed">
                                {counter.label}
                              </p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      ) : (
        /* Small Screen Layout - Stacked */
        <div className="space-y-12 py-12">
          {/* VIDEO SECTION */}
          <div className="w-full px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="relative w-full h-[50vh] sm:h-[60vh] rounded-3xl overflow-hidden shadow-2xl"
            >
              <video
                ref={videoRef}
                src="/videos/counter.mp4"
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)]/60 via-transparent to-[var(--background)]/20" />
            </motion.div>
          </div>

          {/* COUNTER SECTION */}
          <motion.div
            ref={ref}
            style={{
              opacity: contentOpacity,
              y: contentY,
              scale: contentScale,
            }}
            className="w-full px-4 sm:px-6"
          >
            {shouldShowCounters && (
              <>
                <div className="mb-10 text-center">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="inline-flex items-center px-5 py-3 rounded-2xl bg-gradient-to-r from-[var(--primary)]/20 to-[var(--primary)]/10 backdrop-blur-sm border border-[var(--primary)]/30 mb-6 shadow-lg"
                  >
                    <TrendingUp className="w-5 h-5 mr-3 text-[var(--primary)]" />
                    <span className="text-sm font-semibold tracking-wide text-[var(--primary)]">OUR ACHIEVEMENTS</span>
                  </motion.div>
                  
                  <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4"
                  >
                    Numbers That
                    <br />
                    <span className="bg-gradient-to-r from-[var(--primary)] via-[#0d8f8c] to-[var(--primary)] bg-clip-text text-transparent">
                      Define Excellence
                    </span>
                  </motion.h2>
                  
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-base sm:text-lg text-[var(--foreground)]/70 leading-relaxed max-w-2xl mx-auto"
                  >
                    Every milestone tells a story of dedication, innovation, and the relentless pursuit of perfection.
                  </motion.p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
                  {counters.map((counter, i) => {
                    const Icon = counter.icon;
                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 30, scale: 0.9 }}
                        animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                        transition={{ 
                          duration: 0.8, 
                          delay: 0.3 + i * 0.15,
                          type: "spring",
                          stiffness: 100
                        }}
                        className="group"
                      >
                        <div className="p-6 rounded-3xl border border-[var(--primary)]/20 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105">
                          <div className="flex items-start space-x-4">
                            <div className="relative">
                              <div className="absolute inset-0 bg-gradient-to-r from-[var(--primary)]/30 to-[var(--primary)]/20 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-500" />
                              <div className="relative p-3 rounded-2xl bg-gradient-to-br from-[var(--primary)]/20 to-[var(--primary)]/10 border border-[var(--primary)]/30">
                                <Icon className="w-6 h-6 text-[var(--primary)]" />
                              </div>
                            </div>
                            <div className="flex-1">
                              <div className="flex items-baseline space-x-1 mb-2">
                                <span className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-[var(--primary)] to-[#0d8f8c] bg-clip-text text-transparent">
                                  {counter.value}
                                </span>
                                <span className="text-xl sm:text-2xl font-bold text-[var(--primary)]/80">
                                  {counter.suffix}
                                </span>
                              </div>
                              <p className="text-sm font-medium text-[var(--foreground)]/80 leading-relaxed">
                                {counter.label}
                              </p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </>
            )}
          </motion.div>
        </div>
      )}
    </section>
  );
}