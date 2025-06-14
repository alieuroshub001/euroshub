'use client';
import { useRouter } from 'next/navigation'; 
import Cursor from '@/components/Global/Cursor';
import { motion, useMotionValue } from 'framer-motion'; 
import {
  BarChart2,
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
  Search,
  Server,
  Smartphone,
  Eye,
} from 'lucide-react';
import Image from 'next/image';
import { JSX, useCallback, useEffect, useRef, useState } from 'react';

interface Service {
  id: number;
  title: string;
  icon: JSX.Element;
  category: 'business' | 'tech';
  slug: string;
  image: string;
  path: string; 
}

const allServices: Service[] = [
  {
  id: 1,
  title: 'Virtual Assistance',
  icon: <Headphones className="w-10 h-10 text-[var(--primary)]" />,
  category: 'business',
  slug: 'virtual-assistance',
  image: '/assets/services/virtual-assistant.jpg',
  path: '/experties/business/virtual-assistance'
},
{
  id: 2,
  title: 'Project Management',
  icon: <ClipboardList className="w-10 h-10 text-[var(--primary)]" />,
  category: 'business',
  slug: 'project-management',
  image: '/assets/services/project-management.JPG',
  path: '/experties/business/project-management'
},
{
  id: 3,
  title: 'Data Extraction/ETL',
  icon: <Database className="w-10 h-10 text-[var(--primary)]" />,
  category: 'business',
  slug: 'data-extraction-etl',
  image: '/assets/services/extraction.jpg',
  path: '/experties/business/data-extraction-etl'
},
{
  id: 4,
  title: 'ERP/CRM Software',
  icon: <LayoutDashboard className="w-10 h-10 text-[var(--primary)]" />,
  category: 'business',
  slug: 'erp-crm-software',
  image: '/assets/services/crm.jpg',
  path: '/experties/business/erp-crm-software'
},
{
  id: 5,
  title: 'Data Mining',
  icon: <HardDrive className="w-10 h-10 text-[var(--primary)]" />,
  category: 'business',
  slug: 'data-mining',
  image: '/assets/services/mining.jpg',
  path: '/experties/business/data-mining'
},
{
  id: 6,
  title: 'Market Research',
  icon: <Search className="w-10 h-10 text-[var(--primary)]" />,
  category: 'business',
  slug: 'market-research',
  image: '/assets/services/research.jpg',
  path: '/experties/business/market-research'
},
{
  id: 8,
  title: 'Data Analytics and Insights',
  icon: <BarChart2 className="w-10 h-10 text-[var(--primary)]" />,
  category: 'business',
  slug: 'data-analytics-insights',
  image: '/assets/services/analysis.jpeg',
  path: '/experties/business/data-analysis'
},
{
  id: 9,
  title: 'Database Management',
  icon: <Server className="w-10 h-10 text-[var(--primary)]" />,
  category: 'business',
  slug: 'database-management',
  image: '/assets/services/dbms.jpg',
  path: '/experties/business/database-management'
},
{
  id: 10,
  title: 'Quality Assurance',
  icon: <Server className="w-10 h-10 text-[var(--primary)]" />,
  category: 'business',
  slug: 'quality-assurance',
  image: '/assets/services/qa.jpg',
  path: '/experties/business/quality-assurance'
},
{
  id: 11,
  title: 'Maintenance & Support',
  icon: <Server className="w-10 h-10 text-[var(--primary)]" />,
  category: 'business',
  slug: 'maintenance-support',
  image: '/assets/services/maintenance.jpg',
  path: '/experties/business/maintenance-support'
},
{
  id: 7,
  title: 'Staff Augmentation',
  icon: <Keyboard className="w-10 h-10 text-[var(--primary)]" />,
  category: 'tech',
  slug: 'staff-augmentation',
  image: '/assets/services/staff-augmentation.jpg',
  path: '/experties/business/staff-augmentation'
},
  {
  id: 12,
  title: 'Web Development',
  icon: <Code className="w-10 h-10 text-[var(--primary)]" />,
  category: 'tech',
  slug: 'web-development',
  image: '/assets/services/dev.jpeg',
  path: '/experties/technology/web-development'
},
{
  id: 13,
  title: 'Mobile App Development',
  icon: <Smartphone className="w-10 h-10 text-[var(--primary)]" />,
  category: 'tech',
  slug: 'mobile-app-development',
  image: '/assets/services/app.jpeg',
  path: '/experties/technology/mobile-app-development'
},
{
  id: 14,
  title: 'UI/UX Design',
  icon: <Globe className="w-10 h-10 text-[var(--primary)]" />,
  category: 'tech',
  slug: 'ui-ux-design',
  image: '/assets/services/uiux.jpeg',
  path: '/experties/technology/ui-ux-design'
},
{
  id: 15,
  title: 'Cloud Solutions',
  icon: <Cloud className="w-10 h-10 text-[var(--primary)]" />,
  category: 'tech',
  slug: 'cloud-solutions',
  image: '/assets/services/cloud.jpg',
  path: '/experties/technology/cloud-solutions'
},
{
  id: 16,
  title: 'DevOps',
  icon: <Cpu className="w-10 h-10 text-[var(--primary)]" />,
  category: 'tech',
  slug: 'devops',
  image: '/assets/services/devops.jpg',
  path: '/experties/technology/devops'
},
{
  id: 17,
  title: 'SaaS Solutions',
  icon: <Cpu className="w-10 h-10 text-[var(--primary)]" />,
  category: 'tech',
  slug: 'saas-solutions',
  image: '/assets/services/saas.jpg',
  path: '/experties/technology/saas-solutions'
},
{
  id: 18,
  title: 'Cybersecurity',
  icon: <Cpu className="w-10 h-10 text-[var(--primary)]" />,
  category: 'tech',
  slug: 'cybersecurity',
  image: '/assets/services/cybersecurity.jpg',
  path: '/experties/technology/cybersecurity'
},
{
  id: 19,
  title: 'E-Commerce Solutions',
  icon: <Cpu className="w-10 h-10 text-[var(--primary)]" />,
  category: 'tech',
  slug: 'e-commerce-solutions',
  image: '/assets/services/e-commerce.jpg',
  path: '/experties/technology/e-commerce-solutions'
},
{
  id: 20,
  title: 'AI Solutions',
  icon: <Cpu className="w-10 h-10 text-[var(--primary)]" />,
  category: 'tech',
  slug: 'ai-solutions',
  image: '/assets/services/ai.jpg',
  path: '/experties/technology/ai-solutions'
},
{
  id: 21,
  title: 'Design & Development',
  icon: <Cpu className="w-10 h-10 text-[var(--primary)]" />,
  category: 'tech',
  slug: 'design-development',
  image: '/assets/services/design-development.jpg',
  path: '/experties/technology/design-development'
},
{
  id: 22,
  title: 'Automation & Apps',
  icon: <Cpu className="w-10 h-10 text-[var(--primary)]" />,
  category: 'tech',
  slug: 'automation-apps',
  image: '/assets/services/automation-apps.jpg',
  path: '/experties/technology/automation-apps'
}
];

