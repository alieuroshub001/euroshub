'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaGithub, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';
import CosmicConnectionText from './AnimatedText';

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[var(--background)] text-[var(--foreground)] font-sans border-t border-white/20">
      <div className="flex flex-col md:flex-row">
        {/* Logo and description section */}
        <div className="ml-5 md:w-1/3 p-4 md:p-8 flex flex-col justify-center">
          <div className="flex items-center gap-2">
            <Image
              src="/assets/images/logo.png"
              alt="EurosHub Logo"
              width={140}
              height={40}
              className="object-contain"
            />
          </div>
          <p className="ml-5 mt-2 md:mt-4 text-base md:text-xl leading-snug max-w-md text-[var(--muted-foreground)]">
            Your trusted partner for innovative business and technology solutions.
          </p>
        </div>

        {/* Social icons section */}
        <div className="md:w-1/8 mx-auto md:ml-5 border-t md:border-t-0 border-white/20 flex flex-row md:flex-col text-center">
          {[
            { icon: FaGithub, label: 'Github' },
            { icon: FaTwitter, label: 'Twitter' },
            { icon: FaLinkedin, label: 'LinkedIn' },
            { icon: FaInstagram, label: 'Instagram' },
          ].map(({ icon: Icon, label }, index, arr) => (
            <a
              key={label}
              href="#"
              className={`hover:text-[var(--primary)] transition-colors text-xs uppercase tracking-wide flex items-center justify-center px-4 py-4 md:px-6 md:py-6 border-l border-r border-white/20 ${
                index !== arr.length - 1 ? 'border-b md:border-b' : ''
              }`}
            >
              <Icon className="w-4 h-4 md:w-5 md:h-5 mr-2" /> 
              <span className="hidden md:inline">{label}</span>
            </a>
          ))}
        </div>

        {/* Let's Connect section */}
        <div className="md:w-1/2 flex items-center justify-center p-4 md:p-8">
          <Link href="/contact">
            <h2 className="cursor-pointer text-2xl md:text-4xl lg:text-5xl">
              <CosmicConnectionText text="Let's Connect" />
            </h2>
          </Link>
        </div>
      </div>

      {/* Bottom section */}
      <div className="flex flex-col md:flex-row justify-between items-center px-4 md:px-10 py-4 md:py-6 text-xs md:text-sm border-t border-white/20">
        <p className="text-[var(--muted-foreground)] text-center md:text-left">
          © 2024 | All rights reserved by EurosHub
        </p>
        <nav className="flex flex-wrap justify-center gap-2 md:gap-6 mt-2 md:mt-0">
          <Link href="/about" className="hover:text-[var(--primary)] transition-colors">About</Link>
          <Link href="/contact" className="hover:text-[var(--primary)] transition-colors">Contact</Link>
          <Link href="/career" className="hover:text-[var(--primary)] transition-colors">Career</Link>
          <Link href="/pricing" className="hover:text-[var(--primary)] transition-colors">Pricing</Link>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;