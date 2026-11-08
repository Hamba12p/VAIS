import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { company } from "@/data/company";
export function Footer() {
  return (
    <footer className="studio-footer">
      <div className="studio-container">
        <div className="footer-top">
          <div>
            <Link href="/" className="footer-wordmark" aria-label="VAIS home">
              VAIS<span>.</span>
            </Link>
            <p>
              Independent thinking.
              <br />
              Applied intelligence.
            </p>
          </div>
          <div className="footer-location">
            <p className="eyebrow">Rooted in Kampala</p>
            <p>
              {company.address}
              <br />
              Built for the world ahead.
            </p>
            <span className="eyebrow">00.3476° N / 32.5825° E</span>
          </div>
          <nav aria-label="Footer navigation">
            <Link href="/work">
              Our work <ArrowUpRight size={15} />
            </Link>
            <Link href="/about">
              The practice <ArrowUpRight size={15} />
            </Link>
            <Link href="/contact">
              Start a conversation <ArrowUpRight size={15} />
            </Link>
            <a href={`mailto:${company.email}`}>
              {company.email}
              <ArrowUpRight size={15} />
            </a>
          </nav>
        </div>
        <div className="footer-bottom eyebrow">
          <span>
            © {new Date().getFullYear()} VAIS. Applied Intelligence Systems.
          </span>
          <a href="#main-content">Back to top ↑</a>
          <span>Clarity is a competitive advantage.</span>
        </div>
      </div>
    </footer>
  );
}
