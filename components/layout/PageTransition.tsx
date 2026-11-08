"use client";

import { usePathname } from "next/navigation";

export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // CSS handles motion preferences before hydration. Content never waits for
  // an exit animation or JavaScript to become visible.
  return (
    <div key={pathname} className="page-transition">
      {children}
    </div>
  );
}
