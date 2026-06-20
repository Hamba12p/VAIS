import { Button } from '@/components/ui/Button';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="container-vais py-32 flex flex-col gap-6 max-w-lg">
      <span className="text-xs font-mono text-vais-green tracking-widest uppercase">404</span>
      <h1 className="font-sora font-700 text-display-md text-vais-charcoal">Page not found.</h1>
      <p className="text-vais-slate leading-relaxed">
        The page you requested does not exist or has been moved.
      </p>
      <div className="flex gap-4">
        <Button href="/" variant="primary" size="md">
          <ArrowLeft size={14} /> Back to Home
        </Button>
        <Button href="/work" variant="outline" size="md">
          View Work
        </Button>
      </div>
    </div>
  );
}
