import { Link } from 'react-router-dom'
import { Heart, ShoppingBag } from 'lucide-react'
import type { Product } from '@/types/product.types'
import { formatPrice } from '@/utils/format'
import { cn } from '@/utils/cn'
import { CartService } from '@/services/cart.api'
import { useCartStore } from '@/store/cartStore'
import { toast } from 'sonner'
import { useState } from 'react'

interface ProductCardProps {
  product: Product
  className?: string
}

export function ProductCard({ product, className }: ProductCardProps) {
  const imageUrl = product.imageUrl || 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&auto=format&fit=crop&q=80'
  const { fetchCart } = useCartStore()
  const [adding, setAdding] = useState(false)

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (adding) return

    try {
      setAdding(true)
      await CartService.addToCart({ productId: product._id, quantity: 1 })
      await fetchCart()
      toast.success('Added to cart successfully.')
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Failed to add to cart')
    } finally {
      setAdding(false)
    }
  }

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
          <div className="flex h-full w-full items-center justify-center bg-[var(--color-muted)] text-sm font-medium text-[var(--color-muted-foreground)]">
            Upload image
          </div>
        </Link>



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
            onClick={handleAddToCart}
            disabled={adding}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-background)] text-[var(--color-foreground)] border border-[var(--color-border)] shadow-sm hover:bg-[var(--color-primary)] hover:text-[var(--color-primary-foreground)] hover:border-transparent transition-colors disabled:opacity-50"
            aria-label="Quick Add to Cart"
          >
            {adding ? (
              <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            ) : (
              <ShoppingBag className="h-4.5 w-4.5" />
            )}
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
        </div>
      </div>
    </div>
  )
}
