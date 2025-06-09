'use client';
import { Headphones } from 'lucide-react';
import { Service } from '../type';

const VirtualAssistance: Service = {
  id: 1,
  title: 'Virtual Assistance',
  icon: <Headphones className="w-8 h-8 text-[var(--primary)]" />,
  description: 'Remote support for administrative tasks',
  longDescription: 'Our professional virtual assistants handle your administrative tasks efficiently, allowing you to focus on core business activities. We provide dedicated support tailored to your specific business needs.',
  features: [
    'Email and calendar management',
    'Customer support services',
    'Data entry and organization',
    'Appointment scheduling',
    'Travel arrangements',
    'Document preparation'
  ],
  image: '/assets/services/virtual-assistant.jpg'
};

export default VirtualAssistance;