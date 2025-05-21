'use client';

import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  
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

  const servicesItems = [
    'Custom Software Development',
    'UI/UX Design',
    'Digital Transformation',
    'Tech Consulting',
    'Cloud Solutions',
    'Mobile App Development'
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
              <ul className="mt-2 pl-4 space-y-2">
                {servicesItems.map((item) => (
                  <li key={item}>
                    <Link 
                      href={`/services#${item.toLowerCase().replace(/\s+/g, '-')}`}
                      className="block py-2 text-base hover:text-[var(--primary)] transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
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

        {/* CTA Buttons */}
        <div className="flex flex-col items-center gap-4 w-full max-w-sm px-8 mt-8">
          <button 
            className="border border-[var(--primary)] text-[var(--primary)] px-6 py-3 rounded-full font-medium w-full hover:bg-[var(--primary)] hover:text-white transition-all duration-300"
            onClick={() => setIsOpen(false)}
          >
            Explore Careers
          </button>
          <Link 
    href="/contact" 
    className="w-full"
    onClick={() => setIsOpen(false)}
  >
    <button 
      className="border border-[var(--primary)] text-[var(--primary)] px-6 py-3 rounded-full font-medium w-full hover:bg-[var(--primary)] hover:text-white transition-all duration-300"
    >
      Let&apos;s Talk Business
    </button>
  </Link>
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