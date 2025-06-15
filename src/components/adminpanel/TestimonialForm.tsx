'use client';

import { TestimonialFormData } from '@/types/testimonial';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const ratingOptions = [1, 2, 3, 4, 5];

export default function TestimonialsForm({ testimonialId }: { testimonialId?: string }) {
  const router = useRouter();
  const [isEditing] = useState(!!testimonialId);
  const [isLoading, setIsLoading] = useState(testimonialId ? true : false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<TestimonialFormData>({
    name: '',
    role: '',
    content: '',
    rating: 5,
    isFeatured: false
  });

  useEffect(() => {
    if (testimonialId) {
      const fetchTestimonial = async () => {
        try {
          const response = await fetch(`/api/testimonials/${testimonialId}`);
          if (!response.ok) throw new Error('Failed to fetch testimonial');
          const testimonial = await response.json();
          setFormData({
            name: testimonial.name,
            role: testimonial.role,
            content: testimonial.content,
            rating: testimonial.rating,
            isFeatured: testimonial.isFeatured
          });
        } catch (error) {
          console.error('Error fetching testimonial:', error);
          setError('Failed to load testimonial data');
        } finally {
          setIsLoading(false);
        }
      };
      fetchTestimonial();
    }
  }, [testimonialId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRatingChange = (rating: number) => {
    setFormData(prev => ({ ...prev, rating }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    
    try {
      const url = isEditing ? `/api/testimonials/${testimonialId}` : '/api/testimonials';
      const method = isEditing ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to save testimonial');
      }
      
      router.push('/admin/testimonials');
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
          {isEditing ? 'Edit Testimonial' : 'Create New Testimonial'}
        </h1>
        <p className="text-[var(--foreground)]/70">
          {isEditing ? 'Update the testimonial details below' : 'Fill in the details to create a new testimonial'}
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-[var(--foreground)] mb-1">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-[var(--background)] border border-[var(--secondary)] rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
              placeholder="Client name"
            />
          </div>

          <div>
            <label htmlFor="role" className="block text-sm font-medium text-[var(--foreground)] mb-1">
              Role & Company
            </label>
            <input
              id="role"
              name="role"
              type="text"
              required
              value={formData.role}
              onChange={handleChange}
              className="w-full bg-[var(--background)] border border-[var(--secondary)] rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
              placeholder="e.g. CEO, Company Name"
            />
          </div>
        </div>

        <div>
          <label htmlFor="content" className="block text-sm font-medium text-[var(--foreground)] mb-1">
            Testimonial Content
          </label>
          <textarea
            id="content"
            name="content"
            rows={6}
            required
            value={formData.content}
            onChange={handleChange}
            className="w-full bg-[var(--background)] border border-[var(--secondary)] rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
            placeholder="What did the client say about your work?"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[var(--foreground)] mb-2">
            Rating
          </label>
          <div className="flex space-x-2">
            {ratingOptions.map((rating) => (
              <button
                key={rating}
                type="button"
                onClick={() => handleRatingChange(rating)}
                className={`p-2 rounded-full ${formData.rating >= rating ? 'text-yellow-400' : 'text-gray-300'}`}
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="isFeatured"
            name="isFeatured"
            checked={formData.isFeatured}
            onChange={(e) => setFormData({...formData, isFeatured: e.target.checked})}
            className="h-4 w-4 text-[var(--primary)] focus:ring-[var(--primary)] rounded"
          />
          <label htmlFor="isFeatured" className="ml-2 block text-sm text-[var(--foreground)]">
            Feature this testimonial
          </label>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => router.push('/admin/testimonials')}
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
              isEditing ? 'Save Changes' : 'Create Testimonial'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}