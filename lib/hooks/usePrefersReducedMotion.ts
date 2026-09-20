'use client';
import { useMotionPreference } from './useMotionPreference';
export default function usePrefersReducedMotion() { return useMotionPreference().reduceMotion; }
