/* eslint-disable react/no-unescaped-entities */
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import MobileMenu from './MobileMenu';

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

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
    <header className="w-full border-b border-secondary bg-[var(--background)] text-[var(--foreground)] transition">
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
            <ul className="nav-center custom-nav-visible gap-6 items-center text-sm font-medium whitespace-nowrap overflow-hidden text-ellipsis">
              <li className="cursor-pointer hover:text-primary transition">
                <Link href="/">Home</Link>
              </li>
              
              <li 
                className="relative group cursor-pointer hover:text-primary transition"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <div className="flex items-center">
                  Services <span className="inline-block ml-1">&#x25BE;</span>
                </div>
                
                {/* Services Dropdown */}
                {servicesOpen && (
                  <div className="absolute left-0 mt-2 w-64 bg-[var(--background)] border border-[var(--secondary)] rounded-lg shadow-lg z-50">
                    <ul className="py-2">
                      {[
                        'Custom Software Development',
                        'UI/UX Design',
                        'Digital Transformation',
                        'Tech Consulting',
                        'Cloud Solutions',
                        'Mobile App Development'
                      ].map((service) => (
                        <li key={service} className="px-4 py-2 hover:bg-[var(--secondary)] transition">
                          <Link href={`/services#${service.toLowerCase().replace(/\s+/g, '-')}`} className="block w-full">
                            {service}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
              
              <li className="cursor-pointer hover:text-primary transition">
                <Link href="/about">About Us</Link>
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
                Let's Talk Business
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