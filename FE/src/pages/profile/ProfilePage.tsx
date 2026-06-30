import { useEffect, useState } from 'react'
import { AuthService } from '@/services/auth.api'
import { useAuthStore } from '@/store/authStore'
import type { User } from '@/types/user.types'
import { Button } from '@/components/ui/Button'
import { User as UserIcon } from 'lucide-react'

export function ProfilePage() {
  const storeUser = useAuthStore((state) => state.user)
  const updateUser = useAuthStore((state) => state.updateUser)
  const [user, setUser] = useState<User | null>(storeUser)
  const [loading, setLoading] = useState(!storeUser)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (!storeUser) setLoading(true)
        const response = await AuthService.getMe()
        const fetchedUser = response.data.data as any
        
        // Match exact destructuring path from server: response.data.data.user 
        // Fallback to data just in case structure varies slightly
        const actualUser = fetchedUser.user || fetchedUser
        
        setUser(actualUser)
        updateUser(actualUser)
      } catch (err: any) {
        setError(err?.response?.data?.message || 'Failed to load profile')
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, []) // fetch on mount to sync with server

  if (loading) {
    return (
      <div className="mx-auto max-w-[var(--spacing-contentMax)] px-6 py-12">
        <h1 className="font-heading text-3xl font-bold mb-8 uppercase tracking-wide">My Profile</h1>
        <div className="animate-pulse flex items-center space-x-6">
          <div className="h-24 w-24 rounded-full bg-zinc-300 dark:bg-zinc-800" />
          <div className="space-y-4">
            <div className="h-6 w-48 bg-zinc-300 dark:bg-zinc-800" />
            <div className="h-4 w-32 bg-zinc-300 dark:bg-zinc-800" />
          </div>
        </div>
      </div>
    )
  }

  if (error || !user) {
    return (
      <div className="mx-auto max-w-[var(--spacing-contentMax)] px-6 py-12 text-center flex flex-col items-center min-h-[50vh] justify-center">
        <p className="text-rose-500 mb-6 font-medium">{error || 'Profile not found'}</p>
        <Button onClick={() => window.location.reload()} variant="outline">Retry</Button>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-[var(--spacing-contentMax)] px-6 py-12 min-h-[70vh]">
      <h1 className="font-heading text-3xl font-bold mb-8 uppercase tracking-wide">My Profile</h1>
      
      <div className="bg-[var(--color-background)] border border-[var(--color-border)] rounded-[var(--radius-lg)] p-8 shadow-sm flex flex-col md:flex-row items-center md:items-start gap-8">
        <div className="relative h-24 w-24 sm:h-32 sm:w-32 rounded-full overflow-hidden bg-[var(--color-muted)] shrink-0 border border-[var(--color-border)]">
          {user.avatar ? (
            <img src={user.avatar} alt={user.fullName} className="h-full w-full object-cover" />
          ) : (
            <div className="flex items-center justify-center h-full w-full bg-[var(--color-muted)] text-[var(--color-muted-foreground)]">
              <UserIcon className="h-10 w-10 opacity-50" />
            </div>
          )}
        </div>
        
        <div className="flex flex-col text-center md:text-left mt-4 md:mt-0">
          <h2 className="text-2xl font-bold font-heading">{user.fullName}</h2>
          <p className="text-[var(--color-muted-foreground)] mt-1">{user.email}</p>
          
          <div className="mt-6 inline-flex px-3 py-1 bg-[var(--color-primary)] text-[var(--color-primary-foreground)] text-xs font-bold rounded-full uppercase tracking-wider mx-auto md:mx-0 w-fit">
            {user.role}
          </div>
        </div>
      </div>
    </div>
  )
}
