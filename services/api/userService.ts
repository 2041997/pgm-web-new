import { userClient, coreAssociateClient, tokenManager } from './httpClient';
import { 
  ApiResponse, 
  User, 
  CreateUserRequest, 
  UpdateUserRequest,
  TokenResponse,
  RefreshTokenRequest 
} from '@/types/api';
import { API_ENDPOINTS } from '@/constants/api';

export class UserService {
  /**
   * Get all users (Admin only)
   */
  static async getAllUsers(token?: string): Promise<ApiResponse<User[]>> {
    const config = {
      headers: {
        accept: 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    };

    return userClient.get<User[]>(API_ENDPOINTS.USERS_ALL, config);
  }

  /**
   * Get user by ID
   */
  static async getUserById(id: string | number, token?: string): Promise<ApiResponse<User>> {
    const config = {
      headers: {
        accept: 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    };

    return userClient.get<User>(API_ENDPOINTS.USER_BY_ID(id), config);
  }

  /**
   * Get user requests by ID
   */
  static async getUserRequestById(id: string | number, token?: string): Promise<ApiResponse<any>> {
    const config = {
      headers: {
        accept: 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    };

    return coreAssociateClient.get<any>(API_ENDPOINTS.USER_REQUESTS(id), config);
  }

  /**
   * Create a new user
   */
  static async createUser(user: CreateUserRequest, token?: string): Promise<ApiResponse<User>> {
    const config = {
      ...(token && { headers: { Authorization: `Bearer ${token}` } }),
    };

    return userClient.post<User>('/admin/users', user, config);
  }

  /**
   * Update user
   */
  static async updateUser(user: UpdateUserRequest, token?: string): Promise<ApiResponse<User>> {
    const config = {
      ...(token && { headers: { Authorization: `Bearer ${token}` } }),
    };

    return userClient.put<User>(API_ENDPOINTS.USER_BY_ID(user.id), user, config);
  }

  /**
   * Delete user
   */
  static async deleteUser(id: string | number, token?: string): Promise<ApiResponse<void>> {
    const config = {
      ...(token && { headers: { Authorization: `Bearer ${token}` } }),
    };

    return userClient.delete<void>(API_ENDPOINTS.USER_BY_ID(id), config);
  }

  /**
   * Login user
   */
  static async login(usernameOrEmail: string, password: string): Promise<ApiResponse<TokenResponse>> {
    const loginData = { usernameOrEmail, password };
    const response = await userClient.post<TokenResponse>('/auth/login', loginData);
    
    if (response.success && response.data) {
      tokenManager.setTokens(response.data.accessToken, response.data.refreshToken);
    }
    
    return response;
  }

  /**
   * Register user
   */
  static async register(user: CreateUserRequest): Promise<ApiResponse<User>> {
    return userClient.post<User>('/auth/register', user);
  }

  /**
   * Logout user
   */
  static async logout(): Promise<void> {
    tokenManager.clearTokens();
  }

  /**
   * Refresh access token
   */
  static async refreshToken(refreshTokenData: RefreshTokenRequest): Promise<ApiResponse<TokenResponse>> {
    const response = await userClient.post<TokenResponse>('/auth/refresh', refreshTokenData);
    
    if (response.success && response.data) {
      tokenManager.setTokens(response.data.accessToken, response.data.refreshToken);
    }
    
    return response;
  }

  /**
   * Get current user profile
   */
  static async getProfile(token?: string): Promise<ApiResponse<User>> {
    const config = {
      ...(token && { headers: { Authorization: `Bearer ${token}` } }),
    };

    return userClient.get<User>('/auth/profile', config);
  }

  /**
   * Update user profile
   */
  static async updateProfile(user: Partial<User>, token?: string): Promise<ApiResponse<User>> {
    const config = {
      ...(token && { headers: { Authorization: `Bearer ${token}` } }),
    };

    return userClient.put<User>('/auth/profile', user, config);
  }

  /**
   * Change password
   */
  static async changePassword(currentPassword: string, newPassword: string, token?: string): Promise<ApiResponse<void>> {
    const config = {
      ...(token && { headers: { Authorization: `Bearer ${token}` } }),
    };

    const passwordData = { currentPassword, newPassword };
    return userClient.post<void>('/auth/change-password', passwordData, config);
  }

  /**
   * Forgot password
   */
  static async forgotPassword(email: string): Promise<ApiResponse<void>> {
    return userClient.post<void>('/auth/forgot-password', { email });
  }

  /**
   * Reset password
   */
  static async resetPassword(token: string, newPassword: string): Promise<ApiResponse<void>> {
    return userClient.post<void>('/auth/reset-password', { token, newPassword });
  }

  /**
   * Verify email
   */
  static async verifyEmail(token: string): Promise<ApiResponse<void>> {
    return userClient.post<void>('/auth/verify-email', { token });
  }

  /**
   * Resend verification email
   */
  static async resendVerificationEmail(email: string): Promise<ApiResponse<void>> {
    return userClient.post<void>('/auth/resend-verification', { email });
  }

  
  /**
   * Verify OTP (used for registration/phone/email verification)
   */
  static async verifyOtp(payload: { destination: string; otp: string; type?: string }): Promise<ApiResponse<TokenResponse | any>> {
    const response = await userClient.post<TokenResponse | any>('/auth/verify-otp', payload, {
      headers: { accept: 'application/json', 'Content-Type': 'application/json' },
    });

    // If backend returns tokens on successful verify, persist them
    if (response && response.success && response.data && (response.data.accessToken || response.data.refreshToken)) {
      // Try to set tokens if shape matches TokenResponse
      const accessToken = (response.data as TokenResponse).accessToken;
      const refreshToken = (response.data as TokenResponse).refreshToken;
      if (accessToken || refreshToken) tokenManager.setTokens(accessToken, refreshToken);
    }

    return response;
  }

  /**
   * Send OTP to destination (email or phone)
   */
  static async sendOtp(destination: string): Promise<ApiResponse<any>> {
    return userClient.post<any>('/auth/send-otp', { destination }, {
      headers: { accept: 'application/json', 'Content-Type': 'application/json' },
    });
  }
}

// Export individual functions for backward compatibility
export const getAllUser = UserService.getAllUsers;
export const getUserById = UserService.getUserById;
export const getUserRequestById = UserService.getUserRequestById;
export const createUser = UserService.createUser;
export const updateUser = UserService.updateUser;
export const deleteUser = UserService.deleteUser;
export const login = UserService.login;
export const register = UserService.register;
export const logout = UserService.logout;
export const refreshToken = UserService.refreshToken;
export const getProfile = UserService.getProfile;
export const updateProfile = UserService.updateProfile;
export const changePassword = UserService.changePassword;
export const forgotPassword = UserService.forgotPassword;
export const resetPassword = UserService.resetPassword;
export const verifyEmail = UserService.verifyEmail;
export const resendVerificationEmail = UserService.resendVerificationEmail;
export const verifyOtp = UserService.verifyOtp;
export const sendOtp = UserService.sendOtp;
