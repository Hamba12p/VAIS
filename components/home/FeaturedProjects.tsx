import { getFeaturedProjects } from '@/data/projects';
import { ProjectCard } from '@/components/work/ProjectCard';
import { FadeIn } from '@/components/ui/FadeIn';

export function FeaturedProjects() {
  const featured = getFeaturedProjects();

  return (
    <section className="container-vais py-16">
      <h3 className="font-sora text-display-md text-vais-charcoal">Featured Projects</h3>
      <div className="h-1 w-16 bg-vais-green-vibrant mt-3 rounded" />
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {featured.map((p, i) => (
          <FadeIn key={p.slug} delay={i * 0.05}>
            <ProjectCard project={p} />
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
