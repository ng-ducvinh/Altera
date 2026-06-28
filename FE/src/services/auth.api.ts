/**
 * ALTERA — Auth API Service
 * All auth-related API calls. Never call axios directly in pages/components.
 */
import api from '@/utils/axios'
import type { ApiResponse } from '@/types/api.types'
import type {
  AuthUser,
  User,
  LoginPayload,
  RegisterPayload,
  UpdateProfilePayload,
  ChangePasswordPayload,
} from '@/types/user.types'

export const AuthService = {
  /**
   * Login with email + password.
   * Returns user object and JWT token.
   */
  login: (payload: LoginPayload) =>
    api.post<ApiResponse<AuthUser>>('/auth/login', payload),

  /**
   * Register a new user account.
   */
  register: (payload: RegisterPayload) =>
    api.post<ApiResponse<AuthUser>>('/auth/register', payload),

  /**
   * Get the currently authenticated user's profile.
   * Requires Authorization header (handled by axios interceptor).
   */
  getProfile: () => api.get<ApiResponse<User>>('/users/profile'),

  /**
   * Update the current user's profile.
   */
  updateProfile: (payload: UpdateProfilePayload) =>
    api.put<ApiResponse<User>>('/users/profile', payload),

  /**
   * Change the current user's password.
   */
  changePassword: (payload: ChangePasswordPayload) =>
    api.put<ApiResponse<void>>('/users/password', payload),

  /**
   * Permanently delete the current user's account.
   */
  deleteAccount: () => api.delete<ApiResponse<void>>('/users/profile'),
}
