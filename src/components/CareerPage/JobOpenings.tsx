'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, MapPin, Briefcase, Clock } from 'lucide-react';

const jobCategories = ['All', 'Technology', 'Business', 'Design', 'Marketing'];

const jobOpenings = [
  {
    id: 1,
    title: 'Frontend Developer',
    type: 'Full-time',
    location: 'Remote',
    department: 'Technology',
    description: 'Build responsive web applications using React, Next.js, and Tailwind CSS.'
  },
  {
    id: 2,
    title: 'Business Analyst',
    type: 'Full-time',
    location: 'Rawalpindi',
    department: 'Business',
    description: 'Analyze business processes and recommend improvements.'
  },
  {
    id: 3,
    title: 'UI/UX Designer',
    type: 'Contract',
    location: 'Hybrid',
    department: 'Design',
    description: 'Create beautiful and intuitive user interfaces.'
  },
  {
    id: 4,
    title: 'Backend Engineer',
    type: 'Full-time',
    location: 'Remote',
    department: 'Technology',
    description: 'Develop scalable backend services with Node.js and Python.'
  },
  {
    id: 5,
    title: 'Digital Marketer',
    type: 'Part-time',
    location: 'Rawalpindi',
    department: 'Marketing',
    description: 'Manage social media and digital advertising campaigns.'
  },
  {
    id: 6,
    title: 'DevOps Engineer',
    type: 'Full-time',
    location: 'Remote',
    department: 'Technology',
    description: 'Implement CI/CD pipelines and cloud infrastructure.'
  }
];

export default function JobOpenings() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [expandedJob, setExpandedJob] = useState<number | null>(null);

  const filteredJobs = activeCategory === 'All' 
    ? jobOpenings 
    : jobOpenings.filter(job => job.department === activeCategory);

  return (
    <section id="openings" className="py-20 bg-[var(--background)] text-[var(--foreground)]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Current Openings</h2>
          <p className="text-lg md:text-xl opacity-80">Find the perfect role for your skills and ambitions</p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {jobCategories.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full font-medium transition-all ${activeCategory === category ? 'bg-[var(--primary)] text-white' : 'bg-[var(--secondary)] hover:bg-[var(--secondary)]/80'}`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {filteredJobs.map(job => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-[var(--card-bg)] border border-[var(--secondary)] rounded-xl overflow-hidden shadow-sm"
            >
              <div 
                className="p-6 cursor-pointer flex justify-between items-center"
                onClick={() => setExpandedJob(expandedJob === job.id ? null : job.id)}
              >
                <div>
                  <h3 className="text-xl font-semibold">{job.title}</h3>
                  <div className="flex flex-wrap gap-4 mt-2">
                    <span className="flex items-center text-sm opacity-80">
                      <Briefcase className="w-4 h-4 mr-1" /> {job.type}
                    </span>
                    <span className="flex items-center text-sm opacity-80">
                      <MapPin className="w-4 h-4 mr-1" /> {job.location}
                    </span>
                    <span className="flex items-center text-sm opacity-80">
                      <Clock className="w-4 h-4 mr-1" /> {job.department}
                    </span>
                  </div>
                </div>
                <ChevronDown className={`transition-transform ${expandedJob === job.id ? 'rotate-180' : ''}`} />
              </div>

              {expandedJob === job.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="px-6 pb-6"
                >
                  <p className="mb-6">{job.description}</p>
                  <button className="bg-[var(--primary)] text-white px-6 py-2 rounded-full font-medium hover:opacity-90 transition">
                    Apply Now
                  </button>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}