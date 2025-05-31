'use client';

import { Edit, Plus, Trash, ToggleLeft, ToggleRight } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Job } from '@/types/job';

export default function JobsManagement() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<'all' | 'live' | 'draft'>('all');

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('/api/jobs');
        if (!response.ok) throw new Error('Failed to fetch jobs');
        const data = await response.json();
        setJobs(data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
        setError('Failed to load jobs');
      } finally {
        setIsLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this job?')) return;
    try {
      const response = await fetch(`/api/jobs/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete job');
      setJobs(jobs.filter(job => job._id !== id));
    } catch (error) {
      console.error('Error deleting job:', error);
      setError(error instanceof Error ? error.message : 'Failed to delete job');
    }
  };

  const handleToggleStatus = async (id: string, currentStatus: boolean) => {
    try {
      const response = await fetch(`/api/jobs/${id}/toggle`, { method: 'PATCH' });
      if (!response.ok) throw new Error('Failed to toggle status');
      setJobs(jobs.map(job => 
        job._id === id ? { ...job, isLive: !currentStatus } : job
      ));
    } catch (error) {
      console.error('Error toggling job status:', error);
    }
  };

  const filteredJobs = jobs.filter(job => 
    statusFilter === 'all' || 
    (statusFilter === 'live' ? job.isLive : !job.isLive)
  );

  if (isLoading) return <div className="flex justify-center items-center h-64">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--primary)]"></div>
  </div>;

  if (error) return <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">{error}</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Manage Job Postings</h1>
        <Link href="/admin/jobs/new" className="bg-[var(--primary)] text-white px-4 py-2 rounded-lg flex items-center hover:bg-[var(--primary)]/90 transition">
          <Plus className="w-5 h-5 mr-2" /> Add New Job
        </Link>
      </div>

      <div className="mb-4 flex space-x-2">
        <button 
          onClick={() => setStatusFilter('all')}
          className={`px-3 py-1 rounded transition ${
            statusFilter === 'all' 
              ? 'bg-[var(--primary)] text-white' 
              : 'bg-[var(--secondary)]/20 text-[var(--foreground)] hover:bg-[var(--secondary)]/30'
          }`}
        >
          All
        </button>
        <button 
          onClick={() => setStatusFilter('live')}
          className={`px-3 py-1 rounded transition ${
            statusFilter === 'live' 
              ? 'bg-green-600 text-white' 
              : 'bg-[var(--secondary)]/20 text-[var(--foreground)] hover:bg-[var(--secondary)]/30'
          }`}
        >
          Live
        </button>
        <button 
          onClick={() => setStatusFilter('draft')}
          className={`px-3 py-1 rounded transition ${
            statusFilter === 'draft' 
              ? 'bg-gray-600 text-white' 
              : 'bg-[var(--secondary)]/20 text-[var(--foreground)] hover:bg-[var(--secondary)]/30'
          }`}
        >
          Draft
        </button>
      </div>

      <div className="bg-[var(--card-bg)] rounded-xl shadow-sm border border-[var(--secondary)]/20 overflow-hidden">
        {filteredJobs.length === 0 ? (
          <div className="p-8 text-center text-[var(--foreground)]/70">
            No jobs found matching your criteria
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-[var(--secondary)]/20">
              <thead className="bg-[var(--secondary)]/10">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[var(--foreground)]/70 uppercase tracking-wider">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[var(--foreground)]/70 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[var(--foreground)]/70 uppercase tracking-wider">Location</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[var(--foreground)]/70 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-[var(--foreground)]/70 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--secondary)]/20">
                {filteredJobs.map((job) => (
                  <tr key={String(job._id)} className="hover:bg-[var(--secondary)]/10 transition">
                    <td className="px-6 py-4 whitespace-nowrap font-medium">{job.title}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{job.type}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{job.location}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button 
                        onClick={() => handleToggleStatus(String(job._id), job.isLive)}
                        className={`flex items-center gap-1 px-2 py-1 rounded-md text-sm transition ${
                          job.isLive 
                            ? 'bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200' 
                            : 'bg-gray-100 dark:bg-gray-800/50 text-gray-800 dark:text-gray-200'
                        }`}
                      >
                        {job.isLive ? (
                          <ToggleRight className="w-4 h-4" />
                        ) : (
                          <ToggleLeft className="w-4 h-4" />
                        )}
                        {job.isLive ? 'Live' : 'Draft'}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex justify-end space-x-2">
                        <Link 
                          href={`/admin/jobs/edit/${job._id}`} 
                          className="text-[var(--primary)] hover:text-[var(--primary)]/80 p-1 rounded transition"
                        >
                          <Edit className="w-5 h-5" />
                        </Link>
                        <button 
                          onClick={() => handleDelete(String(job._id))} 
                          className="text-red-500 hover:text-red-700 dark:hover:text-red-400 p-1 rounded transition"
                        >
                          <Trash className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}