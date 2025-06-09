'use client';
import { useState } from 'react';
import Image from 'next/image';
import ServiceDetail from './ServiceDetail';
import WebDevelopment from './technology/WebDevelopment';
import MobileAppDevelopment from './technology/MobileAppDevelopment';
import UIUXDesign from './technology/UIUXDesign';
import CloudSolutions from './technology/CloudSolutions';
import AISolutions from './technology/AISolutions';
import DevOpsServices from './technology/DevOpsServices';
import Cybersecurity from './technology/CyberSecurity';
import ITConsulting from './technology/ITConsulting';
import TechnicalDocumentation from './technology/TechnicalDocumentation';
import ChatbotDevelopment from './technology/ChatbotDevelopment';
import { Service } from './type';

const techServices = [
  WebDevelopment,
  MobileAppDevelopment,
  UIUXDesign,
  CloudSolutions,
  AISolutions,
  DevOpsServices,
  Cybersecurity,
  ITConsulting,
  TechnicalDocumentation,
  ChatbotDevelopment
];

export default function TechServices() {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  return (
    <>
      {!selectedService ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {techServices.map((service) => (
            <div 
              key={service.id}
              className="bg-[var(--card-bg)] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer group"
              onClick={() => setSelectedService(service)}
            >
              <div className="relative h-48">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  priority={service.id <= 13}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
                <div className="absolute top-4 right-4 bg-[var(--primary)]/10 p-3 rounded-full backdrop-blur-sm">
                  {service.icon}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-[var(--foreground)]/80 mb-4">{service.description}</p>
                <button className="text-[var(--primary)] font-medium flex items-center">
                  Learn more
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <ServiceDetail 
          service={selectedService} 
          onBack={() => setSelectedService(null)}
          serviceType="tech"
        />
      )}
    </>
  );
}