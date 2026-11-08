"use client";
import Image from "next/image";
import { useRef } from "react";
import type { Project } from "@/types/project";
import { projectVisual } from "@/lib/projectVisuals";

export function ProjectImage({
  project,
  priority = false,
  sizes = "(max-width: 760px) 100vw, 50vw",
}: {
  project: Project;
  priority?: boolean;
  sizes?: string;
}) {
  const visual = projectVisual(project);
  const pointerBounds = useRef<DOMRect | null>(null);
  const allowPointerMotion = useRef(false);
  const illustrated = visual.src.endsWith(".svg");
  return (
    <div
      className={`project-image ${illustrated ? "project-image-drawing" : ""}`}
      onPointerEnter={(e) => {
        allowPointerMotion.current =
          e.pointerType === "mouse" &&
          !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        pointerBounds.current = allowPointerMotion.current
          ? e.currentTarget.getBoundingClientRect()
          : null;
      }}
      onPointerMove={(e) => {
        const r = pointerBounds.current;
        if (!allowPointerMotion.current || !r) return;
        e.currentTarget.style.setProperty(
          "--image-x",
          `${((e.clientX - r.left) / r.width - 0.5) * 12}px`,
        );
        e.currentTarget.style.setProperty(
          "--image-y",
          `${((e.clientY - r.top) / r.height - 0.5) * 8}px`,
        );
      }}
      onPointerLeave={(e) => {
        pointerBounds.current = null;
        e.currentTarget.style.setProperty("--image-x", "0px");
        e.currentTarget.style.setProperty("--image-y", "0px");
      }}
    >
      <Image
        src={visual.src}
        alt={visual.alt}
        fill
        priority={priority}
        sizes={sizes}
        style={{ objectPosition: visual.position ?? "center" }}
      />
      {illustrated && (
        <span className="drawing-wordmark" aria-hidden="true">
          {project.name.split(" — ")[0]}
        </span>
      )}
    </div>
  );
}
