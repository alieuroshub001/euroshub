'use client';

import { motion, useAnimation } from 'framer-motion';
import {
  ChevronDownIcon, ChevronUpIcon, ClipboardListIcon, CloudIcon, CodeIcon,
  CpuIcon, DatabaseIcon, GlobeIcon, HeadsetIcon, KeyboardIcon,
  LayoutDashboardIcon, MoonIcon, PhoneOutgoingIcon, SmartphoneIcon, SunIcon
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import MobileMenu from './MobileMenu';

const NAV_LINK_STYLE = "px-3 py-2 rounded-lg font-medium transition-all duration-300 hover:bg-[var(--primary)/10] hover:text-[var(--primary)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)]";
const UNDERLINE_STYLE = "absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--primary)] transition-all duration-300 group-hover:w-full";

const AnimatedLogoText: React.FC<{ text: string; isHovered: boolean }> = ({ text, isHovered }) => {
  const letters = text.split('');
  const controls = useAnimation();

  useEffect(() => {
    controls.start(i => ({
      opacity: isHovered ? 1 : 0,
      y: isHovered ? 0 : 50,
      rotate: isHovered ? 0 : 10,
      scale: isHovered ? 1 : 0.8,
      textShadow: isHovered
        ? ['0 0 15px rgba(23, 182, 178, 0.8)', '0 0 30px rgba(23, 182, 178, 0.5)']
        : '0 0 0px rgba(255,255,255,0)',
      transition: {
        delay: i * 0.05,
        duration: 0.6,
        type: 'spring',
        damping: 12,
        stiffness: 150,
      }
    }));
  }, [isHovered]);

  return (
    <div className="flex items-center">
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          custom={index}
          initial={{ opacity: 0, y: 50, rotate: 10, scale: 0.8 }}
          animate={controls}
          className="inline-block text-3xl font-bold tracking-tight"
          style={{
            background: 'linear-gradient(135deg, #17b6b2, #17b6b2)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent'
          }}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </div>
  );
};

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [logoHovered, setLogoHovered] = useState(false);

  const allServices = [
    {
      category: 'Business Services',
      services: [
        { name: 'Virtual Assistance', icon: HeadsetIcon },
        { name: 'Project Management', icon: ClipboardListIcon },
        { name: 'Data Entry & Transcription', icon: KeyboardIcon },
        { name: 'Data Extraction/ETL', icon: DatabaseIcon },
        { name: 'Lead Generation', icon: PhoneOutgoingIcon },
        { name: 'ERP/CRM Software', icon: LayoutDashboardIcon },
      ],
    },
    {
      category: 'Technology Services',
      services: [
        { name: 'Web Development', icon: CodeIcon },
        { name: 'Mobile App Development', icon: SmartphoneIcon },
        { name: 'UI/UX Design', icon: GlobeIcon },
        { name: 'Cloud Solutions', icon: CloudIcon },
        { name: 'AI Solutions', icon: CpuIcon },
      ],
    },
  ];

  useEffect(() => {
    const theme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = theme === 'dark' || (!theme && prefersDark);
    document.body.classList.toggle('dark', isDark);
    setDarkMode(isDark);
  }, []);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => setShowMobileMenu(window.innerWidth < 950);
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    document.body.classList.toggle('dark', newMode);
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
  };

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 w-full text-[var(--foreground)] ${isScrolled ? (showMobileMenu ? 'bg-[var(--background)]' : 'backdrop-blur-md bg-[var(--background)/80]') : 'bg-transparent'}`}>
      <nav className="relative flex items-center justify-between px-6 py-2">
        {/* Left - Logo + Theme Toggle */}
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="flex items-center gap-1 group relative overflow-hidden"
            onMouseEnter={() => setLogoHovered(true)}
            onMouseLeave={() => setLogoHovered(false)}
          >
            <Image
              src="/assets/images/logo.png"
              alt="Logo"
              width={75}
              height={40}
              className="object-contain"
            />
            <div className={`transition-opacity duration-300 ${logoHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
              {logoHovered && <AnimatedLogoText text="EurosHub" isHovered={logoHovered} />}
            </div>
          </Link>

          {!showMobileMenu && (
            <button
              onClick={toggleDarkMode}
              className="flex items-center gap-2 p-2 rounded-full border border-[var(--primary)/20] hover:bg-[var(--primary)/10] transition-all"
              aria-label="Toggle Theme"
            >
              <SunIcon className={`w-4 h-4 ${darkMode ? 'text-gray-400' : 'text-yellow-500'}`} />
              <div className={`w-6 h-3 rounded-full border flex items-center px-0.5 ${darkMode ? 'bg-[var(--foreground)]' : 'bg-[var(--secondary)]'}`}>
                <div className={`w-2 h-2 rounded-full transition-transform ${darkMode ? 'translate-x-3 bg-[var(--background)]' : 'bg-[var(--foreground)]'}`} />
              </div>
              <MoonIcon className={`w-4 h-4 ${darkMode ? 'text-blue-400' : 'text-gray-400'}`} />
            </button>
          )}
        </div>

        {/* Center - Nav Links */}
        {!showMobileMenu && (
          <ul className="flex gap-8 items-center">
            {['Home', 'About Us'].map((name) => (
              <li key={name} className="relative group">
                <Link href={name === 'Home' ? '/' : '/about'} className={NAV_LINK_STYLE}>
                  {name}
                  <span className={UNDERLINE_STYLE}></span>
                </Link>
              </li>
            ))}
            <li className="relative group">
              <div className={`${NAV_LINK_STYLE} flex items-center cursor-pointer`} onClick={() => setServicesOpen(!servicesOpen)}>
                Services
                {servicesOpen ? <ChevronUpIcon className="ml-1 w-4 h-4" /> : <ChevronDownIcon className="ml-1 w-4 h-4" />}
                <span className={UNDERLINE_STYLE}></span>
              </div>
            </li>
          </ul>
        )}

        {/* Right - CTA Buttons */}
        <div className="flex items-center gap-3">
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
          {showMobileMenu && <MobileMenu darkMode={darkMode} toggleDarkMode={toggleDarkMode} />}
        </div>
      </nav>

      {/* Services Dropdown */}
      {servicesOpen && (
        <div className="absolute left-0 right-0 top-full w-full bg-[var(--background)] border-t border-[var(--secondary)] shadow-xl z-40">
          <div className="px-6 py-4 grid md:grid-cols-2 gap-6">
            {allServices.map(({ category, services }) => (
              <div key={category}>
                <h3 className="text-base font-semibold text-[var(--primary)] border-b border-[var(--primary)/20] pb-1">{category}</h3>
                <div className="grid lg:grid-cols-2 gap-1">
                  {services.map(({ name, icon: Icon }) => (
                    <Link key={name} href={`/services#${name.toLowerCase().replace(/\s+/g, '-')}`} className="flex items-center gap-2 p-2 rounded-lg hover:bg-[var(--primary)/10] transition-all group">
                      <div className="p-1.5 rounded-full bg-[var(--primary)/10] group-hover:bg-[var(--primary)] group-hover:text-white">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-medium group-hover:text-[var(--primary)]">{name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="text-center pt-3 border-t border-[var(--secondary)]">
            <Link href="/services" className="inline-flex items-center gap-2 bg-[var(--primary)] text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-[var(--primary)]/90 transition">
              View All Services <ChevronDownIcon className="w-3 h-3 rotate-90" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
