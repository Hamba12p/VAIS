import { getProjectBySlug } from '@/data/projects';
import { ProjectDetail } from '@/components/work/ProjectDetail';
import { projects } from '@/data/projects';

interface Props {
  params: { slug: string };
}

export default function ProjectPage({ params }: Props) {
  const project = getProjectBySlug(params.slug);

  if (!project) {
    return (
      <div className="container-vais py-24">
        <h2 className="font-sora text-lg">Project not found</h2>
      </div>
    );
  }

  return <ProjectDetail project={project} />;
}

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}
