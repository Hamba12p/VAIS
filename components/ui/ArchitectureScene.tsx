"use client";

import { useId, useRef, useState, type CSSProperties } from "react";
import { Layers3, MoveUpRight, ArrowRight } from "lucide-react";
import { DimensionalAsset } from "./DimensionalAsset";
import { useMotionPreference } from "@/lib/hooks/useMotionPreference";
import type {
  ArchitectureNode,
  ArchitectureProfile,
} from "@/data/architectures";

function ArchitectureObject({
  node,
  selected,
  onSelect,
  motionAllowed,
}: {
  node: ArchitectureNode;
  selected: boolean;
  onSelect: () => void;
  motionAllowed: boolean;
}) {
  const bounds = useRef<DOMRect | null>(null);
  return (
    <button
      type="button"
      className={`architecture-object ${selected ? "object-selected" : ""}`}
      aria-pressed={selected}
      aria-label={`Inspect ${node.title}`}
      onClick={onSelect}
      onPointerEnter={(e) => {
        bounds.current =
          motionAllowed && e.pointerType === "mouse"
            ? e.currentTarget.getBoundingClientRect()
            : null;
      }}
      onPointerMove={(e) => {
        const r = bounds.current;
        if (!r || !motionAllowed) return;
        const x = (e.clientX - r.left) / r.width;
        const y = (e.clientY - r.top) / r.height;
        e.currentTarget.style.setProperty(
          "--object-rotate-y",
          `${((x - 0.5) * 12).toFixed(2)}deg`,
        );
        e.currentTarget.style.setProperty(
          "--object-rotate-x",
          `${((0.5 - y) * 8).toFixed(2)}deg`,
        );
        e.currentTarget.style.setProperty(
          "--object-light-x",
          `${(x * 100).toFixed(2)}%`,
        );
      }}
      onPointerLeave={(e) => {
        bounds.current = null;
        e.currentTarget.style.setProperty("--object-rotate-x", "0deg");
        e.currentTarget.style.setProperty("--object-rotate-y", "0deg");
        e.currentTarget.style.setProperty("--object-light-x", "50%");
      }}
    >
      <span className="architecture-object-art">
        <span className="object-halo" />
        <DimensionalAsset kind={node.asset} className="dimensional-object" />
        <span className="object-ground" />
      </span>
      <span className="architecture-object-label">
        <strong>{node.title}</strong>
        <span>{node.subtitle}</span>
      </span>
      <span className="object-select-mark" aria-hidden="true">
        <MoveUpRight size={14} />
      </span>
    </button>
  );
}

export function ArchitectureScene({
  profile,
  label,
  compact = false,
  activeId,
  onSelect,
}: {
  profile: ArchitectureProfile;
  label: string;
  compact?: boolean;
  activeId?: string;
  onSelect?: (id: string) => void;
}) {
  const [localId, setLocalId] = useState(profile.nodes[0].id);
  const [separated, setSeparated] = useState(false);
  const { reduceMotion } = useMotionPreference();
  const uid = useId();
  const selected =
    profile.nodes.find((n) => n.id === (activeId ?? localId)) ??
    profile.nodes[0];
  const select = (node: ArchitectureNode) => {
    setLocalId(node.id);
    onSelect?.(node.id);
  };
  return (
    <div
      className={`architecture-scene ${compact ? "architecture-scene-compact" : ""} ${separated ? "architecture-separated" : ""} ${reduceMotion ? "architecture-static" : ""}`}
    >
      <header className="architecture-scene-header">
        <div>
          <p className="eyebrow">
            {compact ? "The thinking, made visible" : "System architecture"}
          </p>
          {!compact && <h3>{label}</h3>}
        </div>
        <button
          type="button"
          className="architecture-depth-control"
          aria-pressed={separated}
          aria-controls={`${uid}-objects`}
          onClick={() => setSeparated((v) => !v)}
        >
          <Layers3 size={16} />
          <span>{separated ? "Bring layers together" : "Separate layers"}</span>
        </button>
      </header>
      {!compact && <p className="architecture-summary">{profile.summary}</p>}
      <div
        id={`${uid}-objects`}
        className="architecture-objects"
        style={{ "--object-count": profile.nodes.length } as CSSProperties}
        aria-label={`${label} architecture components`}
      >
        {profile.nodes.map((node, i) => (
          <div className="architecture-node" key={node.id}>
            <ArchitectureObject
              node={node}
              selected={selected.id === node.id}
              onSelect={() => select(node)}
              motionAllowed={!reduceMotion}
            />
            {i < profile.nodes.length - 1 && (
              <span className="architecture-connection" aria-hidden="true">
                <span className="connection-line">
                  <i />
                  <i />
                  <i />
                </span>
                <span>{profile.connections[i] ?? "Connected context"}</span>
              </span>
            )}
          </div>
        ))}
      </div>
      <div
        className="architecture-inspection"
        aria-labelledby={`${uid}-detail-title`}
      >
        <div>
          <span className="inspection-dot" />
          <h4 id={`${uid}-detail-title`}>{selected.title}</h4>
          <ArrowRight size={17} aria-hidden="true" />
        </div>
        <p>{selected.detail}</p>
      </div>
      <span className="sr-only" role="status">
        {selected.title} details shown.
      </span>
      {profile.note && <p className="architecture-boundary">{profile.note}</p>}
    </div>
  );
}
