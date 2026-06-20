'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  direction?: 'up' | 'left' | 'none';
}

const directionVariants = {
  up: { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } },
  left: { hidden: { opacity: 0, x: -16 }, visible: { opacity: 1, x: 0 } },
  none: { hidden: { opacity: 0 }, visible: { opacity: 1 } },
};

export function FadeIn({ children, delay = 0, className, direction = 'up' }: FadeInProps) {
  const variants = directionVariants[direction];

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      variants={variants}
      {...({ className: cn(className) } as any)}
    >
      {children}
    </motion.div>
  );
}
