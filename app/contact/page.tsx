import type { Metadata } from 'next';
import { company } from '@/data/company';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contact VAIS in Kampala, Uganda.',
};

export default function ContactPage() {
  return (
    <section className="container-vais py-16 md:py-20">
      <div className="max-w-2xl">
        <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[rgb(var(--color-murram))]">Contact</p>
        <h1 className="mt-4 text-4xl md:text-5xl font-sora leading-[0.95] text-[rgb(var(--color-ink))]">
          Direct contact for institutional work.
        </h1>
        <p className="mt-5 text-base leading-relaxed text-[rgb(var(--color-muted))]">
          Use the details below for government engagements, institutional deployments, or partnership enquiries.
        </p>

        <div className="mt-10 border-t border-[rgb(var(--color-hairline))] pt-8">
          <div className="grid gap-6 sm:grid-cols-3">
            <div>
              <p className="text-xs font-mono uppercase tracking-[0.22em] text-[rgb(var(--color-murram))]">Phone</p>
              <a href={`tel:${company.phone}`} className="mt-2 block text-sm text-[rgb(var(--color-ink))]">
                {company.phone}
              </a>
            </div>
            <div>
              <p className="text-xs font-mono uppercase tracking-[0.22em] text-[rgb(var(--color-murram))]">Email</p>
              <a href={`mailto:${company.email}`} className="mt-2 block text-sm text-[rgb(var(--color-ink))]">
                {company.email}
              </a>
            </div>
            <div>
              <p className="text-xs font-mono uppercase tracking-[0.22em] text-[rgb(var(--color-murram))]">Address</p>
              <p className="mt-2 text-sm text-[rgb(var(--color-ink))]">{company.address}</p>
            </div>
          </div>

          <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.22em] text-[rgb(var(--color-muted))]">
            Coordinates: 0.3476N 32.5825E - Kampala
          </p>
        </div>
      </div>
    </section>
  );
}
