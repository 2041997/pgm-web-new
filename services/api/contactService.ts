import { productClient } from './httpClient';
import { 
  ApiResponse, 
  ContactMessage, 
  CreateContactMessageRequest 
} from '@/types/api';
import { API_ENDPOINTS } from '@/constants/api';

export class ContactService {
  /**
   * Submit contact message
   */
  static async submitContactMessage(contactData: CreateContactMessageRequest): Promise<ApiResponse<ContactMessage>> {
    return productClient.post<ContactMessage>(API_ENDPOINTS.CONTACT, contactData);
  }

  /**
   * Get all contact messages (Admin only)
   */
  static async getAllContactMessages(token?: string): Promise<ApiResponse<ContactMessage[]>> {
    const config = {
      ...(token && { headers: { Authorization: `Bearer ${token}` } }),
    };

    return productClient.get<ContactMessage[]>(API_ENDPOINTS.CONTACT, config);
  }

  /**
   * Get contact message by ID (Admin only)
   */
  static async getContactMessageById(id: string | number, token?: string): Promise<ApiResponse<ContactMessage>> {
    const config = {
      ...(token && { headers: { Authorization: `Bearer ${token}` } }),
    };

    return productClient.get<ContactMessage>(`${API_ENDPOINTS.CONTACT}/${id}`, config);
  }

  /**
   * Mark contact message as read (Admin only)
   */
  static async markAsRead(id: string | number, token?: string): Promise<ApiResponse<ContactMessage>> {
    const config = {
      ...(token && { headers: { Authorization: `Bearer ${token}` } }),
    };

    return productClient.patch<ContactMessage>(`${API_ENDPOINTS.CONTACT}/${id}`, { isRead: true }, config);
  }

  /**
   * Delete contact message (Admin only)
   */
  static async deleteContactMessage(id: string | number, token?: string): Promise<ApiResponse<void>> {
    const config = {
      ...(token && { headers: { Authorization: `Bearer ${token}` } }),
    };

    return productClient.delete<void>(`${API_ENDPOINTS.CONTACT}/${id}`, config);
  }

  /**
   * Get unread contact messages count (Admin only)
   */
  static async getUnreadCount(token?: string): Promise<ApiResponse<{ count: number }>> {
    const config = {
      ...(token && { headers: { Authorization: `Bearer ${token}` } }),
    };

    return productClient.get<{ count: number }>(`${API_ENDPOINTS.CONTACT}/unread/count`, config);
  }
}

export const submitContactMessage = ContactService.submitContactMessage;
export const getAllContactMessages = ContactService.getAllContactMessages;
export const getContactMessageById = ContactService.getContactMessageById;
export const markAsRead = ContactService.markAsRead;
export const deleteContactMessage = ContactService.deleteContactMessage;
export const getUnreadCount = ContactService.getUnreadCount;
