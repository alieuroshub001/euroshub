'use client';

import { useEffect } from 'react';
import { Toaster } from 'sonner';
import ContactForm from './Form';
import ContactInfo from './Info';
import ContactMap from './Map';

export default function ContactPage() {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="bg-[var(--background)] text-[var(--foreground)]">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 px-4 sm:px-6 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Let&apos;s <span className="text-[var(--primary)]">Connect</span>
          </h1>
          <p className="text-lg max-w-2xl mx-auto opacity-80 mb-8">
            Have a question or want to work together? We&apos;d love to hear from you.
            Reach out and our team will get back to you shortly.
          </p>
        </div>

        {/* Background Blurs */}
        <div className="absolute -z-10 top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute top-[20%] right-[15%] w-64 h-64 bg-[var(--primary)] opacity-5 rounded-full blur-3xl" />
          <div className="absolute bottom-[10%] left-[5%] w-80 h-80 bg-[var(--primary)] opacity-5 rounded-full blur-3xl" />
        </div>
      </section>

      {/* Contact Information Cards */}
      <ContactInfo />

      {/* Form and Map Section */}
      <section className="py-16 px-4 sm:px-6 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 lg:gap-16">
          <ContactForm />
          <ContactMap />
        </div>
      </section>

      {/* Toast Notifications */}
      <Toaster position="top-right" />
    </main>
  );
}
