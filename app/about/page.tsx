import type { Metadata } from 'next';
import Link from 'next/link';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { FadeIn } from '@/components/ui/FadeIn';
import { company } from '@/data/company';
import { LocationSignal } from '@/components/about/LocationSignal';
import { Button } from '@/components/ui/Button';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About',
  description: 'VAIS — Applied Intelligence Systems. Makerere, Kampala, Uganda.',
};

const capabilities = [
  {
    title: 'Civic & Government Systems',
    body: 'National-grade platforms for directive tracking, school data infrastructure, patent examination, sovereign crowdfunding, and election administration. Designed for NITA-U deployment and constitutional compliance.',
  },
  {
    title: 'Security & Intelligence',
    body: 'Behavioral trust graph engines, autonomous government IT security agents, and predictive attack simulation systems for critical national infrastructure and telecom operators.',
  },
  {
    title: 'Health & Community Platforms',
    body: 'Offline-first community health and insurance platforms with DHIS2 national integration, ART retention tracking, and USSD access for feature phones across Uganda\'s health network.',
  },
  {
    title: 'Agricultural Technology',
    body: 'Full-stack platforms for smallholder farming — market price intelligence, logistics coordination, weather and pest alerts, and mobile money-enabled transactions across MTN and Airtel networks.',
  },
  {
    title: 'Fintech & Institutional Platforms',
    body: 'NFC-enabled cashless payment systems, secure voting infrastructure, and enterprise voice intelligence platforms. Built for Uganda\'s connectivity reality — offline-capable, mobile money-integrated.',
  },
  {
    title: 'Enterprise Intelligence',
    body: 'Autonomous AI supply chain verification agents with blockchain trust records, and automotive intelligence systems combining real-time driver monitoring with crowd-sourced road memory.',
  },
];

const integrations = [
  'NITA-U Infrastructure',
  'NIRA API (National ID)',
  'URSB API',
  'DHIS2 Uganda MOH',
  "Africa's Talking (USSD + SMS)",
  'MTN MoMo API',
  'Airtel Money API',
  'Tecnotree BSS Suite 5',
  'Ericsson Charging & Mediation',
  'PesaLink',
  'Flutterwave',
  'Anthropic Claude API',
];

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <div className="border-b border-vais-border bg-vais-surface">
        <div className="container-vais py-20 md:py-28">
          <div className="max-w-3xl">
            <SectionHeader
              label="About VAIS"
              heading="Applied Intelligence Systems."
              subheading={company.description}
            />
            <div className="flex flex-wrap gap-4 mt-8">
              <Button href="/work" variant="primary" size="md">
                View Our Work <ArrowRight size={14} />
              </Button>
              <Button href="/contact" variant="outline" size="md">
                Get in Touch
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="border-b border-vais-border bg-vais-charcoal">
        <div className="container-vais py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {company.stats.map((stat) => (
              <div key={stat.label}>
                <p className="font-sora font-800 text-3xl text-white">{stat.value}</p>
                <p className="text-xs font-mono text-white/50 uppercase tracking-widest mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* What we build */}
      <div className="border-b border-vais-border">
        <div className="container-vais py-20">
          <SectionHeader
            label="Capabilities"
            heading="What VAIS builds."
            className="mb-12"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((cap, i) => (
              <FadeIn key={cap.title} delay={i * 0.04}>
                <div className="border border-vais-border rounded-vais-md p-6 bg-white">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-xs font-mono text-vais-green font-medium">0{i + 1}</span>
                    <h3 className="font-sora font-600 text-vais-charcoal">{cap.title}</h3>
                  </div>
                  <p className="text-sm text-vais-slate leading-relaxed">{cap.body}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>

      {/* How we build */}
      <div className="border-b border-vais-border bg-vais-surface">
        <div className="container-vais py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <SectionHeader
                label="Approach"
                heading="Built for Uganda's operational reality."
                className="mb-6"
              />
              <div className="flex flex-col gap-5 text-vais-slate leading-relaxed">
                <p>
                  Every system we build is designed from the constraints outward. Uganda's connectivity landscape — intermittent power, variable bandwidth, 3G as the primary mobile standard for most users — is not an obstacle to work around. It is the design premise.
                </p>
                <p>
                  Constitutional compliance is architectural, not procedural. When we build for government, privacy safeguards, access controls, and audit trails are enforced at the database layer — not bypassable through application logic.
                </p>
                <p>
                  Our work integrates deeply with Uganda's national infrastructure: NITA-U hosting, NIRA identity verification, URSB registration, DHIS2 health data, Africa's Talking telecoms, and MTN and Airtel mobile money networks.
                </p>
              </div>
            </div>
            <div>
              <p className="text-xs font-mono text-vais-slate uppercase tracking-widest mb-5">National Integration Points</p>
              <div className="flex flex-wrap gap-2">
                {integrations.map((item) => (
                  <span
                    key={item}
                    className="text-xs font-mono text-vais-charcoal bg-white border border-vais-border px-3 py-1.5 rounded-vais"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Location */}
      <div className="container-vais py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left column — existing text content, unchanged */}
          <div className="flex flex-col gap-4">
            <span className="text-xs font-mono text-vais-green-vibrant uppercase tracking-widest">
              Location
            </span>
            <h2 className="font-sora font-700 text-display-md text-vais-charcoal">
              Makerere, Kampala.
            </h2>
            <p className="text-vais-slate text-sm leading-relaxed">
              Makerere, Kampala, Uganda
            </p>
            <div className="mt-2">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 font-inter font-medium transition-all duration-200 rounded-vais whitespace-nowrap bg-vais-green text-white hover:bg-vais-green-dark border border-vais-green hover:border-vais-green-dark text-sm px-4 py-2"
              >
                Contact VAIS →
              </Link>
            </div>
          </div>

          {/* Right column — Signal Pulse radar */}
          <LocationSignal />

        </div>
      </div>
    </div>
  );
}
