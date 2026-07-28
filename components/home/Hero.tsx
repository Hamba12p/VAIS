import Link from 'next/link';

export function Hero() {
  return (
    <section className="container-vais pt-16 pb-8 md:pt-24 md:pb-12">
      <div className="max-w-5xl">
        <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[rgb(var(--color-murram))]">REG. 001 - EST. KAMPALA</p>
        <h1 className="mt-5 max-w-4xl text-5xl font-sora leading-[0.9] text-[rgb(var(--color-ink))] sm:text-6xl md:text-7xl">
          Applied intelligence
          <br />
          for institutions that must
          <br />
          operate with certainty.
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-[rgb(var(--color-muted))] md:text-lg">
          VAIS builds systems for public and institutional use where reliability, auditability, and local operating conditions matter more than visual noise.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/work"
            className="inline-flex items-center justify-center border border-[rgb(var(--color-murram))] bg-[rgb(var(--color-murram))] px-5 py-2.5 text-sm font-medium text-[rgb(var(--color-paper))] transition-colors hover:bg-transparent hover:text-[rgb(var(--color-murram))]"
          >
            [ Review the portfolio ]
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center border border-[rgb(var(--color-hairline))] px-5 py-2.5 text-sm font-medium text-[rgb(var(--color-ink))] transition-colors hover:border-[rgb(var(--color-murram))] hover:text-[rgb(var(--color-murram))]"
          >
            [ Contact VAIS ]
          </Link>
        </div>
      </div>
    </section>
  );
}
