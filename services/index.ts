// Central API configuration using your original TypeScript API services

import { ProductService, CartService, OrderService, UserService } from './api'
import { Product, ProductFilters, CartItem as EcommerceCartItem, Order, User } from '@/types/ecommerce'
import { ApiResponse, ProductData, UpdateCartItemRequest, NestedApiResponse, CartItem as ApiCartItem } from '@/types/api'

// Helper function to convert ProductData to Product
const convertProductDataToProduct = (item: ProductData): Product => {
    console.log("Ssssssssssssss", item)
  return {
    id: item.id.toString(),
    title: item.name,
    description: item.description,
    price: item.price,
    originalPrice: item.price,
    rating: 0,
    reviewCount: 0,
    images: item.image || [],
    category: 'General',
    brand: '',
    inStock: true,
    stockCount: 10,
    tags: [],
    sku: `SKU-${item.id}`,
    weight: item.weight,
    createdAt: item.createdAt || new Date().toISOString(),
    updatedAt: item.updatedAt || new Date().toISOString()
  };
};

// Helper function to convert API CartItem to Ecommerce CartItem
const convertApiCartItemToEcommerce = (item: ApiCartItem): EcommerceCartItem => {
  return {
    productId: item.productId.toString(),
    quantity: item.quantity,
    price: item.price,
    title: item.product?.name || 'Product',
    image: item.product?.image?.[0] || '/placeholder-image.jpg',
    selectedVariants: {}
  };
};

// API wrapper functions to match the expected interface for existing components
export const productApi = {
  async getProducts(filters?: ProductFilters) {
    try {
      const response = await ProductService.getProducts();
      console.log("API Response:", response)
      
      // Handle nested data structure: response.data.data
      if (response.success && response.data && Array.isArray(response.data)) {
        // Direct array in response.data
        const products: Product[] = response.data.map(convertProductDataToProduct);
        return { success: true, data: products };
      } else if (response.success && response.data && (response.data as any).data && Array.isArray((response.data as any).data)) {
        // Nested array in response.data.data
        const products: Product[] = (response.data as any).data.map(convertProductDataToProduct);
        return { success: true, data: products };
      }
      
      return { success: false, data: [] };
    } catch (error) {
      console.error('Error fetching products:', error);
      return { success: false, data: [] };
    }
  },

  async getProduct(id: string | number) {
    try {
      const response = await ProductService.getProductById(id);
      if (response.success && response.data) {
        const product = convertProductDataToProduct(response.data);
        return { success: true, data: product };
      }
      return { success: false, data: null };
    } catch (error) {
      console.error('Error fetching product:', error);
      return { success: false, data: null };
    }
  },

  async getFeaturedProducts(limit?: number) {
    try {
      // Use getProducts as a fallback since getFeaturedProducts doesn't exist
      const response = await ProductService.getProducts();
      
      let productsArray: ProductData[] = [];
      
      // Handle nested data structure: response.data.data
      if (response.success && response.data && Array.isArray(response.data)) {
        // Direct array in response.data
        productsArray = response.data;
      } else if (response.success && response.data && (response.data as any).data && Array.isArray((response.data as any).data)) {
        // Nested array in response.data.data
        productsArray = (response.data as any).data;
      }
      
      if (productsArray.length > 0) {
        // Return limited number of products as featured
        const products: Product[] = productsArray
          .slice(0, limit || 8)
          .map(convertProductDataToProduct);
        
        return { success: true, data: products };
      }
      return { success: false, data: [] };
    } catch (error) {
      console.error('Error fetching featured products:', error);
      return { success: false, data: [] };
    }
  },

  async getProductReviews(productId: string | number) {
    try {
      // This would need to be implemented in your backend
      // For now, return empty reviews
      return { success: true, data: [] };
    } catch (error) {
      console.error('Error fetching product reviews:', error);
      return { success: false, data: [] };
    }
  }
}

