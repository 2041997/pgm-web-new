import { productClient } from './httpClient';
import { 
  ApiResponse, 
  Award, 
  CreateAwardRequest 
} from '@/types/api';
import { API_ENDPOINTS } from '@/constants/api';

export class AwardService {
  /**
   * Get all awards
   */
  static async getAwards(): Promise<ApiResponse<Award[]>> {
    return productClient.get<Award[]>(API_ENDPOINTS.AWARDS);
  }

  /**
   * Get award by ID
   */
  static async getAwardById(id: string | number): Promise<ApiResponse<Award>> {
    return productClient.get<Award>(`${API_ENDPOINTS.AWARDS}/${id}`);
  }

  /**
   * Create award
   */
  static async createAward(awardData: CreateAwardRequest, token?: string): Promise<ApiResponse<Award>> {
    const formData = new FormData();
    formData.append('title', awardData.title);
    formData.append('description', awardData.description);
    formData.append('year', awardData.year.toString());
    formData.append('category', awardData.category);
    if (awardData.isActive !== undefined) formData.append('isActive', awardData.isActive.toString());
    if (awardData.image) formData.append('image', awardData.image);

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    };

    return productClient.post<Award>(API_ENDPOINTS.AWARDS, formData, config);
  }

  /**
   * Update award
   */
  static async updateAward(id: string | number, awardData: Partial<CreateAwardRequest>, token?: string): Promise<ApiResponse<Award>> {
    const formData = new FormData();
    if (awardData.title) formData.append('title', awardData.title);
    if (awardData.description) formData.append('description', awardData.description);
    if (awardData.year) formData.append('year', awardData.year.toString());
    if (awardData.category) formData.append('category', awardData.category);
    if (awardData.isActive !== undefined) formData.append('isActive', awardData.isActive.toString());
    if (awardData.image) formData.append('image', awardData.image);

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    };

    return productClient.put<Award>(`${API_ENDPOINTS.AWARDS}/${id}`, formData, config);
  }

  /**
   * Delete award
   */
  static async deleteAward(id: string | number, token?: string): Promise<ApiResponse<void>> {
    const config = {
      ...(token && { headers: { Authorization: `Bearer ${token}` } }),
    };

    return productClient.delete<void>(`${API_ENDPOINTS.AWARDS}/${id}`, config);
  }

  /**
   * Get awards by category
   */
  static async getAwardsByCategory(category: string): Promise<ApiResponse<Award[]>> {
    return productClient.get<Award[]>(`${API_ENDPOINTS.AWARDS}/category/${encodeURIComponent(category)}`);
  }

  /**
   * Get awards by year
   */
  static async getAwardsByYear(year: number): Promise<ApiResponse<Award[]>> {
    return productClient.get<Award[]>(`${API_ENDPOINTS.AWARDS}/year/${year}`);
  }
}

export const getAwards = AwardService.getAwards;
export const getAwardById = AwardService.getAwardById;
export const createAward = AwardService.createAward;
export const updateAward = AwardService.updateAward;
export const deleteAward = AwardService.deleteAward;
export const getAwardsByCategory = AwardService.getAwardsByCategory;
export const getAwardsByYear = AwardService.getAwardsByYear;
