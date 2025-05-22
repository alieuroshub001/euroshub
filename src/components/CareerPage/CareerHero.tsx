'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

export default function CareerHero() {
  return (
    <section className="relative bg-[var(--background)] text-[var(--foreground)] pt-32 pb-24 px-6 md:px-16 lg:px-32 overflow-hidden">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 items-center gap-12">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            Build Your Future at <span className="text-[var(--primary)]">EurosHub</span>
          </h1>
          <p className="text-lg md:text-xl text-[var(--foreground)] opacity-80 mb-8">
            Join our team of innovators and problem-solvers. We offer exciting opportunities to work on cutting-edge projects while growing your career.
          </p>
          <div className="flex gap-4 flex-wrap">
            <a href="#openings">
              <button className="bg-[var(--primary)] text-white px-6 py-3 rounded-full font-medium hover:opacity-90 transition">
                View Open Positions
              </button>
            </a>
            <a href="#culture">
              <button className="border border-[var(--primary)] text-[var(--primary)] px-6 py-3 rounded-full font-medium hover:bg-[var(--primary)] hover:text-white transition">
                Our Culture
              </button>
            </a>
          </div>
        </motion.div>

        {/* Hero Image */}
        <motion.div 
          className="relative w-full h-[300px] md:h-[400px] lg:h-[500px]"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Image
            src="/assets/images/team.svg"
            alt="Team working together"
            layout="fill"
            objectFit="contain"
            priority
          />
        </motion.div>
      </div>

      {/* Subtle Decorative Gradient Background */}
      <div className="absolute -z-10 top-0 left-0 w-full h-full bg-gradient-to-br from-[#a8edea] to-[#fed6e3] opacity-20" />
    </section>
  );
}