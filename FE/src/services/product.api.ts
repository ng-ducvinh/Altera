import api from '@/utils/axios'
import type { ApiResponse, ProductsResponse } from '@/types/api.types'
import type { Product, ProductFilters } from '@/types/product.types'

export const ProductService = {
  getProducts: (filters?: ProductFilters) =>
    api.get<ApiResponse<ProductsResponse>>('/products', { params: filters }),

  getProduct: (id: string) =>
    api.get<ApiResponse<{ product: Product }>>(`/products/${id}`),
}
