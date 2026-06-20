import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  label?: string;
  heading: string;
  subheading?: string;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionHeader({
  label,
  heading,
  subheading,
  align = 'left',
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn('flex flex-col gap-3', align === 'center' && 'items-center text-center', className)}>
      {label && (
        <span className="text-xs font-mono font-medium text-vais-green tracking-widest uppercase">
          {label}
        </span>
      )}
      <h2 className="font-sora font-700 text-display-md text-vais-charcoal">{heading}</h2>
      {subheading && (
        <p className="text-vais-slate text-base leading-relaxed max-w-2xl">{subheading}</p>
      )}
    </div>
  );
}
