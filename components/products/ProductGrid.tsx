'use client'

import { useState, useEffect } from 'react'
import { Product, ProductFilters } from '@/types/ecommerce'
import { productApi } from '@/services'
import ProductCard from './ProductCard'
import LoadingSpinner from '../ui/LoadingSpinner'

interface ProductGridProps {
  initialProducts?: Product[]
  filters?: ProductFilters
  title?: string
  showFilters?: boolean
}

export default function ProductGrid({ 
  initialProducts, 
  filters = {}, 
  title = "Products",
  showFilters = true 
}: ProductGridProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts || [])
  const [loading, setLoading] = useState(!initialProducts)
  const [currentFilters, setCurrentFilters] = useState<ProductFilters>(filters)
  const [sortBy, setSortBy] = useState<ProductFilters['sortBy']>('popularity')

  useEffect(() => {
    if (!initialProducts) {
      loadProducts()
    }
  }, [currentFilters, sortBy])

  const loadProducts = async () => {
    setLoading(true)
    try {
      const response = await productApi.getProducts({
        ...currentFilters,
        sortBy,
        limit: 12
      })
      
      if (response.success) {
        setProducts(response.data)
      }
    } catch (error) {
      console.error('Error loading products:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSortChange = (newSortBy: ProductFilters['sortBy']) => {
    setSortBy(newSortBy)
  }

  const handleFilterChange = (newFilters: Partial<ProductFilters>) => {
    setCurrentFilters(prev => ({
      ...prev,
      ...newFilters
    }))
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <LoadingSpinner />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
          <p className="text-gray-600">
            Showing {products.length} products
          </p>
        </div>

        {/* Sort Options */}
        <div className="mt-4 md:mt-0">
          <label htmlFor="sort" className="block text-sm font-medium text-gray-700 mb-2">
            Sort by:
          </label>
          <select
            id="sort"
            value={sortBy}
            onChange={(e) => handleSortChange(e.target.value as ProductFilters['sortBy'])}
            className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
          >
            <option value="popularity">Popularity</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="rating">Customer Rating</option>
            <option value="newest">Newest First</option>
          </select>
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="mb-8 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Filters</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {/* Price Range Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price Range
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  placeholder="Min"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => handleFilterChange({
                    priceRange: {
                      min: Number(e.target.value) || 0,
                      max: currentFilters.priceRange?.max || 10000
                    }
                  })}
                />
                <span>-</span>
                <input
                  type="number"
                  placeholder="Max"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => handleFilterChange({
                    priceRange: {
                      min: currentFilters.priceRange?.min || 0,
                      max: Number(e.target.value) || 10000
                    }
                  })}
                />
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => handleFilterChange({
                  categories: e.target.value ? [e.target.value] : undefined
                })}
              >
                <option value="">All Categories</option>
                <option value="smartphones">Smartphones</option>
                <option value="laptops">Laptops</option>
                <option value="shoes">Shoes</option>
                <option value="accessories">Accessories</option>
              </select>
            </div>

            {/* Brand Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Brand
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => handleFilterChange({
                  brands: e.target.value ? [e.target.value] : undefined
                })}
              >
                <option value="">All Brands</option>
                <option value="Apple">Apple</option>
                <option value="Samsung">Samsung</option>
                <option value="Nike">Nike</option>
                <option value="AudioTech">AudioTech</option>
              </select>
            </div>

            {/* In Stock Filter */}
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  onChange={(e) => handleFilterChange({
                    inStock: e.target.checked ? true : undefined
                  })}
                />
                <span className="ml-2 text-sm text-gray-700">In Stock Only</span>
              </label>
            </div>
          </div>
        </div>
      )}

      {/* Products Grid */}
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product}
              onAddToCart={() => {
                // Optionally refresh cart count or show notification
                console.log('Product added to cart:', product.title)
              }}
              onToggleWishlist={() => {
                // Handle wishlist toggle
                console.log('Wishlist toggled for:', product.title)
              }}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m13-8V4a1 1 0 00-1-1H7a1 1 0 00-1 1v1M4 13v-2a1 1 0 011-1h.01M20 13v-2a1 1 0 00-1-1h-.01" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
          <p className="text-gray-500 mb-4">
            Try adjusting your filters or search terms to find what you're looking for.
          </p>
          <button
            onClick={() => {
              setCurrentFilters({})
              setSortBy('popularity')
            }}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-600 bg-blue-100 hover:bg-blue-200 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Load More Button */}
      {products.length > 0 && products.length >= 12 && (
        <div className="text-center mt-8">
          <button
            onClick={() => {
              // Load more products
              console.log('Load more products')
            }}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            Load More Products
          </button>
        </div>
      )}
    </div>
  )
}
