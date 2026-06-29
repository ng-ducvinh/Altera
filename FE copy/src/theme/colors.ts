/**
 * ALTERA Design System — Color Tokens
 * Single source of truth for all brand colors.
 * Always use these constants; never hardcode hex values in components.
 */

export const colors = {
  // Brand
  primary: '#000000',
  primaryForeground: '#ffffff',

  secondary: '#ffffff',
  secondaryForeground: '#000000',

  accent: '#e11d48',
  accentForeground: '#ffffff',

  neutral: '#f5f5f5',
  neutralForeground: '#111111',

  // Semantic
  background: '#ffffff',
  foreground: '#0a0a0a',

  muted: '#f5f5f5',
  mutedForeground: '#737373',

  border: '#e5e5e5',
  input: '#e5e5e5',
  ring: '#000000',

  card: '#ffffff',
  cardForeground: '#0a0a0a',

  // Status
  success: '#22c55e',
  successForeground: '#ffffff',

  warning: '#f59e0b',
  warningForeground: '#ffffff',

  error: '#ef4444',
  errorForeground: '#ffffff',

  destructive: '#ef4444',
  destructiveForeground: '#ffffff',
} as const

export type ColorKey = keyof typeof colors
