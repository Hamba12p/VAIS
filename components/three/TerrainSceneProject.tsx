'use client';
import { MarkerKind, TerrainScene } from './TerrainScene';
export function TerrainSceneProject({kind,className}:{kind:MarkerKind;className?:string}){return <TerrainScene variant="project" kind={kind} className={className}/>}
