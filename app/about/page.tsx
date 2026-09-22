import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { company } from '@/data/company';
export const metadata: Metadata = { title: 'About', description: 'VAIS builds security, public-service, and community health software from Makerere, Kampala, Uganda.' };
export default function AboutPage() {
  return <>
    <section className="relative overflow-hidden bg-field text-bond">
      <Image src="/images/contour/terrain-hero-fallback.png" alt="" fill priority sizes="100vw" className="object-cover opacity-25" />
      <div className="container-vais relative py-20 md:py-28"><p className="font-mono text-xs uppercase tracking-[.14em] text-signal">About VAIS / Makerere, Kampala</p><h1 className="mt-6 max-w-4xl font-display text-[clamp(2.75rem,6vw,5rem)] leading-[1.05] text-bond">Software for the work institutions do every day.</h1></div>
    </section>
    <section className="container-vais grid gap-8 py-16 md:grid-cols-[.6fr_1.4fr] md:py-20"><h2 className="font-display text-2xl">Built in Kampala</h2><div className="space-y-6 text-xl leading-relaxed text-ink/85"><p>VAIS builds applied intelligence systems for public institutions, security teams, schools, and community health services in Uganda.</p><p>Our portfolio includes telecom fraud detection, police case workflows, offline school records, and community health reporting. Each starts with a specific task and the people responsible for carrying it out.</p><p>That means designing for intermittent connectivity, existing national services, and decisions that people must be able to review.</p></div></section>
    <section className="container-vais pb-16"><h2 className="border-b border-rule pb-6 font-display text-3xl">What shapes the work</h2><div className="grid gap-8 pt-8 md:grid-cols-3">{[
      ['Connection is a constraint', 'School records and community health visits need to be captured where the work happens. Offline storage and later synchronisation are part of the design.'],
      ['Decisions have owners', 'A fraud signal, case analysis, or draft briefing should help a responsible person act. Review boundaries belong in the workflow.'],
      ['Existing systems matter', 'DHIS2, mobile money, and institutional records already have a role. New software needs a clear way to work alongside them.'],
    ].map(([title, copy]) => <article key={title} className="border-l-2 border-green pl-5"><h3 className="font-display text-xl">{title}</h3><p className="mt-4 text-ink/80">{copy}</p></article>)}</div></section>
    <section className="border-t border-rule"><div className="container-vais flex flex-wrap items-center justify-between gap-8 py-14"><div><h2 className="font-display text-2xl">Start with your workflow.</h2><p className="mt-3 text-ink/80">{company.address}</p></div><Link href="/contact" className="bg-green px-6 py-3 font-display text-sm font-semibold text-white">Contact VAIS</Link></div></section>
  </>;
}
