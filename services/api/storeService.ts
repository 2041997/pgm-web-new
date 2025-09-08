import { productClient } from './httpClient';
import { 
  ApiResponse, 
  Store, 
  CreateStoreRequest 
} from '@/types/api';
import { API_ENDPOINTS } from '@/constants/api';

export class StoreService {
  /**
   * Get all stores
   */
  static async getStores(): Promise<ApiResponse<Store[]>> {
    return productClient.get<Store[]>(API_ENDPOINTS.STORES);
  }

  /**
   * Get store by ID
   */
  static async getStoreById(id: string | number): Promise<ApiResponse<Store>> {
    return productClient.get<Store>(API_ENDPOINTS.STORE_BY_ID(id));
  }

  /**
   * Create a new store
   */
  static async createStore(store: CreateStoreRequest, token?: string): Promise<ApiResponse<Store>> {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    };

    return productClient.post<Store>(API_ENDPOINTS.STORES, store, config);
  }

  /**
   * Update store
   */
  static async updateStore(id: string | number, store: Partial<CreateStoreRequest>, token?: string): Promise<ApiResponse<Store>> {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    };

    return productClient.put<Store>(API_ENDPOINTS.STORE_BY_ID(id), store, config);
  }

  /**
   * Delete store
   */
  static async deleteStore(id: string | number, token?: string): Promise<ApiResponse<void>> {
    const config = {
      ...(token && { headers: { Authorization: `Bearer ${token}` } }),
    };

    return productClient.delete<void>(API_ENDPOINTS.STORE_BY_ID(id), config);
  }

  /**
   * Get stores by city
   */
  static async getStoresByCity(city: string): Promise<ApiResponse<Store[]>> {
    return productClient.get<Store[]>(`${API_ENDPOINTS.STORES}/city/${encodeURIComponent(city)}`);
  }

  /**
   * Get stores by state
   */
  static async getStoresByState(state: string): Promise<ApiResponse<Store[]>> {
    return productClient.get<Store[]>(`${API_ENDPOINTS.STORES}/state/${encodeURIComponent(state)}`);
  }

  /**
   * Get nearby stores by coordinates
   */
  static async getNearbyStores(latitude: number, longitude: number, radius: number = 50): Promise<ApiResponse<Store[]>> {
    return productClient.get<Store[]>(`${API_ENDPOINTS.STORES}/nearby?lat=${latitude}&lng=${longitude}&radius=${radius}`);
  }

  /**
   * Search stores by name or location
   */
  static async searchStores(query: string): Promise<ApiResponse<Store[]>> {
    return productClient.get<Store[]>(`${API_ENDPOINTS.STORES}/search?q=${encodeURIComponent(query)}`);
  }

  /**
   * Get store hours
   */
  static async getStoreHours(id: string | number): Promise<ApiResponse<{
    [key: string]: { open: string; close: string; isOpen: boolean };
  }>> {
    return productClient.get<{
      [key: string]: { open: string; close: string; isOpen: boolean };
    }>(`${API_ENDPOINTS.STORE_BY_ID(id)}/hours`);
  }

  /**
   * Update store hours
   */
  static async updateStoreHours(
    id: string | number, 
    hours: { [key: string]: { open: string; close: string } },
    token?: string
  ): Promise<ApiResponse<void>> {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    };

    return productClient.put<void>(`${API_ENDPOINTS.STORE_BY_ID(id)}/hours`, hours, config);
  }

  /**
   * Check product availability in store
   */
  static async checkProductAvailability(storeId: string | number, productId: string | number): Promise<ApiResponse<{
    available: boolean;
    quantity: number;
    reservedUntil?: string;
  }>> {
    return productClient.get<{
      available: boolean;
      quantity: number;
      reservedUntil?: string;
    }>(`${API_ENDPOINTS.STORE_BY_ID(storeId)}/products/${productId}/availability`);
  }

  /**
   * Reserve product in store
   */
  static async reserveProduct(
    storeId: string | number, 
    productId: string | number, 
    quantity: number,
    token?: string
  ): Promise<ApiResponse<{
    reservationId: string;
    expiresAt: string;
  }>> {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    };

    return productClient.post<{
      reservationId: string;
      expiresAt: string;
    }>(`${API_ENDPOINTS.STORE_BY_ID(storeId)}/products/${productId}/reserve`, { quantity }, config);
  }
}

// Export individual functions for backward compatibility
export const getStores = StoreService.getStores;
export const getStoreById = StoreService.getStoreById;
export const createStore = StoreService.createStore;
export const updateStore = StoreService.updateStore;
export const deleteStore = StoreService.deleteStore;
export const getStoresByCity = StoreService.getStoresByCity;
export const getStoresByState = StoreService.getStoresByState;
export const getNearbyStores = StoreService.getNearbyStores;
export const searchStores = StoreService.searchStores;
export const getStoreHours = StoreService.getStoreHours;
export const updateStoreHours = StoreService.updateStoreHours;
export const checkProductAvailability = StoreService.checkProductAvailability;
export const reserveProduct = StoreService.reserveProduct;
