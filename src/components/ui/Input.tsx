import * as React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  /**
   * Unique identifier required for accessibility (links label and describedby).
   */
  id: string;
  /**
   * Label text displayed above the input.
   */
  label?: string;
  /**
   * Error message displayed below the input. Triggers aria-invalid and error styles.
   */
  error?: string;
  /**
   * Helper text providing guidance, displayed below input when no error exists.
   */
  helperText?: string;
  /**
   * Expand input to full width of container.
   * @default true
   */
  fullWidth?: boolean;
  /**
   * Optional container wrapper className.
   */
  containerClassName?: string;
  /**
   * Optional element or icon rendered at the start of input.
   */
  leftIcon?: React.ReactNode;
  /**
   * Optional element or icon rendered at the end of input.
   */
  rightIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id,
      label,
      error,
      helperText,
      fullWidth = true,
      className,
      containerClassName,
      leftIcon,
      rightIcon,
      disabled,
      required,
      type = 'text',
      ...props
    },
    ref
  ) => {
    const errorId = `${id}-error`;
    const helperId = `${id}-helper`;

    // Construct aria-describedby based on active error or helper
    const describedBy = error
      ? errorId
      : helperText
      ? helperId
      : undefined;

    return (
      <div className={cn('flex flex-col', fullWidth ? 'w-full' : 'w-auto', containerClassName)}>
        {label && (
          <label
            htmlFor={id}
            className="block text-sm font-medium text-neutral-900 mb-1.5 select-none"
          >
            {label}
            {required && <span className="text-error ml-1" aria-hidden="true">*</span>}
          </label>
        )}

        <div className="relative flex items-center">
          {leftIcon && (
            <div className="absolute left-3.5 flex items-center pointer-events-none text-neutral-500">
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            id={id}
            type={type}
            disabled={disabled}
            required={required}
            aria-invalid={Boolean(error)}
            aria-describedby={describedBy}
            className={cn(
              // Sizing & touch target (>= 44px min-h)
              'w-full min-h-[44px] px-3.5 py-2.5 text-base',
              // Base styling
              'bg-white text-neutral-900 placeholder:text-neutral-400 rounded-xl',
              'border border-neutral-200 transition-colors duration-150',
              // Focus ring
              'focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/15',
              // Left / Right icon padding
              Boolean(leftIcon) && 'pl-10',
              Boolean(rightIcon) && 'pr-10',
              // Error state
              Boolean(error) && 'border-error focus:border-error focus:ring-error/15 text-neutral-900',
              // Disabled state
              Boolean(disabled) && 'bg-neutral-100 text-neutral-400 border-neutral-200 cursor-not-allowed opacity-60',
              className
            )}
            {...props}
          />

          {rightIcon && (
            <div className="absolute right-3.5 flex items-center pointer-events-none text-neutral-500">
              {rightIcon}
            </div>
          )}
        </div>

        {error ? (
          <p
            id={errorId}
            role="alert"
            className="text-xs font-medium text-error mt-1.5"
          >
            {error}
          </p>
        ) : helperText ? (
          <p
            id={helperId}
            className="text-xs text-neutral-500 mt-1.5"
          >
            {helperText}
          </p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = 'Input';
