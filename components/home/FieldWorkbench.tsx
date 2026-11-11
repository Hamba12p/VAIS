"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowRight, RotateCcw, Layers3 } from "lucide-react";
import { DimensionalAsset } from "@/components/ui/DimensionalAsset";

const cases = [
  {
    name: "School day",
    slug: "ugems",
    context:
      "A teacher records attendance. Follow the record from the classroom to the school office.",
    condition: "Disconnect the network",
    input: "Classroom attendance record",
    normal: [
      "The record is captured at the school with its class and date.",
      "The local record can join the school’s shared view through synchronisation.",
      "The school office can review the shared record and resolve discrepancies.",
    ],
    interrupted: [
      "Capture continues locally. A missing connection does not need to stop the record being made.",
      "The local record waits in a sync queue. The shared view is not yet up to date.",
      "The office needs to see the last successful sync, so an old total is not mistaken for today’s attendance.",
    ],
    outcome: "Local work continues; the shared view waits.",
    lesson:
      "Offline-first design separates the ability to do the work from the ability to share it.",
  },
  {
    name: "Public briefing",
    slug: "apex-nexus",
    context:
      "A field observation is used in a draft briefing. Inspect where evidence and human review enter the process.",
    condition: "Flag missing evidence",
    input: "Field observation → draft briefing",
    normal: [
      "A field observation arrives with its supporting record.",
      "The observation is linked to the directive it informs, keeping its source available.",
      "A reviewer examines the draft before it is eligible for release. Generation is not approval.",
    ],
    interrupted: [
      "An observation arrives without enough supporting evidence.",
      "The missing source stays visible beside the claim. A polished summary cannot fill that gap.",
      "The reviewer requests evidence. The illustrative briefing remains a draft.",
    ],
    outcome: "The claim stays open; the briefing stays in review.",
    lesson:
      "A decision workflow needs a way to say that the evidence is not yet enough.",
  },
  {
    name: "Security signal",
    slug: "sentect",
    context:
      "Related events appear in separate logs. Explore why the proposed graph keeps their relationships visible.",
    condition: "Isolate the signals",
    input: "Account event + network event",
    normal: [
      "Two illustrative events enter as separate observations.",
      "A shared relationship makes it possible to inspect the events together.",
      "An analyst reviews the relationship. An unusual pattern is a lead, not a confirmed incident.",
    ],
    interrupted: [
      "The same two observations are available in separate logs.",
      "Without their shared relationship, each event remains an isolated fragment.",
      "The analyst needs additional context before deciding whether the pattern warrants investigation.",
    ],
    outcome: "The observations remain; their shared context is missing.",
    lesson:
      "A graph can organise evidence for investigation. It does not establish that an attack occurred.",
  },
] as const;
const stageIds = ["Sense", "Connect", "Decide"];

export function FieldWorkbench({
  active,
  onStage,
}: {
  active: number;
  onStage: (index: number) => void;
}) {
  const [scenario, setScenario] = useState(0);
  const [interrupted, setInterrupted] = useState(false);
  const [separated, setSeparated] = useState(false);
  const item = cases[scenario];
  const details = interrupted ? item.interrupted : item.normal;
  return (
    <div
      className={`field-workbench ${interrupted ? "condition-active" : ""} ${separated ? "theatre-separated" : ""}`}
    >
      <header>
        <p className="eyebrow">VAIS / Open systems lab</p>
        <span>
          <i className="lab-indicator" /> Illustrative model
        </span>
      </header>
      <div
        className="scenario-select"
        aria-label="Choose an illustrative scenario"
      >
        {cases.map((entry, i) => (
          <button
            type="button"
            key={entry.slug}
            aria-label={entry.name}
            aria-pressed={scenario === i}
            onClick={() => {
              setScenario(i);
              setInterrupted(false);
              setSeparated(false);
              onStage(0);
            }}
          >
            <span className="scenario-index">0{i + 1}</span>
            {entry.name}
            <span className="scenario-select-dot" />
          </button>
        ))}
      </div>
      <p className="scenario-context">{item.context}</p>
      <div className="scenario-condition">
        <span className="eyebrow">{item.input}</span>
        <button
          type="button"
          aria-pressed={interrupted}
          onClick={() => setInterrupted((v) => !v)}
        >
          <span className="condition-switch" />
          {item.condition}
        </button>
      </div>
      <div className="workbench-theatre">
        <div className="theatre-topline">
          <span className="eyebrow">
            Figure 0{active + 1} / {stageIds[active]}
          </span>
          <button
            type="button"
            className="theatre-layer-control"
            aria-pressed={separated}
            onClick={() => setSeparated((v) => !v)}
          >
            <Layers3 size={15} />
            {separated ? "Assemble object" : "Inspect structure"}
          </button>
        </div>
        <div className="theatre-figure" key={`${scenario}-${active}`}>
          <span className="theatre-orbit" />
          <span className="theatre-orbit theatre-orbit-two" />
          <span className="theatre-axis" />
          <DimensionalAsset
            kind={(["capture", "network", "review"] as const)[active]}
            className="theatre-object"
          />
          <span className="theatre-object-caption">
            {["The source", "The relationship", "The judgement"][active]}
          </span>
          <span className="theatre-cross" aria-hidden="true">
            +
          </span>
        </div>
        <div className="theatre-stages" aria-label="Explore the model stages">
          {stageIds.map((stage, i) => (
            <button
              type="button"
              key={stage}
              aria-label={`Inspect ${stage}`}
              aria-pressed={active === i}
              onClick={() => onStage(i)}
            >
              <span>0{i + 1}</span>
              <strong>{stage}</strong>
              <small>
                {["At the source", "Across the system", "With a person"][i]}
              </small>
            </button>
          ))}
        </div>
        <div className="stage-detail" aria-live="polite">
          <span className="eyebrow">What happens here</span>
          <h4 className="sr-only">{stageIds[active]}</h4>
          <p>{details[active]}</p>
        </div>
      </div>
      <div className="scenario-result" aria-live="polite">
        <p className="eyebrow">
          {interrupted ? "Under this condition" : "The design intention"}
        </p>
        <h4>{interrupted ? item.outcome : item.lesson}</h4>
        {interrupted && <p>{item.lesson}</p>}
      </div>
      <footer>
        <button type="button" onClick={() => onStage((active + 1) % 3)}>
          Follow the next step <ArrowRight size={16} />
        </button>
        <button
          type="button"
          aria-label="Reset scenario"
          onClick={() => {
            setInterrupted(false);
            setSeparated(false);
            onStage(0);
          }}
        >
          <RotateCcw size={16} />
        </button>
        <Link href={`/work/${item.slug}`}>Explore the system ↗</Link>
      </footer>
    </div>
  );
}
