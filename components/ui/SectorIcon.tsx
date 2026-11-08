import Image from 'next/image';
import { sectorAsset } from '@/lib/projectPresentation';
export function SectorIcon({sector,size=42}:{sector:string;size?:number}){const name=sectorAsset[sector]??'platform';return <Image src={`/images/contour/icon-${name}.svg`} alt="" aria-hidden width={size} height={size}/>}
