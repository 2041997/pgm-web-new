import { Category, ApiResponse } from '@/types/ecommerce'
import { mockCategories } from '@/data/mockData'

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export const categoryApi = {
  // Get all categories
  getCategories: async (): Promise<ApiResponse<Category[]>> => {
    await delay(200)
    
    return {
      data: mockCategories,
      message: 'Categories retrieved successfully',
      success: true
    }
  },

  // Get category by slug
  getCategory: async (slug: string): Promise<ApiResponse<Category | null>> => {
    await delay(150)
    
    const findCategoryRecursive = (categories: Category[]): Category | null => {
      for (const category of categories) {
        if (category.slug === slug) {
          return category
        }
        if (category.subcategories) {
          const found = findCategoryRecursive(category.subcategories)
          if (found) return found
        }
      }
      return null
    }
    
    const category = findCategoryRecursive(mockCategories)
    
    return {
      data: category,
      message: category ? 'Category retrieved successfully' : 'Category not found',
      success: !!category
    }
  },

  // Get category tree (hierarchical structure)
  getCategoryTree: async (): Promise<ApiResponse<Category[]>> => {
    await delay(200)
    
    return {
      data: mockCategories,
      message: 'Category tree retrieved successfully',
      success: true
    }
  },

  // Get all brands/manufacturers
  getBrands: async (): Promise<ApiResponse<string[]>> => {
    await delay(150)
    
    // Extract unique brands from products (would come from product API in real scenario)
    const brands = ['Apple', 'Samsung', 'Nike', 'AudioTech', 'Dell', 'HP', 'Adidas', 'Sony']
    
    return {
      data: brands,
      message: 'Brands retrieved successfully',
      success: true
    }
  },

  // Get price range for filtering
  getPriceRange: async (): Promise<ApiResponse<{ min: number; max: number }>> => {
    await delay(100)
    
    // Mock price range (would be calculated from actual products)
    const priceRange = {
      min: 10,
      max: 3000
    }
    
    return {
      data: priceRange,
      message: 'Price range retrieved successfully',
      success: true
    }
  }
}
