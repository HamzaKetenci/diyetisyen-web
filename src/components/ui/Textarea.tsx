import * as React from 'react';
import { cn } from '@/lib/utils';

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /**
   * Unique identifier required for accessibility (links label and describedby).
   */
  id: string;
  /**
   * Label text displayed above the textarea.
   */
  label?: string;
  /**
   * Error message displayed below the textarea. Triggers aria-invalid and error styles.
   */
  error?: string;
  /**
   * Helper text providing guidance, displayed below textarea when no error exists.
   */
  helperText?: string;
  /**
   * Number of visible text lines.
   * @default 4
   */
  rows?: number;
  /**
   * Expand textarea to full width of container.
   * @default true
   */
  fullWidth?: boolean;
  /**
   * Optional container wrapper className.
   */
  containerClassName?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      id,
      label,
      error,
      helperText,
      rows = 4,
      fullWidth = true,
      className,
      containerClassName,
      disabled,
      required,
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

        <textarea
          ref={ref}
          id={id}
          rows={rows}
          disabled={disabled}
          required={required}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          className={cn(
            // Sizing & base styling
            'w-full min-h-[96px] px-3.5 py-2.5 text-base',
            'bg-white text-neutral-900 placeholder:text-neutral-400 rounded-xl',
            'border border-neutral-200 transition-colors duration-150 resize-y',
            // Focus ring
            'focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/15',
            // Error state
            error && 'border-error focus:border-error focus:ring-error/15 text-neutral-900',
            // Disabled state
            disabled && 'bg-neutral-100 text-neutral-400 border-neutral-200 cursor-not-allowed opacity-60',
            className
          )}
          {...props}
        />

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

Textarea.displayName = 'Textarea';
