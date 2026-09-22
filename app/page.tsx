import Link from 'next/link';
import { company } from '@/data/company';
import { projects } from '@/data/projects';
import { projectProfiles } from '@/data/projectProfiles';

const paths = [
  { slug: 'ugems', place: 'At school', from: 'Attendance recorded', to: 'National records', condition: 'Sync when connected' },
  { slug: 'sentect', place: 'On the network', from: 'Fraud signals', to: 'Analyst investigation', condition: 'Read-only observation' },
  { slug: 'nk-uzima', place: 'In the community', from: 'Patient encounter', to: 'Health reporting', condition: 'Offline + USSD access' },
];

export default function Home() {
  return <>
    <section className="border-b border-rule">
      <div className="container-vais py-12 lg:py-20">
        <p className="font-mono text-xs uppercase tracking-[.14em] text-green">Applied intelligence systems / Makerere, Kampala</p>
        <div className="mt-8 grid items-start gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <div>
            <h1 className="max-w-2xl font-display text-[clamp(2.6rem,5.2vw,4.8rem)] leading-[1.02] tracking-[-.045em]">From a school register to a national system.</h1>
            <p className="mt-7 max-w-xl text-xl leading-relaxed text-ink/80">We build fraud detection, public-service software, and community health tools for institutions in Uganda. Designed around the people using them, and the connections they can count on.</p>
            <div className="mt-8 flex flex-wrap gap-5">
              <Link href="/work" className="bg-green px-6 py-3 font-display text-sm font-semibold text-white">Explore all {projects.length} systems <span aria-hidden="true">&#8599;</span></Link>
              <Link href="/contact" className="px-1 py-3 font-display text-sm font-semibold text-green underline underline-offset-4">Discuss a project</Link>
            </div>
          </div>
          <div className="bg-field p-6 text-bond sm:p-8">
            <h2 className="font-display text-xl text-bond">Where the work happens</h2>
            <p className="mt-2 text-sm text-bond/75">Three operating paths. Different constraints.</p>
            <div className="mt-7">
              {paths.map(item => <Link key={item.slug} href={'/work/' + item.slug} className="group block border-t border-bond/25 py-5 first:pt-5">
                <div className="flex items-center justify-between gap-3 font-display text-xs"><span className="text-bond/75">{item.place}</span><span className="text-signal">{projects.find(p => p.slug === item.slug)?.name} <span aria-hidden="true">&#8599;</span></span></div>
                <div className="mt-3 flex items-center gap-3 font-display text-sm sm:text-base"><span>{item.from}</span><span aria-hidden="true" className="h-px min-w-5 flex-1 bg-signal/60" /><span>{item.to}</span></div>
                <p className="mt-3 border-l-2 border-signal pl-3 text-xs text-bond/75">{item.condition}</p>
              </Link>)}
            </div>
            <p className="border-t border-bond/25 pt-4 font-display text-xs text-bond/75">Architecture illustrated / not live telemetry</p>
          </div>
        </div>
      </div>
    </section>

    <section className="container-vais py-16 md:py-24" aria-labelledby="selected-work">
      <div className="flex flex-wrap items-end justify-between gap-5 border-b border-rule pb-6">
        <div><p className="font-mono text-xs uppercase tracking-[.14em] text-green">Selected work</p><h2 id="selected-work" className="mt-3 font-display text-3xl md:text-4xl">Built around an operating constraint.</h2></div>
        <Link href="/work" className="font-display text-sm text-green underline underline-offset-4">Browse by sector</Link>
      </div>
      <div className="grid gap-8 py-10 lg:grid-cols-[.6fr_1.4fr]">
        <div><p className="font-mono text-xs uppercase tracking-[.12em] text-green">Security & intelligence</p><h3 className="mt-4 font-display text-3xl leading-tight">Observe the network.<br />Rehearse the threat.</h3><p className="mt-4 text-ink/80">SENTECT and YERACLE approach the same security boundary from different directions.</p></div>
        <div className="grid gap-6 sm:grid-cols-2">{['sentect','yeracle'].map(slug => <article key={slug} className="border-l-2 border-green pl-5"><p className="font-display text-xs uppercase tracking-wider text-green">{slug === 'sentect' ? 'Detection' : 'Simulation'}</p><h4 className="mt-3 font-display text-2xl"><Link href={'/work/'+slug} className="underline decoration-rule underline-offset-4 hover:decoration-green">{slug.toUpperCase()} <span aria-hidden="true">&#8599;</span></Link></h4><p className="mt-3 text-ink/80">{projectProfiles[slug].purpose}</p><p className="mt-5 font-display text-sm text-green">{slug === 'sentect' ? 'Production events to analyst' : 'Digital twin to ranked attack paths'}</p></article>)}</div>
      </div>
      <div className="grid border-t border-rule md:grid-cols-2">{['ugems','nk-uzima'].map((slug) => <article key={slug} className="py-8 first:border-b first:border-rule md:first:border-b-0 md:first:border-r md:first:pr-10 md:last:pl-10"><p className="font-mono text-xs uppercase tracking-[.12em] text-green">{slug === 'ugems' ? 'Education / offline records' : 'Health / community care'}</p><h3 className="mt-4 font-display text-3xl"><Link href={'/work/'+slug} className="underline decoration-rule underline-offset-4 hover:decoration-green">{slug === 'ugems' ? 'UGEMS' : 'NK UZIMA'} <span aria-hidden="true">&#8599;</span></Link></h3><p className="mt-4 max-w-lg text-ink/80">{projectProfiles[slug].purpose}</p></article>)}</div>
    </section>

    <section className="bg-field py-14 text-bond">
      <div className="container-vais grid gap-8 md:grid-cols-[1fr_1fr] md:items-center">
        <div><p className="font-mono text-xs uppercase tracking-[.14em] text-signal">APEX NEXUS / interactive demonstration</p><h2 className="mt-4 font-display text-3xl leading-tight text-bond">Follow a directive from field evidence to review.</h2><p className="mt-5 text-bond/80">Switch between roles in the simulated console to see how reporting and oversight views differ. The demonstration uses sample data.</p></div>
        <div className="border-l-2 border-signal pl-6"><p className="font-display text-lg">MDA report <span aria-hidden="true">&#8594;</span> field evidence <span aria-hidden="true">&#8594;</span> Secretariat review</p><Link href="/sandbox/apex-nexus" className="mt-6 inline-block bg-bond px-5 py-3 font-display text-sm font-semibold text-ink">Try the APEX demonstration <span aria-hidden="true">&#8599;</span></Link></div>
      </div>
    </section>

    <section className="container-vais py-16 md:py-20"><div className="grid gap-8 md:grid-cols-[1.3fr_1fr]"><div><h2 className="font-display text-3xl md:text-4xl">What needs to work better?</h2><p className="mt-4 max-w-xl text-ink/80">Tell us who uses the system, what it needs to connect to, and where the current process breaks down.</p><Link href="/contact" className="mt-6 inline-block font-display text-base font-semibold text-green underline underline-offset-4">Contact VAIS</Link></div><address className="space-y-2 self-end not-italic text-ink/80"><p>{company.address}</p><a className="block underline underline-offset-4" href={'mailto:'+company.email}>{company.email}</a><a className="block" href={'tel:+256'+company.phonePrimary.slice(1)}>{company.phonePrimary}</a></address></div></section>
  </>;
}
