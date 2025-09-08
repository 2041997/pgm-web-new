# Mock API Documentation

This document explains the mock API system implemented for the e-commerce frontend application.

## 🎯 Overview

The project includes a comprehensive mock API system that simulates a real e-commerce backend. This allows for:
- Frontend development without backend dependency
- Realistic data and user interactions
- Easy migration to real backend APIs
- Testing and demonstration capabilities

## 📂 Mock API Structure

### Core API Services

1. **Product API** (`/services/mockProductApi.ts`)
   - Product listing with filters and pagination
   - Product search functionality
   - Single product details
   - Featured and related products

2. **Cart API** (`/services/mockCartApi.ts`)
   - Add/remove items from cart
   - Update quantities
   - Cart persistence via localStorage
   - Cart totals calculation

3. **Order API** (`/services/mockOrderApi.ts`)
   - Order creation and management
   - Order status tracking
   - Order history
   - Order cancellation

4. **User API** (`/services/mockUserApi.ts`)
   - User profile management
   - Address management
   - User preferences
   - Authentication simulation

5. **Category API** (`/services/mockCategoryApi.ts`)
   - Category hierarchy
   - Brand listings
   - Price ranges for filtering

### Data Sources

All mock data is stored in `/data/mockData.ts`:
- Products with variants and inventory
- Categories and subcategories
- User profiles and addresses
- Order history and tracking
- Reviews and ratings

## 🔧 Configuration

### Environment Variables

```env
# Use mock APIs (true for development, false for production)
NEXT_PUBLIC_USE_MOCK_API=true

# Real backend URL (for future integration)
NEXT_PUBLIC_API_BASE_URL=https://your-backend-api.com/api
```

### API Switching

The main API service (`/services/index.ts`) automatically switches between mock and real APIs based on the `NEXT_PUBLIC_USE_MOCK_API` environment variable.

## 📝 Usage Examples

### Product Listing

```typescript
import { productApi } from '@/services'

// Get products with filters
const response = await productApi.getProducts({
  categories: ['smartphones'],
  priceRange: { min: 100, max: 1000 },
  sortBy: 'price_asc',
  page: 1,
  limit: 12
})

if (response.success) {
  console.log(response.data) // Array of products
}
```

### Cart Management

```typescript
import { cartApi } from '@/services'

// Add item to cart
await cartApi.addToCart({
  productId: 'p1',
  price: 1199,
  title: 'iPhone 15 Pro Max',
  image: '/products/iphone-15-pro-1.jpg',
  selectedVariants: {
    color: 'Titanium Blue',
    storage: '256GB'
  }
})

// Get cart contents
const cartResponse = await cartApi.getCart()
```

### Order Creation

```typescript
import { orderApi } from '@/services'

// Create new order
const orderResponse = await orderApi.createOrder({
  shippingAddress: userAddress,
  billingAddress: userAddress,
  paymentMethod: 'Credit Card ending in 4242',
  promoCode: 'SAVE10'
})
```

## 🔄 Backend Integration

### Migration Strategy

1. **Environment Switch**: Change `NEXT_PUBLIC_USE_MOCK_API` to `false`
2. **API URL Configuration**: Set `NEXT_PUBLIC_API_BASE_URL` to your backend
3. **Interface Compatibility**: Mock APIs use the same TypeScript interfaces as planned for real APIs
4. **Minimal Code Changes**: Only the service layer needs updates

### Real API Implementation Template

```typescript
// Example real API service implementation
export const createRealProductApi = (apiClient: ApiClient) => ({
  getProducts: async (filters: ProductFilters) => {
    const params = new URLSearchParams(filters as any)
    return apiClient.get<ApiResponse<Product[]>>(`/products?${params}`)
  },
  
  getProduct: async (id: string) => {
    return apiClient.get<ApiResponse<Product>>(`/products/${id}`)
  },
  
  // ... other methods
})
```

## 🛠️ Mock API Features

### Realistic Behavior
- **Network Delays**: Simulated API response times (100-500ms)
- **Error Handling**: Proper error responses and status codes
- **Data Validation**: Input validation and error messages
- **State Management**: Persistent cart and user data

### Advanced Features
- **Pagination**: Full pagination support with page/limit parameters
- **Filtering**: Complex filtering with multiple criteria
- **Search**: Full-text search across products
- **Sorting**: Multiple sorting options
- **Inventory Management**: Stock tracking and validation

### Data Persistence
- **Cart Data**: Stored in localStorage, persists across sessions
- **User Preferences**: Saved in localStorage
- **Search History**: Maintained in sessionStorage
- **Order History**: Mock order tracking and status updates

## 📊 Mock Data Overview

### Products (5 sample products)
- Electronics: iPhone, Samsung Galaxy, MacBook
- Footwear: Nike Air Max
- Accessories: Wireless Headphones

### Categories
- Electronics (Smartphones, Laptops, Tablets, Accessories)
- Clothing (Men's, Women's, Kids', Shoes)
- Home & Garden (Furniture, Decor, Kitchen, Garden)
- Books (Fiction, Non-Fiction, Educational, Children's)

### Users
- Sample user with complete profile and address
- Multiple addresses with default selection
- User preferences and notification settings

### Orders
- Complete order lifecycle simulation
- Order status tracking
- Payment and shipping information

## 🔧 Customization

### Adding New Products
1. Add product data to `mockProducts` array in `/data/mockData.ts`
2. Include all required fields: id, title, price, images, etc.
3. Add appropriate category and variant information

### Extending Categories
1. Update `mockCategories` in `/data/mockData.ts`
2. Maintain hierarchical structure with parent/child relationships
3. Update category API if needed

### Custom API Endpoints
1. Create new service file in `/services/`
2. Follow existing pattern with delay simulation
3. Export from main `/services/index.ts`
4. Add TypeScript interfaces in `/types/`

## 🚀 Benefits

### Development
- **No Backend Dependency**: Start frontend development immediately
- **Realistic Testing**: Full user flow testing with mock data
- **Offline Development**: Work without internet connection
- **Rapid Prototyping**: Quick feature validation and testing

### Demo & Presentation
- **Complete Functionality**: All features work with realistic data
- **Performance Testing**: Test with various data loads
- **User Experience**: Complete e-commerce flow demonstration

### Future Integration
- **Seamless Migration**: Easy switch to real backend
- **Contract Testing**: Validate API contracts and interfaces
- **Error Handling**: Test error scenarios and edge cases

## ⚠️ Limitations

- **Data Persistence**: Mock data resets on page refresh (except cart/localStorage)
- **Real-time Updates**: No websocket or real-time features
- **Authentication**: Simplified auth simulation
- **File Uploads**: No actual file upload functionality
- **Payment Processing**: Mock payment flow only

## 🔜 Future Enhancements

When integrating with real backend:
1. **Authentication**: Real JWT token management
2. **File Upload**: Product image uploads
3. **Payment Integration**: Stripe/PayPal integration
4. **Real-time Updates**: Websocket for order tracking
5. **Advanced Search**: Elasticsearch integration
6. **Analytics**: Real analytics and tracking
7. **Email Notifications**: Transactional emails
8. **Inventory Sync**: Real-time inventory updates

This mock API system provides a solid foundation for frontend development while maintaining a clear path to real backend integration.
