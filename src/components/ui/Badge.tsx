import * as React from 'react';
import { cn } from '@/lib/utils';

export type BadgeVariant = 'default' | 'success' | 'warning' | 'error' | 'info';
export type BadgeSize = 'sm' | 'md';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * Visual style variant.
   * - default: neutral gray
   * - success: subtle green
   * - warning: subtle amber with dark text
   * - error: subtle red
   * - info: subtle primary sage
   * @default 'default'
   */
  variant?: BadgeVariant;
  /**
   * Badge size.
   * @default 'sm'
   */
  size?: BadgeSize;
  /**
   * Optional icon to display before badge text.
   */
  icon?: React.ReactNode;
}

const variantClasses: Record<BadgeVariant, string> = {
  default: 'bg-neutral-100 text-neutral-700 border-neutral-200',
  success: 'bg-success/10 text-success border-success/20',
  warning: 'bg-warning/10 text-neutral-900 border-warning/20',
  error: 'bg-error/10 text-error border-error/20',
  info: 'bg-primary/10 text-primary border-primary/20',
};

const sizeClasses: Record<BadgeSize, string> = {
  sm: 'text-xs px-2.5 py-0.5 gap-1 font-medium',
  md: 'text-sm px-3 py-1 gap-1.5 font-medium',
};

/**
 * Pill-shaped badge component for status indicators and tags.
 */
export function Badge({
  className,
  variant = 'default',
  size = 'sm',
  icon,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        // Base styling
        'inline-flex items-center justify-center rounded-full border select-none',
        'leading-normal transition-colors duration-150',
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {icon && <span className="shrink-0 inline-flex">{icon}</span>}
      <span>{children}</span>
    </span>
  );
}

Badge.displayName = 'Badge';
