import type { CSSProperties } from "react";
export function SystemArtwork({
  kind,
}: {
  kind: "apex" | "education" | "security";
}) {
  return (
    <div className={`system-artwork artwork-${kind}`} aria-hidden="true">
      {kind === "apex" && (
        <div className="apex-stack">
          {Array.from({ length: 7 }, (_, i) => (
            <span key={i} style={{ "--layer": i } as CSSProperties}>
              <i />
              <i />
              <i />
            </span>
          ))}
          <b />
        </div>
      )}
      {kind === "education" && (
        <div className="education-network">
          {Array.from({ length: 9 }, (_, i) => (
            <span key={i} style={{ "--node": i } as CSSProperties}>
              <i />
            </span>
          ))}
          <div className="network-orbit" />
          <div className="network-orbit second-orbit" />
        </div>
      )}
      {kind === "security" && (
        <div className="security-orb">
          {Array.from({ length: 12 }, (_, i) => (
            <span key={i} style={{ "--ring": i } as CSSProperties} />
          ))}
          <i className="orb-core" />
        </div>
      )}
    </div>
  );
}
