'use client';

import { motion } from 'framer-motion';
import { Clock, Mail, MapPin, Phone } from 'lucide-react';

const contactInfo = [
  {
    icon: Mail,
    title: 'Email Us',
    details: 'hello@euroshub.com',
    description: 'For general inquiries',
    link: 'mailto:hello@euroshub.com',
  },
  {
    icon: Phone,
    title: 'Call Us',
    details: '+92 300 0369622',
    description: 'Mon-Sat, 9am-6pm',
    link: 'tel:+923000369622',
  },
  {
    icon: MapPin,
    title: 'Visit Us',
    details: 'Office 509, 5th Floor, Kohistan Tower',
    description: 'Saddar, Rawalpindi',
    link: 'https://maps.google.com',
  },
  {
    icon: Clock,
    title: 'Business Hours',
    details: 'Monday - Saturday: 24 Hours',
    description: 'Sunday: Closed',
    link: '#',
  },
];

export default function ContactInfo() {
  return (
    <section className="py-12 px-4 sm:px-6 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactInfo.map(({ icon: Icon, title, details, description, link }, index) => {
            const isExternal = link.startsWith('http');
            return (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="relative bg-[var(--card-bg)] border border-[var(--secondary)] rounded-lg p-6 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-[var(--primary)] opacity-70 rounded-t-md"></div>
                <div className="flex flex-col items-center text-center">
                  <div className="flex justify-center items-center w-12 h-12 bg-[var(--secondary)] text-[var(--primary)] rounded-full mb-4">
                    <Icon className="h-6 w-6" aria-label={title} />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{title}</h3>
                  <a
                    href={link}
                    className="font-medium text-[var(--primary)] hover:underline transition-all"
                    target={isExternal ? '_blank' : undefined}
                    rel={isExternal ? 'noopener noreferrer' : undefined}
                  >
                    {details}
                  </a>
                  <p className="text-sm text-[var(--foreground)] opacity-70 mt-1">
                    {description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
