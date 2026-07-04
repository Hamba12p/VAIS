import Image from 'next/image';
import { Project } from '@/types/project';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { TechTag } from '@/components/ui/TechTag';
import { ApexNexusSandbox } from '@/components/apex/ApexNexusSandbox';

export function ProjectDetail({ project }: { project: Project }) {
  return (
    <article className="container-vais py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <h1 className="font-sora text-display-lg text-vais-charcoal">{project.name}</h1>
          <p className="text-vais-slate mt-2">{project.tagline}</p>

          <div className="mt-6">
            <h3 className="font-sora text-lg text-vais-charcoal">Problem</h3>
            <p className="text-vais-slate mt-2">{project.problem}</p>
          </div>

          <div className="mt-6">
            <h3 className="font-sora text-lg text-vais-charcoal">Solution</h3>
            <p className="text-vais-slate mt-2">{project.solution}</p>
          </div>

          <div className="mt-6">
            <h3 className="font-sora text-lg text-vais-charcoal">Architecture</h3>
            <p className="text-vais-slate mt-2">{project.architectureHighlight}</p>
          </div>
        </div>

        <aside className="md:col-span-1">
          <div className="bg-vais-surface p-4 rounded-vais border border-vais-border">
            <StatusBadge status={project.status} />
            <div className="mt-4 flex flex-wrap gap-2">
              {project.stack.map((s) => (
                <TechTag key={s} label={s} />
              ))}
            </div>

            {project.metrics && (
              <div className="mt-4">
                <h4 className="text-sm font-mono text-vais-slate uppercase">Key metrics</h4>
                <ul className="mt-2 list-disc list-inside text-vais-slate">
                  {project.metrics.map((m, i) => (
                    <li key={i}>{m}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </aside>
      </div>

      {project.slug === 'apex-nexus' ? (
        <section className="mt-10">
          <div className="mb-4">
            <p className="text-xs font-mono uppercase tracking-[0.18em] text-[rgb(var(--color-primary))]">Interactive Preview</p>
            <h3 className="mt-2 font-sora text-2xl text-vais-charcoal">Sandboxed Executive Console</h3>
            <p className="mt-2 max-w-3xl text-vais-slate">
              Role-switched simulation of directive monitoring, discrepancy tracking, and progress verification workflows for OPM, State House, and delivery ministries.
            </p>
          </div>
          <ApexNexusSandbox compact />
        </section>
      ) : null}
    </article>
  );
}
