"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Plus, Minus } from "lucide-react";
import { TerrainReveal } from "@/components/ui/TerrainReveal";
import { ArchitectureScene } from "@/components/ui/ArchitectureScene";
import type { ArchitectureProfile } from "@/data/architectures";

const layers = [
  {
    title: "Listen to the ground.",
    short: "Sense",
    copy: "Bring fragmented signals into a shared picture. Design around the people and places where information begins.",
  },
  {
    title: "Find the relationships.",
    short: "Connect",
    copy: "Link evidence to the decisions it informs. Architecture turns isolated information into context people can use.",
  },
  {
    title: "Leave room for judgement.",
    short: "Decide",
    copy: "Give teams a clearer basis for action. Human review, traceable evidence and accountable workflows close the loop.",
  },
];
const philosophy: ArchitectureProfile = {
  summary: "From field signals to informed human action.",
  nodes: [
    {
      id: "Sense",
      title: "Sense",
      subtitle: "Field signals",
      detail:
        "Local records, field observations and institutional data form a shared picture of the operating conditions.",
      asset: "capture",
    },
    {
      id: "Connect",
      title: "Connect",
      subtitle: "Evidence relationships",
      detail:
        "Role boundaries, evidence relationships and system integrations make the context around a decision visible.",
      asset: "network",
    },
    {
      id: "Decide",
      title: "Decide",
      subtitle: "Human judgement",
      detail:
        "Human review, recorded decisions and feedback keep people accountable for the actions a system supports.",
      asset: "review",
    },
  ],
  connections: ["Shared context", "Decision evidence"],
};
export function IntelligenceExplorer() {
  const [active, setActive] = useState(0);
  return (
    <section className="intelligence-section section-space">
      <div className="studio-container">
        <TerrainReveal className="section-heading">
          <div>
            <p className="eyebrow">How we think</p>
            <h2>
              Follow the evidence.
              <br />
              <span className="serif-accent">Keep the context.</span>
            </h2>
          </div>
          <p className="section-description">
            Useful intelligence comes from understanding how things relate.
            Explore the thinking behind our systems.
          </p>
        </TerrainReveal>
        <div className="explorer editorial-explorer">
          <div className="thinking-questions">
            {layers.map((item, i) => (
              <div
                key={item.short}
                className={
                  active === i
                    ? "thinking-question is-open"
                    : "thinking-question"
                }
              >
                <h3>
                  <button
                    type="button"
                    id={`thinking-trigger-${i}`}
                    aria-expanded={active === i}
                    aria-controls={`thinking-body-${i}`}
                    onClick={() => setActive(i)}
                  >
                    <span>{item.title}</span>
                    {active === i ? <Minus size={18} /> : <Plus size={18} />}
                  </button>
                </h3>
                <div
                  id={`thinking-body-${i}`}
                  role="region"
                  aria-labelledby={`thinking-trigger-${i}`}
                  hidden={active !== i}
                >
                  <p>{item.copy}</p>
                </div>
              </div>
            ))}
            <Link href="/sandbox/apex-nexus" className="text-link">
              See it in the APEX demo <ArrowUpRight size={17} />
            </Link>
            <span className="demo-note">
              Illustrative sandbox. No live institutional data.
            </span>
          </div>
          <ArchitectureScene
            compact
            profile={philosophy}
            label="VAIS design philosophy"
            activeId={layers[active].short}
            onSelect={(id) =>
              setActive(layers.findIndex((layer) => layer.short === id))
            }
          />
        </div>
      </div>
    </section>
  );
}
