import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'

interface ProtectedRouteProps {
  requireAdmin?: boolean
}

/**
 * Route guard for authenticated users and admins.
 * Redirects unauthenticated users to login, capturing the intended destination.
 * Redirects non-admins trying to access admin routes to the home page.
 */
export function ProtectedRoute({ requireAdmin = false }: ProtectedRouteProps) {
  const { isAuthenticated, isAdmin } = useAuth()
  const location = useLocation()

  if (!isAuthenticated) {
    // Redirect to login but save the attempted url
    return <Navigate to="/auth/login" state={{ from: location }} replace />
  }

  if (requireAdmin && !isAdmin) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}
