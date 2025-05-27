'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, MapPin, Briefcase, Clock } from 'lucide-react';
import { Job } from '@/types/job';

const jobCategories = ['All', 'Technology', 'Business', 'Design', 'Marketing'];

export default function JobOpenings() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [expandedJob, setExpandedJob] = useState<string | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('/api/jobs');
        if (!response.ok) throw new Error('Failed to fetch jobs');
        const data = await response.json();
        setJobs(data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
        setError(error instanceof Error ? error.message : 'Failed to load jobs');
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const filteredJobs = activeCategory === 'All' 
    ? jobs.filter(job => job.isLive) // Only show live jobs
    : jobs.filter(job => job.department === activeCategory && job.isLive);

  if (isLoading) {
    return (
      <section id="openings" className="py-20 bg-[var(--background)] text-[var(--foreground)]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--primary)]"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="openings" className="py-20 bg-[var(--background)] text-[var(--foreground)]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded text-center">
            {error}
          </div>
        </div>
      </section>
    );
  }

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
          {filteredJobs.length > 0 ? (
            filteredJobs.map(job => (
              <motion.div
                key={String(job._id)}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-[var(--card-bg)] border border-[var(--secondary)] rounded-xl overflow-hidden shadow-sm"
              >
                <div 
                  className="p-6 cursor-pointer flex justify-between items-center"
                  onClick={() => setExpandedJob(expandedJob === String(job._id) ? null : String(job._id))}
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
                  <ChevronDown className={`transition-transform ${expandedJob === job._id ? 'rotate-180' : ''}`} />
                </div>

                {expandedJob === job._id && (
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
            ))
          ) : (
            <div className="text-center py-12 text-[var(--foreground)]/70">
              No current openings in this category
            </div>
          )}
        </div>
      </div>
    </section>
  );
}