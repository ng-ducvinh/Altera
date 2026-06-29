import { forwardRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/utils/cn'

const badgeVariants = cva(
  [
    'inline-flex items-center gap-1',
    'px-2.5 py-0.5',
    'rounded-[var(--radius-full)]',
    'text-xs font-medium leading-none',
    'transition-colors duration-150',
    'select-none',
  ],
  {
    variants: {
      variant: {
        default: 'bg-[var(--color-foreground)] text-[var(--color-background)]',
        secondary: 'bg-[var(--color-neutral)] text-[var(--color-neutral-foreground)]',
        outline: 'border border-[var(--color-border)] bg-transparent text-[var(--color-foreground)]',
        success: 'bg-green-100 text-green-800',
        warning: 'bg-amber-100 text-amber-800',
        danger: 'bg-red-100 text-[var(--color-error)]',
        accent: 'bg-[var(--color-accent)] text-[var(--color-accent-foreground)]',
        muted: 'bg-[var(--color-muted)] text-[var(--color-muted-foreground)]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  ),
)

Badge.displayName = 'Badge'
