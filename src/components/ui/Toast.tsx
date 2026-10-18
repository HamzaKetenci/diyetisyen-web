'use client';

import * as React from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/lib/utils';

export type ToastVariant = 'success' | 'error' | 'info';

export interface ToastData {
  id: string;
  title?: string;
  description: string;
  variant?: ToastVariant;
  duration?: number;
}

interface ToastItemInternal extends ToastData {
  isLeaving?: boolean;
}

export interface ToastOptions {
  title?: string;
  description: string;
  variant?: ToastVariant;
  duration?: number;
}

interface ToastContextValue {
  toast: (options: ToastOptions | string) => void;
  success: (description: string, options?: Omit<ToastOptions, 'description' | 'variant'>) => void;
  error: (description: string, options?: Omit<ToastOptions, 'description' | 'variant'>) => void;
  info: (description: string, options?: Omit<ToastOptions, 'description' | 'variant'>) => void;
  dismiss: (id: string) => void;
}

const ToastContext = React.createContext<ToastContextValue | null>(null);

const DEFAULT_DURATION = 5000;
const LEAVE_DURATION = 250;

/**
 * Toast notification item component.
 */
export function Toast({
  toast,
  onDismiss,
}: {
  toast: ToastItemInternal;
  onDismiss: (id: string) => void;
}) {
  const { id, title, description, variant = 'info', isLeaving } = toast;

  const variantStyles: Record<
    ToastVariant,
    {
      container: string;
      iconBg: string;
      icon: React.ReactNode;
    }
  > = {
    success: {
      container: 'border-success/30 bg-white text-neutral-900',
      iconBg: 'bg-success/10 text-success',
      icon: (
        <svg
          className="w-5 h-5 shrink-0"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2.5"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      ),
    },
    error: {
      container: 'border-error/30 bg-white text-neutral-900',
      iconBg: 'bg-error/10 text-error',
      icon: (
        <svg
          className="w-5 h-5 shrink-0"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2.5"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="9" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01" />
        </svg>
      ),
    },
    info: {
      container: 'border-primary/30 bg-white text-neutral-900',
      iconBg: 'bg-primary/10 text-primary',
      icon: (
        <svg
          className="w-5 h-5 shrink-0"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2.5"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="9" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 16v-4m0-4h.01" />
        </svg>
      ),
    },
  };

  const style = variantStyles[variant];

  return (
    <div
      role="alert"
      aria-live="polite"
      className={cn(
        // Layout & sizing
        'pointer-events-auto w-full max-w-sm rounded-xl p-4 shadow-lg border',
        'flex items-start gap-3 transform transition-all ease-out',
        // Transition state
        isLeaving
          ? 'duration-200 translate-x-full opacity-0 scale-95'
          : 'duration-300 translate-x-0 opacity-100 scale-100',
        style.container
      )}
    >
      <div
        className={cn(
          'w-9 h-9 min-w-[36px] rounded-lg flex items-center justify-center shrink-0',
          style.iconBg
        )}
      >
        {style.icon}
      </div>

      <div className="flex-1 pt-0.5">
        {title && (
          <h4 className="text-sm font-semibold text-neutral-900 leading-tight mb-1">
            {title}
          </h4>
        )}
        <p className="text-sm text-neutral-600 leading-relaxed break-words">
          {description}
        </p>
      </div>

      <button
        type="button"
        onClick={() => onDismiss(id)}
        aria-label="Bildirimi kapat"
        className={cn(
          'w-8 h-8 min-h-[32px] min-w-[32px] sm:min-h-[44px] sm:min-w-[44px] -mr-1 -mt-1',
          'inline-flex items-center justify-center rounded-lg text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100',
          'transition-colors duration-150 cursor-pointer shrink-0',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary'
        )}
      >
        <svg
          className="w-4 h-4"
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
    </div>
  );
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<ToastItemInternal[]>([]);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const dismiss = React.useCallback((id: string) => {
    setToasts((prev) =>
      prev.map((t) => (t.id === id ? { ...t, isLeaving: true } : t))
    );

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, LEAVE_DURATION);
  }, []);

  const addToast = React.useCallback(
    (options: ToastOptions | string) => {
      const id = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
      const newToast: ToastItemInternal =
        typeof options === 'string'
          ? { id, description: options, variant: 'info', duration: DEFAULT_DURATION }
          : {
              id,
              title: options.title,
              description: options.description,
              variant: options.variant || 'info',
              duration: options.duration ?? DEFAULT_DURATION,
            };

      setToasts((prev) => [...prev, newToast]);

      const duration = newToast.duration ?? DEFAULT_DURATION;
      if (duration > 0) {
        setTimeout(() => {
          dismiss(id);
        }, duration);
      }
    },
    [dismiss]
  );

  const success = React.useCallback(
    (description: string, options?: Omit<ToastOptions, 'description' | 'variant'>) => {
      addToast({ ...options, description, variant: 'success' });
    },
    [addToast]
  );

  const error = React.useCallback(
    (description: string, options?: Omit<ToastOptions, 'description' | 'variant'>) => {
      addToast({ ...options, description, variant: 'error' });
    },
    [addToast]
  );

  const info = React.useCallback(
    (description: string, options?: Omit<ToastOptions, 'description' | 'variant'>) => {
      addToast({ ...options, description, variant: 'info' });
    },
    [addToast]
  );

  const contextValue = React.useMemo(
    () => ({
      toast: addToast,
      success,
      error,
      info,
      dismiss,
    }),
    [addToast, success, error, info, dismiss]
  );

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      {mounted &&
        createPortal(
          <div
            aria-live="polite"
            className="fixed top-4 right-4 z-50 flex flex-col gap-3 max-w-sm w-[calc(100%-2rem)] pointer-events-none"
          >
            {toasts.map((item) => (
              <Toast key={item.id} toast={item} onDismiss={dismiss} />
            ))}
          </div>,
          document.body
        )}
    </ToastContext.Provider>
  );
}

/**
 * Hook to access the toast notification functions.
 */
export function useToast() {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a <ToastProvider>');
  }
  return context;
}
