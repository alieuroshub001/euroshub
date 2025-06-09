'use client';
import { PhoneOutgoing } from 'lucide-react';
import { Service } from '../type';

const LeadGeneration: Service = {
  id: 5,
  title: 'Lead Generation',
  icon: <PhoneOutgoing className="w-8 h-8 text-[var(--primary)]" />,
  description: 'Targeted prospect identification',
  longDescription: 'We help you build a pipeline of qualified leads through multi-channel outreach and advanced targeting techniques tailored to your ideal customer profile.',
  features: [
    'B2B/B2C lead research',
    'Email and LinkedIn outreach',
    'Lead qualification',
    'CRM integration',
    'Appointment setting',
    'Performance analytics'
  ],
  image: '/assets/services/lead.jpeg'
};

export default LeadGeneration;