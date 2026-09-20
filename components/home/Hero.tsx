'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { TerrainScene } from '@/components/three/TerrainScene';
import MagneticButton from '@/components/ui/MagneticButton';
import { useMotionPreference } from '@/lib/hooks/useMotionPreference';

export function Hero(){const {scrollY}=useScroll();const {reduceMotion}=useMotionPreference();const y=useTransform(scrollY,[0,900],[0,reduceMotion?0:270]);return <section className="relative min-h-[calc(100svh-4rem)] overflow-hidden bg-dusk text-canvas">
  <motion.div style={{y}} className="absolute inset-0"><TerrainScene className="h-full w-full"/></motion.div><div className="absolute inset-0 bg-gradient-to-r from-dusk/75 via-dusk/25 to-transparent"/><div className="absolute inset-0 bg-gradient-to-t from-basalt/65 via-transparent to-dusk/20"/>
  <div className="container-vais relative z-10 flex min-h-[calc(100svh-4rem)] flex-col justify-between py-8 md:py-12">
    <div className="flex items-center justify-between border-t border-canvas/25 pt-4 font-mono text-[9px] uppercase tracking-[.24em] text-canvas/65"><span>00°20′18.8″N / 32°33′39.9″E</span><span className="hidden sm:block">Kampala · Uganda</span></div>
    <div className="max-w-5xl pb-[18vh] pt-20"><motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{duration:.5}} className="font-mono text-[10px] uppercase tracking-[.28em] text-canvas/70">VAIS / Applied intelligence systems</motion.p><motion.h1 initial={{opacity:0,y:reduceMotion?0:20,rotateX:reduceMotion?0:1.5}} animate={{opacity:1,y:0,rotateX:0}} transition={{duration:.65,ease:[.16,1,.3,1]}} className="mt-5 text-balance font-display text-[clamp(3.7rem,9vw,9rem)] font-medium leading-[.82] tracking-[-.065em]">Intelligence,<br/>shaped by the <span className="text-clay">ground.</span></motion.h1></div>
    <div className="grid gap-6 border-t border-canvas/25 pt-6 md:grid-cols-[1fr_auto] md:items-end"><p className="max-w-xl text-lg leading-relaxed text-canvas/78">We build systems that keep working across real distance — from a national coordination room to a school, clinic, field, or feature phone.</p><div className="flex gap-3"><MagneticButton href="/work" className="bg-canvas px-6 py-3 font-mono text-[10px] uppercase tracking-[.18em] text-basalt">Survey the work ↗</MagneticButton><MagneticButton href="/contact" className="px-6 py-3 font-mono text-[10px] uppercase tracking-[.18em] text-canvas">Start a conversation</MagneticButton></div></div>
  </div>
</section>}
