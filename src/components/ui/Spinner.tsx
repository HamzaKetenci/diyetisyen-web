import * as React from 'react';
import { cn } from '@/lib/utils';

export interface SpinnerProps extends React.SVGAttributes<SVGSVGElement> {
  /**
   * Size of the spinner.
   * - sm: 16x16px (w-4 h-4)
   * - md: 24x24px (w-6 h-6)
   * - lg: 32x32px (w-8 h-8)
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Accessible status text for screen readers.
   * @default 'Yükleniyor'
   */
  label?: string;
  className?: string;
}

const sizeClasses: Record<NonNullable<SpinnerProps['size']>, string> = {
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-8 h-8',
};

/**
 * Accessible SVG-based loading spinner.
 */
export function Spinner({
  size = 'md',
  label = 'Yükleniyor',
  className,
  ...props
}: SpinnerProps) {
  return (
    <span
      role="status"
      aria-label={label}
      className="inline-flex items-center justify-center text-current"
    >
      <svg
        className={cn('animate-spin text-current', sizeClasses[size], className)}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        aria-hidden="true"
        {...props}
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="3.5"
        />
        <path
          className="opacity-90"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
      <span className="sr-only">{label}</span>
    </span>
  );
}

Spinner.displayName = 'Spinner';
