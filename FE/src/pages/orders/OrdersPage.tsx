import { useEffect, useState } from 'react'
import { OrderService } from '@/services/order.api'
import type { Order } from '@/types/order.types'
import { Button } from '@/components/ui/Button'
import { Link } from 'react-router-dom'
import { Package } from 'lucide-react'

export function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const fetchOrders = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await OrderService.getMyOrders(page)
      const data = response.data.data
      setOrders(data.orders)
      setTotalPages(data.pagination.totalPages || 1)
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Failed to fetch orders')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [page])

  return (
    <div className="mx-auto max-w-[var(--spacing-contentMax)] px-6 py-12 min-h-[70vh]">
      <h1 className="font-heading text-3xl font-bold uppercase tracking-wide mb-8">My Orders</h1>
      
      {loading ? (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-24 w-full animate-pulse bg-zinc-300 dark:bg-zinc-800 rounded-[var(--radius-md)]" />
          ))}
        </div>
      ) : error ? (
        <div className="text-center py-12 flex flex-col items-center justify-center min-h-[40vh]">
          <p className="text-rose-500 font-medium mb-6">{error}</p>
          <Button onClick={() => fetchOrders()} variant="outline">Retry</Button>
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center py-20 flex flex-col items-center justify-center border-2 border-dashed border-[var(--color-border)] rounded-[var(--radius-lg)] bg-[var(--color-muted)]/30">
          <Package className="h-12 w-12 text-[var(--color-muted-foreground)] mb-4" />
          <p className="text-[var(--color-muted-foreground)] mb-6 font-medium">You have no orders yet.</p>
          <Button asChild variant="primary" className="uppercase font-semibold tracking-wider">
            <Link to="/products">Start Shopping</Link>
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order._id} className="border border-[var(--color-border)] rounded-[var(--radius-lg)] p-6 shadow-sm bg-[var(--color-background)] transition-all hover:shadow-md">
              <div className="flex justify-between items-center mb-4">
                <span className="font-medium font-heading">Order #{order._id.slice(-8).toUpperCase()}</span>
              </div>
              <p className="text-sm text-[var(--color-muted-foreground)]">Details not fully implemented yet by server.</p>
            </div>
          ))}

          {totalPages > 1 && (
             <div className="flex justify-center items-center gap-4 mt-12">
               <Button 
                 variant="outline" 
                 disabled={page === 1}
                 onClick={() => setPage(p => Math.max(1, p - 1))}
               >
                 Previous
               </Button>
               <div className="font-medium text-sm">
                 Page {page} of {totalPages}
               </div>
               <Button 
                 variant="outline" 
                 disabled={page === totalPages}
                 onClick={() => setPage(p => Math.min(totalPages, p + 1))}
               >
                 Next
               </Button>
             </div>
           )}
        </div>
      )}
    </div>
  )
}
