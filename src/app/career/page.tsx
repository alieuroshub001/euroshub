import Footer from '@/components/Global/Footer';
import Navbar from '@/components/Global/Navbar';
import CareerHero from '@/components/CareerPage/CareerHero';
import CareerBenefits from '@/components/CareerPage/CareerBenefits';
import JobOpenings from '@/components/CareerPage/JobOpenings';
import TeamCulture from '@/components/CareerPage/TeamCulture';
import HiringProcess from '@/components/CareerPage/HiringProcess';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Careers at EurosHub | Join Our Team',
  description: 'Explore career opportunities at EurosHub. Join our team of innovators and work on cutting-edge projects with great benefits and growth potential.',
  keywords: ['careers', 'jobs', 'hiring', 'EurosHub careers', 'tech jobs', 'remote work'],
  openGraph: {
    title: 'Careers at EurosHub | Join Our Team',
    description: 'Explore exciting career opportunities and join our innovative team at EurosHub.',
    url: 'https://euroshub.com/careers',
    siteName: 'EurosHub',
    images: [
      {
        url: '/assets/images/career-og.jpg',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Careers at EurosHub | Join Our Team',
    description: 'Explore exciting career opportunities and join our innovative team at EurosHub.',
    images: ['/assets/images/career-og.jpg'],
  },
};

export default function CareerPage() {
  return (
    <main className="flex min-h-screen flex-col">
      
      <Navbar />

      {/* Hero Section */}
      <CareerHero />

      {/* Benefits Section */}
      <CareerBenefits />

      {/* Job Openings Section */}
      <JobOpenings />

      {/* Team Culture Section */}
      <TeamCulture />

      {/* Hiring Process Section */}
      <HiringProcess />

      {/* CTA Section */}
      <section className="mb-60 py-16 bg-[var(--primary)] text-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Still Have Questions?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Our HR team is happy to help answer any questions you might have about working at EurosHub.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="mailto:careers@euroshub.com">
              <button className="bg-white text-[var(--primary)] px-8 py-3 rounded-full font-medium hover:opacity-90 transition">
                Email Our Team
              </button>
            </a>
            <a href="#openings">
              <button className="border border-white text-white px-8 py-3 rounded-full font-medium hover:bg-white hover:text-[var(--primary)] transition">
                View Openings Again
              </button>
            </a>

          </div>
        </div>
      </section>
              <Footer />

    </main>
    
  );
}