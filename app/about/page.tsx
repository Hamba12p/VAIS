import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { TerrainReveal } from "@/components/ui/TerrainReveal";
import { AtlasMark } from "@/components/ui/AtlasMark";
export const metadata: Metadata = {
  title: "The practice",
  description:
    "An independent applied intelligence practice in Makerere, Kampala. Systems shaped by real operating conditions.",
};
export default function AboutPage() {
  return (
    <>
      <section className="page-heading studio-container">
        <p className="eyebrow">The practice / Kampala, Uganda</p>
        <h1>
          Close to the ground.
          <br />
          <span className="serif-accent">Open to possibility.</span>
        </h1>
        <div className="page-heading-bottom">
          <p>
            VAIS is an independent applied-intelligence practice. We work at the
            intersection of institutional challenges, thoughtful architecture
            and the realities of implementation.
          </p>
          <span className="eyebrow">00.3476° N / 32.5825° E</span>
        </div>
      </section>
      <section className="about-art">
        <Image
          src="/images/Asset 5.png"
          alt="The VAIS mark engraved into a textured graphite surface"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="studio-container">
          <span className="eyebrow">VAIS / Makerere, Kampala</span>
          <p>
            Complexity is the terrain.
            <br />
            <span className="serif-accent">Clarity is the work.</span>
          </p>
        </div>
      </section>
      <section className="studio-container section-space introduction">
        <TerrainReveal>
          <p className="eyebrow">Our perspective</p>
          <AtlasMark />
        </TerrainReveal>
        <TerrainReveal>
          <h2>
            Good systems begin
            <br />
            with <span className="serif-accent">better questions.</span>
          </h2>
          <div className="about-prose">
            <p>
              There is usually a person holding the process together before
              there is a platform: the administrator reconciling records, or the
              colleague calling to check a detail. We want to understand their
              day before deciding what to build.
            </p>
            <p>
              Based in Makerere, Kampala, we bring local operating conditions
              into the architecture. A connection can drop. An existing tool may
              still be useful. A decision may need a second pair of eyes. Those
              details deserve room in the design.
            </p>
            <p>
              Our portfolio spans working implementations, active development
              and architectural blueprints. We show those distinctions because a
              clear view of what exists is the beginning of a useful
              conversation.
            </p>
          </div>
        </TerrainReveal>
      </section>
      <section className="approach-section section-space">
        <div className="studio-container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">The working relationship</p>
              <h2>
                From the first question
                <br />
                to <span className="serif-accent">a considered system.</span>
              </h2>
            </div>
          </div>
          <div className="approach-grid">
            {[
              [
                "01",
                "Understand the conditions",
                "Map the people, decisions, infrastructure and constraints. Agree on the problem before designing the solution.",
              ],
              [
                "02",
                "Make the architecture legible",
                "Define the system boundaries, evidence flows and responsibilities. Make the trade-offs visible.",
              ],
              [
                "03",
                "Build, examine, refine",
                "Develop against the agreed use case. Test assumptions, document limits and use feedback to shape the next step.",
              ],
            ].map(([n, title, copy]) => (
              <TerrainReveal key={n}>
                <span className="approach-number" aria-hidden="true">
                  {n}
                </span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </TerrainReveal>
            ))}
          </div>
        </div>
      </section>
      <section className="studio-container about-contact section-space">
        <div>
          <p className="eyebrow">Let’s work through it</p>
          <h2>
            Local understanding.
            <br />
            <span className="serif-accent">Expansive thinking.</span>
          </h2>
        </div>
        <Link href="/contact" className="studio-button dark-button">
          Start a conversation <ArrowUpRight size={20} />
        </Link>
      </section>
    </>
  );
}
