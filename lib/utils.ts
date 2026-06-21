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

const PIN_IMAGES = [
  'https://i.pinimg.com/736x/1b/40/ea/1b40ea2f88b59e04a4580fce9bdb1e26.jpg',
  'https://i.pinimg.com/736x/80/fb/0a/80fb0a530e76c637cab64115f4b0e025.jpg',
  'https://i.pinimg.com/736x/29/df/1b/29df1bac4893a448fff00094dbcd6d7f.jpg',
  'https://i.pinimg.com/736x/7f/a6/bc/7fa6bc26abb2319845ebb73d7eb0f079.jpg',
  'https://i.pinimg.com/736x/e7/f6/9a/e7f69a8643c253b1b7587c162948f392.jpg',
  'https://i.pinimg.com/736x/02/df/ce/02dfce8e7e33dcb5c7b9c82e95fa980c.jpg',
  'https://i.pinimg.com/736x/72/6a/d4/726ad41b42327ea20f020502267b8094.jpg',
];

export function getPatternedImage(index: number): string {
  const n = PIN_IMAGES.length;
  const frac = (index * 0.618033988749895) % 1; // golden-ratio spacing
  const pos = Math.floor(frac * n);
  return PIN_IMAGES[pos];
}
