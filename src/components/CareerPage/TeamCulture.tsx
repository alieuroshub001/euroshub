'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const culturePoints = [
  {
    title: "Collaboration",
    description: "We believe in working together across teams and disciplines",
    image: "/assets/images/colab.svg",
  },
  {
    title: "Innovation",
    description: "We encourage creative thinking and trying new approaches",
    image: "/assets/images/innovation.svg",
  },
  {
    title: "Growth",
    description: "We support continuous learning and professional development",
    image: "/assets/images/growth.svg",
  },
  {
    title: "Balance",
    description: "We promote healthy work-life integration",
    image: "/assets/images/balance.svg",
  },
];

export default function TeamCulture() {
  return (
    <section id="culture" className="py-20 bg-[var(--secondary)] text-[var(--foreground)]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Culture</h2>
          <p className="text-lg md:text-xl opacity-80">What makes EurosHub a great place to work</p>
        </div>

        {/* Culture Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {culturePoints.map((point, index) => (
            <motion.div
              key={point.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-[var(--card-bg)] rounded-xl shadow-sm flex flex-col h-full overflow-hidden"
            >
              <div className="flex-grow flex items-center justify-center p-6">
                <Image
                  src={point.image}
                  alt={point.title}
                  width={160}
                  height={160}
                  className="object-contain"
                  priority={index < 2}
                />
              </div>
              <div className="px-6 pb-6 text-center">
                <h3 className="text-xl font-semibold mb-2">{point.title}</h3>
                <p className="opacity-70">{point.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 bg-[var(--primary)]/10 rounded-xl p-8 md:p-12 text-center"
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-4">Ready to join us?</h3>
          <p className="text-lg mb-6 max-w-3xl mx-auto">
            We&apos;re always looking for talented individuals who share our passion for innovation and excellence.
          </p>
          <a href="#openings">
            <button className="bg-[var(--primary)] text-white px-8 py-3 rounded-full font-medium hover:opacity-90 transition">
              Browse Open Positions
            </button>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