export default function Services() {
  const [activeTab, setActiveTab] = useState<'business' | 'tech'>('business');
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const x = useMotionValue(0);
  const animationRef = useRef<number | null>(null);
  const router = useRouter();

  // Custom cursor state
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [showCursor, setShowCursor] = useState(false);

  // For detecting drag vs click
  const pointerDownPos = useRef<{ x: number; y: number } | null>(null);

  // Filtered services for current tab
  const filteredServices = allServices.filter((s) => s.category === activeTab);
  
  // Create 5 copies for seamless infinite scroll (more copies = smoother transitions)
  const infiniteServices = Array(5).fill(filteredServices).flat();
  
  // Calculate dimensions for infinite loop
  const cardWidth = 320; // w-80 = 320px
  const gap = 24; // gap-6 = 24px
  const singleSetWidth = filteredServices.length * (cardWidth + gap);

  // Auto-scroll marquee animation
  const moveMarquee = useCallback(() => {
    if (isHovered || isDragging) return;
    
    const currentX = x.get();
    x.set(currentX - 1);
    
    animationRef.current = requestAnimationFrame(moveMarquee);
  }, [isHovered, isDragging, x]);

  // Handle infinite loop repositioning
  const handleInfiniteLoop = useCallback(() => {
    const currentX = x.get();
    
    // If we've moved too far left, jump back to equivalent position
    if (currentX <= -singleSetWidth * 2) {
      x.set(currentX + singleSetWidth);
    }
    // If we've moved too far right, jump back to equivalent position  
    else if (currentX >= 0) {
      x.set(currentX - singleSetWidth);
    }
  }, [x, singleSetWidth]);

  // Monitor x value changes for infinite loop
  useEffect(() => {
    const unsubscribe = x.onChange(handleInfiniteLoop);
    return unsubscribe;
  }, [x, handleInfiniteLoop]);

  useEffect(() => {
    animationRef.current = requestAnimationFrame(moveMarquee);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [moveMarquee]);

  // Reset position when tab changes
  useEffect(() => {
    x.set(-singleSetWidth); // Start from middle position for smooth bi-directional scroll
  }, [activeTab, x, singleSetWidth]);

  // Mouse move for custom cursor
  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  return (
    <section className="py-24 text-[var(--foreground)]">
      {/* → Heading + Tabs */}
<div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-16 lg:px-32 mb-16">
  <div className="text-center mb-12">
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
    <div className="inline-flex bg-[var(--card-bg)]/40 rounded-xl p-2 flex-wrap gap-2 shadow-lg">
      <button
        onClick={() => setActiveTab('business')}
        className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 text-sm md:text-base border-2 cursor-pointer ${
          activeTab === 'business'
            ? 'bg-[var(--primary)] text-white border-[var(--primary)] shadow-lg'
            : 'bg-white/10 text-[var(--foreground)] border-transparent hover:bg-[var(--card-bg)]/60 hover:border-[var(--card-bg)]/60'
        }`}
      >
        Business Services
      </button>
      <button
        onClick={() => setActiveTab('tech')}
        className={`px-13 py-3 rounded-xl font-semibold transition-all duration-200 text-sm md:text-base border-2 cursor-pointer ${
          activeTab === 'tech'
            ? 'bg-[var(--primary)] text-white border-[var(--primary)] shadow-lg'
            : 'bg-white/10 text-[var(--foreground)] border-transparent hover:bg-[var(--card-bg)]/60 hover:border-[var(--card-bg)]/60'
        }`}
      >
        Technology
      </button>
    </div>
  </div>
</div>


      {/* → Infinite Marquee Container */}
      <div
        ref={containerRef}
        className="relative w-full overflow-hidden py-8"
        onMouseEnter={() => {
          setIsHovered(true);
          setShowCursor(true);
        }}
        onMouseLeave={() => {
          setIsHovered(false);
          setShowCursor(false);
        }}
        onMouseMove={handleMouseMove}
      >
        <motion.div
          className="flex gap-6 w-max px-6 cursor-grab active:cursor-grabbing"
          style={{ x }}
          drag="x"
          dragConstraints={{ left: -Infinity, right: Infinity }}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={() => setIsDragging(false)}
          dragElastic={0}
          dragMomentum={false}
        >
          {infiniteServices.map((service, idx) => (
          <div
  key={`${service.id}-${Math.floor(idx / filteredServices.length)}-${idx % filteredServices.length}`}
  className="flex-shrink-0 w-64 sm:w-72 md:w-80 h-80 sm:h-96 cursor-pointer relative"
  onPointerDown={(e) => {
    pointerDownPos.current = { x: e.clientX, y: e.clientY };
  }}
  onPointerUp={(e) => {
    if (!pointerDownPos.current) return;
    const dx = Math.abs(e.clientX - pointerDownPos.current.x);
    const dy = Math.abs(e.clientY - pointerDownPos.current.y);

    if (dx < 5 && dy < 5) {
      router.push(service.path); // Navigate only on real click
    }

    pointerDownPos.current = null;
  }}
  onMouseEnter={() => setHoveredCard(service.id)}
  onMouseLeave={() => setHoveredCard(null)}
>
<motion.div
  className="relative group card-effect card-effect-hover card-glow-hover card-saber-effect card-saber-hover h-full bg-[var(--card-bg)] rounded-xl overflow-hidden shadow-sm transition-all duration-300 hover:shadow-xl hover:bg-[var(--card-bg)]/80 flex flex-col"
  whileHover={{ scale: 1.03 }}
  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
>
                {/* Background image + gradient overlay */}
                <div className="absolute inset-0 z-0">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className={`object-cover transition-all duration-300 ${
                      hoveredCard === service.id ? 'blur-sm scale-110' : ''
                    }`}
                    quality={80}
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent transition-all duration-300 ${
                    hoveredCard === service.id ? 'from-black/90 via-black/60 to-black/20' : ''
                  }`} />
                </div>

                {/* View More Button - appears on hover */}
                <motion.div
                  className="absolute inset-0 z-20 flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredCard === service.id ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.button
                    className="bg-[var(--primary)] text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 shadow-lg hover:bg-[var(--primary)]/90 transition-colors"
                    initial={{ scale: 0.8, y: 20 }}
                    animate={{ 
                      scale: hoveredCard === service.id ? 1 : 0.8,
                      y: hoveredCard === service.id ? 0 : 20
                    }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(service.path);
                    }}
                  >
                    <Eye className="w-4 h-4" />
                    View More
                  </motion.button>
                </motion.div>

                {/* Content - Service name stays in same position */}
                <div className="mt-auto p-5 flex flex-col relative z-10">
                  <div className="flex items-center mb-3">
                    <motion.div
                      className="bg-[var(--primary)]/10 p-3 rounded-full mr-3"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                    >
                      {service.icon}
                    </motion.div>
                    <h3 className="text-lg font-semibold text-white">{service.title}</h3>
                  </div>
                  <p className="text-sm text-white opacity-90 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </motion.div>
            </div>
          ))}
        </motion.div>

        <Cursor 
          mousePos={mousePos} 
          isDragging={isDragging} 
          showCursor={showCursor}
        />
      </div>
    </section>
  );
}