export const cartApi = {
  async getCart(userId?: number) {
    try {
      const actualUserId = userId || 1; // Default user ID - should be passed from auth context
      const response = await CartService.getCartByUserId(actualUserId);
      if (response.success && response.data) {
        // Convert API cart items to ecommerce cart items
        const cartItems: EcommerceCartItem[] = response.data.map(convertApiCartItemToEcommerce);
        return { success: true, data: cartItems };
      }
      return { success: false, data: [] };
    } catch (error) {
      console.error('Error fetching cart:', error);
      return { success: false, data: [] };
    }
  },

  async getCartSummary(userId?: number) {
    try {
      const actualUserId = userId || 1; // Default user ID - should be passed from auth context
      const response = await CartService.getCartSummary(actualUserId);
      if (response.success && response.data) {
        // Convert API response to expected format
        const summary = {
          itemCount: response.data.totalItems,
          subtotal: response.data.totalPrice,
          tax: 0,
          shipping: 0,
          total: response.data.totalPrice
        };
        return { success: true, data: summary };
      }
      return { success: false, data: { itemCount: 0, subtotal: 0, tax: 0, shipping: 0, total: 0 } };
    } catch (error) {
      console.error('Error fetching cart summary:', error);
      return { success: false, data: { itemCount: 0, subtotal: 0, tax: 0, shipping: 0, total: 0 } };
    }
  },

  async addToCart(item: EcommerceCartItem) {
    try {
      // Convert ecommerce CartItem to API format
      const cartItemRequest = {
        userId: 1, // Default user ID - should be passed from auth context
        productId: parseInt(item.productId),
        quantity: item.quantity || 1,
        price: item.price
      };
      
      const response = await CartService.addToCart(cartItemRequest);
      if (response.success && response.data) {
        return { success: true, data: convertApiCartItemToEcommerce(response.data) };
      }
      return { success: false, error: 'Failed to add item to cart' };
    } catch (error) {
      console.error('Error adding to cart:', error);
      return { success: false, error: 'Failed to add item to cart' };
    }
  },

  async updateCartItem(id: any, quantity: number, variants?: any) {
    try {
      const updateRequest: UpdateCartItemRequest = { 
        id: id,
        quantity: quantity 
      };
      const response = await CartService.updateCartItem(updateRequest);
      if (response.success && response.data) {
        return { success: true, data: convertApiCartItemToEcommerce(response.data) };
      }
      return { success: false, error: 'Failed to update cart item' };
    } catch (error) {
      console.error('Error updating cart item:', error);
      return { success: false, error: 'Failed to update cart item' };
    }
  },

  async removeFromCart(id: number, variants?: any) {
    try {
      const response = await CartService.removeFromCart(id);
      return response;
    } catch (error) {
      console.error('Error removing from cart:', error);
      return { success: false, error: 'Failed to remove item from cart' };
    }
  },

  async clearCart(userId?: number) {
    try {
      const actualUserId = userId || 1; // Default user ID - should be passed from auth context
      const response = await CartService.clearCart(actualUserId);
      return response;
    } catch (error) {
      console.error('Error clearing cart:', error);
      return { success: false, error: 'Failed to clear cart' };
    }
  }
}

export const orderApi = {
  async createOrder(orderData: any) {
    try {
      const response = await OrderService.createOrder(orderData);
      return response;
    } catch (error) {
      console.error('Error creating order:', error);
      return { success: false, error: 'Failed to create order' };
    }
  },

  async getOrders(userId: number) {
    try {
      const response = await OrderService.getOrdersByUserId(userId);
      return response;
    } catch (error) {
      console.error('Error fetching orders:', error);
      return { success: false, data: [] };
    }
  },

  async getOrder(id: any) {
    try {
      const response = await OrderService.getOrderById(id);
      return response;
    } catch (error) {
      console.error('Error fetching order:', error);
      return { success: false, data: null };
    }
  }
}

export const userApi = {
  async login(email: string, password: string) {
    try {
      const response = await UserService.login(email, password);
      return response;
    } catch (error) {
      console.error('Error logging in:', error);
      return { success: false, error: 'Failed to login' };
    }
  },

  async register(userData: any) {
    try {
      const response = await UserService.register(userData);
      return response;
    } catch (error) {
      console.error('Error registering:', error);
      return { success: false, error: 'Failed to register' };
    }
  },

  async getProfile() {
    try {
      const response = await UserService.getProfile();
      return response;
    } catch (error) {
      console.error('Error fetching profile:', error);
      return { success: false, data: null };
    }
  },

  async updateProfile(userData: any) {
    try {
      const response = await UserService.updateProfile(userData);
      return response;
    } catch (error) {
      console.error('Error updating profile:', error);
      return { success: false, error: 'Failed to update profile' };
    }
  }
}

export const categoryApi = {
  async getCategories() {
    try {
      const response = await ProductService.getCategories();
      if (response.success && response.data) {
        return { success: true, data: response.data };
      }
      return { success: false, data: [] };
    } catch (error) {
      console.error('Error fetching categories:', error);
      return { success: false, data: [] };
    }
  }
}

// Export API configuration info
export const apiConfig = {
  isUsingMockApi: false,
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://pgmbusiness.com',
  productUrl: process.env.NEXT_PUBLIC_PRODUCT_API_URL || 'https://product.pgmbusiness.com',
  userUrl: process.env.NEXT_PUBLIC_USER_API_URL || 'https://user.pgmbusiness.com',
  coreUrl: process.env.NEXT_PUBLIC_CORE_ASSOCIATE_API_URL || 'https://core.pgmbusiness.com',
}
