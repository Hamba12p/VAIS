import Link from 'next/link';
import { company } from '@/data/company';
import { SealMark } from '@/components/ui/SealMark';

const footerNav = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/work', label: 'Work' },
  { href: '/contact', label: 'Contact' },
];

const coordinates = '0.3476N 32.5825E - KAMPALA';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[rgb(var(--color-hairline))] bg-[rgba(var(--color-paper),0.92)] text-[rgb(var(--color-ink))]">
      <div className="container-vais py-14 md:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center border border-[rgb(var(--color-hairline))] bg-white text-[rgb(var(--color-murram))]">
                <SealMark className="h-7 w-7" />
              </div>
              <div>
                <p className="text-sm font-semibold tracking-[0.28em]">VAIS</p>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[rgb(var(--color-muted))]">{coordinates}</p>
              </div>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-[rgb(var(--color-muted))]">
              Applied Intelligence Systems for institutions that need legible, auditable delivery.
            </p>
          </div>

          <div>
            <p className="mb-4 text-xs font-mono uppercase tracking-[0.22em] text-[rgb(var(--color-murram))]">Navigation</p>
            <nav className="flex flex-col gap-2">
              {footerNav.map((link) => (
                <Link key={link.href} href={link.href} className="text-sm text-[rgb(var(--color-muted))] transition-colors hover:text-[rgb(var(--color-ink))]">
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <p className="mb-4 text-xs font-mono uppercase tracking-[0.22em] text-[rgb(var(--color-murram))]">Contact</p>
            <div className="flex flex-col gap-2 text-sm text-[rgb(var(--color-muted))]">
              <a href={`tel:${company.phone}`} className="transition-colors hover:text-[rgb(var(--color-ink))]">{company.phone}</a>
              <a href={`mailto:${company.email}`} className="transition-colors hover:text-[rgb(var(--color-ink))]">{company.email}</a>
              <p>{company.address}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-[rgb(var(--color-hairline))]">
        <div className="container-vais flex flex-col gap-2 py-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-[rgb(var(--color-muted))]">&copy; {year} VAIS - Applied Intelligence Systems. All rights reserved.</p>
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[rgb(var(--color-muted))]">{coordinates}</p>
        </div>
      </div>
    </footer>
  );
}
