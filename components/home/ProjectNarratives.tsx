import Image from 'next/image';
import { projects } from '@/data/projects';
import { TerrainSceneProject } from '@/components/three/TerrainSceneProject';
import StatCounter from '@/components/ui/StatCounter';
import { TerrainReveal } from '@/components/ui/TerrainReveal';
import { markerFor, metricNumber, vignetteFor } from '@/lib/projectPresentation';

const selected=['apex-nexus','ugems','sentect','nk-uzima'];
export function ProjectNarratives(){const items=selected.map(slug=>projects.find(p=>p.slug===slug)!).filter(Boolean);return <section className="border-t border-hairline">
  {items.map((project,index)=><article key={project.slug} className="container-vais grid min-h-[760px] items-center gap-10 border-b border-hairline py-20 lg:grid-cols-2 lg:py-28">
    <TerrainReveal className={index%2?'lg:order-2':''}>
      <p className="font-mono text-[10px] uppercase tracking-[.26em] text-clay">Contour {String(index+1).padStart(2,'0')} / {project.name}</p>
      <h2 className="mt-5 font-display text-4xl leading-[.96] md:text-6xl">{project.tagline}</h2>
      <div className="mt-8 grid gap-6 text-[1.05rem] leading-relaxed text-mist sm:grid-cols-2"><div><p className="mb-2 font-mono text-[10px] uppercase tracking-[.22em] text-terrain-deep">Ground condition</p><p>{project.problem}</p></div><div><p className="mb-2 font-mono text-[10px] uppercase tracking-[.22em] text-terrain-deep">System response</p><p>{project.solution}</p></div></div>
    </TerrainReveal>
    <TerrainReveal delay={.12} className={`relative min-h-[560px] overflow-hidden bg-dusk shadow-ridge ${index%2?'lg:order-1':''}`}>
      <Image src={`/images/contour/vignette-${vignetteFor(project)}.svg`} alt={project.name + ' field context'} fill className="object-cover" sizes="(min-width:1024px) 50vw,100vw"/>
      <div className="absolute inset-0 bg-gradient-to-t from-dusk via-dusk/15 to-transparent"/>
      <TerrainSceneProject kind={markerFor(project)} className="absolute inset-0 h-full w-full mix-blend-soft-light opacity-30"/>
      <div className="absolute inset-x-6 bottom-6 border-t border-canvas/35 pt-5 text-canvas sm:inset-x-10 sm:bottom-10"><p className="font-mono text-[10px] uppercase tracking-[.2em] text-canvas/65">Measured reach</p><StatCounter value={metricNumber(project)} suffix={project.metrics?.[0].includes('+')?'+':''} className="mt-2 font-display text-5xl"/><p className="mt-1 max-w-sm text-sm text-canvas/75">{project.metrics?.[0]}</p></div>
    </TerrainReveal>
  </article>)}
</section>}
