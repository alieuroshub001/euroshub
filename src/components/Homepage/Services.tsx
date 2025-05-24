'use client';

import { JSX, useState } from 'react';
import { 
  HeadsetIcon, 
  ClipboardListIcon,
  KeyboardIcon,
  DatabaseIcon,
  PhoneOutgoingIcon,
  LayoutDashboardIcon,
  HardDriveIcon,
  SearchIcon,
  BarChart2Icon,
  ServerIcon,
  CodeIcon,
  SmartphoneIcon,
  GlobeIcon,
  CpuIcon,
  CloudIcon
} from 'lucide-react';
import { motion, Variants } from 'framer-motion';

interface Service {
  title: string;
  icon: JSX.Element;
  description: string;
}

const businessServices: Service[] = [
  {
    title: 'Virtual Assistance',
    icon: <HeadsetIcon className="w-10 h-10 text-[var(--primary)]" />,
    description: 'Professional remote support for administrative tasks and customer service.',
  },
  {
    title: 'Project Management',
    icon: <ClipboardListIcon className="w-10 h-10 text-[var(--primary)]" />,
    description: 'End-to-end project coordination to keep initiatives on track.',
  },
  {
    title: 'Data Entry & Transcription',
    icon: <KeyboardIcon className="w-10 h-10 text-[var(--primary)]" />,
    description: 'Accurate data processing and document conversion services.',
  },
  {
    title: 'Data Extraction/ETL',
    icon: <DatabaseIcon className="w-10 h-10 text-[var(--primary)]" />,
    description: 'Structured data extraction from various sources and formats.',
  },
  {
    title: 'Lead Generation',
    icon: <PhoneOutgoingIcon className="w-10 h-10 text-[var(--primary)]" />,
    description: 'Targeted prospect identification for sales pipelines.',
  },
  {
    title: 'ERP/CRM Software',
    icon: <LayoutDashboardIcon className="w-10 h-10 text-[var(--primary)]" />,
    description: 'Business system implementation and optimization.',
  },
  {
    title: 'Data Mining',
    icon: <HardDriveIcon className="w-10 h-10 text-[var(--primary)]" />,
    description: 'Extract valuable insights from large datasets.',
  },
  {
    title: 'Market Research',
    icon: <SearchIcon className="w-10 h-10 text-[var(--primary)]" />,
    description: 'Competitive analysis and product evaluation.',
  },
  {
    title: 'Data Analysis',
    icon: <BarChart2Icon className="w-10 h-10 text-[var(--primary)]" />,
    description: 'Statistical analysis for business data.',
  },
  {
    title: 'Database Management',
    icon: <ServerIcon className="w-10 h-10 text-[var(--primary)]" />,
    description: 'Full database administration and optimization.',
  },
];

const techServices: Service[] = [
  {
    title: 'Web Development',
    icon: <CodeIcon className="w-10 h-10 text-[var(--primary)]" />,
    description: 'Custom web applications built with modern technologies.',
  },
  {
    title: 'Mobile App Development',
    icon: <SmartphoneIcon className="w-10 h-10 text-[var(--primary)]" />,
    description: 'iOS and Android apps with seamless user experiences.',
  },
  {
    title: 'UI/UX Design',
    icon: <GlobeIcon className="w-10 h-10 text-[var(--primary)]" />,
    description: 'Beautiful, intuitive interfaces that engage users.',
  },
  {
    title: 'Cloud Solutions',
    icon: <CloudIcon className="w-10 h-10 text-[var(--primary)]" />,
    description: 'Scalable cloud infrastructure and migration.',
  },
  {
    title: 'AI Solutions',
    icon: <CpuIcon className="w-10 h-10 text-[var(--primary)]" />,
    description: 'Intelligent automation and machine learning.',
  },
];

interface ServiceCardProps {
  service: Service;
  variants?: Variants;
  index?: number;
}

interface ServiceCardProps {
  service: Service;
  variants?: Variants;
  index?: number;
}

function ServiceCard({ service, variants }: ServiceCardProps) {
  return (
    <motion.div 
      variants={variants}
      whileHover={{ 
        y: -8,
        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)"
      }}
      className="bg-[var(--card-bg)] p-6 rounded-xl shadow-sm transition flex flex-col items-center h-full"
    >
      <motion.div 
        className="mb-4 bg-[var(--primary)]/10 p-3 rounded-full"
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        {service.icon}
      </motion.div>
      <h3 className="text-lg font-semibold mb-2 text-center">{service.title}</h3>
      <p className="text-sm text-[var(--foreground)] opacity-70 text-center">{service.description}</p>
    </motion.div>
  );
}

export default function Services() {
  const [activeTab, setActiveTab] = useState<'business' | 'tech'>('business');
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  return (
    <section className="py-20 text-[var(--foreground)]"> {/* Removed bg-[var(--secondary)] */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Our Comprehensive Solutions
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl opacity-80"
          >
            End-to-end services covering both business operations and technology development
          </motion.p>
        </div>

        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-[var(--card-bg)]/30 rounded-lg p-1">
            <button
              onClick={() => setActiveTab('business')}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                activeTab === 'business'
                  ? 'bg-[var(--primary)] text-white shadow-md'
                  : 'hover:bg-[var(--card-bg)]/60'
              }`}
            >
              Business Services
            </button>
            <button
              onClick={() => setActiveTab('tech')}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                activeTab === 'tech'
                  ? 'bg-[var(--primary)] text-white shadow-md'
                  : 'hover:bg-[var(--card-bg)]/60'
              }`}
            >
              Technology
            </button>
          </div>
        </div>

        <motion.div 
          key={activeTab}
          variants={container}
          initial="hidden"
          animate="show"
          className="grid md:grid-cols-2 lg:grid-cols-5 gap-6"
        >
          {activeTab === 'business' && 
            businessServices.map((service, index) => (
              <ServiceCard key={`biz-${index}`} service={service} variants={item} index={index} />
            ))}
          {activeTab === 'tech' && 
            techServices.map((service, index) => (
              <ServiceCard key={`tech-${index}`} service={service} variants={item} index={index} />
            ))}
        </motion.div>
      </div>
    </section>
  );
}