import api from '@/utils/axios'
import type { ApiResponse } from '@/types/api.types'
import type { AuthUser, User, LoginPayload, RegisterPayload, UpdateProfilePayload } from '@/types/user.types'

export const AuthService = {
  login: (payload: LoginPayload) =>
    api.post<ApiResponse<AuthUser>>('/auth/login', payload),

  register: (payload: RegisterPayload) =>
    api.post<ApiResponse<AuthUser>>('/auth/register', payload),

  getMe: () =>
    api.get<ApiResponse<{ user: User }>>('/auth/me'),

  updateProfile: (payload: UpdateProfilePayload) => {
    const formData = new FormData()
    if (payload.fullName) formData.append('fullName', payload.fullName)
    if (payload.avatar) formData.append('avatar', payload.avatar)
    return api.put<ApiResponse<{ user: User }>>('/users/profile', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  },

  deleteAccount: () =>
    api.delete<ApiResponse<void>>('/users/profile'),
}
