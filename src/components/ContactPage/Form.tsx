/* eslint-disable @typescript-eslint/no-unused-expressions */
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Send } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

// Services
const businessServices = [
  'Virtual Assistance', 'Project Management', 'Data Entry & Transcription', 'Data Extraction/ETL',
  'Lead Generation', 'ERP/CRM Software', 'Data Mining', 'Market Research',
  'Data Analysis', 'Database Management'
];

const techServices = [
  'Web Development', 'Mobile App Development', 'UI/UX Design',
  'Cloud Solutions', 'AI Solutions'
];

// Validation schema
const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  subject: z.string().min(5, { message: 'Subject must be at least 5 characters' }),
  service: z.string().optional(),
  message: z.string().min(10, { message: 'Message must be at least 10 characters' })
});

type FormValues = z.infer<typeof formSchema>;

const inputBaseClasses = "w-full px-4 py-3 rounded-lg bg-[var(--secondary)] text-[var(--foreground)] border focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition-colors";

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
      service: '',
      message: ''
    }
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      const result = await res.json();
      res.ok ? toast.success('Message sent! We’ll get back to you.') : toast.error(result.message || 'Submission failed.');
      if (res.ok) reset();
    } catch {
      toast.error('Failed to send message. Try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const serviceOptions = useMemo(() => (
    <>
      <option value="">Select a service (optional)</option>
      <optgroup label="Business Services">
        {businessServices.map(service => (
          <option key={`biz-${service}`} value={service}>{service}</option>
        ))}
      </optgroup>
      <optgroup label="Technology Services">
        {techServices.map(service => (
          <option key={`tech-${service}`} value={service}>{service}</option>
        ))}
      </optgroup>
    </>
  ), []);

  const FormField = ({
    id,
    label,
    required,
    type = "text",
    registerFn,
    error,
    placeholder
  }: {
    id: keyof FormValues;
    label: string;
    required?: boolean;
    type?: string;
    registerFn: import('react-hook-form').UseFormRegisterReturn;
    error?: string;
    placeholder?: string;
  }) => (
    <div>
      <label htmlFor={id} className="block text-sm font-medium mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        id={id}
        type={type}
        {...registerFn}
        placeholder={placeholder}
        className={`${inputBaseClasses} ${error ? 'border-red-500' : 'border-transparent'}`}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );

  return (
    <div className="bg-[var(--card-bg)] border border-[var(--secondary)] rounded-xl p-6 md:p-8">
      <h2 className="text-2xl md:text-3xl font-bold mb-2">Send Us a Message</h2>
      <p className="text-[var(--foreground)] opacity-70 mb-6">
        Fill out the form below and we&apos;ll get back to you as soon as possible.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          id="name"
          label="Your Name"
          required
          registerFn={register('name')}
          error={errors.name?.message}
          placeholder="Ali Rayyan"
        />
        <FormField
          id="email"
          label="Email Address"
          type="email"
          required
          registerFn={register('email')}
          error={errors.email?.message}
          placeholder="ali@gmail.com"
        />
        <div>
          <label htmlFor="service" className="block text-sm font-medium mb-1">Service Interested In</label>
          <select
            id="service"
            {...register('service')}
            className={`${inputBaseClasses} border-transparent`}
          >
            {serviceOptions}
          </select>
        </div>
        <FormField
          id="subject"
          label="Subject"
          required
          registerFn={register('subject')}
          error={errors.subject?.message}
          placeholder="How can we help?"
        />
        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-1">
            Message <span className="text-red-500">*</span>
          </label>
          <textarea
            id="message"
            rows={5}
            {...register('message')}
            className={`${inputBaseClasses} ${errors.message ? 'border-red-500' : 'border-transparent'}`}
            placeholder="Your message here..."
          />
          {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>}
        </div>
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
