"use client";
import { motion } from 'framer-motion';
const MotionSpan: any = motion.span;
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import MagneticButton from '@/components/ui/MagneticButton';
import Reveal from '@/components/ui/Reveal';
import StatCounter from '@/components/ui/StatCounter';
import usePrefersReducedMotion from '@/lib/hooks/usePrefersReducedMotion';
import { company } from '@/data/company';
import { useEffect, useRef } from 'react';

export function Hero() {
  const reduce = usePrefersReducedMotion();
  const bgRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (reduce) return;
    const el = bgRef.current;
    if (!el) return;

    function onScroll() {
      const node = bgRef.current;
      if (!node) return;
      const t = Math.min(1, window.scrollY / (window.innerHeight * 0.6));
      node.style.transform = `translateY(${t * 24}px) scale(${1 - t * 0.02})`;
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [reduce]);

  const headline = "Applied intelligence for institutions that can't afford to fail".split(' ');

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background mesh (subtle grey overlay for a professional look) */}
      <div ref={bgRef} className="absolute inset-0 -z-10 transform-gpu transition-transform duration-300 will-change-transform">
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(128,128,128,0.06)] via-transparent to-[rgba(128,128,128,0.02)]" />
        <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="g1" cx="30%" cy="20%" r="60%">
              <stop offset="0%" stopColor="rgba(12,107,87,0.18)" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
            <radialGradient id="g2" cx="85%" cy="80%" r="40%">
              <stop offset="0%" stopColor="rgba(8,20,24,0.12)" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#g1)" />
          <rect width="100%" height="100%" fill="url(#g2)" />
          <rect width="100%" height="100%" fill="rgba(128,128,128,0.02)" />
        </svg>
      </div>

      <div className="container-vais py-28 md:py-36">
        <div className="max-w-3xl relative">
          {/* Subtle enlarged logo behind the hero headline */}
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-20 flex items-start justify-center hero-bg-logo">
            <div className="w-[80%] max-w-[90rem] select-none -translate-y-6">
              <Image src="/images/logo.png" alt="" width={1200} height={400} className="object-contain" />
            </div>
          </div>
          <Reveal>
            <span className="text-xs font-mono text-[rgb(var(--color-muted))] tracking-widest uppercase">{company.tagline}</span>
          </Reveal>

          <Reveal delay={0.06}>
            <div className="relative">
              <h1 className="mt-4 font-sora font-extrabold text-display-xl text-[rgb(var(--color-charcoal))] leading-tight">
              {headline.map((w, i) => (
                <MotionSpan key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04, duration: 0.45 }} className="inline-block mr-2">{w}</MotionSpan>
              ))}
              </h1>
            </div>
          </Reveal>

          <Reveal delay={0.14}>
            <p className="mt-6 text-[rgb(var(--color-muted))]">{company.description}</p>

            <div className="mt-8 flex items-center gap-4">
              <MagneticButton href="/work" className="inline-flex items-center justify-center gap-2 font-inter font-medium">
                Our Work
              </MagneticButton>
              <Button href="/contact" variant="outline">Contact Us</Button>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-12 flex gap-6 flex-wrap text-sm">
              <div className="flex flex-col">
                <span className="text-xs text-[rgb(var(--color-muted))]">Systems Deployed</span>
                <StatCounter value={15} className="text-2xl font-sora font-semibold text-[rgb(var(--color-primary))]" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-[rgb(var(--color-muted))]">Directives Tracked</span>
                <StatCounter value={23} className="text-2xl font-sora font-semibold text-[rgb(var(--color-primary))]" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-[rgb(var(--color-muted))]">Schools</span>
                <StatCounter value={42838} className="text-2xl font-sora font-semibold text-[rgb(var(--color-primary))]" />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

