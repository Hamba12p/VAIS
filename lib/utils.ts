import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function slugToName(slug: string): string {
  return slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

const PROJECT_IMAGES = [
  '/images/1b40ea2f88b59e04a4580fce9bdb1e26.jpg',
  '/images/80fb0a530e76c637cab64115f4b0e025.jpg',
  '/images/29df1bac4893a448fff00094dbcd6d7f.jpg',
  '/images/7fa6bc26abb2319845ebb73d7eb0f079.jpg',
  '/images/e7f69a8643c253b1b7587c162948f392.jpg',
  '/images/02dfce8e7e33dcb5c7b9c82e95fa980c.jpg',
  '/images/726ad41b42327ea20f020502267b8094.jpg',
];

export function getPatternedImage(index: number): string {
  const n = PROJECT_IMAGES.length;
  const frac = (index * 0.618033988749895) % 1; // golden-ratio spacing
  const pos = Math.floor(frac * n);
  return PROJECT_IMAGES[pos];
}
