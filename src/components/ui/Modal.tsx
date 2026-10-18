'use client';

import * as React from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/lib/utils';

export type ModalSize = 'sm' | 'md' | 'lg';

export interface ModalProps {
  /**
   * Controls whether the modal is visible.
   */
  isOpen: boolean;
  /**
   * Callback fired when modal request to close (via backdrop, escape key, or close button).
   */
  onClose: () => void;
  /**
   * Title shown at the top of the modal.
   */
  title?: React.ReactNode;
  /**
   * Optional description text for screen readers and subtitle display.
   */
  description?: string;
  /**
   * Content inside the modal dialog.
   */
  children: React.ReactNode;
  /**
   * Max width size preset.
   * - sm: max-w-md
   * - md: max-w-lg
   * - lg: max-w-2xl
   * @default 'md'
   */
  size?: ModalSize;
  /**
   * Whether to show the top-right close icon button.
   * @default true
   */
  showCloseButton?: boolean;
  /**
   * Custom CSS classes for the modal dialog content container.
   */
  className?: string;
  /**
   * Unique ID prefix for accessibility labelling.
   */
  id?: string;
}

const sizeClasses: Record<ModalSize, string> = {
  sm: 'max-w-md',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
};

const FOCUSABLE_SELECTORS = [
  'a[href]',
  'area[href]',
  'input:not([disabled]):not([type="hidden"])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  'button:not([disabled])',
  'iframe',
  'object',
  'embed',
  '[tabindex]:not([tabindex="-1"])',
  '[contenteditable]',
].join(',');

export function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  size = 'md',
  showCloseButton = true,
  className,
  id: customId,
}: ModalProps) {
  const generatedId = React.useId();
  const modalId = customId || `modal-${generatedId}`;
  const titleId = `${modalId}-title`;
  const descId = `${modalId}-desc`;

  const [mounted, setMounted] = React.useState(false);
  const modalRef = React.useRef<HTMLDivElement>(null);
  const backdropRef = React.useRef<HTMLDivElement>(null);
  const previousActiveElement = React.useRef<HTMLElement | null>(null);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body scroll and handle focus trapping
  React.useEffect(() => {
    if (!isOpen) return;

    // Save active element to restore focus on close
    previousActiveElement.current = document.activeElement as HTMLElement | null;

    // Lock body scroll
    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    // Set initial focus inside modal
    const focusTimer = setTimeout(() => {
      if (modalRef.current) {
        const focusable = modalRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS);
        if (focusable.length > 0) {
          focusable[0].focus();
        } else {
          modalRef.current.focus();
        }
      }
    }, 50);

    // Escape key listener & Focus Trap
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key === 'Tab' && modalRef.current) {
        const focusables = Array.from(
          modalRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS)
        ).filter((el) => el.offsetParent !== null); // only visible elements

        if (focusables.length === 0) {
          event.preventDefault();
          return;
        }

        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (event.shiftKey) {
          if (document.activeElement === first || document.activeElement === modalRef.current) {
            event.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            event.preventDefault();
            first.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(focusTimer);
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;

      if (previousActiveElement.current) {
        previousActiveElement.current.focus();
      }
    };
  }, [isOpen, onClose]);

  if (!mounted || !isOpen) {
    return null;
  }

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === backdropRef.current) {
      onClose();
    }
  };

  const modalContent = (
    <div
      ref={backdropRef}
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-neutral-900/60 backdrop-blur-xs transition-opacity duration-200 animate-in fade-in"
      aria-hidden="false"
    >
      <div
        ref={modalRef}
        role="dialog"
        id={modalId}
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        aria-describedby={description ? descId : undefined}
        tabIndex={-1}
        className={cn(
          // Base styling
          'relative w-full bg-white rounded-2xl shadow-xl border border-neutral-200/80',
          'flex flex-col max-h-[calc(100vh-3rem)] overflow-hidden',
          'transform transition-all duration-200 outline-none scale-100',
          sizeClasses[size],
          className
        )}
      >
        {/* Header */}
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-neutral-100">
            <div className="flex-1 pr-4">
              {title && (
                <h2
                  id={titleId}
                  className="font-heading text-xl sm:text-2xl font-semibold text-neutral-900 leading-tight"
                >
                  {title}
                </h2>
              )}
              {description && (
                <p id={descId} className="text-sm text-neutral-600 mt-1">
                  {description}
                </p>
              )}
            </div>

            {showCloseButton && (
              <button
                type="button"
                onClick={onClose}
                aria-label="Kapat"
                className={cn(
                  'w-11 h-11 min-w-[44px] min-h-[44px] inline-flex items-center justify-center',
                  'rounded-xl text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100',
                  'transition-colors duration-150 cursor-pointer',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary'
                )}
              >
                <svg
                  className="w-5 h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        )}

        {/* Content body */}
        <div className="p-6 overflow-y-auto flex-1">{children}</div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}

Modal.displayName = 'Modal';
