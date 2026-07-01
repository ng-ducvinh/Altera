import api from '@/utils/axios'
import type { ApiResponse } from '@/types/api.types'
import type {
  Order,
  OrdersResponse,
  CreateOrderPayload,
} from '@/types/order.types'

export const OrderService = {
  getMyOrders: (page = 1, limit = 10) =>
    api.get<ApiResponse<OrdersResponse>>('/orders/my-orders', {
      params: { page, limit },
    }),

  getOrder: (id: string) =>
    api.get<ApiResponse<{ order: Order }>>(`/orders/${id}`),

  createOrder: (payload: CreateOrderPayload) =>
    api.post<ApiResponse<Order>>('/orders', payload),
}
