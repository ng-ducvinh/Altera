/**
 * ALTERA — Product API Service
 * Never call axios directly in pages/components.
 */
import api from '@/utils/axios'
import type { ApiResponse, PaginatedResponse } from '@/types/api.types'
import type { Product, ProductFilters } from '@/types/product.types'

export const ProductService = {
  /**
   * Get list of products with optional filters.
   */
  getProducts: (filters?: ProductFilters) =>
    api.get<PaginatedResponse<Product>>('/products', { params: filters }),

  /**
   * Get a single product details by ID.
   */
  getProduct: (id: string) =>
    api.get<ApiResponse<Product>>(`/products/${id}`),
}
