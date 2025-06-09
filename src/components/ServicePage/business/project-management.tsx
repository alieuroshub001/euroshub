'use client';
import { ClipboardList } from 'lucide-react';
import { Service } from '../type';

const ProjectManagement: Service = {
  id: 2,
  title: 'Project Management',
  icon: <ClipboardList className="w-8 h-8 text-[var(--primary)]" />,
  description: 'End-to-end project coordination',
  longDescription: 'Our expert project managers ensure your initiatives are completed on time and within budget. We use proven methodologies to keep your projects on track and stakeholders informed.',
  features: [
    'Project planning and scheduling',
    'Risk assessment and mitigation',
    'Resource allocation',
    'Progress tracking and reporting',
    'Stakeholder communication',
    'Quality assurance'
  ],
  image: '/assets/services/project-management.jpg'
};

export default ProjectManagement;