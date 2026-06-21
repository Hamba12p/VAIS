"use client";
import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import usePrefersReducedMotion from '@/lib/hooks/usePrefersReducedMotion';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  href?: string;
  className?: string;
};

export default function MagneticButton({ children, className = '', href, ...rest }: Props) {
  const ref = useRef<HTMLButtonElement | null>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;

    function handleMove(e: MouseEvent) {
      const node = ref.current;
      if (!node) return;
      const r = node.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
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

  const content = (
    <button ref={ref} className={`relative will-change-transform transition-transform inline-flex items-center justify-center ${className}`} {...rest}>
      {children}
    </button>
  );

  if (href) {
    return (
      <Link href={href} data-cursor-interactive>
        {content}
      </Link>
    );
  }

  return content;
}
