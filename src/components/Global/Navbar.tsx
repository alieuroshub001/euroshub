/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

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
  MoonIcon,
  PhoneOutgoingIcon,
  SmartphoneIcon,
  SunIcon,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import MobileMenu from './MobileMenu';

// Logo animation on hover
const AnimatedLogoText = ({ text, isHovered }: { text: string; isHovered: boolean }) => {
  const controls = useAnimation();
  const letters = text.split('');

  useEffect(() => {
    controls.start((i) => ({
      opacity: isHovered ? 1 : 0,
      y: isHovered ? 0 : 50,
      rotate: isHovered ? 0 : 10,
      scale: isHovered ? 1 : 0.8,
      textShadow: isHovered
        ? [
            '0 0 15px rgba(23, 182, 178, 0.8)',
            '0 0 30px rgba(23, 182, 178, 0.5)',
            '0 0 15px rgba(23, 182, 178, 0.8)',
          ]
        : '0 0 0px rgba(255,255,255,0)',
      transition: {
        delay: i * 0.05,
        duration: isHovered ? 0.8 : 0.4,
        ease: isHovered ? 'easeOut' : 'easeIn',
      },
    }));
  }, [isHovered, controls]);

  return (
    <div className="flex items-center">
      {letters.map((letter, i) => (
        <motion.span
          key={i}
          custom={i}
          animate={controls}
          initial={{ opacity: 0, y: 50, rotate: 10, scale: 0.8 }}
          className="text-3xl font-bold tracking-tight inline-block"
          style={{
            background: 'linear-gradient(135deg, #17b6b2, #17b6b2)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
          }}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </div>
  );
};

type ServiceItem = [string, React.ComponentType<any>];

interface ServiceCategory {
  category: string;
  items: ServiceItem[];
}

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [logoHovered, setLogoHovered] = useState(false);

  const services: ServiceCategory[] = [
    {
      category: 'Business Services',
      items: [
        ['Virtual Assistance', HeadsetIcon],
        ['Project Management', ClipboardListIcon],
        ['Data Entry & Transcription', KeyboardIcon],
        ['Data Extraction/ETL', DatabaseIcon],
        ['Lead Generation', PhoneOutgoingIcon],
        ['ERP/CRM Software', LayoutDashboardIcon],
      ],
    },
    {
      category: 'Technology Services',
      items: [
        ['Web Development', CodeIcon],
        ['Mobile App Development', SmartphoneIcon],
        ['UI/UX Design', GlobeIcon],
        ['Cloud Solutions', CloudIcon],
        ['AI Solutions', CpuIcon],
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
    const onResize = () => setShowMobileMenu(window.innerWidth < 950);
    window.addEventListener('scroll', onScroll);
    window.addEventListener('resize', onResize);
    onResize();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    document.body.classList.toggle('dark', newMode);
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
  };

  const headerBg = isScrolled
    ? showMobileMenu
      ? 'bg-[var(--background)]'
      : 'backdrop-blur-md bg-[var(--background)/80]'
    : 'bg-transparent';

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 text-[var(--foreground)] ${headerBg}`}>
      <nav className="flex justify-between items-center px-6 py-2 w-full">
        {/* Logo & Theme Toggle */}
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="flex items-center gap-1 group relative overflow-hidden"
            onMouseEnter={() => setLogoHovered(true)}
            onMouseLeave={() => setLogoHovered(false)}
          >
            <Image src="/assets/images/logo.png" alt="Logo" width={75} height={40} />
            {logoHovered && (
              <div className="transition-opacity duration-300 opacity-100">
                <AnimatedLogoText text="EurosHub" isHovered={logoHovered} />
              </div>
            )}
          </Link>

          {!showMobileMenu && (
            <button
              className="flex items-center gap-2 p-2 border rounded-full hover:bg-[var(--primary)/10] transition-all"
              onClick={toggleDarkMode}
              aria-label="Toggle theme"
            >
              <SunIcon className={`w-4 h-4 ${darkMode ? 'text-gray-400' : 'text-yellow-500'}`} />
              <div className={`w-6 h-3 rounded-full border flex items-center px-0.5 ${darkMode ? 'bg-[var(--foreground)]' : 'bg-[var(--secondary)]'}`}>
                <div className={`w-2 h-2 rounded-full transition-transform ${darkMode ? 'translate-x-3 bg-[var(--background)]' : 'bg-[var(--foreground)]'}`} />
              </div>
              <MoonIcon className={`w-4 h-4 ${darkMode ? 'text-blue-400' : 'text-gray-400'}`} />
            </button>
          )}
        </div>

        {/* Desktop Nav */}
        {!showMobileMenu && (
          <ul className="flex items-center gap-8">
            {['Home', 'About Us'].map((text) => (
              <li key={text} className="relative group">
                <Link
                  href={text === 'Home' ? '/' : '/about'}
                  className="px-3 py-2 rounded-lg font-medium transition hover:bg-[var(--primary)/10] hover:text-[var(--primary)]"
                >
                  {text}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--primary)] transition-all group-hover:w-full" />
                </Link>
              </li>
            ))}
            <li className="relative group">
              <div
                className="flex items-center cursor-pointer px-3 py-2 rounded-lg font-medium hover:bg-[var(--primary)/10] hover:text-[var(--primary)]"
                onClick={() => setServicesOpen((prev) => !prev)}
              >
                Services
                {servicesOpen ? <ChevronUpIcon className="ml-1 w-4 h-4" /> : <ChevronDownIcon className="ml-1 w-4 h-4" />}
              </div>
            </li>
          </ul>
        )}

        {/* CTA */}
        <div className="nav-right gap-3 items-center navbar-cta hidden md:flex">
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
        <div className="flex items-center gap-4">
          {/* Theme Toggle Button */}
          {showMobileMenu && <MobileMenu darkMode={darkMode} toggleDarkMode={toggleDarkMode} />}
        </div>
      </nav>

      {/* Services Dropdown */}
      {servicesOpen && (
        <div className="absolute w-full bg-[var(--background)] border-t border-[var(--secondary)] shadow-xl z-40">
          <div className="px-6 py-4 grid md:grid-cols-2 gap-6">
            {services.map(({ category, items }) => (
              <div key={category}>
                <h3 className="font-semibold text-[var(--primary)] border-b pb-1 mb-2">{category}</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                  {items.map(([name, Icon]) => (
                    <Link
                      key={name}
                      href={`/services#${name.toLowerCase().replace(/\s+/g, '-')}`}
                      className="flex items-center gap-2 p-2 rounded-lg hover:bg-[var(--primary)/10] group"
                    >
                      <Icon className="w-4 h-4 group-hover:text-white bg-[var(--primary)/10] p-1 rounded-full group-hover:bg-[var(--primary)]" />
                      <span className="text-sm font-medium group-hover:text-[var(--primary)]">{name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="text-center border-t pt-3">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 bg-[var(--primary)] text-white px-4 py-2 rounded-full text-sm hover:bg-[var(--primary)/90]"
            >
              View All Services
              <ChevronDownIcon className="w-3 h-3 rotate-90" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}