import type { Metadata } from 'next';
import { FieldLog } from '@/components/ui/FieldLog';
import { projects } from '@/data/projects';
import { projectProfiles } from '@/data/projectProfiles';
export const metadata: Metadata = { title: 'Work', description: 'Explore VAIS software for security, government, community health, education, and payments in Uganda.' };
export default function WorkPage() {
  const items = projects.map(({ slug, name, category, status }) => ({ slug, name, category, status, purpose: projectProfiles[slug].purpose, audience: projectProfiles[slug].audience, process: projectProfiles[slug].process }));
  return <><section className="container-vais pb-10 pt-14 md:pt-20"><p className="font-mono text-xs uppercase tracking-[.14em] text-green">The VAIS portfolio</p><h1 className="mt-5 max-w-4xl font-display text-[clamp(2.75rem,6vw,5rem)] leading-[1.04]">Different institutions.<br />Specific systems.</h1><p className="mt-6 max-w-2xl text-xl text-ink/80">{projects.length} projects across nine sectors. Explore what each one does, who it serves, and how it is designed to work.</p><p className="mt-4 max-w-2xl text-sm text-ink/75">Each record shows its current portfolio status, from blueprint to deployed system.</p></section><FieldLog items={items} /></>;
}
