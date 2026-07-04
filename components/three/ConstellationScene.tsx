"use client";

import { categoryColorMap, vais3dBrand } from '@/components/three/constants';
import { SceneCanvas } from '@/components/three/SceneCanvas';
import { projects } from '@/data/projects';
import { Html } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRouter } from 'next/navigation';
import { useMemo, useRef, useState } from 'react';
import * as THREE from 'three';

type ConstellationNode = {
  name: string;
  slug: string;
  category: string;
  position: [number, number, number];
  baseScale: number;
  phase: number;
};

function SystemsConstellation() {
  const router = useRouter();
  const groupRef = useRef<THREE.Group | null>(null);
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);
  const [pressedSlug, setPressedSlug] = useState<string | null>(null);

  const nodes = useMemo(() => {
    const categoryOrder = Array.from(new Set(projects.map((p) => p.category[0])));
    const radius = 4.8;
    const layout = projects.map((project, index) => {
      const category = project.category[0] ?? 'platform';
      const categoryIndex = categoryOrder.indexOf(category);
      const categoryCount = projects.filter((p) => (p.category[0] ?? 'platform') === category).length;
      const localIndex = projects
        .filter((p) => (p.category[0] ?? 'platform') === category)
        .findIndex((p) => p.slug === project.slug);

      const categoryAngle = (categoryIndex / Math.max(categoryOrder.length, 1)) * Math.PI * 2;
      const clusterCenter = new THREE.Vector3(
        Math.cos(categoryAngle) * radius,
        Math.sin(categoryAngle * 1.3) * 1.8,
        Math.sin(categoryAngle) * radius * 0.56
      );

      const spread = Math.max(0.8, 2.4 - categoryCount * 0.14);
      const localAngle = (localIndex / Math.max(categoryCount, 1)) * Math.PI * 2;

      const x = clusterCenter.x + Math.cos(localAngle) * spread + Math.sin(index * 0.7) * 0.35;
      const y = clusterCenter.y + Math.sin(localAngle * 1.7) * spread * 0.5;
      const z = clusterCenter.z + Math.cos(localAngle * 1.5) * spread * 0.64;

      return {
        name: `node_${project.slug}`,
        slug: project.slug,
        category,
        position: [x, y, z] as [number, number, number],
        baseScale: 0.46 + ((localIndex % 3) * 0.06),
        phase: localIndex * 0.65 + categoryIndex,
      } satisfies ConstellationNode;
    });

    return layout;
  }, []);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    groupRef.current.rotation.y = Math.sin(t * 0.09) * 0.06;
    groupRef.current.children.forEach((child, i) => {
      const node = nodes[i];
      if (!node) return;
      child.position.y = node.position[1] + Math.sin(t * 0.36 + node.phase) * 0.12;
    });
  });

  return (
    <group name="systems_constellation" ref={groupRef}>
      {nodes.map((node) => {
        const isHovered = hoveredSlug === node.slug;
        const isPressed = pressedSlug === node.slug;
        const accentColor = categoryColorMap[node.category] ?? vais3dBrand.accent;
        const scale = isPressed ? node.baseScale * 1.12 : isHovered ? node.baseScale * 1.2 : node.baseScale;

        return (
          <mesh
            key={node.slug}
            name={node.name}
            position={node.position}
            scale={scale}
            onPointerOver={(event) => {
              event.stopPropagation();
              setHoveredSlug(node.slug);
            }}
            onPointerOut={() => {
              setHoveredSlug((current) => (current === node.slug ? null : current));
              setPressedSlug((current) => (current === node.slug ? null : current));
            }}
            onPointerDown={(event) => {
              event.stopPropagation();
              setPressedSlug(node.slug);
            }}
            onPointerUp={() => {
              setPressedSlug(null);
              router.push(`/work/${node.slug}`);
            }}
          >
            <sphereGeometry args={[0.44, 24, 24]} />
            <meshPhysicalMaterial
              color={vais3dBrand.primary}
              emissive={accentColor}
              emissiveIntensity={isHovered ? 0.36 : 0.22}
              transmission={0.8}
              roughness={0.28}
              thickness={0.45}
              transparent
              opacity={0.62}
            />

            <mesh scale={2.0}>
              <sphereGeometry args={[0.42, 12, 12]} />
              <meshBasicMaterial color={accentColor} transparent opacity={isHovered ? 0.14 : 0.06} />
            </mesh>

            {isHovered ? (
              <Html position={[0, 0.95, 0]} center distanceFactor={12}>
                <div className="rounded-md border border-[rgba(8,255,170,0.4)] bg-[rgba(10,24,22,0.9)] px-2 py-1 text-[10px] font-mono uppercase tracking-[0.14em] text-[#BFFFF0]">
                  {node.name}
                </div>
              </Html>
            ) : null}
          </mesh>
        );
      })}

      {nodes.map((node, idx) => {
        if (idx % 3 !== 0) return null;
        const to = nodes[(idx + 5) % nodes.length];
        const start = new THREE.Vector3(...node.position);
        const end = new THREE.Vector3(...to.position);
        const direction = new THREE.Vector3().subVectors(end, start);
        const length = direction.length();
        const midpoint = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
        const quaternion = new THREE.Quaternion().setFromUnitVectors(
          new THREE.Vector3(0, 1, 0),
          direction.clone().normalize()
        );

        return (
          <mesh key={`constellation_link_${idx}`} position={midpoint} quaternion={quaternion}>
            <cylinderGeometry args={[0.012, 0.012, length, 8]} />
            <meshPhysicalMaterial
                color="#44B9A9"
                emissive={vais3dBrand.accent}
                emissiveIntensity={0.08}
                transparent
                opacity={0.12}
                transmission={0.7}
                roughness={0.46}
              />
          </mesh>
        );
      })}
    </group>
  );
}

export function ConstellationScene({ className }: { className?: string }) {
  return (
    <SceneCanvas className={className ?? 'h-[360px] w-full rounded-vais-md border border-vais-border'} cameraPosition={[0, 0, 14]}>
      <SystemsConstellation />
    </SceneCanvas>
  );
}
