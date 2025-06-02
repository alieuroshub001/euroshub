// components/Global/Team.tsx
'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Award, Calendar, Linkedin, Mail, MapPin, Twitter, X } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio?: string;
  longBio?: string;
  social?: {
    linkedin?: string;
    twitter?: string;
    email?: string;
  };
  location?: string;
  experience?: string;
  achievements?: string[];
  skills?: string[];
}

const teamMembers: TeamMember[] = [
  {
    name: 'Sheikh Nabeel',
    role: 'Founder & CEO',
    image: '/assets/team1/Sheikh Nabeel (CEO & Founder).png',
    bio: 'Visionary leader with 15+ years in tech entrepreneurship',
    longBio:
      'Sheikh Nabeel is a visionary entrepreneur with over 15 years of experience in building and scaling technology companies. He has led multiple successful ventures and is passionate about innovation and digital transformation.',
    social: {
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com',
      email: 'nabeel@company.com',
    },
    location: 'San Francisco, CA',
    experience: '15+ Years',
    achievements: ['Forbes 30 Under 30', 'Tech Entrepreneur of the Year', 'Multiple Successful Exits'],
    skills: ['Strategic Leadership', 'Product Vision', 'Venture Capital', 'Team Building'],
  },
  {
    name: 'Muhammad Awais',
    role: 'Co-Founder & CTO',
    image: '/assets/team1/Muhammad Awais (Co-Founder).png',
    bio: 'Technology architect specializing in scalable systems',
    longBio:
      'Muhammad Awais is a seasoned technology leader with expertise in building scalable, high-performance systems. He has architected solutions that serve millions of users worldwide.',
    social: {
      linkedin: 'https://linkedin.com',
      email: 'awais@company.com',
    },
    location: 'London, UK',
    experience: '12+ Years',
    achievements: ['AWS Solutions Architect', 'Google Cloud Expert', 'Open Source Contributor'],
    skills: ['System Architecture', 'Cloud Computing', 'DevOps', 'Machine Learning'],
  },
  {
    name: 'Saira Ali',
    role: 'Managing Director',
    image: '/assets/team1/Saira Ali (Managing Director).png',
    bio: 'Operations expert driving business growth',
    longBio:
      'Saira Ali brings exceptional operational expertise and strategic thinking to drive business growth. She has successfully scaled operations across multiple markets.',
    social: {
      linkedin: 'https://linkedin.com',
      email: 'saira@company.com',
    },
    location: 'Dubai, UAE',
    experience: '10+ Years',
    achievements: ['MBA from Wharton', 'Operations Excellence Award', 'International Expansion Lead'],
    skills: ['Operations Management', 'Strategic Planning', 'International Business', 'Team Leadership'],
  },
  {
    name: 'Hamza Badar',
    role: 'Team Lead',
    image: '/assets/team1/Hamza Badar (Team Lead).png',
    bio: 'Engineering manager focused on team excellence',
    longBio:
      'Hamza Badar is a dedicated engineering leader who focuses on building high-performing teams and delivering exceptional software solutions.',
    social: {
      linkedin: 'https://linkedin.com',
      email: 'hamza@company.com',
    },
    location: 'Toronto, CA',
    experience: '7+ Years',
    achievements: ['Certified Scrum Master', 'Team Excellence Award', 'Mentor of the Year'],
    skills: ['Team Management', 'Agile Development', 'Software Engineering', 'Mentoring'],
  },
];

