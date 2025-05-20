import Footer from '@/components/Global/Footer';
import Navbar from '@/components/Global/Navbar';
import Team from '@/components/Homepage/Team';
import Clients from '@/components/Homepage/Clients';
import Counter from '@/components/Homepage/Counter';
import Testimonial from '@/components/Homepage/Testimonial';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Hero from '@/components/Homepage/Hero';
import Services from '@/components/Homepage/Services';


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
      {/* Your content */}
    </>
  );
}
