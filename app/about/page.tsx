import type { Metadata } from 'next';
import { OperationsRegister, type RegisterRow } from '@/components/ui/OperationsRegister';
import { SealMark } from '@/components/ui/SealMark';
import { company } from '@/data/company';

export const metadata: Metadata = {
  title: 'About',
  description: 'VAIS - Applied Intelligence Systems. Makerere, Kampala, Uganda.',
};

const rows: RegisterRow[] = [
  {
    ref: '01',
    sector: 'Base of operations',
    status: 'ACTIVE',
    coverage: company.address,
    summary: 'VAIS operates from Makerere in Kampala and builds for institutions that work under real local constraints.',
  },
  {
    ref: '02',
    sector: 'Systems built',
    status: 'DEPLOYED',
    coverage: company.stats[0].value,
    summary: 'The current portfolio spans civic, education, health, security, and institutional intelligence systems.',
  },
  {
    ref: '03',
    sector: 'Delivery model',
    status: 'PILOT',
    coverage: 'Government and institutional adoption',
    summary: 'Projects are designed for integration, auditability, and low-bandwidth resilience rather than visual spectacle.',
  },
];

export default function AboutPage() {
  return (
    <div>
      <section className="container-vais py-16 md:py-20">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <div className="max-w-3xl">
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[rgb(var(--color-murram))]">About VAIS</p>
            <h1 className="mt-4 text-4xl md:text-5xl font-sora leading-[0.95] text-[rgb(var(--color-ink))]">
              Applied systems work for public institutions.
            </h1>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-[rgb(var(--color-muted))]">
              <p>
                VAIS is a small applied-intelligence practice focused on systems that have to stay legible under operational pressure.
              </p>
              <p>
                The portfolio is built around Uganda's delivery reality: intermittent power, variable connectivity, public accountability, and the need to integrate with existing institutional infrastructure instead of replacing it with a generic SaaS layer.
              </p>
              <p>
                The work spans civic delivery, education, health, security, and enterprise systems. The common thread is not a visual style. It is the decision to make constraints visible in the product itself.
              </p>
            </div>
          </div>

          <div className="border border-[rgb(var(--color-hairline))] bg-[rgba(255,255,255,0.66)] p-6 shadow-[0_12px_32px_rgba(20,23,15,0.05)]">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center border border-[rgb(var(--color-hairline))] bg-white text-[rgb(var(--color-murram))]">
                <SealMark className="h-8 w-8" />
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[rgb(var(--color-murram))]">Operational seal</p>
                <p className="mt-1 text-sm leading-relaxed text-[rgb(var(--color-muted))]">
                  Legible delivery, public accountability, and systems designed for the field.
                </p>
              </div>
            </div>
            <div className="mt-6 border-t border-[rgb(var(--color-hairline))] pt-6">
              <p className="text-xs font-mono uppercase tracking-[0.22em] text-[rgb(var(--color-murram))]">Working notes</p>
              <p className="mt-3 text-sm leading-relaxed text-[rgb(var(--color-ink))]">
                Based in Makerere, Kampala. The portfolio currently lists {company.stats[0].value} systems built and is structured for government and institutional adoption.
              </p>
            </div>
          </div>
        </div>
      </section>

      <OperationsRegister
        title="Operating facts"
        intro="A compact view of the company rather than a brand story."
        rows={rows}
        footnote="No decorative logo reuse, no card grid, and no filler image."
      />
    </div>
  );
}
