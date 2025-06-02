'use client';

import { motion } from 'framer-motion';
import {
  Award,
  Briefcase,
  Globe,
  HeartHandshake,
  Users,
  Zap
} from 'lucide-react';

const benefits = [
  { icon: Briefcase, title: "Career Growth", description: "Clear promotion paths and skill development programs" },
  { icon: HeartHandshake, title: "Health Benefits", description: "Comprehensive medical, dental, and vision coverage" },
  { icon: Globe, title: "Remote Options", description: "Flexible work-from-home and hybrid arrangements" },
  { icon: Zap, title: "Latest Tech", description: "Work with cutting-edge tools and technologies" },
  { icon: Users, title: "Team Culture", description: "Collaborative environment with regular team events" },
  { icon: Award, title: "Recognition", description: "Performance bonuses and achievement awards" }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function CareerBenefits() {
  return (
    <section className="py-20 bg-[var(--secondary)] text-[var(--foreground)]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Why Join Our Team?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-opacity-80"
          >
            We invest in our people and create an environment where everyone can thrive
          </motion.p>
        </div>

        <motion.div
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {benefits.map(({ icon: Icon, title, description }, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 100 }}
              className="bg-[var(--card-bg)] p-6 rounded-xl shadow-sm border border-[var(--secondary)]/20 transition-all duration-300"
            >
              <div className="flex items-start">
                <div className="bg-[var(--primary)]/10 p-3 rounded-full mr-4">
                  <Icon className="w-8 h-8 text-[var(--primary)]" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{title}</h3>
                  <p className="text-[var(--foreground)] opacity-70">{description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
