export type ArchitectureNode = {
  id: string;
  title: string;
  subtitle: string;
  detail: string;
  asset: "capture" | "vault" | "compute" | "network" | "cloud" | "review";
};

export type ArchitectureProfile = {
  summary: string;
  nodes: ArchitectureNode[];
  connections: string[];
  note?: string;
};

/** Editorial architecture views grounded in the project descriptions. */
export const architectureProfiles: Record<string, ArchitectureProfile> = {
  "apex-nexus": {
    summary: "Field evidence, bounded access, reviewed intelligence.",
    nodes: [
      {
        id: "field",
        title: "Field evidence",
        subtitle: "PWA · Service Workers",
        detail:
          "Field monitors submit evidence with photo proof. Service Workers support operation when the field app is offline.",
        asset: "capture",
      },
      {
        id: "mandates",
        title: "Role boundaries",
        subtitle: "PostgreSQL · RLS",
        detail:
          "Six role types are separated through database Row-Level Security. Access follows the mandate attached to each role.",
        asset: "vault",
      },
      {
        id: "briefing",
        title: "Reviewed briefings",
        subtitle: "Celery · Claude",
        detail:
          "Celery workers prepare AI-assisted briefings. Secretariat review is mandatory before an output reaches the Convener.",
        asset: "review",
      },
    ],
    connections: ["Evidence flow", "Briefing context"],
    note: "Human approval remains the final boundary before delivery.",
  },
  ugems: {
    summary: "A school can keep working while the national network waits.",
    nodes: [
      {
        id: "school",
        title: "School node",
        subtitle: "Electron · SQLCipher",
        detail:
          "School records are encrypted locally with AES-256. Device-specific keys combine the EMIS identity, provisioning salt and hardware fingerprint.",
        asset: "vault",
      },
      {
        id: "sync",
        title: "Sync agent",
        subtitle: "HMAC · Vector clocks",
        detail:
          "The sync agent signs payloads with HMAC-SHA256. Vector clocks resolve conflicts when a school reconnects.",
        asset: "network",
      },
      {
        id: "national",
        title: "National cloud",
        subtitle: "FastAPI · PostgreSQL RLS",
        detail:
          "The national backend receives synchronised school data. PostgreSQL Row-Level Security provides the cloud-side data boundary.",
        asset: "cloud",
      },
    ],
    connections: ["Signed payloads", "When connected"],
    note: "Offline operation belongs to the school node; synchronisation resumes with connectivity.",
  },
  ugadon: {
    summary: "Identity, campaign trust and administrator judgement.",
    nodes: [
      {
        id: "identity",
        title: "Identity checks",
        subtitle: "NIRA · URSB",
        detail:
          "The blueprint connects national identity and business registration checks to campaign onboarding.",
        asset: "vault",
      },
      {
        id: "trust",
        title: "Campaign trust",
        subtitle: "Trust Index · Fraud signals",
        detail:
          "Six weighted factors form the campaign Trust Index. Fraud detection is proposed at four points in the donation lifecycle.",
        asset: "compute",
      },
      {
        id: "decisions",
        title: "Human decisions",
        subtitle: "Review · Milestones",
        detail:
          "Administrators review campaigns and milestone-based disbursement. Only human administrators can freeze or suspend accounts.",
        asset: "review",
      },
    ],
    connections: ["Campaign context", "Review signals"],
    note: "Blueprint: automated signals do not constitute final decisions.",
  },
  ipsas: {
    summary:
      "Independent services support the examiner, from document to decision.",
    nodes: [
      {
        id: "documents",
        title: "Document intake",
        subtitle: "Ingestion · NLP",
        detail:
          "A dedicated service ingests patent documents. NLP extracts the technical specification for examination.",
        asset: "capture",
      },
      {
        id: "analysis",
        title: "Prior-art analysis",
        subtitle: "Search · AI recommendations",
        detail:
          "Separate services handle prior-art search and NLP analysis. The proposed AI layer provides recommendations to patent examiners.",
        asset: "compute",
      },
      {
        id: "examiner",
        title: "Examiner judgement",
        subtitle: "Workflow · ARIPO export",
        detail:
          "Certified examiners retain decision authority. A separate export service prepares ARIPO-compatible packages when escalation is needed.",
        asset: "review",
      },
    ],
    connections: ["Technical context", "Advisory findings"],
    note: "Blueprint: AI recommendations are advisory; decisions remain with certified examiners.",
  },
  gap: {
    summary:
      "Case intelligence with a visible human and legal decision boundary.",
    nodes: [
      {
        id: "evidence",
        title: "Bounded evidence",
        subtitle: "PostgreSQL · RLS",
        detail:
          "The design places privacy safeguards, consent-based processing and audit trails at the database boundary.",
        asset: "vault",
      },
      {
        id: "analysis",
        title: "Case analysis",
        subtitle: "FastAPI · Claude",
        detail:
          "The proposed intelligence layer supports case analysis, evidence management and operational intelligence. Its outputs are advisory.",
        asset: "compute",
      },
      {
        id: "oversight",
        title: "Legal oversight",
        subtitle: "Decision · Authority · Audit",
        detail:
          "The Legal Oversight Module records each recommendation alongside the human decision and cited legal authority. Certified officers retain investigative decisions.",
        asset: "review",
      },
    ],
    connections: ["Case context", "Recorded advice"],
    note: "Blueprint: the illustrated safeguards describe the proposed architecture.",
  },
  govsef: {
    summary:
      "One set of findings, two audiences, an explicit approval boundary.",
    nodes: [
      {
        id: "audit",
        title: "Infrastructure audit",
        subtitle: "SSH · Nmap · Lynis",
        detail:
          "The proposed agent connects through SSH and authenticated APIs to assess network topology, vulnerabilities and configuration baselines.",
        asset: "capture",
      },
      {
        id: "translation",
        title: "Finding translation",
        subtitle: "Python · Claude",
        detail:
          "A shared analysis produces technical findings and a plain-English executive summary. Remediation proposals include Ansible playbooks with rollback capability.",
        asset: "compute",
      },
      {
        id: "approval",
        title: "Approved remediation",
        subtitle: "Human review · Ansible",
        detail:
          "Every proposed Ansible playbook requires human approval before execution.",
        asset: "review",
      },
    ],
    connections: ["Audit findings", "Proposed playbooks"],
    note: "Blueprint: generated remediation is subject to human approval.",
  },
  sentect: {
    summary:
      "Live observation and sandbox exploration meet at the trust graph.",
    nodes: [
      {
        id: "streams",
        title: "Live signals",
        subtitle: "Kafka · Read-only",
        detail:
          "The proposed event streams bring signalling, BSS, mobile money and partner events into Kafka. SENTECT reads production systems without modifying them.",
        asset: "capture",
      },
      {
        id: "graph",
        title: "Trust geometry",
        subtitle: "Neo4j · Spectral analysis",
        detail:
          "Events are evaluated as proposed mutations to a weighted trust graph. Spectral analysis examines structural anomalies across connected threat classes.",
        asset: "network",
      },
      {
        id: "twin",
        title: "Sandbox counterpart",
        subtitle: "YERACLE · Digital twin",
        detail:
          "YERACLE explores attack paths exclusively in a sandboxed digital twin. Discovered paths are proposed to SENTECT through a supervised LEARN cycle.",
        asset: "compute",
      },
    ],
    connections: ["Event context", "Supervised feedback"],
    note: "Conceptual blueprint: the feedback link is not a production control path. SENTECT is read-only; YERACLE never touches production.",
  },
  yeracle: {
    summary: "Explore the possible attack path inside a sandboxed model.",
    nodes: [
      {
        id: "twin",
        title: "Digital twin",
        subtitle: "Sandboxed network model",
        detail:
          "The proposed twin models network architecture, authentication flows, API surfaces and signalling topology. Simulation stays inside this sandbox.",
        asset: "cloud",
      },
      {
        id: "paths",
        title: "Attack paths",
        subtitle: "PATHFINDER · CHAINBUILDER",
        detail:
          "PATHFINDER ranks paths through a directed attack graph. CHAINBUILDER models multi-stage campaigns for the Red Team Simulator.",
        asset: "network",
      },
      {
        id: "feedback",
        title: "Supervised feedback",
        subtitle: "Security briefs · SENTECT",
        detail:
          "Ranked vulnerability briefs go to the security team. New paths are proposed as detection rules through SENTECT's supervised LEARN cycle.",
        asset: "review",
      },
    ],
    connections: ["Modelled topology", "Proposed detections"],
    note: "Conceptual blueprint: YERACLE operates exclusively against a sandboxed digital twin and never touches production.",
  },
  "nk-uzima": {
    summary:
      "Local care records, resilient national sync, carefully scoped reporting.",
    nodes: [
      {
        id: "care",
        title: "Offline care",
        subtitle: "React Native · SQLCipher",
        detail:
          "The mobile app stores local records with AES-256 encryption. A separate USSD fallback supports feature phones through Africa's Talking.",
        asset: "capture",
      },
      {
        id: "sync",
        title: "Resilient sync",
        subtitle: "FastAPI · Celery",
        detail:
          "Background Celery tasks synchronise with Uganda's DHIS2 tracker API. Exponential backoff accommodates interrupted 3G connections.",
        asset: "network",
      },
      {
        id: "national",
        title: "National reporting",
        subtitle: "DHIS2 · Scoped API",
        detail:
          "DHIS2 receives national health data through its tracker API. A separate JWT-scoped, read-only reviewer API exposes reporting summaries without individual patient records.",
        asset: "cloud",
      },
    ],
    connections: ["Care records", "Background sync"],
    note: "External reviewer access is read-only and limited to reporting summaries.",
  },
  "crop-circles": {
    summary: "A shared market, reached through the phone a farmer already has.",
    nodes: [
      {
        id: "channels",
        title: "Farmer access",
        subtitle: "Mobile · Web · USSD",
        detail:
          "The blueprint includes mobile, web and feature-phone channels. USSD has a dedicated state-machine service that can scale independently.",
        asset: "capture",
      },
      {
        id: "intelligence",
        title: "Market intelligence",
        subtitle: "TimescaleDB · Redis",
        detail:
          "PostgreSQL with TimescaleDB holds crop-price and weather time-series. Redis pub/sub handles bursts of price updates.",
        asset: "compute",
      },
      {
        id: "exchange",
        title: "Connected exchange",
        subtitle: "Marketplace · Mobile money",
        detail:
          "The proposed services bring together peer-to-peer trade, logistics coordination and MTN or Airtel Mobile Money payments.",
        asset: "network",
      },
    ],
    connections: ["Shared market data", "Trading context"],
    note: "Blueprint: channels and exchange services are shown as related capabilities, not a fixed transaction sequence.",
  },
  "mubs-ec": {
    summary:
      "Keep eligibility attached to the student, and choice apart from identity.",
    nodes: [
      {
        id: "eligibility",
        title: "Voter access",
        subtitle: "OTP · Faculty scope",
        detail:
          "Students sign in with an OTP. Faculty-specific ballot access is enforced at both the API and database layers.",
        asset: "capture",
      },
      {
        id: "ballot",
        title: "Separated ballots",
        subtitle: "Vote tokens · PostgreSQL",
        detail:
          "Vote tokens are generated at submission and stored separately from identity records. The voter-to-choice linkage is not stored in plaintext.",
        asset: "vault",
      },
      {
        id: "audit",
        title: "Election review",
        subtitle: "Tamper-evident audit logs",
        detail:
          "Audit logs support post-election forensic review. The encrypted transaction layer is protected by audit logging.",
        asset: "review",
      },
    ],
    connections: ["Scoped ballot", "Audit context"],
  },
  yokoshing: {
    summary:
      "The tap works locally; signed transactions reconcile when connected.",
    nodes: [
      {
        id: "tap",
        title: "Canteen tap",
        subtitle: "NFC · MIFARE",
        detail:
          "The proposed terminal accepts an NFC card or wristband. It checks the balance locally when offline or against the central API when connected.",
        asset: "capture",
      },
      {
        id: "local",
        title: "Local ledger",
        subtitle: "SQLite · HMAC",
        detail:
          "An encrypted SQLite cache holds critical account data. Offline transactions are signed before entering the reconciliation queue.",
        asset: "vault",
      },
      {
        id: "account",
        title: "Connected account",
        subtitle: "FastAPI · Mobile money",
        detail:
          "Queued transactions reconcile after reconnection, with signature verification at the server. Parents top up through MTN or Airtel Mobile Money.",
        asset: "cloud",
      },
    ],
    connections: ["Local balance", "Signed reconciliation"],
    note: "Blueprint: the default offline spending limit is UGX 10,000 per student per day.",
  },
  veripath: {
    summary:
      "Two independent systems connect driver context with remembered roads.",
    nodes: [
      {
        id: "driver",
        title: "Driver context",
        subtitle: "EIDS · Multimodal sensing",
        detail:
          "EIDS combines facial, voice and steering-grip signals, with optional BLE wearables. Adaptive responses are described as suggestions that preserve driver autonomy.",
        asset: "capture",
      },
      {
        id: "road",
        title: "Road memory",
        subtitle: "LRM · PostGIS",
        detail:
          "Accelerometer signals, GPS and anonymised crowd reports form a persistent road intelligence layer. PostGIS provides its geospatial indexing.",
        asset: "network",
      },
      {
        id: "feedback",
        title: "Driving feedback",
        subtitle: "Routing · Driver suggestions",
        detail:
          "Together, the two systems form the proposed driver-vehicle-road feedback loop. Each system can also be deployed independently.",
        asset: "review",
      },
    ],
    connections: ["Shared driving context", "Feedback context"],
    note: "Prototype: EIDS and LRM are independent systems; the view shows their relationship, not a serial processing pipeline.",
  },
  kreesp: {
    summary:
      "From shipment signals to a reasoned, inspectable verification record.",
    nodes: [
      {
        id: "signals",
        title: "Shipment signals",
        subtitle: "MQTT · APIs · Vision",
        detail:
          "The proposed ingestion layer brings together IoT streams, API data and computer-vision image analysis.",
        asset: "capture",
      },
      {
        id: "reasoning",
        title: "Verification engine",
        subtitle: "Rules · Anomaly detection",
        detail:
          "Rule checks and machine-learning anomaly detection inform a shipment risk score. Each verification event includes the agent's reasoning.",
        asset: "compute",
      },
      {
        id: "records",
        title: "Trust records",
        subtitle: "Ethereum · ERC-8004",
        detail:
          "The blueprint specifies a blockchain layer for recording verification decisions and their reasoning through smart contracts.",
        asset: "vault",
      },
      {
        id: "inspection",
        title: "Visible verification",
        subtitle: "React · On-chain proofs",
        detail:
          "The dashboard exposes verification state and on-chain proofs for inspection.",
        asset: "review",
      },
    ],
    connections: ["Source evidence", "Decision record", "Inspection context"],
    note: "Blueprint: the diagram describes the proposed four-layer verification architecture.",
  },
  "vais-voice-ai": {
    summary:
      "Audio becomes searchable context, with privacy governing the model boundary.",
    nodes: [
      {
        id: "audio",
        title: "Audio understanding",
        subtitle: "Whisper · Diarisation",
        detail:
          "Audio ingestion supports WAV, MP3, M4A and WebM. Whisper transcription adds word-level timestamps and speaker diarisation.",
        asset: "capture",
      },
      {
        id: "retrieval",
        title: "Hybrid retrieval",
        subtitle: "Elasticsearch · Sentence-BERT",
        detail:
          "Full-text search, semantic embeddings and BM25 ranking provide three complementary routes into the audio archive.",
        asset: "network",
      },
      {
        id: "conversation",
        title: "Private conversation",
        subtitle: "Local Llama · Scoped fallback",
        detail:
          "Llama 3.1 8B handles local processing for sensitive content. Cloud fallback is available for complex queries only where privacy constraints permit.",
        asset: "compute",
      },
    ],
    connections: ["Transcribed context", "Retrieved context"],
    note: "Sensitive content stays within local processing; cloud fallback depends on the applicable privacy constraints.",
  },
};
