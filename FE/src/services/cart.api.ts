import api from '@/utils/axios'
import type { ApiResponse } from '@/types/api.types'
import type {
  CartResponse,
  AddCartPayload,
  UpdateCartPayload,
} from '@/types/cart.types'

export const CartService = {
  getCart: () =>
    api.get<ApiResponse<CartResponse>>('/cart'),

  addToCart: (payload: AddCartPayload) =>
    api.post<ApiResponse<CartResponse>>('/cart', payload),

  updateQuantity: (
    productId: string,
    payload: UpdateCartPayload
  ) =>
    api.put<ApiResponse<CartResponse>>(
      `/cart/${productId}`,
      payload
    ),

  removeItem: (productId: string) =>
    api.delete<ApiResponse<CartResponse>>(
      `/cart/${productId}`
    ),

  clearCart: () =>
    api.delete<ApiResponse<CartResponse>>('/cart'),
}
