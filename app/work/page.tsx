import { ProjectGrid } from '@/components/work/ProjectGrid';
import { SectionHeader } from '@/components/ui/SectionHeader';
// 3D constellation removed for content-first presentation
import { BrandPanel } from '@/components/ui/BrandPanel';

export default function WorkPage() {
  return (
    <div>
      <section className="border-b border-vais-border bg-vais-surface">
        <div className="container-vais py-14 md:py-20">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <SectionHeader heading="Our Work" subheading="Selected projects and case studies." />
              <div className="mt-6 max-w-3xl">
                <p className="text-vais-slate leading-relaxed">
                  VAIS presents its programs as a connected practice of public-system design — one that links national infrastructure, institutional delivery, and long-term resilience. Each case reflects a specific operational problem and a deliberate path toward deployment.
                </p>
              </div>
            </div>
            <BrandPanel
              label="Portfolio"
              title="Portfolio: operational outcomes"
              body="Case studies showing deployments, integrations, and measurable service improvements across national systems."
            />
          </div>

          <div className="mt-8">
            <div className="h-[360px] w-full rounded-vais-md border border-vais-border bg-white/80 shadow-sm flex items-center justify-center">
              <div className="max-w-4xl w-full px-8 py-12 text-center text-vais-slate">
                <svg width="100%" height="120" viewBox="0 0 800 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="block mx-auto opacity-40">
                  <circle cx="80" cy="60" r="40" fill="#E9FBF6" />
                  <circle cx="720" cy="60" r="40" fill="#E9FBF6" />
                  <line x1="120" y1="60" x2="680" y2="60" stroke="#DFF7F1" strokeWidth="2" />
                  <circle cx="200" cy="60" r="8" fill="#47C4B0" />
                  <circle cx="320" cy="60" r="10" fill="#2DBAA5" />
                  <circle cx="440" cy="60" r="7" fill="#6FDCC0" />
                </svg>
                <p className="mt-4 text-sm text-[rgb(var(--color-muted))]">Interactive visualizations are available in individual case studies. The portfolio below focuses on deployments, outcomes, and integration details.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ProjectGrid />
    </div>
  );
}
