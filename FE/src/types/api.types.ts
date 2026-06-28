/**
 * ALTERA — API Response Types
 * Matches the backend response envelope from BE/src/app.js
 */

// ── Base response wrapper ──────────────────────────────────────────────────

export interface ApiResponse<T = unknown> {
  success: boolean
  message?: string
  data: T
}

export interface PaginatedResponse<T = unknown> {
  success: boolean
  message?: string
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

// ── Error ──────────────────────────────────────────────────────────────────

export interface ApiError {
  success: false
  message: string
  errors?: Record<string, string[]>
  statusCode?: number
}

// ── Utility types ──────────────────────────────────────────────────────────

export type Nullable<T> = T | null
export type Optional<T> = T | undefined

/** Extract data type from ApiResponse */
export type ExtractData<T> = T extends ApiResponse<infer D> ? D : never
