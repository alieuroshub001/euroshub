
import Footer from '@/components/Global/Footer';
import Navbar from '@/components/Global/Navbar';
import AboutUs from '@/components/AboutPage/AboutUs';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About EurosHub | Our Story & Mission',
  description: 'Discover the story behind EurosHub, our mission, values, and the team driving innovation in global tech solutions.',
  keywords: ['about', 'company', 'mission', 'EurosHub about', 'our story', 'team'],
  openGraph: {
    title: 'About EurosHub | Our Story & Mission',
    description: 'Discover the story behind EurosHub and our mission to drive innovation.',
    url: 'https://euroshub.com/about',
    siteName: 'EurosHub',
    images: [
      {
        url: '/assets/images/about-og.jpg',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About EurosHub | Our Story & Mission',
    description: 'Discover the story behind EurosHub and our mission to drive innovation.',
    images: ['/assets/images/about-og.jpg'],
  },
};

export default function AboutPage() {
  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />
    <AboutUs />
      <Footer />
    </main>
  );
}