'use client';

import { motion } from 'framer-motion';
import { staggerContainerVariants, fadeUpVariants } from '@/lib/motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import type { ReactNode } from 'react';

interface StaggerChildrenProps {
  children: ReactNode;
  className?: string;
}

export function StaggerChildren({ children, className }: StaggerChildrenProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      variants={staggerContainerVariants}
      initial="hidden"
      animate="visible"
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Wrap each child in this for the stagger effect
export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div variants={fadeUpVariants} className={className}>
      {children}
    </motion.div>
  );
}
