"use client";
import { useState } from "react";
import Link from "next/link";
import { projects } from "@/data/projects";
import { AtlasMark } from "@/components/ui/AtlasMark";

const lenses = [
  {
    label: "Place",
    title: "Start where the work happens.",
    copy: "Makerere, Kampala is our starting point. Variable connectivity and existing infrastructure shape the questions we ask before choosing a technology.",
    link: "/about",
    action: "Meet the practice",
    metric: "Kampala",
    caption: "Our home base",
  },
  {
    label: "People",
    title: "Leave space for the person using it.",
    copy: "A school administrator, an analyst and a field worker need different kinds of clarity. We design around their responsibilities, including the moments when a system should ask for help.",
    link: "/work/apex-nexus",
    action: "Explore a review workflow",
    metric: "Human",
    caption: "Judgement stays in the picture",
  },
  {
    label: "Practice",
    title: "Make the trade-offs discussable.",
    copy: "We want you to understand why a system is built a certain way. Our work brings architecture, constraints and evidence into the conversation early, while there is still room to change direction.",
    link: "/contact",
    action: "Bring us a question",
    metric: "Together",
    caption: "A working relationship",
  },
  {
    label: "Progress",
    title: "Show the work as it stands.",
    copy: "The collection includes deployed work, projects in development, prototypes and blueprints. Those labels describe different stages. A proposal deserves curiosity; it also needs to be recognised as a proposal.",
    link: "/work#portfolio-status",
    action: "Read the portfolio mix",
    metric: String(projects.length),
    caption: "Projects in the collection",
  },
];
export function CompanyCompass() {
  const [active, setActive] = useState(0);
  const lens = lenses[active];
  return (
    <div className={`company-compass compass-active-${active}`}>
      <p className="eyebrow">The VAIS orbit / Select a point</p>
      <div className="compass-map">
        <AtlasMark className="compass-contours" />
        <svg viewBox="0 0 420 300" aria-hidden="true">
          <g fill="none" stroke="currentColor">
            <ellipse
              cx="210"
              cy="150"
              rx="160"
              ry="63"
              transform="rotate(-28 210 150)"
            />
            <ellipse
              cx="210"
              cy="150"
              rx="160"
              ry="63"
              transform="rotate(28 210 150)"
            />
            <ellipse cx="210" cy="150" rx="80" ry="126" />
            <circle cx="210" cy="150" r="95" strokeDasharray="2 8" />
          </g>
        </svg>
        <div className="compass-core">
          <strong>{lens.metric}</strong>
          <span>{lens.caption}</span>
        </div>
        {lenses.map((item, i) => (
          <button
            type="button"
            key={item.label}
            aria-label={item.label}
            className={`compass-point compass-point-${i}`}
            aria-pressed={active === i}
            aria-controls="compass-reading"
            onClick={() => setActive(i)}
          >
            <i /> <span className="compass-point-number">0{i + 1}</span>
            {item.label}
          </button>
        ))}
      </div>
      <div id="compass-reading" className="compass-reading" aria-live="polite">
        <span className="eyebrow compass-reading-label">
          0{active + 1} / {lens.label}
        </span>
        <h3>{lens.title}</h3>
        <p>{lens.copy}</p>
        {active === 3 ? (
          <div id="portfolio-status" className="portfolio-status">
            {(
              [
                ["deployed", "Deployed"],
                ["in-development", "In development"],
                ["prototype", "Prototype"],
                ["blueprint", "Blueprint"],
              ] as const
            ).map(([status, label]) => (
              <span key={status}>
                <strong>
                  {projects.filter((p) => p.status === status).length}
                </strong>
                {label}
              </span>
            ))}
          </div>
        ) : (
          <Link href={lens.link} className="text-link">
            {lens.action} ↗
          </Link>
        )}
      </div>
    </div>
  );
}
