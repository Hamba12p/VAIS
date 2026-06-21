"use client";
import React, { useEffect, useState } from 'react';
import usePrefersReducedMotion from '@/lib/hooks/usePrefersReducedMotion';

export default function Cursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hover, setHover] = useState(false);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;

    function onMove(e: MouseEvent) {
      setPos({ x: e.clientX, y: e.clientY });
    }

    function onOver(e: Event) {
      const el = e.target as HTMLElement | null;
      if (!el) return;
      if (el.closest && el.closest('a,button,[data-cursor-interactive]')) setHover(true);
    }

    function onOut(e: Event) {
      const el = e.target as HTMLElement | null;
      if (!el) return;
      if (el.closest && el.closest('a,button,[data-cursor-interactive]')) setHover(false);
    }

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout', onOut);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
    };
  }, [reduced]);

  if (reduced) return null;

  return (
    <div data-cursor="true">
      <div
        className={`vais-cursor ${hover ? 'vais-cursor--hover' : ''}`}
        style={{ left: pos.x, top: pos.y }}
      />
    </div>
  );
}
