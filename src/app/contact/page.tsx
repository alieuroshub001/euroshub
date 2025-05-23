import Footer from '@/components/Global/Footer';
import Navbar from '@/components/Global/Navbar';
import ContactComponent from '@/components/ContactPage/Index';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | EurosHub - Get in Touch',
  description: 'Reach out to EurosHub for inquiries, partnerships, or support. Our team is ready to assist you with your business needs.',
  keywords: ['contact', 'support', 'inquiry', 'EurosHub contact', 'business inquiry', 'customer service'],
  openGraph: {
    title: 'Contact Us | EurosHub - Get in Touch',
    description: 'Reach out to EurosHub for inquiries, partnerships, or support.',
    url: 'https://euroshub.com/contact',
    siteName: 'EurosHub',
    images: [
      {
        url: '/assets/images/contact-og.jpg',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Us | EurosHub - Get in Touch',
    description: 'Reach out to EurosHub for inquiries, partnerships, or support.',
    images: ['/assets/images/contact-og.jpg'],
  },
};

export default function ContactPage() {
  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />
      <ContactComponent />
      <Footer />
    </main>
  );
}