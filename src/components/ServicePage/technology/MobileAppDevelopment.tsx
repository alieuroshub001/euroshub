'use client';
import { Smartphone } from 'lucide-react';
import { Service } from '../type';

const MobileAppDevelopment: Service = {
  id: 12,
  title: 'Mobile App Development',
  icon: <Smartphone className="w-8 h-8 text-[var(--primary)]" />,
  description: 'iOS & Android applications',
  longDescription: 'We create native and cross-platform mobile applications that engage users and deliver value through intuitive interfaces and robust functionality.',
  features: [
    'iOS development (Swift)',
    'Android development (Kotlin)',
    'Cross-platform (Flutter, React Native)',
    'App store optimization',
    'Push notifications',
    'Offline functionality'
  ],
  image: '/assets/services/app.jpeg'
};

export default MobileAppDevelopment;