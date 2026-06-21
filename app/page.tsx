import Image from 'next/image';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Hero } from '@/components/home/Hero';
import Reveal from '@/components/ui/Reveal';

export default function Home() {
  return (
    <div>
      <Hero />

      <section className="container-vais py-24">
        <SectionHeader heading="VAIS — Applied Intelligence Systems" subheading="Portfolio and product showcase." align="center" />
        <div className="mt-12 text-center">
          <Reveal>
            <p className="text-[rgb(var(--color-muted))]">Welcome — explore our portfolio and product showcase.</p>
          </Reveal>
          <Reveal delay={0.04}>
            <p className="text-[rgb(var(--color-muted))] mt-4 max-w-2xl mx-auto">
              VAIS has developed a suite of production-ready applied-intelligence systems engineered for government and institutional adoption. These solutions have been exercised locally for testing and refinement and are available for integration and operational deployment to deliver measurable impact across public services, national security, health systems, and education.
            </p>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
