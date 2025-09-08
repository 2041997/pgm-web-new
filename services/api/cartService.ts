import { productClient } from './httpClient';
import { 
  ApiResponse, 
  CartItem, 
  CreateCartItemRequest, 
  UpdateCartItemRequest 
} from '@/types/api';
import { API_ENDPOINTS } from '@/constants/api';

export class CartService {
  /**
   * Add item to cart
   */
  static async addToCart(cartData: CreateCartItemRequest, token?: string): Promise<ApiResponse<CartItem>> {
    const config = {
      headers: {
        accept: '*/*',
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    };

    return productClient.post<CartItem>(API_ENDPOINTS.CART, cartData, config);
  }

  /**
   * Get cart items by user ID
   */
  static async getCartByUserId(userId: string | number, token?: string): Promise<ApiResponse<CartItem[]>> {
    const config = {
      headers: {
        accept: '*/*',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    };

    return productClient.get<CartItem[]>(API_ENDPOINTS.CART_BY_USER(userId), config);
  }

  /**
   * Update cart item quantity
   */
  static async updateCartItem(cartItemData: UpdateCartItemRequest, token?: string): Promise<ApiResponse<CartItem>> {
    const config = {
      headers: {
        accept: '*/*',
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    };

    return productClient.put<CartItem>(`${API_ENDPOINTS.CART}/${cartItemData.id}`, cartItemData, config);
  }

  /**
   * Remove item from cart
   */
  static async removeFromCart(cartItemId: string | number, token?: string): Promise<ApiResponse<void>> {
    const config = {
      headers: {
        accept: '*/*',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    };

    return productClient.delete<void>(`${API_ENDPOINTS.CART}/${cartItemId}`, config);
  }

  /**
   * Clear all items from user's cart
   */
  static async clearCart(userId: string | number, token?: string): Promise<ApiResponse<void>> {
    const config = {
      headers: {
        accept: '*/*',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    };

    return productClient.delete<void>(`${API_ENDPOINTS.CART}/user/${userId}/clear`, config);
  }

  /**
   * Get cart summary (total items, total price)
   */
  static async getCartSummary(userId: string | number, token?: string): Promise<ApiResponse<{
    totalItems: number;
    totalPrice: number;
    items: CartItem[];
  }>> {
    const config = {
      headers: {
        accept: '*/*',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    };

    return productClient.get<{
      totalItems: number;
      totalPrice: number;
      items: CartItem[];
    }>(`${API_ENDPOINTS.CART}/user/${userId}/summary`, config);
  }

  /**
   * Move item from cart to wishlist
   */
  static async moveToWishlist(cartItemId: string | number, token?: string): Promise<ApiResponse<void>> {
    const config = {
      headers: {
        accept: '*/*',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    };

    return productClient.post<void>(`${API_ENDPOINTS.CART}/${cartItemId}/move-to-wishlist`, {}, config);
  }

  /**
   * Apply discount code to cart
   */
  static async applyDiscount(userId: string | number, discountCode: string, token?: string): Promise<ApiResponse<{
    discountAmount: number;
    totalAfterDiscount: number;
  }>> {
    const config = {
      headers: {
        accept: '*/*',
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    };

    return productClient.post<{
      discountAmount: number;
      totalAfterDiscount: number;
    }>(`${API_ENDPOINTS.CART}/user/${userId}/discount`, { discountCode }, config);
  }

  /**
   * Remove discount from cart
   */
  static async removeDiscount(userId: string | number, token?: string): Promise<ApiResponse<void>> {
    const config = {
      headers: {
        accept: '*/*',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    };

    return productClient.delete<void>(`${API_ENDPOINTS.CART}/user/${userId}/discount`, config);
  }
}

// Export individual functions for backward compatibility
export const addToCartItem = CartService.addToCart;
export const getCartByUserId = CartService.getCartByUserId;
export const updateCartItem = CartService.updateCartItem;
export const removeFromCart = CartService.removeFromCart;
export const clearCart = CartService.clearCart;
export const getCartSummary = CartService.getCartSummary;
export const moveToWishlist = CartService.moveToWishlist;
export const applyDiscount = CartService.applyDiscount;
export const removeDiscount = CartService.removeDiscount;
