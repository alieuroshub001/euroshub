// app/page.tsx
import Footer from '@/components/Global/Footer';
import Navbar from '@/components/Global/Navbar';
import Clients from '@/components/Homepage/Clients';
import Counter from '@/components/Homepage/Counter';
import Hero from '@/components/Homepage/Hero';
import Services from '@/components/Homepage/Services';
import Team from '@/components/Homepage/Team';
import Testimonial from '@/components/Homepage/Testimonial';
import '@fortawesome/fontawesome-free/css/all.min.css';

export default function Home() {
  return (
    <>
      <Navbar />
        <Hero />
        <Services />
        <Clients />
        <Counter />
        <Testimonial />
        <Team />
        <Footer />
    </>
  );
}