import Link from "next/link";
import { ArrowDown, ArrowUpRight, ArrowRight } from "lucide-react";
import { Hero } from "@/components/home/Hero";
import { IntelligenceExplorer } from "@/components/home/IntelligenceExplorer";
import { ProjectImage } from "@/components/work/ProjectImage";
import { TerrainReveal } from "@/components/ui/TerrainReveal";
import { projects } from "@/data/projects";

const selections = [
  {
    slug: "apex-nexus",
    sector: "Government intelligence",
    title: "Clarity at the centre.",
    copy: "Connecting directives, field evidence and human-reviewed briefings in one decision environment.",
    kind: "apex",
  },
  {
    slug: "ugems",
    sector: "Education infrastructure",
    title: "Continuity at the edge.",
    copy: "An offline-first architecture that puts the school first, even when the network comes last.",
    kind: "education",
  },
  {
    slug: "sentect",
    sector: "Security intelligence",
    title: "See the connections.",
    copy: "A trust-graph blueprint for understanding threats across previously disconnected systems.",
    kind: "security",
  },
] as const;

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
          <p className="eyebrow section-kicker">Our conviction</p>
        </TerrainReveal>
        <TerrainReveal delay={0.1}>
          <h2>
            Intelligence means nothing
            <br className="desktop-break" /> until it{" "}
            <span className="serif-accent">works in your world.</span>
          </h2>
          <div className="intro-body">
            <p>
              Complex institutions don’t need another layer of complexity. They
              need systems that make the whole picture clearer, and the next
              decision better.
            </p>
            <p>
              We design applied intelligence around the conditions that matter:
              your people, your infrastructure and the decisions you’re
              accountable for.
            </p>
          </div>
          <Link href="/about" className="text-link">
            Meet the practice <ArrowUpRight size={17} />
          </Link>
        </TerrainReveal>
      </section>
      <section className="selected-work section-space" id="selected-work">
        <div className="studio-container">
          <TerrainReveal className="section-heading">
            <div>
              <p className="eyebrow">Selected work</p>
              <h2>
                Ambition, <span className="serif-accent">made tangible.</span>
              </h2>
            </div>
            <Link href="/work" className="text-link">
              Explore all {projects.length} systems <ArrowUpRight size={18} />
            </Link>
          </TerrainReveal>
          <div className="selected-grid">
            {selections.map((item, i) => {
              const project = projects.find((p) => p.slug === item.slug)!;
              return (
                <TerrainReveal key={item.slug} delay={i * 0.08}>
                  <Link href={`/work/${item.slug}`} className="system-card">
                    <div className={`system-card-art art-${item.kind}`}>
                      <div className="card-art-meta">
                        <span>{item.sector}</span>
                        <ArrowUpRight size={22} />
                      </div>
                      <ProjectImage
                        project={project}
                        sizes="(max-width: 760px) 100vw, 33vw"
                      />
                      <span className="art-caption">{project.name}</span>
                    </div>
                    <div className="system-card-copy">
                      <div className="card-status">
                        <span>{project.name}</span>
                        <span className="maturity">
                          <i />
                          {project.status === "in-development"
                            ? "In development"
                            : project.status === "deployed"
                              ? "Deployed"
                              : "Blueprint"}
                        </span>
                      </div>
                      <h3>{item.title}</h3>
                      <p>{item.copy}</p>
                      <span className="card-read">
                        Explore the system <ArrowRight size={16} />
                      </span>
                    </div>
                  </Link>
                </TerrainReveal>
              );
            })}
          </div>
          <p className="portfolio-note">
            A portfolio of implemented systems, active development and
            architectural blueprints. Each project carries its own maturity
            status.
          </p>
        </div>
      </section>
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
