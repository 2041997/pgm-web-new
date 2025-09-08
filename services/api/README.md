# API Services Documentation

This directory contains TypeScript API services converted from your original React project's JavaScript files. All services are fully typed and include proper error handling.

## 🗂️ Project Structure

```
services/api/
├── httpClient.ts           # HTTP client with automatic token management
├── productService.ts       # Product CRUD operations
├── userService.ts          # User management & authentication
├── cartService.ts          # Shopping cart operations
├── orderService.ts         # Order management & payment
├── wishlistService.ts      # Wishlist management
├── storeService.ts         # Store location services
├── galleryService.ts       # Gallery image management
├── contactService.ts       # Contact form services
├── awardService.ts         # Awards management
└── index.ts               # Exports all services
```

## 🚀 Quick Start

### 1. Environment Setup

Copy `.env.example` to `.env.local` and configure your API URLs:

```bash
cp .env.example .env.local
```

Update the URLs in `.env.local`:
```env
NEXT_PUBLIC_PRODUCT_API_URL=http://your-product-api-url
NEXT_PUBLIC_USER_API_URL=http://your-user-api-url
NEXT_PUBLIC_CORE_ASSOCIATE_API_URL=http://your-associate-api-url
NEXT_PUBLIC_PAYMENT_API_URL=http://your-payment-api-url
```

### 2. Import Services

```typescript
// Import specific services
import { ProductService, UserService, CartService } from '@/services/api';

// Or import individual functions
import { getProduct, createProduct } from '@/services/api/productService';
import { login, register } from '@/services/api/userService';
```

## 📚 Service Usage Examples

### ProductService

```typescript
import { ProductService } from '@/services/api';

// Get all products
const products = await ProductService.getProducts();
if (products.success) {
  console.log(products.data);
}

// Create a new product
const newProduct = {
  name: 'New Product',
  description: 'Product description',
  price: 99.99,
  weight: 1.5,
  brandId: 1,
  categoryId: 2,
  images: fileInput.files
};

const result = await ProductService.createProduct(newProduct, token);
```

### UserService

```typescript
import { UserService } from '@/services/api';

// Login
const loginResult = await UserService.login('user@example.com', 'password');
if (loginResult.success) {
  // Token is automatically stored
  console.log('Logged in successfully');
}

// Get user profile
const profile = await UserService.getProfile();
```

### CartService

```typescript
import { CartService } from '@/services/api';

// Add item to cart
const cartItem = {
  userId: 1,
  productId: 123,
  quantity: 2,
  price: 99.99
};

const result = await CartService.addToCart(cartItem);

// Get user's cart
const cart = await CartService.getCartByUserId(1);
```

### OrderService

```typescript
import { OrderService } from '@/services/api';

// Create order
const order = {
  userId: 1,
  orderItems: [
    { productId: 123, quantity: 2, price: 99.99 }
  ],
  shippingAddress: {
    street: '123 Main St',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    country: 'USA'
  },
  paymentMethod: 'credit_card'
};

const result = await OrderService.createOrder(order);
```

### WishlistService

```typescript
import { WishlistService } from '@/services/api';

// Add to wishlist
const wishlistItem = {
  userId: 1,
  productId: 123
};

const result = await WishlistService.addToWishlist(wishlistItem);

// Check if item is in wishlist
const check = await WishlistService.isInWishlist(1, 123);
```

## 🔐 Authentication

The HTTP client automatically handles authentication tokens. After login, tokens are stored in localStorage and automatically included in requests.

```typescript
import { UserService, tokenManager } from '@/services/api';

// Login (tokens are automatically stored)
await UserService.login('user@example.com', 'password');

// Manual token management
tokenManager.setTokens('access_token', 'refresh_token');
const token = tokenManager.getAccessToken();
tokenManager.clearTokens();
```

## 🔄 Token Refresh

The HTTP client automatically refreshes expired tokens using the refresh token. If refresh fails, it redirects to the login page.

## 📝 Type Safety

All services are fully typed with TypeScript interfaces:

```typescript
import { ProductData, CreateProductRequest, ApiResponse } from '@/types/api';

const createProduct = async (product: CreateProductRequest): Promise<ApiResponse<ProductData>> => {
  return ProductService.createProduct(product);
};
```

## 🛡️ Error Handling

All services return a consistent `ApiResponse` format:

```typescript
interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  status?: number;
}

// Usage
const result = await ProductService.getProducts();
if (result.success) {
  // Handle success
  console.log(result.data);
} else {
  // Handle error
  console.error(result.error);
}
```

## 🔧 Configuration

### HTTP Client Configuration

The HTTP client is configured with:
- 10-second timeout
- Automatic token injection
- Automatic token refresh
- Request/response interceptors

### Custom Headers

Pass custom headers to any request:

```typescript
const config = {
  headers: {
    'Custom-Header': 'value'
  }
};

const result = await ProductService.getProducts();
```

## 🆕 Migrating from JavaScript

Your original JavaScript services have been converted to TypeScript with the following improvements:

1. **Type Safety**: All parameters and return types are typed
2. **Better Error Handling**: Consistent error response format
3. **Automatic Token Management**: No need to manually pass tokens
4. **Modern Async/Await**: Cleaner async code
5. **Class-based Services**: Better organization and reusability

### Backward Compatibility

Individual function exports are maintained for easy migration:

```typescript
// Old way (still works)
import { getProduct, createProduct } from '@/services/api/productService';

// New way (recommended)
import { ProductService } from '@/services/api';
```

## 📦 Available Services

- **ProductService**: Product CRUD, brands, categories
- **UserService**: Authentication, user management
- **CartService**: Shopping cart operations
- **OrderService**: Order management, payment processing
- **WishlistService**: Wishlist management
- **StoreService**: Store locations, hours, inventory
- **GalleryService**: Image gallery management
- **ContactService**: Contact form submissions
- **AwardService**: Awards and achievements

## 🔍 Debugging

Enable request/response logging by modifying the HTTP client interceptors in `httpClient.ts`.

## 📞 Support

For issues with the API services, check:
1. Environment variables are correctly set
2. API endpoints are accessible
3. Authentication tokens are valid
4. Network connectivity

All services include comprehensive error messages to help with debugging.
