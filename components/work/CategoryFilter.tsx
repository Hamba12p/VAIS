'use client';

import { useState } from 'react';
import { categories } from '@/data/categories';

export function CategoryFilter({ onChange }: { onChange: (key: string) => void }) {
  const [active, setActive] = useState('all');

  return (
    <div className="flex flex-wrap gap-2">
      <button
        className={`text-sm px-3 py-1 rounded-vais ${active === 'all' ? 'bg-vais-green text-white' : 'bg-transparent text-vais-slate border border-vais-border'}`}
        onClick={() => { setActive('all'); onChange('all'); }}
      >
        All
      </button>
      {categories.map((c) => (
        <button
          key={c.key}
          className={`text-sm px-3 py-1 rounded-vais ${active === c.key ? 'bg-vais-green text-white' : 'bg-transparent text-vais-slate border border-vais-border'}`}
          onClick={() => { setActive(c.key); onChange(c.key); }}
        >
          {c.label}
        </button>
      ))}
    </div>
  );
}
