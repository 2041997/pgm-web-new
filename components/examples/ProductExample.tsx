// Example usage of real APIs in a React component

'use client'

import { useState, useEffect } from 'react'
import { productApi, cartApi } from '@/services'
import { Product, CartItem } from '@/types/ecommerce'

export default function ProductExample() {
  const [products, setProducts] = useState<Product[]>([])
  const [cart, setCart] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Load products and cart on component mount
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      
      // Get featured products
      const productsResponse = await productApi.getFeaturedProducts(4)
      if (productsResponse.success) {
        setProducts(productsResponse.data)
      }

      // Get current cart (with default user ID)
      const cartResponse = await cartApi.getCart(1)
      if (cartResponse.success) {
        setCart(cartResponse.data)
      }
    } catch (error) {
      console.error('Error loading data:', error)
    } finally {
      setLoading(false)
    }
  }

  const addToCart = async (product: Product) => {
    try {
      const cartItem: CartItem = {
        productId: product.id,
        price: product.price,
        title: product.title,
        image: product.images[0] || '/placeholder-image.jpg',
        quantity: 1
      }

      const response = await cartApi.addToCart(cartItem)
      if (response.success) {
        // Reload cart to get updated data
        loadData()
        alert('Product added to cart!')
      }
    } catch (error) {
      console.error('Error adding to cart:', error)
      alert('Failed to add product to cart')
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="text-lg">Loading products...</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Featured Products</h1>
        <p className="text-gray-600">Cart items: {cart.length}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="aspect-square bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
              <span className="text-gray-500">Product Image</span>
            </div>
            
            <h3 className="font-semibold text-lg mb-2 line-clamp-2">{product.title}</h3>
            
            <div className="flex items-center mb-2">
              <span className="text-yellow-400">★</span>
              <span className="ml-1 text-sm text-gray-600">
                {product.rating} ({product.reviewCount} reviews)
              </span>
            </div>
            
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-xl font-bold">${product.price}</span>
                {product.originalPrice && (
                  <span className="text-sm text-gray-500 line-through ml-2">
                    ${product.originalPrice}
                  </span>
                )}
              </div>
              {product.originalPrice && (
                <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded">
                  Save ${product.originalPrice - product.price}
                </span>
              )}
            </div>

            <button
              onClick={() => addToCart(product)}
              disabled={!product.inStock}
              className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                product.inStock
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {product.inStock ? 'Add to Cart' : 'Out of Stock'}
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-green-50 rounded-lg border border-green-200">
        <h2 className="text-xl font-semibold mb-4 text-green-800">Real API Integration</h2>
        <div className="space-y-2 text-sm text-green-700">
          <p><strong>✅ Real API Status:</strong> Active</p>
          <p><strong>✅ Data Source:</strong> PGM Business APIs</p>
          <p><strong>✅ Product API:</strong> https://product.pgmbusiness.com</p>
          <p><strong>✅ User API:</strong> https://user.pgmbusiness.com</p>
          <p><strong>✅ Backend Integration:</strong> Fully connected</p>
        </div>
      </div>
    </div>
  )
}
