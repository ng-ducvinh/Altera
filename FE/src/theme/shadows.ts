/**
 * ALTERA Design System — Shadow Tokens
 * Fashion-grade: subtle, not heavy.
 */

export const shadows = {
  none: 'none',
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.04)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.06), 0 2px 4px -2px rgb(0 0 0 / 0.04)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.06), 0 4px 6px -4px rgb(0 0 0 / 0.04)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.08), 0 8px 10px -6px rgb(0 0 0 / 0.04)',
  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.12)',

  // Hover lift effect (use on cards)
  hover: '0 8px 24px -4px rgb(0 0 0 / 0.10)',

  // Inner shadow for inputs
  inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.04)',
} as const

export type ShadowKey = keyof typeof shadows
