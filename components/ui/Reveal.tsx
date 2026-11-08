"use client";
import { motion, Variants } from 'framer-motion';
const MotionDiv: any = motion.div;
import React, { useEffect, useRef, useState } from 'react';
import usePrefersReducedMotion from '@/lib/hooks/usePrefersReducedMotion';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function Reveal({ children, className = '', threshold = 0.15, delay = 0 }: { children: React.ReactNode; className?: string; threshold?: number; delay?: number; }) {
  const ref = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);
  const reduce = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduce) {
      setInView(true);
      return;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setInView(true);
        });
      },
      { threshold }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [reduce, threshold]);

  return (
    <MotionDiv
      ref={ref as any}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={fadeUp}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </MotionDiv>
  );
}
