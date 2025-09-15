"use client"

import React, { useState, useEffect } from 'react'
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
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
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
      console.log("first", response)
      
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

  // Local helper: compute displayedProducts when initialProducts supplied (client-side filter)
  const displayedProducts = React.useMemo(() => {
    if (!initialProducts) return products
    if (selectedCategory === 'All') return initialProducts
    return initialProducts.filter((p: Product) => String(p.category || '').toLowerCase() === selectedCategory.toLowerCase())
  }, [initialProducts, products, selectedCategory])

  // Inline CategoryNav component to avoid extra files
  const staticCategories: string[] = [
    'All',
    'Milks & Dairies',
    'Coffes & Teas',
    'Pet Foods',
    'Meats',
    'Vegetables',
    'Fruits'
  ]

  const CategoryNav = ({ products, onSelectCategory, selected }: { products?: Product[]; onSelectCategory: (cat: string) => void; selected: string }) => {
    // Use the static list from design, fall back to detected categories only if needed
    const cats = staticCategories

    return (
      <nav className="flex items-center overflow-hidden overflow-auto gap-6 text-md text-slate-700">
        {cats.map((c: string) => (
          <button
            key={c}
            onClick={() => onSelectCategory(c)}
            className={`transition-colors ${selected === c ? 'text-emerald-600' : 'hover:text-emerald-600'}`}>
            {c}
          </button>
        ))}
      </nav>
    )
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

      {/* Header: title left, category nav right */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-800">Popular Products</h2>

        {/* Category nav */}
        {showFilters && (
          <div className="mt-4 md:mt-0">
            <CategoryNav
              products={initialProducts || products}
              onSelectCategory={(cat) => {
                // If we have server-backed loading, set filters to request server data
                if (!initialProducts) {
                  handleFilterChange({ ...( { category: cat === 'All' ? undefined : cat } as any ) })
                }
                // For client-side lists, we'll manage selection inside the component (see displayedProducts)
                setSelectedCategory(cat)
              }}
              selected={selectedCategory}
            />
          </div>
        )}
      </div>

      {/* Products Grid */}
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
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
