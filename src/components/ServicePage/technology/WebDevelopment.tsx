'use client';
import { Code } from 'lucide-react';
import { Service } from '../type';

const WebDevelopment: Service = {
  id: 11,
  title: 'Web Development',
  icon: <Code className="w-8 h-8 text-[var(--primary)]" />,
  description: 'Custom web applications',
  longDescription: 'We build responsive, high-performance websites and web applications using modern frameworks that deliver exceptional user experiences and business results.',
  features: [
    'Frontend development (React, Angular, Vue)',
    'Backend development (Node.js, Python, PHP)',
    'E-commerce solutions',
    'CMS development',
    'API integration',
    'Progressive Web Apps'
  ],
  image: '/assets/services/dev.jpeg'
};

export default WebDevelopment;