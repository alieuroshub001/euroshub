'use client';

import { motion, useAnimation } from 'framer-motion';
import {
<<<<<<< HEAD
  Aperture,
  CheckCircle,
  Clock,
  Globe,
  Users
=======
  CheckCircle,
  Users,
  Globe,
  Clock,
  Aperture
>>>>>>> a5407beb32693cae1d3940e576ab8fb84eb3daf2
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

const Counter = () => {
  const [counters, setCounters] = useState([
    {
      value: 0,
      target: 150,
      label: 'Projects Completed',
      suffix: '+',
      icon: CheckCircle,
<<<<<<< HEAD
      color: 'text-[var(--primary)]',
      bg: 'bg-[var(--primary)]',
=======
      color: 'text-[#17b6b2]',
      bg: 'bg-[#17b6b2]',
>>>>>>> a5407beb32693cae1d3940e576ab8fb84eb3daf2
      progress: '0%'
    },
    {
      value: 0,
      target: 50,
      label: 'Global Clients',
      suffix: '+',
      icon: Globe,
<<<<<<< HEAD
      color: 'text-[var(--primary)]',
      bg: 'bg-[var(--primary)]',
=======
      color: 'text-[#3b82f6]',
      bg: 'bg-[#3b82f6]',
>>>>>>> a5407beb32693cae1d3940e576ab8fb84eb3daf2
      progress: '0%'
    },
    {
      value: 0,
      target: 10,
      label: 'Years Experience',
      suffix: '+',
      icon: Clock,
<<<<<<< HEAD
      color: 'text-[var(--primary)]',
      bg: 'bg-[var(--primary)]',
=======
      color: 'text-[#8b5cf6]',
      bg: 'bg-[#8b5cf6]',
>>>>>>> a5407beb32693cae1d3940e576ab8fb84eb3daf2
      progress: '0%'
    },
    {
      value: 0,
      target: 20,
      label: 'Team Experts',
      suffix: '+',
      icon: Users,
<<<<<<< HEAD
      color: 'text-[var(--primary)]',
      bg: 'bg-[var(--primary)]',
=======
      color: 'text-[#ec4899]',
      bg: 'bg-[#ec4899]',
>>>>>>> a5407beb32693cae1d3940e576ab8fb84eb3daf2
      progress: '0%'
    }
  ]);

  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
      animateCounters();
    }
  }, [inView, controls]);

  const animateCounters = () => {
    const duration = 2000;
    const increment = 20;

    counters.forEach((counter, index) => {
      const steps = duration / increment;
      const stepValue = counter.target / steps;
      let currentStep = 0;

      const timer = setInterval(() => {
        currentStep++;
        const newValue = Math.min(
          Math.round(stepValue * currentStep),
          counter.target
        );
        const newProgress = `${Math.min(100, (newValue / counter.target) * 100)}%`;

        setCounters(prev =>
          prev.map((item, i) =>
            i === index ? { 
              ...item, 
              value: newValue,
              progress: newProgress
            } : item
          )
        );

        if (currentStep >= steps) {
          clearInterval(timer);
        }
      }, increment);
    });
  };

  return (
    <section 
      ref={ref}
      className="relative py-20 bg-[var(--secondary)] text-[var(--foreground)] overflow-hidden"
    >
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-white/50 to-[var(--secondary)] dark:from-[#0a0a0a] dark:to-[#1a1a1a]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
<<<<<<< HEAD
        {/* Header section - unchanged */}
=======
        {/* Keep the exact same header section */}
>>>>>>> a5407beb32693cae1d3940e576ab8fb84eb3daf2
        <motion.div
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
          }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] mb-4">
            <Aperture className="w-5 h-5 mr-2" />
            <span className="text-sm font-medium">OUR ACHIEVEMENTS</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            Delivering Excellence <br className="hidden md:block" />
            <span className="text-[var(--primary)]">Across The Globe</span>
          </h2>
        </motion.div>
<<<<<<< HEAD

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
                      damping: 10
                    }
                  }
                }}
                whileHover={{ 
                  y: -5,
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                }}
                className="bg-[var(--card-bg)] border border-[var(--secondary)]/20 rounded-xl p-6 shadow-sm transition-all duration-300"
              >
                <div className="flex items-center mb-4">
                  <div className={`p-3 rounded-lg bg-[var(--primary)]/10`}>
                    <Icon className={`w-6 h-6 text-[var(--primary)]`} />
                  </div>
                  <h3 className="ml-3 text-lg font-medium">
                    {counter.label}
                  </h3>
                </div>
                
                <div className="flex items-end mb-4">
                  <span className={`text-3xl md:text-4xl font-bold text-[var(--primary)]`}>
                    {counter.value}
                  </span>
                  <span className="text-xl md:text-2xl ml-1 text-[var(--primary)]">
                    {counter.suffix}
                  </span>
                </div>
                
                {/* Progress bar */}
                <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: '0%' }}
                    animate={{ width: counter.progress }}
                    transition={{ duration: 2, ease: 'easeOut' }}
                    className={`h-full bg-[var(--primary)] rounded-full`}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Illustration section - removed for better mobile experience */}
=======

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* New counter design with progress bars */}
          <motion.div
            initial="hidden"
            animate={controls}
            variants={{
              visible: { transition: { staggerChildren: 0.15 } },
              hidden: {}
            }}
            className="grid grid-cols-2 gap-6"
          >
            {counters.map((counter, index) => {
              const Icon = counter.icon;
              return (
                <motion.div
                  key={index}
                  variants={{
                    hidden: { opacity: 0, scale: 0.8 },
                    visible: { 
                      opacity: 1, 
                      scale: 1,
                      transition: { 
                        type: 'spring',
                        stiffness: 100,
                        damping: 15
                      }
                    }
                  }}
                  className="relative group"
                >
                  <div className="h-full p-6 rounded-xl bg-[var(--card-bg)] border border-[var(--secondary)]/20 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col">
                    <div className="flex items-center mb-4">
                      <div className={`p-3 rounded-lg ${counter.bg}/10`}>
                        <Icon className={`w-6 h-6 ${counter.color}`} />
                      </div>
                      <h3 className="ml-3 text-lg font-medium">
                        {counter.label}
                      </h3>
                    </div>
                    
                    <div className="mt-auto">
                      <div className={`text-4xl font-bold ${counter.color} mb-3`}>
                        {counter.value}
                        <span className="text-2xl">{counter.suffix}</span>
                      </div>
                      
                      {/* Animated progress bar */}
                      <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: '0%' }}
                          animate={{ width: counter.progress }}
                          transition={{ duration: 2, ease: 'easeOut' }}
                          className={`h-full ${counter.bg} rounded-full`}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Illustration section (unchanged) */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={controls}
            variants={{
              visible: { opacity: 1, x: 0, transition: { duration: 0.8 } }
            }}
            className="relative w-full h-[300px] md:h-[400px]"
          >
            <Image
              src="/assets/images/counter.png"
              alt="Achievements illustration"
              fill
              className="object-contain"
              priority
            />
          </motion.div>
        </div>
>>>>>>> a5407beb32693cae1d3940e576ab8fb84eb3daf2
      </div>
    </section>
  );
};

export default Counter;