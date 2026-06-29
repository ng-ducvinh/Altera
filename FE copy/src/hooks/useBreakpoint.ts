/**
 * useBreakpoint — Reactive media query hook.
 * Returns which breakpoint the viewport is currently at.
 */
import { useState, useEffect } from 'react'
import { breakpoints } from '@/theme/spacing'

type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'

function getBreakpoint(width: number): Breakpoint {
  if (width >= parseInt(breakpoints['2xl'])) return '2xl'
  if (width >= parseInt(breakpoints.xl)) return 'xl'
  if (width >= parseInt(breakpoints.lg)) return 'lg'
  if (width >= parseInt(breakpoints.md)) return 'md'
  if (width >= parseInt(breakpoints.sm)) return 'sm'
  return 'xs'
}

export function useBreakpoint() {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>(() =>
    getBreakpoint(window.innerWidth),
  )

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>

    const handler = () => {
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        setBreakpoint(getBreakpoint(window.innerWidth))
      }, 100)
    }

    window.addEventListener('resize', handler)
    return () => {
      window.removeEventListener('resize', handler)
      clearTimeout(timeout)
    }
  }, [])

  return {
    breakpoint,
    isMobile: breakpoint === 'xs' || breakpoint === 'sm',
    isTablet: breakpoint === 'md',
    isDesktop: breakpoint === 'lg' || breakpoint === 'xl' || breakpoint === '2xl',
    isLg: breakpoint === 'lg' || breakpoint === 'xl' || breakpoint === '2xl',
  }
}
