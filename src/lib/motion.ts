import type { Variants, Transition, Easing } from 'framer-motion';
import { DURATION, EASING, STAGGER_DELAY, CARD_HOVER_Y } from './constants';

// Default transition
export const defaultTransition: Transition = {
  duration: DURATION.normal,
  ease: EASING.default as unknown as Easing,
};

// Fade up variant (used for most reveal animations)
export const fadeUpVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: defaultTransition,
  },
};

// Fade in variant (no movement)
export const fadeInVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: DURATION.normal },
  },
};

// Stagger container variant
export const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: STAGGER_DELAY,
      delayChildren: 0.1,
    },
  },
};

// Hero stagger variant (slightly more vertical movement)
export const heroStaggerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: STAGGER_DELAY,
      delayChildren: 0.2,
    },
  },
};

// Hero child item
export const heroItemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATION.slow,
      ease: EASING.easeOut as unknown as Easing,
    },
  },
};

// Scroll reveal variant (section-level)
export const scrollRevealVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATION.slow,
      ease: EASING.easeOut as unknown as Easing,
    },
  },
};

// Card hover animation values (not Variants, used inline)
export const cardHoverProps = {
  whileHover: {
    y: CARD_HOVER_Y,
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.08), 0 4px 10px rgba(0, 0, 0, 0.04)',
  },
  whileFocus: {
    y: CARD_HOVER_Y,
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.08), 0 4px 10px rgba(0, 0, 0, 0.04)',
  },
  transition: {
    duration: DURATION.fast,
    ease: EASING.default as unknown as Easing,
  },
} as const;

// Process step stagger (slightly longer delay)
export const processStaggerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

// Process step item
export const processItemVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -20,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: DURATION.normal,
      ease: EASING.easeOut as unknown as Easing,
    },
  },
};
