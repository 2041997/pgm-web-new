import { Order, Address, ApiResponse } from '@/types/ecommerce'
import { mockOrders } from '@/data/mockData'
import { cartApi } from './mockCartApi'

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

// Generate random order ID
const generateOrderId = (): string => {
  return 'ORD-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9)
}

// Generate random tracking number
const generateTrackingNumber = (): string => {
  return 'TRK' + Math.random().toString(36).substr(2, 9).toUpperCase()
}

export const orderApi = {
  // Create new order
  createOrder: async (orderData: {
    shippingAddress: Address
    billingAddress: Address
    paymentMethod: string
    promoCode?: string
  }): Promise<ApiResponse<Order>> => {
    await delay(500) // Simulate payment processing
    
    // Get current cart
    const cartResponse = await cartApi.getCart()
    const cartItems = cartResponse.data
    
    if (cartItems.length === 0) {
      return {
        data: {} as Order,
        message: 'Cart is empty',
        success: false
      }
    }

    // Calculate totals
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    const tax = subtotal * 0.08
    const shipping = subtotal >= 100 ? 0 : 10
    const discount = orderData.promoCode === 'SAVE10' ? subtotal * 0.1 : 0
    const total = subtotal + tax + shipping - discount

    // Create order
    const newOrder: Order = {
      id: generateOrderId(),
      userId: 'current_user', // In real app, get from auth
      items: cartItems,
      subtotal,
      tax,
      shipping,
      discount,
      total,
      status: 'pending',
      shippingAddress: orderData.shippingAddress,
      billingAddress: orderData.billingAddress,
      paymentMethod: orderData.paymentMethod,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
      trackingNumber: generateTrackingNumber()
    }

    // Clear cart after successful order
    await cartApi.clearCart()

    return {
      data: newOrder,
      message: 'Order created successfully',
      success: true
    }
  },

  // Get order by ID
  getOrder: async (orderId: string): Promise<ApiResponse<Order | null>> => {
    await delay(200)
    
    const order = mockOrders.find(o => o.id === orderId)
    
    return {
      data: order || null,
      message: order ? 'Order retrieved successfully' : 'Order not found',
      success: !!order
    }
  },

  // Get orders for current user
  getUserOrders: async (userId: string = 'current_user'): Promise<ApiResponse<Order[]>> => {
    await delay(300)
    
    const userOrders = mockOrders.filter(order => order.userId === userId)
    
    return {
      data: userOrders,
      message: 'Orders retrieved successfully',
      success: true
    }
  },

  // Update order status (admin function)
  updateOrderStatus: async (orderId: string, status: Order['status']): Promise<ApiResponse<Order | null>> => {
    await delay(200)
    
    const order = mockOrders.find(o => o.id === orderId)
    
    if (order) {
      order.status = status
      order.updatedAt = new Date().toISOString()
      
      return {
        data: order,
        message: 'Order status updated successfully',
        success: true
      }
    }

    return {
      data: null,
      message: 'Order not found',
      success: false
    }
  },

  // Cancel order
  cancelOrder: async (orderId: string): Promise<ApiResponse<Order | null>> => {
    await delay(300)
    
    const order = mockOrders.find(o => o.id === orderId)
    
    if (order && ['pending', 'confirmed', 'processing'].includes(order.status)) {
      order.status = 'cancelled'
      order.updatedAt = new Date().toISOString()
      
      return {
        data: order,
        message: 'Order cancelled successfully',
        success: true
      }
    }

    return {
      data: null,
      message: order ? 'Order cannot be cancelled' : 'Order not found',
      success: false
    }
  },

  // Track order
  trackOrder: async (trackingNumber: string): Promise<ApiResponse<{
    order: Order | null
    trackingHistory: Array<{
      status: string
      timestamp: string
      location: string
      description: string
    }>
  }>> => {
    await delay(250)
    
    const order = mockOrders.find(o => o.trackingNumber === trackingNumber)
    
    if (!order) {
      return {
        data: { order: null, trackingHistory: [] },
        message: 'Tracking number not found',
        success: false
      }
    }

    // Mock tracking history
    const trackingHistory = [
      {
        status: 'Order Placed',
        timestamp: order.createdAt,
        location: 'Online',
        description: 'Your order has been placed successfully'
      },
      {
        status: 'Order Confirmed',
        timestamp: new Date(new Date(order.createdAt).getTime() + 2 * 60 * 60 * 1000).toISOString(),
        location: 'Warehouse',
        description: 'Your order has been confirmed and is being prepared'
      },
      {
        status: 'Shipped',
        timestamp: new Date(new Date(order.createdAt).getTime() + 24 * 60 * 60 * 1000).toISOString(),
        location: 'Distribution Center',
        description: 'Your order has been shipped'
      }
    ]

    if (order.status === 'delivered') {
      trackingHistory.push({
        status: 'Delivered',
        timestamp: order.updatedAt,
        location: order.shippingAddress.city,
        description: 'Your order has been delivered successfully'
      })
    }

    return {
      data: { order, trackingHistory },
      message: 'Order tracking retrieved successfully',
      success: true
    }
  }
}
