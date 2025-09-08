import { productClient } from './httpClient';
import { 
  ApiResponse, 
  WishlistItem, 
  CreateWishlistItemRequest 
} from '@/types/api';
import { API_ENDPOINTS } from '@/constants/api';

export class WishlistService {
  /**
   * Add item to wishlist
   */
  static async addToWishlist(wishlistData: CreateWishlistItemRequest, token?: string): Promise<ApiResponse<WishlistItem>> {
    const config = {
      headers: {
        accept: '*/*',
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    };

    return productClient.post<WishlistItem>(API_ENDPOINTS.WISHLIST, wishlistData, config);
  }

  /**
   * Get wishlist items by user ID
   */
  static async getWishlistByUserId(userId: string | number, token?: string): Promise<ApiResponse<WishlistItem[]>> {
    const config = {
      headers: {
        accept: '*/*',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    };

    return productClient.get<WishlistItem[]>(API_ENDPOINTS.WISHLIST_BY_USER(userId), config);
  }

  /**
   * Remove item from wishlist
   */
  static async removeFromWishlist(wishlistItemId: string | number, token?: string): Promise<ApiResponse<void>> {
    const config = {
      headers: {
        accept: '*/*',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    };

    return productClient.delete<void>(`${API_ENDPOINTS.WISHLIST}/${wishlistItemId}`, config);
  }

  /**
   * Remove item from wishlist by product ID and user ID
   */
  static async removeFromWishlistByProduct(userId: string | number, productId: string | number, token?: string): Promise<ApiResponse<void>> {
    const config = {
      headers: {
        accept: '*/*',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    };

    return productClient.delete<void>(`${API_ENDPOINTS.WISHLIST}/user/${userId}/product/${productId}`, config);
  }

  /**
   * Clear all items from user's wishlist
   */
  static async clearWishlist(userId: string | number, token?: string): Promise<ApiResponse<void>> {
    const config = {
      headers: {
        accept: '*/*',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    };

    return productClient.delete<void>(`${API_ENDPOINTS.WISHLIST}/user/${userId}/clear`, config);
  }

  /**
   * Check if product is in user's wishlist
   */
  static async isInWishlist(userId: string | number, productId: string | number, token?: string): Promise<ApiResponse<{ isInWishlist: boolean }>> {
    const config = {
      headers: {
        accept: '*/*',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    };

    return productClient.get<{ isInWishlist: boolean }>(`${API_ENDPOINTS.WISHLIST}/user/${userId}/product/${productId}/check`, config);
  }

  /**
   * Move item from wishlist to cart
   */
  static async moveToCart(wishlistItemId: string | number, token?: string): Promise<ApiResponse<void>> {
    const config = {
      headers: {
        accept: '*/*',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    };

    return productClient.post<void>(`${API_ENDPOINTS.WISHLIST}/${wishlistItemId}/move-to-cart`, {}, config);
  }

  /**
   * Get wishlist summary (total items)
   */
  static async getWishlistSummary(userId: string | number, token?: string): Promise<ApiResponse<{
    totalItems: number;
    items: WishlistItem[];
  }>> {
    const config = {
      headers: {
        accept: '*/*',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    };

    return productClient.get<{
      totalItems: number;
      items: WishlistItem[];
    }>(`${API_ENDPOINTS.WISHLIST}/user/${userId}/summary`, config);
  }

  /**
   * Share wishlist (get shareable link)
   */
  static async shareWishlist(userId: string | number, token?: string): Promise<ApiResponse<{
    shareUrl: string;
    expiresAt: string;
  }>> {
    const config = {
      headers: {
        accept: '*/*',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    };

    return productClient.post<{
      shareUrl: string;
      expiresAt: string;
    }>(`${API_ENDPOINTS.WISHLIST}/user/${userId}/share`, {}, config);
  }

  /**
   * Get public wishlist (via share link)
   */
  static async getPublicWishlist(shareToken: string): Promise<ApiResponse<{
    user: { firstName: string; lastName: string };
    items: WishlistItem[];
  }>> {
    return productClient.get<{
      user: { firstName: string; lastName: string };
      items: WishlistItem[];
    }>(`${API_ENDPOINTS.WISHLIST}/public/${shareToken}`);
  }
}

// Export individual functions for backward compatibility
export const addToWishlist = WishlistService.addToWishlist;
export const getWishlistByUserId = WishlistService.getWishlistByUserId;
export const removeFromWishlist = WishlistService.removeFromWishlist;
export const removeFromWishlistByProduct = WishlistService.removeFromWishlistByProduct;
export const clearWishlist = WishlistService.clearWishlist;
export const isInWishlist = WishlistService.isInWishlist;
export const moveToCart = WishlistService.moveToCart;
export const getWishlistSummary = WishlistService.getWishlistSummary;
export const shareWishlist = WishlistService.shareWishlist;
export const getPublicWishlist = WishlistService.getPublicWishlist;
