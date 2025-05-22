'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-[var(--background)] text-[var(--foreground)] border-t border-[var(--secondary)] pt-12 pb-6 px-4 sm:px-6 md:px-12 lg:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
        {/* Logo and Description */}
        <div className="md:col-span-1">
          <Link href="/" className="flex items-center gap-2 mb-4 group">
            <Image
              src="/assets/images/logo.png"
              alt="EurosHub Logo"
              width={80}
              height={40}
              className="object-contain transition-transform duration-300 group-hover:scale-105"
            />
            <span className="text-xl font-bold">EurosHub</span>
          </Link>
          <p className="text-sm opacity-80 leading-relaxed">
            Empowering businesses worldwide with innovative, scalable, and future-ready tech solutions that drive growth and digital transformation.
          </p>
          
          {/* Social Icons */}
          <div className="flex gap-5 mt-5">
            {[
              { name: 'linkedin', label: 'LinkedIn' },
              { name: 'twitter', label: 'Twitter' },
              { name: 'facebook', label: 'Facebook' },
              { name: 'instagram', label: 'Instagram' }
            ].map((social) => (
              <a 
                key={social.name} 
                href="#" 
                aria-label={social.label}
                className="text-[var(--foreground)] hover:text-[var(--primary)] transition-all duration-300 hover:-translate-y-1"
              >
                <i className={`fab fa-${social.name} text-lg`}></i>
              </a>
            ))}
          </div>
        </div>

        {/* Services Links */}
        <div>
          <h4 className="text-md font-semibold mb-4 relative inline-block">
            Services
            <span className="absolute left-0 bottom-0 w-10 h-0.5 bg-[var(--primary)]"></span>
          </h4>
          <ul className="space-y-2.5 text-sm">
            {[
              'Custom Software Development',
              'UI/UX Design',
              'Digital Transformation',
              'Tech Consulting',
              'Cloud Solutions',
              'Mobile App Development'
            ].map((item) => (
              <li key={item} className="opacity-90 hover:opacity-100">
                <Link 
                  href="#" 
                  className="hover:text-[var(--primary)] transition-colors group flex items-center"
                >
                  <span className="transform transition-transform duration-300 group-hover:translate-x-1">→</span>
                  <span className="ml-2">{item}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company Links */}
        <div>
          <h4 className="text-md font-semibold mb-4 relative inline-block">
            Company
            <span className="absolute left-0 bottom-0 w-10 h-0.5 bg-[var(--primary)]"></span>
          </h4>
          <ul className="space-y-2.5 text-sm">
            {[
              'About Us',
              'Careers',
              'Case Studies',
              'Testimonials',
              'Blog',
              'Partners'
            ].map((item) => (
              <li key={item} className="opacity-90 hover:opacity-100">
                <Link 
                  href="#" 
                  className="hover:text-[var(--primary)] transition-colors group flex items-center"
                >
                  <span className="transform transition-transform duration-300 group-hover:translate-x-1">→</span>
                  <span className="ml-2">{item}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact & Newsletter */}
        <div>
          <h4 className="text-md font-semibold mb-4 relative inline-block">
            Contact Us
            <span className="absolute left-0 bottom-0 w-10 h-0.5 bg-[var(--primary)]"></span>
          </h4>
          <ul className="space-y-2.5 text-sm opacity-90 mb-5">
            <li className="flex items-start">
              <i className="fas fa-envelope mt-1 mr-3 text-[var(--primary)]"></i>
              <a href="mailto:contact@euroshub.com" className="hover:text-[var(--primary)] transition-colors">contact@euroshub.com</a>
            </li>
            <li className="flex items-start">
              <i className="fas fa-phone-alt mt-1 mr-3 text-[var(--primary)]"></i>
              <a href="tel:+923345678900" className="hover:text-[var(--primary)] transition-colors">+92 334 5678900</a>
            </li>
            <li className="flex items-start">
              <i className="fas fa-map-marker-alt mt-1 mr-3 text-[var(--primary)]"></i>
            <span>Office 509, 5th Floor, Kohistan Tower, Saddar, Rawalpindi</span>
            </li>
          </ul>
          
          {/* Newsletter Signup */}
          <div className="mt-5">
            <h5 className="text-sm font-semibold mb-2">Subscribe to our newsletter</h5>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Your email" 
                className="bg-[var(--secondary)] text-[var(--foreground)] rounded-l-full py-2 px-4 text-sm w-full focus:outline-none"
              />
              <button className="bg-[var(--primary)] text-white rounded-r-full px-4 text-sm hover:opacity-90 transition-opacity">
                <i className="fas fa-paper-plane"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom line */}
      <div className="mt-10 pt-5 border-t border-[var(--secondary)] flex flex-col md:flex-row md:justify-between text-sm opacity-70 text-center md:text-left">
        <div>© {new Date().getFullYear()} EurosHub. All rights reserved.</div>
        <div className="mt-2 md:mt-0 space-x-3">
          <Link href="#" className="hover:text-[var(--primary)] transition-colors">Privacy Policy</Link>
          <Link href="#" className="hover:text-[var(--primary)] transition-colors">Terms of Service</Link>
          <Link href="#" className="hover:text-[var(--primary)] transition-colors">Cookies</Link>
        </div>
      </div>
    </footer>
  );
}