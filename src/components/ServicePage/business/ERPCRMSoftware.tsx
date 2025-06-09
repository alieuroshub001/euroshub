'use client';
import { LayoutDashboard } from 'lucide-react';
import { Service } from '../type';

const ERPCRMSoftware: Service = {
  id: 6,
  title: 'ERP/CRM Software',
  icon: <LayoutDashboard className="w-8 h-8 text-[var(--primary)]" />,
  description: 'Business system implementation',
  longDescription: 'We implement and customize ERP/CRM solutions that streamline your operations, improve customer relationships, and provide actionable business insights.',
  features: [
    'System selection consulting',
    'Customization and configuration',
    'Data migration',
    'User training',
    'Integration with existing tools',
    'Ongoing support'
  ],
  image: '/assets/services/crm.jpg'
};

export default ERPCRMSoftware;