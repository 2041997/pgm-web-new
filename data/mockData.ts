import { Product, Category, User, Order, Review } from '@/types/ecommerce'

export const mockCategories: Category[] = [
  {
    id: '1',
    name: 'Electronics',
    slug: 'electronics',
    description: 'Latest electronic devices and gadgets',
    image: 'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    subcategories: [
      { id: '1-1', name: 'Smartphones', slug: 'smartphones', parentId: '1' },
      { id: '1-2', name: 'Laptops', slug: 'laptops', parentId: '1' },
      { id: '1-3', name: 'Tablets', slug: 'tablets', parentId: '1' },
      { id: '1-4', name: 'Accessories', slug: 'accessories', parentId: '1' },
    ]
  },
  {
    id: '2',
    name: 'Clothing',
    slug: 'clothing',
    description: 'Fashion and apparel for all occasions',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    subcategories: [
      { id: '2-1', name: 'Men\'s Clothing', slug: 'mens-clothing', parentId: '2' },
      { id: '2-2', name: 'Women\'s Clothing', slug: 'womens-clothing', parentId: '2' },
      { id: '2-3', name: 'Kids\' Clothing', slug: 'kids-clothing', parentId: '2' },
      { id: '2-4', name: 'Shoes', slug: 'shoes', parentId: '2' },
    ]
  },
  {
    id: '3',
    name: 'Home & Garden',
    slug: 'home-garden',
    description: 'Everything for your home and garden',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    subcategories: [
      { id: '3-1', name: 'Furniture', slug: 'furniture', parentId: '3' },
      { id: '3-2', name: 'Decor', slug: 'decor', parentId: '3' },
      { id: '3-3', name: 'Kitchen', slug: 'kitchen', parentId: '3' },
      { id: '3-4', name: 'Garden', slug: 'garden', parentId: '3' },
    ]
  },
  {
    id: '4',
    name: 'Books',
    slug: 'books',
    description: 'Books for all ages and interests',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    subcategories: [
      { id: '4-1', name: 'Fiction', slug: 'fiction', parentId: '4' },
      { id: '4-2', name: 'Non-Fiction', slug: 'non-fiction', parentId: '4' },
      { id: '4-3', name: 'Educational', slug: 'educational', parentId: '4' },
      { id: '4-4', name: 'Children\'s Books', slug: 'childrens-books', parentId: '4' },
    ]
  }
]

