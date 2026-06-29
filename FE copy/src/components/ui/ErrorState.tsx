import { AlertCircle, RefreshCw } from 'lucide-react'
import { Button } from './Button'
import { cn } from '@/utils/cn'

// ── Props ──────────────────────────────────────────────────────────────────

interface ErrorStateProps {
  /** Error message to display. Defaults to standard message. */
  message?: string
  /** Callback for the "Try again" button */
  onRetry?: () => void
  /** Show full-page layout */
  fullPage?: boolean
  className?: string
}

// ── Component ──────────────────────────────────────────────────────────────

/**
 * Standard ALTERA error state component.
 * Shows whenever a data-fetching operation fails.
 *
 * @example
 * if (error) return <ErrorState onRetry={refetch} />
 * if (error) return <ErrorState message={error.message} onRetry={refetch} />
 */
export function ErrorState({
  message = 'Unable to load data. Please try again.',
  onRetry,
  fullPage = false,
  className,
}: ErrorStateProps) {
  return (
    <div
      role="alert"
      aria-live="assertive"
      className={cn(
        'flex flex-col items-center justify-center gap-4 text-center',
        fullPage ? 'min-h-[60vh] p-8' : 'py-12 px-6',
        className,
      )}
    >
      {/* Icon */}
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-50">
        <AlertCircle className="h-7 w-7 text-[var(--color-error)]" />
      </div>

      {/* Text */}
      <div className="space-y-1.5 max-w-xs">
        <p className="font-heading font-semibold text-base text-[var(--color-foreground)]">
          Something went wrong
        </p>
        <p className="text-sm text-[var(--color-muted-foreground)] leading-relaxed">
          {message}
        </p>
      </div>

      {/* Retry */}
      {onRetry && (
        <Button
          variant="outline"
          size="sm"
          onClick={onRetry}
          className="gap-2 mt-1"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          Try again
        </Button>
      )}
    </div>
  )
}
