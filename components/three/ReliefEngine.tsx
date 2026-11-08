'use client';
import Image from 'next/image';
import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { SceneCanvas } from './SceneCanvas';
import { useMotionPreference } from '@/lib/hooks/useMotionPreference';

export type MarkerKind='school'|'clinic'|'tower'|'farm'|'bank';
type Variant='hero'|'compact'|'project';
const markerKinds:MarkerKind[]=['school','clinic','tower','farm','bank'];
const positions:[number,number,number][]=[[-4.7,.25,-.7],[-1.8,.2,1.3],[1.1,.35,-.8],[3.1,.2,1.4],[5,.18,-.2]];

const vertexShader=`
uniform float uTime; varying float vHeight; varying vec3 vWorld;
vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;} vec2 mod289(vec2 x){return x-floor(x*(1.0/289.0))*289.0;}
vec3 permute(vec3 x){return mod289(((x*34.0)+1.0)*x);} 
float snoise(vec2 v){const vec4 C=vec4(.2113248654,.3660254038,-.5773502692,.0243902439);vec2 i=floor(v+dot(v,C.yy));vec2 x0=v-i+dot(i,C.xx);vec2 i1=(x0.x>x0.y)?vec2(1.,0.):vec2(0.,1.);vec4 x12=x0.xyxy+C.xxzz;x12.xy-=i1;i=mod289(i);vec3 p=permute(permute(i.y+vec3(0.,i1.y,1.))+i.x+vec3(0.,i1.x,1.));vec3 m=max(.5-vec3(dot(x0,x0),dot(x12.xy,x12.xy),dot(x12.zw,x12.zw)),0.);m=m*m;m=m*m;vec3 x=2.*fract(p*C.www)-1.;vec3 h=abs(x)-.5;vec3 ox=floor(x+.5);vec3 a0=x-ox;m*=1.792842914-.853734721*(a0*a0+h*h);vec3 g;g.x=a0.x*x0.x+h.x*x0.y;g.yz=a0.yz*x12.xz+h.yz*x12.yw;return 130.*dot(m,g);}
void main(){vec3 p=position;float broad=snoise(p.xy*.10+vec2(-1.7,.3))*2.0;float detail=snoise(p.xy*.34+vec2(.9,-1.2))*.58;float west=smoothstep(7.,-8.,p.x)*1.4;float breathe=sin(uTime*.18+p.x*.08+p.y*.06)*.025;p.z=broad+detail+west+breathe;vHeight=p.z;vec4 world=modelMatrix*vec4(p,1.);vWorld=world.xyz;gl_Position=projectionMatrix*viewMatrix*world;}`;
const fragmentShader=`
varying float vHeight; varying vec3 vWorld;
void main(){vec3 deep=vec3(.235,.29,.18),mid=vec3(.486,.545,.341),clay=vec3(.706,.376,.18);float band=floor((vHeight+2.5)*3.0)/3.0;vec3 base=mix(deep,mid,smoothstep(-1.3,1.7,band));base=mix(base,clay,smoothstep(1.65,3.0,band)*.34);vec3 dx=dFdx(vWorld),dy=dFdy(vWorld);vec3 n=normalize(cross(dx,dy));float light=.38+.62*max(dot(n,normalize(vec3(-.55,.7,.3))),0.);gl_FragColor=vec4(base*light,1.);}`;

function Sky(){return <mesh scale={42}><sphereGeometry args={[1,32,16]}/><shaderMaterial side={THREE.BackSide} vertexShader={'varying vec3 p;void main(){p=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}' } fragmentShader={'varying vec3 p;void main(){float h=normalize(p).y;vec3 dusk=vec3(.275,.216,.329),clay=vec3(.706,.376,.18),canvas=vec3(.961,.937,.871);vec3 c=mix(canvas,clay,smoothstep(-.18,.18,h));c=mix(c,dusk,smoothstep(.08,.85,h));gl_FragColor=vec4(c,1.);}'}/></mesh>}

function Marker({kind,position,index}:{kind:MarkerKind;position:[number,number,number];index:number}){const material=<meshStandardMaterial color="#7C8B57" emissive="#E8A33D" emissiveIntensity={index===0?.34:.08} flatShading/>;return <group position={position} scale={.36}>
  {kind==='school'&&<><mesh position={[0,.35,0]}>{material}<boxGeometry args={[1.5,.7,1]}/></mesh><mesh position={[0,.86,0]} rotation={[0,Math.PI/4,0]}>{material}<coneGeometry args={[1.1,.7,4]}/></mesh></>}
  {kind==='clinic'&&<><mesh position={[0,.35,0]}>{material}<boxGeometry args={[1.4,.7,1.1]}/></mesh><mesh position={[0,1.05,0]}>{material}<boxGeometry args={[.18,.75,.18]}/></mesh><mesh position={[0,1.12,0]}>{material}<boxGeometry args={[.7,.18,.18]}/></mesh></>}
  {kind==='tower'&&<><mesh position={[0,.8,0]}>{material}<coneGeometry args={[.28,1.8,5]}/></mesh><mesh position={[0,.72,0]} rotation={[Math.PI/2,0,0]}>{material}<torusGeometry args={[.42,.06,5,12]}/></mesh><mesh position={[0,1.18,0]} rotation={[Math.PI/2,0,0]}>{material}<torusGeometry args={[.3,.05,5,12]}/></mesh></>}
  {kind==='farm'&&[-.7,-.32,.1,.48,.83].map((x,i)=><mesh key={x} position={[x,.18,(i%2)*.3]}>{material}<tetrahedronGeometry args={[.42+i*.035,0]}/></mesh>)}
  {kind==='bank'&&<><mesh position={[0,.22,0]}>{material}<cylinderGeometry args={[.75,.82,.35,8]}/></mesh><mesh position={[0,.45,0]}>{material}<torusGeometry args={[.6,.09,5,12]}/></mesh></>}
  <pointLight color="#E8A33D" intensity={index===0?1.3:.25} distance={2.4}/>
</group>}

