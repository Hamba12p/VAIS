import { ProjectGrid } from '@/components/work/ProjectGrid';
import { SectionHeader } from '@/components/ui/SectionHeader';

export default function WorkPage() {
  return (
    <div>
      <section className="container-vais py-12">
        <SectionHeader heading="Our Work" subheading="Selected projects and case studies." />
        <div className="mt-6">
          <p className="text-vais-slate max-w-3xl">
            Our portfolio represents systems designed to address large-scale public-sector problems. Each program is production-ready and has been validated through local testing and iterative improvement. VAIS partners with government and institutional stakeholders to integrate, certify, and deploy these solutions at scale — unlocking improvements in service delivery, data-driven decision making, and operational resilience.
          </p>
        </div>
      </section>
      <ProjectGrid />
    </div>
  );
}
