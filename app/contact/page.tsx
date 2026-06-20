 'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail, Phone, MapPin, CheckCircle } from 'lucide-react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Button } from '@/components/ui/Button';
import { company } from '@/data/company';
import { cn } from '@/lib/utils';

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  organisation: z.string().optional(),
  message: z.string().min(20, 'Message must be at least 20 characters'),
});

type FormData = z.infer<typeof schema>;

function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    const endpoint = 'https://formspree.io/f/xdavqjap';
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const text = await res.text();
        console.error('Formspree error', text);
        throw new Error('Failed to send message');
      }

      setSubmitted(true);
    } catch (err) {
      console.error(err);
      alert('Failed to send message. Please try again or call us directly.');
    }
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
        <CheckCircle size={40} className="text-vais-green" />
        <h3 className="font-sora font-700 text-xl text-vais-charcoal">Message received.</h3>
        <p className="text-vais-slate max-w-sm">We'll respond to your enquiry as soon as possible.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-mono text-vais-slate uppercase tracking-widest">Name *</label>
          <input
            {...register('name')}
            placeholder="Your name"
            className={cn(
              'border border-vais-border rounded-vais px-4 py-3 text-sm text-vais-charcoal bg-white placeholder:text-vais-slate-light focus:outline-none focus:border-vais-green transition-colors duration-150',
              errors.name && 'border-red-400'
            )}
          />
          {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-mono text-vais-slate uppercase tracking-widest">Email *</label>
          <input
            {...register('email')}
            type="email"
            placeholder="your@email.com"
            className={cn(
              'border border-vais-border rounded-vais px-4 py-3 text-sm text-vais-charcoal bg-white placeholder:text-vais-slate-light focus:outline-none focus:border-vais-green transition-colors duration-150',
              errors.email && 'border-red-400'
            )}
          />
          {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-mono text-vais-slate uppercase tracking-widest">Organisation</label>
        <input
          {...register('organisation')}
          placeholder="Ministry, company, or institution (optional)"
          className="border border-vais-border rounded-vais px-4 py-3 text-sm text-vais-charcoal bg-white placeholder:text-vais-slate-light focus:outline-none focus:border-vais-green transition-colors duration-150"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-mono text-vais-slate uppercase tracking-widest">Message *</label>
        <textarea
          {...register('message')}
          rows={6}
          placeholder="Describe what you're building or what you need."
          className={cn(
            'border border-vais-border rounded-vais px-4 py-3 text-sm text-vais-charcoal bg-white placeholder:text-vais-slate-light focus:outline-none focus:border-vais-green transition-colors duration-150 resize-none',
            errors.message && 'border-red-400'
          )}
        />
        {errors.message && <p className="text-xs text-red-500">{errors.message.message}</p>}
      </div>

      <Button type="submit" variant="primary" size="md" disabled={isSubmitting} className="self-start">
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </Button>
    </form>
  );
}

export default function ContactPage() {
  return (
    <div className="bg-white">
      <div className="border-b border-vais-border bg-vais-surface">
        <div className="container-vais py-20">
          <SectionHeader
            label="Contact"
            heading="Let's talk."
            subheading="For government engagements, institutional deployments, or enterprise inquiries — reach us directly or use the form."
          />
        </div>
      </div>

      <div className="container-vais py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Form */}
          <div className="lg:col-span-2">
            <h2 className="font-sora font-600 text-lg text-vais-charcoal mb-8">Send a message</h2>
            <ContactForm />
          </div>

          {/* Contact details */}
          <aside className="flex flex-col gap-8">
            <div>
              <p className="text-xs font-mono text-vais-slate uppercase tracking-widest mb-5">Direct Contact</p>
              <div className="flex flex-col gap-4">
                <a
                  href={`mailto:${company.email}`}
                  className="flex items-center gap-3 text-vais-charcoal hover:text-vais-green transition-colors duration-150 group"
                >
                  <Mail size={16} className="text-vais-green" />
                  <span className="text-sm font-mono">{company.email}</span>
                </a>
                <a
                  href={`tel:${company.phone}`}
                  className="flex items-center gap-3 text-vais-charcoal hover:text-vais-green transition-colors duration-150"
                >
                  <Phone size={16} className="text-vais-green" />
                  <span className="text-sm font-mono">{company.phone}</span>
                </a>
                <div className="flex items-start gap-3 text-vais-slate">
                  <MapPin size={16} className="text-vais-green mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{company.address}</span>
                </div>
              </div>
            </div>

            <div className="border-t border-vais-border pt-8">
              <p className="text-xs font-mono text-vais-slate uppercase tracking-widest mb-3">Response Time</p>
              <p className="text-sm text-vais-slate leading-relaxed">
                We respond to all enquiries within one business day. For urgent government or institutional matters, please call directly.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
