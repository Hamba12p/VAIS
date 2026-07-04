import Image from 'next/image';
import { cn } from '@/lib/utils';

interface BrandPanelProps {
  label?: string;
  title: string;
  body: string;
  className?: string;
}

export function BrandPanel({ label = 'Overview', title, body, className }: BrandPanelProps) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-[24px] border border-[rgba(var(--color-primary),0.18)] bg-[linear-gradient(145deg,rgba(255,255,255,0.8),rgba(246,250,249,0.94))] p-5 shadow-[0_18px_50px_rgba(8,18,16,0.08)]',
        className
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_15%,rgba(var(--color-accent),0.08),transparent_28%),radial-gradient(circle_at_20%_85%,rgba(var(--color-primary),0.06),transparent_28%)]" />
      <div className="relative flex items-start gap-4">
        <div className="relative h-12 w-12 shrink-0 rounded-2xl border border-[rgba(var(--color-primary),0.12)] bg-white p-2 shadow-sm">
          <Image src="/images/logo.png" alt="VAIS" fill className="object-contain p-1" sizes="56px" />
        </div>
        <div className="min-w-0">
          <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-[rgb(var(--color-primary))]">{label}</p>
          <h3 className="mt-1 font-sora text-lg font-semibold text-[rgb(var(--color-charcoal))]">{title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-[rgb(var(--color-muted))]">{body}</p>
        </div>
      </div>
    </div>
  );
}
