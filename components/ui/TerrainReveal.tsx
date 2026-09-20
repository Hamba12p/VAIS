'use client';
import { motion } from 'framer-motion';
import { useMotionPreference } from '@/lib/hooks/useMotionPreference';
export function TerrainReveal({children,className='',delay=0}:{children:React.ReactNode;className?:string;delay?:number}){const {reduceMotion}=useMotionPreference();return <motion.div className={className} initial={{opacity:0,y:reduceMotion?0:18,rotateX:reduceMotion?0:1.5}} whileInView={{opacity:1,y:0,rotateX:0}} viewport={{once:true,margin:'-60px'}} transition={{duration:reduceMotion?.2:.62,delay,ease:[.16,1,.3,1]}}>{children}</motion.div>}
