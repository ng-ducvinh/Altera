/**
 * ALTERA — Common / Shared Types
 */

// ── Roles ──────────────────────────────────────────────────────────────────

export type UserRole = 'USER' | 'ADMIN'

// ── Status enums ───────────────────────────────────────────────────────────

export type OrderStatus =
  | 'PENDING'
  | 'CONFIRMED'
  | 'PROCESSING'
  | 'SHIPPED'
  | 'DELIVERED'
  | 'CANCELLED'
  | 'REFUNDED'

export type ChatTopic = 'fashion' | 'outfit' | 'style' | 'general'

export type MessageSender = 'USER' | 'AI'

// ── UI State types ─────────────────────────────────────────────────────────

export interface LoadingState {
  isLoading: boolean
  error: string | null
}

export interface SelectOption<T = string> {
  label: string
  value: T
  disabled?: boolean
}

// ── Pagination ─────────────────────────────────────────────────────────────

export interface PaginationParams {
  page?: number
  limit?: number
}

export interface SortParams {
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

export type QueryParams = PaginationParams & SortParams & Record<string, unknown>

// ── Address ────────────────────────────────────────────────────────────────

export interface Address {
  street: string
  city: string
  state?: string
  country: string
  postalCode?: string
}

// ── Image ──────────────────────────────────────────────────────────────────

export interface CloudinaryImage {
  url: string
  publicId: string
}
