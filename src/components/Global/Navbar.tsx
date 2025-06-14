'use client';
// Add these imports at the top of Navbar.tsx
import { motion, useAnimation } from 'framer-motion';
import {
  ChevronDownIcon,
  ChevronUpIcon,
  ClipboardListIcon,
  CloudIcon,
  CodeIcon,
  CpuIcon,
  DatabaseIcon,
  GlobeIcon,
  HeadsetIcon,
  KeyboardIcon,
  LayoutDashboardIcon,
  PhoneOutgoingIcon,
  SmartphoneIcon
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import MobileMenu from './MobileMenu';

const AnimatedLogoText: React.FC<{ text: string; isHovered: boolean }> = ({ text, isHovered }) => {
  const letters = text.split('');
  const controls = useAnimation();

  useEffect(() => {
    if (isHovered) {
      controls.start(i => ({
        opacity: 1,
        y: 0,
        rotate: 0,
        scale: 1,
        textShadow: [
          '0 0 0px rgba(255,255,255,0)',
          '0 0 15px rgba(23, 182, 178, 0.8)',
          '0 0 30px rgba(23, 182, 178, 0.5)',
          '0 0 15px rgba(23, 182, 178, 0.8)',
        ],
        transition: {
          delay: i * 0.05,
          duration: 0.8,
          type: 'spring',
          damping: 12,
          stiffness: 150,
          textShadow: {
            duration: 2,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
          }
        }
      }));
    } else {
      controls.start(i => ({
        opacity: 0,
        y: 50,
        rotate: 10,
        scale: 0.8,
        textShadow: '0 0 0px rgba(255,255,255,0)',
        transition: {
          delay: i * 0.02,
          duration: 0.4,
          ease: 'easeIn'
        }
      }));
    }
  }, [isHovered, controls]);

  return (
    <div className="flex items-center">
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          className="inline-block text-3xl font-bold tracking-tight"
          custom={index}
          initial={{ 
            opacity: 0,
            y: 50,
            rotate: 10,
            scale: 0.8,
            textShadow: '0 0 0px rgba(255,255,255,0)'
          }}
          animate={controls}
          style={{
            background: 'linear-gradient(135deg, #17b6b2, #17b6b2)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            display: 'inline-block',
          }}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </div>
  );
};

const AnimatedLogo: React.FC<{ isHovered: boolean }> = ({ isHovered }) => {
  return (
    <motion.div
      initial={{ 
        scale: 1,
        rotate: 0,
        filter: 'drop-shadow(0 0 0px rgba(23, 182, 178, 0))'
      }}
      animate={isHovered ? {
        scale: [1, 1.1, 1.05],
        rotate: [0, -5, 2, 0],
        filter: [
          'drop-shadow(0 0 0px rgba(23, 182, 178, 0))',
          'drop-shadow(0 0 10px rgba(23, 182, 178, 0.6))',
          'drop-shadow(0 0 20px rgba(23, 182, 178, 0.4))',
          'drop-shadow(0 0 10px rgba(23, 182, 178, 0.6))',
        ],
        transition: {
          scale: {
            duration: 0.6,
            ease: 'easeOut'
          },
          rotate: {
            duration: 0.8,
            ease: 'easeInOut'
          },
          filter: {
            duration: 2,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
          }
        }
      } : {
        scale: 1,
        rotate: 0,
        filter: 'drop-shadow(0 0 0px rgba(23, 182, 178, 0))',
        transition: {
          duration: 0.3,
          ease: 'easeOut'
        }
      }}
      whileHover={isHovered ? {
        y: [-2, 2, -1, 0],
        transition: {
          y: {
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut'
          }
        }
      } : {}}
    >
      <Image
        src="/assets/images/logo.png"
        alt="Euroshub Logo"
        width={75}
        height={40}
        className="object-contain"
      />
    </motion.div>
  );
};

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [logoHovered, setLogoHovered] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [visible, setVisible] = useState(true);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const servicesButtonRef = useRef<HTMLDivElement>(null);
  const navbarRef = useRef<HTMLDivElement>(null);
const allServices = [
  {
    category: 'Business Expertise',
    services: [
      { 
        name: 'Virtual Assistance', 
        icon: <HeadsetIcon className="w-4 h-4" />,
        path: '/services/business/virtual-assistance'
      },
      { 
        name: 'Project Management', 
        icon: <ClipboardListIcon className="w-4 h-4" />,
        path: '/services/business/project-management'
      },
      { 
        name: 'Data Entry & Transcription', 
        icon: <KeyboardIcon className="w-4 h-4" />,
        path: '/services/business/data-entry-transcription'
      },
      { 
        name: 'Data Extraction/ETL', 
        icon: <DatabaseIcon className="w-4 h-4" />,
        path: '/services/business/data-extraction-etl'
      },
      { 
        name: 'Lead Generation', 
        icon: <PhoneOutgoingIcon className="w-4 h-4" />,
        path: '/services/business/lead-generation'
      },
      { 
        name: 'ERP/CRM Software', 
        icon: <LayoutDashboardIcon className="w-4 h-4" />,
        path: '/services/business/erp-crm-software'
      },
    ]
  },
  {
    category: 'Technology Expertise',
    services: [
      { 
        name: 'Web Development', 
        icon: <CodeIcon className="w-4 h-4" />,
        path: '/services/technology/web-development'
      },
      { 
        name: 'Mobile App Development', 
        icon: <SmartphoneIcon className="w-4 h-4" />,
        path: '/services/technology/mobile-app-development'
      },
      { 
        name: 'UI/UX Design', 
        icon: <GlobeIcon className="w-4 h-4" />,
        path: '/services/technology/ui-ux-design'
      },
      { 
        name: 'Cloud Solutions', 
        icon: <CloudIcon className="w-4 h-4" />,
        path: '/services/technology/cloud-solutions'
      },
      { 
        name: 'AI Solutions', 
        icon: <CpuIcon className="w-4 h-4" />,
        path: '/services/technology/ai-solutions'
      }
    ]
  }
];

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (storedTheme === 'dark' || (!storedTheme && systemPrefersDark)) {
      document.body.classList.add('dark');
      setDarkMode(true);
    } else {
      document.body.classList.remove('dark');
      setDarkMode(false);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Always show navbar at top of page
      if (currentScrollY <= 10) {
        setVisible(true);
        setIsScrolled(false);
        setLastScrollY(currentScrollY);
        return;
      }

      // Determine scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down
        setVisible(false);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up
        setVisible(true);
      }

      setIsScrolled(currentScrollY > 10);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    if (newMode) {
      document.body.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setShowMobileMenu(window.innerWidth < 950);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleServices = () => {
    setServicesOpen(!servicesOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (servicesOpen && 
          dropdownRef.current && 
          !dropdownRef.current.contains(event.target as Node) &&
          servicesButtonRef.current && 
          !servicesButtonRef.current.contains(event.target as Node)) {
        setServicesOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [servicesOpen]);

  return (
    <motion.header
      ref={navbarRef}
      initial={{ y: 0 }}
      animate={{ y: visible ? 0 : -100 }}
      transition={{ type: 'spring', damping: 15, stiffness: 200 }}
      className={`w-full text-[var(--foreground)] fixed top-0 z-50 transition-all duration-300 ${
        darkMode
          ? isScrolled && !showMobileMenu
            ? 'backdrop-blur-md bg-[var(--background)]/80'
            : isScrolled
              ? 'bg-[var(--background)]'
              : 'bg-transparent'
          : 'bg-white'
      }`}
    >
      <nav className="relative flex items-center justify-between px-6 py-2 w-full">
        {/* Left: Logo and Theme Toggle */}
        <div className="nav-left flex items-center gap-4 relative group">
          {/* Logo Link and Extended Hover Zone */}
          <div
            className="relative z-10 flex items-center gap-1"
            onMouseEnter={() => setLogoHovered(true)}
            onMouseLeave={() => setLogoHovered(false)}
          >
            {/* Invisible expanded hover zone */}
            <div className="absolute -left-8 right-4 top-0 bottom-0 z-0" />

            <Link
              href="/"
              className="flex items-center relative z-10"
            >
              <AnimatedLogo isHovered={logoHovered} />
              <div className={`transition-opacity duration-300 ml-2 ${logoHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                <AnimatedLogoText text="EurosHub" isHovered={logoHovered} />
              </div>
            </Link>
          </div>

          {/* Theme Toggle Button - Z-index above extended hover zone */}
          {!showMobileMenu && (
            <button
              className="relative z-20 w-14 h-7 flex items-center justify-start p-1 rounded-full border border-[var(--primary)]/40 bg-[var(--primary)]/10 transition-all duration-300"
              onClick={toggleDarkMode}
              aria-label="Toggle Theme"
            >
              <div
                className={`w-5 h-5 rounded-full bg-[var(--foreground)] transition-transform duration-300 ${
                  darkMode ? 'translate-x-7' : ''
                }`}
              />
            </button>
          )}
        </div>

        {/* Navigation Links */}
        <div className="flex items-center gap-8 flex-wrap">
          {!showMobileMenu && (
            <ul className="nav-center flex gap-8 items-center">
              <li className="relative group">
                <Link href="/" className="flex items-center px-3 py-2 rounded-lg font-medium hover:bg-[var(--primary)]/10 hover:text-[var(--primary)] transition-all">
                  Home
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--primary)] transition-all group-hover:w-full"></span>
                </Link>
              </li>
              <li className="relative group">
                <div
                  ref={servicesButtonRef}
                  className="flex items-center px-3 py-2 rounded-lg font-medium cursor-pointer hover:bg-[var(--primary)]/10 hover:text-[var(--primary)] transition-all"
                  onClick={toggleServices}
                >
                  Expertise
                  {servicesOpen ? (
                    <ChevronUpIcon className="ml-1 w-6 h-6" />
                  ) : (
                    <ChevronDownIcon className="ml-1 w-6 h-6" />
                  )}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--primary)] transition-all group-hover:w-full"></span>
                </div>
              </li>
              <li className="relative group">
                <Link href="/about" className="flex items-center px-3 py-2 rounded-lg font-medium hover:bg-[var(--primary)]/10 hover:text-[var(--primary)] transition-all">
                  About Us
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--primary)] transition-all group-hover:w-full"></span>
                </Link>
              </li>
            </ul>
          )}

          {/* CTA Buttons */}
          <div className="nav-right flex gap-3 items-center navbar-cta">
            <Link href="/career">
              <button className="border border-[var(--primary)] text-[var(--primary)] px-4 py-3 rounded-full text-md font-medium hover:bg-[var(--primary)] hover:text-white transition-colors">
                Explore Careers
              </button>
            </Link>
            <Link href="/contact">
              <button className="border border-[var(--primary)] text-[var(--primary)] px-4 py-3 rounded-full text-md font-medium hover:bg-[var(--primary)] hover:text-white transition-colors">
                Let&apos;s Talk Business
              </button>
            </Link>
          </div>

          {showMobileMenu && <MobileMenu darkMode={darkMode} toggleDarkMode={toggleDarkMode} />}
        </div>
      </nav>

      {/* Dropdown for Services */}
      {servicesOpen && (
        <div 
          ref={dropdownRef}
          className="absolute left-0 right-0 top-full w-full bg-[var(--background)] border-t border-[var(--secondary)] shadow-xl z-40"
          onMouseEnter={() => setServicesOpen(true)}
          onMouseLeave={() => setServicesOpen(false)}
        >
          <div className="px-6 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {allServices.map((category) => (
                <div key={category.category} className="space-y-2">
                  <h3 className="text-base font-semibold text-[var(--primary)] border-b border-[var(--primary)]/20 pb-1">
                    {category.category}
                  </h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-1">
{category.services.map((service) => (
  <Link
    key={service.name}
    href={service.path}
    className="flex items-center gap-2 p-2 rounded-lg hover:bg-[var(--primary)]/10 transition-all group"
  >
    <div className="bg-[var(--primary)]/10 p-1.5 rounded-full group-hover:bg-[var(--primary)] group-hover:text-white">
      {service.icon}
    </div>
    <span className="text-sm font-medium group-hover:text-[var(--primary)]">{service.name}</span>
  </Link>
))}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-3 border-t border-[var(--secondary)] text-center">
              <Link href="/services" className="inline-flex items-center gap-2 bg-[var(--primary)] text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-[var(--primary)]/90 transition-colors">
                View All Experties
                <ChevronDownIcon className="w-5 h-5 rotate-90" />
              </Link>
            </div>


          </div>
        </div>
      )}
    </motion.header>
  );
}