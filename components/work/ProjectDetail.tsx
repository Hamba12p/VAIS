import Link from 'next/link';
import type { Project } from '@/types/project';
import { projectProfiles } from '@/data/projectProfiles';
import { categories } from '@/data/categories';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { TechTag } from '@/components/ui/TechTag';
import { ApexNexusSandbox } from '@/components/apex/ApexNexusSandbox';
import { OperatingDiagram } from './OperatingDiagram';

export function ProjectDetail({ project }: { project: Project }) {
  const profile = projectProfiles[project.slug];
  return <article>
    <header className="border-b border-rule">
      <div className="container-vais py-12 md:py-16">
        <nav aria-label="Breadcrumb" className="mb-10 font-display text-sm text-green"><Link href="/work" className="underline underline-offset-4">All projects</Link><span aria-hidden="true"> / </span><span>{project.name}</span></nav>
        <div className="flex flex-wrap items-center justify-between gap-4"><p className="font-mono text-xs uppercase tracking-[.1em] text-green">{project.category.map(key => categories.find(c => c.key === key)?.label).join(' / ')}</p><StatusBadge status={project.status} /></div>
        <h1 className="mt-6 max-w-5xl break-words font-display text-[clamp(2.5rem,6.5vw,6rem)] leading-[1.05] tracking-[-.035em]">{project.name}</h1>
        <div className="mt-7 grid gap-6 md:grid-cols-[1.7fr_1fr] md:gap-16"><p className="max-w-3xl text-xl leading-relaxed md:text-2xl">{profile.purpose}</p><div className="border-l-2 border-green pl-5"><p className="font-display text-xs uppercase tracking-wider text-green">Designed for</p><p className="mt-2 text-lg">{profile.audience}</p></div></div>
      </div>
    </header>
    <section className="container-vais py-10 md:py-14" aria-label="Operating architecture"><OperatingDiagram profile={profile} name={project.name} /></section>
    <section className="container-vais grid gap-10 pb-14 md:grid-cols-2 md:gap-16">
      <div><h2 className="font-display text-2xl">The problem</h2><p className="mt-5 text-lg leading-relaxed text-ink/85">{project.problem}</p></div>
      <div><h2 className="font-display text-2xl">How the system responds</h2><p className="mt-5 text-lg leading-relaxed text-ink/85">{project.solution}</p></div>
    </section>
    <section className="container-vais pb-16"><div className="grid gap-8 border-y border-rule py-8 md:grid-cols-[.6fr_1.4fr]"><h2 className="font-display text-2xl">Engineering decisions</h2><div><p className="text-lg leading-relaxed text-ink/85">{project.architectureHighlight}</p><ul className="mt-6 space-y-2 text-base text-ink/80">{project.metrics?.map(metric => <li key={metric} className="border-l-2 border-rule pl-4">{metric}</li>)}</ul><h3 className="mt-8 font-display text-sm font-semibold">Technology</h3><div className="mt-3 flex flex-wrap gap-2">{project.stack.map(item => <TechTag key={item} label={item} />)}</div></div></div></section>
    {project.pairedWith && <aside className="container-vais pb-14"><p className="font-display text-lg">{project.slug === 'sentect' ? 'Explore the simulation side of this security architecture.' : 'Explore the detection side of this security architecture.'}</p><Link className="mt-3 inline-block font-display text-green underline underline-offset-4" href={'/work/'+project.pairedWith}>Read about {project.pairedWith.toUpperCase()} &#8594;</Link></aside>}
    {project.slug === 'apex-nexus' && <section className="container-vais pb-16" aria-label="APEX NEXUS demonstration"><p className="mb-5 text-base text-ink/80">Explore the role views below using simulated data.</p><ApexNexusSandbox compact /></section>}
    <section className="bg-field py-12 text-bond"><div className="container-vais flex flex-wrap items-center justify-between gap-6"><div><h2 className="font-display text-2xl text-bond">Discuss {project.name}</h2><p className="mt-2 text-bond/80">Talk through your workflow, integration needs, and deployment context.</p></div><Link href="/contact" className="bg-bond px-6 py-3 font-display text-sm font-semibold text-ink">Contact VAIS</Link></div></section>
  </article>;
}