export default function Team() {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [, setHoveredIndex] = useState<number | null>(null);

  const openModal = (member: TeamMember) => {
    setSelectedMember(member);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMember(null);
    document.body.style.overflow = 'auto';
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 40,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        damping: 20,
        stiffness: 100,
      },
    },
  };

  return (
    <section className="py-24 px-6 sm:px-8 md:px-16 lg:px-32 relative overflow-hidden">
      {/* Background Accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/5 left-1/5 w-48 h-48 sm:w-56 sm:h-56 bg-gradient-to-br from-[var(--primary)]/10 to-purple-500/10 rounded-full blur-3xl opacity-30" />
        <div className="absolute bottom-1/5 right-1/5 w-64 h-64 sm:w-72 sm:h-72 bg-gradient-to-br from-blue-500/10 to-[var(--primary)]/10 rounded-full blur-3xl opacity-30" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-20"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-block px-4 py-2 bg-gradient-to-r from-[var(--primary)]/20 to-purple-500/20 rounded-full text-sm font-medium text-[var(--primary)] mb-4 border border-[var(--primary)]/20"
          >
            Meet Our Team
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight"
          >
            The Minds Behind
            <br />
            <span className="bg-gradient-to-r from-[#17b6b2] to-[#0d8f8c] bg-clip-text text-transparent">
              Innovation
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg sm:text-xl md:text-2xl opacity-70 max-w-3xl mx-auto font-light"
          >
            A diverse group of passionate innovators, dreamers, and builders who are
            reshaping the future of technology
          </motion.p>
        </motion.div>

        {/* Team Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="group cursor-pointer"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => openModal(member)}
            >
              <div
                className="relative rounded-2xl overflow-hidden border border-white/10 transition-all duration-500 hover:border-[var(--primary)]/30"
                style={{ backgroundColor: 'transparent' }}
              >
                {/* Corner Accent */}
                <div className="absolute top-0 right-0 w-12 h-12 overflow-hidden">
                  <div className="absolute -right-6 -top-6 w-12 h-12 rotate-45 bg-gradient-to-r from-[var(--primary)] to-[var(--primary)]/20 opacity-20 group-hover:opacity-40 transition-opacity duration-300" />
                </div>

                {/* Image */}
                <div className="relative h-56 sm:h-64 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30 z-10" />
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute bottom-3 left-3 z-20">
                    <span className="px-3 py-1 bg-[var(--primary)] text-white text-xs font-medium rounded-full">
                      {member.role}
                    </span>
                  </div>
                </div>

                {/* Text */}
                <div className="p-5 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-bold mb-1 group-hover:text-[var(--primary)] transition-colors duration-300">
                    {member.name}
                  </h3>
                  <p className="text-sm mb-3" style={{ color: 'var(--foreground)', opacity: 0.8 }}>
                    {member.bio}
                  </p>

                  {/* Location & Experience */}
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-1" style={{ color: 'var(--foreground)', opacity: 0.6 }}>
                      <MapPin className="w-3 h-3" />
                      <span>{member.location}</span>
                    </div>
                    <div className="flex items-center space-x-1" style={{ color: 'var(--foreground)', opacity: 0.6 }}>
                      <Calendar className="w-3 h-3" />
                      <span>{member.experience}</span>
                    </div>
                  </div>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--primary)]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && selectedMember && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-white/20 shadow-2xl"
              style={{ backgroundColor: 'var(--card-bg)' }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="grid md:grid-cols-5 gap-0">
                {/* Image Section */}
                <div className="md:col-span-2 relative h-64 sm:h-80 md:h-auto">
                  <Image
                    src={selectedMember.image}
                    alt={selectedMember.name}
                    fill
                    className="object-cover object-top rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>

                {/* Content Section */}
                <div className="md:col-span-3 p-6 sm:p-8 md:p-10">
                  {/* Header */}
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-bold mb-1">{selectedMember.name}</h3>
                      <p className="text-[var(--primary)] font-medium text-lg mb-3">{selectedMember.role}</p>
                      <div className="flex flex-wrap items-center space-x-6 text-sm" style={{ color: 'var(--foreground)', opacity: 0.6 }}>
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4" />
                          <span>{selectedMember.location}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4" />
                          <span>{selectedMember.experience}</span>
                        </div>
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={closeModal}
                      className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                      style={{ backgroundColor: 'var(--foreground)', opacity: 0.1 }}
                    >
                      <X className="w-5 h-5" />
                    </motion.button>
                  </div>

                  {/* About */}
                  {selectedMember.longBio && (
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--foreground)', opacity: 0.5 }}>
                        About
                      </h4>
                      <p className="leading-relaxed text-base" style={{ color: 'var(--foreground)', opacity: 0.8 }}>
                        {selectedMember.longBio}
                      </p>
                    </div>
                  )}

                  {/* Expertise */}
                  {selectedMember.skills && (
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--foreground)', opacity: 0.5 }}>
                        Expertise
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedMember.skills.map((skill, idx) => (
                          <motion.span
                            key={idx}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.1 }}
                            className="px-3 py-1 bg-gradient-to-r from-[var(--primary)]/20 to-purple-500/20 text-[var(--primary)] rounded-full text-sm font-medium border border-[var(--primary)]/20"
                          >
                            {skill}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Achievements */}
                  {selectedMember.achievements && (
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--foreground)', opacity: 0.5 }}>
                        Achievements
                      </h4>
                      <div className="space-y-2">
                        {selectedMember.achievements.map((achievement, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="flex items-center space-x-2"
                          >
                            <Award className="w-5 h-5 text-[var(--primary)]" />
                            <span style={{ color: 'var(--foreground)', opacity: 0.8 }}>{achievement}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Social Links */}
                  <div className="flex items-center space-x-4">
                    {selectedMember.social?.linkedin && (
                      <motion.a
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        href={selectedMember.social.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-gradient-to-r from-[var(--primary)] to-purple-500 rounded-full flex items-center justify-center text-white hover:shadow-lg transition-all duration-300"
                      >
                        <Linkedin className="w-5 h-5" />
                      </motion.a>
                    )}
                    {selectedMember.social?.twitter && (
                      <motion.a
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        href={selectedMember.social.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white hover:shadow-lg transition-all duration-300"
                      >
                        <Twitter className="w-5 h-5" />
                      </motion.a>
                    )}
                    {selectedMember.social?.email && (
                      <motion.a
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        href={`mailto:${selectedMember.social.email}`}
                        className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white hover:shadow-lg transition-all duration-300"
                      >
                        <Mail className="w-5 h-5" />
                      </motion.a>
                    )}
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
