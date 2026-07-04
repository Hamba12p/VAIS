"use client";

import { Canvas } from '@react-three/fiber';
import { ReactNode, useEffect, useRef, useState } from 'react';
import usePrefersReducedMotion from '@/lib/hooks/usePrefersReducedMotion';
import { vais3dBrand } from '@/components/three/constants';

interface SceneCanvasProps {
  className?: string;
  children: ReactNode;
  cameraPosition?: [number, number, number];
}

export function SceneCanvas({
  className,
  children,
  cameraPosition = [0, 0, 11],
}: SceneCanvasProps) {
  const reduce = usePrefersReducedMotion();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
 
  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;
 
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry?.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '120px' }
    );
 
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
 
  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className ?? ''}`}
      aria-hidden="true"
    >
      {reduce ? (
        <div className="h-full w-full bg-[radial-gradient(circle_at_20%_25%,rgba(8,255,170,0.16),transparent_50%),radial-gradient(circle_at_80%_70%,rgba(8,120,110,0.14),transparent_54%)]" />
      ) : null}
 
      {!reduce && isVisible ? (
        <Canvas
          camera={{ position: cameraPosition, fov: 44 }}
          gl={{ alpha: true, antialias: true }}
          dpr={[1, 1.6]}
          style={{
            background: 'radial-gradient(circle at 20% 30%, rgba(8,255,170,0.08), transparent 28%), radial-gradient(circle at 80% 45%, rgba(8,120,110,0.08), transparent 24%), rgba(250,250,249,0.96)',
          }}
        >
          <ambientLight color={vais3dBrand.primary} intensity={0.16} />
          <directionalLight
            position={[-5, 6, 4]}
            color={vais3dBrand.accent}
            intensity={0.44}
          />
          {children}
        </Canvas>
      ) : null}
    </div>
  );
}