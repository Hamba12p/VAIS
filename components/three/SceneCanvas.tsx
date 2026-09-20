'use client';
import { Canvas } from '@react-three/fiber';
import { PerformanceMonitor } from '@react-three/drei';
import { ReactNode, useEffect, useRef, useState } from 'react';

export function SceneCanvas({ className='', children, cameraPosition=[0,5.5,10] }:{className?:string;children:ReactNode;cameraPosition?:[number,number,number]}) {
  const ref=useRef<HTMLDivElement>(null); const [visible,setVisible]=useState(false); const [dpr,setDpr]=useState(1.25);
  useEffect(()=>{const node=ref.current;if(!node)return;const observer=new IntersectionObserver(([entry])=>{if(entry.isIntersecting){setVisible(true);observer.disconnect()}},{rootMargin:'160px'});observer.observe(node);return()=>observer.disconnect()},[]);
  return <div ref={ref} className={`relative overflow-hidden ${className}`} aria-hidden>{visible&&<Canvas camera={{position:cameraPosition,fov:42}} dpr={dpr} gl={{antialias:true,alpha:false,powerPreference:'high-performance'}}>
    <PerformanceMonitor flipflops={3} onChange={({factor})=>setDpr(Math.round((.8+factor*.7)*10)/10)} onFallback={()=>setDpr(1)}>{children}</PerformanceMonitor>
  </Canvas>}</div>;
}
