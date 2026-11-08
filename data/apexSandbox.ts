export type ApexRole = {
  id: string;
  label: string;
  office: string;
  color: string;
};

export type ApexDirective = {
  id: string;
  title: string;
  pillar: string;
  ministry: string;
  status: 'green' | 'amber' | 'red';
  progress: number;
  note: string;
};

export const apexRoles: ApexRole[] = [
  { id: 'secretariat', label: 'Principal Secretary', office: 'DSEMR, OPM', color: '#08FFAA' },
  { id: 'convener', label: 'Executive Oversight', office: 'Office of the President', color: '#08D4FF' },
  { id: 'mda', label: 'MDA Director', office: 'MoWT', color: '#4CD97B' },
  { id: 'field', label: 'Field Monitor', office: 'OPM Verification Unit', color: '#9EFEE8' },
  { id: 'oversight', label: 'Inspectorate', office: 'IGG', color: '#6AEFC9' },
  { id: 'npa', label: 'Planning Authority', office: 'NPA', color: '#7FE7D4' },
];

export const apexMetrics = [
  { label: 'Presidential Directives', value: '23' },
  { label: 'National Completion', value: '63.7%' },
  { label: 'Districts Covered', value: '146' },
  { label: 'Verification Lag', value: '2.8 days' },
];

export const apexDirectives: ApexDirective[] = [
  {
    id: 'PD-003',
    title: 'Transport Infrastructure',
    pillar: 'Infrastructure & Climate Resilience',
    ministry: 'MoWT',
    status: 'green',
    progress: 58,
    note: 'Kampala–Jinja corridor land acquisition now at 88%.',
  },
  {
    id: 'PD-001',
    title: 'Industrial Transformation',
    pillar: 'Sustainable Production',
    ministry: 'MTIC',
    status: 'green',
    progress: 71,
    note: 'Namanve Phase II at 73% with 14 active factories.',
  },
  {
    id: 'PD-009',
    title: 'Financial Inclusion',
    pillar: 'Private Sector Development',
    ministry: 'BoU',
    status: 'green',
    progress: 69,
    note: 'Account ownership reached 73% nationwide.',
  },
  {
    id: 'PD-022',
    title: 'Local Governance',
    pillar: 'Governance & Security',
    ministry: 'MoLG',
    status: 'amber',
    progress: 60,
    note: 'Revenue performance lagging at 68% of annual target.',
  },
  {
    id: 'PD-011',
    title: 'Mineral Wealth',
    pillar: 'Sustainable Production',
    ministry: 'MEMD',
    status: 'amber',
    progress: 55,
    note: 'Formalization of artisanal miners requires acceleration.',
  },
  {
    id: 'PD-014',
    title: 'Public Procurement Integrity',
    pillar: 'Governance & Security',
    ministry: 'PPDA',
    status: 'red',
    progress: 38,
    note: 'Non-compliant procurements still concentrated in 4 MDAs.',
  },
];
