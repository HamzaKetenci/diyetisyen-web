import * as React from 'react';
import { cn } from '@/lib/utils';
import { Spinner } from './Spinner';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Visual style variant.
   * @default 'primary'
   */
  variant?: ButtonVariant;
  /**
   * Button size.
   * - sm: h-9 px-4 text-sm (min-h-[44px] on mobile for touch accessibility)
   * - md: h-11 px-6 text-base min-h-[44px]
   * - lg: h-13 px-8 text-lg min-h-[44px]
   * @default 'md'
   */
  size?: ButtonSize;
  /**
   * Expand button to full width of container.
   * @default false
   */
  fullWidth?: boolean;
  /**
   * Shows a loading spinner and disables interactions.
   * @default false
   */
  loading?: boolean;
  /**
   * Optional loading text to display alongside spinner when loading.
   */
  loadingText?: string;
  /**
   * Leading icon element.
   */
  leftIcon?: React.ReactNode;
  /**
   * Trailing icon element.
   */
  rightIcon?: React.ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-primary text-white hover:bg-primary-dark active:bg-primary-dark border border-transparent shadow-sm',
  secondary:
    'bg-neutral-100 text-neutral-900 hover:bg-neutral-200 active:bg-neutral-200 border border-neutral-200/80',
  outline:
    'border-2 border-primary text-primary hover:bg-primary hover:text-white active:bg-primary-dark active:border-primary-dark active:text-white bg-transparent',
  ghost:
    'text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900 active:bg-neutral-200 bg-transparent border border-transparent',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'h-9 min-h-[44px] sm:min-h-9 px-4 text-sm gap-1.5',
  md: 'h-11 min-h-[44px] px-6 text-base gap-2',
  lg: 'h-13 min-h-[48px] px-8 text-lg gap-2.5',
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      loading = false,
      loadingText,
      disabled = false,
      leftIcon,
      rightIcon,
      children,
      type = 'button',
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        type={type}
        disabled={isDisabled}
        aria-disabled={isDisabled}
        aria-busy={loading}
        className={cn(
          // Base styles
          'relative inline-flex items-center justify-center font-medium rounded-xl select-none',
          'transition-all duration-150 ease-out cursor-pointer',
          // Focus ring
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
          // Variants & Sizes
          variantClasses[variant],
          sizeClasses[size],
          // Full width
          fullWidth ? 'w-full' : 'w-auto',
          // Disabled & Loading states
          isDisabled && 'opacity-50 cursor-not-allowed pointer-events-none active:transform-none',
          className
        )}
        {...props}
      >
        {loading && (
          <Spinner
            size={size === 'lg' ? 'md' : 'sm'}
            className="shrink-0 text-current"
            label={loadingText || 'Yükleniyor'}
          />
        )}
        {!loading && leftIcon && <span className="shrink-0 inline-flex">{leftIcon}</span>}
        <span>{loading && loadingText ? loadingText : children}</span>
        {!loading && rightIcon && <span className="shrink-0 inline-flex">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';
