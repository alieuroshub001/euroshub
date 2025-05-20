'use client';

import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

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
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-[rgba(var(--background),0.95)] backdrop-blur-sm text-[var(--foreground)] flex flex-col items-center justify-center px-6 pt-16 space-y-8">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-5 right-5 text-[var(--foreground)] p-2 rounded-full hover:bg-[var(--secondary)] transition-colors"
            aria-label="Close Menu"
          >
            <X className="h-6 w-6" />
          </button>

          <ul className="flex flex-col items-center space-y-8 w-full">
            {navItems.map((item) => (
              <li
                key={item}
                className="w-full text-center py-3 border-b border-[var(--secondary)] last:border-0 hover:text-[var(--primary)] transition-colors text-lg font-medium"
                onClick={() => setIsOpen(false)}
              >
                <a href="#" className="block w-full">
                  {item}
                </a>
              </li>
            ))}
          </ul>

          {/* CTA Buttons (only show when hidden in navbar) */}
          <div className="flex flex-col items-center gap-4 w-full mt-2 px-4 mobile-cta">
            <button className="border border-[var(--primary)] text-[var(--primary)] px-6 py-3 rounded-full font-medium w-full max-w-xs hover:bg-[var(--primary)] hover:text-white transition-colors">
              Explore Careers
            </button>
            <button className="border border-[var(--primary)] text-[var(--primary)] px-6 py-3 rounded-full font-medium w-full max-w-xs hover:bg-[var(--primary)] hover:text-white transition-colors">
              Let&apos;s Talk Business
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
