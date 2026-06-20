import { cn } from '@/lib/utils';
import { ProjectStatus, Project } from '@/types/project';

// Map into simplified public-facing tags: either 'Prototype' or 'Deployment Ready'.
// Heuristic for 'Deployment Ready' when a project is featured, has a larger stack,
// or includes metrics. 'deployed' always counts as deployment ready.
export function StatusBadge({ status, project }: { status: ProjectStatus; project?: Project }) {
  let label = 'Prototype';
  let classes = 'bg-purple-50 text-purple-700 border-purple-200';

  if (status === 'deployed') {
    label = 'Deployment Ready';
    classes = 'bg-vais-green-light text-vais-green border-vais-green/20';
  } else if (status === 'in-development') {
    const complexityScore = (project?.stack?.length ?? 0) + (project?.metrics?.length ?? 0) + (project?.featured ? 2 : 0);
    if (complexityScore >= 3) {
      label = 'Deployment Ready';
      classes = 'bg-vais-green-light text-vais-green border-vais-green/20';
    } else {
      label = 'Prototype';
      classes = 'bg-purple-50 text-purple-700 border-purple-200';
    }
  } else if (status === 'blueprint' || status === 'prototype') {
    label = 'Prototype';
    classes = 'bg-purple-50 text-purple-700 border-purple-200';
  }

  return (
    <span className={cn('inline-flex items-center gap-1.5 text-xs font-mono font-medium px-2.5 py-1 rounded-vais border', classes)}>
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70" />
      {label}
    </span>
  );
}
