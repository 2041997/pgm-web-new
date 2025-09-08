export interface Product {
  id: string
  title: string
  description: string
  category: string
  price: number
  originalPrice?: number
  images: string[]
  rating: number
  reviewCount: number
  inStock: boolean
  stockCount: number
  tags: string[]
  brand: string
  sku: string
  weight?: number
  dimensions?: {
    length: number
    width: number
    height: number
  }
  variants?: ProductVariant[]
  createdAt: string
  updatedAt: string
}

export interface ProductVariant {
  id: string
  name: string
  values: string[]
  type: 'color' | 'size' | 'material' | 'style'
}

export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  image?: string
  parentId?: string
  subcategories?: Category[]
}

export interface CartItem {
  productId: string
  variantId?: string
  quantity: number
  price: number
  title: string
  image: string
  selectedVariants?: { [key: string]: string }
}

export interface Order {
  id: string
  userId: string
  items: CartItem[]
  subtotal: number
  tax: number
  shipping: number
  discount: number
  total: number
  status: OrderStatus
  shippingAddress: Address
  billingAddress: Address
  paymentMethod: string
  createdAt: string
  updatedAt: string
  estimatedDelivery?: string
  trackingNumber?: string
}

export type OrderStatus = 
  | 'pending' 
  | 'confirmed' 
  | 'processing' 
  | 'shipped' 
  | 'out_for_delivery' 
  | 'delivered' 
  | 'cancelled' 
  | 'returned' 
  | 'refunded'

export interface Address {
  id: string
  userId: string
  type: 'home' | 'office' | 'other'
  fullName: string
  phone: string
  addressLine1: string
  addressLine2?: string
  city: string
  state: string
  postalCode: string
  country: string
  isDefault: boolean
}

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  phone?: string
  avatar?: string
  addresses: Address[]
  preferences: UserPreferences
  createdAt: string
  updatedAt: string
}

export interface UserPreferences {
  currency: string
  language: string
  newsletter: boolean
  notifications: {
    email: boolean
    sms: boolean
    push: boolean
  }
}

export interface Review {
  id: string
  productId: string
  userId: string
  userName: string
  rating: number
  title: string
  comment: string
  helpful: number
  verified: boolean
  createdAt: string
}

export interface ProductFilters {
  categories?: string[]
  priceRange?: { min: number; max: number }
  rating?: number
  brands?: string[]
  tags?: string[]
  inStock?: boolean
  sortBy?: 'price_asc' | 'price_desc' | 'rating' | 'newest' | 'popularity'
  page?: number
  limit?: number
}

export interface ApiResponse<T> {
  data: T
  message: string
  success: boolean
  total?: number
  page?: number
  limit?: number
}
