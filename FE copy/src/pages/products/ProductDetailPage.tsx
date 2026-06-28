import { useParams } from 'react-router-dom'

export function ProductDetailPage() {
  const { id } = useParams()

  return (
    <div className="mx-auto max-w-[var(--spacing-contentMax)] px-6 py-12">
      <h1 className="font-heading text-3xl font-bold">Product Detail</h1>
      <p className="mt-4 text-[var(--color-muted-foreground)]">
        Placeholder for Product {id} Detail Page.
      </p>
    </div>
  )
}
