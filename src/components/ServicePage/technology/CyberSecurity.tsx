'use client';
import { Shield } from 'lucide-react';
import { Service } from '../type';

const Cybersecurity: Service = {
  id: 17,
  title: 'Cybersecurity',
  icon: <Shield className="w-8 h-8 text-[var(--primary)]" />,
  description: 'Comprehensive protection',
  longDescription: 'We protect your digital assets with enterprise-grade security solutions tailored to your specific risk profile and compliance requirements.',
  features: [
    'Vulnerability assessments',
    'Penetration testing',
    'Security monitoring',
    'Incident response',
    'Compliance management',
    'Security training'
  ],
  image: '/assets/services/security.jpg'
};

export default Cybersecurity;