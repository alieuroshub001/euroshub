'use client';
import {
    BookOpen,
    Cloud,
    Code,
    Cpu,
    Globe,
    MessageSquare,
    Settings,
    Shield,
    Smartphone,
    Users
} from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import ServiceDetail from './ServiceDetail';
import { Service } from './type';

const techServices: Service[] = [
    { 
        id: 11, 
        title: 'Web Development', 
        icon: <Code className="w-8 h-8 text-[var(--primary)]" />, 
        description: 'Custom web applications',
        longDescription: 'We build responsive, high-performance websites and web applications using modern frameworks that deliver exceptional user experiences and business results.',
        features: [
          'Frontend development (React, Angular, Vue)',
          'Backend development (Node.js, Python, PHP)',
          'E-commerce solutions',
          'CMS development',
          'API integration',
          'Progressive Web Apps'
        ],
        slug: 'web-development', 
        image: '/assets/services/dev.jpeg' 
      },
      { 
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
        slug: 'mobile-app-development', 
        image: '/assets/services/app.jpeg' 
      },
      { 
        id: 13, 
        title: 'UI/UX Design', 
        icon: <Globe className="w-8 h-8 text-[var(--primary)]" />, 
        description: 'User-centered design',
        longDescription: 'Our design team creates beautiful, intuitive interfaces that enhance user satisfaction and drive conversion through research-based design principles.',
        features: [
          'User research',
          'Wireframing and prototyping',
          'Interaction design',
          'Usability testing',
          'Design systems',
          'Accessibility compliance'
        ],
        slug: 'ui-ux-design', 
        image: '/assets/services/uiux.jpeg' 
      },
      { 
        id: 14, 
        title: 'Cloud Solutions', 
        icon: <Cloud className="w-8 h-8 text-[var(--primary)]" />, 
        description: 'Scalable cloud infrastructure',
        longDescription: 'We help businesses migrate to and optimize cloud platforms for improved scalability, reliability, and cost-efficiency.',
        features: [
          'AWS/Azure/GCP solutions',
          'Cloud migration',
          'Serverless architecture',
          'Containerization',
          'Cloud security',
          'Cost optimization'
        ],
        slug: 'cloud-solutions', 
        image: '/assets/services/cloud.jpg' 
      },
      { 
        id: 15, 
        title: 'AI Solutions', 
        icon: <Cpu className="w-8 h-8 text-[var(--primary)]" />, 
        description: 'Intelligent automation',
        longDescription: 'We implement AI and machine learning solutions that automate processes, enhance decision-making, and create competitive advantages.',
        features: [
          'Machine learning models',
          'Natural language processing',
          'Computer vision',
          'Predictive analytics',
          'Chatbots and virtual assistants',
          'AI strategy consulting'
        ],
        slug: 'ai-solutions', 
        image: '/assets/services/ai.jpg' 
      },
      { 
        id: 16, 
        title: 'DevOps Services', 
        icon: <Settings className="w-8 h-8 text-[var(--primary)]" />, 
        description: 'Streamlined development workflows',
        longDescription: 'Our DevOps practices bridge the gap between development and operations to deliver software faster and more reliably.',
        features: [
          'CI/CD pipeline implementation',
          'Infrastructure as Code',
          'Monitoring and logging',
          'Microservices architecture',
          'Container orchestration',
          'Performance optimization'
        ],
        slug: 'devops-services', 
        image: '/assets/services/devops.jpg' 
      },
      { 
        id: 17, 
        title: 'Cybersecurity', 
        icon: <Shield className="w-8 h-8 text-[var(--primary)]" />, 
        description: 'Comprehensive protection',
        longDescription: 'We protect your digital assets with enterprise-grade security solutions tailored to your specific risk profile and compliance requirements.',
        features: [
          'Vulnerability assessments',
          'Penetration testing',
          'Security monitoring',
          'Incident response',
          'Compliance management',
          'Security training'
        ],
        slug: 'cybersecurity', 
        image: '/assets/services/security.jpg' 
      },
      { 
        id: 18, 
        title: 'IT Consulting', 
        icon: <Users className="w-8 h-8 text-[var(--primary)]" />, 
        description: 'Strategic technology guidance',
        longDescription: 'Our IT consultants help align your technology strategy with business objectives for maximum impact and ROI.',
        features: [
          'Technology roadmap',
          'System architecture',
          'Vendor selection',
          'Digital transformation',
          'IT governance',
          'Cost-benefit analysis'
        ],
        slug: 'it-consulting', 
        image: '/assets/services/consulting.jpg' 
      },
      { 
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
        slug: 'technical-documentation', 
        image: '/assets/services/docs.jpg' 
      },
      { 
        id: 20, 
        title: 'Chatbot Development', 
        icon: <MessageSquare className="w-8 h-8 text-[var(--primary)]" />, 
        description: 'AI-powered conversations',
        longDescription: 'We build intelligent chatbots that automate customer interactions, reduce support costs, and improve user engagement.',
        features: [
          'Natural language understanding',
          'Multi-channel deployment',
          'Sentiment analysis',
          'CRM integration',
          'Conversation analytics',
          'Continuous learning'
        ],
        slug: 'chatbot-development', 
        image: '/assets/services/chatbot.jpg' 
      }
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