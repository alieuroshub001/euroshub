'use client';

import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import {
  Calendar,
  CheckCircle,
  Clock,
  FileText,
  Globe,
  Headphones,
  Mail,
  MessageSquare,
  Phone,
  PieChart,
  Star,
  Target,
  Users,
  Zap
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';

// Scroll-triggered text opacity component
const ScrollRevealText = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "start 0.25"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 1], [0.3, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [20, 0]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity, y }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Animated counter component
import { useEffect, useState } from 'react';

const AnimatedCounter = ({ end, duration = 2, suffix = "" }: { end: number; duration?: number; suffix?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const increment = end / (duration * 60); // assuming 60fps
    let frame: number;

    const animate = () => {
      start += increment;
      if (start < end) {
        setCount(Math.floor(start));
        frame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animate();
    return () => cancelAnimationFrame(frame);
  }, [isInView, end, duration]);

  return (
    <motion.span
      ref={ref}
      initial={{ scale: 0.5, opacity: 0 }}
      animate={isInView ? { scale: 1, opacity: 1 } : {}}
      transition={{ duration: 0.5 }}
    >
      <span>
        {isInView ? `${count}${suffix}` : `0${suffix}`}
      </span>
    </motion.span>
  );
};

export default function VirtualAssistancePage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  const services = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email Management",
      description: "Professional email handling, filtering, and response management to keep your inbox organized."
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      title: "Calendar Scheduling",
      description: "Efficient appointment booking, meeting coordination, and schedule optimization."
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Document Preparation",
      description: "Creating, editing, and formatting professional documents, presentations, and reports."
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Call Handling",
      description: "Professional phone answering, message taking, and customer inquiry management."
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Research Tasks",
      description: "Comprehensive market research, competitor analysis, and data compilation."
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: "Customer Support",
      description: "24/7 customer service, live chat support, and client relationship management."
    }
  ];

  const features = [
    {
      icon: <Clock className="w-8 h-8" />,
      title: "24/7 Availability",
      description: "Round-the-clock support across different time zones"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Dedicated Team",
      description: "Experienced professionals assigned to your specific needs"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Quick Turnaround",
      description: "Fast delivery without compromising on quality"
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Custom Solutions",
      description: "Tailored services to match your business requirements"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      company: "TechStart Inc.",
      text: "EurosHub's virtual assistance has transformed our productivity. Their team is incredibly reliable and professional.",
      rating: 5,
      image: "/assets/testimonials/sarah.jpg"
    },
    {
      name: "Michael Chen",
      company: "Global Marketing Co.",
      text: "The level of support we receive is outstanding. They've become an integral part of our daily operations.",
      rating: 5,
      image: "/assets/testimonials/michael.jpg"
    },
    {
      name: "Emily Rodriguez",
      company: "Creative Solutions",
      text: "Professional, efficient, and always available when we need them. Highly recommend their services.",
      rating: 5,
      image: "/assets/testimonials/emily.jpg"
    }
  ];

  const stats = [
    { number: 500, suffix: "+", label: "Happy Clients" },
    { number: 50000, suffix: "+", label: "Tasks Completed" },
    { number: 99, suffix: "%", label: "Client Satisfaction" },
    { number: 24, suffix: "/7", label: "Support Available" }
  ];

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/services/virtual-assistant.jpg"
            alt="Virtual Assistant Background"
            fill
            className="object-cover"
            quality={90}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70" />
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 z-10">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-[var(--primary)] rounded-full opacity-30"
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        {/* Hero Content */}
        <div className="relative z-20 max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-2 bg-[var(--primary)]/10 px-4 py-2 rounded-full border border-[var(--primary)]/20 mb-6">
              <Headphones className="w-5 h-5 text-[var(--primary)]" />
              <span className="text-[var(--primary)] font-medium">Virtual Assistance Services</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Your Dedicated
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-blue-400">
                Virtual Assistant
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
              Streamline your business operations with our professional virtual assistance services. 
              Focus on what matters most while we handle the rest.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[var(--primary)] text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-[var(--primary)]/90 transition-all shadow-lg hover:shadow-xl"
              >
                Get Started Today
              </motion.button>
            </Link>
            <Link href="#services">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-white/30 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/10 transition-all backdrop-blur-sm"
              >
                Explore Services
              </motion.button>
            </Link>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/60 rounded-full mt-2"></div>
          </div>
        </motion.div>
      </motion.section>

      {/* Stats Section */}
      <section className="py-20 bg-[var(--card-bg)] border-y border-[var(--secondary)]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-[var(--primary)] mb-2">
                  <AnimatedCounter end={stat.number} suffix={stat.suffix} />
                </div>
                <p className="text-[var(--foreground)]/70 font-medium">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section id="services" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollRevealText className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Comprehensive Virtual Support
            </h2>
            <p className="text-xl text-[var(--foreground)]/70 max-w-3xl mx-auto">
              From administrative tasks to customer support, our virtual assistants provide 
              end-to-end business support tailored to your specific needs.
            </p>
          </ScrollRevealText>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ScrollRevealText key={index}>
                <motion.div
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="bg-[var(--card-bg)] p-8 rounded-2xl shadow-sm border border-[var(--secondary)] hover:shadow-xl transition-all duration-300"
                >
                  <div className="bg-[var(--primary)]/10 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                    <div className="text-[var(--primary)]">
                      {service.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{service.title}</h3>
                  <p className="text-[var(--foreground)]/70 leading-relaxed">
                    {service.description}
                  </p>
                </motion.div>
              </ScrollRevealText>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-[var(--card-bg)]">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollRevealText className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Why Choose Our Virtual Assistants?
            </h2>
            <p className="text-xl text-[var(--foreground)]/70 max-w-3xl mx-auto">
              Experience the difference with our professional virtual assistance services
            </p>
          </ScrollRevealText>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <ScrollRevealText key={index}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="text-center p-6 rounded-2xl hover:bg-[var(--background)] transition-all duration-300"
                >
                  <div className="bg-gradient-to-br from-[var(--primary)] to-blue-400 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 text-white">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                  <p className="text-[var(--foreground)]/70">
                    {feature.description}
                  </p>
                </motion.div>
              </ScrollRevealText>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollRevealText className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              How It Works
            </h2>
            <p className="text-xl text-[var(--foreground)]/70 max-w-3xl mx-auto">
              Get started with our virtual assistance services in just a few simple steps
            </p>
          </ScrollRevealText>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connection Lines */}
            <div className="hidden md:block absolute top-1/2 left-1/3 w-1/3 h-0.5 bg-gradient-to-r from-[var(--primary)] to-transparent transform -translate-y-1/2"></div>
            <div className="hidden md:block absolute top-1/2 right-1/3 w-1/3 h-0.5 bg-gradient-to-l from-[var(--primary)] to-transparent transform -translate-y-1/2"></div>

            {[
              {
                step: "01",
                title: "Consultation",
                description: "We discuss your needs and requirements to understand your business goals."
              },
              {
                step: "02",
                title: "Assignment",
                description: "We match you with the perfect virtual assistant based on your specific needs."
              },
              {
                step: "03",
                title: "Implementation",
                description: "Your virtual assistant begins working seamlessly with your team and processes."
              }
            ].map((step, index) => (
              <ScrollRevealText key={index}>
                <motion.div
                  whileHover={{ y: -10 }}
                  className="text-center p-8 bg-[var(--card-bg)] rounded-2xl shadow-sm border border-[var(--secondary)] relative z-10"
                >
                  <div className="text-6xl font-bold text-[var(--primary)]/20 mb-4">
                    {step.step}
                  </div>
                  <h3 className="text-2xl font-semibold mb-4">{step.title}</h3>
                  <p className="text-[var(--foreground)]/70 leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>
              </ScrollRevealText>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-[var(--card-bg)]">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollRevealText className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              What Our Clients Say
            </h2>
            <p className="text-xl text-[var(--foreground)]/70 max-w-3xl mx-auto">
              Don't just take our word for it - hear from businesses that have transformed their operations
            </p>
          </ScrollRevealText>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <ScrollRevealText key={index}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-[var(--background)] p-8 rounded-2xl shadow-sm border border-[var(--secondary)]"
                >
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <blockquote className="text-[var(--foreground)]/80 mb-6 italic leading-relaxed">
                    "{testimonial.text}"
                  </blockquote>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-[var(--primary)]/10 rounded-full flex items-center justify-center mr-4">
                      <Users className="w-6 h-6 text-[var(--primary)]" />
                    </div>
                    <div>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-[var(--foreground)]/60 text-sm">{testimonial.company}</div>
                    </div>
                  </div>
                </motion.div>
              </ScrollRevealText>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <ScrollRevealText>
            <motion.div
              className="bg-gradient-to-r from-[var(--primary)] to-blue-400 p-12 rounded-3xl text-white"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Ready to Scale Your Business?
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Let our virtual assistants handle the routine tasks while you focus on growing your business.
                Get started today with a free consultation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white text-[var(--primary)] px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all shadow-lg"
                  >
                    Start Free Consultation
                  </motion.button>
                </Link>
                <Link href="/services">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="border-2 border-white/30 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/10 transition-all"
                  >
                    View All Services
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          </ScrollRevealText>
        </div>
      </section>
    </div>
  );
}