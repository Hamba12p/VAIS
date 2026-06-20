import Link from 'next/link';
import Image from 'next/image';
import { company } from '@/data/company';
import { Button } from '@/components/ui/Button';

export function AboutTeaser() {
  return (
    <section className="container-vais py-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        <div className="md:col-span-2">
          <h3 className="font-sora text-display-md text-vais-charcoal">About VAIS</h3>
          <p className="mt-4 text-vais-slate">{company.description}</p>
        </div>
        <div className="flex items-center relative">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <Image
              src="https://images.unsplash.com/photo-1555589228-5dc844368071?auto=format&fit=crop&w=1600&q=80"
              alt="circuit board"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative">
            <Button href="/about" variant="outline">Learn More</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
