"use client";
import React, { useEffect, useState } from 'react';

export default function ScrollProgress() {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    function onScroll() {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      const p = h > 0 ? (window.scrollY / h) * 100 : 0;
      setPct(Math.min(100, Math.max(0, p)));
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div aria-hidden className="fixed inset-x-0 top-0 h-0.5 z-50">
      <div style={{ width: `${pct}%` }} className="h-0.5 bg-[rgb(var(--color-primary))] transition-width duration-150" />
    </div>
  );
}
