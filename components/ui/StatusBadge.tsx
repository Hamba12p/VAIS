import type { Project, ProjectStatus } from "@/types/project";
const labels: Record<ProjectStatus, string> = {
  blueprint: "Blueprint",
  prototype: "Prototype",
  "in-development": "In development",
  deployed: "Deployed",
};
export function StatusBadge({
  status,
}: {
  status: ProjectStatus;
  project?: Project;
}) {
  return (
    <span className={`project-status status-${status}`}>
      <span aria-hidden="true" />
      {labels[status]}
    </span>
  );
}
