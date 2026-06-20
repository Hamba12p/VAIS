'use client';

import { useState } from 'react';
import { getProjectsByCategory } from '@/data/projects';
import { ProjectCard } from './ProjectCard';
import { CategoryFilter } from './CategoryFilter';

export function ProjectGrid() {
  const [category, setCategory] = useState('all');

  const projects = getProjectsByCategory(category);

  return (
    <section className="container-vais py-12">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-sora text-display-md text-vais-charcoal">Work</h3>
        <CategoryFilter onChange={setCategory} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>
    </section>
  );
}
