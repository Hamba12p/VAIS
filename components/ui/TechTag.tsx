export function TechTag({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center text-xs font-mono text-vais-slate bg-vais-surface border border-vais-border px-2.5 py-1 rounded-vais">
      {label}
    </span>
  );
}
