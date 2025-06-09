'use client';
import { BookOpen } from 'lucide-react';
import { Service } from '../type';

const TechnicalDocumentation: Service = {
  id: 19,
  title: 'Technical Documentation',
  icon: <BookOpen className="w-8 h-8 text-[var(--primary)]" />,
  description: 'Clear technical communication',
  longDescription: 'We create comprehensive, user-friendly documentation that helps your teams and customers effectively use your technology solutions.',
  features: [
    'API documentation',
    'User manuals',
    'Developer guides',
    'Knowledge bases',
    'Interactive tutorials',
    'Release notes'
  ],
  image: '/assets/services/docs.jpg'
};

export default TechnicalDocumentation;