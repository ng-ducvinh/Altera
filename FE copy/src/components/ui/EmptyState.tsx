import { type LucideIcon, PackageSearch } from 'lucide-react'
import { Button } from './Button'
import { cn } from '@/utils/cn'

// ── Props ──────────────────────────────────────────────────────────────────

interface EmptyStateProps {
  /** Title text */
  title?: string
  /** Description text */
  description?: string
  /** Lucide icon component to display */
  icon?: LucideIcon
  /** CTA button label */
  actionLabel?: string
  /** CTA button callback */
  onAction?: () => void
  className?: string
}

// ── Component ──────────────────────────────────────────────────────────────

/**
 * Standard ALTERA empty state component.
 * Shown when a list or resource returns no data.
 *
 * @example
 * if (!products.length) return (
 *   <EmptyState
 *     title="No products found"
 *     description="Try adjusting your filters."
 *     actionLabel="Clear filters"
 *     onAction={clearFilters}
 *   />
 * )
 */
export function EmptyState({
  title = 'No data available.',
  description = 'There\'s nothing here yet.',
  icon: Icon = PackageSearch,
  actionLabel,
  onAction,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-4 text-center',
        'py-16 px-6',
        className,
      )}
    >
      {/* Icon */}
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-neutral)]">
        <Icon className="h-8 w-8 text-[var(--color-muted-foreground)]" strokeWidth={1.5} />
      </div>

      {/* Text */}
      <div className="space-y-1.5 max-w-xs">
        <p className="font-heading font-semibold text-base text-[var(--color-foreground)]">
          {title}
        </p>
        <p className="text-sm text-[var(--color-muted-foreground)] leading-relaxed">
          {description}
        </p>
      </div>

      {/* CTA */}
      {actionLabel && onAction && (
        <Button variant="primary" size="md" onClick={onAction} className="mt-1">
          {actionLabel}
        </Button>
      )}
    </div>
  )
}
