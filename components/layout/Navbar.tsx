'use client';

import { useEffect, useState } from 'react';
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

const coordinates = '0.3476N 32.5825E - KAMPALA';

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
        'fixed top-0 left-0 right-0 z-50 border-b border-[rgb(var(--color-hairline))] transition-colors duration-200',
        scrolled ? 'bg-[rgba(var(--color-paper),0.94)] backdrop-blur-sm' : 'bg-[rgba(var(--color-paper),0.98)]'
      )}
    >
      <div className="container-vais">
        <div className="flex h-16 md:h-18 items-center justify-between gap-4">
          <Link href="/" className="site-logo flex items-center gap-3 flex-shrink-0">
            <div className="relative h-10 w-10 overflow-hidden border border-[rgb(var(--color-hairline))] bg-white">
              <Image src="/images/logo.png" alt="VAIS" fill className="object-contain p-1" priority sizes="40px" />
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="text-sm font-semibold tracking-[0.28em] text-[rgb(var(--color-ink))]">VAIS</span>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[rgb(var(--color-muted))]">{coordinates}</span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'px-4 py-2 text-sm font-medium transition-colors duration-150',
                  pathname === link.href
                    ? 'text-[rgb(var(--color-murram))] underline decoration-[rgb(var(--color-murram))] underline-offset-8'
                    : 'text-[rgb(var(--color-muted))] hover:text-[rgb(var(--color-ink))]'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-5">
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[rgb(var(--color-muted))]">{coordinates}</span>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center border border-[rgb(var(--color-hairline))] px-4 py-2 text-sm font-medium text-[rgb(var(--color-ink))] transition-colors hover:border-[rgb(var(--color-murram))] hover:text-[rgb(var(--color-murram))]"
            >
              Contact VAIS
            </Link>
          </div>

          <button
            className="lg:hidden p-2 text-[rgb(var(--color-ink))]"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-[rgb(var(--color-hairline))] bg-[rgb(var(--color-paper))]">
          <nav className="container-vais py-4 flex flex-col gap-1">
            <div className="px-4 pb-3">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[rgb(var(--color-muted))]">{coordinates}</p>
            </div>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'px-4 py-3 text-sm font-medium transition-colors',
                  pathname === link.href
                    ? 'text-[rgb(var(--color-murram))] bg-[rgba(var(--color-murram),0.08)]'
                    : 'text-[rgb(var(--color-muted))] hover:text-[rgb(var(--color-ink))] hover:bg-[rgba(var(--color-hairline),0.18)]'
                )}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 mt-2 border-t border-[rgb(var(--color-hairline))]">
              <Button href="/contact" variant="primary" size="sm" className="w-full justify-center">
                Contact VAIS
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
