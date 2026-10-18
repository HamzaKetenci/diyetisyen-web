import * as React from 'react';
import { cn } from '@/lib/utils';

export type CardPadding = 'none' | 'sm' | 'md' | 'lg';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Enables a subtle upward float and enhanced shadow on hover.
   * Uses native CSS transition for optimal performance (no Framer Motion).
   * @default false
   */
  hoverable?: boolean;
  /**
   * Internal padding preset.
   * - none: p-0
   * - sm: p-4
   * - md: p-6
   * - lg: p-8
   * @default 'md'
   */
  padding?: CardPadding;
}

const paddingClasses: Record<CardPadding, string> = {
  none: 'p-0',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8 sm:p-10',
};

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      hoverable = false,
      padding = 'md',
      children,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          // Base styles
          'bg-white rounded-2xl shadow-card border border-neutral-200/60',
          // Padding
          paddingClasses[padding],
          // Hoverable transition (-translate-y-1 = translateY(-4px))
          hoverable &&
            'transition-all duration-200 ease-out hover:shadow-card-hover hover:-translate-y-1 cursor-pointer',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex flex-col space-y-1.5 mb-4', className)}
      {...props}
    />
  )
);
CardHeader.displayName = 'CardHeader';

export interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, as: Component = 'h3', ...props }, ref) => (
    <Component
      ref={ref}
      className={cn(
        'font-heading font-semibold text-xl sm:text-2xl text-neutral-900 leading-tight tracking-tight',
        className
      )}
      {...props}
    />
  )
);
CardTitle.displayName = 'CardTitle';

export interface CardDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {}

export const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  CardDescriptionProps
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-sm text-neutral-600 leading-relaxed', className)}
    {...props}
  />
));
CardDescription.displayName = 'CardDescription';

export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('pt-0', className)} {...props} />
  )
);
CardContent.displayName = 'CardContent';

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

export const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex items-center pt-4 mt-4 border-t border-neutral-100', className)}
      {...props}
    />
  )
);
CardFooter.displayName = 'CardFooter';
