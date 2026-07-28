import { Hero } from '@/components/home/Hero';
import { OperationsRegister, type RegisterRow } from '@/components/ui/OperationsRegister';

const rows: RegisterRow[] = [
  {
    ref: '01',
    sector: 'Civic delivery',
    status: 'ACTIVE',
    coverage: '23 presidential directives tracked',
    summary: 'Directive and briefing workflows shaped for manual review, status visibility, and accountable handoff.',
  },
  {
    ref: '02',
    sector: 'Education infrastructure',
    status: 'DEPLOYED',
    coverage: '42,838 schools reachable',
    summary: 'Offline-first school data systems designed around national coverage rather than cloud-only assumptions.',
  },
  {
    ref: '03',
    sector: 'Health infrastructure',
    status: 'PILOT',
    coverage: 'DHIS2 Uganda integration and ART retention tracking',
    summary: 'Community health workflows built for low-connectivity environments and national reporting alignment.',
  },
  {
    ref: '04',
    sector: 'Security operations',
    status: 'ACTIVE',
    coverage: '17M+ subscriber context',
    summary: 'Read-only intelligence and scenario modeling for national-scale operational environments.',
  },
];

const notes = [
  {
    label: 'NOTE 01',
    title: 'Design principle',
    body: 'Offline-first and low-bandwidth by default. The system is designed from the operating constraint outward.',
  },
  {
    label: 'NOTE 02',
    title: 'Institutional fit',
    body: 'Auditability, role boundaries, and data-layer controls are treated as architecture, not presentation.',
  },
  {
    label: 'NOTE 03',
    title: 'National reach',
    body: 'The stack is built to integrate with the systems institutions already rely on, not to replace them with generic tooling.',
  },
];

export default function Home() {
  return (
    <div>
      <Hero />
      <OperationsRegister
        title="Operations ledger"
        intro="A compact register of the main program areas VAIS has built around. The layout is intentionally plain: sector, status, and coverage carry the weight."
        rows={rows}
        notes={notes}
      />
    </div>
  );
}
