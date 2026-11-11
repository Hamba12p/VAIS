"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ArrowLeft, ArrowRight } from "lucide-react";
import { projects } from "@/data/projects";
import { research, projectContext } from "@/data/research";
import { ProjectImage } from "@/components/work/ProjectImage";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { projectVisual } from "@/lib/projectVisuals";

const entries = [
  {
    slug: "apex-nexus",
    sector: "Public decisions",
    title: "Evidence, all the way up.",
    note: "From a field report to a clearer decision.",
    colour: "copper",
  },
  {
    slug: "ugems",
    sector: "Education infrastructure",
    title: "The school day goes on.",
    note: "Continuity starts at the school, with or without a signal.",
    colour: "citron",
  },
  {
    slug: "sentect",
    sector: "Security intelligence",
    title: "Read between the signals.",
    note: "A different perspective on connected threats.",
    colour: "blue",
  },
] as const;

export function SelectedDossiers() {
  const [active, setActive] = useState(0);
  const entry = entries[active];
  const project = projects.find((p) => p.slug === entry.slug)!;
  const context = projectContext[entry.slug];
  const fact = research[context.source];
  const choose = (index: number) =>
    setActive((index + entries.length) % entries.length);
  return (
    <section
      className={`selected-work dossier-section section-space atlas-${entry.colour}`}
      id="selected-work"
    >
      <div className="studio-container">
        <div className="atlas-heading">
          <p className="eyebrow">
            <span className="index-cross">+</span> 02 / Selected systems
          </p>
          <h2>
            A few ways
            <br />
            we <span className="serif-accent">see differently.</span>
          </h2>
          <Link href="/work" className="atlas-all">
            The full collection <span>{projects.length}</span>
            <ArrowUpRight size={20} />
          </Link>
        </div>
        <div className="atlas-layout">
          <div className="atlas-index">
            <p className="eyebrow atlas-index-label">Choose a point of view</p>
            <div
              className="dossier-selectors"
              aria-label="Choose a featured project"
            >
              {entries.map((item, i) => {
                const p = projects.find((p) => p.slug === item.slug)!;
                return (
                  <button
                    type="button"
                    key={item.slug}
                    aria-pressed={active === i}
                    aria-controls="selected-dossier"
                    onClick={() => choose(i)}
                  >
                    <span className="atlas-item-number">0{i + 1}</span>
                    <span className="atlas-item-image">
                      <Image
                        src={projectVisual(p).src}
                        alt=""
                        fill
                        sizes="80px"
                      />
                    </span>
                    <span className="atlas-item-type">
                      <strong>{p.name}</strong>
                      <span>{item.sector}</span>
                    </span>
                    <ArrowUpRight size={16} />
                  </button>
                );
              })}
            </div>
            <div className="atlas-index-foot">
              <span className="eyebrow">An ongoing exploration</span>
              <p>
                Different settings.
                <br />
                The same attention
                <br />
                to what matters.
              </p>
              <div className="atlas-navigation">
                <button
                  type="button"
                  aria-label="Previous featured project"
                  onClick={() => choose(active - 1)}
                >
                  <ArrowLeft size={18} />
                </button>
                <span>
                  0{active + 1} <i>/ 03</i>
                </span>
                <button
                  type="button"
                  aria-label="Next featured project"
                  onClick={() => choose(active + 1)}
                >
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
          <article id="selected-dossier" className="dossier">
            <div className="dossier-visual" key={entry.slug}>
              <ProjectImage
                project={project}
                sizes="(max-width: 760px) 100vw, 70vw"
              />
              <div className="atlas-image-top">
                <StatusBadge status={project.status} />
                <span className="eyebrow">VAIS / {project.name}</span>
              </div>
              <div className="dossier-image-caption">
                <h3>{entry.title}</h3>
                <p>{entry.note}</p>
              </div>
              <Link
                className="atlas-image-link"
                href={`/work/${entry.slug}`}
                aria-label={`Explore ${project.name}`}
              >
                <ArrowUpRight size={29} />
              </Link>
              <span className="atlas-provenance">
                {projectVisual(project).caption}
              </span>
              <span className="atlas-image-cross" aria-hidden="true">
                +
              </span>
            </div>
            <div className="dossier-reading">
              <div className="atlas-story">
                <p className="eyebrow">The reason behind the system</p>
                <p>{context.copy}</p>
                <Link href={`/work/${entry.slug}`} className="text-link">
                  Inside {project.name}
                  <ArrowUpRight size={16} />
                </Link>
              </div>
              <div className="dossier-fact">
                <div className="atlas-fact-heading">
                  <span className="eyebrow">Context / Reference</span>
                  <span aria-hidden="true">↗</span>
                </div>
                <strong>{fact.value}</strong>
                <p>{fact.label}</p>
                <a href={fact.href} target="_blank" rel="noreferrer">
                  {fact.scope} ↗
                </a>
              </div>
            </div>
          </article>
        </div>
        <p className="portfolio-note">
          External research provides context. Project maturity is shown
          separately from product outcomes.
        </p>
        <span role="status" className="sr-only">
          {project.name} dossier selected.
        </span>
      </div>
    </section>
  );
}
