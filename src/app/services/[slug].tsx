/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import ServiceDetail from '@/components/ServicePage/ServiceDetail';
import { businessServices, techServices } from '@/components/ServicePage/servicesData';
import { notFound } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ServicePage({ params }: { params: { slug: string } }) {
  const [service, setService] = useState<any>(null);
  const [serviceType, setServiceType] = useState<'business' | 'tech'>('business');

  useEffect(() => {
    // Combine all services
    const allServices = [...businessServices, ...techServices];
    
    // Find the service with matching slug
    const foundService = allServices.find(s => s.slug === params.slug);
    
    if (foundService) {
      setService(foundService);
      // Determine if it's a business or tech service
      setServiceType(
        businessServices.some((s: { slug: string; }) => s.slug === params.slug) 
          ? 'business' 
          : 'tech'
      );
    } else {
      notFound();
    }
  }, [params.slug]);

  if (!service) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--primary)]"></div>
    </div>;
  }

  return (
    <div className="min-h-screen">
      <ServiceDetail 
        service={service} 
        onBack={() => window.history.back()}
        serviceType={serviceType}
      />
    </div>
  );
}