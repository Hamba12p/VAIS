import Image from 'next/image';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Hero } from '@/components/home/Hero';
import Reveal from '@/components/ui/Reveal';

export default function Home() {
  return (
    <div>
      <Hero />

      <section className="container-vais py-24">
        <SectionHeader heading="VAIS — Applied Intelligence Systems" subheading="Partner-ready systems for public institutions." align="center" />
        <div className="mt-12 text-center">
          <Reveal>
            <p className="text-[rgb(var(--color-muted))]">VAIS develops applied intelligence systems that are designed to hold under real operating conditions: limited bandwidth, public accountability, and national-scale coordination.</p>
          </Reveal>
          <Reveal delay={0.04}>
            <p className="text-[rgb(var(--color-muted))] mt-4 max-w-3xl mx-auto">
              The work spans civic delivery, security operations, health infrastructure, and agriculture — each program shaped by local constraints and positioned for integration with the institutions that must rely on it day to day.
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a href="/work" className="inline-flex items-center justify-center rounded-vais border border-[rgba(var(--color-primary),0.16)] bg-[rgb(var(--color-primary))] px-5 py-2.5 text-sm font-medium text-white shadow-sm">Review the portfolio</a>
              <a href="/about" className="inline-flex items-center justify-center rounded-vais border border-[rgba(var(--color-primary),0.16)] bg-white px-5 py-2.5 text-sm font-medium text-[rgb(var(--color-primary))] shadow-sm">View the approach</a>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
