import type { Metadata } from 'next';
import { ContactForm } from '@/components/contact/ContactForm';
import { company } from '@/data/company';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contact VAIS in Kampala, Uganda.',
};

export default function ContactPage() {
  return (
    <section className="container-vais grid min-h-[76svh] items-center gap-14 py-20 lg:grid-cols-[.9fr_1.1fr]">
      <div>
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-ink/70">Contact / Kampala</p>
        <h1 className="mt-5 text-balance font-display text-[clamp(2.5rem,5vw,5rem)] leading-[0.9] tracking-[-0.02em] text-ink">
          Start from the <span className="text-green">ground truth.</span>
        </h1>
        <p className="mt-7 max-w-xl text-xl leading-relaxed text-ink/75">
          For government engagements, institutional deployments, or partnerships, tell us what the system has
          to survive.
        </p>
        <div className="mt-10 border-t border-rule pt-6 text-ink/75">
          <a href={`mailto:${company.email}`} className="block text-lg text-ink">{company.email}</a>
          <p className="mt-2">{company.phonePrimary} / {company.phoneSecondary}</p>
          <p>{company.address}</p>
        </div>
      </div>
      <ContactForm />
    </section>
  );
}
