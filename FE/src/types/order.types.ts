export interface OrderItem {
  productId: string
  quantity: number
}

export interface ShippingAddress {
  street: string
  city: string
  country: string
}

export interface CreateOrderPayload {
  items: OrderItem[]
  shippingAddress: ShippingAddress
}

export interface Order {
  _id: string
  // Cho phép backend mở rộng sau này
  [key: string]: any
}

export interface OrdersResponse {
  orders: Order[]
  pagination: {
    total: number
    page: number
    limit: number
    totalPages: number
  }
}
