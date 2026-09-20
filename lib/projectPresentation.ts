import type { Project } from '@/types/project';
import type { MarkerKind } from '@/components/three/TerrainScene';

export const sectorAsset:Record<string,string>={
  'civic-government':'government','security-intelligence':'security',health:'health',agriculture:'agriculture',
  'education-institutions':'education','fintech-payments':'fintech','automotive-iot':'automotive','supply-chain':'supply-chain',platform:'platform'
};
export function markerFor(project:Project):MarkerKind { const c=project.category[0]; if(c==='health')return'clinic';if(c==='agriculture')return'farm';if(c==='fintech-payments')return'bank';if(c==='security-intelligence'||c==='platform'||c==='automotive-iot')return'tower';return'school'; }
export function vignetteFor(project:Project){const c=project.category[0];if(c==='health')return'clinic';if(c==='agriculture')return'field';if(c==='fintech-payments')return'bank';if(c==='security-intelligence'||c==='platform')return'tower';if(project.slug==='ugems'||c==='education-institutions')return'school';return'office';}
export function metricNumber(project:Project){const metric=project.metrics?.[0]??'';const match=metric.replace(/,/g,'').match(/[\d.]+/);return match?Number(match[0]):0;}
