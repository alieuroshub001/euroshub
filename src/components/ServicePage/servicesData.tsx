import {
    BarChart2,
    BookOpen,
    ClipboardList,
    Cloud,
    Code,
    Cpu,
    Database,
    Globe,
    HardDrive,
    Headphones,
    Keyboard,
    LayoutDashboard,
    MessageSquare,
    PhoneOutgoing,
    Search,
    Server,
    Settings,
    Shield,
    Smartphone,
    Users
} from 'lucide-react';
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
  
  export const businessServices: Service[] = [
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
  
  export const techServices: Service[] = [
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
  