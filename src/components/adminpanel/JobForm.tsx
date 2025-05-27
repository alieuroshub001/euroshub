'use client';

import { Briefcase, Clock, MapPin } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { JobFormData } from '@/types/job';

const jobTypes = ['Full-time', 'Part-time', 'Contract', 'Internship'];
const departments = ['Technology', 'Business', 'Design', 'Marketing'];
const locations = ['Remote', 'Rawalpindi', 'Hybrid'];

export default function JobForm({ jobId }: { jobId?: string }) {
  const router = useRouter();
  const [isEditing] = useState(!!jobId);
  const [isLoading, setIsLoading] = useState(jobId ? true : false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<JobFormData>({
    title: '',
    type: '',
    location: '',
    department: '',
    description: '',
    isLive: true // Default to live when creating
  });

  useEffect(() => {
    if (jobId) {
      const fetchJob = async () => {
        try {
          const response = await fetch(`/api/jobs/${jobId}`);
          if (!response.ok) throw new Error('Failed to fetch job');
          const job = await response.json();
          setFormData({
            title: job.title,
            type: job.type,
            location: job.location,
            department: job.department,
            description: job.description,
            isLive: job.isLive // Preserve existing status
          });
        } catch (error) {
          console.error('Error fetching job:', error);
          setError('Failed to load job data');
        } finally {
          setIsLoading(false);
        }
      };
      fetchJob();
    }
  }, [jobId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    
    try {
      const url = isEditing ? `/api/jobs/${jobId}` : '/api/jobs';
      const method = isEditing ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to save job');
      }
      
      router.push('/admin/jobs');
      router.refresh();
    } catch (error) {
      console.error('Error submitting form:', error);
      setError(error instanceof Error ? error.message : 'An unknown error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--primary)]"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold">
          {isEditing ? 'Edit Job Posting' : 'Create New Job Posting'}
        </h1>
        <p className="text-[var(--foreground)]/70">
          {isEditing ? 'Update the job details below' : 'Fill in the details to create a new job posting'}
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-[var(--foreground)] mb-1">
            Job Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            required
            value={formData.title}
            onChange={handleChange}
            className="w-full bg-[var(--background)] border border-[var(--secondary)] rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
            placeholder="e.g. Frontend Developer"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="type" className="block text-sm font-medium text-[var(--foreground)] mb-1">
              Job Type
            </label>
            <div className="relative">
              <select
                id="type"
                name="type"
                required
                value={formData.type}
                onChange={handleChange}
                className="w-full bg-[var(--background)] border border-[var(--secondary)] rounded-lg py-2 px-3 appearance-none focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
              >
                <option value="">Select type</option>
                {jobTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <Clock className="h-5 w-5 text-[var(--foreground)]/50" />
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="location" className="block text-sm font-medium text-[var(--foreground)] mb-1">
              Location
            </label>
            <div className="relative">
              <select
                id="location"
                name="location"
                required
                value={formData.location}
                onChange={handleChange}
                className="w-full bg-[var(--background)] border border-[var(--secondary)] rounded-lg py-2 px-3 appearance-none focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
              >
                <option value="">Select location</option>
                {locations.map((location) => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <MapPin className="h-5 w-5 text-[var(--foreground)]/50" />
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="department" className="block text-sm font-medium text-[var(--foreground)] mb-1">
              Department
            </label>
            <div className="relative">
              <select
                id="department"
                name="department"
                required
                value={formData.department}
                onChange={handleChange}
                className="w-full bg-[var(--background)] border border-[var(--secondary)] rounded-lg py-2 px-3 appearance-none focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
              >
                <option value="">Select department</option>
                {departments.map((department) => (
                  <option key={department} value={department}>{department}</option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <Briefcase className="h-5 w-5 text-[var(--foreground)]/50" />
              </div>
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-[var(--foreground)] mb-1">
            Job Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={6}
            required
            value={formData.description}
            onChange={handleChange}
            className="w-full bg-[var(--background)] border border-[var(--secondary)] rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
            placeholder="Describe the job responsibilities, requirements, and benefits..."
          />
        </div>

          {isEditing && (
          <div className="flex items-center">
            <label className="block text-sm font-medium text-[var(--foreground)] mr-4">
              Status:
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                id="status-live"
                name="isLive"
                checked={formData.isLive === true}
                onChange={() => setFormData({...formData, isLive: true})}
                className="h-4 w-4 text-[var(--primary)] focus:ring-[var(--primary)]"
              />
              <label htmlFor="status-live" className="text-sm">Live</label>
              
              <input
                type="radio"
                id="status-draft"
                name="isLive"
                checked={formData.isLive === false}
                onChange={() => setFormData({...formData, isLive: false})}
                className="h-4 w-4 text-gray-600 focus:ring-gray-500 ml-4"
              />
              <label htmlFor="status-draft" className="text-sm">Draft</label>
            </div>
          </div>
        )}

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => router.push('/admin/jobs')}
            className="px-4 py-2 border border-[var(--secondary)] rounded-lg font-medium text-[var(--foreground)] hover:bg-[var(--secondary)]/20 transition"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-[var(--primary)] text-white rounded-lg font-medium hover:bg-[var(--primary)]/90 transition disabled:opacity-50"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {isEditing ? 'Saving...' : 'Creating...'}
              </span>
            ) : (
              isEditing ? 'Save Changes' : 'Create Job'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}