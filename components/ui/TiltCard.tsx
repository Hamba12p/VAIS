"use client";
import React, { useRef, useEffect } from 'react';
import usePrefersReducedMotion from '@/lib/hooks/usePrefersReducedMotion';

export default function TiltCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;

    function onMove(e: MouseEvent) {
      const node = ref.current;
      if (!node) return;
      const r = node.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      const rx = (py - 0.5) * 6; // rotateX
      const ry = (px - 0.5) * -6; // rotateY
      const tz = 1 + Math.abs(px - 0.5) * 6;
      node.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(${tz}px)`;
    }

    function onLeave() {
      const node = ref.current;
      if (node) node.style.transform = '';
    }

    const node = ref.current;
    if (node) {
      node.addEventListener('mousemove', onMove);
      node.addEventListener('mouseleave', onLeave);
    }
    return () => {
      const node = ref.current;
      if (node) {
        node.removeEventListener('mousemove', onMove);
        node.removeEventListener('mouseleave', onLeave);
      }
    };
  }, [reduced]);

  return (
    <div ref={ref} className={`transform-gpu transition-transform duration-300 will-change-transform ${className}`}>
      {children}
    </div>
  );
}
