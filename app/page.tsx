import Link from 'next/link';
import { company } from '@/data/company';

export default function Home() {
  return (
    <main>
      <section className="border-b border-rule bg-bond">
        <div className="container-vais grid min-h-[82vh] items-end gap-8 py-12 md:grid-cols-[1.1fr_0.9fr] md:py-16">
          <div className="max-w-2xl border border-rule bg-white/40 p-6 md:p-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-ink/70">VAIS / Applied intelligence systems</p>
            <h1 className="mt-5 font-display text-[clamp(2.75rem,6vw,5rem)] leading-[0.9] tracking-[-0.02em] text-ink">
              Fifteen systems, built for the conditions Uganda actually has.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink/80">
              VAIS designs and deploys applied intelligence systems for government, institutions, and enterprise
              operating across real infrastructure, unreliable connectivity, and public accountability.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-6">
              <Link href="/work" className="inline-flex items-center bg-green px-5 py-3 font-mono text-[10px] uppercase tracking-[0.18em] text-white">
                View the registry
              </Link>
              <Link href="/contact" className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink underline decoration-2 underline-offset-8">
                Start a conversation
              </Link>
            </div>
          </div>
          <div className="h-[320px] border border-rule bg-field p-6 text-white md:h-[520px]">
            <div className="flex h-full flex-col justify-between border border-white/10 p-4">
              <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.24em] text-white/60">
                <span>Field graph</span>
                <span>15 nodes</span>
              </div>
              <div className="grid gap-3">
                <div className="h-px bg-white/20" />
                <div className="grid grid-cols-4 gap-2">
                  {['UGEMS', 'SENTECT', 'UGADON', 'YERACLE'].map((label, index) => (
                    <div key={label} className={`flex h-12 items-center justify-center border text-[10px] uppercase tracking-[0.18em] ${index % 2 === 0 ? 'border-green bg-green/20 text-white' : 'border-white/15 bg-white/5 text-white/80'}`}>
                      {label}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.18em] text-white/60">
                <span>Shared integrations</span>
                <span>18 links</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-rule bg-bond">
        <div className="container-vais grid gap-8 py-14 md:grid-cols-4 md:gap-0">
          {company.stats.map((stat) => (
            <div key={stat.label} className="border-t border-rule py-6 md:border-l md:border-t-0 md:px-5 md:first:border-l-0">
              <div className="font-display text-[clamp(1.5rem,2.5vw,2rem)] tracking-[-0.02em] text-ink">{stat.value}</div>
              <div className="mt-2 font-serif text-base leading-relaxed text-ink/75">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="container-vais py-20 md:py-24">
        <div className="space-y-6">
          {[
            ['APEX NEXUS', 'Executive oversight intelligence for Uganda’s 23 presidential strategic directives.', '23 directives tracked'],
            ['UGEMS', 'National school data infrastructure designed for offline operations and regional coordination.', '42,838 schools reachable'],
            ['SENTECT', 'Trust-graph security intelligence for telecom abuse and coordinated fraud networks.', '17M subscribers mapped'],
            ['YERACLE', 'Adversarial simulation for service integrity and critical path analysis.', 'Shortest-path attacks modelled'],
          ].map(([name, copy, metric], index) => (
            <article key={name} className="grid gap-6 border-t border-rule py-6 md:grid-cols-[180px_1fr_220px] md:items-center">
              <div className="flex items-center gap-3">
                <span className="h-3 w-3 border border-green bg-green" />
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/70">0{index + 1}</span>
              </div>
              <div>
                <h2 className="font-display text-2xl tracking-[-0.02em] text-ink">{name}</h2>
                <p className="mt-2 max-w-2xl text-base leading-relaxed text-ink/75">{copy}</p>
              </div>
              <div className="md:text-right">
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/60">Measure</div>
                <div className="mt-2 font-display text-xl text-ink">{metric}</div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-rule bg-field py-16 text-white">
        <div className="container-vais">
          <div className="mb-6 flex items-center justify-between gap-4 border-b border-white/15 pb-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/70">Sandbox / live system</p>
            <Link href="/sandbox/apex-nexus" className="font-mono text-[10px] uppercase tracking-[0.18em] text-white underline decoration-white/70 underline-offset-8">
              Open the sandbox
            </Link>
          </div>
          <div className="grid min-h-[280px] items-center border border-white/15 bg-white/5 p-6">
            <div className="grid gap-3 md:grid-cols-3">
              {['Directive stream', 'Field evidence', 'Decision trace'].map((label) => (
                <div key={label} className="border border-white/15 bg-white/5 p-4">
                  <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/60">{label}</div>
                  <div className="mt-4 h-24 border border-white/10 bg-green/10" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container-vais py-16 md:py-20">
        <div className="flex flex-col gap-6 border-t border-rule pt-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/65">Contact</p>
            <h2 className="mt-2 font-display text-3xl tracking-[-0.02em] text-ink">Tell us what the system has to survive.</h2>
          </div>
          <div className="space-y-2 text-base text-ink/75">
            <div>{company.address}</div>
            <div>{company.phonePrimary} / {company.phoneSecondary}</div>
            <div>{company.email}</div>
          </div>
        </div>
      </section>
    </main>
  );
}
