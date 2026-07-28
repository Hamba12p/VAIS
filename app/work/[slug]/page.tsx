import { getProjectBySlug } from '@/data/projects';
import { ProjectDetail } from '@/components/work/ProjectDetail';
import { projects } from '@/data/projects';

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

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
