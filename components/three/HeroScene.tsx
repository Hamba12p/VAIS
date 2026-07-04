"use client";

import { SceneCanvas } from '@/components/three/SceneCanvas';
import { vais3dBrand } from '@/components/three/constants';
import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

type NodeConfig = {
  id: string;
  basePosition: THREE.Vector3;
  scale: number;
  speed: number;
  phase: number;
};

const NODE_COUNT = 18;

function HeroNetwork() {
  const groupRef = useRef<THREE.Group | null>(null);
  const ringRef = useRef<THREE.Group | null>(null);
  const mouseTarget = useRef(new THREE.Vector2(0, 0));

  const nodes = useMemo(() => {
    return Array.from({ length: NODE_COUNT }, (_, i) => {
      const angle = (i / NODE_COUNT) * Math.PI * 2;
      const radial = 2.4 + ((i * 37) % 10) * 0.18;
      const x = Math.cos(angle) * radial + Math.sin(i * 1.7) * 0.8;
      const y = Math.sin(angle * 1.4) * 2.2 + Math.cos(i * 0.8) * 0.5;
      const z = Math.sin(angle * 0.8) * 2 + Math.cos(i * 1.2) * 0.9;
      const scale = 0.5 + ((i * 29) % 11) * 0.09;

      return {
        id: `hero_node_${i}`,
        basePosition: new THREE.Vector3(x, y, z),
        scale,
        speed: 0.09 + (i % 5) * 0.02,
        phase: i * 0.7,
      } satisfies NodeConfig;
    });
  }, []);

  const links = useMemo(() => {
    const pairs: Array<[NodeConfig, NodeConfig]> = [];
    for (let i = 0; i < nodes.length; i += 1) {
      for (let j = i + 1; j < nodes.length; j += 1) {
        const distance = nodes[i].basePosition.distanceTo(nodes[j].basePosition);
        if (distance < 2.9) {
          pairs.push([nodes[i], nodes[j]]);
        }
      }
    }
    return pairs;
  }, [nodes]);

  const starField = useMemo(() => {
    const stars = new Float32Array(420 * 3);
    for (let i = 0; i < 420; i += 1) {
      const radius = 7 + (i % 20) * 0.35;
      const angle = (i / 420) * Math.PI * 2;
      stars[i * 3] = Math.cos(angle * 1.7) * radius;
      stars[i * 3 + 1] = Math.sin(angle * 2.1) * (2.6 + (i % 5) * 0.22);
      stars[i * 3 + 2] = Math.sin(angle * 1.2) * (4.3 + (i % 11) * 0.15);
    }
    return stars;
  }, []);

  useFrame(({ clock, camera, pointer }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();

    groupRef.current.children.forEach((child, index) => {
      const node = nodes[index];
      if (!node) return;
      const drift = Math.sin(t * node.speed + node.phase);
      child.position.set(
        node.basePosition.x + drift * 0.32,
        node.basePosition.y + Math.cos(t * node.speed * 0.7 + node.phase) * 0.24,
        node.basePosition.z + Math.sin(t * node.speed * 0.5 + node.phase) * 0.28
      );
    });

    if (ringRef.current) {
      ringRef.current.rotation.z = Math.sin(t * 0.09) * 0.18;
      ringRef.current.rotation.y = t * 0.05;
    }

    mouseTarget.current.set(pointer.x * 0.65, pointer.y * 0.42);
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, mouseTarget.current.x, 0.035);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, mouseTarget.current.y, 0.035);
    camera.lookAt(0, 0, 0);
  });

  return (
    <group name="hero_network">
      <group ref={ringRef}>
        <mesh rotation={[Math.PI / 3.2, 0, 0]}>
          <torusGeometry args={[4.3, 0.012, 14, 180]} />
          <meshBasicMaterial color="#2DBAA5" transparent opacity={0.35} />
        </mesh>
        <mesh rotation={[Math.PI / 2.5, Math.PI / 2.8, 0]}>
          <torusGeometry args={[5.4, 0.01, 14, 180]} />
          <meshBasicMaterial color="#08FFAA" transparent opacity={0.22} />
        </mesh>
      </group>

      <group ref={groupRef}>
        {nodes.map((node) => (
          <mesh
            key={node.id}
            position={node.basePosition}
            scale={node.scale}
            castShadow={false}
            receiveShadow={false}
          >
            <sphereGeometry args={[0.34, 24, 24]} />
            <meshPhysicalMaterial
              color={vais3dBrand.primary}
              emissive={vais3dBrand.accent}
              emissiveIntensity={0.22}
              transmission={0.86}
              roughness={0.28}
              thickness={0.4}
              transparent
              opacity={0.6}
            />
          </mesh>
        ))}
      </group>

      {links.map(([a, b], idx) => {
        const mid = new THREE.Vector3().addVectors(a.basePosition, b.basePosition).multiplyScalar(0.5);
        const vec = new THREE.Vector3().subVectors(b.basePosition, a.basePosition);
        const length = vec.length();
        const quat = new THREE.Quaternion().setFromUnitVectors(
          new THREE.Vector3(0, 1, 0),
          vec.clone().normalize()
        );

        return (
          <mesh key={`link_${idx}`} position={mid} quaternion={quat}>
            <cylinderGeometry args={[0.02, 0.02, length, 10]} />
            <meshPhysicalMaterial
              color="#47C4B0"
              emissive={vais3dBrand.accent}
              emissiveIntensity={0.25}
              transparent
              opacity={0.34}
              transmission={0.9}
              roughness={0.22}
            />
          </mesh>
        );
      })}

      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={starField.length / 3}
            array={starField}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial color="#6FE8D1" size={0.02} transparent opacity={0.28} />
      </points>
    </group>
  );
}

export function HeroScene() {
  return (
    <SceneCanvas className="absolute inset-0 -z-10" cameraPosition={[0, 0, 11]}>
      <HeroNetwork />
    </SceneCanvas>
  );
}