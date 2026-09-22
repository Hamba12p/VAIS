/** Editorial summaries derived from data/projects.ts; diagrams describe architecture, not live telemetry. */
export interface ProjectProfile {
  purpose: string;
  audience: string;
  inputs: string[];
  process: string;
  outputs: string[];
  boundary: string;
  mode: 'review' | 'offline' | 'defence' | 'simulation' | 'verification' | 'private';
}

export const projectProfiles: Record<string, ProjectProfile> = {
  'apex-nexus': {
    purpose: 'Tracks presidential directives, verifies field evidence, and drafts briefings for Secretariat review.',
    audience: 'Secretariat teams and field monitors',
    inputs: ['MDA progress reports', 'Field evidence'], process: 'Directive tracking', outputs: ['Secretariat review', 'Executive briefing'],
    boundary: 'A person reviews each AI briefing before it reaches the Convener.', mode: 'review',
  },
  ugems: {
    purpose: 'Keeps school attendance, enrolment, and fee records working offline, then syncs them for national reporting.',
    audience: 'Schools and district education officers',
    inputs: ['School computer', 'Classroom attendance'], process: 'Encrypted local records', outputs: ['Sync when connected', 'National reporting'],
    boundary: 'School work continues without a connection; records synchronise when connectivity returns.', mode: 'offline',
  },
  ugadon: {
    purpose: 'Verifies crowdfunding campaigns and collects donations through mobile money, banks, and USSD.',
    audience: 'Campaign organisers, donors, and reviewers',
    inputs: ['Identity verification', 'Campaign evidence'], process: 'Campaign review', outputs: ['Payment collection', 'Milestone disbursement'],
    boundary: 'Fraud signals inform human reviewers; administrators decide whether to suspend a campaign.', mode: 'verification',
  },
  ipsas: {
    purpose: 'Helps patent examiners search prior art and assess software inventions while keeping decisions with the examiner.',
    audience: 'Software patent examiners',
    inputs: ['Patent application', 'Prior-art databases'], process: 'Technical analysis', outputs: ['Examiner review', 'ARIPO export'],
    boundary: 'AI recommendations are advisory; the examiner makes the decision.', mode: 'review',
  },
  gap: {
    purpose: 'Brings police case analysis, evidence management, and operational intelligence into one officer-led workflow.',
    audience: 'Investigators and oversight teams',
    inputs: ['Case records', 'Evidence'], process: 'Advisory analysis', outputs: ['Officer decision', 'Oversight audit trail'],
    boundary: 'The design records AI recommendations alongside human decisions and their cited authority.', mode: 'review',
  },
  govsef: {
    purpose: 'Audits government IT systems and prepares technical fixes and plain-language reports from the same scan.',
    audience: 'Government IT teams and department leaders',
    inputs: ['Infrastructure scan', 'Configuration checks'], process: 'Security findings', outputs: ['Executive report', 'Remediation playbook'],
    boundary: 'An administrator approves each remediation playbook before execution.', mode: 'review',
  },
  sentect: {
    purpose: 'Detects telecom fraud by connecting network, account, and mobile-money signals in one trust graph.',
    audience: 'Telecom fraud and network security analysts',
    inputs: ['Network signalling', 'Subscriber accounts', 'Mobile-money events'], process: 'Trust graph analysis', outputs: ['Anomaly signals', 'Analyst investigation'],
    boundary: 'Observation only: the architecture reads events without writing to production systems.', mode: 'defence',
  },
  yeracle: {
    purpose: 'Simulates attack paths against a telecom digital twin so security teams can address weaknesses before an attack.',
    audience: 'Telecom security and red-team analysts',
    inputs: ['Network digital twin', 'Threat intelligence'], process: 'Attack-path simulation', outputs: ['Ranked weaknesses', 'SENTECT rule proposals'],
    boundary: 'Simulation stays inside the digital twin; proposed detection rules feed back into supervised review.', mode: 'simulation',
  },
  'nk-uzima': {
    purpose: 'Helps community health workers record visits, follow up treatment, and report to DHIS2, including offline and USSD access.',
    audience: 'Community health workers and programme teams',
    inputs: ['Offline patient visit', 'USSD access'], process: 'Community health records', outputs: ['Treatment follow-up', 'DHIS2 reporting'],
    boundary: 'External reviewers receive reporting summaries, not individual patient records.', mode: 'offline',
  },
  'crop-circles': {
    purpose: 'Connects smallholder farmers to crop prices, buyers, transport, and mobile payments through apps and USSD.',
    audience: 'Smallholder farmers, buyers, and transporters',
    inputs: ['App or USSD request', 'Market and weather data'], process: 'Farm marketplace', outputs: ['Buyer and logistics match', 'Mobile-money payment'],
    boundary: 'The USSD channel has its own session service for farmers using feature phones.', mode: 'offline',
  },
  'mubs-ec': {
    purpose: 'Runs student elections with one-time-code sign-in, faculty-specific ballots, and anonymised vote records.',
    audience: 'Students and university election administrators',
    inputs: ['Student verification', 'Faculty ballot'], process: 'Anonymised vote token', outputs: ['Ballot count', 'Election audit trail'],
    boundary: 'Identity records and vote tokens are stored separately in the described architecture.', mode: 'private',
  },
  yokoshing: {
    purpose: 'Lets students pay at school canteens with NFC cards, including offline, while parents top up with mobile money.',
    audience: 'Students, parents, and school canteens',
    inputs: ['Student NFC tap', 'Parent top-up'], process: 'Local balance check', outputs: ['Signed payment queue', 'Reconcile when connected'],
    boundary: 'Offline payments are signed and checked during reconciliation.', mode: 'offline',
  },
  veripath: {
    purpose: 'Combines driver-fatigue monitoring with shared road-hazard records to support safer driving decisions.',
    audience: 'Drivers and vehicle-system teams',
    inputs: ['Driver-state signals', 'Road sensor reports'], process: 'Driver / road assessment', outputs: ['Driver suggestions', 'Shared hazard memory'],
    boundary: 'Driver monitoring and road memory are independently deployable; responses remain suggestions.', mode: 'private',
  },
  kreesp: {
    purpose: 'Checks shipments using sensor data, visual inspection, and documents, then records verification decisions for audit.',
    audience: 'Supply-chain operators and auditors',
    inputs: ['Shipment sensors', 'Images and documents'], process: 'Shipment risk assessment', outputs: ['Verification decision', 'On-chain audit record'],
    boundary: 'The verification record includes the reasoning behind each decision.', mode: 'verification',
  },
  'vais-voice-ai': {
    purpose: 'Transcribes recordings and makes audio archives searchable, with local processing for sensitive conversations.',
    audience: 'Teams working with interviews and recorded briefings',
    inputs: ['Audio recording', 'Archive query'], process: 'Local transcription / search', outputs: ['Timestamped transcript', 'Retrieved passages'],
    boundary: 'Sensitive content uses local processing; cloud fallback depends on the organisation’s privacy constraints.', mode: 'private',
  },
};
