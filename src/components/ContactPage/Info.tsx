'use client';

import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const contactInfo = [
  {
    icon: <Mail className="h-6 w-6" />,
    title: 'Email Us',
    details: 'contact@euroshub.com',
    description: 'For general inquiries',
    link: 'mailto:contact@euroshub.com'
  },
  {
    icon: <Phone className="h-6 w-6" />,
    title: 'Call Us',
    details: '+92 334 5678900',
    description: 'Mon-Sat, 9am-6pm',
    link: 'tel:+923345678900'
  },
  {
    icon: <MapPin className="h-6 w-6" />,
    title: 'Visit Us',
    details: 'Office 509, 5th Floor, Kohistan Tower',
    description: 'Saddar, Rawalpindi',
    link: 'https://maps.google.com'
  },
  {
    icon: <Clock className="h-6 w-6" />,
    title: 'Business Hours',
    details: 'Monday - Saturday: 9am - 6pm',
    description: 'Sunday: Closed',
    link: '#'
  }
];

export default function ContactInfo() {
  return (
    <section className="py-12 px-4 sm:px-6 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactInfo.map((info, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="relative bg-[var(--card-bg)] border border-[var(--secondary)] rounded-lg p-6 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-[var(--primary)] opacity-70"></div>
              <div className="flex flex-col items-center text-center">
                <div className="flex justify-center items-center w-12 h-12 bg-[var(--secondary)] text-[var(--primary)] rounded-full mb-4">
                  {info.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{info.title}</h3>
                <a 
                  href={info.link} 
                  className="font-medium text-[var(--primary)] hover:underline transition-all"
                  target={info.link.startsWith('http') ? '_blank' : ''}
                  rel={info.link.startsWith('http') ? 'noopener noreferrer' : ''}
                >
                  {info.details}
                </a>
                <p className="text-sm text-[var(--foreground)] opacity-70 mt-1">{info.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}