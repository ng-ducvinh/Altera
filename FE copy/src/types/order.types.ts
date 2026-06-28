/**
 * ALTERA — Order Types
 */
import type { OrderStatus, Address } from './common.types'
import type { Product, ProductSize } from './product.types'

export interface OrderItem {
  product: Product | string
  name: string
  image: string
  price: number
  size: ProductSize
  color: string
  quantity: number
  subtotal: number
}

export interface Order {
  _id: string
  userId: string
  orderNumber: string
  items: OrderItem[]
  subtotal: number
  shippingFee: number
  discount: number
  total: number
  status: OrderStatus
  shippingAddress: Address
  paymentMethod: 'COD' | 'BANK_TRANSFER' | 'CARD'
  paymentStatus: 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED'
  notes?: string
  createdAt: string
  updatedAt: string
}

// ── Cart (local state — no BE persistence needed pre-checkout) ─────────────

export interface CartItem {
  productId: string
  name: string
  image: string
  price: number
  size: ProductSize
  color: string
  quantity: number
}

// ── Checkout ───────────────────────────────────────────────────────────────

export interface CreateOrderPayload {
  items: CartItem[]
  shippingAddress: Address
  paymentMethod: Order['paymentMethod']
  notes?: string
}
