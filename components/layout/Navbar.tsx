'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
const links = [['/', 'Home'], ['/about', 'About'], ['/work', 'Work'], ['/contact', 'Contact']];
export function Navbar() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => { setOpen(false); }, [path]);
  useEffect(() => {
    if (!open) return;
    const escape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setOpen(false); toggle.current?.focus(); }
    };
    document.addEventListener('keydown', escape);
    return () => document.removeEventListener('keydown', escape);
  }, [open]);
  const current = (href: string) => path === href || (href !== '/' && path.startsWith(href + '/'));
  return <header className="fixed inset-x-0 top-0 z-50 border-b border-hairline/50 bg-canvas/95 backdrop-blur-xl">
    <div className="container-vais flex h-16 items-center justify-between md:h-[4.5rem]">
      <Link href="/" aria-label="VAIS home" className="flex items-center gap-3">
        <span className="relative h-10 w-10 overflow-hidden bg-canvas"><Image src="/images/logo.png" alt="" fill priority className="object-contain" sizes="40px" /></span>
        <span className="hidden font-display text-base font-semibold tracking-[.18em] sm:block">VAIS</span>
      </Link>
      <nav aria-label="Main navigation" className="hidden items-center gap-8 lg:flex">
        {links.map(([href, label]) => <Link key={href} href={href} aria-current={current(href) ? 'page' : undefined} className={'py-3 font-mono text-xs uppercase tracking-[.12em] ' + (current(href) ? 'text-green underline underline-offset-8' : 'text-ink hover:text-green')}>{label}</Link>)}
      </nav>
      <Link href="/contact" className="hidden border border-green px-4 py-2 font-display text-sm text-green lg:block">Contact VAIS</Link>
      <button ref={toggle} type="button" onClick={() => setOpen(v => !v)} aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? 'Close menu' : 'Open menu'} className="min-h-11 px-3 font-display text-sm lg:hidden">{open ? 'Close' : 'Menu'}</button>
    </div>
    <nav id="mobile-navigation" aria-label="Mobile navigation" hidden={!open} className={(open ? 'flex' : 'hidden') + ' container-vais flex-col border-t border-hairline py-4 lg:hidden'}>
      {links.map(([href, label]) => <Link key={href} href={href} onClick={() => setOpen(false)} aria-current={current(href) ? 'page' : undefined} className="border-b border-hairline py-4 font-display text-2xl">{label}</Link>)}
    </nav>
  </header>;
}
