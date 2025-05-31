'use client';
import { JSX, useState } from 'react';
import { 
  Headphones, ClipboardList, Keyboard, Database,
  PhoneOutgoing, LayoutDashboard, HardDrive, Search,
  BarChart2, Server, Code, Smartphone, Globe, Cpu, Cloud,
  Users, BookOpen, Shield, MessageSquare, Settings
} from 'lucide-react';
import Image from 'next/image';

interface Service {
  id: number;
  title: string;
  icon: JSX.Element;
  description: string;
  longDescription: string;
  features: string[];
  slug: string;
  image: string;
}

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
    image: '/assets/services/virtual.jpeg' 
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
    image: '/assets/services/pm.jpeg' 
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
    image: '/assets/services/entry.jpg' 
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

export default function Services() {
  const [activeTab, setActiveTab] = useState<'business' | 'tech'>('business');
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const currentServices = activeTab === 'business' ? businessServices : techServices;

  return (
    <section className="py-20 text-[var(--foreground)] bg-[var(--background)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Our Comprehensive Services
          </h2>
          <p className="text-lg md:text-xl opacity-80 max-w-3xl mx-auto">
            We offer end-to-end solutions covering both business operations and technology development needs
          </p>
        </div>

        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-[var(--card-bg)]/30 rounded-lg p-1">
            <button
              onClick={() => {
                setActiveTab('business');
                setSelectedService(null);
              }}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                activeTab === 'business'
                  ? 'bg-[var(--primary)] text-white shadow-md'
                  : 'hover:bg-[var(--card-bg)]/60'
              }`}
            >
              Business Services
            </button>
            <button
              onClick={() => {
                setActiveTab('tech');
                setSelectedService(null);
              }}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                activeTab === 'tech'
                  ? 'bg-[var(--primary)] text-white shadow-md'
                  : 'hover:bg-[var(--card-bg)]/60'
              }`}
            >
              Technology Services
            </button>
          </div>
        </div>

        {!selectedService ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentServices.map((service) => (
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
                    priority={service.id <= 3} // Prioritize loading first few images
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
          <div className="bg-[var(--card-bg)] rounded-xl overflow-hidden shadow-lg">
            <div className="relative h-64 w-full">
              <Image
                src={selectedService.image}
                alt={selectedService.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
              <div className="absolute bottom-6 left-6">
                <h2 className="text-3xl font-bold text-white">{selectedService.title}</h2>
                <p className="text-white/90">{selectedService.description}</p>
              </div>
              <button 
                onClick={() => setSelectedService(null)}
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
                    {selectedService.longDescription}
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-4">Key Features</h3>
                  <ul className="space-y-3">
                    {selectedService.features.map((feature, index) => (
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
                    Contact us about {selectedService.title}
                  </button>
                  <button 
                    onClick={() => setSelectedService(null)}
                    className="bg-[var(--card-bg)] border border-[var(--border)] px-6 py-3 rounded-lg font-medium hover:bg-[var(--card-bg)]/80 transition-all flex-1 max-w-md"
                  >
                    View all {activeTab === 'business' ? 'business' : 'technology'} services
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}