import { Button } from '@/components/ui/Button';

export function ContactCTA() {
  return (
    <section className="bg-vais-green-light border-t border-vais-border">
      <div className="container-vais py-12 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="font-sora text-lg text-vais-charcoal">Start a conversation</h4>
          <p className="text-vais-slate">Tell us about your problem and we'll propose an approach.</p>
        </div>
        <div>
          <Button href="/contact" variant="primary">Contact Us</Button>
        </div>
      </div>
    </section>
  );
}
