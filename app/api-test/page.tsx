'use client'

import { useState, useEffect } from 'react'
import { ProductService } from '@/services/api'
import { productApi } from '@/services'

export default function ApiTestPage() {
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [testResult, setTestResult] = useState<string>('')

  const testDirectApi = async () => {
    setLoading(true)
    setError(null)
    try {
      console.log('Testing direct ProductService API...')
      const response = await ProductService.getProducts()
      console.log('Direct API Response:', response)
      setTestResult(`Direct API: ${response.success ? 'SUCCESS' : 'FAILED'} - ${response.error || 'No error'}`)
    } catch (err) {
      console.error('Direct API Error:', err)
      setError(`Direct API Error: ${err}`)
      setTestResult('Direct API: ERROR')
    } finally {
      setLoading(false)
    }
  }

  const testWrappedApi = async () => {
    setLoading(true)
    setError(null)
    try {
      console.log('Testing wrapped productApi...')
      const response = await productApi.getProducts()
      console.log('Wrapped API Response:', response)
      setProducts(response.data || [])
      setTestResult(`Wrapped API: ${response.success ? 'SUCCESS' : 'FAILED'} - Found ${response.data?.length || 0} products`)
    } catch (err) {
      console.error('Wrapped API Error:', err)
      setError(`Wrapped API Error: ${err}`)
      setTestResult('Wrapped API: ERROR')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">API Integration Test</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">API Configuration</h2>
          <div className="space-y-2 text-sm">
            <p><strong>Product API:</strong> {process.env.NEXT_PUBLIC_PRODUCT_API_URL || 'https://product.pgmbusiness.com'}</p>
            <p><strong>User API:</strong> {process.env.NEXT_PUBLIC_USER_API_URL || 'https://user.pgmbusiness.com'}</p>
            <p><strong>Core API:</strong> {process.env.NEXT_PUBLIC_CORE_ASSOCIATE_API_URL || 'https://core.pgmbusiness.com'}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Test Results</h2>
          <div className="space-y-2">
            <button 
              onClick={testDirectApi}
              disabled={loading}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            >
              Test Direct API
            </button>
            <button 
              onClick={testWrappedApi}
              disabled={loading}
              className="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
            >
              Test Wrapped API
            </button>
            {loading && <p className="text-blue-600">Testing...</p>}
            {testResult && <p className="text-sm bg-gray-100 p-2 rounded">{testResult}</p>}
            {error && <p className="text-red-600 text-sm">{error}</p>}
          </div>
        </div>
      </div>

      {products.length > 0 && (
        <div className="mt-8 bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Products Found ({products.length})</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.slice(0, 6).map((product, index) => (
              <div key={product.id || index} className="border p-4 rounded">
                <h3 className="font-semibold">{product.title || product.name}</h3>
                <p className="text-sm text-gray-600">{product.description}</p>
                <p className="font-bold text-green-600">${product.price}</p>
                {product.images && product.images.length > 0 && (
                  <img 
                    src={product.images[0]} 
                    alt={product.title || product.name}
                    className="w-full h-32 object-cover mt-2 rounded"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none'
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-8 bg-gray-100 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Implementation Notes</h2>
        <ul className="text-sm space-y-1">
          <li>• ✅ All mock APIs have been completely removed and deleted</li>
          <li>• ✅ Your original TypeScript API services are now fully integrated</li>
          <li>• ✅ API URLs are configured for production (pgmbusiness.com)</li>
          <li>• ✅ Check browser console for detailed API responses</li>
          <li>• ⚠️ Ensure your APIs support CORS for frontend requests</li>
          <li>• ⚠️ Verify API endpoints are accessible and returning correct data structure</li>
        </ul>
      </div>
    </div>
  )
}
