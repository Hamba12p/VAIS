'use client';

import { useState } from 'react';
import { categories } from '@/data/categories';

export function CategoryFilter({ onChange }: { onChange: (key: string) => void }) {
  const [active, setActive] = useState('all');

  return (
    <div className="flex flex-wrap gap-2">
      <button
        className={`text-sm px-3 py-1 rounded-vais border transition-colors duration-150 ${active === 'all' ? 'bg-[rgb(var(--color-primary))] text-white border-transparent' : 'bg-transparent text-[rgb(var(--color-muted))] border-[rgba(0,0,0,0.06)] hover:bg-[rgb(var(--color-primary)/0.08)] hover:text-[rgb(var(--color-charcoal))]'}`}
        onClick={() => { setActive('all'); onChange('all'); }}
      >
        All
      </button>
      {categories.map((c) => (
        <button
          key={c.key}
          className={`text-sm px-3 py-1 rounded-vais border transition-colors duration-150 ${active === c.key ? 'bg-[rgb(var(--color-primary))] text-white border-transparent' : 'bg-transparent text-[rgb(var(--color-muted))] border-[rgba(0,0,0,0.06)] hover:bg-[rgb(var(--color-primary)/0.08)] hover:text-[rgb(var(--color-charcoal))]'}`}
          onClick={() => { setActive(c.key); onChange(c.key); }}
        >
          {c.label}
        </button>
      ))}
    </div>
  );
}
