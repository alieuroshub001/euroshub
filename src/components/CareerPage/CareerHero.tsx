'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function CareerHero() {
  return (
    <section className="relative bg-[var(--background)] text-[var(--foreground)] pt-32 pb-24 px-6 md:px-16 lg:px-32 overflow-hidden">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 items-center gap-12">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Build Your Future at <span className="text-[var(--primary)]">EurosHub</span>
          </h1>
          <p className="text-lg md:text-xl opacity-80">
            Join our team of innovators and problem-solvers. We offer exciting opportunities to work on cutting-edge projects while growing your career.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <a href="#openings">
              <button className="bg-[var(--primary)] text-white px-6 py-3 rounded-full font-medium hover:scale-105 hover:opacity-90 transition duration-200">
                View Open Positions
              </button>
            </a>
            <a href="#culture">
              <button className="border border-[var(--primary)] text-[var(--primary)] px-6 py-3 rounded-full font-medium hover:bg-[var(--primary)] hover:text-white hover:scale-105 transition duration-200">
                Our Culture
              </button>
            </a>
          </div>
        </motion.div>

        {/* Hero Image */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative w-full h-[300px] md:h-[400px] lg:h-[500px]"
        >
          <Image
            src="/assets/images/team.svg"
            alt="Team working together"
            fill
            className="object-contain"
            priority
          />
        </motion.div>
      </div>

      {/* Decorative Gradient Background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#a8edea] to-[#fed6e3] opacity-20" />
    </section>
  );
}
