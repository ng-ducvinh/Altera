export interface CartItemProduct {
  _id: string
  id: string
  name: string
  imageUrl: string
  price: number
  stock: number
}

export interface CartItem {
  productId: CartItemProduct
  quantity: number
  price: number
}

export interface Cart {
  items: CartItem[]
  totalPrice: number
  totalItems: number
}

export interface CartResponse {
  cart: Cart
}

export interface AddCartPayload {
  productId: string
  quantity: number
}

export interface UpdateCartPayload {
  quantity: number
}
