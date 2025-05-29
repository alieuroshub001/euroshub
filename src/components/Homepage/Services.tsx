'use client';
import { JSX, useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image'; // Added import
import { 
  Headphones, ClipboardList, Keyboard, Database,
  PhoneOutgoing, LayoutDashboard, HardDrive, Search,
  BarChart2, Server, Code, Smartphone, Globe, Cpu, Cloud
} from 'lucide-react';
import { motion, useMotionValue } from 'framer-motion';

interface Service {
  id: number;
  title: string;
  icon: JSX.Element;
  description: string;
  category: 'business' | 'tech';
  slug: string;
  image: string;
}

const allServices: Service[] = [
  {
    id: 1,
    title: 'Virtual Assistance',
    icon: <Headphones className="w-10 h-10 text-[var(--primary)]" />,
    description: 'Remote support for administrative and customer tasks.',
    category: 'business',
    slug: 'virtual-assistance',
    image: '/assets/services/virtual.jpeg'
  },
  {
    id: 2,
    title: 'Project Management',
    icon: <ClipboardList className="w-10 h-10 text-[var(--primary)]" />,
    description: 'Complete coordination for project execution and tracking.',
    category: 'business',
    slug: 'project-management',
    image: '/assets/services/pm.jpeg'
  },
  {
    id: 3,
    title: 'Data Entry & Transcription',
    icon: <Keyboard className="w-10 h-10 text-[var(--primary)]" />,
    description: 'Precise data processing and document conversion solutions.',
    category: 'business',
    slug: 'data-entry-transcription',
    image: '/assets/services/entry.jpg'
  },
  {
    id: 4,
    title: 'Data Extraction/ETL',
    icon: <Database className="w-10 h-10 text-[var(--primary)]" />,
    description: 'Systematic data collection from multiple sources.',
    category: 'business',
    slug: 'data-extraction-etl',
    image: '/assets/services/extraction.jpg'
  },
  {
    id: 5,
    title: 'Lead Generation',
    icon: <PhoneOutgoing className="w-10 h-10 text-[var(--primary)]" />,
    description: 'Targeted identification of potential sales prospects.',
    category: 'business',
    slug: 'lead-generation',
    image: '/assets/services/lead.jpeg'
  },
  {
    id: 6,
    title: 'ERP/CRM Software',
    icon: <LayoutDashboard className="w-10 h-10 text-[var(--primary)]" />,
    description: 'Implementation and enhancement of business systems.',
    category: 'business',
    slug: 'erp-crm-software',
    image: '/assets/services/crm.jpg'
  },
  {
    id: 7,
    title: 'Data Mining',
    icon: <HardDrive className="w-10 h-10 text-[var(--primary)]" />,
    description: 'Extraction of insights from complex datasets.',
    category: 'business',
    slug: 'data-mining',
    image: '/assets/services/mining.jpg'
  },
  {
    id: 8,
    title: 'Market Research',
    icon: <Search className="w-10 h-10 text-[var(--primary)]" />,
    description: 'Analysis of competition and product evaluation.',
    category: 'business',
    slug: 'market-research',
    image: '/assets/services/research.jpg'
  },
  {
    id: 9,
    title: 'Data Analysis',
    icon: <BarChart2 className="w-10 h-10 text-[var(--primary)]" />,
    description: 'Statistical examination of business information.',
    category: 'business',
    slug: 'data-analysis',
    image: '/assets/services/analysis.jpeg'
  },
  {
    id: 10,
    title: 'Database Management',
    icon: <Server className="w-10 h-10 text-[var(--primary)]" />,
    description: 'Comprehensive administration of data storage systems.',
    category: 'business',
    slug: 'database-management',
    image: '/assets/services/dbms.jpg'
  },
  {
    id: 11,
    title: 'Web Development',
    icon: <Code className="w-10 h-10 text-[var(--primary)]" />,
    description: 'Building modern custom web applications.',
    category: 'tech',
    slug: 'web-development',
    image: '/assets/services/dev.jpeg'
  },
  {
    id: 12,
    title: 'Mobile App Development',
    icon: <Smartphone className="w-10 h-10 text-[var(--primary)]" />,
    description: 'Creating seamless iOS and Android applications.',
    category: 'tech',
    slug: 'mobile-app-development',
    image: '/assets/services/app.jpeg'
  },
  {
    id: 13,
    title: 'UI/UX Design',
    icon: <Globe className="w-10 h-10 text-[var(--primary)]" />,
    description: 'Designing engaging and intuitive user interfaces.',
    category: 'tech',
    slug: 'ui-ux-design',
    image: '/assets/services/uiux.jpeg'
  },
  {
    id: 14,
    title: 'Cloud Solutions',
    icon: <Cloud className="w-10 h-10 text-[var(--primary)]" />,
    description: 'Deploying scalable cloud infrastructure services.',
    category: 'tech',
    slug: 'cloud-solutions',
    image: '/assets/services/cloud.jpg'
  },
  {
    id: 15,
    title: 'AI Solutions',
    icon: <Cpu className="w-10 h-10 text-[var(--primary)]" />,
    description: 'Implementing intelligent automation technologies.',
    category: 'tech',
    slug: 'ai-solutions',
    image: '/assets/services/ai.jpg'
  }
];

export default function Services() {
  const [activeTab, setActiveTab] = useState<'business' | 'tech'>('business');
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const x = useMotionValue(0);
  const animationRef = useRef<number | null>(null);
  
  const filteredServices = allServices.filter(service => service.category === activeTab);
  const duplicatedServices = [...filteredServices, ...filteredServices, ...filteredServices];

  const moveMarquee = useCallback(() => {
    if (isHovered || isDragging || !containerRef.current) return;
    
    const currentX = x.get();
    const containerWidth = containerRef.current.scrollWidth / 3;
    
    if (Math.abs(currentX) >= containerWidth) {
      x.set(0);
    } else {
      x.set(currentX - 1);
    }
    
    animationRef.current = requestAnimationFrame(moveMarquee);
  }, [isHovered, isDragging, x]);

  useEffect(() => {
    animationRef.current = requestAnimationFrame(moveMarquee);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [moveMarquee]);

  useEffect(() => {
    x.set(0);
  }, [activeTab, x]);

  return (
    <section className="py-38 text-[var(--foreground)]">
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
      </div>

     <div 
        ref={containerRef}
        className="relative w-full overflow-hidden py-8"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.div
          className="flex gap-6 w-max pl-6"
          style={{ x }}
          drag="x"
          dragConstraints={containerRef}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={() => setIsDragging(false)}
          dragElastic={0.1}
        >
          {duplicatedServices.map((service, index) => (
 // In the duplicatedServices map section, replace the card structure with this:
<motion.div
  key={`${service.id}-${index}`}
  className="flex-shrink-0 w-[300px] h-[400px] cursor-pointer relative" // Added relative
  whileHover={{ scale: 1.03 }}
  transition={{ type: "spring", stiffness: 400, damping: 30 }}
>
  <div className="h-full bg-[var(--card-bg)] rounded-xl overflow-hidden shadow-sm transition-all duration-300 hover:shadow-xl hover:bg-[var(--card-bg)]/80 flex flex-col relative">
    {/* Background image covering whole card */}
     <div className="absolute inset-0 z-0">
        <Image
          src={service.image}
          alt={service.title}
          fill
          className="w-full h-full object-cover"
          quality={80}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
      </div>
    
    {/* Content positioned at bottom */}
    <div className="mt-auto p-6 flex flex-col relative z-10"> {/* Changed to mt-auto */}
      <div className="flex items-center mb-4">
        <motion.div 
          className="bg-[var(--primary)]/10 p-3 rounded-full mr-3"
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          {service.icon}
        </motion.div>
        <h3 className="text-lg font-semibold text-white">{service.title}</h3>
      </div>
      <p className="text-sm text-white opacity-90 leading-relaxed">
        {service.description}
      </p>
    </div>
  </div>
</motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
