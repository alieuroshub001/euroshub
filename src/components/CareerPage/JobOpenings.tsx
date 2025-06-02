'use client';

import { Job } from '@/types/job';
import { AnimatePresence, motion } from 'framer-motion';
import { Briefcase, ChevronDown, Clock, MapPin } from 'lucide-react';
import { JSX, useEffect, useState } from 'react';

const jobCategories = ['All', 'Technology', 'Business', 'Design', 'Marketing'];

export default function JobOpenings() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [expandedJob, setExpandedJob] = useState<string | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/api/jobs');
        if (!res.ok) throw new Error('Failed to fetch jobs');
        const data = await res.json();
        setJobs(data);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Something went wrong';
        setError(message);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const filteredJobs = jobs.filter(
    job => job.isLive && (activeCategory === 'All' || job.department === activeCategory)
  );

  const renderStatusSection = (content: JSX.Element) => (
    <section id="openings" className="py-20 bg-[var(--background)] text-[var(--foreground)]">
      <div className="max-w-7xl mx-auto px-6">
        {content}
      </div>
    </section>
  );

  if (isLoading) {
    return renderStatusSection(
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin h-12 w-12 border-t-2 border-b-2 border-[var(--primary)] rounded-full" />
      </div>
    );
  }

  if (error) {
    return renderStatusSection(
      <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded text-center">
        {error}
      </div>
    );
  }

  return (
    <section id="openings" className="py-20 bg-[var(--background)] text-[var(--foreground)]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Current Openings</h2>
          <p className="text-lg md:text-xl opacity-80">Find the perfect role for your skills and ambitions</p>
        </div>

        {/* Category Buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {jobCategories.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full font-medium transition-all ${
                activeCategory === category
                  ? 'bg-[var(--primary)] text-white'
                  : 'bg-[var(--secondary)] hover:bg-[var(--secondary)]/80'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Job List */}
        <div className="space-y-4">
          {filteredJobs.length > 0 ? (
            filteredJobs.map(job => {
              const isExpanded = expandedJob === String(job._id);
              return (
                <motion.div
                  key={String(job._id)}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-[var(--card-bg)] border border-[var(--secondary)] rounded-xl overflow-hidden shadow-sm"
                >
                  <div
                    className="p-6 cursor-pointer flex justify-between items-center"
                    onClick={() =>
                      setExpandedJob(isExpanded ? null : String(job._id))
                    }
                  >
                    <div>
                      <h3 className="text-xl font-semibold">{job.title}</h3>
                      <div className="flex flex-wrap gap-4 mt-2 text-sm opacity-80">
                        <span className="flex items-center">
                          <Briefcase className="w-4 h-4 mr-1" /> {job.type}
                        </span>
                        <span className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" /> {job.location}
                        </span>
                        <span className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" /> {job.department}
                        </span>
                      </div>
                    </div>
                    <ChevronDown
                      className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                    />
                  </div>

                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="px-6 pb-6"
                      >
                        <p className="mb-6">{job.description}</p>
                        <button className="bg-[var(--primary)] text-white px-6 py-2 rounded-full font-medium hover:opacity-90 transition">
                          Apply Now
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })
          ) : (
            <div className="text-center py-12 text-[var(--foreground)]/70">
              No current openings in this category.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
