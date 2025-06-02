import { JSX } from 'react';

export interface Service {
  id: number;
  title: string;
  icon: JSX.Element;
  description: string;
  longDescription: string;
  features: string[];
  slug: string;
  image: string;
}

export interface ServiceDetailProps {
  service: Service;
  onBack: () => void;
  serviceType: 'business' | 'tech';
}