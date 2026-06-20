import { Button } from '@/components/ui/Button';
import Image from 'next/image';
import { company } from '@/data/company';
import { FadeIn } from '@/components/ui/FadeIn';

export function Hero() {
  return (
    <section className="relative bg-white border-b border-vais-border overflow-hidden">
      <div className="container-vais py-24 md:py-32">
        <div className="max-w-3xl">
          <FadeIn>
            <span className="text-xs font-mono text-vais-slate tracking-widest uppercase">{company.tagline}</span>
          </FadeIn>

          <FadeIn delay={0.05}>
            <h1 className="mt-4 font-sora font-800 text-display-lg text-vais-charcoal leading-tight">
              Applied intelligence systems for high-stakes deployments
            </h1>
          </FadeIn>

          <FadeIn delay={0.1}>
            <p className="mt-6 text-vais-slate">{company.description}</p>

            <div className="mt-8 flex items-center gap-3">
              <Button href="/work" variant="primary" className="hover:bg-vais-green-vibrant hover:border-vais-green-vibrant">Our Work</Button>
              <Button href="/contact" variant="outline">Contact Us</Button>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* Right-aligned decorative image panel */}
      <div className="hidden md:block absolute top-0 right-0 h-full w-2/5">
        <div className="relative h-full">
          <Image
            src="https://images.unsplash.com/photo-1655635131607-3202827a52a2?auto=format&fit=crop&w=1600&q=80"
            alt="abstract data pattern"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 0px, 40vw"
          />
          <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-l from-white/90 to-transparent" />
        </div>
      </div>
    </section>
  );
}
