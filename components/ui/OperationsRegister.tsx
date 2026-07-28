import Link from 'next/link';

type RegisterStatus = 'ACTIVE' | 'PILOT' | 'DEPLOYED';

export type RegisterRow = {
  ref: string;
  sector: string;
  status: RegisterStatus;
  coverage: string;
  summary?: string;
  href?: string;
};

export type RegisterNote = {
  label: string;
  title: string;
  body: string;
};

const statusStyles: Record<RegisterStatus, string> = {
  ACTIVE: 'border-[rgba(var(--color-gazette),0.24)] bg-[rgba(var(--color-gazette),0.10)] text-[rgb(var(--color-gazette))]',
  PILOT: 'border-[rgba(var(--color-signal),0.32)] bg-[rgba(var(--color-signal),0.14)] text-[rgb(var(--color-ink))]',
  DEPLOYED: 'border-[rgba(var(--color-murram),0.26)] bg-[rgba(var(--color-murram),0.10)] text-[rgb(var(--color-murram))]',
};

interface OperationsRegisterProps {
  title: string;
  intro?: string;
  rows: RegisterRow[];
  notes?: RegisterNote[];
  footnote?: string;
}

export function OperationsRegister({ title, intro, rows, notes, footnote }: OperationsRegisterProps) {
  return (
    <section className="container-vais py-16 md:py-20">
      <div className="mb-8 max-w-3xl">
        <p className="text-xs font-mono uppercase tracking-[0.22em] text-[rgb(var(--color-murram))]">Register of Operations</p>
        <h2 className="mt-3 text-3xl md:text-4xl font-sora text-[rgb(var(--color-ink))]">{title}</h2>
        {intro && <p className="mt-4 text-sm md:text-base leading-relaxed text-[rgb(var(--color-muted))] max-w-2xl">{intro}</p>}
      </div>

      <div className="hidden md:block border border-[rgb(var(--color-hairline))] bg-[rgba(255,255,255,0.62)] shadow-[0_12px_36px_rgba(20,23,15,0.05)]">
        <table className="w-full border-collapse">
          <thead className="bg-[rgba(var(--color-murram),0.08)]">
            <tr className="text-left text-[11px] uppercase tracking-[0.22em] text-[rgb(var(--color-ink))] font-mono">
              <th className="px-5 py-4 font-normal">Ref</th>
              <th className="px-5 py-4 font-normal">Sector</th>
              <th className="px-5 py-4 font-normal">Status</th>
              <th className="px-5 py-4 font-normal">Coverage</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr
                key={row.ref}
                className="register-row border-t border-[rgba(var(--color-hairline),0.6)]"
                style={{ animationDelay: `${index * 170}ms` }}
              >
                <td className="px-5 py-4 align-top font-mono text-sm text-[rgb(var(--color-murram))]">{row.ref}</td>
                <td className="px-5 py-4 align-top">
                  {row.href ? (
                    <Link href={row.href} className="inline-flex flex-col gap-1 text-left">
                      <span className="font-medium text-[rgb(var(--color-ink))] hover:underline underline-offset-4 decoration-[rgb(var(--color-murram))]">
                        {row.sector}
                      </span>
                      {row.summary && <span className="text-sm leading-relaxed text-[rgb(var(--color-muted))] max-w-xl">{row.summary}</span>}
                    </Link>
                  ) : (
                    <div className="max-w-xl">
                      <div className="font-medium text-[rgb(var(--color-ink))]">{row.sector}</div>
                      {row.summary && <div className="mt-1 text-sm leading-relaxed text-[rgb(var(--color-muted))]">{row.summary}</div>}
                    </div>
                  )}
                </td>
                <td className="px-5 py-4 align-top">
                  <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-mono uppercase tracking-[0.18em] ${statusStyles[row.status]}`}>
                    {row.status}
                  </span>
                </td>
                <td className="px-5 py-4 align-top text-sm leading-relaxed text-[rgb(var(--color-ink))]">{row.coverage}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid gap-3 md:hidden">
        {rows.map((row, index) => (
          <article
            key={row.ref}
            className="register-row border border-[rgb(var(--color-hairline))] bg-[rgba(255,255,255,0.64)] p-4 shadow-[0_10px_28px_rgba(20,23,15,0.05)]"
            style={{ animationDelay: `${index * 170}ms` }}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.22em] text-[rgb(var(--color-murram))]">{row.ref}</p>
                <h3 className="mt-2 text-lg font-sora text-[rgb(var(--color-ink))]">
                  {row.href ? (
                    <Link href={row.href} className="hover:underline underline-offset-4 decoration-[rgb(var(--color-murram))]">
                      {row.sector}
                    </Link>
                  ) : (
                    row.sector
                  )}
                </h3>
              </div>
              <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-mono uppercase tracking-[0.18em] ${statusStyles[row.status]}`}>
                {row.status}
              </span>
            </div>
            {row.summary && <p className="mt-3 text-sm leading-relaxed text-[rgb(var(--color-muted))]">{row.summary}</p>}
            <p className="mt-3 text-sm leading-relaxed text-[rgb(var(--color-ink))]">
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[rgb(var(--color-muted))]">Coverage</span>
              <span className="ml-2">{row.coverage}</span>
            </p>
          </article>
        ))}
      </div>

      {notes?.length ? (
        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {notes.map((note) => (
            <div key={note.label} className="border-l-2 border-[rgb(var(--color-murram))] pl-4">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[rgb(var(--color-murram))]">{note.label}</p>
              <h3 className="mt-2 text-base font-sora text-[rgb(var(--color-ink))]">{note.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[rgb(var(--color-muted))]">{note.body}</p>
            </div>
          ))}
        </div>
      ) : null}

      {footnote ? <p className="mt-6 text-xs font-mono tracking-[0.16em] uppercase text-[rgb(var(--color-muted))]">{footnote}</p> : null}
    </section>
  );
}
