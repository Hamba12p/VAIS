import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Hero } from "@/components/home/Hero";
import { IntelligenceExplorer } from "@/components/home/IntelligenceExplorer";
import { SelectedDossiers } from "@/components/home/SelectedDossiers";
import { TerrainReveal } from "@/components/ui/TerrainReveal";
import { AtlasMark } from "@/components/ui/AtlasMark";

export default function Home() {
  return (
    <>
      <Hero />
      <section className="context-strip">
        <div className="studio-container">
          <span className="eyebrow">
            Built in Kampala. Thinking in systems.
          </span>
          <div>
            <span>Government</span>
            <span>Institutions</span>
            <span>Enterprise</span>
          </div>
          <ArrowDown size={18} aria-hidden="true" />
        </div>
      </section>
      <section
        className="studio-container introduction section-space"
        id="approach"
      >
        <TerrainReveal>
          <p className="eyebrow section-kicker">01 / A point of view</p>
          <AtlasMark />
          <p className="conviction-caption">
            Close to the ground.
            <br />
            Open to possibility.
          </p>
        </TerrainReveal>
        <TerrainReveal delay={0.1}>
          <h2>
            Intelligence, with
            <br />
            its feet <span className="serif-accent">on the ground.</span>
          </h2>
          <div className="intro-body">
            <p>
              A school day carries on when the connection drops. A field team
              still has something to report. We care about those ordinary
              moments, because that is where a system earns its place.
            </p>
            <p>
              From Kampala, we work on the space between an ambitious idea and
              something people can actually use. Bring the messy brief. We will
              take the time to understand what needs to work.
            </p>
          </div>
          <Link href="/about" className="text-link">
            Meet the practice <ArrowUpRight size={17} />
          </Link>
        </TerrainReveal>
      </section>
      <SelectedDossiers />
      <IntelligenceExplorer />
      <section className="studio-container section-space principles-section">
        <TerrainReveal>
          <p className="eyebrow">Built for reality</p>
          <h2>
            The hard parts
            <br />
            are <span className="serif-accent">the starting point.</span>
          </h2>
          <p className="principles-intro">
            The best architecture respects the environment it enters. These are
            the questions we bring to every system.
          </p>
          <Link href="/about" className="text-link">
            How we think <ArrowUpRight size={18} />
          </Link>
        </TerrainReveal>
        <div className="principle-list">
          {[
            [
              "01",
              "What happens when the network doesn’t?",
              "Design for continuity. Local-first workflows and deliberate synchronisation keep the edge in the picture.",
            ],
            [
              "02",
              "Can the decision be explained?",
              "Keep evidence close to action. Human review and traceable reasoning belong inside the workflow.",
            ],
            [
              "03",
              "Does it fit the institution?",
              "Work with existing infrastructure, responsibilities and constraints. Integration is part of the design.",
            ],
          ].map(([n, title, copy]) => (
            <TerrainReveal key={n}>
              <article>
                <span className="principle-number" aria-hidden="true">
                  {n}
                </span>
                <div>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </div>
              </article>
            </TerrainReveal>
          ))}
        </div>
      </section>
      <section className="engagement-banner">
        <div className="studio-container">
          <p className="eyebrow">The next system starts with a conversation</p>
          <Link href="/contact">
            <h2>
              Bring us your
              <br />
              <span className="serif-accent">hardest question.</span>
            </h2>
            <span className="large-arrow">
              <ArrowUpRight aria-hidden="true" />
            </span>
          </Link>
          <p>Let’s find the intelligence beneath the complexity.</p>
        </div>
      </section>
    </>
  );
}
