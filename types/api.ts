// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  status?: number;
}

// Nested API Response Type (for APIs that return data.data structure)
export interface NestedApiResponse<T = any> {
  success: boolean;
  data?: {
    data: T;
    message?: string;
    total?: number;
    page?: number;
    limit?: number;
  };
  error?: string;
  message?: string;
  status?: number;
}

export interface ApiError {
  errorDescription: string;
  errorCode?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Product Types
export interface ProductData {
  id: number;
  name: string;
  description: string;
  weight: number;
  price: number;
  brandId: number;
  categoryId: number;
  image: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateProductRequest {
  name: string;
  description: string;
  weight: number;
  price: number;
  brandId: number;
  categoryId: number;
  images: File | FileList;
}

export interface UpdateProductRequest extends Partial<CreateProductRequest> {
  id: number;
}

// Brand Types
export interface Brand {
  id: number;
  name: string;
  description?: string;
  logo?: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateBrandRequest {
  name: string;
  description?: string;
  logo?: File;
  isActive?: boolean;
}

// Category Types
export interface Category {
  id: number;
  name: string;
  description?: string;
  parentId?: number;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateCategoryRequest {
  name: string;
  description?: string;
  parentId?: number;
  isActive?: boolean;
}

// User Types
export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  role: 'USER' | 'ADMIN' | 'ASSOCIATE';
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateUserRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
  role?: 'USER' | 'ADMIN' | 'ASSOCIATE';
}

export interface UpdateUserRequest extends Partial<CreateUserRequest> {
  id: number;
}

// Cart Types
export interface CartItem {
  id: number;
  userId: number;
  productId: number;
  quantity: number;
  price: number;
  product?: ProductData;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateCartItemRequest {
  userId: number;
  productId: number;
  quantity: number;
  price: number;
}

export interface UpdateCartItemRequest {
  id: number;
  quantity: number;
}

// Order Types
export interface Order {
  id: number;
  userId: number;
  totalAmount: number;
  status: 'PENDING' | 'CONFIRMED' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  orderItems: OrderItem[];
  shippingAddress: Address;
  billingAddress?: Address;
  paymentMethod: string;
  paymentStatus: 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED';
  createdAt?: string;
  updatedAt?: string;
}

export interface OrderItem {
  id: number;
  orderId: number;
  productId: number;
  quantity: number;
  price: number;
  product?: ProductData;
}

export interface CreateOrderRequest {
  userId: number;
  orderItems: Omit<OrderItem, 'id' | 'orderId'>[];
  shippingAddress: Address;
  billingAddress?: Address;
  paymentMethod: string;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

// Payment Types
export interface PaymentData {
  orderId: number;
  amount: number;
  paymentMethod: string;
  paymentGateway: string;
  transactionId?: string;
  status: 'PENDING' | 'SUCCESS' | 'FAILED';
}

// Wishlist Types
export interface WishlistItem {
  id: number;
  userId: number;
  productId: number;
  product?: ProductData;
  createdAt?: string;
}

export interface CreateWishlistItemRequest {
  userId: number;
  productId: number;
}

// Store Types
export interface Store {
  id: number;
  name: string;
  description?: string;
  address: Address;
  phone?: string;
  email?: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateStoreRequest {
  name: string;
  description?: string;
  address: Address;
  phone?: string;
  email?: string;
  isActive?: boolean;
}

// Gallery Types
export interface GalleryImage {
  id: number;
  title: string;
  description?: string;
  imageUrl: string;
  category?: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateGalleryImageRequest {
  title: string;
  description?: string;
  image: File;
  category?: string;
  isActive?: boolean;
}

// Contact Types
export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  isRead: boolean;
  createdAt?: string;
}

export interface CreateContactMessageRequest {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Award Types
export interface Award {
  id: number;
  title: string;
  description: string;
  imageUrl?: string;
  year: number;
  category: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateAwardRequest {
  title: string;
  description: string;
  image?: File;
  year: number;
  category: string;
  isActive?: boolean;
}

// Associate Types
export interface Associate {
  id: number;
  userId: number;
  bankAccountId?: number;
  level: number;
  status: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';
  joinDate: string;
  user?: User;
}

export interface AssociateBankAccount {
  id: number;
  associateId: number;
  bankName: string;
  accountNumber: string;
  ifscCode: string;
  accountHolderName: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

// BV Values Types
export interface BVValue {
  id: number;
  productId: number;
  bvPoints: number;
  effectiveDate: string;
  expiryDate?: string;
  isActive: boolean;
  product?: ProductData;
}

// Upload Document Types
export interface UploadDocument {
  id: number;
  userId: number;
  documentType: string;
  fileName: string;
  fileUrl: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  uploadedAt: string;
  reviewedAt?: string;
  reviewedBy?: number;
}

export interface CreateUploadDocumentRequest {
  userId: number;
  documentType: string;
  file: File;
}

// Token Types
export interface TokenResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  tokenType: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}
