'use client';
import { Cloud } from 'lucide-react';
import { Service } from '../type';

const CloudSolutions: Service = {
  id: 14,
  title: 'Cloud Solutions',
  icon: <Cloud className="w-8 h-8 text-[var(--primary)]" />,
  description: 'Scalable cloud infrastructure',
  longDescription: 'We help businesses migrate to and optimize cloud platforms for improved scalability, reliability, and cost-efficiency.',
  features: [
    'AWS/Azure/GCP solutions',
    'Cloud migration',
    'Serverless architecture',
    'Containerization',
    'Cloud security',
    'Cost optimization'
  ],
  image: '/assets/services/cloud.jpg'
};

export default CloudSolutions;