import { Link } from 'react-router-dom'
import { Heart, ShoppingBag } from 'lucide-react'
import type { Product } from '@/types/product.types'
import { formatPrice } from '@/utils/format'
import { cn } from '@/utils/cn'

interface ProductCardProps {
  product: Product
  className?: string
}

export function ProductCard({ product, className }: ProductCardProps) {
  const imageUrl = product.images?.[0]?.url || 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&auto=format&fit=crop&q=80'

  return (
    <div
      className={cn(
        'group relative flex flex-col overflow-hidden bg-[var(--color-background)] transition-all duration-300',
        className
      )}
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-[var(--color-muted)]">
        <Link to={`/products/${product._id}`} aria-label={`View details of ${product.name}`}>
          <img
            src={imageUrl}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
          />
        </Link>

        {/* Quick Badges / Actions */}
        {product.originalPrice && product.originalPrice > product.price && (
          <span className="absolute left-3 top-3 bg-[var(--color-accent)] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[var(--color-accent-foreground)] rounded-[var(--radius-sm)]">
            Sale
          </span>
        )}

        <div className="absolute bottom-4 right-4 flex flex-col gap-2 translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-background)] text-[var(--color-foreground)] border border-[var(--color-border)] shadow-sm hover:bg-[var(--color-primary)] hover:text-[var(--color-primary-foreground)] hover:border-transparent transition-colors"
            aria-label="Add to Wishlist"
          >
            <Heart className="h-4.5 w-4.5" />
          </button>
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-background)] text-[var(--color-foreground)] border border-[var(--color-border)] shadow-sm hover:bg-[var(--color-primary)] hover:text-[var(--color-primary-foreground)] hover:border-transparent transition-colors"
            aria-label="Quick Add to Cart"
          >
            <ShoppingBag className="h-4.5 w-4.5" />
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-col pt-4 pb-2">
        <div className="flex items-start justify-between gap-4">
          <Link
            to={`/products/${product._id}`}
            className="text-sm font-medium text-[var(--color-foreground)] hover:underline line-clamp-1"
          >
            {product.name}
          </Link>
          <span className="text-sm font-semibold whitespace-nowrap">
            {formatPrice(product.price)}
          </span>
        </div>
        <div className="mt-1 flex items-center justify-between text-xs text-[var(--color-muted-foreground)]">
          <span>{product.category}</span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="line-through text-xs font-normal">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
