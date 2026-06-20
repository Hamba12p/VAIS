import Link from 'next/link';
import Image from 'next/image';
import { Project } from '@/types/project';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { TechTag } from '@/components/ui/TechTag';
import { categories } from '@/data/categories';

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="border border-vais-border rounded-vais p-0 bg-white overflow-hidden">
      <Link href={`/work/${project.slug}`} className="block" prefetch={true}>
        <div className="relative w-full h-24 overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1600&q=80"
            alt={project.name}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 400px"
          />
          <div className="absolute left-0 bottom-0 right-0 h-16 bg-gradient-to-t from-black/50 to-transparent" />
          {project.category && project.category[0] && (
            <div className="absolute left-3 bottom-3 bg-black/60 text-white text-xs px-2 py-1 rounded">{
              categories.find((c) => c.key === project.category[0])?.label ?? project.category[0]
            }</div>
          )}
        </div>

        <div className="p-4">
          <h4 className="font-sora text-lg text-vais-charcoal">{project.name}</h4>
          <p className="text-vais-slate text-sm mt-1">{project.tagline}</p>
        </div>
      </Link>

      <div className="mt-4 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          {project.stack.slice(0, 2).map((t) => (
            <TechTag key={t} label={t} />
          ))}
        </div>
        <StatusBadge status={project.status} project={project} />
      </div>
    </article>
  );
}
