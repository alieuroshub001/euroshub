import Footer from '@/components/Global/Footer';
import Navbar from '@/components/Global/Navbar';
import Hero from '@/components/Homepage/Hero';
import Services from '@/components/Homepage/Services';
import Clients from '@/components/Homepage/Clients';
import Counter from '@/components/Homepage/Counter';
import Testimonial from '@/components/Homepage/Testimonial';
import Team from '@/components/Homepage/Team';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'EurosHub | Empowering Global Innovation with Tailored Tech Solutions',
  description: 'EurosHub partners with businesses worldwide to build scalable, smart, and sustainable technology that transforms vision into value.',
  keywords: ['EurosHub','Virtual Assistance',  'Project Management', 'Data Entry & Transcription', 'Market Research',  'Lead Generation', 'tech solutions', 'innovation', 'web development', 'mobile apps', 'AI solutions'],
  openGraph: {
    title: 'EurosHub | Empowering Global Innovation',
    description: 'Transform your vision into value with our cutting-edge technology solutions.',
    url: 'https://euroshub.com',
    siteName: 'EurosHub',
    images: [
      {
        url: '/assets/images/home-og.jpg',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EurosHub | Empowering Global Innovation',
    description: 'Transform your vision into value with our cutting-edge technology solutions.',
    images: ['/assets/images/home-og.jpg'],
  },
};

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />
      
      <Hero />
      <Services />
      <Clients />
      <Counter />
      <Testimonial />
      <Team />
      
      <Footer />
    </main>
  );
}