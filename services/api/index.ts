// Export all services
export * from './httpClient';
export * from './productService';
export * from './userService';
export * from './cartService';
export * from './orderService';
export * from './wishlistService';
export * from './storeService';
export * from './galleryService';
export * from './contactService';
export * from './awardService';

// Re-export main service classes
export { ProductService } from './productService';
export { UserService } from './userService';
export { CartService } from './cartService';
export { OrderService } from './orderService';
export { WishlistService } from './wishlistService';
export { StoreService } from './storeService';
export { GalleryService } from './galleryService';
export { ContactService } from './contactService';
export { AwardService } from './awardService';

// Export HTTP clients
export { 
  productClient, 
  userClient, 
  coreAssociateClient, 
  paymentClient,
  tokenManager 
} from './httpClient';
