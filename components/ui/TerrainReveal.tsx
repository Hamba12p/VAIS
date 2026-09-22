import type { ReactNode } from 'react';
// Preserve the layout contract without hiding content behind scroll effects.
export function TerrainReveal({ children, className = '' }: { children: ReactNode; className?: string; delay?: number }) { return <div className={className}>{children}</div>; }
