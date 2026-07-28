import { ProjectGrid } from '@/components/work/ProjectGrid';

export default function WorkPage() {
  return (
    <div>
      <section className="container-vais py-16 md:py-20">
        <div className="max-w-3xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[rgb(var(--color-murram))]">Work</p>
          <h1 className="mt-4 text-4xl md:text-5xl font-sora leading-[0.95] text-[rgb(var(--color-ink))]">
            Case studies written as records.
          </h1>
          <p className="mt-5 text-base leading-relaxed text-[rgb(var(--color-muted))]">
            Projects are presented as operational entries so the portfolio stays legible at a glance and remains easy to scan on small screens.
          </p>
        </div>
      </section>

      <ProjectGrid />
    </div>
  );
}
