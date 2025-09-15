import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { ApiResponse, TokenResponse } from '@/types/api';
import { API_BASE_URLS, HTTP_STATUS } from '@/constants/api';

// Token management
class TokenManager {
  private static instance: TokenManager;
  private accessToken: string | null = null;
  private refreshToken: string | null = null;

  static getInstance(): TokenManager {
    if (!TokenManager.instance) {
      TokenManager.instance = new TokenManager();
    }
    return TokenManager.instance;
  }

  setTokens(accessToken: string, refreshToken: string): void {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    
    // Store in localStorage for persistence
    if (typeof window !== 'undefined') {
        // write both the newer keys and the older 'token' key for compatibility
        try {
          if (accessToken) {
            localStorage.setItem('accessToken', accessToken)
            localStorage.setItem('token', accessToken)
          }
          if (refreshToken) {
            localStorage.setItem('refreshToken', refreshToken)
          }
        } catch (e) {
          // ignore storage errors
        }
    }
  }

  getAccessToken(): string | null {
    if (!this.accessToken && typeof window !== 'undefined') {
  // read either the new 'accessToken' key or the legacy 'token' key
  const a = localStorage.getItem('accessToken')
  const t = localStorage.getItem('token')
  this.accessToken = (a && a.trim()) ? a : ((t && t.trim()) ? t : null)
    }
    return this.accessToken;
  }

  getRefreshToken(): string | null {
    if (!this.refreshToken && typeof window !== 'undefined') {
      this.refreshToken = localStorage.getItem('refreshToken');
    }
    return this.refreshToken;
  }

  clearTokens(): void {
    this.accessToken = null;
    this.refreshToken = null;
    
    if (typeof window !== 'undefined') {
        try {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('token');
          localStorage.removeItem('refreshToken');
        } catch (e) {
          // ignore
        }
    }
  }
}

// HTTP Client class
class HttpClient {
  private axiosInstance: AxiosInstance;
  private tokenManager: TokenManager;

  constructor(baseURL: string) {
    this.tokenManager = TokenManager.getInstance();
    
    this.axiosInstance = axios.create({
      baseURL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupRequestInterceptor();
    this.setupResponseInterceptor();
  }

  private setupRequestInterceptor(): void {
    this.axiosInstance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const token = this.tokenManager.getAccessToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error: any) => Promise.reject(error)
    );
  }

  private setupResponseInterceptor(): void {
    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => response,
      async (error: any) => {
        const originalRequest = error.config;

        if (error.response?.status === HTTP_STATUS.UNAUTHORIZED && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const refreshToken = this.tokenManager.getRefreshToken();
            if (refreshToken) {
              const newTokens = await this.refreshAccessToken(refreshToken);
              if (newTokens) {
                this.tokenManager.setTokens(newTokens.accessToken, newTokens.refreshToken);
                originalRequest.headers.Authorization = `Bearer ${newTokens.accessToken}`;
                return this.axiosInstance(originalRequest);
              }
            }
            } catch (refreshError) {
            this.tokenManager.clearTokens();
            // Avoid forcing a full page reload. Update history and emit an event
            // so consuming UI can perform a client-side redirect without reload.
            if (typeof window !== 'undefined') {
              try {
                window.history.replaceState(null, '', '/account/login');
                window.dispatchEvent(new CustomEvent('auth:logged-out'));
              } catch (e) {
                // Fallback to full reload if history API isn't available
                window.location.href = '/account/login';
              }
            }
          }
        }

        return Promise.reject(error);
      }
    );
  }

  private async refreshAccessToken(refreshToken: string): Promise<TokenResponse | null> {
    try {
      const response = await axios.post(`${API_BASE_URLS.USER}/auth/refresh`, {
        refreshToken,
      });
      
      if (response.status === HTTP_STATUS.OK) {
        return response.data;
      }
      return null;
    } catch (error) {
      return null;
    }
  }

  async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<T> = await this.axiosInstance.get(url, config);
      return this.handleResponse(response);
    } catch (error) {
      return this.handleError(error);
    }
  }

  async post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<T> = await this.axiosInstance.post(url, data, config);
      return this.handleResponse(response);
    } catch (error) {
      return this.handleError(error);
    }
  }

  async put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<T> = await this.axiosInstance.put(url, data, config);
      return this.handleResponse(response);
    } catch (error) {
      return this.handleError(error);
    }
  }

  async patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<T> = await this.axiosInstance.patch(url, data, config);
      return this.handleResponse(response);
    } catch (error) {
      return this.handleError(error);
    }
  }

  async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<T> = await this.axiosInstance.delete(url, config);
      return this.handleResponse(response);
    } catch (error) {
      return this.handleError(error);
    }
  }

  private handleResponse<T>(response: AxiosResponse<T>): ApiResponse<T> {
    return {
      success: true,
      data: response.data,
      status: response.status,
    };
  }

  private handleError(error: any): ApiResponse {
    if (error.response) {
      // Server responded with error status
      return {
        success: false,
        error: error.response.data?.message || error.response.statusText || 'Server error',
        status: error.response.status,
      };
    } else if (error.request) {
      // Request was made but no response received
      return {
        success: false,
        error: 'No response from server',
        status: 0,
      };
    } else {
      // Something else happened
      return {
        success: false,
        error: error.message || 'Unknown error',
        status: 0,
      };
    }
  }
}

// Create HTTP client instances
export const productClient = new HttpClient(API_BASE_URLS.PRODUCT);
export const userClient = new HttpClient(API_BASE_URLS.USER);
export const coreAssociateClient = new HttpClient(API_BASE_URLS.CORE_ASSOCIATE);
export const paymentClient = new HttpClient(API_BASE_URLS.PAYMENT);

// Export token manager for external use
export const tokenManager = TokenManager.getInstance();

// Default export
export default HttpClient;
