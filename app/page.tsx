import Image from 'next/image';
import { SectionHeader } from '@/components/ui/SectionHeader';

export default function Home() {
  return (
    <div>
      <section className="container-vais py-24">
        <SectionHeader heading="VAIS — Applied Intelligence Systems" subheading="Portfolio and product showcase." align="center" />
        <div className="mt-12 text-center">
          <p className="text-vais-slate">Welcome — explore our portfolio and product showcase.</p>
          <p className="text-vais-slate mt-4 max-w-2xl mx-auto">
            VAIS has developed a suite of production-ready applied-intelligence systems engineered for government and institutional adoption. These solutions have been exercised locally for testing and refinement and are available for integration and operational deployment to deliver measurable impact across public services, national security, health systems, and education.
          </p>
        </div>
      </section>
    </div>
  );
}
