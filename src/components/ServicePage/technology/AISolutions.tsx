'use client';
import { Cpu } from 'lucide-react';
import { Service } from '../type';

const AISolutions: Service = {
  id: 15,
  title: 'AI Solutions',
  icon: <Cpu className="w-8 h-8 text-[var(--primary)]" />,
  description: 'Intelligent automation',
  longDescription: 'We implement AI and machine learning solutions that automate processes, enhance decision-making, and create competitive advantages.',
  features: [
    'Machine learning models',
    'Natural language processing',
    'Computer vision',
    'Predictive analytics',
    'Chatbots and virtual assistants',
    'AI strategy consulting'
  ],
  image: '/assets/services/ai.jpg'
};

export default AISolutions;