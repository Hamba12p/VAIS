import type { ReactNode } from 'react';
// Content stays visible before hydration and when JavaScript is disabled.
export default function PageTransition({ children }: { children: ReactNode }) { return <>{children}</>; }
