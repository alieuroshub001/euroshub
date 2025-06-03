'use client';
import {
    BarChart2,
    ClipboardList,
    Database,
    HardDrive,
    Headphones,
    Keyboard,
    LayoutDashboard,
    PhoneOutgoing,
    Search,
    Server
} from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import ServiceDetail from './ServiceDetail';
import { Service } from './type';

const businessServices: Service[] = [
    { 
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
        slug: 'virtual-assistance', 
        image: '/assets/services/virtual-assistant.jpg' 
      },
      { 
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
        slug: 'project-management', 
        image: '/assets/services/project-management.JPG' 
      },
      { 
        id: 3, 
        title: 'Data Entry & Transcription', 
        icon: <Keyboard className="w-8 h-8 text-[var(--primary)]" />, 
        description: 'Accurate data processing services',
        longDescription: 'We provide meticulous data entry and transcription services with 99.9% accuracy. Our team handles all types of data conversion needs with strict confidentiality protocols.',
        features: [
          'Document digitization',
          'Survey data entry',
          'Audio/video transcription',
          'Database population',
          'Data cleaning and validation',
          'OCR processing'
        ],
        slug: 'data-entry-transcription', 
        image: '/assets/services/DATA-entry.jpEg' 
      },
      { 
        id: 4, 
        title: 'Data Extraction/ETL', 
        icon: <Database className="w-8 h-8 text-[var(--primary)]" />, 
        description: 'Structured data collection',
        longDescription: 'Our ETL (Extract, Transform, Load) services help you consolidate data from multiple sources into usable formats for analysis and decision making.',
        features: [
          'Web scraping and crawling',
          'API data extraction',
          'PDF/text extraction',
          'Data transformation',
          'Database migration',
          'Data warehousing'
        ],
        slug: 'data-extraction-etl', 
        image: '/assets/services/extraction.jpg' 
      },
      { 
        id: 5, 
        title: 'Lead Generation', 
        icon: <PhoneOutgoing className="w-8 h-8 text-[var(--primary)]" />, 
        description: 'Targeted prospect identification',
        longDescription: 'We help you build a pipeline of qualified leads through multi-channel outreach and advanced targeting techniques tailored to your ideal customer profile.',
        features: [
          'B2B/B2C lead research',
          'Email and LinkedIn outreach',
          'Lead qualification',
          'CRM integration',
          'Appointment setting',
          'Performance analytics'
        ],
        slug: 'lead-generation', 
        image: '/assets/services/lead.jpeg' 
      },
      { 
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
        slug: 'erp-crm-software', 
        image: '/assets/services/crm.jpg' 
      },
      { 
        id: 7, 
        title: 'Data Mining', 
        icon: <HardDrive className="w-8 h-8 text-[var(--primary)]" />, 
        description: 'Insight extraction from data',
        longDescription: 'Our data mining services uncover valuable patterns and relationships in your data that can drive strategic decisions and competitive advantage.',
        features: [
          'Pattern recognition',
          'Predictive modeling',
          'Market basket analysis',
          'Customer segmentation',
          'Anomaly detection',
          'Trend analysis'
        ],
        slug: 'data-mining', 
        image: '/assets/services/mining.jpg' 
      },
      { 
        id: 8, 
        title: 'Market Research', 
        icon: <Search className="w-8 h-8 text-[var(--primary)]" />, 
        description: 'Competitive intelligence',
        longDescription: 'We conduct comprehensive market research to help you understand your industry landscape, customer needs, and competitive positioning.',
        features: [
          'Competitor analysis',
          'Customer surveys',
          'Focus group facilitation',
          'Market sizing',
          'SWOT analysis',
          'Trend forecasting'
        ],
        slug: 'market-research', 
        image: '/assets/services/research.jpg' 
      },
      { 
        id: 9, 
        title: 'Data Analysis', 
        icon: <BarChart2 className="w-8 h-8 text-[var(--primary)]" />, 
        description: 'Statistical business insights',
        longDescription: 'Our data analysts transform your raw data into actionable insights through advanced statistical techniques and clear visualizations.',
        features: [
          'Descriptive analytics',
          'Diagnostic analysis',
          'Predictive modeling',
          'Data visualization',
          'KPI development',
          'Performance dashboards'
        ],
        slug: 'data-analysis', 
        image: '/assets/services/analysis.jpeg' 
      },
      { 
        id: 10, 
        title: 'Database Management', 
        icon: <Server className="w-8 h-8 text-[var(--primary)]" />, 
        description: 'Optimized data storage',
        longDescription: 'We design, implement, and maintain database systems that ensure your data is secure, accessible, and performing at peak efficiency.',
        features: [
          'Database design',
          'Performance tuning',
          'Backup and recovery',
          'Security management',
          'Data governance',
          'Cloud database solutions'
        ],
        slug: 'database-management', 
        image: '/assets/services/dbms.jpg' 
      }
    ];
    

export default function BusinessServices() {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  return (
    <>
      {!selectedService ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {businessServices.map((service) => (
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
                  priority={service.id <= 3}
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
          serviceType="business"
        />
      )}
    </>
  );
}