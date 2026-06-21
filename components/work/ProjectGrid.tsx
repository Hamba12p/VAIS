'use client';

import { useState } from 'react';
import { getProjectsByCategory } from '@/data/projects';
import { ProjectCard } from './ProjectCard';
import Reveal from '@/components/ui/Reveal';
import { getPatternedImage } from '@/lib/utils';
import { CategoryFilter } from './CategoryFilter';

export function ProjectGrid() {
  const [category, setCategory] = useState('all');

  const projects = getProjectsByCategory(category);

  return (
    <section className="container-vais py-12">
      <div className="mb-6">
        <h3 className="font-sora text-display-md text-vais-charcoal mb-4">Work</h3>
        <div>
          <CategoryFilter onChange={setCategory} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((p, i) => (
          <Reveal key={p.slug} delay={i * 0.04}>
            <ProjectCard project={p} image={getPatternedImage(i)} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
