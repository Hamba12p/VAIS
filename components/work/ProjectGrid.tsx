import { projects } from '@/data/projects';
import { categories } from '@/data/categories';
import { OperationsRegister, type RegisterRow } from '@/components/ui/OperationsRegister';

function statusFromProject(status: string): 'ACTIVE' | 'PILOT' | 'DEPLOYED' {
  if (status === 'deployed') return 'DEPLOYED';
  if (status === 'in-development') return 'ACTIVE';
  return 'PILOT';
}

function coverageFromProject(project: (typeof projects)[number]) {
  return project.metrics?.[0] ?? project.clientContext ?? 'Coverage not stated';
}

const rows: RegisterRow[] = projects.map((project, index) => ({
  ref: String(index + 1).padStart(2, '0'),
  sector: `${project.name} - ${categories.find((category) => project.category.includes(category.key))?.label ?? 'General'}`,
  status: statusFromProject(project.status),
  coverage: coverageFromProject(project),
  summary: project.tagline,
  href: `/work/${project.slug}`,
}));

export function ProjectGrid() {
  return (
    <OperationsRegister
      title="Case studies as register entries"
      intro="The work page uses the same ledger format as the home page so the site reads as one system instead of three unrelated layouts."
      rows={rows}
      footnote="Each row links to a case study and expands the sector view without introducing a second visual language."
    />
  );
}
