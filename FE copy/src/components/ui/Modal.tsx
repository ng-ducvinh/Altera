/* eslint-disable react-refresh/only-export-components */
import { useState, forwardRef } from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { cn } from '@/utils/cn'

// ── Root ───────────────────────────────────────────────────────────────────

export const Modal = DialogPrimitive.Root
export const ModalTrigger = DialogPrimitive.Trigger
export const ModalPortal = DialogPrimitive.Portal
export const ModalClose = DialogPrimitive.Close

// ── Overlay ────────────────────────────────────────────────────────────────

export const ModalOverlay = forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      'fixed inset-0 z-50 bg-black/60 backdrop-blur-sm',
      'data-[state=open]:animate-in data-[state=closed]:animate-out',
      'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      'duration-300',
      className,
    )}
    {...props}
  />
))
ModalOverlay.displayName = 'ModalOverlay'

// ── Content ────────────────────────────────────────────────────────────────

export interface ModalContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  hideClose?: boolean
}

const sizeClasses: Record<NonNullable<ModalContentProps['size']>, string> = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-2xl',
  full: 'max-w-[95vw]',
}

export const ModalContent = forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Content>,
  ModalContentProps
>(({ className, children, size = 'md', hideClose = false, ...props }, ref) => (
  <ModalPortal>
    <ModalOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        'fixed left-1/2 top-1/2 z-50 w-full -translate-x-1/2 -translate-y-1/2',
        'bg-[var(--color-card)] text-[var(--color-card-foreground)]',
        'rounded-[var(--radius-xl)]',
        'shadow-[var(--shadow-xl)]',
        'p-6',
        'data-[state=open]:animate-in data-[state=closed]:animate-out',
        'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
        'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
        'data-[state=closed]:slide-out-to-left-1/2 data-[state=open]:slide-in-from-left-1/2',
        'data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-top-[48%]',
        'duration-300',
        sizeClasses[size],
        className,
      )}
      {...props}
    >
      {children}
      {!hideClose && (
        <DialogPrimitive.Close
          className={cn(
            'absolute right-4 top-4',
            'flex h-7 w-7 items-center justify-center rounded-[var(--radius-sm)]',
            'text-[var(--color-muted-foreground)]',
            'transition-colors duration-150',
            'hover:bg-[var(--color-neutral)] hover:text-[var(--color-foreground)]',
            'focus:outline-none focus:ring-2 focus:ring-[var(--color-ring)]',
          )}
          aria-label="Close modal"
        >
          <X className="h-4 w-4" />
        </DialogPrimitive.Close>
      )}
    </DialogPrimitive.Content>
  </ModalPortal>
))
ModalContent.displayName = 'ModalContent'

// ── Sub-components ─────────────────────────────────────────────────────────

export const ModalHeader = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex flex-col gap-1.5 mb-5', className)} {...props} />
  ),
)
ModalHeader.displayName = 'ModalHeader'

export const ModalFooter = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex items-center justify-end gap-3 mt-6', className)} {...props} />
  ),
)
ModalFooter.displayName = 'ModalFooter'

export const ModalTitle = forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn('font-heading text-xl font-bold tracking-tight', className)}
    {...props}
  />
))
ModalTitle.displayName = 'ModalTitle'

export const ModalDescription = forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn('text-sm text-[var(--color-muted-foreground)]', className)}
    {...props}
  />
))
ModalDescription.displayName = 'ModalDescription'

// ── useModal hook ──────────────────────────────────────────────────────────

/**
 * Convenience hook for controlled modal open state.
 *
 * @example
 * const { open, onOpenChange, openModal, closeModal } = useModal()
 * <Modal open={open} onOpenChange={onOpenChange}>
 */
export function useModal(initialOpen = false) {
  const [open, setOpen] = useState(initialOpen)
  return {
    open,
    onOpenChange: setOpen,
    openModal: () => setOpen(true),
    closeModal: () => setOpen(false),
  }
}
