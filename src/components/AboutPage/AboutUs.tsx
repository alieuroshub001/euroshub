/* eslint-disable react/jsx-no-undef */
'use client';

import { motion } from 'framer-motion';
import { Award, Globe, HeartHandshake, Users } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import Counter from '../Homepage/Counter';
import Team from '../Homepage/Team';
import Testimonials from '../Homepage/Testimonial';

const principles = [
  {
    icon: <Globe className="w-6 h-6 text-[var(--primary)]" />,
    title: 'Global Perspective',
    description:
      'We think globally while acting locally, bringing international standards to every project.',
  },
  {
    icon: <Users className="w-6 h-6 text-[var(--primary)]" />,
    title: 'Client-Centric',
    description:
      'Your success is our priority. We listen first, then deliver solutions tailored to your needs.',
  },
  {
    icon: <Award className="w-6 h-6 text-[var(--primary)]" />,
    title: 'Excellence',
    description:
      'We pursue perfection in every detail, delivering work that exceeds expectations.',
  },
  {
    icon: <HeartHandshake className="w-6 h-6 text-[var(--primary)]" />,
    title: 'Integrity',
    description:
      'Honest communication and ethical practices form the foundation of all our relationships.',
  },
];

const journey = [
  {
    year: '2013',
    title: 'Humble Beginnings',
    description:
      'Founded in Rawalpindi with a small team of 5 passionate technologists, delivering local IT solutions.',
  },
  {
    year: '2016',
    title: 'First International Client',
    description:
      'Expanded services to North America, establishing our reputation for reliable offshore development.',
  },
  {
    year: '2019',
    title: 'Business Solutions Division',
    description:
      'Launched our business process outsourcing services, becoming a full-service partner.',
  },
  {
    year: '2023',
    title: 'Global Presence',
    description:
      'Serving clients in 12 countries with a team of 50+ experts across technology and business domains.',
  },
];

export default function AboutUs() {
  return (
    <main className="text-[var(--foreground)]">

      {/* HERO - White background */}
      <section className="relative py-28 px-6 overflow-hidden bg-[var(--background)]">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center px-4 py-2 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] mb-6"
            >
              <HeartHandshake className="w-5 h-5 mr-2" />
              <span className="text-sm font-medium">OUR STORY</span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            >
              Building Digital <span className="text-[var(--primary)]">Futures</span> Since 2013
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg md:text-xl opacity-80 mb-8"
            >
              EurosHub is a global technology and business solutions provider committed to delivering excellence through innovation, expertise, and client-focused services.
            </motion.p>
          </div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative w-full h-auto flex justify-center items-center"
          >
            <Image
              src="/assets/images/hero.png"
              alt="EurosHub team meeting"
              width={500}
              height={400}
              className="object-contain"
              priority
            />
          </motion.div>
        </div>
      </section>

      {/* CORE PRINCIPLES - Secondary background */}
      <section className="py-20 bg-[var(--secondary)]">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Our Core <span className="text-[var(--primary)]">Principles</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.8 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl opacity-80 max-w-3xl mx-auto mb-12"
          >
            The foundation of everything we do at EurosHub
          </motion.p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            {principles.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="p-6 rounded-xl shadow-sm border border-[var(--secondary)]/20 bg-[var(--card-bg)]"
              >
                <div className="w-12 h-12 bg-[var(--primary)]/10 rounded-full flex items-center justify-center mb-4">
                  {p.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{p.title}</h3>
                <p className="text-[var(--foreground)] opacity-70">{p.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* OUR JOURNEY - White background */}
      <section className="py-20 bg-[var(--background)]">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Our <span className="text-[var(--primary)]">Journey</span>
            </h2>
            <div className="space-y-6">
              {journey.map((j, idx) => (
                <div className="flex" key={j.title}>
                  <div className="flex flex-col items-center mr-6">
                    <div className="w-4 h-4 bg-[var(--primary)] rounded-full mt-1"></div>
                    {idx !== journey.length - 1 && (
                      <div className="w-px h-full bg-[var(--primary)] opacity-30"></div>
                    )}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{`${j.year} - ${j.title}`}</h3>
                    <p className="text-[var(--foreground)] opacity-80">{j.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Journey Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative w-full h-auto flex justify-center items-center"
          >
            <Image
              src="/assets/images/hero.png"
              alt="EurosHub office growth"
              width={500}
              height={400}
              className="object-contain"
            />
          </motion.div>
        </div>
      </section>

      {/* STATS / TEAM / TESTIMONIALS - Secondary background */}
      <div className="bg-[var(--secondary)]">
        <Counter />
        <Team />
        <Testimonials />
      </div>

      {/* CALL TO ACTION - Primary color */}
      <section className="py-20 bg-[var(--primary)] text-white text-center">
        <div className="max-w-7xl mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold mb-6"
          >
            Ready to Start Your Project?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.9 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl mb-8 max-w-3xl mx-auto"
          >
            Whether you need technical solutions or business process support, we have the expertise to help you succeed.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Link
              href="/contact"
              className="bg-white text-[var(--primary)] px-8 py-3 rounded-full font-medium hover:bg-opacity-90 transition"
            >
              Get in Touch
            </Link>
            <Link
              href="/services"
              className="border border-white text-white px-8 py-3 rounded-full font-medium hover:bg-white hover:text-[var(--primary)] transition"
            >
              Explore Services
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}