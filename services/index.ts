// Central API configuration
// Switch between mock and real APIs based on environment

import { productApi as mockProductApi } from './mockProductApi'
import { cartApi as mockCartApi } from './mockCartApi'
import { orderApi as mockOrderApi } from './mockOrderApi'
import { userApi as mockUserApi } from './mockUserApi'
import { categoryApi as mockCategoryApi } from './mockCategoryApi'

// Environment flag to switch between mock and real APIs
const USE_MOCK_API = process.env.NEXT_PUBLIC_USE_MOCK_API !== 'false'

// API base URLs
const MOCK_API_BASE = '/api/mock'
const REAL_API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://your-backend-api.com/api'

// Export the appropriate API services based on environment
export const productApi = USE_MOCK_API ? mockProductApi : {
  // Real API implementations would go here
  // Example:
  // getProducts: (filters) => fetch(`${REAL_API_BASE}/products`, { ... }),
  // getProduct: (id) => fetch(`${REAL_API_BASE}/products/${id}`, { ... }),
  // ... etc
  
  // For now, fallback to mock API
  ...mockProductApi
}

export const cartApi = USE_MOCK_API ? mockCartApi : {
  // Real API implementations would go here
  ...mockCartApi
}

export const orderApi = USE_MOCK_API ? mockOrderApi : {
  // Real API implementations would go here
  ...mockOrderApi
}

export const userApi = USE_MOCK_API ? mockUserApi : {
  // Real API implementations would go here
  ...mockUserApi
}

export const categoryApi = USE_MOCK_API ? mockCategoryApi : {
  // Real API implementations would go here
  ...mockCategoryApi
}

// Export API configuration info
export const apiConfig = {
  isUsingMockApi: USE_MOCK_API,
  baseUrl: USE_MOCK_API ? MOCK_API_BASE : REAL_API_BASE,
  version: '1.0.0'
}

// Generic API error handler
export const handleApiError = (error: any) => {
  console.error('API Error:', error)
  
  if (error.response) {
    // Server responded with error status
    return {
      message: error.response.data?.message || 'Server error occurred',
      status: error.response.status
    }
  } else if (error.request) {
    // Network error
    return {
      message: 'Network error. Please check your connection.',
      status: 0
    }
  } else {
    // Other error
    return {
      message: error.message || 'An unexpected error occurred',
      status: -1
    }
  }
}

// API wrapper for real backend integration
export const createRealApiService = (baseUrl: string) => {
  const request = async <T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> => {
    const url = `${baseUrl}${endpoint}`
    
    const defaultHeaders = {
      'Content-Type': 'application/json',
      // Add authentication headers here when needed
      // 'Authorization': `Bearer ${getAuthToken()}`,
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          ...defaultHeaders,
          ...options.headers,
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      throw handleApiError(error)
    }
  }

  return {
    get: <T>(endpoint: string) => request<T>(endpoint, { method: 'GET' }),
    post: <T>(endpoint: string, data?: any) => 
      request<T>(endpoint, {
        method: 'POST',
        body: data ? JSON.stringify(data) : undefined,
      }),
    put: <T>(endpoint: string, data?: any) => 
      request<T>(endpoint, {
        method: 'PUT',
        body: data ? JSON.stringify(data) : undefined,
      }),
    delete: <T>(endpoint: string) => request<T>(endpoint, { method: 'DELETE' }),
  }
}

// Example of how to implement real API services
/*
export const createRealProductApi = (apiClient: ReturnType<typeof createRealApiService>) => ({
  getProducts: (filters: ProductFilters) => 
    apiClient.get<ApiResponse<Product[]>>(`/products?${new URLSearchParams(filters as any)}`),
  
  getProduct: (id: string) => 
    apiClient.get<ApiResponse<Product>>(`/products/${id}`),
  
  searchProducts: (query: string, filters: ProductFilters) => 
    apiClient.get<ApiResponse<Product[]>>(`/products/search?q=${query}&${new URLSearchParams(filters as any)}`),
  
  // ... other methods
})
*/
