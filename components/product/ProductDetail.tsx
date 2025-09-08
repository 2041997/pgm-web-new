'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { 
  StarIcon, 
  HeartIcon, 
  ShoppingCartIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CheckIcon,
  TruckIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolidIcon, StarIcon as StarSolidIcon } from '@heroicons/react/24/solid'
import { Product, Review } from '@/types/ecommerce'
import { productApi, cartApi } from '@/services'
import LoadingSpinner from '@/components/ui/LoadingSpinner'

export default function ProductDetail() {
  const params = useParams()
  const router = useRouter()
  const productId = params?.id as string

  const [product, setProduct] = useState<Product | null>(null)
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [addingToCart, setAddingToCart] = useState(false)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [selectedVariants, setSelectedVariants] = useState<{ [key: string]: string }>({})
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [showFullDescription, setShowFullDescription] = useState(false)

  useEffect(() => {
    if (productId) {
      loadProductDetails()
    }
  }, [productId])

  const loadProductDetails = async () => {
    try {
      setLoading(true)
      const [productResponse, reviewsResponse] = await Promise.all([
        productApi.getProduct(productId),
        productApi.getProductReviews(productId)
      ])

      if (productResponse.success && productResponse.data) {
        setProduct(productResponse.data)
        // Initialize default variant selections
        if (productResponse.data.variants) {
          const defaultVariants: { [key: string]: string } = {}
          productResponse.data.variants.forEach((variant) => {
            if (variant.values.length > 0) {
              defaultVariants[variant.id] = variant.values[0]
            }
          })
          setSelectedVariants(defaultVariants)
        }
      }

      if (reviewsResponse.success) {
        setReviews(reviewsResponse.data)
      }
    } catch (error) {
      console.error('Error loading product details:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCart = async () => {
    if (!product) return

    setAddingToCart(true)
    try {
      const cartItem = {
        productId: product.id,
        title: product.title,
        price: getCurrentPrice(),
        image: product.images[0],
        selectedVariants: Object.keys(selectedVariants).length > 0 ? selectedVariants : undefined,
        quantity: quantity
      }
      
      const response = await cartApi.addToCart(cartItem)

      if (response.success) {
        // Show success notification (you can implement toast here)
        alert('Product added to cart!')
      }
    } catch (error) {
      console.error('Error adding to cart:', error)
      alert('Failed to add to cart')
    } finally {
      setAddingToCart(false)
    }
  }

  const getCurrentPrice = () => {
    if (!product) return 0
    
    // In a real app, you might calculate price based on selected variants
    return product.price
  }

  const getDiscountedPrice = () => {
    if (!product || !product.originalPrice) return null
    
    return product.originalPrice
  }

  const isInStock = () => {
    return product && product.inStock && product.stockCount > 0
  }

  const canAddToCart = () => {
    return isInStock() && quantity <= (product?.stockCount || 0)
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <LoadingSpinner text="Loading product details..." />
      </div>
    )
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Product not found</h2>
          <Link
            href="/products"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            <ChevronLeftIcon className="h-5 w-5 mr-2" />
            Back to Products
          </Link>
        </div>
      </div>
    )
  }

  const discountedPrice = getDiscountedPrice()

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-8">
        <Link href="/" className="hover:text-gray-700">Home</Link>
        <ChevronRightIcon className="h-4 w-4" />
        <Link href="/products" className="hover:text-gray-700">Products</Link>
        <ChevronRightIcon className="h-4 w-4" />
        <span className="text-gray-900">{product.title}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
            <Image
              src={product.images[selectedImageIndex] || product.images[0]}
              alt={product.title}
              width={600}
              height={600}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Thumbnail Images */}
          {product.images.length > 1 && (
            <div className="flex space-x-2 overflow-x-auto">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 ${
                    selectedImageIndex === index ? 'border-blue-500' : 'border-gray-200'
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${product.title} ${index + 1}`}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          {/* Title and Rating */}
          <div>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.title}</h1>
                <p className="text-lg text-gray-600 mb-4">{product.brand}</p>
              </div>
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className="ml-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                {isWishlisted ? (
                  <HeartSolidIcon className="h-6 w-6 text-red-500" />
                ) : (
                  <HeartIcon className="h-6 w-6 text-gray-400" />
                )}
              </button>
            </div>

            {/* Rating */}
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <StarSolidIcon
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">
                {product.rating} ({reviews.length} reviews)
              </span>
            </div>
          </div>

          {/* Price */}
          <div className="space-y-2">
            <div className="flex items-center space-x-3">
              {discountedPrice ? (
                <>
                  <span className="text-3xl font-bold text-red-600">
                    ${product.price.toFixed(2)}
                  </span>
                  <span className="text-xl text-gray-500 line-through">
                    ${discountedPrice.toFixed(2)}
                  </span>
                  <span className="bg-red-100 text-red-800 text-sm font-medium px-2 py-1 rounded">
                    SALE
                  </span>
                </>
              ) : (
                <span className="text-3xl font-bold text-gray-900">
                  ${product.price.toFixed(2)}
                </span>
              )}
            </div>

            {/* Stock Status */}
            <div className="flex items-center space-x-2">
              {isInStock() ? (
                <>
                  <CheckIcon className="h-5 w-5 text-green-500" />
                  <span className="text-green-600 font-medium">
                    In stock ({product.stockCount} available)
                  </span>
                </>
              ) : (
                <span className="text-red-600 font-medium">Out of stock</span>
              )}
            </div>
          </div>

          {/* Variants */}
          {product.variants && product.variants.length > 0 && (
            <div className="space-y-4">
              {product.variants.map((variant) => (
                <div key={variant.id}>
                  <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
                    {variant.name}
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {variant.values.map((option) => (
                      <button
                        key={option}
                        onClick={() => setSelectedVariants(prev => ({ ...prev, [variant.id]: option }))}
                        className={`px-4 py-2 border rounded-md text-sm font-medium transition-colors ${
                          selectedVariants[variant.id] === option
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-gray-300 text-gray-700 hover:border-gray-400'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Quantity */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Quantity
            </label>
            <div className="flex items-center space-x-3">
              <div className="flex items-center border border-gray-300 rounded-md">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                  className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeftIcon className="h-4 w-4" />
                </button>
                <span className="px-4 py-2 text-gray-900 font-medium border-x border-gray-300">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(Math.min(product.stockCount, quantity + 1))}
                  disabled={quantity >= product.stockCount}
                  className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRightIcon className="h-4 w-4" />
                </button>
              </div>
              <span className="text-sm text-gray-500">
                Max: {product.stockCount}
              </span>
            </div>
          </div>

          {/* Add to Cart */}
          <div className="space-y-3">
            <button
              onClick={handleAddToCart}
              disabled={!canAddToCart() || addingToCart}
              className="w-full bg-blue-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {addingToCart ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Adding to Cart...
                </>
              ) : (
                <>
                  <ShoppingCartIcon className="h-5 w-5 mr-2" />
                  Add to Cart
                </>
              )}
            </button>

            <button
              onClick={() => {
                handleAddToCart()
                // In real app, navigate to checkout
                router.push('/checkout')
              }}
              disabled={!canAddToCart()}
              className="w-full bg-gray-900 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Buy Now
            </button>
          </div>

          {/* Shipping & Returns */}
          <div className="border-t border-gray-200 pt-6 space-y-4">
            <div className="flex items-start space-x-3">
              <TruckIcon className="h-6 w-6 text-gray-400 mt-1" />
              <div>
                <h4 className="font-medium text-gray-900">Free Shipping</h4>
                <p className="text-sm text-gray-600">
                  Free shipping on orders over $100. Delivery in 3-5 business days.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <ShieldCheckIcon className="h-6 w-6 text-gray-400 mt-1" />
              <div>
                <h4 className="font-medium text-gray-900">30-Day Returns</h4>
                <p className="text-sm text-gray-600">
                  Easy returns within 30 days of purchase.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Description & Reviews */}
      <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Description */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Description</h3>
            <div className={`text-gray-700 ${showFullDescription ? '' : 'line-clamp-4'}`}>
              {product.description}
            </div>
            {product.description.length > 200 && (
              <button
                onClick={() => setShowFullDescription(!showFullDescription)}
                className="mt-2 text-blue-600 hover:text-blue-800 font-medium text-sm"
              >
                {showFullDescription ? 'Show Less' : 'Read More'}
              </button>
            )}
          </div>
        </div>

        {/* Reviews Summary */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Customer Reviews</h3>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <StarSolidIcon
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-lg font-medium text-gray-900">{product.rating}</span>
              <span className="text-sm text-gray-600">out of 5</span>
            </div>

            <p className="text-sm text-gray-600">
              Based on {reviews.length} reviews
            </p>

            {/* Rating Breakdown */}
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((rating) => {
                const count = reviews.filter(r => Math.floor(r.rating) === rating).length
                const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0

                return (
                  <div key={rating} className="flex items-center space-x-2 text-sm">
                    <span className="w-3 text-gray-600">{rating}</span>
                    <StarSolidIcon className="h-4 w-4 text-yellow-400" />
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-yellow-400 h-2 rounded-full"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="w-8 text-gray-600">{count}</span>
                  </div>
                )
              })}
            </div>

            {/* Recent Reviews */}
            {reviews.slice(0, 3).map((review) => (
              <div key={review.id} className="border-t border-gray-200 pt-4">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <StarSolidIcon
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(review.rating) ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium text-gray-900">{review.userName}</span>
                </div>
                <p className="text-sm text-gray-700 line-clamp-2">{review.comment}</p>
              </div>
            ))}

            {reviews.length > 3 && (
              <button className="w-full mt-4 text-blue-600 hover:text-blue-800 font-medium text-sm">
                View All Reviews
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
