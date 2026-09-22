'use client';
import Link from 'next/link';
import { useState } from 'react';
import { projects } from '@/data/projects';
import { categories } from '@/data/categories';
import { SectorIcon } from './SectorIcon';
import { StatusBadge } from './StatusBadge';
import { TerrainReveal } from './TerrainReveal';

export function FieldLog({limit}:{limit?:number}){const [open,setOpen]=useState<string|null>(null);const rows=limit?projects.slice(0,limit):projects;return <section className="container-vais py-20 md:py-28">
  <TerrainReveal className="mb-10 grid gap-5 border-t border-hairline pt-6 lg:grid-cols-[.7fr_1.3fr]">
    <p className="font-mono text-[10px] uppercase tracking-[.26em] text-clay">Field log / {String(rows.length).padStart(2,'0')} records</p>
    <div><h2 className="font-display text-4xl leading-none md:text-6xl">Work measured against <span className="text-clay">real ground.</span></h2><p className="mt-5 max-w-2xl text-lg leading-relaxed text-mist">Open any survey entry to inspect the system architecture behind the field result.</p></div>
  </TerrainReveal>
  <div className="border-y border-hairline">
    {rows.map((project,index)=>{const expanded=open===project.slug;const category=categories.find(c=>project.category.includes(c.key));return <TerrainReveal key={project.slug} delay={Math.min(index,5)*.06}>
      <article className="border-b border-hairline last:border-b-0">
        <button type="button" onClick={()=>setOpen(expanded?null:project.slug)} aria-expanded={expanded} className="grid w-full grid-cols-[3.5rem_1fr_auto] items-center gap-3 py-5 text-left md:grid-cols-[5rem_2fr_1fr_1fr_auto] md:gap-6">
          <span className="font-mono text-[11px] text-clay">N-{String(index+1).padStart(2,'0')}</span>
          <span className="flex items-center gap-4"><SectorIcon sector={project.category[0]}/><span><strong className="block font-display text-xl font-medium md:text-2xl">{project.name}</strong><span className="mt-1 hidden text-sm text-mist sm:block">{category?.label}</span></span></span>
          <span className="hidden text-sm leading-snug text-mist md:block">{project.metrics?.[0]}</span><StatusBadge status={project.status} project={project}/><span className="font-mono text-xl text-clay" aria-hidden>{expanded?'−':'+'}</span>
        </button>
        <div inert={!expanded} className={`grid overflow-hidden transition-[grid-template-rows] duration-500 ease-terrain ${expanded?'grid-rows-[1fr]':'grid-rows-[0fr]'}`}><div className="min-h-0"><div className="grid gap-6 pb-7 pl-[4.25rem] pr-4 md:grid-cols-[2fr_1fr] md:pl-[11rem]">
          <p className="max-w-4xl text-base leading-relaxed text-mist">{project.architectureHighlight}</p><Link href={`/work/${project.slug}`} className="organic-outline self-start px-5 py-3 text-center font-mono text-[10px] uppercase tracking-[.18em] text-terrain-deep">Read full field note ↗</Link>
        </div></div></div>
      </article></TerrainReveal>})}
  </div>
</section>}
