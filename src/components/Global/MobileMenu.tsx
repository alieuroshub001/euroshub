'use client';

import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  
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

  const navItems = [
    'What We Do',
    'Who We Help',
    'Who We Are',
    'How We Deliver',
    'Join Euroshub',
  ];

  return (
    <div>
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="text-[var(--foreground)] p-2 rounded-lg hover:bg-[var(--secondary)] transition-colors"
        aria-label="Open Mobile Menu"
      >
        <Menu className="w-6 h-6" />
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
              width={60}
              height={30}
              className="object-contain"
            />
            <span className="text-lg font-bold">EurosHub</span>
          </Link>
        </div>

        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 text-[var(--foreground)] p-2 rounded-full hover:bg-[var(--secondary)] transition-colors"
          aria-label="Close Menu"
        >
          <X className="h-6 w-6" />
        </button>

        <ul className="flex flex-col items-center space-y-6 w-full max-w-sm px-8 mt-6">
          {navItems.map((item, index) => (
            <li
              key={item}
              className="w-full py-3 border-b border-[var(--secondary)] last:border-0 text-center"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <a 
                href="#" 
                className="block w-full text-lg font-medium hover:text-[var(--primary)] transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA Buttons */}
        <div className="flex flex-col items-center gap-4 w-full max-w-sm px-8 mt-8">
          <button 
            className="border border-[var(--primary)] text-[var(--primary)] px-6 py-3 rounded-full font-medium w-full hover:bg-[var(--primary)] hover:text-white transition-all duration-300"
            onClick={() => setIsOpen(false)}
          >
            Explore Careers
          </button>
          <button 
            className="border border-[var(--primary)] text-[var(--primary)] px-6 py-3 rounded-full font-medium w-full hover:bg-[var(--primary)] hover:text-white transition-all duration-300"
            onClick={() => setIsOpen(false)}
          >
            Let&apos;s Talk Business
          </button>
        </div>

        {/* Social Icons */}
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