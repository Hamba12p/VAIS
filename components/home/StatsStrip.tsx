import { company } from '@/data/company';
import { FadeIn } from '@/components/ui/FadeIn';

export function StatsStrip() {
  return (
    <section className="bg-vais-surface border-b border-vais-border">
      <div className="container-vais py-8">
        <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-center justify-between">
          {company.stats.map((s, i) => (
            <div key={s.label} className="flex flex-col items-center">
              <FadeIn delay={i * 0.05}>
                <span className="text-2xl font-sora text-vais-charcoal">{s.value}</span>
                <span className="text-sm text-vais-slate uppercase tracking-wide">{s.label}</span>
              </FadeIn>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
