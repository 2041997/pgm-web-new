import { get, post, put, del } from '@/lib/api'
import type { User, ApiResponse } from '@/types'

export const userService = {
  // Get all users
  getUsers: async (): Promise<User[]> => {
    const response = await get<ApiResponse<User[]>>('/users')
    return response.data
  },

  // Get user by ID
  getUser: async (id: string): Promise<User> => {
    const response = await get<ApiResponse<User>>(`/users/${id}`)
    return response.data
  },

  // Create new user
  createUser: async (userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> => {
    const response = await post<ApiResponse<User>>('/users', userData)
    return response.data
  },

  // Update user
  updateUser: async (id: string, userData: Partial<User>): Promise<User> => {
    const response = await put<ApiResponse<User>>(`/users/${id}`, userData)
    return response.data
  },

  // Delete user
  deleteUser: async (id: string): Promise<void> => {
    await del<ApiResponse<void>>(`/users/${id}`)
  },
}
