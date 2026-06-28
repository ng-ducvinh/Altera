import { useState, useEffect } from 'react'
import { Search, X } from 'lucide-react'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { cn } from '@/utils/cn'

// ── Props ──────────────────────────────────────────────────────────────────

export interface SearchBarProps {
  /** Controlled value from parent */
  value?: string
  /** Callback fired as the user types (debounced) */
  onChange?: (value: string) => void
  /** Callback fired immediately on enter or clear */
  onSearch?: (value: string) => void
  /** Placeholder text */
  placeholder?: string
  /** Debounce delay in milliseconds */
  debounceMs?: number
  className?: string
  autoFocus?: boolean
}

// ── Component ──────────────────────────────────────────────────────────────

/**
 * ALTERA Shared Search Bar
 * Reusable debounced search input with a clear button.
 */
export function SearchBar({
  value = '',
  onChange,
  onSearch,
  placeholder = 'Search products, styles...',
  debounceMs = 300,
  className,
  autoFocus = false,
}: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState(value)
  const [prevValue, setPrevValue] = useState(value)

  // Sync external value changes during render (avoids effect cascading)
  if (value !== prevValue) {
    setPrevValue(value)
    setSearchTerm(value)
  }

  // Debounced callback
  useEffect(() => {
    if (!onChange) return

    const timer = setTimeout(() => {
      onChange(searchTerm)
    }, debounceMs)

    return () => clearTimeout(timer)
  }, [searchTerm, debounceMs, onChange])

  const handleClear = () => {
    setSearchTerm('')
    onChange?.('')
    onSearch?.('')
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      onSearch?.(searchTerm)
    } else if (e.key === 'Escape') {
      handleClear()
    }
  }

  return (
    <div className={cn('relative w-full', className)}>
      <Input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        autoFocus={autoFocus}
        leftIcon={<Search className="h-4 w-4" />}
        rightIcon={
          searchTerm ? (
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={handleClear}
              className="h-6 w-6 rounded-full text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] hover:bg-[var(--color-border)]"
              aria-label="Clear search"
            >
              <X className="h-3 w-3" />
            </Button>
          ) : undefined
        }
        className="w-full bg-[var(--color-neutral)] border-transparent focus:bg-[var(--color-background)] focus:border-[var(--color-ring)] rounded-[var(--radius-full)]"
      />
    </div>
  )
}
