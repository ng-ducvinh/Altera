import { Link } from 'react-router-dom'
import { Button } from '@/components/ui'

export function NotFoundPage() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
      <h1 className="font-heading text-9xl font-black text-[var(--color-neutral)]">
        404
      </h1>
      <p className="mt-4 text-lg font-medium text-[var(--color-foreground)]">
        Page not found
      </p>
      <p className="mt-2 text-[var(--color-muted-foreground)]">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Button variant="primary" size="lg" className="mt-8" asChild>
        <Link to="/">Back to Home</Link>
      </Button>
    </div>
  )
}
