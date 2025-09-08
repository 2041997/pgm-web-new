import { productClient } from './httpClient';
import { 
  ApiResponse, 
  GalleryImage, 
  CreateGalleryImageRequest 
} from '@/types/api';
import { API_ENDPOINTS } from '@/constants/api';

export class GalleryService {
  /**
   * Get all gallery images
   */
  static async getGalleryImages(): Promise<ApiResponse<GalleryImage[]>> {
    return productClient.get<GalleryImage[]>(API_ENDPOINTS.GALLERY);
  }

  /**
   * Get gallery image by ID
   */
  static async getGalleryImageById(id: string | number): Promise<ApiResponse<GalleryImage>> {
    return productClient.get<GalleryImage>(`${API_ENDPOINTS.GALLERY}/${id}`);
  }

  /**
   * Create gallery image
   */
  static async createGalleryImage(imageData: CreateGalleryImageRequest, token?: string): Promise<ApiResponse<GalleryImage>> {
    const formData = new FormData();
    formData.append('title', imageData.title);
    if (imageData.description) formData.append('description', imageData.description);
    if (imageData.category) formData.append('category', imageData.category);
    if (imageData.isActive !== undefined) formData.append('isActive', imageData.isActive.toString());
    formData.append('image', imageData.image);

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    };

    return productClient.post<GalleryImage>(API_ENDPOINTS.GALLERY, formData, config);
  }

  /**
   * Update gallery image
   */
  static async updateGalleryImage(id: string | number, imageData: Partial<CreateGalleryImageRequest>, token?: string): Promise<ApiResponse<GalleryImage>> {
    const formData = new FormData();
    if (imageData.title) formData.append('title', imageData.title);
    if (imageData.description) formData.append('description', imageData.description);
    if (imageData.category) formData.append('category', imageData.category);
    if (imageData.isActive !== undefined) formData.append('isActive', imageData.isActive.toString());
    if (imageData.image) formData.append('image', imageData.image);

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    };

    return productClient.put<GalleryImage>(`${API_ENDPOINTS.GALLERY}/${id}`, formData, config);
  }

  /**
   * Delete gallery image
   */
  static async deleteGalleryImage(id: string | number, token?: string): Promise<ApiResponse<void>> {
    const config = {
      ...(token && { headers: { Authorization: `Bearer ${token}` } }),
    };

    return productClient.delete<void>(`${API_ENDPOINTS.GALLERY}/${id}`, config);
  }

  /**
   * Get gallery images by category
   */
  static async getGalleryImagesByCategory(category: string): Promise<ApiResponse<GalleryImage[]>> {
    return productClient.get<GalleryImage[]>(`${API_ENDPOINTS.GALLERY}/category/${encodeURIComponent(category)}`);
  }
}

export const getGalleryImages = GalleryService.getGalleryImages;
export const getGalleryImageById = GalleryService.getGalleryImageById;
export const createGalleryImage = GalleryService.createGalleryImage;
export const updateGalleryImage = GalleryService.updateGalleryImage;
export const deleteGalleryImage = GalleryService.deleteGalleryImage;
export const getGalleryImagesByCategory = GalleryService.getGalleryImagesByCategory;
