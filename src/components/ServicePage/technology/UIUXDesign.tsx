'use client';
import { Globe } from 'lucide-react';
import { Service } from '../type';

const UIUXDesign: Service = {
  id: 13,
  title: 'UI/UX Design',
  icon: <Globe className="w-8 h-8 text-[var(--primary)]" />,
  description: 'User-centered design',
  longDescription: 'Our design team creates beautiful, intuitive interfaces that enhance user satisfaction and drive conversion through research-based design principles.',
  features: [
    'User research',
    'Wireframing and prototyping',
    'Interaction design',
    'Usability testing',
    'Design systems',
    'Accessibility compliance'
  ],
  image: '/assets/services/uiux.jpeg'
};

export default UIUXDesign;