function Pulses({variant}:{variant:Variant}){const count=variant==='hero'?20:variant==='compact'?6:8;const ref=useRef<THREE.InstancedMesh>(null);const glow=useRef<THREE.InstancedMesh>(null);const elapsed=useRef(0);const endpoints=useMemo(()=>variant==='project'?[[0,.5,0] as [number,number,number]]:positions,[variant]);const curves=useMemo(()=>endpoints.map(([x,,z],i)=>new THREE.CatmullRomCurve3([new THREE.Vector3(variant==='project'?-3:-5,.75,-1),new THREE.Vector3((x-5)/2,1.2+i*.15,(z-1)/2),new THREE.Vector3(x,.5,z)])),[endpoints,variant]);const dummy=useMemo(()=>new THREE.Object3D(),[]);useFrame((_,delta)=>{elapsed.current+=delta;for(let i=0;i<count;i++){const curve=curves[i%curves.length];const phase=(elapsed.current/(3.4+(i%5)*.55)+i*.173)%1;const eased=.5-.5*Math.cos(phase*Math.PI);dummy.position.copy(curve.getPoint(eased));dummy.scale.setScalar(.08);dummy.updateMatrix();ref.current?.setMatrixAt(i,dummy.matrix);dummy.scale.setScalar(.22);dummy.updateMatrix();glow.current?.setMatrixAt(i,dummy.matrix)}if(ref.current)ref.current.instanceMatrix.needsUpdate=true;if(glow.current)glow.current.instanceMatrix.needsUpdate=true});return <><instancedMesh ref={glow} args={[undefined,undefined,count]}><sphereGeometry args={[1,8,8]}/><meshBasicMaterial color="#E8A33D" transparent opacity={.12} blending={THREE.AdditiveBlending} depthWrite={false}/></instancedMesh><instancedMesh ref={ref} args={[undefined,undefined,count]}><sphereGeometry args={[1,8,8]}/><meshBasicMaterial color="#E8A33D" blending={THREE.AdditiveBlending} depthWrite={false}/></instancedMesh></>}

function Relief({variant,kind}:{variant:Variant;kind?:MarkerKind}){const mat=useRef<THREE.ShaderMaterial>(null);const elapsed=useRef(0);useFrame((_,delta)=>{elapsed.current+=delta;if(mat.current)mat.current.uniforms.uTime.value=elapsed.current});const shown=variant==='project'?[kind??'school']:markerKinds;return <><Sky/><ambientLight intensity={.44} color="#F5EFDE"/><directionalLight position={[-7,5,2]} intensity={2.2} color="#E8A33D"/><group rotation={[-Math.PI/2,0,0]} position={[0,-1.4,0]}><mesh><planeGeometry args={[18,11,80,50]}/><shaderMaterial ref={mat} uniforms={{uTime:{value:0}}} vertexShader={vertexShader} fragmentShader={fragmentShader}/></mesh></group><group position={[0,-.55,0]}>{shown.map((item,i)=><Marker key={item} kind={item} index={i} position={variant==='project'?[0,0,0]:positions[i]}/>)}</group><Pulses variant={variant}/></>}

function StaticTerrain({className}:{className:string}){return <div className={`relative ${className}`}><Image src="/images/contour/terrain-hero-fallback.png" alt="A faceted dusk landscape with warm lights marking institutions across the terrain" fill priority className="object-cover" sizes="100vw"/><div className="terrain-fallback-dots absolute inset-0" aria-hidden><span className="left-[16%] top-[54%]"/><span className="left-[41%] top-[67%]"/><span className="left-[72%] top-[74%]"/><span className="left-[88%] top-[79%]"/></div></div>}

export function TerrainScene({variant='hero',kind,className='h-full w-full'}:{variant?:Variant;kind?:MarkerKind;className?:string}){const {useStaticTerrain}=useMotionPreference();if(useStaticTerrain)return <StaticTerrain className={className}/>;const camera:Record<Variant,[number,number,number]>={hero:[0,5.4,10.5],compact:[-2.4,4.3,8],project:[0,3.5,6.5]};return <SceneCanvas className={className} cameraPosition={camera[variant]}><Relief variant={variant} kind={kind}/></SceneCanvas>}
