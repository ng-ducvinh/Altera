import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { CartItem } from '@/types/order.types'
import type { ProductSize } from '@/types/product.types'

interface CartState {
  items: CartItem[]

  // Computed (derived)
  totalItems: () => number
  totalPrice: () => number

  // Actions
  addItem: (item: CartItem) => void
  removeItem: (productId: string, size: ProductSize, color: string) => void
  updateQuantity: (productId: string, size: ProductSize, color: string, quantity: number) => void
  clearCart: () => void
}

const isSameItem = (
  a: CartItem,
  b: Pick<CartItem, 'productId' | 'size' | 'color'>,
) => a.productId === b.productId && a.size === b.size && a.color === b.color

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      totalItems: () => get().items.reduce((sum, item) => sum + item.quantity, 0),

      totalPrice: () =>
        get().items.reduce((sum, item) => sum + item.price * item.quantity, 0),

      addItem: (newItem) => {
        set((state) => {
          const existing = state.items.find((i) => isSameItem(i, newItem))
          if (existing) {
            return {
              items: state.items.map((i) =>
                isSameItem(i, newItem)
                  ? { ...i, quantity: i.quantity + newItem.quantity }
                  : i,
              ),
            }
          }
          return { items: [...state.items, newItem] }
        })
      },

      removeItem: (productId, size, color) => {
        set((state) => ({
          items: state.items.filter(
            (i) => !isSameItem(i, { productId, size, color }),
          ),
        }))
      },

      updateQuantity: (productId, size, color, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId, size, color)
          return
        }
        set((state) => ({
          items: state.items.map((i) =>
            isSameItem(i, { productId, size, color }) ? { ...i, quantity } : i,
          ),
        }))
      },

      clearCart: () => set({ items: [] }),
    }),
    {
      name: 'altera-cart',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)
