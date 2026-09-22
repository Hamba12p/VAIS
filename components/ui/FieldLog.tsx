'use client';
import Link from 'next/link';
import { useState } from 'react';
import { categories } from '@/data/categories';
import type { Project } from '@/types/project';
import { StatusBadge } from './StatusBadge';
export type ProjectListItem = Pick<Project, 'slug' | 'name' | 'category' | 'status'> & { purpose: string; audience: string; process: string };
export function FieldLog({ items }: { items: ProjectListItem[] }) {
  const [sector, setSector] = useState('all');
  const rows = sector === 'all' ? items : items.filter(p => p.category.some(c => c === sector));
  return <section className="container-vais pb-20" aria-label="Project catalogue">
    <div className="flex flex-wrap items-end justify-between gap-5 border-y border-rule py-5">
      <label className="font-display text-sm">Filter projects by sector
        <select value={sector} onChange={event => setSector(event.target.value)} className="mt-2 block min-h-11 w-full border border-green bg-bond px-3 py-2 text-ink sm:min-w-72">
          <option value="all">All sectors ({items.length})</option>
          {categories.map(c => <option key={c.key} value={c.key}>{c.label} ({items.filter(p => p.category.includes(c.key)).length})</option>)}
        </select>
      </label>
      <p role="status" className="font-display text-sm text-ink/75">{rows.length} {rows.length === 1 ? 'system' : 'systems'} shown</p>
    </div>
    <div>{rows.map(project => <article key={project.slug} className="grid gap-5 border-b border-rule py-8 md:grid-cols-[.65fr_1.6fr] lg:grid-cols-[.65fr_1.6fr_.8fr] lg:gap-10">
      <div><p className="mb-3 font-display text-xs uppercase tracking-wider text-green">{project.category.map(key => categories.find(c => c.key === key)?.label).join(' / ')}</p><StatusBadge status={project.status} /></div>
      <div><h2 className="font-display text-2xl leading-tight sm:text-3xl"><Link href={'/work/'+project.slug} className="underline decoration-rule underline-offset-4 hover:decoration-green">{project.name} <span className="text-green" aria-hidden="true">?</span></Link></h2><p className="mt-3 max-w-2xl text-lg leading-relaxed text-ink/80">{project.purpose}</p></div>
      <div className="border-l-2 border-green pl-4 md:col-start-2 lg:col-start-auto"><p className="font-display text-sm font-semibold">{project.process}</p><p className="mt-2 text-sm text-ink/75">{project.audience}</p></div>
    </article>)}</div>
  </section>;
}
