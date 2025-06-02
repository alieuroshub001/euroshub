'use client';

import { motion } from 'framer-motion';
import {
  Check,
  FileText,
  MessageSquare,
  Search,
  Users,
} from 'lucide-react';

const steps = [
  {
    icon: Search,
    title: 'Application Review',
    description: 'We carefully review all applications and resumes',
  },
  {
    icon: FileText,
    title: 'Screening',
    description: 'Initial call with our HR team to discuss the role',
  },
  {
    icon: Users,
    title: 'Technical Assessment',
    description: 'Skills evaluation through tests or case studies',
  },
  {
    icon: MessageSquare,
    title: 'Interviews',
    description: 'Meetings with team members and leadership',
  },
  {
    icon: Check,
    title: 'Offer',
    description: 'We extend an offer to successful candidates',
  },
];

export default function HiringProcess() {
  return (
    <section className="py-20 bg-[var(--background)] text-[var(--foreground)]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Hiring Process</h2>
          <p className="text-lg md:text-xl opacity-80">
            Transparent steps from application to onboarding
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="hidden md:block absolute left-1/2 top-0 h-full w-1 bg-[var(--primary)]/20 -translate-x-1/2 z-0" />

          <div className="space-y-16 md:space-y-0">
            {steps.map(({ icon: Icon, title, description }, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`relative z-10 flex flex-col md:flex-row items-center ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Content Block */}
                  <div
                    className={`md:w-1/2 p-6 ${
                      isEven ? 'md:pr-12' : 'md:pl-12'
                    }`}
                  >
                    <div className="bg-[var(--card-bg)] border border-[var(--secondary)]/30 p-6 rounded-xl shadow-sm">
                      <div className="flex items-center mb-4">
                        <div className="bg-[var(--primary)]/10 p-3 rounded-full mr-4">
                          <Icon className="w-6 h-6 text-[var(--primary)]" />
                        </div>
                        <h3 className="text-xl font-semibold">{title}</h3>
                      </div>
                      <p className="opacity-70">{description}</p>
                    </div>
                  </div>

                  {/* Timeline Dot */}
                  <div className="hidden md:flex w-1/2 justify-center relative">
                    <div
                      className={`absolute top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-[var(--primary)] border-4 border-[var(--background)] text-white flex items-center justify-center font-bold text-xs ${
                        isEven ? 'translate-x-4' : '-translate-x-4'
                      }`}
                    >
                      {index + 1}
                    </div>
                  </div>

                  {/* Spacer to align on alternate side */}
                  <div
                    className={`hidden md:block w-1/2 ${
                      isEven ? 'md:pl-12' : 'md:pr-12'
                    }`}
                  ></div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
