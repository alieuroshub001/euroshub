'use client';

import { motion } from 'framer-motion';
import { Globe, Users, Award, HeartHandshake } from 'lucide-react';
import Counter from '../Homepage/Counter';
import Team from '../Homepage/Team';
import Testimonials from '../Homepage/Testimonial';
import Image from 'next/image'; // Added import

export default function AboutUs() {
  return (
    <main className="bg-[var(--background)] text-[var(--foreground)]">
      {/* Hero Section */}
      <section className="relative py-28 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
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
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative w-full h-64 md:h-96 rounded-xl overflow-hidden bg-[var(--card-bg)] shadow-lg"
          >
            <Image
              src="/assets/images/hero.png"
              alt="EurosHub team meeting"
              className="w-full h-full object-cover"
              fill
              priority
            />
          </motion.div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute -z-10 top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute top-[10%] right-[10%] w-64 h-64 bg-[var(--primary)] opacity-5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-[10%] left-[10%] w-80 h-80 bg-[var(--primary)] opacity-5 rounded-full blur-3xl"></div>
        </div>
      </section>

      {/* Mission & Values Section */}
      <section className="py-20 bg-[var(--secondary)]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              Our Core <span className="text-[var(--primary)]">Principles</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.8 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-lg md:text-xl opacity-80 max-w-3xl mx-auto"
            >
              The foundation of everything we do at EurosHub
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-[var(--card-bg)] p-6 rounded-xl shadow-sm"
            >
              <div className="w-12 h-12 bg-[var(--primary)]/10 rounded-full flex items-center justify-center mb-4">
                <Globe className="w-6 h-6 text-[var(--primary)]" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Global Perspective</h3>
              <p className="text-[var(--foreground)] opacity-70">
                We think globally while acting locally, bringing international standards to every project.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-[var(--card-bg)] p-6 rounded-xl shadow-sm"
            >
              <div className="w-12 h-12 bg-[var(--primary)]/10 rounded-full flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-[var(--primary)]" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Client-Centric</h3>
              <p className="text-[var(--foreground)] opacity-70">
                Your success is our priority. We listen first, then deliver solutions tailored to your needs.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-[var(--card-bg)] p-6 rounded-xl shadow-sm"
            >
              <div className="w-12 h-12 bg-[var(--primary)]/10 rounded-full flex items-center justify-center mb-4">
                <Award className="w-6 h-6 text-[var(--primary)]" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Excellence</h3>
              <p className="text-[var(--foreground)] opacity-70">
                We pursue perfection in every detail, delivering work that exceeds expectations.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-[var(--card-bg)] p-6 rounded-xl shadow-sm"
            >
              <div className="w-12 h-12 bg-[var(--primary)]/10 rounded-full flex items-center justify-center mb-4">
                <HeartHandshake className="w-6 h-6 text-[var(--primary)]" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Integrity</h3>
              <p className="text-[var(--foreground)] opacity-70">
                Honest communication and ethical practices form the foundation of all our relationships.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Our <span className="text-[var(--primary)]">Journey</span>
              </h2>
              <div className="space-y-6">
                <div className="flex">
                  <div className="flex flex-col items-center mr-6">
                    <div className="w-4 h-4 bg-[var(--primary)] rounded-full mt-1"></div>
                    <div className="w-px h-full bg-[var(--primary)] opacity-30"></div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">2013 - Humble Beginnings</h3>
                    <p className="text-[var(--foreground)] opacity-80">
                      Founded in Rawalpindi with a small team of 5 passionate technologists, delivering local IT solutions.
                    </p>
                  </div>
                </div>
                <div className="flex">
                  <div className="flex flex-col items-center mr-6">
                    <div className="w-4 h-4 bg-[var(--primary)] rounded-full mt-1"></div>
                    <div className="w-px h-full bg-[var(--primary)] opacity-30"></div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">2016 - First International Client</h3>
                    <p className="text-[var(--foreground)] opacity-80">
                      Expanded services to North America, establishing our reputation for reliable offshore development.
                    </p>
                  </div>
                </div>
                <div className="flex">
                  <div className="flex flex-col items-center mr-6">
                    <div className="w-4 h-4 bg-[var(--primary)] rounded-full mt-1"></div>
                    <div className="w-px h-full bg-[var(--primary)] opacity-30"></div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">2019 - Business Solutions Division</h3>
                    <p className="text-[var(--foreground)] opacity-80">
                      Launched our business process outsourcing services, becoming a full-service partner.
                    </p>
                  </div>
                </div>
                <div className="flex">
                  <div className="flex flex-col items-center mr-6">
                    <div className="w-4 h-4 bg-[var(--primary)] rounded-full mt-1"></div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">2023 - Global Presence</h3>
                    <p className="text-[var(--foreground)] opacity-80">
                      Serving clients in 12 countries with a team of 50+ experts across technology and business domains.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative h-80 md:h-96 rounded-xl overflow-hidden bg-[var(--card-bg)] shadow-lg"
            >
              <Image
                src="/assets/images/hero.png"
                alt="EurosHub office growth"
                className="w-full h-full object-cover"
                fill
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Counter */}
      <Counter />

      {/* Team Section */}
      <Team />

      {/* Testimonials */}
      <Testimonials />

      {/* CTA Section */}
      <section className="py-20 bg-[var(--primary)] text-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-6"
          >
            Ready to Start Your Project?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.9 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg md:text-xl mb-8 max-w-3xl mx-auto"
          >
            Whether you need technical solutions or business process support, we have the expertise to help you succeed.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex justify-center gap-4"
          >
            <a
              href="/contact"
              className="bg-white text-[var(--primary)] px-8 py-3 rounded-full font-medium hover:bg-opacity-90 transition"
            >
              Get in Touch
            </a>
            <a
              href="/services"
              className="border border-white text-white px-8 py-3 rounded-full font-medium hover:bg-white hover:text-[var(--primary)] transition"
            >
              Explore Services
            </a>
          </motion.div>
        </div>
      </section>
    </main>
  );
}