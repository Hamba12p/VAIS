import { getProjectBySlug } from '@/data/projects';
import { ProjectDetail } from '@/components/work/ProjectDetail';
import { projects } from '@/data/projects';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  return <ProjectDetail project={project} />;
}

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}
