'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-[var(--background)] text-[var(--foreground)] border-t border-[var(--secondary)] pt-12 pb-8 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Logo and Description */}
        <div>
          <Link href="/" className="flex items-center gap-2 mb-4">
            <Image
              src="/assets/images/logo.png"
              alt="EurosHub Logo"
              width={80}
              height={40}
              className="object-contain"
            />
            <span className="text-xl font-bold">EurosHub</span>
          </Link>
          <p className="text-sm opacity-80">
            Empowering businesses worldwide with innovative, scalable, and future-ready tech solutions.
          </p>
        </div>

        {/* Services Links */}
        <div>
          <h4 className="text-md font-semibold mb-3">Services</h4>
          <ul className="space-y-2 text-sm opacity-90">
            {['Custom Software', 'UI/UX Design', 'Digital Transformation', 'Tech Consulting'].map((item) => (
              <li key={item}>
                <Link href="#" className="hover:text-[var(--primary)] transition-colors">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company Links */}
        <div>
          <h4 className="text-md font-semibold mb-3">Company</h4>
          <ul className="space-y-2 text-sm opacity-90">
            {['About Us', 'Careers', 'Testimonials', 'Blog'].map((item) => (
              <li key={item}>
                <Link href="#" className="hover:text-[var(--primary)] transition-colors">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact & Social */}
        <div>
          <h4 className="text-md font-semibold mb-3">Contact</h4>
          <ul className="space-y-2 text-sm opacity-90 mb-4">
            <li>Email: <a href="mailto:contact@euroshub.com" className="hover:text-[var(--primary)]">contact@euroshub.com</a></li>
            <li>Phone: <a href="tel:+1234567890" className="hover:text-[var(--primary)]">+1 234 567 890</a></li>
          </ul>
          <div className="flex gap-4">
            <a href="#" aria-label="LinkedIn" className="hover:text-[var(--primary)] transition">
              <i className="fab fa-linkedin text-xl"></i>
            </a>
            <a href="#" aria-label="Twitter" className="hover:text-[var(--primary)] transition">
              <i className="fab fa-twitter text-xl"></i>
            </a>
            <a href="#" aria-label="Facebook" className="hover:text-[var(--primary)] transition">
              <i className="fab fa-facebook text-xl"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom line */}
      <div className="mt-12 pt-6 border-t border-[var(--secondary)] text-center text-sm opacity-70">
        © {new Date().getFullYear()} EurosHub. All rights reserved.
      </div>
    </footer>
  );
}
