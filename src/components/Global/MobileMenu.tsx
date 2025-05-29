'use client';

import { HeadsetIcon, ClipboardListIcon, KeyboardIcon, DatabaseIcon, PhoneOutgoingIcon, CodeIcon, SmartphoneIcon, GlobeIcon, CpuIcon, CloudIcon, SunIcon, MoonIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface MobileMenuProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export default function MobileMenu({ darkMode, toggleDarkMode }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [activeServiceTab, setActiveServiceTab] = useState<'business' | 'tech'>('business');
  
  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const businessServices = [
    {
      title: 'Virtual Assistance',
      icon: <HeadsetIcon className="w-6 h-6 text-[var(--primary)]" />,
    },
    {
      title: 'Project Management',
      icon: <ClipboardListIcon className="w-6 h-6 text-[var(--primary)]" />,
    },
    {
      title: 'Data Entry & Transcription',
      icon: <KeyboardIcon className="w-6 h-6 text-[var(--primary)]" />,
    },
    {
      title: 'Data Extraction/ETL',
      icon: <DatabaseIcon className="w-6 h-6 text-[var(--primary)]" />,
    },
    {
      title: 'Lead Generation',
      icon: <PhoneOutgoingIcon className="w-6 h-6 text-[var(--primary)]" />,
    }
  ];

  const techServices = [
    {
      title: 'Web Development',
      icon: <CodeIcon className="w-6 h-6 text-[var(--primary)]" />,
    },
    {
      title: 'Mobile App Development',
      icon: <SmartphoneIcon className="w-6 h-6 text-[var(--primary)]" />,
    },
    {
      title: 'UI/UX Design',
      icon: <GlobeIcon className="w-6 h-6 text-[var(--primary)]" />,
    },
    {
      title: 'Cloud Solutions',
      icon: <CloudIcon className="w-6 h-6 text-[var(--primary)]" />,
    },
    {
      title: 'AI Solutions',
      icon: <CpuIcon className="w-6 h-6 text-[var(--primary)]" />,
    }
  ];

  return (
    <div>
      {/* Animated Hamburger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="relative w-8 h-8 flex flex-col items-center justify-center gap-1.5 p-1 rounded-lg hover:bg-[var(--secondary)] transition-colors"
        aria-label="Open Mobile Menu"
      >
        <span className={`block w-6 h-0.5 bg-[var(--foreground)] transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
        <span className={`block w-6 h-0.5 bg-[var(--foreground)] transition-all duration-300 ${isOpen ? 'opacity-0' : 'opacity-100'}`}></span>
        <span className={`block w-6 h-0.5 bg-[var(--foreground)] transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
      </button>

      {/* Mobile Menu */}
      <div 
        className={`fixed inset-0 z-50 bg-[var(--background)] backdrop-blur-lg text-[var(--foreground)] flex flex-col items-center justify-start pt-20 transition-all duration-300 ${
          isOpen 
            ? 'opacity-100 visible translate-y-0' 
            : 'opacity-0 invisible translate-y-4'
        }`}
      >
        <div className="absolute top-4 left-4 flex items-center">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/assets/images/logo.png"
              alt="Euroshub Logo"
              width={45}
              height={30}
              className="object-contain"
            />
            <span className="text-lg font-bold">EurosHub</span>
          </Link>
        </div>

        {/* Animated Close Button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 w-10 h-10 flex flex-col items-center justify-center gap-1.5 p-1 rounded-full hover:bg-[var(--secondary)] transition-colors"
          aria-label="Close Menu"
        >
          <span className={`block w-6 h-0.5 bg-[var(--foreground)] transition-all duration-300 rotate-45 translate-y-1.5`}></span>
          <span className={`block w-6 h-0.5 bg-[var(--foreground)] transition-all duration-300 -rotate-45 -translate-y-1.5`}></span>
        </button>

        {/* Rest of the mobile menu content remains the same */}
        <ul className="flex flex-col items-center w-full max-w-sm px-8 mt-6">
          <li className="w-full py-3 border-b border-[var(--secondary)] text-center">
            <Link 
              href="/" 
              className="block w-full text-lg font-medium hover:text-[var(--primary)] transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
          </li>
          
          <li className="w-full py-3 border-b border-[var(--secondary)]">
            <button 
              className="w-full text-lg font-medium hover:text-[var(--primary)] transition-colors flex justify-center items-center"
              onClick={() => setServicesOpen(!servicesOpen)}
            >
              Services
              <span className={`ml-2 transition-transform ${servicesOpen ? 'rotate-180' : ''}`}>&#x25BE;</span>
            </button>
            
            {/* Services Dropdown */}
            {servicesOpen && (
              <div className="w-full mt-4">
                {/* Service Tabs */}
                <div className="flex mb-4 rounded-lg bg-[var(--secondary)] p-1">
                  <button
                    onClick={() => setActiveServiceTab('business')}
                    className={`flex-1 py-2 rounded-md text-sm font-medium transition-colors ${
                      activeServiceTab === 'business'
                        ? 'bg-[var(--primary)] text-white shadow'
                        : 'hover:bg-[var(--secondary)]/60'
                    }`}
                  >
                    Business
                  </button>
                  <button
                    onClick={() => setActiveServiceTab('tech')}
                    className={`flex-1 py-2 rounded-md text-sm font-medium transition-colors ${
                      activeServiceTab === 'tech'
                        ? 'bg-[var(--primary)] text-white shadow'
                        : 'hover:bg-[var(--secondary)]/60'
                    }`}
                  >
                    Technology
                  </button>
                </div>

                {/* Service Items */}
                <div className="space-y-2 pl-2">
                  {(activeServiceTab === 'business' ? businessServices : techServices).map((service) => (
                    <Link
                      key={service.title}
                      href={`/services#${service.title.toLowerCase().replace(/\s+/g, '-')}`}
                      className="flex items-center py-2 px-3 rounded-lg hover:bg-[var(--secondary)] transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      <div className="bg-[var(--primary)]/10 p-2 rounded-full mr-3">
                        {service.icon}
                      </div>
                      <span className="text-base">{service.title}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </li>
          
          <li className="w-full py-3 border-b border-[var(--secondary)] text-center">
            <Link 
              href="/about" 
              className="block w-full text-lg font-medium hover:text-[var(--primary)] transition-colors"
              onClick={() => setIsOpen(false)}
            >
              About Us
            </Link>
          </li>
        </ul>

        {/* Theme Toggle */}
        <div className="flex items-center justify-center w-full mt-6 mb-4">
          <button
            onClick={toggleDarkMode}
            className="flex items-center gap-2 p-2 rounded-full border border-[var(--primary)/20] hover:bg-[var(--primary)/10] transition-all duration-300"
            aria-label="Toggle Dark Mode"
          >
            <SunIcon className={`w-5 h-5 transition-all duration-300 ${darkMode ? 'text-gray-400' : 'text-yellow-500'}`} />
            <div className={`w-8 h-4 rounded-full border flex items-center px-1 transition-colors ${
              darkMode ? 'bg-[var(--foreground)]' : 'bg-[var(--secondary)]'
            }`}>
              <div
                className={`w-3 h-3 rounded-full transition-transform duration-300 ${
                  darkMode
                    ? 'translate-x-4 bg-[var(--background)]'
                    : 'bg-[var(--foreground)]'
                }`}
              />
            </div>
            <MoonIcon className={`w-5 h-5 transition-all duration-300 ${darkMode ? 'text-blue-400' : 'text-gray-400'}`} />
          </button>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col items-center gap-4 w-full max-w-sm px-8 mt-4">
          <Link 
            href="/career" 
            className="w-full"
            onClick={() => setIsOpen(false)}
          >
            <button className="bg-[var(--primary)] text-white px-6 py-3 rounded-full font-medium w-full hover:opacity-90 transition">
              Explore Careers
            </button>
          </Link>
          <Link 
            href="/contact" 
            className="w-full"
            onClick={() => setIsOpen(false)}
          >
            <button className="border border-[var(--primary)] text-[var(--primary)] px-6 py-3 rounded-full font-medium w-full hover:bg-[var(--primary)] hover:text-white transition">
              Let&apos;s Talk Business
            </button>
          </Link>
        </div>

        <div className="flex justify-center gap-6 mt-12">
          {['linkedin', 'twitter', 'facebook'].map((platform) => (
            <a 
              key={platform} 
              href="#" 
              aria-label={platform}
              className="text-[var(--foreground)] hover:text-[var(--primary)] transition-colors"
            >
              <i className={`fab fa-${platform} text-xl`}></i>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}