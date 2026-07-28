"use client";

import { RoundedBox } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { SceneCanvas } from '@/components/three/SceneCanvas';
import { vais3dBrand } from '@/components/three/constants';
import { integrationPartners } from '@/data/integrations';

function IntegrationMap() {
  const ringRef = useRef<THREE.Group | null>(null);
  const coreShellRef = useRef<THREE.Mesh | null>(null);

  const ringNodes = useMemo(() => {
    return integrationPartners.slice(0, 6).map((_, idx) => {
      const angle = (idx / 6) * Math.PI * 2;
      return {
        id: `integration_${idx + 1}`,
        position: [Math.cos(angle) * 4.1, Math.sin(angle * 1.4) * 0.55, Math.sin(angle) * 4.1] as [number, number, number],
      };
    });
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (!ringRef.current) return;
    ringRef.current.rotation.y = t * 0.05;
    ringRef.current.children.forEach((child, idx) => {
      child.position.y = ringNodes[idx].position[1] + Math.sin(t * 0.42 + idx * 0.7) * 0.09;
    });

    if (coreShellRef.current) {
      const pulse = 1 + Math.sin(t * 1.4) * 0.08;
      coreShellRef.current.scale.setScalar(pulse);
    }
  });

  return (
    <group name="integration_map">
      <group name="hub_core">
        <RoundedBox args={[1.48, 1.48, 1.48]} radius={0.22} smoothness={5}>
          <meshPhysicalMaterial
            color={vais3dBrand.neutral}
            emissive={vais3dBrand.accent}
            emissiveIntensity={0.28}
            transmission={0.5}
            roughness={0.3}
            thickness={0.65}
            metalness={0.12}
          />
        </RoundedBox>
        <mesh ref={coreShellRef}>
          <sphereGeometry args={[1.18, 26, 26]} />
          <meshBasicMaterial color="#8A5A38" transparent opacity={0.12} />
        </mesh>
        <mesh rotation={[0, 0, 0]}>
          <ringGeometry args={[0.72, 0.84, 48]} />
          <meshBasicMaterial color="#37513A" transparent opacity={0.72} />
        </mesh>
      </group>

      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[4.15, 0.018, 12, 180]} />
        <meshBasicMaterial color="#7E8B6F" transparent opacity={0.22} />
      </mesh>

      <group ref={ringRef}>
        {ringNodes.map((node) => (
          <group key={node.id} name={node.id} position={node.position}>
            <RoundedBox args={[0.86, 0.86, 0.86]} radius={0.2} smoothness={4}>
              <meshPhysicalMaterial
                color="#2C3426"
                emissive={vais3dBrand.accent}
                emissiveIntensity={0.18}
                transmission={0.45}
                roughness={0.34}
                thickness={0.54}
              />
            </RoundedBox>
          </group>
        ))}
      </group>

      {ringNodes.map((node) => {
        const endpoint = new THREE.Vector3(...node.position);
        const direction = endpoint.clone();
        const length = direction.length();
        const midpoint = direction.clone().multiplyScalar(0.5);
        const quaternion = new THREE.Quaternion().setFromUnitVectors(
          new THREE.Vector3(0, 1, 0),
          direction.clone().normalize()
        );

        return (
          <mesh key={`${node.id}_line`} position={midpoint} quaternion={quaternion}>
            <cylinderGeometry args={[0.014, 0.014, length, 10]} />
            <meshPhysicalMaterial
              color="#71826B"
              emissive={vais3dBrand.accent}
              emissiveIntensity={0.12}
              transparent
              opacity={0.28}
              transmission={0.78}
              roughness={0.24}
            />
          </mesh>
        );
      })}
    </group>
  );
}

export function IntegrationMapScene() {
  return (
    <SceneCanvas className="h-[440px] w-full border border-[rgb(var(--color-hairline))] bg-[rgba(255,255,255,0.5)]" cameraPosition={[0, 0.8, 11]}>
      <IntegrationMap />
    </SceneCanvas>
  );
}
