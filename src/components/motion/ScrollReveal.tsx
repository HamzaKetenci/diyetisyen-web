'use client';

import { motion, useInView } from 'framer-motion';
import { scrollRevealVariants } from '@/lib/motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useRef, type ReactNode } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  width?: 'fit' | 'full';
}

export function ScrollReveal({ children, className, width = 'full' }: ScrollRevealProps) {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '0px 0px -80px 0px' });

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      variants={scrollRevealVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className={`${width === 'full' ? 'w-full' : 'w-fit'} ${className ?? ''}`}
    >
      {children}
    </motion.div>
  );
}
