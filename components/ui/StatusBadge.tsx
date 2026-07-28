import { cn } from '@/lib/utils';
import { ProjectStatus, Project } from '@/types/project';

export function StatusBadge({ status, project }: { status: ProjectStatus; project?: Project }) {
  let label = 'Pilot';
  let classes = 'border-[rgba(var(--color-signal),0.34)] bg-[rgba(var(--color-signal),0.14)] text-[rgb(var(--color-ink))]';

  if (status === 'deployed') {
    label = 'Deployed';
    classes = 'border-[rgba(var(--color-murram),0.26)] bg-[rgba(var(--color-murram),0.10)] text-[rgb(var(--color-murram))]';
  } else if (status === 'in-development') {
    const complexityScore = (project?.stack?.length ?? 0) + (project?.metrics?.length ?? 0) + (project?.featured ? 2 : 0);
    if (complexityScore >= 3) {
      label = 'Active';
      classes = 'border-[rgba(var(--color-gazette),0.24)] bg-[rgba(var(--color-gazette),0.10)] text-[rgb(var(--color-gazette))]';
    }
  } else if (status === 'blueprint') {
    label = 'Pilot';
  } else if (status === 'prototype') {
    label = 'Pilot';
  }

  return (
    <span className={cn('inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-mono font-medium uppercase tracking-[0.18em]', classes)}>
      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />
      {label}
    </span>
  );
}
