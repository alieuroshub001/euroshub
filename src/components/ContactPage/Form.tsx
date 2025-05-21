'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Send, Loader2 } from 'lucide-react';

// Form validation schema
const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  subject: z.string().min(5, { message: 'Subject must be at least 5 characters' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters' })
});

type FormValues = z.infer<typeof formSchema>;

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { 
    register, 
    handleSubmit, 
    reset,
    formState: { errors } 
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: ''
    }
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      const result = await response.json();
      
      if (response.ok) {
        toast.success('Message sent successfully! We will get back to you soon.');
        reset();
      } else {
        toast.error(result.message || 'Something went wrong. Please try again.');
      }
    } catch {
      toast.error('Failed to send message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[var(--card-bg)] border border-[var(--secondary)] rounded-xl p-6 md:p-8">
      <h2 className="text-2xl md:text-3xl font-bold mb-2">Send Us a Message</h2>
      <p className="text-[var(--foreground)] opacity-70 mb-6">
        Fill out the form below and we&apos;ll get back to you as soon as possible.
      </p>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1">
            Your Name <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            type="text"
            {...register('name')}
            className={`w-full px-4 py-3 rounded-lg bg-[var(--secondary)] text-[var(--foreground)] border ${
              errors.name ? 'border-red-500' : 'border-transparent'
            } focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition-colors`}
            placeholder="Ali Rayyan"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>
        
        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            type="email"
            {...register('email')}
            className={`w-full px-4 py-3 rounded-lg bg-[var(--secondary)] text-[var(--foreground)] border ${
              errors.email ? 'border-red-500' : 'border-transparent'
            } focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition-colors`}
            placeholder="ali@gmail.com"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>
        
        {/* Subject Field */}
        <div>
          <label htmlFor="subject" className="block text-sm font-medium mb-1">
            Subject <span className="text-red-500">*</span>
          </label>
          <input
            id="subject"
            type="text"
            {...register('subject')}
            className={`w-full px-4 py-3 rounded-lg bg-[var(--secondary)] text-[var(--foreground)] border ${
              errors.subject ? 'border-red-500' : 'border-transparent'
            } focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition-colors`}
            placeholder="How can we help?"
          />
          {errors.subject && (
            <p className="mt-1 text-sm text-red-500">{errors.subject.message}</p>
          )}
        </div>
        
        {/* Message Field */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-1">
            Message <span className="text-red-500">*</span>
          </label>
          <textarea
            id="message"
            {...register('message')}
            rows={5}
            className={`w-full px-4 py-3 rounded-lg bg-[var(--secondary)] text-[var(--foreground)] border ${
              errors.message ? 'border-red-500' : 'border-transparent'
            } focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition-colors`}
            placeholder="Your message here..."
          />
          {errors.message && (
            <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>
          )}
        </div>
        
        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex items-center justify-center gap-2 bg-[var(--primary)] text-white py-3 px-6 rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <Send className="h-5 w-5" />
              Send Message
            </>
          )}
        </button>
      </form>
    </div>
  );
}