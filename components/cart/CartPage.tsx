'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { TrashIcon, MinusIcon, PlusIcon } from '@heroicons/react/24/outline'
import { CartItem } from '@/types/ecommerce'
import { cartApi } from '@/services'
import LoadingSpinner from '@/components/ui/LoadingSpinner'

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [cartSummary, setCartSummary] = useState({
    itemCount: 0,
    subtotal: 0,
    tax: 0,
    shipping: 0,
    total: 0
  })
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState<string | null>(null)

  useEffect(() => {
    loadCart()
  }, [])

  const loadCart = async () => {
    try {
      setLoading(true)
      const [cartResponse, summaryResponse] = await Promise.all([
        cartApi.getCart(),
        cartApi.getCartSummary()
      ])

      if (cartResponse.success) {
        setCartItems(cartResponse.data)
      }

      if (summaryResponse.success) {
        setCartSummary(summaryResponse.data)
      }
    } catch (error) {
      console.error('Error loading cart:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateQuantity = async (productId: string, newQuantity: number, selectedVariants?: { [key: string]: string }) => {
    if (newQuantity < 1) return

    setUpdating(productId)
    try {
      const response = await cartApi.updateCartItem(productId, newQuantity, selectedVariants)
      if (response.success) {
        setCartItems(response.data)
        // Reload summary
        const summaryResponse = await cartApi.getCartSummary()
        if (summaryResponse.success) {
          setCartSummary(summaryResponse.data)
        }
      }
    } catch (error) {
      console.error('Error updating quantity:', error)
    } finally {
      setUpdating(null)
    }
  }

  const removeItem = async (productId: string, selectedVariants?: { [key: string]: string }) => {
    setUpdating(productId)
    try {
      const response = await cartApi.removeFromCart(productId, selectedVariants)
      if (response.success) {
        setCartItems(response.data)
        // Reload summary
        const summaryResponse = await cartApi.getCartSummary()
        if (summaryResponse.success) {
          setCartSummary(summaryResponse.data)
        }
      }
    } catch (error) {
      console.error('Error removing item:', error)
    } finally {
      setUpdating(null)
    }
  }

  const clearCart = async () => {
    if (!confirm('Are you sure you want to clear your cart?')) return

    try {
      const response = await cartApi.clearCart()
      if (response.success) {
        setCartItems([])
        setCartSummary({
          itemCount: 0,
          subtotal: 0,
          tax: 0,
          shipping: 0,
          total: 0
        })
      }
    } catch (error) {
      console.error('Error clearing cart:', error)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <LoadingSpinner text="Loading your cart..." />
      </div>
    )
  }

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <div className="text-gray-400 mb-6">
            <svg className="mx-auto h-24 w-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4m2.6 8L6 6H3m4 7v6a1 1 0 001 1h6a1 1 0 001-1v-6M9 19h6" />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-8">
            Looks like you haven't added any items to your cart yet.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
        <button
          onClick={clearCart}
          className="text-red-600 hover:text-red-800 text-sm font-medium transition-colors"
        >
          Clear Cart
        </button>
      </div>

      <div className="lg:grid lg:grid-cols-12 lg:gap-x-12">
        {/* Cart Items */}
        <div className="lg:col-span-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">
                Cart Items ({cartSummary.itemCount} items)
              </h2>
            </div>

            <div className="divide-y divide-gray-200">
              {cartItems.map((item) => (
                <div key={`${item.productId}-${JSON.stringify(item.selectedVariants)}`} className="p-6">
                  <div className="flex items-start">
                    {/* Product Image */}
                    <div className="flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.title}
                        width={80}
                        height={80}
                        className="rounded-md object-cover"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="ml-6 flex-1">
                      <div className="flex justify-between">
                        <div className="flex-1">
                          <h3 className="text-base font-medium text-gray-900">
                            <Link href={`/products/${item.productId}`} className="hover:text-blue-600">
                              {item.title}
                            </Link>
                          </h3>
                          
                          {item.selectedVariants && (
                            <div className="mt-1 text-sm text-gray-500">
                              {Object.entries(item.selectedVariants).map(([key, value]) => (
                                <span key={key} className="mr-3">
                                  {key}: {value}
                                </span>
                              ))}
                            </div>
                          )}
                          
                          <p className="mt-2 text-lg font-semibold text-gray-900">
                            ${item.price}
                          </p>
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() => removeItem(item.productId, item.selectedVariants)}
                          disabled={updating === item.productId}
                          className="ml-4 text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </div>

                      {/* Quantity Controls */}
                      <div className="mt-4 flex items-center">
                        <div className="flex items-center border border-gray-300 rounded-md">
                          <button
                            onClick={() => updateQuantity(item.productId, item.quantity - 1, item.selectedVariants)}
                            disabled={updating === item.productId || item.quantity <= 1}
                            className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <MinusIcon className="h-4 w-4" />
                          </button>
                          
                          <span className="px-4 py-2 text-gray-900 font-medium border-x border-gray-300">
                            {updating === item.productId ? (
                              <div className="w-6 h-4 flex items-center justify-center">
                                <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-gray-600"></div>
                              </div>
                            ) : (
                              item.quantity
                            )}
                          </span>
                          
                          <button
                            onClick={() => updateQuantity(item.productId, item.quantity + 1, item.selectedVariants)}
                            disabled={updating === item.productId}
                            className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <PlusIcon className="h-4 w-4" />
                          </button>
                        </div>
                        
                        <div className="ml-auto text-base font-semibold text-gray-900">
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-4 mt-8 lg:mt-0">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-6">Order Summary</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between text-base text-gray-900">
                <span>Subtotal</span>
                <span>${cartSummary.subtotal.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between text-base text-gray-900">
                <span>Shipping</span>
                <span>
                  {cartSummary.shipping === 0 ? 'Free' : `$${cartSummary.shipping.toFixed(2)}`}
                </span>
              </div>
              
              <div className="flex justify-between text-base text-gray-900">
                <span>Tax</span>
                <span>${cartSummary.tax.toFixed(2)}</span>
              </div>
              
              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between text-lg font-medium text-gray-900">
                  <span>Total</span>
                  <span>${cartSummary.total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {cartSummary.subtotal < 100 && (
              <div className="mt-4 p-4 bg-blue-50 rounded-md">
                <p className="text-sm text-blue-800">
                  Add ${(100 - cartSummary.subtotal).toFixed(2)} more for free shipping!
                </p>
              </div>
            )}

            <div className="mt-6 space-y-3">
              <Link
                href="/checkout"
                className="w-full bg-blue-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors flex items-center justify-center"
              >
                Proceed to Checkout
              </Link>
              
              <Link
                href="/products"
                className="w-full bg-white border border-gray-300 rounded-md shadow-sm py-3 px-4 text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors flex items-center justify-center"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
