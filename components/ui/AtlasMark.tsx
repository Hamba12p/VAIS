/** Original contour study. A visual signature, not a data visualisation. */
export function AtlasMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 360 360"
      fill="none"
      aria-hidden="true"
      className={`atlas-mark ${className}`}
    >
      <g stroke="currentColor" strokeWidth=".7">
        {Array.from({ length: 18 }, (_, i) => (
          <ellipse
            key={i}
            cx="180"
            cy="180"
            rx={40 + i * 6.7}
            ry={95 + i * 3.1}
            transform={`rotate(${i * 8} 180 180)`}
          />
        ))}
        <path d="M0 180H360M180 0V360" strokeDasharray="2 8" opacity=".5" />
        <circle cx="180" cy="180" r="5" fill="currentColor" />
      </g>
      <path
        d="M24 12V36M12 24H36M324 336H348M336 324V348"
        stroke="currentColor"
      />
    </svg>
  );
}
