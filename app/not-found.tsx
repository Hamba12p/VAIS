import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

export default function NotFound() {
  return (
    <section className="signal-missing">
      <div className="signal-missing-orbit" aria-hidden="true">
        <svg viewBox="0 0 680 680" fill="none">
          <g transform="rotate(-31 340 340)">
            <ellipse cx="340" cy="340" rx="291" ry="166" />
            <ellipse cx="340" cy="340" rx="250" ry="143" />
            <ellipse cx="340" cy="340" rx="209" ry="119" />
            <path d="M40 340h600M340 150v380" className="missing-axis" />
            <path d="M549 340a209 119 0 0 0-65-86" className="missing-signal" />
            <circle cx="549" cy="340" r="5" className="missing-point" />
            <circle cx="549" cy="340" r="16" className="missing-halo" />
          </g>
          <path d="M325 340h30M340 325v30" className="missing-centre" />
        </svg>
      </div>
      <div className="studio-container signal-missing-content">
        <p className="eyebrow">404 / Outside the field</p>
        <h1>
          A missing signal.
          <br />
          <span className="serif-accent">A new direction.</span>
        </h1>
        <p className="signal-missing-copy">
          This page has moved, or the address is incomplete. There is more to
          discover in our collection of systems.
        </p>
        <div className="signal-missing-actions">
          <Link href="/work" className="studio-button mint-button">
            Explore the work <ArrowUpRight size={18} />
          </Link>
          <Link href="/" className="text-link">
            <ArrowLeft size={16} /> Back to home
          </Link>
        </div>
      </div>
    </section>
  );
}
