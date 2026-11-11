/** Dated external context, never product performance or an endorsement. */
export const research = {
  access: {
    value: "38%",
    label: "of people in Africa used the internet",
    scope: "ITU estimate · Africa · 2024",
    source: "ITU, Facts and Figures 2024",
    href: "https://www.itu.int/itu-d/reports/statistics/2024/11/10/ff24-internet-use/",
  },
  schools: {
    value: "40%",
    label: "of primary schools globally had internet connections",
    scope: "UNESCO GEM Report · Global · 2023",
    source: "UNESCO, Technology in education",
    href: "https://gem-report-2023.unesco.org/technology-in-education/",
  },
  security: {
    value: "6",
    label: "functions in the Cybersecurity Framework, including governance",
    scope: "NIST CSF 2.0 · Framework · 2024",
    source: "NIST, Cybersecurity Framework 2.0",
    href: "https://www.nist.gov/news-events/news/2024/02/nist-releases-version-20-landmark-cybersecurity-framework",
  },
  judgement: {
    value: "4",
    label: "AI risk functions: govern, map, measure and manage",
    scope: "NIST AI RMF 1.0 · Framework · 2023",
    source: "NIST, AI Risk Management Framework",
    href: "https://airc.nist.gov/airmf-resources/airmf/5-sec-core/",
  },
  roads: {
    value: "1.19m",
    label: "annual road traffic deaths estimated worldwide",
    scope: "WHO Global status report · 2023 edition",
    source: "WHO, Road safety",
    href: "https://www.who.int/teams/social-determinants-of-health/safety-and-mobility/road-safety",
  },
} as const;

export type ResearchKey = keyof typeof research;
export const projectContext: Record<
  string,
  { source: ResearchKey; title: string; copy: string }
> = {
  "apex-nexus": {
    source: "judgement",
    title: "A briefing should lead back to its evidence.",
    copy: "An executive summary is useful only when someone can examine how it was assembled. APEX NEXUS brings source records and review into the same workflow, so a draft can be questioned before it informs a decision.",
  },
  ugems: {
    source: "schools",
    title: "The school day cannot wait for a connection.",
    copy: "Attendance, fees and classroom records start where the work happens. UGEMS puts local operation first and treats synchronisation as a separate responsibility. UNESCO’s global connectivity finding helps explain that choice; it is not a measurement of Ugandan schools.",
  },
  ugadon: {
    source: "access",
    title: "Giving needs an accessible route and a clear trail.",
    copy: "The UGADON blueprint combines mobile-money channels with campaign review and proposed milestone checks. A simpler way to contribute still needs a way to question where the money goes. Regional access figures make channel choice a design consideration.",
  },
  ipsas: {
    source: "judgement",
    title: "Help an examiner find the evidence.",
    copy: "Patent review demands careful comparison. The IPSAS blueprint separates document search from the examiner’s judgement, keeping recommendations open to inspection. The design needs evaluation against real examination tasks before turnaround benefits can be claimed.",
  },
  gap: {
    source: "judgement",
    title: "A consequential decision needs a responsible person.",
    copy: "The GAP blueprint treats investigative assistance as a reviewable workflow. Sources, access boundaries and recorded human decisions matter throughout the process. A framework is a starting point for evaluation, not evidence of legal compliance or operational readiness.",
  },
  govsef: {
    source: "security",
    title: "A finding needs an owner and a next step.",
    copy: "GOVSEF proposes technical findings alongside explanations for the people who allocate time and resources. Approval before remediation keeps a suggested fix separate from permission to change a system. Governance belongs beside detection.",
  },
  sentect: {
    source: "security",
    title: "Follow a relationship across the gaps.",
    copy: "A suspicious event can look ordinary when viewed alone. SENTECT explores a shared graph of relationships across security signals. The blueprint keeps observation read-only; detection quality would need testing with representative evidence.",
  },
  yeracle: {
    source: "security",
    title: "Rehearse a failure before it becomes an incident.",
    copy: "YERACLE proposes a sandbox for exploring possible attack paths. Keeping the model apart from production makes assumptions easier to test safely. Its value would depend on how faithfully that model represents the environment.",
  },
  "nk-uzima": {
    source: "access",
    title: "Keep the record close to the care.",
    copy: "Community work can continue while connectivity is uneven. NK UZIMA’s design pairs local encounter recording with later synchronisation and scoped reporting. The regional access figure is background context, not a clinical finding or evidence of improved outcomes.",
  },
  "crop-circles": {
    source: "access",
    title: "Useful information should reach the phone already in hand.",
    copy: "Crop Circles proposes app, web and USSD access to agricultural information. Different channels allow the service to meet different devices and connections. Price and weather information would still need visible sources and freshness checks.",
  },
  "mubs-ec": {
    source: "security",
    title: "Participation and privacy have to coexist.",
    copy: "An election system must distinguish eligibility from a voter’s choice. MUBS EC’s architecture separates those responsibilities and includes an audit trail. Security evaluation must examine that separation; a framework alone cannot establish election integrity.",
  },
  yokoshing: {
    source: "schools",
    title: "A lunch queue is a poor place to depend on perfect Wi-Fi.",
    copy: "YOKOSHING explores local payment checks with later reconciliation. Offline spending needs limits and a clear way to handle conflicts when terminals reconnect. School connectivity research explains the constraint, without proving this payment design is ready for use.",
  },
  veripath: {
    source: "roads",
    title: "Road intelligence needs careful real-world validation.",
    copy: "VERIPATH explores driver signals and shared road observations. The scale of road harm gives this research a reason to exist. It also raises the standard of evidence: a prototype cannot establish that inferred driver states are accurate or that interventions reduce crashes.",
  },
  kreesp: {
    source: "judgement",
    title: "A permanent record is only as useful as its inputs.",
    copy: "KREESP proposes a trail from shipment observations to verification decisions. Keeping that trail inspectable helps reviewers question a result. Sensor reliability and evidence quality need their own checks; an immutable entry cannot make an incorrect observation true.",
  },
  "vais-voice-ai": {
    source: "judgement",
    title: "Make a conversation easier to find, and easier to check.",
    copy: "VAIS Voice AI explores searchable audio with local processing. A useful answer should let the listener return to the original recording. Evaluation needs to cover transcription errors, language variation and how confidently the system presents uncertain words.",
  },
};
