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
import { HeroScene } from '@/components/three/HeroScene';
import { BrandPanel } from '@/components/ui/BrandPanel';

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

  const headline = "Applied intelligence for institutions that must operate with certainty".split(' ');

  return (
    <section className="relative min-h-[70vh] flex items-center overflow-hidden">
      {/* Background mesh (subtle grey overlay for a professional look) */}
      <div ref={bgRef} className="absolute inset-0 -z-10 transform-gpu transition-transform duration-300 will-change-transform">
        <HeroScene />
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

      <div className="container-vais py-24 md:py-32">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="max-w-3xl relative">
          {/* Subtle enlarged logo behind the hero headline */}
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-20 flex items-start justify-center hero-bg-logo">
            <div className="w-[80%] max-w-[90rem] select-none -translate-y-6">
              <Image src="/images/logo.png" alt="" width={1200} height={400} className="object-contain" />
            </div>
          </div>
          <Reveal>
            <div className="inline-flex items-center gap-3 rounded-full border border-[rgba(var(--color-primary),0.14)] bg-[rgba(255,255,255,0.72)] px-4 py-2 shadow-sm backdrop-blur-sm">
              <div className="relative h-7 w-7 overflow-hidden rounded-full border border-[rgba(var(--color-primary),0.12)] bg-white">
                <Image src="/images/logo.png" alt="VAIS" fill className="object-contain p-1.5" />
              </div>
              <span className="text-xs font-mono text-[rgb(var(--color-muted))] tracking-[0.22em] uppercase">{company.tagline}</span>
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <div className="relative">
              <h1 className="mt-4 font-sora font-extrabold text-display-lg text-[rgb(var(--color-charcoal))] leading-tight">
              {headline.map((w, i) => (
                <MotionSpan key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04, duration: 0.45 }} className="inline-block mr-2">{w}</MotionSpan>
              ))}
              </h1>
            </div>
          </Reveal>

          <Reveal delay={0.14}>
            <p className="mt-6 text-[rgb(var(--color-muted))]">VAIS builds applied intelligence systems for institutions that need dependable delivery, credible oversight, and lasting adaptability in the field.</p>

            <div className="mt-8 flex items-center gap-4">
              <MagneticButton href="/work" className="inline-flex items-center justify-center gap-2 font-inter font-medium">
                Review the portfolio
              </MagneticButton>
              <Button href="/contact" variant="outline">Contact VAIS</Button>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-12 grid gap-4 sm:grid-cols-3 text-sm">
              <div className="rounded-2xl border border-[rgba(var(--color-primary),0.12)] bg-white/80 p-4 shadow-[0_10px_30px_rgba(10,16,16,0.05)] backdrop-blur-sm">
                <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-[rgb(var(--color-muted))]">Design principle</span>
                <p className="mt-1 text-sm leading-relaxed text-[rgb(var(--color-charcoal))]">Offline-first and low-bandwidth by default, not as a workaround.</p>
              </div>
              <div className="rounded-2xl border border-[rgba(var(--color-primary),0.12)] bg-white/80 p-4 shadow-[0_10px_30px_rgba(10,16,16,0.05)] backdrop-blur-sm">
                <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-[rgb(var(--color-muted))]">Institutional fit</span>
                <p className="mt-1 text-sm leading-relaxed text-[rgb(var(--color-charcoal))]">Built to align with public-sector governance, auditability, and deployment realities.</p>
              </div>
              <div className="rounded-2xl border border-[rgba(var(--color-primary),0.12)] bg-white/80 p-4 shadow-[0_10px_30px_rgba(10,16,16,0.05)] backdrop-blur-sm">
                <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-[rgb(var(--color-muted))]">National reach</span>
                <p className="mt-1 text-sm leading-relaxed text-[rgb(var(--color-charcoal))]">Interoperable with the core systems that keep services moving across Uganda.</p>
              </div>
            </div>
          </Reveal>
          </div>

          <div className="lg:pl-8">
              <BrandPanel
                label="About"
                title="Operational systems for national services"
                body="We design and deploy applied intelligence platforms that integrate with government infrastructure to improve delivery, oversight, and resilience."
              />

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="rounded-[24px] border border-[rgba(var(--color-primary),0.12)] bg-[rgba(255,255,255,0.72)] p-5 shadow-[0_18px_50px_rgba(8,18,16,0.06)] backdrop-blur-sm">
                <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-[rgb(var(--color-muted))]">Operational thesis</p>
                <p className="mt-2 text-sm leading-relaxed text-[rgb(var(--color-charcoal))]">Systems built from constraints outward: reliability, auditability, and field-ready maintenance.</p>
              </div>
              <div className="rounded-[24px] border border-[rgba(var(--color-primary),0.12)] bg-[rgba(255,255,255,0.72)] p-5 shadow-[0_18px_50px_rgba(8,18,16,0.05)] backdrop-blur-sm">
                <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-[rgb(var(--color-primary))]">Program focus</p>
                <p className="mt-2 text-sm leading-relaxed text-[rgb(var(--color-charcoal))]">Interoperability, low-bandwidth resilience, and measurable operational impact across deployments.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

