'use client';
import { useState } from 'react';
import BusinessServices from './BusinessServices';
import TechServices from './TechServices';

export default function Services() {
  const [activeTab, setActiveTab] = useState<'business' | 'tech'>('business');

  return (
    <section className="py-20 text-[var(--foreground)] bg-[var(--background)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Our Comprehensive Services
          </h2>
          <p className="text-lg md:text-xl opacity-80 max-w-3xl mx-auto">
            We offer end-to-end solutions covering both business operations and technology development needs
          </p>
        </div>

        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-[var(--card-bg)]/30 rounded-lg p-1">
            <button
              onClick={() => setActiveTab('business')}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                activeTab === 'business'
                  ? 'bg-[var(--primary)] text-white shadow-md'
                  : 'hover:bg-[var(--card-bg)]/60'
              }`}
            >
              Business Services
            </button>
            <button
              onClick={() => setActiveTab('tech')}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                activeTab === 'tech'
                  ? 'bg-[var(--primary)] text-white shadow-md'
                  : 'hover:bg-[var(--card-bg)]/60'
              }`}
            >
              Technology Services
            </button>
          </div>
        </div>

        {activeTab === 'business' ? <BusinessServices /> : <TechServices />}
      </div>
    </section>
  );
}