'use client';
import Image from 'next/image';
import { Service } from './servicesData';

interface ServiceDetailProps {
    service: Service;
    onBack: () => void;
    serviceType: 'business' | 'tech';
  }

export default function ServiceDetail({ service, onBack, serviceType }: ServiceDetailProps) {
  return (
    <div className="bg-[var(--card-bg)] rounded-xl overflow-hidden shadow-lg">
      <div className="relative h-64 w-full">
        <Image
          src={service.image}
          alt={service.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
        <div className="absolute bottom-6 left-6">
          <h2 className="text-3xl font-bold text-white">{service.title}</h2>
          <p className="text-white/90">{service.description}</p>
        </div>
        <button 
          onClick={onBack}
          className="absolute top-4 left-4 bg-white/10 backdrop-blur-sm p-2 rounded-full hover:bg-white/20 transition-all flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to services
        </button>
      </div>
      <div className="p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Service Overview</h3>
            <p className="text-[var(--foreground)]/90 leading-relaxed">
              {service.longDescription}
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Key Features</h3>
            <ul className="space-y-3">
              {service.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-[var(--primary)] mr-2 mt-1">✓</span>
                  <span className="text-[var(--foreground)]/90">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-[var(--border)]">
          <h3 className="text-xl font-semibold mb-4">Ready to get started?</h3>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-[var(--primary)] text-white px-6 py-3 rounded-lg font-medium hover:bg-[var(--primary)]/90 transition-all flex-1 max-w-md">
              Contact us about {service.title}
            </button>
            <button 
              onClick={onBack}
              className="bg-[var(--card-bg)] border border-[var(--border)] px-6 py-3 rounded-lg font-medium hover:bg-[var(--card-bg)]/80 transition-all flex-1 max-w-md"
            >
              View all {serviceType} services
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}