import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merge Tailwind CSS class names intelligently.
 * Resolves conflicts (e.g., px-2 + px-4 → px-4).
 *
 * Usage:
 *   cn('px-2 py-1', condition && 'bg-black', 'px-4')
 *   → 'py-1 bg-black px-4'
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}
