'use client';

import Image from 'next/image';
import { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Linkedin, ChevronLeft, ChevronRight } from 'lucide-react';

interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio?: string;
  social?: string;
}

const teamMembers: TeamMember[] = [
  {
    name: 'Sheikh Nabeel',
    role: 'Founder & CEO',
    image: '/assets/team1/Sheikh Nabeel (CEO & Founder).png',
    bio: 'Visionary leader with 15+ years in tech entrepreneurship',
    social: 'https://linkedin.com'
  },
  {
    name: 'Muhammad Awais',
    role: 'Co-Founder & CTO',
    image: '/assets/team1/Muhammad Awais (Co-Founder).png',
    bio: 'Technology architect specializing in scalable systems',
    social: 'https://linkedin.com'
  },
  {
    name: 'Saira Ali',
    role: 'Managing Director',
    image: '/assets/team1/Saira Ali (Managing Director).png',
    bio: 'Operations expert driving business growth',
    social: 'https://linkedin.com'
  },
  {
    name: 'Humayoun Mussawar',
    role: 'Marketing Head',
    image: '/assets/team1/Humayoun Mussawar (Marketing Head).png',
    bio: 'Digital marketing strategist and brand builder',
    social: 'https://linkedin.com'
  },
  {
    name: 'Hamza Badar',
    role: 'Team Lead',
    image: '/assets/team1/Hamza Badar (Team Lead).png',
    bio: 'Engineering manager focused on team excellence',
    social: 'https://linkedin.com'
  },
];

export default function Team() {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const openModal = (member: TeamMember) => {
    setSelectedMember(member);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  useEffect(() => {
    const slider = containerRef.current;
    if (!slider) return;

    let isDown = false;
    let startX: number;
    let scrollLeft: number;
    let velocity = 0;
    let animationFrame: number;

    const onMouseDown = (e: MouseEvent) => {
      isDown = true;
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
      slider.style.cursor = 'grabbing';
      slider.style.scrollBehavior = 'auto';
      cancelAnimationFrame(animationFrame);
    };

    const onMouseLeave = () => {
      isDown = false;
      slider.style.cursor = 'grab';
    };

    const onMouseUp = () => {
      isDown = false;
      slider.style.cursor = 'grab';
      beginMomentumTracking();
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 2;
      slider.scrollLeft = scrollLeft - walk;
    };

    const beginMomentumTracking = () => {
      cancelAnimationFrame(animationFrame);
      momentumLoop();
    };

    const momentumLoop = () => {
      if (!isDown) {
        velocity *= 0.95;
        slider.scrollLeft += velocity;
        
        if (Math.abs(velocity) > 0.5) {
          animationFrame = requestAnimationFrame(momentumLoop);
        }
      }
    };

    slider.addEventListener('mousedown', onMouseDown);
    slider.addEventListener('mouseleave', onMouseLeave);
    slider.addEventListener('mouseup', onMouseUp);
    slider.addEventListener('mousemove', onMouseMove);

    return () => {
      slider.removeEventListener('mousedown', onMouseDown);
      slider.removeEventListener('mouseleave', onMouseLeave);
      slider.removeEventListener('mouseup', onMouseUp);
      slider.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "0px 0px -100px 0px" }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Meet Our <span className="text-[var(--primary)]">Leadership</span>
          </h2>
          <p className="text-lg md:text-xl opacity-80 max-w-2xl mx-auto">
            A team of passionate innovators driving digital transformation
          </p>
        </motion.div>

        <div className="relative">
          <div
            ref={containerRef}
            className="flex overflow-x-auto scroll-smooth space-x-8 pb-8 -mx-4 px-4 no-scrollbar"
          >
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: "0px 0px -100px 0px" }}
                className="flex-shrink-0 w-72"
              >
                <div 
                  className="bg-[var(--card-bg)] rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group"
                  onClick={() => openModal(member)}
                >
                  <div className="relative h-80 overflow-hidden">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                      <div>
                        <h3 className="text-white text-xl font-bold">{member.name}</h3>
                        <p className="text-[var(--primary)]">{member.role}</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold">{member.name}</h3>
                    <p className="text-sm text-[var(--foreground)]/70">{member.role}</p>
                    <div className="mt-4 flex justify-between items-center">
                      <button className="text-xs font-medium text-[var(--primary)] hover:underline">
                        View Profile
                      </button>
                      <a 
                        href={member.social} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-[var(--foreground)] hover:text-[var(--primary)] transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Linkedin className="w-5 h-5" />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <button 
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-[var(--card-bg)] p-3 rounded-full shadow-md hover:bg-[var(--primary)] hover:text-white transition-all z-10 hidden md:block"
            onClick={() => {
              if (containerRef.current) {
                containerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
              }
            }}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button 
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-[var(--card-bg)] p-3 rounded-full shadow-md hover:bg-[var(--primary)] hover:text-white transition-all z-10 hidden md:block"
            onClick={() => {
              if (containerRef.current) {
                containerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
              }
            }}
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isModalOpen && selectedMember && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              transition={{ type: 'spring', damping: 25 }}
              className="bg-[var(--card-bg)] rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="grid md:grid-cols-2 gap-8">
                <div className="relative h-96 md:h-full">
                  <Image
                    src={selectedMember.image}
                    alt={selectedMember.name}
                    fill
                    className="object-cover object-top rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none"
                  />
                </div>
                <div className="p-8">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-2xl font-bold">{selectedMember.name}</h3>
                      <p className="text-[var(--primary)] font-medium">{selectedMember.role}</p>
                    </div>
                    <button 
                      onClick={closeModal}
                      className="text-[var(--foreground)]/50 hover:text-[var(--foreground)] transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    </button>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold uppercase tracking-wider text-[var(--foreground)]/50 mb-2">About</h4>
                    <p className="text-[var(--foreground)]/80">{selectedMember.bio}</p>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <a 
                      href={selectedMember.social} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center p-2 bg-[var(--primary)]/10 text-[var(--primary)] rounded-full hover:bg-[var(--primary)]/20 transition-colors"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                    <span className="text-sm text-[var(--foreground)]/50">Connect on LinkedIn</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}