'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/work', label: 'Work' },
  { href: '/contact', label: 'Contact' },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-white/95 backdrop-blur-sm border-b border-vais-border shadow-vais-card'
          : 'bg-white border-b border-vais-border'
      )}
    >
      <div className="container-vais">
        <div className="flex items-center justify-between h-16 md:h-18">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
            <div className="relative w-8 h-8">
              <Image src="/images/logo-mark.png" alt="VAIS" fill className="object-contain" priority sizes="32px" />
            </div>
            <div className="relative h-6 w-24 hidden sm:block">
              <Image
                src="/images/logo-light.png"
                alt="VAIS — Applied Intelligence Systems"
                fill
                className="object-contain object-left"
                priority
                sizes="(max-width: 640px) 80px, 96px"
              />
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'px-4 py-2 text-sm font-medium rounded-vais transition-colors duration-150',
                  pathname === link.href
                    ? 'text-vais-green-vibrant bg-vais-mint'
                    : 'text-vais-slate hover:text-vais-charcoal hover:bg-vais-surface'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Button href="/contact" variant="primary" size="sm">
              Get in Touch
            </Button>
          </div>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden p-2 text-vais-slate hover:text-vais-charcoal rounded-vais"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-vais-border bg-white">
          <nav className="container-vais py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'px-4 py-3 text-sm font-medium rounded-vais transition-colors',
                  pathname === link.href
                    ? 'text-vais-green-vibrant bg-vais-mint'
                    : 'text-vais-slate hover:text-vais-charcoal hover:bg-vais-surface'
                )}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 border-t border-vais-border mt-2">
              <Button href="/contact" variant="primary" size="sm" className="w-full justify-center">
                Get in Touch
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
