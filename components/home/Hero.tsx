import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { SignalField } from "@/components/ui/SignalField";
export function Hero() {
  return (
    <section className="intelligence-hero">
      <div className="hero-art">
        <Image
          src="/images/design/intelligence-strata.webp"
          alt="An original sculptural landscape of obsidian strata opening around a luminous mineral seam"
          fill
          priority
          sizes="100vw"
          className="hero-landscape"
        />
      </div>
      <div className="hero-shade" />
      <SignalField controls />
      <div className="studio-container hero-inner">
        <div className="hero-topline eyebrow">
          <span>
            <i className="availability-dot" /> Independent thinking. Applied
            intelligence.
          </span>
          <span className="hero-edition">Kampala, Uganda / 00.3476° N</span>
        </div>
        <div className="hero-copy">
          <p className="eyebrow hero-label">
            VAIS / Applied intelligence systems
          </p>
          <h1>
            The intelligence
            <br />
            <span className="serif-accent">beneath.</span>
          </h1>
          <p className="hero-description">
            We turn institutional complexity into
            <br className="desktop-break" /> systems of clarity, resilience and
            possibility.
          </p>
          <div className="hero-actions">
            <Link href="/work" className="studio-button mint-button">
              Explore our systems <ArrowUpRight size={18} />
            </Link>
            <Link href="/contact" className="hero-secondary">
              Start a conversation <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
        <div className="hero-bottom">
          <a href="#approach" className="eyebrow hero-scroll">
            <span className="scroll-icon">
              <ArrowDown size={16} />
            </span>{" "}
            Discover what lies beneath
          </a>
          <span className="hero-art-note eyebrow">
            Rooted in Kampala
            <br />
            <span>Complexity → clarity</span>
          </span>
        </div>
      </div>
      <span className="hero-edge-label eyebrow" aria-hidden="true">
        Intelligence, shaped by reality.
      </span>
    </section>
  );
}
