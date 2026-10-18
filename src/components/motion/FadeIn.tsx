'use client';

import { motion } from 'framer-motion';
import { fadeUpVariants, fadeInVariants } from '@/lib/motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import type { ReactNode } from 'react';

interface FadeInProps {
  children: ReactNode;
  direction?: 'up' | 'none';
  delay?: number;
  className?: string;
}

export function FadeIn({ children, direction = 'up', delay = 0, className }: FadeInProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  const variants = direction === 'up' ? fadeUpVariants : fadeInVariants;

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="visible"
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
