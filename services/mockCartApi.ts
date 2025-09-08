import { CartItem, ApiResponse } from '@/types/ecommerce'

const CART_STORAGE_KEY = 'ecommerce_cart'

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

// Cart utilities for localStorage
const getCartFromStorage = (): CartItem[] => {
  if (typeof window === 'undefined') return []
  try {
    const cart = localStorage.getItem(CART_STORAGE_KEY)
    return cart ? JSON.parse(cart) : []
  } catch (error) {
    console.error('Error reading cart from storage:', error)
    return []
  }
}

const saveCartToStorage = (cart: CartItem[]): void => {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart))
  } catch (error) {
    console.error('Error saving cart to storage:', error)
  }
}

export const cartApi = {
  // Get cart items
  getCart: async (): Promise<ApiResponse<CartItem[]>> => {
    await delay(100)
    
    const cart = getCartFromStorage()
    
    return {
      data: cart,
      message: 'Cart retrieved successfully',
      success: true
    }
  },

  // Add item to cart
  addToCart: async (item: Omit<CartItem, 'quantity'> & { quantity?: number }): Promise<ApiResponse<CartItem[]>> => {
    await delay(200)
    
    const cart = getCartFromStorage()
    const existingItemIndex = cart.findIndex(cartItem => 
      cartItem.productId === item.productId && 
      JSON.stringify(cartItem.selectedVariants) === JSON.stringify(item.selectedVariants)
    )

    if (existingItemIndex >= 0) {
      // Update quantity if item already exists
      cart[existingItemIndex].quantity += item.quantity || 1
    } else {
      // Add new item
      cart.push({
        ...item,
        quantity: item.quantity || 1
      } as CartItem)
    }

    saveCartToStorage(cart)

    return {
      data: cart,
      message: 'Item added to cart successfully',
      success: true
    }
  },

  // Update cart item quantity
  updateCartItem: async (productId: string, quantity: number, selectedVariants?: { [key: string]: string }): Promise<ApiResponse<CartItem[]>> => {
    await delay(150)
    
    const cart = getCartFromStorage()
    const itemIndex = cart.findIndex(item => 
      item.productId === productId && 
      JSON.stringify(item.selectedVariants) === JSON.stringify(selectedVariants)
    )

    if (itemIndex >= 0) {
      if (quantity <= 0) {
        // Remove item if quantity is 0 or negative
        cart.splice(itemIndex, 1)
      } else {
        // Update quantity
        cart[itemIndex].quantity = quantity
      }
      
      saveCartToStorage(cart)
      
      return {
        data: cart,
        message: 'Cart updated successfully',
        success: true
      }
    }

    return {
      data: cart,
      message: 'Item not found in cart',
      success: false
    }
  },

  // Remove item from cart
  removeFromCart: async (productId: string, selectedVariants?: { [key: string]: string }): Promise<ApiResponse<CartItem[]>> => {
    await delay(150)
    
    const cart = getCartFromStorage()
    const filteredCart = cart.filter(item => 
      !(item.productId === productId && 
        JSON.stringify(item.selectedVariants) === JSON.stringify(selectedVariants))
    )

    saveCartToStorage(filteredCart)

    return {
      data: filteredCart,
      message: 'Item removed from cart successfully',
      success: true
    }
  },

  // Clear entire cart
  clearCart: async (): Promise<ApiResponse<CartItem[]>> => {
    await delay(100)
    
    saveCartToStorage([])

    return {
      data: [],
      message: 'Cart cleared successfully',
      success: true
    }
  },

  // Get cart summary (totals)
  getCartSummary: async (): Promise<ApiResponse<{
    itemCount: number
    subtotal: number
    tax: number
    shipping: number
    total: number
  }>> => {
    await delay(100)
    
    const cart = getCartFromStorage()
    const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0)
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    
    // Mock tax calculation (8%)
    const tax = subtotal * 0.08
    
    // Mock shipping calculation (free over $100)
    const shipping = subtotal >= 100 ? 0 : 10
    
    const total = subtotal + tax + shipping

    return {
      data: {
        itemCount,
        subtotal,
        tax,
        shipping,
        total
      },
      message: 'Cart summary calculated successfully',
      success: true
    }
  }
}
