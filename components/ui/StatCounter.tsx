"use client";
import React, { useEffect, useRef, useState } from 'react';
import usePrefersReducedMotion from '@/lib/hooks/usePrefersReducedMotion';

export default function StatCounter({ value, suffix = '', duration = 1200, className = '' }: { value: number; suffix?: string; duration?: number; className?: string }) {
  const [current, setCurrent] = useState(0);
  const ref = useRef<HTMLDivElement | null>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) {
      setCurrent(value);
      return;
    }

    if (reduced) {
      setCurrent(value);
      return;
    }

    let started = false;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !started) {
          started = true;
          const start = performance.now();
          const from = 0;
          const to = value;
          function step(now: number) {
            const t = Math.min(1, (now - start) / duration);
            const eased = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t; // smoothstep-ish
            setCurrent(Math.floor(from + (to - from) * eased));
            if (t < 1) requestAnimationFrame(step);
          }
          requestAnimationFrame(step);
        }
      });
    }, { threshold: 0.25 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [value, duration, reduced]);

  return (
    <div ref={ref} className={className} aria-hidden>
      {current.toLocaleString()}{suffix}
    </div>
  );
}
