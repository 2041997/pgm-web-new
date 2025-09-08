'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { StarIcon, HeartIcon, ShoppingCartIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid'
import { Product } from '@/types/ecommerce'
import { cartApi } from '@/services'

interface ProductCardProps {
  product: Product
  onAddToCart?: (product: Product) => void
  onToggleWishlist?: (product: Product) => void
}

export default function ProductCard({ 
  product, 
  onAddToCart, 
  onToggleWishlist 
}: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (!product.inStock) return

    setIsLoading(true)
    try {
      const cartItem = {
        productId: product.id,
        price: product.price,
        title: product.title,
        image: product.images[0] || '/placeholder-image.jpg'
      }

      await cartApi.addToCart(cartItem)
      
      if (onAddToCart) {
        onAddToCart(product)
      }
      
      // Show success feedback
      alert('Product added to cart!')
    } catch (error) {
      console.error('Error adding to cart:', error)
      alert('Failed to add product to cart')
    } finally {
      setIsLoading(false)
    }
  }

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    setIsWishlisted(!isWishlisted)
    if (onToggleWishlist) {
      onToggleWishlist(product)
    }
  }

  const discountPercentage = product.originalPrice 
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0

  const renderStars = (rating: number) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <StarIcon key={i} className="h-4 w-4 text-yellow-400 fill-current" />
      )
    }

    if (hasHalfStar) {
      stars.push(
        <StarIcon key="half" className="h-4 w-4 text-yellow-400 fill-current opacity-50" />
      )
    }

    const emptyStars = 5 - Math.ceil(rating)
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <StarIcon key={`empty-${i}`} className="h-4 w-4 text-gray-300" />
      )
    }

    return stars
  }

  return (
    <Link href={`/products/${product.id}`}>
      <div className="group bg-white overflow-hidden hover:shadow-xl transition-all duration-500">
        {/* Product Image */}
        <div className="relative aspect-[3/4] overflow-hidden bg-gray-50">
          <Image
            src={product.images[0] || '/placeholder-image.jpg'}
            alt={product.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          
          {/* Discount Badge */}
          {discountPercentage > 0 && (
            <div className="absolute top-4 left-4 bg-black text-white text-xs font-medium px-3 py-1 uppercase tracking-wide">
              -{discountPercentage}%
            </div>
          )}

          {/* Stock Status */}
          {!product.inStock && (
            <div className="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center">
              <span className="text-gray-900 font-medium uppercase tracking-wide">Out of Stock</span>
            </div>
          )}

          {/* Hover Actions */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300">
            <div className="absolute top-4 right-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
              {/* Wishlist Button */}
              <button
                onClick={handleToggleWishlist}
                className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110"
              >
                {isWishlisted ? (
                  <HeartSolidIcon className="h-5 w-5 text-red-500" />
                ) : (
                  <HeartIcon className="h-5 w-5 text-gray-700 hover:text-red-500" />
                )}
              </button>

              {/* Quick View Button */}
              <button className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110">
                <svg className="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </button>
            </div>

            {/* Quick Add to Cart - bottom overlay */}
            <div className="absolute bottom-0 left-0 right-0 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock || isLoading}
                className={`w-full py-4 px-6 text-white font-medium uppercase tracking-wide transition-colors ${
                  product.inStock && !isLoading
                    ? 'bg-black hover:bg-gray-800'
                    : 'bg-gray-400 cursor-not-allowed'
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Adding...
                  </div>
                ) : product.inStock ? (
                  'ADD TO CART'
                ) : (
                  'OUT OF STOCK'
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-6 text-center">
          {/* Brand */}
          {product.brand && (
            <p className="text-xs text-gray-500 uppercase tracking-widest mb-2 font-medium">
              {product.brand}
            </p>
          )}

          {/* Title */}
          <h3 className="text-base font-light text-gray-900 mb-3 leading-tight group-hover:text-gray-600 transition-colors">
            {product.title}
          </h3>

          {/* Rating */}
          <div className="flex items-center justify-center mb-3">
            <div className="flex mr-2">
              {renderStars(product.rating)}
            </div>
            <span className="text-xs text-gray-400">
              ({product.reviewCount})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center justify-center space-x-3 mb-2">
            <span className="text-lg font-light text-gray-900">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-400 line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>
          
          {/* Stock indicator */}
          <div className="text-xs">
            {product.inStock ? (
              <span className="text-gray-500">
                {product.stockCount > 0 && product.stockCount <= 10 
                  ? `Only ${product.stockCount} left`
                  : 'In Stock'
                }
              </span>
            ) : (
              <span className="text-red-500 uppercase tracking-wide">Out of Stock</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
