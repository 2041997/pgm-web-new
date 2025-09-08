import { productClient } from './httpClient';
import { 
  ApiResponse, 
  ProductData, 
  CreateProductRequest, 
  UpdateProductRequest,
  Brand,
  CreateBrandRequest,
  Category,
  CreateCategoryRequest 
} from '@/types/api';
import { API_ENDPOINTS } from '@/constants/api';

export class ProductService {
  /**
   * Get all products
   */
  static async getProducts(): Promise<ApiResponse<ProductData[]>> {
    return productClient.get<ProductData[]>(API_ENDPOINTS.PRODUCTS);
  }

  /**
   * Get product by ID
   */
  static async getProductById(id: string | number): Promise<ApiResponse<ProductData>> {
    return productClient.get<ProductData>(API_ENDPOINTS.PRODUCT_BY_ID(id));
  }

  /**
   * Create a new product
   */
  static async createProduct(product: CreateProductRequest, token?: string): Promise<ApiResponse<ProductData>> {
    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('description', product.description);
    formData.append('weight', product.weight.toString());
    formData.append('price', product.price.toString());
    formData.append('brandId', product.brandId.toString());
    formData.append('categoryId', product.categoryId.toString());
    
    // Handle single file or FileList
    if (product.images instanceof FileList) {
      Array.from(product.images).forEach((file) => {
        formData.append('images', file);
      });
    } else {
      formData.append('images', product.images);
    }

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    };

    return productClient.post<ProductData>(API_ENDPOINTS.PRODUCTS, formData, config);
  }

  /**
   * Update an existing product
   */
  static async updateProduct(product: UpdateProductRequest, token?: string): Promise<ApiResponse<ProductData>> {
    const formData = new FormData();
    
    if (product.name) formData.append('name', product.name);
    if (product.description) formData.append('description', product.description);
    if (product.weight) formData.append('weight', product.weight.toString());
    if (product.price) formData.append('price', product.price.toString());
    if (product.brandId) formData.append('brandId', product.brandId.toString());
    if (product.categoryId) formData.append('categoryId', product.categoryId.toString());
    
    if (product.images) {
      if (product.images instanceof FileList) {
        Array.from(product.images).forEach((file) => {
          formData.append('images', file);
        });
      } else {
        formData.append('images', product.images);
      }
    }

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    };

    return productClient.put<ProductData>(API_ENDPOINTS.PRODUCT_BY_ID(product.id), formData, config);
  }

  /**
   * Delete a product
   */
  static async deleteProduct(id: string | number, token?: string): Promise<ApiResponse<void>> {
    const config = {
      ...(token && { headers: { Authorization: `Bearer ${token}` } }),
    };

    return productClient.delete<void>(API_ENDPOINTS.PRODUCT_BY_ID(id), config);
  }

  /**
   * Get all brands
   */
  static async getBrands(): Promise<ApiResponse<Brand[]>> {
    return productClient.get<Brand[]>(API_ENDPOINTS.PRODUCT_BRANDS);
  }

  /**
   * Create a new brand
   */
  static async createBrand(brand: CreateBrandRequest, token?: string): Promise<ApiResponse<Brand>> {
    const formData = new FormData();
    formData.append('name', brand.name);
    if (brand.description) formData.append('description', brand.description);
    if (brand.isActive !== undefined) formData.append('isActive', brand.isActive.toString());
    if (brand.logo) formData.append('logo', brand.logo);

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    };

    return productClient.post<Brand>(API_ENDPOINTS.PRODUCT_BRANDS, formData, config);
  }

  /**
   * Update a brand
   */
  static async updateBrand(id: string | number, brand: Partial<CreateBrandRequest>, token?: string): Promise<ApiResponse<Brand>> {
    const formData = new FormData();
    
    if (brand.name) formData.append('name', brand.name);
    if (brand.description) formData.append('description', brand.description);
    if (brand.isActive !== undefined) formData.append('isActive', brand.isActive.toString());
    if (brand.logo) formData.append('logo', brand.logo);

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    };

    return productClient.put<Brand>(`${API_ENDPOINTS.PRODUCT_BRANDS}/${id}`, formData, config);
  }

  /**
   * Delete a brand
   */
  static async deleteBrand(id: string | number, token?: string): Promise<ApiResponse<void>> {
    const config = {
      ...(token && { headers: { Authorization: `Bearer ${token}` } }),
    };

    return productClient.delete<void>(`${API_ENDPOINTS.PRODUCT_BRANDS}/${id}`, config);
  }

  /**
   * Get all categories
   */
  static async getCategories(): Promise<ApiResponse<Category[]>> {
    return productClient.get<Category[]>(API_ENDPOINTS.PRODUCT_CATEGORIES);
  }

  /**
   * Create a new category
   */
  static async createCategory(category: CreateCategoryRequest, token?: string): Promise<ApiResponse<Category>> {
    const config = {
      ...(token && { headers: { Authorization: `Bearer ${token}` } }),
    };

    return productClient.post<Category>(API_ENDPOINTS.PRODUCT_CATEGORIES, category, config);
  }

  /**
   * Update a category
   */
  static async updateCategory(id: string | number, category: Partial<CreateCategoryRequest>, token?: string): Promise<ApiResponse<Category>> {
    const config = {
      ...(token && { headers: { Authorization: `Bearer ${token}` } }),
    };

    return productClient.put<Category>(`${API_ENDPOINTS.PRODUCT_CATEGORIES}/${id}`, category, config);
  }

  /**
   * Delete a category
   */
  static async deleteCategory(id: string | number, token?: string): Promise<ApiResponse<void>> {
    const config = {
      ...(token && { headers: { Authorization: `Bearer ${token}` } }),
    };

    return productClient.delete<void>(`${API_ENDPOINTS.PRODUCT_CATEGORIES}/${id}`, config);
  }
}

// Export individual functions for backward compatibility
export const getProduct = ProductService.getProducts;
export const getProductById = ProductService.getProductById;
export const createProduct = ProductService.createProduct;
export const updateProduct = ProductService.updateProduct;
export const deleteProduct = ProductService.deleteProduct;
export const getBrands = ProductService.getBrands;
export const createBrand = ProductService.createBrand;
export const updateBrand = ProductService.updateBrand;
export const deleteBrand = ProductService.deleteBrand;
export const getCategories = ProductService.getCategories;
export const createCategory = ProductService.createCategory;
export const updateCategory = ProductService.updateCategory;
export const deleteCategory = ProductService.deleteCategory;
