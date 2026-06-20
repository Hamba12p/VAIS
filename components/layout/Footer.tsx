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
    <footer className="bg-vais-charcoal text-white">
      <div className="container-vais py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="relative w-8 h-8">
                <Image src="/images/logo-dark.png" alt="VAIS" fill className="object-contain" sizes="32px" />
              </div>
              <span className="font-sora font-700 text-white text-lg tracking-tight">VAIS</span>
            </Link>
            <p className="text-sm text-white/60 leading-relaxed max-w-xs">
              Applied Intelligence Systems — Makerere, Kampala, Uganda.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-xs font-mono text-white/40 uppercase tracking-widest mb-4">Navigation</p>
            <nav className="flex flex-col gap-2">
              {footerNav.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-white/70 hover:text-white transition-colors duration-150"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs font-mono text-white/40 uppercase tracking-widest mb-4">Contact</p>
            <div className="flex flex-col gap-2">
              <a
                href={`tel:${company.phone}`}
                className="text-sm text-white/70 hover:text-white transition-colors duration-150"
              >
                {company.phone}
              </a>
              <a
                href={`mailto:${company.email}`}
                className="text-sm text-white/70 hover:text-white transition-colors duration-150"
              >
                {company.email}
              </a>
              <p className="text-sm text-white/50 mt-1">{company.address}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-vais py-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-white/40">
            &copy; {year} VAIS — Applied Intelligence Systems. All rights reserved.
          </p>
          <p className="text-xs font-mono text-white/30">Makerere, Kampala, Uganda</p>
        </div>
      </div>
    </footer>
  );
}
