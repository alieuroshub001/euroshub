'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FaLinkedin, FaFacebook, FaInstagram } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const Footer: React.FC = () => {
  const renderTextWithStyledE = (text: string) => {
    return text.split('').map((letter, index) => (
      <span
        key={index}
        className={`inline-block ${
          letter === 'E' ? 'styled-e' : ''
        } glow-text`}
        style={{
          background: 'linear-gradient(135deg, #d8fdff, #a0f7ff, #7df3ff)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          color: 'transparent',
        }}
      >
        {letter === ' ' ? '\u00A0' : letter}
      </span>
    ));
  };

  return (
    <footer className="w-full mt-0 pt-12 lg:pt-0 border-t border-neutral-400 dark:border-neutral-700 relative z-20 backdrop-blur-sm bg-transparent">
      <div className="max-w-[1900px] w-full mx-auto px-[5%] md:px-[2.5%]">
        <div className="grid grid-cols-1 gap-y-8 lg:flex justify-between items-start lg:items-center">
          {/* Logo and description */}
          <div className="max-w-[700px] xl:max-w-[670px] flex flex-col gap-5">
            <Image
              src="/assets/images/logo.png"
              alt="EurosHub-logo"
              width={150}
              height={73}
              className="object-contain"
            />
            <p className="text-sm sm:text-base font-normal leading-[26px] text-[var(--foreground)] dark:text-[var(--foreground)] max-w-[700px] sm:max-w-[500px]">
              When do they work well, and when do they on us and Finally, <br /> when do we actually need how can we avoid them.
            </p>
          </div>

          {/* Social Links */}
          <div className="ml-0 lg:ml-10 flex flex-col items-start w-full max-w-full lg:max-w-[244px]">
            {[
              {
                href: 'https://twitter.com/EurosHub',
                icon: <FaXTwitter className="w-6 h-10" />,
                label: 'X',
              },
              {
                href: 'https://www.linkedin.com/company/euroshub',
                icon: <FaLinkedin className="w-6 h-10" />,
                label: 'LinkedIn',
              },
              {
                href: 'https://www.facebook.com/official.euroshub/',
                icon: <FaFacebook className="w-6 h-10" />,
                label: 'Facebook',
              },
              {
                href: 'https://www.instagram.com/euroshub.official/',
                icon: <FaInstagram className="w-6 h-10" />,
                label: 'Instagram',
              },
            ].map(({ href, icon, label }) => (
              <Link
                key={label}
                href={href}
                target="_blank"
                className="hover:bg-[#0FB8AF] pl-10 w-full py-4 text-sm sm:text-base uppercase flex items-center gap-2 border border-neutral-400 dark:border-neutral-700 text-[var(--foreground)] dark:text-[var(--foreground)]"
              >
                {icon}
                {label}
              </Link>
            ))}
          </div>

          {/* Let's Connect */}
          <Link
            href="/contact"
            className="pt-8 md:pt-14 mb-0 md:mb-12 text-center mx-auto lg:text-left font-library3am tracking-wider w-fit max-w-full group"
          >
            <div className="px-6 py-3 rounded-lg">
              <span className="text-4xl md:text-6xl lg:text-7xl font-library3am tracking-tight">
                {renderTextWithStyledE('LETS CONNECT')}
              </span>
            </div>
          </Link>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="w-full px-[5%] md:px-[2.5%] mt-8 lg:mt-0 bg-[var(--secondary)] dark:bg-[var(--secondary)] border-t border-neutral-400 dark:border-neutral-700 backdrop-blur-md">
        <div className="max-w-[1900px] w-full mx-auto">
          <div className="flex flex-col-reverse gap-y-6 lg:flex-row justify-between items-center py-6">
            <p className="text-sm sm:text-base xxl:text-lg text-[var(--foreground)] dark:text-[var(--foreground)]">
              © 2025 | All rights reserved by EurosHub
            </p>
            <div className="mr-20 flex gap-8">
              {['about', 'contact', 'career'].map((page) => (
                <Link
                  key={page}
                  href={`/${page}`}
                  className="text-sm sm:text-base xxl:text-lg text-[var(--foreground)] dark:text-[var(--foreground)] hover:text-[var(--primary)] dark:hover:text-[var(--primary)]"
                >
                  {page.charAt(0).toUpperCase() + page.slice(1)}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;