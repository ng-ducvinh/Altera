/**
 * ALTERA — User Types
 */

export interface User {
  _id: string
  id: string
  fullName: string
  email: string
  avatar: string | null
  role: 'USER' | 'ADMIN'
  createdAt: string
  updatedAt: string
}

export interface AuthUser {
  user: User
  token: string
}

// ── Auth payloads ──────────────────────────────────────────────────────────

export interface LoginPayload {
  email: string
  password: string
}

export interface RegisterPayload {
  fullName: string
  email: string
  password: string
}

export interface UpdateProfilePayload {
  fullName?: string
  avatar?: File
}

export interface ChangePasswordPayload {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}
