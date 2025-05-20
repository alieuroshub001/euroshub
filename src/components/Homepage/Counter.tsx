'use client';

import { motion } from 'framer-motion';
import {
  BriefcaseIcon,
  CheckCircleIcon,
  GroupIcon,
  UsersIcon,
} from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const Counter = () => {
  const [counters, setCounters] = useState([
    {
      value: 0,
      target: 150,
      label: 'Projects Completed',
      suffix: '+',
      icon: CheckCircleIcon,
    },
    {
      value: 0,
      target: 50,
      label: 'Clients Worldwide',
      suffix: '+',
      icon: UsersIcon,
    },
    {
      value: 0,
      target: 10,
      label: 'Years Experience',
      suffix: '',
      icon: BriefcaseIcon,
    },
    {
      value: 0,
      target: 20,
      label: 'Team Members',
      suffix: '+',
      icon: GroupIcon,
    },
  ]);

  useEffect(() => {
    const duration = 2000;
    const increment = 10;
    const steps = duration / increment;

    counters.forEach((counter, index) => {
      const stepValue = counter.target / steps;
      let currentStep = 0;

      const timer = setInterval(() => {
        currentStep++;
        const newValue = Math.round(stepValue * currentStep);

        setCounters(prev =>
          prev.map((item, i) =>
            i === index
              ? {
                  ...item,
                  value: newValue > item.target ? item.target : newValue,
                }
              : item
          )
        );

        if (currentStep >= steps) clearInterval(timer);
      }, increment);
    });
  }, []);

  return (
    <section className="relative py-20 bg-[var(--secondary)] text-[var(--foreground)] overflow-hidden">
      {/* Gradient overlay */}
      <div className="absolute -z-10 inset-0 bg-gradient-to-r from-[#c2e9fb] to-[#a1c4fd] dark:from-[#232526] dark:to-[#414345] opacity-20" />

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 items-center gap-12">
        {/* Animated counters */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: { transition: { staggerChildren: 0.2 } },
            hidden: {},
          }}
          className="grid grid-cols-2 gap-6 md:gap-8"
        >
          {counters.map((counter, index) => {
            const Icon = counter.icon;
            return (
              <motion.div
                key={index}
                className="text-center bg-[var(--card-bg)] rounded-xl p-6 shadow hover:shadow-lg transition"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="flex justify-center mb-2"
                >
                  <Icon className="w-8 h-8 text-[var(--primary)]" />
                </motion.div>
                <div className="text-4xl font-bold text-[var(--primary)]">
                  {counter.value}
                  {counter.suffix}
                </div>
                <div className="mt-2 text-sm md:text-base opacity-80">
                  {counter.label}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Animated image */}
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="relative w-full h-[300px] md:h-[400px]"
        >
          <Image
            src="/assets/images/counter.png"
            alt="Counter visual"
            layout="fill"
            objectFit="contain"
            priority
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Counter;
