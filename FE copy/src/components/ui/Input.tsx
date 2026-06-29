import { forwardRef, useId } from 'react'
import { cn } from '@/utils/cn'

// ── Label ──────────────────────────────────────────────────────────────────

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean
}

export function Label({ className, children, required, ...props }: LabelProps) {
  return (
    <label
      className={cn(
        'block text-sm font-medium text-[var(--color-foreground)] mb-1.5',
        className,
      )}
      {...props}
    >
      {children}
      {required && (
        <span className="ml-1 text-[var(--color-accent)]" aria-hidden="true">
          *
        </span>
      )}
    </label>
  )
}

// ── Input ──────────────────────────────────────────────────────────────────

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  hint?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  required?: boolean
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      label,
      error,
      hint,
      leftIcon,
      rightIcon,
      id: externalId,
      required,
      type = 'text',
      ...props
    },
    ref,
  ) => {
    const generatedId = useId()
    const id = externalId ?? generatedId

    return (
      <div className="w-full">
        {label && (
          <Label htmlFor={id} required={required}>
            {label}
          </Label>
        )}

        <div className="relative flex items-center">
          {leftIcon && (
            <span className="absolute left-3 flex items-center text-[var(--color-muted-foreground)] pointer-events-none">
              {leftIcon}
            </span>
          )}

          <input
            ref={ref}
            id={id}
            type={type}
            required={required}
            aria-invalid={!!error}
            aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
            className={cn(
              'w-full h-10 px-3 text-sm',
              'bg-[var(--color-background)] text-[var(--color-foreground)]',
              'border border-[var(--color-border)] rounded-[var(--radius-md)]',
              'placeholder:text-[var(--color-muted-foreground)]',
              'transition-colors duration-150',
              'focus:outline-none focus:ring-2 focus:ring-[var(--color-ring)] focus:border-transparent',
              'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-[var(--color-muted)]',
              leftIcon && 'pl-9',
              rightIcon && 'pr-9',
              error && 'border-[var(--color-error)] focus:ring-[var(--color-error)]',
              className,
            )}
            {...props}
          />

          {rightIcon && (
            <span className="absolute right-3 flex items-center text-[var(--color-muted-foreground)]">
              {rightIcon}
            </span>
          )}
        </div>

        {error && (
          <p id={`${id}-error`} role="alert" className="mt-1.5 text-xs text-[var(--color-error)]">
            {error}
          </p>
        )}
        {!error && hint && (
          <p id={`${id}-hint`} className="mt-1.5 text-xs text-[var(--color-muted-foreground)]">
            {hint}
          </p>
        )}
      </div>
    )
  },
)

Input.displayName = 'Input'
