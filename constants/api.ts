// API Configuration Constants
// Updated with actual PGM Business API URLs

const URL_PORT = 4000;

// Base URLs for different services
export const frontendBaseUrl = "https://pgmbusiness.com";
export const userBaseUrl = "https://user.pgmbusiness.com";
export const productBaseUrl = "https://product.pgmbusiness.com";
export const coreAssociateBaseUrl = "https://core.pgmbusiness.com";

// API Base URLs Configuration
export const API_BASE_URLS = {
  PRODUCT: process.env.NEXT_PUBLIC_PRODUCT_API_URL || productBaseUrl,
  USER: process.env.NEXT_PUBLIC_USER_API_URL || userBaseUrl,
  CORE_ASSOCIATE: process.env.NEXT_PUBLIC_CORE_ASSOCIATE_API_URL || coreAssociateBaseUrl,
  PAYMENT: process.env.NEXT_PUBLIC_PAYMENT_API_URL || coreAssociateBaseUrl,
} as const;

// API Endpoints
export const API_ENDPOINTS = {
  // Product endpoints
  PRODUCTS: '/api/products',
  PRODUCT_BY_ID: (id: string | number) => `/api/products/${id}`,
  PRODUCT_BRANDS: '/api/products/brands',
  PRODUCT_CATEGORIES: '/api/products/categories',
  
  // User endpoints
  USERS_ALL: '/admin/users/all',
  USER_BY_ID: (id: string | number) => `/admin/users/${id}`,
  USER_REQUESTS: (id: string | number) => `/requests/user/${id}`,
  
  // Cart endpoints
  CART: '/api/cart',
  CART_BY_USER: (userId: string | number) => `/api/cart/user/${userId}`,
  
  // Order endpoints
  ORDERS: '/api/orders',
  ORDER_BY_ID: (id: string | number) => `/api/orders/${id}`,
  ORDER_PAYMENT: '/api/orders/payment',
  
  // Wishlist endpoints
  WISHLIST: '/api/wishlist',
  WISHLIST_BY_USER: (userId: string | number) => `/api/wishlist/user/${userId}`,
  
  // Store endpoints
  STORES: '/api/stores',
  STORE_BY_ID: (id: string | number) => `/api/stores/${id}`,
  
  // Gallery endpoints
  GALLERY: '/api/gallery',
  
  // Contact endpoints
  CONTACT: '/api/contact',
  
  // Awards endpoints
  AWARDS: '/api/awards',
} as const;

// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
} as const;
