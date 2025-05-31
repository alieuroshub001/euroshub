import Services from '@/components/ServicePage/Services';
import { Metadata } from 'next';
import Footer from '@/components/Global/Footer';
import Navbar from '@/components/Global/Navbar';

export const metadata: Metadata = {
  title: 'Our Services | EurosHub',
  description: 'Discover our comprehensive business and technology services designed to transform your operations and digital presence.',
  keywords: ['business services', 'technology solutions', 'virtual assistance', 'web development', 'AI solutions', 'cloud services'],
  openGraph: {
    title: 'Our Services | EurosHub',
    description: 'End-to-end services covering both business operations and technology development',
    images: [
      {
        url: '/assets/images/services-og.jpg',
        width: 1200,
        height: 630,
        alt: 'EurosHub Services',
      },
    ],
  },
};

export default function ServicesPage() {
  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex flex-col items-center justify-between">
        {/* Hero Section */}
        <section className="w-full bg-gradient-to-b from-[var(--background)] to-[var(--secondary)]/10">
          <div className="max-w-7xl mx-auto px-6 py-24 md:py-32 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Transformative <span className="text-[var(--primary)]">Services</span>
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
              Comprehensive solutions designed to elevate your business operations and technology infrastructure
            </p>
          </div>
        </section>

        {/* Services Tabs Component */}
        <Services />

        {/* CTA Section */}
        <section className="w-full bg-[var(--secondary)]/10 py-20">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to transform your business?
            </h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
              Our experts are ready to discuss your needs and craft the perfect solution for your organization.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="bg-[var(--primary)] text-white px-8 py-4 rounded-full font-medium hover:opacity-90 transition hover:shadow-lg hover:shadow-[var(--primary)]/30"
              >
                Get in Touch
              </a>
              <a
                href="/career"
                className="border border-[var(--primary)] text-[var(--primary)] px-8 py-4 rounded-full font-medium hover:bg-[var(--primary)] hover:text-white transition hover:shadow-lg hover:shadow-[var(--primary)]/20"
              >
                Join Our Team
              </a>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
}