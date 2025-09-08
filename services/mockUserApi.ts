import { User, Address, ApiResponse } from '@/types/ecommerce'
import { mockUsers } from '@/data/mockData'

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

// Mock current user (in real app, get from auth context)
const getCurrentUserId = (): string => 'u1'

export const userApi = {
  // Get current user profile
  getProfile: async (): Promise<ApiResponse<User | null>> => {
    await delay(200)
    
    const userId = getCurrentUserId()
    const user = mockUsers.find(u => u.id === userId)
    
    return {
      data: user || null,
      message: user ? 'Profile retrieved successfully' : 'User not found',
      success: !!user
    }
  },

  // Update user profile
  updateProfile: async (updates: Partial<User>): Promise<ApiResponse<User | null>> => {
    await delay(300)
    
    const userId = getCurrentUserId()
    const userIndex = mockUsers.findIndex(u => u.id === userId)
    
    if (userIndex >= 0) {
      mockUsers[userIndex] = {
        ...mockUsers[userIndex],
        ...updates,
        updatedAt: new Date().toISOString()
      }
      
      return {
        data: mockUsers[userIndex],
        message: 'Profile updated successfully',
        success: true
      }
    }

    return {
      data: null,
      message: 'User not found',
      success: false
    }
  },

  // Get user addresses
  getAddresses: async (): Promise<ApiResponse<Address[]>> => {
    await delay(200)
    
    const userId = getCurrentUserId()
    const user = mockUsers.find(u => u.id === userId)
    
    return {
      data: user?.addresses || [],
      message: 'Addresses retrieved successfully',
      success: true
    }
  },

  // Add new address
  addAddress: async (address: Omit<Address, 'id' | 'userId'>): Promise<ApiResponse<Address[]>> => {
    await delay(300)
    
    const userId = getCurrentUserId()
    const userIndex = mockUsers.findIndex(u => u.id === userId)
    
    if (userIndex >= 0) {
      const newAddress: Address = {
        ...address,
        id: 'addr-' + Date.now(),
        userId
      }
      
      // If this is set as default, remove default from other addresses
      if (newAddress.isDefault) {
        mockUsers[userIndex].addresses.forEach(addr => {
          addr.isDefault = false
        })
      }
      
      mockUsers[userIndex].addresses.push(newAddress)
      
      return {
        data: mockUsers[userIndex].addresses,
        message: 'Address added successfully',
        success: true
      }
    }

    return {
      data: [],
      message: 'User not found',
      success: false
    }
  },

  // Update address
  updateAddress: async (addressId: string, updates: Partial<Address>): Promise<ApiResponse<Address[]>> => {
    await delay(250)
    
    const userId = getCurrentUserId()
    const userIndex = mockUsers.findIndex(u => u.id === userId)
    
    if (userIndex >= 0) {
      const addressIndex = mockUsers[userIndex].addresses.findIndex(a => a.id === addressId)
      
      if (addressIndex >= 0) {
        // If setting as default, remove default from other addresses
        if (updates.isDefault) {
          mockUsers[userIndex].addresses.forEach(addr => {
            addr.isDefault = false
          })
        }
        
        mockUsers[userIndex].addresses[addressIndex] = {
          ...mockUsers[userIndex].addresses[addressIndex],
          ...updates
        }
        
        return {
          data: mockUsers[userIndex].addresses,
          message: 'Address updated successfully',
          success: true
        }
      }
    }

    return {
      data: [],
      message: 'Address not found',
      success: false
    }
  },

  // Delete address
  deleteAddress: async (addressId: string): Promise<ApiResponse<Address[]>> => {
    await delay(200)
    
    const userId = getCurrentUserId()
    const userIndex = mockUsers.findIndex(u => u.id === userId)
    
    if (userIndex >= 0) {
      const initialLength = mockUsers[userIndex].addresses.length
      mockUsers[userIndex].addresses = mockUsers[userIndex].addresses.filter(
        addr => addr.id !== addressId
      )
      
      const deleted = mockUsers[userIndex].addresses.length < initialLength
      
      return {
        data: mockUsers[userIndex].addresses,
        message: deleted ? 'Address deleted successfully' : 'Address not found',
        success: deleted
      }
    }

    return {
      data: [],
      message: 'User not found',
      success: false
    }
  },

  // Update user preferences
  updatePreferences: async (preferences: Partial<User['preferences']>): Promise<ApiResponse<User | null>> => {
    await delay(200)
    
    const userId = getCurrentUserId()
    const userIndex = mockUsers.findIndex(u => u.id === userId)
    
    if (userIndex >= 0) {
      mockUsers[userIndex].preferences = {
        ...mockUsers[userIndex].preferences,
        ...preferences
      }
      mockUsers[userIndex].updatedAt = new Date().toISOString()
      
      return {
        data: mockUsers[userIndex],
        message: 'Preferences updated successfully',
        success: true
      }
    }

    return {
      data: null,
      message: 'User not found',
      success: false
    }
  }
}
