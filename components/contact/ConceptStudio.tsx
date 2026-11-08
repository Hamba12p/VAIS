"use client";
import { useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Package,
  Users,
  Workflow,
} from "lucide-react";
import { DemoWorkspace } from "./DemoWorkspace";
import {
  conceptEnquiry,
  demoPatterns,
  suggestDemo,
  type DemoConcept,
  type DemoKind,
} from "@/lib/demoConcept";

const choices: { kind: DemoKind; label: string; icon: typeof Workflow }[] = [
  { kind: "bookings", label: "Manage bookings", icon: CalendarDays },
  { kind: "inventory", label: "Track stock", icon: Package },
  { kind: "pipeline", label: "Follow up clients", icon: Users },
  { kind: "operations", label: "Coordinate a team", icon: Workflow },
];
export function ConceptStudio({
  onUseBrief,
}: {
  onUseBrief: (brief: string) => void;
}) {
  const [brief, setBrief] = useState("");
  const [name, setName] = useState("");
  const [choice, setChoice] = useState<DemoKind | "auto">("auto");
  const [concept, setConcept] = useState<DemoConcept>({
    kind: "operations",
    name: "",
    brief: "",
    revision: 0,
  });
  const [announcement, setAnnouncement] = useState("");
  const changed =
    concept.revision > 0 &&
    (concept.brief !== brief.trim() ||
      concept.name !== name.trim() ||
      (choice !== "auto" && choice !== concept.kind));
  const buildPreview = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const text = brief.trim();
    if (text.length < 20) {
      setAnnouncement(
        "Add a little more detail so we can suggest a useful starting point.",
      );
      return;
    }
    const kind = choice === "auto" ? suggestDemo(text) : choice;
    setConcept({
      kind,
      name: name.trim(),
      brief: text,
      revision: concept.revision + 1,
    });
    setAnnouncement(
      `${demoPatterns[kind].title} is ready to try. The sample has been reset.`,
    );
  };
  return (
    <section
      className="concept-studio studio-container"
      aria-labelledby="concept-studio-title"
    >
      <div className="concept-studio-heading">
        <div>
          <p className="eyebrow">A little less abstract</p>
          <h2 id="concept-studio-title">
            Put your idea
            <br />
            <span className="serif-accent">to the test.</span>
          </h2>
        </div>
        <p>
          Describe the work you want to improve. We’ll suggest a working
          starting point from four sample workflows, ready for you to explore.
        </p>
      </div>
      <div className="concept-studio-grid">
        <form onSubmit={buildPreview} className="concept-brief">
          <div className="brief-start">
            <span className="eyebrow">Start with your business</span>
            <span className="brief-line" />
          </div>
          <label htmlFor="concept-business">
            Business or organisation <span>optional</span>
          </label>
          <input
            id="concept-business"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={60}
            placeholder="Your business name"
            autoComplete="organization"
          />
          <label htmlFor="concept-needs">
            What would you like to work better?
          </label>
          <textarea
            id="concept-needs"
            value={brief}
            onChange={(e) => setBrief(e.target.value)}
            minLength={20}
            maxLength={1200}
            required
            rows={5}
            placeholder="We run a small shop. We need to see which products are running low and update stock as new deliveries arrive…"
            aria-describedby="concept-brief-hint"
          />
          <p className="brief-hint" id="concept-brief-hint">
            Describe the problem and who would use the system. {brief.length}
            /1200
          </p>
          <div className="brief-examples">
            <span>Or start with an example</span>
            <div>
              {choices.map(({ kind, label, icon: Icon }) => (
                <button
                  key={kind}
                  type="button"
                  onClick={() => {
                    setBrief(demoPatterns[kind].example);
                    setChoice("auto");
                    setAnnouncement(
                      `${demoPatterns[kind].title} example added. Build your preview to try it.`,
                    );
                  }}
                >
                  <Icon size={15} />
                  {label}
                  <ArrowUpRight size={13} />
                </button>
              ))}
            </div>
          </div>
          <label htmlFor="concept-workflow">Starting workflow</label>
          <select
            id="concept-workflow"
            value={choice}
            onChange={(e) => setChoice(e.target.value as DemoKind | "auto")}
          >
            <option value="auto">Suggest from my description</option>
            {choices.map(({ kind }) => (
              <option value={kind} key={kind}>
                {demoPatterns[kind].title}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="studio-button dark-button concept-build"
          >
            {concept.revision ? "Update my preview" : "Build my preview"}
            <ArrowRight size={18} />
          </button>
          <p className="concept-status" role="status">
            {announcement ||
              "Your brief stays in this tab until you send an enquiry."}
          </p>
        </form>
        <div className="concept-preview">
          <div className="concept-preview-heading">
            <span className="eyebrow">
              {concept.revision
                ? "Your starting concept"
                : "Try a sample workspace"}
            </span>
            <span className="preview-live">
              <i /> Interactive
            </span>
          </div>
          <DemoWorkspace key={concept.revision} concept={concept} />
          {changed && (
            <p className="preview-outdated">
              Your brief has changed. Update the preview to apply it.
            </p>
          )}
          <div className="concept-handoff">
            <div>
              <h3>Is this a useful starting point?</h3>
              <p>
                Carry your business needs and selected workflow into the enquiry
                below. We’ll discuss the details with you.
              </p>
            </div>
            <button
              type="button"
              className="studio-button concept-use"
              disabled={!concept.brief || changed}
              onClick={() => {
                onUseBrief(conceptEnquiry(concept));
                setAnnouncement(
                  "Your brief has been added to the enquiry form. Add your contact details to send it.",
                );
              }}
            >
              Use this brief
              <ArrowUpRight size={18} />
            </button>
          </div>
          <p className="concept-footnote">
            Illustrative previews, not connected business systems. Sample edits
            reset when you rebuild or leave this page.
          </p>
        </div>
      </div>
    </section>
  );
}
