import { cn } from '@/lib/utils';
import Link from 'next/link';

type ButtonVariant = 'primary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit';
  disabled?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-[rgb(var(--color-primary))] text-white hover:bg-[rgb(var(--color-primary))]/90 border border-transparent',
  outline: 'bg-transparent text-[rgb(var(--color-primary))] border border-[rgba(var(--color-primary),0.18)] hover:bg-[rgb(var(--color-primary))] hover:text-white',
  ghost: 'bg-transparent text-[rgb(var(--color-muted))] hover:text-[rgb(var(--color-charcoal))] hover:bg-[rgba(0,0,0,0.02)] border border-transparent',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'text-sm px-4 py-2',
  md: 'text-sm px-6 py-3',
  lg: 'text-base px-8 py-4',
};

export function Button({
  variant = 'primary',
  size = 'md',
  href,
  className,
  children,
  onClick,
  type = 'button',
  disabled,
}: ButtonProps) {
  const classes = cn(
    'inline-flex items-center justify-center gap-2 font-inter font-medium transition-all duration-200 rounded-vais whitespace-nowrap',
    variantClasses[variant],
    sizeClasses[size],
    disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
    className
  );

  if (href) {
    return <Link href={href} className={classes} data-cursor-interactive>{children}</Link>;
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes} data-cursor-interactive>
      {children}
    </button>
  );
}
