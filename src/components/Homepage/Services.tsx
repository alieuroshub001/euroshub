'use client';
import Link from 'next/link';
import { JSX, useState, useEffect, useRef, useCallback } from 'react';
import { 
  Headphones, 
  ClipboardList,
  Keyboard,
  Database,
  PhoneOutgoing,
  LayoutDashboard,
  HardDrive,
  Search,
  BarChart2,
  Server,
  Code,
  Smartphone,
  Globe,
  Cpu,
  Cloud
} from 'lucide-react';
import { motion, PanInfo, useAnimation } from 'framer-motion';

interface Service {
  id: number;
  title: string;
  icon: JSX.Element;
  description: string;
  category: 'business' | 'tech';
  slug: string;
}

const allServices: Service[] = [
  {
    id: 1,
    title: 'Virtual Assistance',
    icon: <Headphones className="w-10 h-10 text-[var(--primary)]" />,
    description: 'Professional remote support for administrative tasks and customer service.',
    category: 'business',
    slug: 'virtual-assistance'
  },
  {
    id: 2,
    title: 'Project Management',
    icon: <ClipboardList className="w-10 h-10 text-[var(--primary)]" />,
    description: 'End-to-end project coordination to keep initiatives on track.',
    category: 'business',
    slug: 'project-management'
  },
  {
    id: 3,
    title: 'Data Entry & Transcription',
    icon: <Keyboard className="w-10 h-10 text-[var(--primary)]" />,
    description: 'Accurate data processing and document conversion services.',
    category: 'business',
    slug: 'data-entry-transcription'
  },
  {
    id: 4,
    title: 'Data Extraction/ETL',
    icon: <Database className="w-10 h-10 text-[var(--primary)]" />,
    description: 'Structured data extraction from various sources and formats.',
    category: 'business',
    slug: 'data-extraction-etl'
  },
  {
    id: 5,
    title: 'Lead Generation',
    icon: <PhoneOutgoing className="w-10 h-10 text-[var(--primary)]" />,
    description: 'Targeted prospect identification for sales pipelines.',
    category: 'business',
    slug: 'lead-generation'
  },
  {
    id: 6,
    title: 'ERP/CRM Software',
    icon: <LayoutDashboard className="w-10 h-10 text-[var(--primary)]" />,
    description: 'Business system implementation and optimization.',
    category: 'business',
    slug: 'erp-crm-software'
  },
  {
    id: 7,
    title: 'Data Mining',
    icon: <HardDrive className="w-10 h-10 text-[var(--primary)]" />,
    description: 'Extract valuable insights from large datasets.',
    category: 'business',
    slug: 'data-mining'
  },
  {
    id: 8,
    title: 'Market Research',
    icon: <Search className="w-10 h-10 text-[var(--primary)]" />,
    description: 'Competitive analysis and product evaluation.',
    category: 'business',
    slug: 'market-research'
  },
  {
    id: 9,
    title: 'Data Analysis',
    icon: <BarChart2 className="w-10 h-10 text-[var(--primary)]" />,
    description: 'Statistical analysis for business data.',
    category: 'business',
    slug: 'data-analysis'
  },
  {
    id: 10,
    title: 'Database Management',
    icon: <Server className="w-10 h-10 text-[var(--primary)]" />,
    description: 'Full database administration and optimization.',
    category: 'business',
    slug: 'database-management'
  },
  {
    id: 11,
    title: 'Web Development',
    icon: <Code className="w-10 h-10 text-[var(--primary)]" />,
    description: 'Custom web applications built with modern technologies.',
    category: 'tech',
    slug: 'web-development'
  },
  {
    id: 12,
    title: 'Mobile App Development',
    icon: <Smartphone className="w-10 h-10 text-[var(--primary)]" />,
    description: 'iOS and Android apps with seamless user experiences.',
    category: 'tech',
    slug: 'mobile-app-development'
  },
  {
    id: 13,
    title: 'UI/UX Design',
    icon: <Globe className="w-10 h-10 text-[var(--primary)]" />,
    description: 'Beautiful, intuitive interfaces that engage users.',
    category: 'tech',
    slug: 'ui-ux-design'
  },
  {
    id: 14,
    title: 'Cloud Solutions',
    icon: <Cloud className="w-10 h-10 text-[var(--primary)]" />,
    description: 'Scalable cloud infrastructure and migration.',
    category: 'tech',
    slug: 'cloud-solutions'
  },
  {
    id: 15,
    title: 'AI Solutions',
    icon: <Cpu className="w-10 h-10 text-[var(--primary)]" />,
    description: 'Intelligent automation and machine learning.',
    category: 'tech',
    slug: 'ai-solutions'
  },
];

export default function Services() {
  const [activeTab, setActiveTab] = useState<'business' | 'tech'>('business');
  const containerRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const [isHovered, setIsHovered] = useState(false);
  const animationRef = useRef<number | null>(null);
  const positionRef = useRef(0);
  const speedRef = useRef(1);
  const lastTimeRef = useRef(0);

  const filteredServices = allServices.filter(service => service.category === activeTab);
  const duplicatedServices = [...filteredServices, ...filteredServices, ...filteredServices];

  const animate = useCallback((time: number) => {
    if (!lastTimeRef.current) lastTimeRef.current = time;
    const delta = time - lastTimeRef.current;
    lastTimeRef.current = time;

    if (!isHovered && containerRef.current) {
      positionRef.current -= (delta * 0.08 * speedRef.current);
      const containerWidth = containerRef.current.scrollWidth / 3;
      
      if (Math.abs(positionRef.current) >= containerWidth) {
        positionRef.current = 0;
      }

      controls.set({ x: positionRef.current });
    }
    
    animationRef.current = requestAnimationFrame(animate);
  }, [isHovered, controls]);

  useEffect(() => {
    // Reset position when tab changes
    positionRef.current = 0;
    controls.set({ x: 0 });
    
    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [animate, activeTab]);

  const handleDrag = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    positionRef.current += info.delta.x;
  };

  return (
    <section className="py-50 text-[var(--foreground)]">
      {/* Header section with container */}
      <div className="max-w-7xl mx-auto px-6 mb-16">
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

        <div className="flex justify-center">
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
      </div>

      {/* Full width marquee section */}
      <div 
        ref={containerRef}
        className="relative w-full overflow-x-hidden py-8"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.div
          className="flex gap-6 w-max items-stretch pl-6"
          drag="x"
          dragConstraints={containerRef}
          onDrag={handleDrag}
          animate={controls}
          dragElastic={0}
        >
          {duplicatedServices.map((service, index) => (
            <Link 
              key={`${service.id}-${index}`}
              href={`/services#${service.slug}`}
              passHref
            >
              <motion.div
                className="flex-shrink-0 w-[300px] h-[280px] cursor-pointer"
                whileHover={{ scale: 1.03 }}
              >
                <div className="bg-[var(--card-bg)] p-6 h-full w-full flex flex-col items-center justify-between rounded-xl shadow-sm transition-all duration-300 hover:shadow-xl hover:bg-[var(--card-bg)]/80">
                  <div className="flex flex-col items-center flex-grow justify-center">
                    <motion.div 
                      className="mb-4 bg-[var(--primary)]/10 p-3 rounded-full"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      {service.icon}
                    </motion.div>
                    <h3 className="text-lg font-semibold mb-3 text-center">{service.title}</h3>
                    <p className="text-sm text-[var(--foreground)] opacity-70 text-center leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
}