'use client';

import { Job } from '@/types/job';
import { Edit, Plus, ToggleLeft, ToggleRight, Trash } from 'lucide-react';
import Link from 'next/link';
import { useCallback, useEffect, useMemo, useState } from 'react';

export default function JobsManagement() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<'all' | 'live' | 'draft'>('all');

  // Fetch jobs on mount
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch('/api/jobs');
        if (!res.ok) throw new Error('Failed to fetch jobs');
        const data = await res.json();
        setJobs(data);
      } catch (err) {
        console.error(err);
        setError('Failed to load jobs');
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // Delete job
  const handleDelete = useCallback(async (id: string) => {
    if (!confirm('Are you sure you want to delete this job?')) return;

    try {
      const res = await fetch(`/api/jobs/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete job');
      setJobs((prev) => prev.filter((job) => job._id !== id));
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'Failed to delete job');
    }
  }, []);

  // Toggle status
  const handleToggleStatus = useCallback(async (id: string, currentStatus: boolean) => {
    try {
      const res = await fetch(`/api/jobs/${id}/toggle`, { method: 'PATCH' });
      if (!res.ok) throw new Error('Failed to toggle status');
      setJobs((prev) =>
        prev.map((job) =>
          job._id === id ? { ...job, isLive: !currentStatus } : job
        )
      );
    } catch (err) {
      console.error(err);
    }
  }, []);

  const filteredJobs = useMemo(
    () =>
      jobs.filter((job) =>
        statusFilter === 'all'
          ? true
          : statusFilter === 'live'
          ? job.isLive
          : !job.isLive
      ),
    [jobs, statusFilter]
  );

  const StatusToggleButton = ({ job }: { job: Job }) => (
    <button
      onClick={() => handleToggleStatus(String(job._id), job.isLive)}
      className={`flex items-center gap-1 px-2 py-1 rounded-md text-sm transition ${
        job.isLive
          ? 'bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200'
          : 'bg-gray-100 dark:bg-gray-800/50 text-gray-800 dark:text-gray-200'
      }`}
    >
      {job.isLive ? <ToggleRight className="w-4 h-4" /> : <ToggleLeft className="w-4 h-4" />}
      {job.isLive ? 'Live' : 'Draft'}
    </button>
  );

  const renderFilterButton = (label: string, value: 'all' | 'live' | 'draft', activeColor = '') => {
    const isActive = statusFilter === value;
    const baseClasses = 'px-3 py-1 rounded transition';
    const activeClasses = isActive
      ? `${activeColor} text-white`
      : 'bg-[var(--secondary)]/20 text-[var(--foreground)] hover:bg-[var(--secondary)]/30';

    return (
      <button
        key={value}
        onClick={() => setStatusFilter(value)}
        className={`${baseClasses} ${activeClasses}`}
      >
        {label}
      </button>
    );
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--primary)]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
        {error}
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Manage Job Postings</h1>
        <Link
          href="/admin/jobs/new"
          className="bg-[var(--primary)] text-white px-4 py-2 rounded-lg flex items-center hover:bg-[var(--primary)]/90 transition"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add New Job
        </Link>
      </div>

      <div className="mb-4 flex space-x-2">
        {renderFilterButton('All', 'all', 'bg-[var(--primary)]')}
        {renderFilterButton('Live', 'live', 'bg-green-600')}
        {renderFilterButton('Draft', 'draft', 'bg-gray-600')}
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
                  {['Title', 'Type', 'Location', 'Status', 'Actions'].map((head) => (
                    <th
                      key={head}
                      className={`${
                        head === 'Actions' ? 'text-right' : 'text-left'
                      } px-6 py-3 text-xs font-medium text-[var(--foreground)]/70 uppercase tracking-wider`}
                    >
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--secondary)]/20">
                {filteredJobs.map((job) => (
                  <tr
                    key={String(job._id)}
                    className="hover:bg-[var(--secondary)]/10 transition"
                  >
                    <td className="px-6 py-4 whitespace-nowrap font-medium">{job.title}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{job.type}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{job.location}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusToggleButton job={job} />
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
