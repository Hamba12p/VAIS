"use client";
import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import usePrefersReducedMotion from '@/lib/hooks/usePrefersReducedMotion';
 
type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: React.ReactNode;
  href?: string;
  className?: string;
};
 
export default function MagneticButton({ children, className = '', href, ...rest }: Props) {
  const ref = useRef<HTMLButtonElement | HTMLAnchorElement | null>(null);
  const reduced = usePrefersReducedMotion();
 
  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;
 
    function handleMove(e: Event) {
      const node = ref.current;
      if (!node) return;
      const mouseEvent = e as MouseEvent;
      const r = node.getBoundingClientRect();
      const dx = mouseEvent.clientX - (r.left + r.width / 2);
      const dy = mouseEvent.clientY - (r.top + r.height / 2);
      const dist = Math.sqrt(dx * dx + dy * dy);
      const max = 18;
      const strength = Math.max(0, 1 - dist / 180);
      node.style.transform = `translate(${(dx / r.width) * max * strength}px, ${(dy / r.height) * max * strength}px)`;
    }

    function handleLeave() {
      const node = ref.current;
      if (node) node.style.transform = '';
    }
 
    el.addEventListener('mousemove', handleMove);
    el.addEventListener('mouseleave', handleLeave);
    return () => {
      el.removeEventListener('mousemove', handleMove);
      el.removeEventListener('mouseleave', handleLeave);
    };
  }, [reduced]);
 
  const classes = `relative will-change-transform transition-all duration-200 inline-flex items-center justify-center gap-2 rounded-vais border border-[rgba(var(--color-primary),0.18)] bg-[rgb(var(--color-primary))] px-5 py-3 text-sm font-medium text-white shadow-[0_10px_24px_rgba(8,40,35,0.18)] hover:-translate-y-0.5 hover:bg-[rgb(var(--color-primary))]/95 hover:shadow-[0_14px_30px_rgba(8,40,35,0.2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(var(--color-primary),0.35)] ${className}`;
 
  if (href) {
    return (
      <Link href={href} legacyBehavior>
        <a ref={ref as React.RefObject<HTMLAnchorElement>} className={classes} data-cursor-interactive {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}>
          {children}
        </a>
      </Link>
    );
  }
 
  return (
    <button ref={ref as React.RefObject<HTMLButtonElement>} className={classes} {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
