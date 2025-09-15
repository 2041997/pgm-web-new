'use client'
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { CheckCircleIcon, TruckIcon, CalendarIcon } from '@heroicons/react/24/outline'
import { Order } from '@/types/ecommerce'
import { orderApi } from '@/services'
import LoadingSpinner from '@/components/ui/LoadingSpinner'

export default function OrderConfirmationPage() {
  const params = useParams()
  const orderIdStr = params?.id as string | undefined

  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (orderIdStr) {
      loadOrder()
    }
  }, [orderIdStr])

  const loadOrder = async () => {
    try {
      setLoading(true)
      const idNum = Number(orderIdStr)
      if (Number.isNaN(idNum)) throw new Error('Invalid order id')
      const response = await orderApi.getOrder(idNum)
      
      if (response.success) {
        // response.data is API Order shape; map to ecommerce Order expected by this component
        const apiOrder = response.data as any
        if (apiOrder) {
          const items = (apiOrder.orderItems || []).map((oi: any) => ({
            productId: String(oi.productId),
            quantity: oi.quantity,
            price: oi.price,
            title: oi.product?.name ?? '',
            image: oi.product?.image?.[0] ?? '',
            selectedVariants: {},
          }))

          const ecommerceOrder: Order = {
            id: String(apiOrder.id),
            userId: String(apiOrder.userId),
            items,
            subtotal: items.reduce((s: number, it: any) => s + (it.price * it.quantity), 0),
            tax: 0,
            shipping: 0,
            discount: 0,
            total: apiOrder.totalAmount ?? 0,
            status: 'confirmed',
            shippingAddress: {
              id: '', userId: String(apiOrder.userId), type: 'home', fullName: apiOrder.shippingAddress?.street ?? '', phone: '',
              addressLine1: apiOrder.shippingAddress?.street ?? '', addressLine2: '', city: apiOrder.shippingAddress?.city ?? '', state: apiOrder.shippingAddress?.state ?? '', postalCode: apiOrder.shippingAddress?.zipCode ?? '', country: apiOrder.shippingAddress?.country ?? '', isDefault: true
            },
            billingAddress: {
              id: '', userId: String(apiOrder.userId), type: 'home', fullName: apiOrder.billingAddress?.street ?? '', phone: '',
              addressLine1: apiOrder.billingAddress?.street ?? '', addressLine2: '', city: apiOrder.billingAddress?.city ?? '', state: apiOrder.billingAddress?.state ?? '', postalCode: apiOrder.billingAddress?.zipCode ?? '', country: apiOrder.billingAddress?.country ?? '', isDefault: true
            },
            paymentMethod: apiOrder.paymentMethod ?? '',
            createdAt: apiOrder.createdAt ?? '',
            updatedAt: apiOrder.updatedAt ?? '',
          }

          setOrder(ecommerceOrder)
        } else {
          setOrder(null)
        }
      }
    } catch (error) {
      console.error('Error loading order:', error)
    } finally {
      setLoading(false)
    }
  }

  const getEstimatedDelivery = () => {
    if (!order) return ''
    
    const orderDate = new Date(order.createdAt)
    const deliveryDate = new Date(orderDate)
    deliveryDate.setDate(orderDate.getDate() + 5) // 5 days delivery
    
    return deliveryDate.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <LoadingSpinner text="Loading order details..." />
      </div>
    )
  }

  if (!order) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Order not found</h2>
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
      <div className="max-w-3xl mx-auto">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-green-100 rounded-full">
              <CheckCircleIcon className="h-12 w-12 text-green-600" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Order Confirmed!
          </h1>
          <p className="text-lg text-gray-600 mb-4">
            Thank you for your purchase. Your order has been successfully placed.
          </p>
          <div className="bg-gray-100 rounded-lg p-4 inline-block">
            <p className="text-sm text-gray-600">Order ID</p>
            <p className="text-lg font-semibold text-gray-900">{order.id}</p>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>
          </div>
          
          <div className="p-6">
            {/* Order Items */}
            <div className="space-y-4 mb-6">
              {order.items.map((item) => (
                <div key={`${item.productId}-${JSON.stringify(item.selectedVariants)}`} className="flex items-center">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={60}
                    height={60}
                    className="rounded-md object-cover"
                  />
                  <div className="ml-4 flex-1">
                    <h4 className="text-sm font-medium text-gray-900">{item.title}</h4>
                    {item.selectedVariants && (
                      <p className="text-sm text-gray-500">
                        {Object.entries(item.selectedVariants).map(([key, value]) => (
                          <span key={key} className="mr-2">
                            {key}: {value}
                          </span>
                        ))}
                      </p>
                    )}
                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                  </div>
                  <div className="text-sm font-medium text-gray-900">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            {/* Order Totals */}
            <div className="border-t border-gray-200 pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="text-gray-900">${order.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Shipping</span>
                <span className="text-gray-900">
                  {order.shipping === 0 ? 'Free' : `$${order.shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Tax</span>
                <span className="text-gray-900">${order.tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg font-medium pt-2 border-t border-gray-200">
                <span className="text-gray-900">Total</span>
                <span className="text-gray-900">${order.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Delivery Information */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Delivery Information</h2>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start">
                <TruckIcon className="h-6 w-6 text-blue-600 mt-1 mr-3" />
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">Shipping Address</h3>
                  <div className="text-sm text-gray-600">
                    <p>{order.shippingAddress.fullName}</p>
                    <p>{order.shippingAddress.addressLine1}</p>
                    {order.shippingAddress.addressLine2 && (
                      <p>{order.shippingAddress.addressLine2}</p>
                    )}
                    <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}</p>
                    <p>{order.shippingAddress.country}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-start">
                <CalendarIcon className="h-6 w-6 text-green-600 mt-1 mr-3" />
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">Estimated Delivery</h3>
                  <p className="text-sm text-gray-600">{getEstimatedDelivery()}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Standard shipping (5-7 business days)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Order Status */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Order Status</h2>
          </div>
          
          <div className="p-6">
            <div className="flex items-center">
              <div className="flex items-center justify-center w-8 h-8 bg-green-100 rounded-full">
                <CheckCircleIcon className="h-5 w-5 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="font-medium text-gray-900 capitalize">{order.status}</p>
                <p className="text-sm text-gray-600">
                  Order placed on {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/products"
            className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
          >
            Continue Shopping
          </Link>
          <Link
            href="/orders"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            View All Orders
          </Link>
        </div>
      </div>
    </div>
  )
}
