'use client';
import { Server } from 'lucide-react';
import { Service } from '../type';

const DatabaseManagement: Service = {
  id: 10,
  title: 'Database Management',
  icon: <Server className="w-8 h-8 text-[var(--primary)]" />,
  description: 'Optimized data storage',
  longDescription: 'We design, implement, and maintain database systems that ensure your data is secure, accessible, and performing at peak efficiency.',
  features: [
    'Database design',
    'Performance tuning',
    'Backup and recovery',
    'Security management',
    'Data governance',
    'Cloud database solutions'
  ],
  image: '/assets/services/dbms.jpg'
};

export default DatabaseManagement;