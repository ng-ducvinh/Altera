import { create } from 'zustand'
import { CartService } from '@/services/cart.api'
import type { Cart } from '@/types/cart.types'

interface CartState {
  cart: Cart | null
  loading: boolean

  // Computed (derived)
  totalItems: () => number

  // Actions
  fetchCart: () => Promise<void>
}

export const useCartStore = create<CartState>((set, get) => ({
  cart: null,
  loading: false,

  totalItems: () => get().cart?.totalItems || 0,

  fetchCart: async () => {
    try {
      set({ loading: true })
      const response = await CartService.getCart()
      set({ cart: response.data.data.cart, loading: false })
    } catch (error) {
      console.error('Failed to fetch cart', error)
      set({ loading: false })
    }
  },
}))
