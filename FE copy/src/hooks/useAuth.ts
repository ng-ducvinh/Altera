/**
 * useAuth — Convenience hook wrapping authStore.
 * Provides typed auth state and actions in one import.
 */
import { useAuthStore } from '@/store/authStore'

export function useAuth() {
  const user = useAuthStore((s) => s.user)
  const token = useAuthStore((s) => s.token)
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  const login = useAuthStore((s) => s.login)
  const logout = useAuthStore((s) => s.logout)
  const updateUser = useAuthStore((s) => s.updateUser)

  const isAdmin = user?.role === 'ADMIN'

  return {
    user,
    token,
    isAuthenticated,
    isAdmin,
    login,
    logout,
    updateUser,
  }
}
