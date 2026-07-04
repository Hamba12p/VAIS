import type { Metadata } from 'next';
import Link from 'next/link';
import { ApexNexusSandbox } from '@/components/apex/ApexNexusSandbox';

export const metadata: Metadata = {
  title: 'APEX NEXUS Sandbox',
  description: 'Interactive sandbox preview for the APEX NEXUS directive intelligence platform.',
};

export default function ApexNexusSandboxPage() {
  return (
    <div className="bg-[rgb(var(--color-charcoal))] py-8">
      <section className="container-vais">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-mono uppercase tracking-[0.18em] text-[rgba(8,255,170,0.75)]">Sandbox Environment</p>
            <h1 className="mt-2 font-sora text-3xl font-semibold text-white">APEX NEXUS Directive Console</h1>
          </div>
          <Link
            href="/work/apex-nexus"
            className="rounded-full border border-[rgba(8,255,170,0.34)] px-4 py-2 text-sm text-[rgba(193,255,238,0.96)] transition hover:bg-[rgba(8,255,170,0.16)]"
          >
            Return to APEX Case Study
          </Link>
        </div>

        <ApexNexusSandbox />
      </section>
    </div>
  );
}
