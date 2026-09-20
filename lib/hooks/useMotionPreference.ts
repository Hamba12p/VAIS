'use client';
import { useEffect, useState } from 'react';

export function useMotionPreference() {
  const [state, setState] = useState({ reduceMotion: true, useStaticTerrain: true });
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => {
      const cores = navigator.hardwareConcurrency ?? 8;
      setState({ reduceMotion: query.matches, useStaticTerrain: query.matches || cores <= 4 });
    };
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);
  return state;
}
