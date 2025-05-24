'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import MobileMenu from './MobileMenu';
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
  CloudIcon,
  ChevronDownIcon,
  ChevronUpIcon
} from 'lucide-react';

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeCategory, setActiveCategory] = useState('Business Services');

  const allServices = [
    { 
      category: 'Business Services',
      services: [
        { name: 'Virtual Assistance', icon: <HeadsetIcon className="w-4 h-4" /> },
        { name: 'Project Management', icon: <ClipboardListIcon className="w-4 h-4" /> },
        { name: 'Data Entry & Transcription', icon: <KeyboardIcon className="w-4 h-4" /> },
        { name: 'Data Extraction/ETL', icon: <DatabaseIcon className="w-4 h-4" /> },
        { name: 'Lead Generation', icon: <PhoneOutgoingIcon className="w-4 h-4" /> },
        { name: 'ERP/CRM Software', icon: <LayoutDashboardIcon className="w-4 h-4" /> },
        { name: 'Data Mining', icon: <HardDriveIcon className="w-4 h-4" /> },
        { name: 'Market Research', icon: <SearchIcon className="w-4 h-4" /> },
        { name: 'Data Analysis', icon: <BarChart2Icon className="w-4 h-4" /> },
        { name: 'Database Management', icon: <ServerIcon className="w-4 h-4" /> }
      ]
    },
    { 
      category: 'Technology Services',
      services: [
        { name: 'Web Development', icon: <CodeIcon className="w-4 h-4" /> },
        { name: 'Mobile App Development', icon: <SmartphoneIcon className="w-4 h-4" /> },
        { name: 'UI/UX Design', icon: <GlobeIcon className="w-4 h-4" /> },
        { name: 'Cloud Solutions', icon: <CloudIcon className="w-4 h-4" /> },
        { name: 'AI Solutions', icon: <CpuIcon className="w-4 h-4" /> }
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
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  return (
    <header className={`w-full text-[var(--foreground)] sticky top-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'backdrop-blur-md bg-[var(--background)/80]' 
        : 'bg-transparent'
    }`}>
      <nav className="relative flex items-center justify-between px-6 py-4 w-full">
        {/* Left: Logo and Theme Toggle */}
        <div className="nav-left flex items-center gap-6">
          <Link href="/" className="flex items-center gap-1">
            <Image
              src="/assets/images/logo.png"
              alt="Euroshub Logo"
              width={75}
              height={40}
              className="object-contain"
            />
            <span className="text-xl font-bold tracking-tight">EurosHub</span>
          </Link>

          {/* Theme Toggle Button */}
          <button
            className={`w-10 h-5 rounded-full border flex items-center px-0.5 transition-colors ml-3 ${
              darkMode ? 'bg-[var(--foreground)]' : 'bg-[var(--secondary)]'
            }`}
            onClick={toggleDarkMode}
            aria-label="Toggle Dark Mode"
          >
            <div
              className={`w-4 h-4 rounded-full transition-transform duration-300 ${
                darkMode
                  ? 'translate-x-5 bg-[var(--background)]'
                  : 'bg-[var(--foreground)]'
              }`}
            />
          </button>
        </div>

        {/* Navigation and Actions */}
        <div className="flex items-center gap-8 flex-wrap">
          {/* Navigation Links */}
          {!showMobileMenu && (
            <ul className="nav-center flex gap-8 items-center">
              <li className="relative group">
                <Link 
                  href="/" 
                  className="px-3 py-2 rounded-lg font-medium transition-all duration-300
                    hover:bg-[var(--primary)/10] hover:text-[var(--primary)] 
                    hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)]"
                >
                  Home
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--primary)] transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
              
              <li className="relative group">
                <div 
                  className="flex items-center px-3 py-2 rounded-lg font-medium cursor-pointer transition-all duration-300
                    hover:bg-[var(--primary)/10] hover:text-[var(--primary)] 
                    hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)]"
                  onClick={() => setServicesOpen(!servicesOpen)}
                  onMouseEnter={() => setServicesOpen(true)}
                  onMouseLeave={() => setServicesOpen(false)}
                >
                  Services
                  {servicesOpen ? (
                    <ChevronUpIcon className="ml-1 w-4 h-4 transition-transform duration-200" />
                  ) : (
                    <ChevronDownIcon className="ml-1 w-4 h-4 transition-transform duration-200" />
                  )}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--primary)] transition-all duration-300 group-hover:w-full"></span>
                </div>
                
                {/* Compact Services Dropdown */}
                {servicesOpen && (
                  <div 
                    className="absolute left-0 mt-2 w-[500px] bg-[var(--background)] border border-[var(--secondary)] rounded-lg shadow-xl z-50 overflow-hidden"
                    onMouseEnter={() => setServicesOpen(true)}
                    onMouseLeave={() => setServicesOpen(false)}
                  >
                    <div className="flex border-b border-[var(--secondary)]">
                      {allServices.map((category) => (
                        <button
                          key={category.category}
                          className={`px-4 py-3 text-sm font-medium flex-1 text-center ${
                            activeCategory === category.category
                              ? 'text-[var(--primary)] border-b-2 border-[var(--primary)]'
                              : 'hover:bg-[var(--primary)/5]'
                          }`}
                          onClick={() => setActiveCategory(category.category)}
                        >
                          {category.category}
                        </button>
                      ))}
                    </div>
                    <div className="p-4">
                      <div className="grid grid-cols-2 gap-4">
                        {allServices
                          .find(cat => cat.category === activeCategory)
                          ?.services.map((service) => (
                            <Link
                              key={service.name}
                              href={`/services#${service.name.toLowerCase().replace(/\s+/g, '-')}`}
                              className="flex items-center gap-3 p-3 rounded-lg hover:bg-[var(--primary)/10] transition-colors duration-200"
                            >
                              <div className="bg-[var(--primary)/10] p-2 rounded-full">
                                {service.icon}
                              </div>
                              <span className="text-sm">{service.name}</span>
                            </Link>
                          ))}
                      </div>
                    </div>
                    <div className="p-4 border-t border-[var(--secondary)] bg-[var(--primary)/5]">
                      <Link 
                        href="/services" 
                        className="text-[var(--primary)] font-medium text-sm hover:underline flex items-center justify-center gap-2"
                      >
                        View all services
                        <ChevronDownIcon className="w-4 h-4 rotate-90" />
                      </Link>
                    </div>
                  </div>
                )}
              </li>
              
              <li className="relative group">
                <Link 
                  href="/about" 
                  className="px-3 py-2 rounded-lg font-medium transition-all duration-300
                    hover:bg-[var(--primary)/10] hover:text-[var(--primary)] 
                    hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)]"
                >
                  About Us
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--primary)] transition-all duration-300 group-hover:w-full"></span>
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

          {/* Hamburger Menu */}
          {showMobileMenu && <MobileMenu />}
        </div>
      </nav>
    </header>
  );
}