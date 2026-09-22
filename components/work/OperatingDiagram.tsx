import type { ProjectProfile } from '@/data/projectProfiles';

const labels: Record<ProjectProfile['mode'], string> = {
  review: 'Human review', offline: 'Works across connection gaps', defence: 'Observe / investigate',
  simulation: 'Isolated simulation', verification: 'Evidence / verification', private: 'Privacy boundary',
};

export function OperatingDiagram({ profile, name }: { profile: ProjectProfile; name: string }) {
  const offline = profile.mode === 'offline';
  return <figure className="bg-field p-6 text-bond sm:p-8">
    <figcaption className="flex flex-wrap justify-between gap-3 border-b border-bond/25 pb-5 font-display text-sm">
      <span>{name} / operating path</span><span className="text-signal">{labels[profile.mode]}</span>
    </figcaption>
    <div className="grid items-center gap-5 py-8 md:grid-cols-[1fr_auto_1.2fr_auto_1fr]">
      <div className="space-y-3">{profile.inputs.map(input => <div key={input} className="border-l-2 border-bond/50 py-2 pl-4 font-display text-sm">{input}</div>)}</div>
      <span aria-hidden="true" className="text-center text-2xl text-signal md:rotate-[-90deg]">↓</span>
      <div className={`border ${offline ? 'border-dashed' : ''} border-signal bg-signal/10 px-5 py-6 text-center font-display text-lg font-semibold`}>{profile.process}</div>
      <span aria-hidden="true" className="text-center text-2xl text-signal md:rotate-[-90deg]">↓</span>
      <div className="space-y-3">{profile.outputs.map(output => <div key={output} className="border-l-2 border-signal py-2 pl-4 font-display text-sm">{output}</div>)}</div>
    </div>
    {profile.mode === 'simulation' && <p className="mb-5 border-b border-dashed border-signal/60 pb-3 font-display text-sm text-signal">Simulation results feed supervised detection-rule review.</p>}
    <p className="border-t border-bond/25 pt-5 text-base text-bond/85">{profile.boundary}</p>
    <p className="mt-4 font-display text-xs text-bond/70">Architecture illustration. No live system data.</p>
  </figure>;
}
