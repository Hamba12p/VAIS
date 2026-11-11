"use client";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Search,
  X,
  Pause,
  Play,
  SlidersHorizontal,
} from "lucide-react";
import { projects } from "@/data/projects";
import { categories } from "@/data/categories";
import { projectVisual, featuredStories } from "@/lib/projectVisuals";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { SignalField } from "@/components/ui/SignalField";
import { useMotionPreference } from "@/lib/hooks/useMotionPreference";
import { CompanyCompass } from "./CompanyCompass";

const shortName = (name: string) => name.split(": ")[0];
const wrap = (value: number) =>
  ((value % projects.length) + projects.length) % projects.length;

export function ProjectInstrument() {
  const [selected, setSelected] = useState(0);
  const [paused, setPaused] = useState(false);
  const [query, setQuery] = useState("");
  const [sector, setSector] = useState("all");
  const [indexOpen, setIndexOpen] = useState(false);
  const [sweeping, setSweeping] = useState(false);
  const { reduceMotion } = useMotionPreference();
  const dialog = useRef<HTMLDialogElement>(null);
  const indexButton = useRef<HTMLButtonElement>(null);
  const activeImage = useRef<HTMLDivElement>(null);
  const orbitRail = useRef<HTMLDivElement>(null);
  const swipe = useRef<{ x: number; index: number } | null>(null);
  const sweepTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const project = projects[selected];
  const visual = projectVisual(project);
  const story = featuredStories.find((s) => s.slug === project.slug);
  const filtered = projects.filter(
    (p) =>
      (sector === "all" || p.category.some((c) => c === sector)) &&
      `${p.name} ${p.tagline} ${p.stack.join(" ")}`
        .toLowerCase()
        .includes(query.trim().toLowerCase()),
  );
  const still = paused || reduceMotion;

  const choose = (index: number) => {
    const next = wrap(index);
    setSelected(next);
    if (!still) {
      setSweeping(true);
      if (sweepTimer.current) clearTimeout(sweepTimer.current);
      sweepTimer.current = setTimeout(() => setSweeping(false), 900);
    }
  };
  useEffect(
    () => () => {
      if (sweepTimer.current) clearTimeout(sweepTimer.current);
    },
    [],
  );
  useEffect(() => {
    if (!window.matchMedia("(max-width: 760px)").matches) return;
    const rail = orbitRail.current;
    const item = rail?.children[selected] as HTMLElement | undefined;
    if (rail && item)
      rail.scrollTo({
        left: item.offsetLeft - rail.clientWidth / 2 + item.clientWidth / 2,
        behavior: still ? "instant" : "smooth",
      });
  }, [selected, still]);
  useEffect(() => {
    if (!indexOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.current?.showModal();
    return () => {
      document.body.style.overflow = previous;
      if (dialog.current?.open) dialog.current.close();
    };
  }, [indexOpen]);
  const closeIndex = () => {
    setIndexOpen(false);
    indexButton.current?.focus();
  };

  return (
    <>
      <section
        className={`project-instrument ${still ? "instrument-still" : ""} ${sweeping ? "instrument-sweeping" : ""}`}
        aria-label="Interactive project collection"
      >
        <SignalField paused={still} />
        <div className="instrument-grain" aria-hidden="true" />
        <header className="instrument-heading studio-container">
          <div>
            <p className="eyebrow">The VAIS portfolio</p>
            <h1>
              Every system
              <br />
              <span className="serif-accent">has a signal.</span>
            </h1>
          </div>
          <div className="instrument-intro">
            <p>
              Different disciplines. Shared curiosity.
              <br />
              Explore the work from every angle.
            </p>
            <div className="instrument-tools">
              <button
                ref={indexButton}
                type="button"
                onClick={() => setIndexOpen(true)}
              >
                <SlidersHorizontal size={16} /> Open project index
              </button>
              <button
                type="button"
                className="instrument-pause"
                aria-label={
                  paused ? "Resume ambient motion" : "Pause ambient motion"
                }
                aria-pressed={paused}
                disabled={reduceMotion}
                onClick={() => setPaused((v) => !v)}
              >
                {paused || reduceMotion ? (
                  <Play size={15} />
                ) : (
                  <Pause size={15} />
                )}
              </button>
            </div>
          </div>
        </header>
        <div
          className="orbit-stage"
          role="group"
          aria-label="Project field. Use left and right arrow keys to select a project."
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.target !== e.currentTarget) return;
            if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
              e.preventDefault();
              choose(selected + (e.key === "ArrowRight" ? 1 : -1));
            }
            if (e.key === "Home" || e.key === "End") {
              e.preventDefault();
              choose(e.key === "Home" ? 0 : projects.length - 1);
            }
          }}
          onPointerDown={(e) => {
            if (e.target !== e.currentTarget) return;
            swipe.current = { x: e.clientX, index: selected };
            e.currentTarget.setPointerCapture(e.pointerId);
          }}
          onPointerMove={(e) => {
            if (swipe.current) {
              const delta = e.clientX - swipe.current.x;
              const next = wrap(swipe.current.index - Math.round(delta / 70));
              if (next !== selected) choose(next);
            }
          }}
          onPointerUp={() => {
            swipe.current = null;
          }}
          onPointerCancel={() => {
            swipe.current = null;
          }}
        >
          <div className="orbit-path orbit-path-outer" aria-hidden="true" />
          <div className="orbit-path orbit-path-inner" aria-hidden="true" />
          <div className="orbit-axis" aria-hidden="true" />
          <div ref={orbitRail} className="orbit-projects">
            {projects.map((p, i) => {
              const angle = ((i - selected) / projects.length) * Math.PI * 2;
              const x = Math.sin(angle) * 43;
              const y = Math.cos(angle) * 39;
              return (
                <button
                  type="button"
                  key={p.slug}
                  id={`orbit-project-${p.slug}`}
                  tabIndex={selected === i ? 0 : -1}
                  aria-label={`Select ${p.name}`}
                  aria-pressed={selected === i}
                  onClick={() => choose(i)}
                  onKeyDown={(e) => {
                    let next = i;
                    if (e.key === "ArrowRight") next = wrap(i + 1);
                    else if (e.key === "ArrowLeft") next = wrap(i - 1);
                    else if (e.key === "Home") next = 0;
                    else if (e.key === "End") next = projects.length - 1;
                    else return;
                    e.preventDefault();
                    e.stopPropagation();
                    choose(next);
                    document
                      .getElementById(`orbit-project-${projects[next].slug}`)
                      ?.focus({ preventScroll: true });
                  }}
                  className={`orbit-project ${selected === i ? "orbit-selected" : ""}`}
                  style={
                    {
                      "--orbit-x": `${x.toFixed(3)}%`,
                      "--orbit-y": `${y.toFixed(3)}%`,
                      "--orbit-tilt": `${(-Math.sin(angle) * 10).toFixed(3)}deg`,
                      "--orbit-depth": String(
                        Math.round((Math.cos(angle) + 1) * 8),
                      ),
                    } as CSSProperties
                  }
                >
                  <span className="orbit-project-image">
                    <Image
                      src={projectVisual(p).src}
                      alt=""
                      fill
                      sizes="(max-width: 760px) 100px, 120px"
                    />
                  </span>
                  <span className="orbit-project-name">
                    {shortName(p.name)}
                  </span>
                </button>
              );
            })}
          </div>
          <div className="orbit-focus" ref={activeImage}>
            <div className="focus-bracket bracket-left" aria-hidden="true" />
            <div className="focus-bracket bracket-right" aria-hidden="true" />
            <Link
              href={`/work/${project.slug}`}
              className="orbit-focus-link"
              aria-label={`Explore ${project.name}`}
            >
              <div className="focus-image" key={project.slug}>
                <Image
                  src={visual.src}
                  alt={visual.alt}
                  fill
                  priority={selected === 0}
                  sizes="(max-width: 760px) 90vw, 500px"
                  style={{ objectPosition: visual.position ?? "center" }}
                />
                {!still && (
                  <div className="shutter-echo" aria-hidden="true">
                    {Array.from({ length: 6 }, (_, i) => (
                      <span
                        key={i}
                        style={
                          {
                            "--slice": i,
                            backgroundImage: `url("${visual.src}")`,
                          } as CSSProperties
                        }
                      />
                    ))}
                  </div>
                )}
              </div>
              <span className="focus-open">
                Explore system <ArrowUpRight size={18} />
              </span>
            </Link>
            <span className="focus-image-note">{visual.caption}</span>
          </div>
          <span className="orbit-instruction">Drag the field to explore</span>
        </div>
        <div className="instrument-reading studio-container">
          <div className="instrument-project-copy">
            <span className="sr-only" aria-live="polite">
              {project.name} selected.
            </span>
            <div className="instrument-project-meta">
              <span>
                {categories
                  .find((c) => c.key === project.category[0])
                  ?.label.replaceAll("&", "and")}
              </span>
              <StatusBadge status={project.status} />
            </div>
            <h2>{shortName(project.name)}</h2>
            <p>{story?.copy ?? project.tagline}</p>
          </div>
          <div className="instrument-navigation">
            <div className="instrument-nav-top">
              <span className="eyebrow">Move through the collection</span>
              <div>
                <button
                  type="button"
                  aria-label="Previous project"
                  onClick={() => choose(selected - 1)}
                >
                  <ArrowLeft size={20} />
                </button>
                <button
                  type="button"
                  aria-label="Next project"
                  onClick={() => choose(selected + 1)}
                >
                  <ArrowRight size={20} />
                </button>
              </div>
            </div>
            <label className="sr-only" htmlFor="project-tuner">
              Select a project
            </label>
            <input
              id="project-tuner"
              className="project-tuner"
              type="range"
              min={0}
              max={projects.length - 1}
              value={selected}
              aria-valuetext={project.name}
              onChange={(e) => choose(Number(e.target.value))}
            />
            <div className="tuner-labels">
              <span>Public systems</span>
              <span>New possibilities</span>
            </div>
          </div>
        </div>
      </section>
      <section className="work-afterword studio-container">
        <p className="eyebrow">A practice, in progress</p>
        <div>
          <h2>
            Built for conditions.
            <br />
            <span className="serif-accent">Open to what comes next.</span>
          </h2>
          <p>
            Our portfolio includes implemented systems, active development and
            architectural blueprints. Each project carries its own maturity
            status. Bring us a challenge worth understanding.
          </p>
          <Link href="/contact" className="text-link">
            Work with VAIS <ArrowUpRight size={18} />
          </Link>
        </div>
        <CompanyCompass />
      </section>
      <dialog
        ref={dialog}
        className="project-index-dialog"
        aria-labelledby="project-index-title"
        onCancel={closeIndex}
        onClose={() => {
          if (indexOpen) closeIndex();
        }}
      >
        <div className="project-index-inner">
          <header>
            <div>
              <p className="eyebrow">A different way in</p>
              <h2 id="project-index-title">
                Find your <span className="serif-accent">signal.</span>
              </h2>
            </div>
            <button
              type="button"
              aria-label="Close project index"
              onClick={closeIndex}
            >
              <X size={25} />
            </button>
          </header>
          <div className="index-tools">
            <label className="index-search">
              <Search size={18} />
              <span className="sr-only">Search projects</span>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search a project, idea or technology"
                autoFocus
              />
            </label>
            <label className="index-sector">
              <span className="sr-only">Filter by sector</span>
              <select
                value={sector}
                onChange={(e) => setSector(e.target.value)}
              >
                <option value="all">All disciplines</option>
                {categories.map((c) => (
                  <option value={c.key} key={c.key}>
                    {c.label.replaceAll("&", "and")}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <p className="index-results" role="status">
            {filtered.length} {filtered.length === 1 ? "project" : "projects"}
          </p>
          <div className="index-list">
            {filtered.map((p) => (
              <button
                type="button"
                key={p.slug}
                onClick={() => {
                  choose(projects.indexOf(p));
                  closeIndex();
                }}
              >
                <span className="index-thumbnail">
                  <Image src={projectVisual(p).src} alt="" fill sizes="100px" />
                </span>
                <span className="index-project-label">
                  <strong>{p.name}</strong>
                  <span>
                    {categories
                      .find((c) => c.key === p.category[0])
                      ?.label.replaceAll("&", "and")}
                  </span>
                </span>
                <StatusBadge status={p.status} />
                <ArrowUpRight size={22} />
              </button>
            ))}
          </div>
          {filtered.length === 0 && (
            <div className="index-empty">
              <p>No projects match this search.</p>
              <button
                type="button"
                className="text-link"
                onClick={() => {
                  setQuery("");
                  setSector("all");
                }}
              >
                Reset search <X size={15} />
              </button>
            </div>
          )}
        </div>
      </dialog>
    </>
  );
}
