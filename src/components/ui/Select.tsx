import * as React from 'react';
import { cn } from '@/lib/utils';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  /**
   * Unique identifier required for accessibility.
   */
  id: string;
  /**
   * Array of options to display in the dropdown.
   */
  options: SelectOption[];
  /**
   * Optional placeholder option displayed when no selection is made.
   */
  placeholder?: string;
  /**
   * Label text displayed above the select element.
   */
  label?: string;
  /**
   * Error message displayed below the select element.
   */
  error?: string;
  /**
   * Helper text providing guidance below the select element.
   */
  helperText?: string;
  /**
   * Expand select to full width of container.
   * @default true
   */
  fullWidth?: boolean;
  /**
   * Optional container wrapper className.
   */
  containerClassName?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      id,
      options,
      placeholder,
      label,
      error,
      helperText,
      fullWidth = true,
      className,
      containerClassName,
      disabled,
      required,
      defaultValue,
      value,
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
          <select
            ref={ref}
            id={id}
            disabled={disabled}
            required={required}
            defaultValue={defaultValue}
            value={value}
            aria-invalid={Boolean(error)}
            aria-describedby={describedBy}
            className={cn(
              // Sizing & touch target (>= 44px min-h)
              'w-full min-h-[44px] pl-3.5 pr-10 py-2.5 text-base appearance-none cursor-pointer',
              // Base styling
              'bg-white text-neutral-900 rounded-xl',
              'border border-neutral-200 transition-colors duration-150',
              // Focus ring
              'focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/15',
              // Error state
              error && 'border-error focus:border-error focus:ring-error/15 text-neutral-900',
              // Disabled state
              disabled && 'bg-neutral-100 text-neutral-400 border-neutral-200 cursor-not-allowed opacity-60',
              className
            )}
            {...props}
          >
            {placeholder && (
              <option value="" disabled hidden={required}>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option
                key={option.value}
                value={option.value}
                disabled={option.disabled}
                className="text-neutral-900 bg-white py-1"
              >
                {option.label}
              </option>
            ))}
          </select>

          {/* Custom Chevron Down Icon */}
          <div
            className="absolute right-3.5 flex items-center pointer-events-none text-neutral-500"
            aria-hidden="true"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
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

Select.displayName = 'Select';
