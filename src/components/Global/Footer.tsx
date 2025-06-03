// components/Global/Footer.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FaGithub, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';
import CosmicConnectionText from './AnimatedText';

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[var(--background)] text-[var(--foreground)] font-sans border-t border-[color:var(--border-color)]
">
      <div className="flex flex-col lg:flex-row">
        {/* Logo and description section */}
        <div className="lg:w-1/3 p-4 lg:p-8 flex flex-col justify-center">
          <div className="flex items-center gap-2">
            <Image
              src="/assets/images/logo.png"
              alt="EurosHub Logo"
              width={140}
              height={40}
              className="object-contain"
            />
          </div>
          <p className="ml-5 mt-2 lg:mt-4 text-base lg:text-xl leading-snug max-w-md text-[var(--muted-foreground)]">
            Your trusted partner for innovative business and technology solutions.
          </p>
        </div>

        {/* Social icons section - hidden on mobile, shown from 768px */}
<div className="hidden md:flex mx-auto lg:ml-15 border-t lg:border-t-0 border-[color:var(--border-color)] flex-row lg:flex-col text-center">
          {[
            { icon: FaGithub, label: 'Github' },
            { icon: FaTwitter, label: 'Twitter' },
            { icon: FaLinkedin, label: 'LinkedIn' },
            { icon: FaInstagram, label: 'Instagram' },
          ].map(({ icon: Icon, label }, index, arr) => (
            <a
              key={label}
              href="#"
              className={`hover:text-[var(--primary)] transition-colors text-xs uppercase tracking-wide flex items-center justify-center px-4 py-4 lg:px-6 lg:py-6 border-l border-r border-[color:var(--border-color)]
 ${
                index !== arr.length - 1 ? 'border-b lg:border-b' : ''
              }`}
            >
              <Icon className="w-4 h-4 lg:w-5 lg:h-5 mr-2" /> 
              <span className="hidden lg:inline">{label}</span>
            </a>
          ))}
        </div>

        {/* Mobile social icons - shown only on mobile */}
        <div className="md:hidden flex border-t border-[color:var(--border-color)]
">
          {[
            { icon: FaGithub, label: 'Github' },
            { icon: FaTwitter, label: 'Twitter' },
            { icon: FaLinkedin, label: 'LinkedIn' },
            { icon: FaInstagram, label: 'Instagram' },
          ].map(({ icon: Icon, label }) => (
            <a
              key={label}
              href="#"
              className="flex-1 hover:text-[var(--primary)] transition-colors flex items-center justify-center py-4"
            >
              <Icon className="w-5 h-5" />
            </a>
          ))}
        </div>

        {/* Let's Connect section */}
        <div className="lg:w-1/2 lg:mr-1 flex items-center justify-center p-4 lg:p-8">
          <Link href="/contact">
            <h2 className="cursor-pointer text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
              <CosmicConnectionText text="Let's Connect" />
            </h2>
          </Link>
        </div>
      </div>

      {/* Bottom section - reversed order on mobile */}
      <div className="flex flex-col md:flex-row justify-between items-center px-4 lg:px-30 py-4 lg:py-6 text-xs md:text-sm border-t border-[color:var(--border-color)]
">
        {/* Links first on mobile */}
        <nav className="order-1 md:order-2 flex flex-wrap justify-center gap-8 md:gap-6 mb-5 md:mb-0">
          <Link href="/about" className="hover:text-[var(--primary)] transition-colors">About</Link>
          <Link href="/contact" className="hover:text-[var(--primary)] transition-colors">Contact</Link>
          <Link href="/career" className="hover:text-[var(--primary)] transition-colors">Career</Link>
        </nav>
        
        {/* Copyright second on mobile */}
        <p className="order-2 md:order-1 text-[var(--muted-foreground)] text-center md:text-left">
          © 2025 | All rights reserved by EurosHub
        </p>
      </div>
    </footer>
  );
};

export default Footer;