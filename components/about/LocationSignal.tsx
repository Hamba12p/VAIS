// components/about/LocationSignal.tsx
// Pure SVG/CSS — Server Component compatible, no 'use client' needed

export function LocationSignal() {
  return (
    <div
      className="relative bg-vais-charcoal rounded-vais overflow-hidden w-full min-h-[260px] md:min-h-[340px]"
      aria-label="VAIS headquarters location signal — Makerere, Kampala, Uganda"
      role="img"
    >
      {/* Dot grid background */}
      <div className="vais-loc-dotgrid absolute inset-0" />

      {/* Radial vignette — teal-tinted subtle glow to preserve brand color */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(15,118,110,0.08) 0%, rgba(15,118,110,0.06) 25%, rgba(28,31,34,0.9) 92%)',
        }}
      />

      {/* Top-right label */}
      <span className="absolute top-5 right-5 z-20 text-xs font-mono text-white/30 uppercase tracking-widest select-none">
        Location Signal
      </span>

      {/* SVG radar — centred in panel */}
      <div className="absolute inset-0 flex items-center justify-center z-20 p-4">
        <svg
          className="w-56 h-56 md:w-72 md:h-72"
          viewBox="0 0 280 280"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* Crosshair guide lines */}
          <line x1="140" y1="0"   x2="140" y2="280" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
          <line x1="0"   y1="140" x2="280" y2="140" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />

          {/* Static reference rings */}
          <circle cx="140" cy="140" r="48"  fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="0.8" />
          <circle cx="140" cy="140" r="90"  fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="0.8" />
          <circle cx="140" cy="140" r="130" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="0.8" />

          {/* Animated pulse rings — styled via globals.css (teal-tinted) */}
          <circle className="vais-pulse-ring"       cx="140" cy="140" r="130" fill="none" stroke="rgba(15,118,110,0.28)" strokeWidth="1.5" />
          <circle className="vais-pulse-ring vais-pulse-ring--d1" cx="140" cy="140" r="130" fill="none" stroke="rgba(15,118,110,0.28)" strokeWidth="1.5" />
          <circle className="vais-pulse-ring vais-pulse-ring--d2" cx="140" cy="140" r="130" fill="none" stroke="rgba(15,118,110,0.28)" strokeWidth="1.5" />

          {/* Centre marker */}
          {/* Centre marker: brand teal with soft teal halo */}
          <defs>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="6" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <circle cx="140" cy="140" r="10" fill="rgba(15,118,110,0.18)" filter="url(#glow)" />
          <circle cx="140" cy="140" r="7"   fill="#0F766E" />
          <circle cx="140" cy="140" r="3.5" fill="#9fe1cb" />

          {/* Crosshair tick marks */}
          <line x1="140" y1="130" x2="140" y2="122" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
          <line x1="140" y1="150" x2="140" y2="158" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
          <line x1="130" y1="140" x2="122" y2="140" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
          <line x1="150" y1="140" x2="158" y2="140" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
        </svg>
      </div>

      {/* "VAIS HQ" label — positioned just right of centre dot */}
      <div
        className="absolute z-30 font-mono text-xs font-bold text-vais-green-vibrant tracking-wide whitespace-nowrap select-none"
        style={{ top: '50%', left: 'calc(50% + 22px)', transform: 'translateY(-50%)' }}
      >
        VAIS HQ
      </div>

      {/* Coordinate readout — bottom-left */}
      <div className="absolute bottom-5 left-5 z-30 font-mono select-none">
        <p className="text-xs text-vais-green-vibrant uppercase tracking-widest mb-1 opacity-70">
          Coordinates
        </p>
        <p className="text-xs text-white/50">0°20&apos;18.8&quot;N</p>
        <p className="text-xs text-white/50">32°33&apos;39.9&quot;E</p>
      </div>
    </div>
  )
}
