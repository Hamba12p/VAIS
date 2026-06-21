import Link from 'next/link';
import { Project } from '@/types/project';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { TechTag } from '@/components/ui/TechTag';
import { categories } from '@/data/categories';
import TiltCard from '@/components/ui/TiltCard';

export function ProjectCard({ project, image }: { project: Project; image?: string }) {
  return (
    <article className="group overflow-hidden rounded-vais bg-[rgb(var(--color-surface))] shadow-sm hover:shadow-elevated transition-shadow duration-300">
      <Link href={`/work/${project.slug}`} className="block" prefetch={true} data-cursor-interactive>
        <TiltCard className="relative">
          <div className="relative w-full h-52 overflow-hidden">
            <img loading="lazy" decoding="async" src={image ?? ''} alt={project.name} className="absolute inset-0 w-full h-full object-cover transform-gpu transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(var(--color-primary),0.06),transparent)] pointer-events-none transition-opacity duration-400 group-hover:opacity-100 opacity-70" />

            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute inset-px rounded-vais border border-transparent group-hover:border-[rgba(var(--color-accent),0.6)]/70" />
            </div>

            {project.category && project.category[0] && (
              <div className="absolute left-4 bottom-4 bg-[rgba(var(--color-charcoal),0.72)] text-white text-xs px-2 py-1 rounded">{
                categories.find((c) => c.key === project.category[0])?.label ?? project.category[0]
              }</div>
            )}
          </div>

          <div className="p-4">
            <h4 className="font-sora text-lg text-[rgb(var(--color-charcoal))]">{project.name}</h4>
            <p className="text-[rgb(var(--color-muted))] text-sm mt-1">{project.tagline}</p>
            <div className="mt-3 flex items-center gap-2">
              {project.stack.slice(0, 2).map((t) => (
                <TechTag key={t} label={t} />
              ))}
            </div>
          </div>
        </TiltCard>
      </Link>

      <div className="px-4 pb-4">
        <div className="mt-4 flex items-center justify-between gap-2">
          <StatusBadge status={project.status} project={project} />
        </div>
      </div>
    </article>
  );
}

