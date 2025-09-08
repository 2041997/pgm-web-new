import { Product, ProductFilters, ApiResponse, Review } from '@/types/ecommerce'
import { mockProducts, mockReviews } from '@/data/mockData'

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export const productApi = {
  // Get all products with filtering and pagination
  getProducts: async (filters: ProductFilters = {}): Promise<ApiResponse<Product[]>> => {
    await delay(300) // Simulate network delay
    
    let filteredProducts = [...mockProducts]

    // Apply filters
    if (filters.categories?.length) {
      filteredProducts = filteredProducts.filter(product => 
        filters.categories!.includes(product.category)
      )
    }

    if (filters.priceRange) {
      filteredProducts = filteredProducts.filter(product => 
        product.price >= filters.priceRange!.min && 
        product.price <= filters.priceRange!.max
      )
    }

    if (filters.rating) {
      filteredProducts = filteredProducts.filter(product => 
        product.rating >= filters.rating!
      )
    }

    if (filters.brands?.length) {
      filteredProducts = filteredProducts.filter(product => 
        filters.brands!.includes(product.brand)
      )
    }

    if (filters.inStock) {
      filteredProducts = filteredProducts.filter(product => product.inStock)
    }

    if (filters.tags?.length) {
      filteredProducts = filteredProducts.filter(product => 
        filters.tags!.some(tag => product.tags.includes(tag))
      )
    }

    // Apply sorting
    switch (filters.sortBy) {
      case 'price_asc':
        filteredProducts.sort((a, b) => a.price - b.price)
        break
      case 'price_desc':
        filteredProducts.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        filteredProducts.sort((a, b) => b.rating - a.rating)
        break
      case 'newest':
        filteredProducts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        break
      case 'popularity':
        filteredProducts.sort((a, b) => b.reviewCount - a.reviewCount)
        break
    }

    // Apply pagination
    const page = filters.page || 1
    const limit = filters.limit || 12
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex)

    return {
      data: paginatedProducts,
      message: 'Products retrieved successfully',
      success: true,
      total: filteredProducts.length,
      page,
      limit
    }
  },

  // Get single product by ID
  getProduct: async (id: string): Promise<ApiResponse<Product | null>> => {
    await delay(200)
    
    const product = mockProducts.find(p => p.id === id)
    
    return {
      data: product || null,
      message: product ? 'Product retrieved successfully' : 'Product not found',
      success: !!product
    }
  },

  // Search products
  searchProducts: async (query: string, filters: ProductFilters = {}): Promise<ApiResponse<Product[]>> => {
    await delay(250)
    
    const searchResults = mockProducts.filter(product => 
      product.title.toLowerCase().includes(query.toLowerCase()) ||
      product.description.toLowerCase().includes(query.toLowerCase()) ||
      product.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase())) ||
      product.brand.toLowerCase().includes(query.toLowerCase())
    )

    // Apply additional filters to search results
    const filtersWithResults = { ...filters }
    const filteredResults = await productApi.getProducts(filtersWithResults)
    
    const finalResults = searchResults.filter(searchProduct => 
      filteredResults.data.some(filteredProduct => filteredProduct.id === searchProduct.id)
    )

    return {
      data: finalResults,
      message: `Found ${finalResults.length} products for "${query}"`,
      success: true,
      total: finalResults.length
    }
  },

  // Get featured products
  getFeaturedProducts: async (limit: number = 8): Promise<ApiResponse<Product[]>> => {
    await delay(200)
    
    const featuredProducts = mockProducts
      .filter(product => product.rating >= 4.5)
      .sort((a, b) => b.rating - a.rating)
      .slice(0, limit)

    return {
      data: featuredProducts,
      message: 'Featured products retrieved successfully',
      success: true
    }
  },

  // Get related products
  getRelatedProducts: async (productId: string, limit: number = 4): Promise<ApiResponse<Product[]>> => {
    await delay(200)
    
    const currentProduct = mockProducts.find(p => p.id === productId)
    if (!currentProduct) {
      return {
        data: [],
        message: 'Product not found',
        success: false
      }
    }

    const relatedProducts = mockProducts
      .filter(product => 
        product.id !== productId && 
        (product.category === currentProduct.category || 
         product.brand === currentProduct.brand)
      )
      .slice(0, limit)

    return {
      data: relatedProducts,
      message: 'Related products retrieved successfully',
      success: true
    }
  },

  // Get product reviews
  getProductReviews: async (productId: string): Promise<ApiResponse<Review[]>> => {
    await delay(250)
    
    const productReviews = mockReviews.filter(review => review.productId === productId)
    
    // Sort reviews by creation date (newest first)
    const sortedReviews = productReviews.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )

    return {
      data: sortedReviews,
      message: 'Product reviews retrieved successfully',
      success: true
    }
  }
}
