'use client';
import dynamic from 'next/dynamic';

export type MarkerKind='school'|'clinic'|'tower'|'farm'|'bank';
type Variant='hero'|'compact'|'project';
const ReliefEngine=dynamic(()=>import('./ReliefEngine').then(module=>module.TerrainScene),{ssr:false,loading:()=> <div className="h-full w-full bg-[url('/images/contour/terrain-hero-fallback.png')] bg-cover bg-center"/>});
export function TerrainScene({variant='hero',kind,className='h-full w-full'}:{variant?:Variant;kind?:MarkerKind;className?:string}){return <ReliefEngine variant={variant} kind={kind} className={className}/>}
