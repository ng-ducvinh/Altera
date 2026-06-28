/**
 * ALTERA — User Types
 */
import type { UserRole, Address, CloudinaryImage } from './common.types'

export interface User {
  _id: string
  name: string
  email: string
  role: UserRole
  avatar?: CloudinaryImage
  phone?: string
  address?: Address
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
  name: string
  email: string
  password: string
  confirmPassword: string
}

export interface UpdateProfilePayload {
  name?: string
  phone?: string
  address?: Address
}

export interface ChangePasswordPayload {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}
