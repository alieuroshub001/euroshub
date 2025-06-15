'use client';

import { Testimonial } from '@/types/testimonial';
import { Edit, Plus, Star, Trash } from 'lucide-react';
import Link from 'next/link';
import { useCallback, useEffect, useMemo, useState } from 'react';

interface TestimonialsManagementProps {
  initialTestimonials: Testimonial[];
}

export default function TestimonialsManagement({ 
  initialTestimonials 
}: TestimonialsManagementProps) {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials);
  const [filter, setFilter] = useState<'all' | 'featured'>('all');

  // Refresh testimonials when initialTestimonials changes
  useEffect(() => {
    setTestimonials(initialTestimonials);
  }, [initialTestimonials]);

  const handleDelete = useCallback(async (id: string) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) return;

    try {
      const res = await fetch(`/api/testimonials/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete testimonial');
      setTestimonials((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      console.error(err);
      alert(err instanceof Error ? err.message : 'Failed to delete testimonial');
    }
  }, []);

  const handleToggleFeatured = useCallback(async (id: string, currentStatus: boolean | undefined) => {
    try {
      const res = await fetch(`/api/testimonials/${id}`, { 
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isFeatured: !(currentStatus ?? false) })
      });
      if (!res.ok) throw new Error('Failed to toggle featured status');
      setTestimonials((prev) =>
        prev.map((t) =>
          t._id === id ? { ...t, isFeatured: !(currentStatus ?? false) } : t
        )
      );
    } catch (err) {
      console.error(err);
    }
  }, []);

  const filteredTestimonials = useMemo(
    () => testimonials.filter(t => filter === 'all' ? true : t.isFeatured),
    [testimonials, filter]
  );

  const renderFilterButton = (label: string, value: 'all' | 'featured') => {
    const isActive = filter === value;
    return (
      <button
        onClick={() => setFilter(value)}
        className={`px-3 py-1 rounded transition ${
          isActive
            ? 'bg-[var(--primary)] text-white'
            : 'bg-[var(--secondary)]/20 text-[var(--foreground)] hover:bg-[var(--secondary)]/30'
        }`}
      >
        {label}
      </button>
    );
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Manage Testimonials</h1>
        <Link
          href="/admin/testimonials/new"
          className="bg-[var(--primary)] text-white px-4 py-2 rounded-lg flex items-center hover:bg-[var(--primary)]/90 transition"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add New Testimonial
        </Link>
      </div>

      <div className="mb-4 flex space-x-2">
        {renderFilterButton('All', 'all')}
        {renderFilterButton('Featured', 'featured')}
      </div>

      <div className="bg-[var(--card-bg)] rounded-xl shadow-sm border border-[var(--secondary)]/20 overflow-hidden">
        {filteredTestimonials.length === 0 ? (
          <div className="p-8 text-center text-[var(--foreground)]/70">
            No testimonials found matching your criteria
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-[var(--secondary)]/20">
              <thead className="bg-[var(--secondary)]/10">
                <tr>
                  {['Name', 'Role', 'Rating', 'Featured', 'Actions'].map((head) => (
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
                {filteredTestimonials.map((testimonial) => (
                  <tr
                    key={String(testimonial._id)}
                    className="hover:bg-[var(--secondary)]/10 transition"
                  >
                    <td className="px-6 py-4 whitespace-nowrap font-medium">{testimonial.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{testimonial.role}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                          />
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleToggleFeatured(String(testimonial._id), testimonial.isFeatured)}
                        className={`flex items-center gap-1 px-2 py-1 rounded-md text-sm transition ${
                          testimonial.isFeatured
                            ? 'bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-200'
                            : 'bg-gray-100 dark:bg-gray-800/50 text-gray-800 dark:text-gray-200'
                        }`}
                      >
                        {testimonial.isFeatured ? 'Featured' : 'Regular'}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex justify-end space-x-2">
                        <Link
                          href={`/admin/testimonials/edit/${testimonial._id}`}
                          className="text-[var(--primary)] hover:text-[var(--primary)]/80 p-1 rounded transition"
                        >
                          <Edit className="w-5 h-5" />
                        </Link>
                        <button
                          onClick={() => handleDelete(String(testimonial._id))}
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