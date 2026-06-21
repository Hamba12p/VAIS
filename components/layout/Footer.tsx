import Link from 'next/link';
import Image from 'next/image';
import { company } from '@/data/company';

const footerNav = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/work', label: 'Work' },
  { href: '/contact', label: 'Contact' },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-[rgb(var(--color-surface))] text-[rgb(var(--color-charcoal))] overflow-visible">
      {/* subtle teal top band to match logo */}
      <div className="absolute inset-x-0 -top-6 h-6 pointer-events-none" aria-hidden>
        <div className="h-full w-full" style={{ background: 'linear-gradient(to bottom, rgba(var(--color-primary),0.12), transparent)' }} />
      </div>
      <div className="container-vais py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="inline-flex items-center gap-3 site-logo">
              <div className="relative w-8 h-8">
                <Image src="/images/logo.png" alt="VAIS" fill className="object-contain" sizes="32px" />
              </div>
              <span className="font-sora font-700 text-[rgb(var(--color-primary))] text-lg tracking-tight">VAIS</span>
            </Link>
            <p className="text-sm text-[rgb(var(--color-muted))] leading-relaxed max-w-xs">
              Applied Intelligence Systems — Makerere, Kampala, Uganda.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-xs font-mono text-[rgb(var(--color-muted))] uppercase tracking-widest mb-4">Navigation</p>
            <nav className="flex flex-col gap-2">
              {footerNav.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-[rgb(var(--color-muted))] hover:text-[rgb(var(--color-charcoal))] transition-colors duration-150"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs font-mono text-[rgb(var(--color-muted))] uppercase tracking-widest mb-4">Contact</p>
            <div className="flex flex-col gap-2">
              <a
                href={`tel:${company.phone}`}
                className="text-sm text-[rgb(var(--color-muted))] hover:text-[rgb(var(--color-primary))] transition-colors duration-150"
              >
                {company.phone}
              </a>
              <a
                href={`mailto:${company.email}`}
                className="text-sm text-[rgb(var(--color-muted))] hover:text-[rgb(var(--color-primary))] transition-colors duration-150"
              >
                {company.email}
              </a>
              <p className="text-sm text-[rgb(var(--color-muted))] mt-1">{company.address}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-[rgba(var(--color-primary),0.08)]">
        <div className="container-vais py-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-[rgb(var(--color-muted))]">
            &copy; {year} VAIS — Applied Intelligence Systems. All rights reserved.
          </p>
          <p className="text-xs font-mono text-[rgb(var(--color-muted))]">Makerere, Kampala, Uganda</p>
        </div>
      </div>
    </footer>
  );
}
