import { productClient, paymentClient } from './httpClient';
import { 
  ApiResponse, 
  Order, 
  CreateOrderRequest, 
  PaymentData 
} from '@/types/api';
import { API_ENDPOINTS } from '@/constants/api';

export class OrderService {
  /**
   * Create a new order
   */
  static async createOrder(orderData: CreateOrderRequest, token?: string): Promise<ApiResponse<Order>> {
    const config = {
      headers: {
        accept: '*/*',
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    };

    return productClient.post<Order>(API_ENDPOINTS.ORDERS, orderData, config);
  }

  /**
   * Get order by ID
   */
  static async getOrderById(orderId: string | number, token?: string): Promise<ApiResponse<Order>> {
    const config = {
      headers: {
        accept: '*/*',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    };

    return productClient.get<Order>(API_ENDPOINTS.ORDER_BY_ID(orderId), config);
  }

  /**
   * Get orders by user ID
   */
  static async getOrdersByUserId(userId: string | number, token?: string): Promise<ApiResponse<Order[]>> {
    const config = {
      headers: {
        accept: '*/*',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    };

    return productClient.get<Order[]>(`${API_ENDPOINTS.ORDERS}/user/${userId}`, config);
  }

  /**
   * Get all orders (Admin only)
   */
  static async getAllOrders(token?: string): Promise<ApiResponse<Order[]>> {
    const config = {
      headers: {
        accept: '*/*',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    };

    return productClient.get<Order[]>(API_ENDPOINTS.ORDERS, config);
  }

  /**
   * Update order status
   */
  static async updateOrderStatus(
    orderId: string | number, 
    status: 'PENDING' | 'CONFIRMED' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED',
    token?: string
  ): Promise<ApiResponse<Order>> {
    const config = {
      headers: {
        accept: '*/*',
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    };

    return productClient.patch<Order>(API_ENDPOINTS.ORDER_BY_ID(orderId), { status }, config);
  }

  /**
   * Cancel order
   */
  static async cancelOrder(orderId: string | number, token?: string): Promise<ApiResponse<Order>> {
    const config = {
      headers: {
        accept: '*/*',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    };

    return productClient.patch<Order>(API_ENDPOINTS.ORDER_BY_ID(orderId), { status: 'CANCELLED' }, config);
  }

  /**
   * Process order payment
   */
  static async processPayment(paymentData: PaymentData, token?: string): Promise<ApiResponse<{
    paymentId: string;
    status: string;
    transactionId: string;
  }>> {
    const config = {
      headers: {
        accept: '*/*',
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    };

    return paymentClient.post<{
      paymentId: string;
      status: string;
      transactionId: string;
    }>(API_ENDPOINTS.ORDER_PAYMENT, paymentData, config);
  }

  /**
   * Verify payment status
   */
  static async verifyPayment(paymentId: string, token?: string): Promise<ApiResponse<{
    status: string;
    transactionId: string;
    amount: number;
  }>> {
    const config = {
      headers: {
        accept: '*/*',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    };

    return paymentClient.get<{
      status: string;
      transactionId: string;
      amount: number;
    }>(`${API_ENDPOINTS.ORDER_PAYMENT}/${paymentId}/verify`, config);
  }

  /**
   * Get order tracking information
   */
  static async getOrderTracking(orderId: string | number, token?: string): Promise<ApiResponse<{
    trackingNumber: string;
    status: string;
    estimatedDelivery: string;
    trackingHistory: Array<{
      status: string;
      timestamp: string;
      location?: string;
      description: string;
    }>;
  }>> {
    const config = {
      headers: {
        accept: '*/*',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    };

    return productClient.get<{
      trackingNumber: string;
      status: string;
      estimatedDelivery: string;
      trackingHistory: Array<{
        status: string;
        timestamp: string;
        location?: string;
        description: string;
      }>;
    }>(`${API_ENDPOINTS.ORDER_BY_ID(orderId)}/tracking`, config);
  }

  /**
   * Request order return
   */
  static async requestReturn(
    orderId: string | number, 
    reason: string, 
    items: Array<{ productId: number; quantity: number }>,
    token?: string
  ): Promise<ApiResponse<{
    returnId: string;
    status: string;
  }>> {
    const config = {
      headers: {
        accept: '*/*',
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    };

    return productClient.post<{
      returnId: string;
      status: string;
    }>(`${API_ENDPOINTS.ORDER_BY_ID(orderId)}/return`, { reason, items }, config);
  }

  /**
   * Get order invoice
   */
  static async getOrderInvoice(orderId: string | number, token?: string): Promise<ApiResponse<{
    invoiceUrl: string;
    invoiceNumber: string;
  }>> {
    const config = {
      headers: {
        accept: '*/*',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    };

    return productClient.get<{
      invoiceUrl: string;
      invoiceNumber: string;
    }>(`${API_ENDPOINTS.ORDER_BY_ID(orderId)}/invoice`, config);
  }
}

// Export individual functions for backward compatibility
export const createOrder = OrderService.createOrder;
export const getOrderById = OrderService.getOrderById;
export const getOrdersByUserId = OrderService.getOrdersByUserId;
export const getAllOrders = OrderService.getAllOrders;
export const updateOrderStatus = OrderService.updateOrderStatus;
export const cancelOrder = OrderService.cancelOrder;
export const processPayment = OrderService.processPayment;
export const verifyPayment = OrderService.verifyPayment;
export const getOrderTracking = OrderService.getOrderTracking;
export const requestReturn = OrderService.requestReturn;
export const getOrderInvoice = OrderService.getOrderInvoice;
