import { Plus } from "lucide-react";
import type { Project } from "@/types/project";
import { architectureProfiles } from "@/data/architectures";
import { ArchitectureScene } from "@/components/ui/ArchitectureScene";

export function ArchitectureDiagram({ project }: { project: Project }) {
  const profile = architectureProfiles[project.slug];
  if (!profile)
    return <p className="project-prose">{project.architectureHighlight}</p>;
  return (
    <div className="architecture-exhibit">
      <ArchitectureScene profile={profile} label={project.name} />
      <details className="architecture-source">
        <summary>
          Read the architecture note <Plus size={16} aria-hidden="true" />
        </summary>
        <p>{project.architectureHighlight}</p>
      </details>
    </div>
  );
}
