export function SealMark({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true" className={className}>
      <circle cx="24" cy="24" r="18" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="24" cy="24" r="11" stroke="currentColor" strokeWidth="1.5" opacity="0.72" />
      <path d="M24 12V36" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M14 24H34" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M18 18L30 30" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M30 18L18 30" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M24 7L28 14H20L24 7Z" fill="currentColor" opacity="0.9" />
    </svg>
  );
}