export const mockProducts: Product[] = [
  {
    id: 'p1',
    title: 'iPhone 15 Pro Max',
    description: 'The most advanced iPhone with titanium design, A17 Pro chip, and professional camera system.',
    category: 'smartphones',
    price: 1199,
    originalPrice: 1299,
    images: [
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.8,
    reviewCount: 256,
    inStock: true,
    stockCount: 45,
    tags: ['premium', 'latest', 'apple', 'smartphone'],
    brand: 'Apple',
    sku: 'APL-IP15PM-256-TBL',
    variants: [
      {
        id: 'color',
        name: 'Color',
        values: ['Titanium Blue', 'Titanium Natural', 'Titanium White', 'Titanium Black'],
        type: 'color'
      },
      {
        id: 'storage',
        name: 'Storage',
        values: ['256GB', '512GB', '1TB'],
        type: 'size'
      }
    ],
    createdAt: '2024-09-01T00:00:00Z',
    updatedAt: '2024-09-07T00:00:00Z'
  },
  {
    id: 'p2',
    title: 'Samsung Galaxy S24 Ultra',
    description: 'Flagship Android phone with S Pen, AI features, and incredible camera capabilities.',
    category: 'smartphones',
    price: 1099,
    images: [
      'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.7,
    reviewCount: 189,
    inStock: true,
    stockCount: 32,
    tags: ['android', 'flagship', 'samsung', 's-pen'],
    brand: 'Samsung',
    sku: 'SAM-S24U-256-BLK',
    variants: [
      {
        id: 'color',
        name: 'Color',
        values: ['Titanium Black', 'Titanium Gray', 'Titanium Violet'],
        type: 'color'
      }
    ],
    createdAt: '2024-08-15T00:00:00Z',
    updatedAt: '2024-09-05T00:00:00Z'
  },
  {
    id: 'p3',
    title: 'MacBook Pro 16"',
    description: 'Powerful laptop with M3 Max chip, stunning Liquid Retina XDR display.',
    category: 'laptops',
    price: 2499,
    originalPrice: 2699,
    images: [
      'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.9,
    reviewCount: 421,
    inStock: true,
    stockCount: 18,
    tags: ['professional', 'apple', 'laptop', 'm3-max'],
    brand: 'Apple',
    sku: 'APL-MBP16-M3MAX-SG',
    variants: [
      {
        id: 'color',
        name: 'Color',
        values: ['Space Gray', 'Silver'],
        type: 'color'
      },
      {
        id: 'memory',
        name: 'Memory',
        values: ['36GB', '64GB', '128GB'],
        type: 'size'
      }
    ],
    createdAt: '2024-07-20T00:00:00Z',
    updatedAt: '2024-09-01T00:00:00Z'
  },
  {
    id: 'p4',
    title: 'Nike Air Max 270',
    description: 'Comfortable running shoes with Max Air unit for exceptional cushioning.',
    category: 'shoes',
    price: 150,
    images: [
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.5,
    reviewCount: 893,
    inStock: true,
    stockCount: 67,
    tags: ['running', 'comfortable', 'nike', 'air-max'],
    brand: 'Nike',
    sku: 'NIKE-AM270-WHT-10',
    variants: [
      {
        id: 'size',
        name: 'Size',
        values: ['7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '12'],
        type: 'size'
      },
      {
        id: 'color',
        name: 'Color',
        values: ['White/Black', 'Black/White', 'Blue/White', 'Red/White'],
        type: 'color'
      }
    ],
    createdAt: '2024-06-10T00:00:00Z',
    updatedAt: '2024-08-15T00:00:00Z'
  },
  {
    id: 'p5',
    title: 'Wireless Noise-Canceling Headphones',
    description: 'Premium over-ear headphones with active noise cancellation and 30-hour battery life.',
    category: 'accessories',
    price: 249,
    originalPrice: 299,
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.6,
    reviewCount: 567,
    inStock: true,
    stockCount: 23,
    tags: ['wireless', 'noise-canceling', 'premium', 'long-battery'],
    brand: 'AudioTech',
    sku: 'ATCH-WH1000XM5-BLK',
    variants: [
      {
        id: 'color',
        name: 'Color',
        values: ['Black', 'Silver', 'Midnight Blue'],
        type: 'color'
      }
    ],
    createdAt: '2024-05-15T00:00:00Z',
    updatedAt: '2024-08-20T00:00:00Z'
  }
]

export const mockUsers: User[] = [
  {
    id: 'u1',
    email: 'john.doe@example.com',
    firstName: 'John',
    lastName: 'Doe',
    phone: '+1234567890',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    addresses: [
      {
        id: 'a1',
        userId: 'u1',
        type: 'home',
        fullName: 'John Doe',
        phone: '+1234567890',
        addressLine1: '123 Main Street',
        addressLine2: 'Apt 4B',
        city: 'New York',
        state: 'NY',
        postalCode: '10001',
        country: 'USA',
        isDefault: true
      }
    ],
    preferences: {
      currency: 'USD',
      language: 'en',
      newsletter: true,
      notifications: {
        email: true,
        sms: false,
        push: true
      }
    },
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-09-01T00:00:00Z'
  }
]

export const mockOrders: Order[] = [
  {
    id: 'o1',
    userId: 'u1',
    items: [
      {
        productId: 'p1',
        quantity: 1,
        price: 1199,
        title: 'iPhone 15 Pro Max',
        image: '/products/iphone-15-pro-1.jpg',
        selectedVariants: {
          color: 'Titanium Blue',
          storage: '256GB'
        }
      }
    ],
    subtotal: 1199,
    tax: 95.92,
    shipping: 0,
    discount: 50,
    total: 1244.92,
    status: 'delivered',
    shippingAddress: {
      id: 'a1',
      userId: 'u1',
      type: 'home',
      fullName: 'John Doe',
      phone: '+1234567890',
      addressLine1: '123 Main Street',
      addressLine2: 'Apt 4B',
      city: 'New York',
      state: 'NY',
      postalCode: '10001',
      country: 'USA',
      isDefault: true
    },
    billingAddress: {
      id: 'a1',
      userId: 'u1',
      type: 'home',
      fullName: 'John Doe',
      phone: '+1234567890',
      addressLine1: '123 Main Street',
      addressLine2: 'Apt 4B',
      city: 'New York',
      state: 'NY',
      postalCode: '10001',
      country: 'USA',
      isDefault: true
    },
    paymentMethod: 'Credit Card ending in 4242',
    createdAt: '2024-08-15T00:00:00Z',
    updatedAt: '2024-08-20T00:00:00Z',
    estimatedDelivery: '2024-08-18T00:00:00Z',
    trackingNumber: 'TRK123456789'
  }
]

export const mockReviews: Review[] = [
  {
    id: 'r1',
    productId: 'p1',
    userId: 'u1',
    userName: 'John D.',
    rating: 5,
    title: 'Amazing phone!',
    comment: 'The camera quality is outstanding and the battery life is incredible. Highly recommended!',
    helpful: 12,
    verified: true,
    createdAt: '2024-08-25T00:00:00Z'
  },
  {
    id: 'r2',
    productId: 'p1',
    userId: 'u2',
    userName: 'Sarah M.',
    rating: 4,
    title: 'Great upgrade',
    comment: 'Coming from iPhone 13, this is a solid upgrade. The titanium build feels premium.',
    helpful: 8,
    verified: true,
    createdAt: '2024-08-20T00:00:00Z'
  },
  {
    id: 'r3',
    productId: 'p1',
    userId: 'u3',
    userName: 'Mike R.',
    rating: 5,
    title: 'Perfect!',
    comment: 'Everything I expected and more. The display is gorgeous and performance is top-notch.',
    helpful: 15,
    verified: true,
    createdAt: '2024-08-18T00:00:00Z'
  },
  {
    id: 'r4',
    productId: 'p2',
    userId: 'u4',
    userName: 'Lisa K.',
    rating: 4,
    title: 'Solid Android choice',
    comment: 'S Pen is incredibly useful for note-taking. Camera is excellent in all lighting conditions.',
    helpful: 6,
    verified: true,
    createdAt: '2024-08-22T00:00:00Z'
  },
  {
    id: 'r5',
    productId: 'p3',
    userId: 'u5',
    userName: 'David L.',
    rating: 5,
    title: 'Best laptop I\'ve owned',
    comment: 'M3 Max chip is incredibly fast. Perfect for video editing and development work.',
    helpful: 20,
    verified: true,
    createdAt: '2024-08-10T00:00:00Z'
  },
  {
    id: 'r6',
    productId: 'p4',
    userId: 'u6',
    userName: 'Emma W.',
    rating: 4,
    title: 'Comfortable running shoes',
    comment: 'Great cushioning and support. Perfect for daily runs and workouts.',
    helpful: 9,
    verified: true,
    createdAt: '2024-08-15T00:00:00Z'
  }
]
