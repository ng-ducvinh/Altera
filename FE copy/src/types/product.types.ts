/**
 * ALTERA — Product Types
 */
import type { CloudinaryImage, QueryParams } from './common.types'

export type ProductCategory =
  | 'T-SHIRT'
  | 'SHIRT'
  | 'PANTS'
  | 'DRESS'
  | 'JACKET'
  | 'SHOES'
  | 'ACCESSORIES'
  | 'BAG'

export type ProductSize = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL'

export type ProductGender = 'MEN' | 'WOMEN' | 'UNISEX'

export interface ProductVariant {
  size: ProductSize
  color: string
  stock: number
  sku?: string
}

export interface Product {
  _id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  category: ProductCategory
  gender: ProductGender
  images: CloudinaryImage[]
  variants: ProductVariant[]
  tags: string[]
  isActive: boolean
  isFeatured: boolean
  rating?: number
  reviewCount?: number
  createdAt: string
  updatedAt: string
}

export interface ProductReview {
  _id: string
  userId: string
  userName: string
  rating: number
  comment: string
  createdAt: string
}

// ── Filters ────────────────────────────────────────────────────────────────

export interface ProductFilters extends QueryParams {
  category?: ProductCategory
  gender?: ProductGender
  minPrice?: number
  maxPrice?: number
  size?: ProductSize
  tags?: string[]
  search?: string
  featured?: boolean
}
