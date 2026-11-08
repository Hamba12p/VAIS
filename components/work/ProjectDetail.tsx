import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import type { Project } from "@/types/project";
import { projects } from "@/data/projects";
import { categories } from "@/data/categories";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { ProjectImage } from "./ProjectImage";
import { projectVisual } from "@/lib/projectVisuals";
import { ArchitectureDiagram } from "./ArchitectureDiagram";
import { TerrainReveal } from "@/components/ui/TerrainReveal";
export function ProjectDetail({ project }: { project: Project }) {
  const kind = project.category.includes("security-intelligence")
    ? "security"
    : project.slug === "ugems" ||
        project.category.includes("education-institutions")
      ? "education"
      : "apex";
  const next =
    projects[
      (projects.findIndex((p) => p.slug === project.slug) + 1) % projects.length
    ];
  return (
    <article>
      <section className="project-hero">
        <div className="studio-container">
          <div className="project-breadcrumb">
            <Link href="/work">
              <ArrowLeft size={14} />
              All systems
            </Link>
            <StatusBadge status={project.status} />
          </div>
          <div className="project-hero-grid">
            <div>
              <p className="eyebrow">
                {categories
                  .find((c) => c.key === project.category[0])
                  ?.label.replaceAll("&", "and")}{" "}
                / System study
              </p>
              <h1>{project.name}</h1>
              <p className="project-tagline">{project.tagline}</p>
              <div className="project-stack">
                {project.stack.slice(0, 4).map((s) => (
                  <span key={s}>{s}</span>
                ))}
              </div>
            </div>
            <div className={`project-hero-art art-${kind}`}>
              <ProjectImage project={project} priority />
              <span className="image-context">
                {projectVisual(project).caption}
              </span>
            </div>
          </div>
        </div>
      </section>
      <section className="studio-container project-story section-space">
        <aside>
          <p className="eyebrow">Inside the system</p>
          <nav aria-label="Case study sections">
            <a href="#challenge">The challenge</a>
            <a href="#response">The response</a>
            <a href="#architecture">Architecture</a>
          </nav>
          <div className="project-maturity-note">
            <StatusBadge status={project.status} />
            <p>
              Project maturity follows the portfolio record. Design scope and
              scale targets are not adoption figures.
            </p>
          </div>
        </aside>
        <div>
          <TerrainReveal>
            <section id="challenge">
              <p className="eyebrow">The challenge</p>
              <h2>Understand the conditions.</h2>
              <p className="project-prose">{project.problem}</p>
            </section>
          </TerrainReveal>
          <TerrainReveal>
            <section id="response">
              <p className="eyebrow">The response</p>
              <h2>A considered architecture.</h2>
              <p className="project-prose">{project.solution}</p>
            </section>
          </TerrainReveal>
          <TerrainReveal>
            <section id="architecture">
              <p className="eyebrow">Architecture</p>
              <h2>Look beneath the surface.</h2>
              <p className="project-prose">{project.architectureHighlight}</p>
              <div className="project-stack light-stack">
                {project.stack.map((s) => (
                  <span key={s}>{s}</span>
                ))}
              </div>
            </section>
          </TerrainReveal>
        </div>
      </section>
      <section className="studio-container project-diagram">
        <ArchitectureDiagram project={project} />
      </section>
      {project.slug === "apex-nexus" && (
        <section className="studio-container project-demo">
          <div>
            <p className="eyebrow">Interactive / Illustrative data</p>
            <h2>Explore the decision environment.</h2>
            <p>
              A sandbox demonstration of roles, directives and evidence. No live
              institutional data.
            </p>
          </div>
          <Link
            href="/sandbox/apex-nexus"
            className="studio-button dark-button"
          >
            Launch the sandbox <ArrowUpRight size={18} />
          </Link>
        </section>
      )}
      <section className="studio-container project-next">
        <div>
          <p className="eyebrow">Continue exploring</p>
          <Link href={`/work/${next.slug}`}>
            <h2>{next.name}</h2>
            <ArrowUpRight size={35} />
          </Link>
        </div>
        <Link href="/contact" className="text-link">
          Discuss a related challenge <ArrowUpRight size={17} />
        </Link>
      </section>
    </article>
  );
}
