import { SealMark } from '@/components/ui/SealMark';
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
        'relative overflow-hidden border border-[rgb(var(--color-hairline))] bg-[rgba(255,255,255,0.7)] p-5 shadow-[0_12px_32px_rgba(20,23,15,0.06)]',
        className
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_15%,rgba(var(--color-murram),0.08),transparent_26%),radial-gradient(circle_at_20%_85%,rgba(var(--color-gazette),0.08),transparent_24%)]" />
      <div className="relative flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-[rgb(var(--color-hairline))] bg-white text-[rgb(var(--color-murram))]">
          <SealMark className="h-7 w-7" />
        </div>
        <div className="min-w-0">
          <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-[rgb(var(--color-murram))]">{label}</p>
          <h3 className="mt-1 text-lg font-semibold text-[rgb(var(--color-ink))]">{title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-[rgb(var(--color-muted))]">{body}</p>
        </div>
      </div>
    </div>
  );
}
