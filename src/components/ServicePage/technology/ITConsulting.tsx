'use client';
import { Users } from 'lucide-react';
import { Service } from '../type';

const ITConsulting: Service = {
  id: 18,
  title: 'IT Consulting',
  icon: <Users className="w-8 h-8 text-[var(--primary)]" />,
  description: 'Strategic technology guidance',
  longDescription: 'Our IT consultants help align your technology strategy with business objectives for maximum impact and ROI.',
  features: [
    'Technology roadmap',
    'System architecture',
    'Vendor selection',
    'Digital transformation',
    'IT governance',
    'Cost-benefit analysis'
  ],
  image: '/assets/services/consulting.jpg'
};

export default ITConsulting;