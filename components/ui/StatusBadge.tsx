import type { Project, ProjectStatus } from '@/types/project';

const labels: Record<ProjectStatus, string> = {
  blueprint: 'Blueprint',
  prototype: 'Prototype',
  'in-development': 'In development',
  deployed: 'Deployed',
};

export function StatusBadge({ status }: { status: ProjectStatus; project?: Project }) {
  const steps: ProjectStatus[] = ['blueprint', 'prototype', 'in-development', 'deployed'];
  const currentIndex = steps.indexOf(status);

  return (
    <span className="inline-flex items-center gap-2 whitespace-nowrap font-mono text-[9px] uppercase tracking-[.16em] text-ink">
      <span className="flex items-center gap-1 border border-rule bg-bond px-1 py-0.5">
        {steps.map((step, index) => (
          <span
            key={step}
            className={`h-2.5 w-2.5 border ${index <= currentIndex ? 'border-green bg-green' : 'border-rule bg-transparent'}`}
            title={labels[step]}
            aria-label={labels[step]}
          />
        ))}
      </span>
      <span>{labels[status]}</span>
    </span>
  );
}
