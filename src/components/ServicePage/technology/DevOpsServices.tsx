'use client';
import { Settings } from 'lucide-react';
import { Service } from '../type';

const DevOpsServices: Service = {
  id: 16,
  title: 'DevOps Services',
  icon: <Settings className="w-8 h-8 text-[var(--primary)]" />,
  description: 'Streamlined development workflows',
  longDescription: 'Our DevOps practices bridge the gap between development and operations to deliver software faster and more reliably.',
  features: [
    'CI/CD pipeline implementation',
    'Infrastructure as Code',
    'Monitoring and logging',
    'Microservices architecture',
    'Container orchestration',
    'Performance optimization'
  ],
  image: '/assets/services/devops.jpg'
};

export default DevOpsServices;