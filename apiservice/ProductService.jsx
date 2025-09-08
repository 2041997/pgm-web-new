
import axios from "axios";
import { productBaseUrl } from "../constant/Constant";

export async function getProduct() {
     try {
    const response = await axios.get(`${productBaseUrl}/api/products`);
    if (response.status === 200) {
      return { success: true, data: response.data.data };
    } else {
      response.data.errors.forEach((element) => {
        throw new Error(element.errorDescription);
      });
    }
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function createProduct(product, token) {
    try {
        const formData = new FormData();
        formData.append("name", product.name);
        formData.append("description", product.description)
        formData.append("weight", product.weight)
        formData.append("price", product.price)
        formData.append("brandId", product.brandId)
        formData.append("categoryId", product.categoryId)
        formData.append("images", product.images)
        const response = await axios.post(`${productBaseUrl}/api/products`, formData,
         {
            headers: {
                "Content-Type": "multipart/form-data",
                'Authorization': `Bearer ${token}`
              },
        });
        // const data = await response.json(); 
        console.log(response.status)  
        if (response.status === 201) {
            return  { success: true,  data: response.data.data };
        } else {
             response.data.errors.forEach(element => {
                throw new Error(element.errorDescription);
             });           
        }
    } catch (error) {
       return {success: false, error: error.message}
    }
}

export async function createComplexProduct(productData, token) {
  try {
    const formData = new FormData();

    // Append basic product details
    formData.append('brandId', productData.brandId);
    formData.append('points', productData.points);
    formData.append('isVisible', productData.isVisible);
    formData.append('price', productData.price);
    formData.append('name', productData.name);
    formData.append('pointDescription', productData.pointDescription);
    formData.append('isDeleted', productData.isDeleted);
    formData.append('description', productData.description);
    formData.append('categoryId', productData.categoryId);

    // Append complex objects as JSON strings or empty string if not present
    formData.append('sizes', productData.sizes ? JSON.stringify(productData.sizes) : '');
    formData.append('homeEssentialProducts', productData.homeEssentialProducts ? JSON.stringify(productData.homeEssentialProducts) : '');
    formData.append('cosmeticProducts', productData.cosmeticProducts ? JSON.stringify(productData.cosmeticProducts) : '');
    formData.append('medicalDetails', productData.medicalDetails ? JSON.stringify(productData.medicalDetails) : '');
    formData.append('medicalEquipment', productData.medicalEquipment ? JSON.stringify(productData.medicalEquipment) : '');
    formData.append('clothingDetails', productData.clothingDetails ? JSON.stringify(productData.clothingDetails) : '');

    // Append images
    if (productData.images && Array.isArray(productData.images)) {
      productData.images.forEach((file) => {
        formData.append('images', file);
      });
    } else if (productData.images) {
      formData.append('images', productData.images);
    }

    const response = await axios.post(`${productBaseUrl}/api/products`, formData, {
      headers: {
        'accept': 'application/json',
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
      }
    });

    if (response.status === 201) {
      return { success: true, data: response.data.data };
    } else {
      response.data.errors.forEach(element => {
        throw new Error(element.errorDescription);
      });
    }
  } catch (error) {
    return { success: false, error: error.message };
  }
}



export async function updateProduct(productItem, token) {
  try {
    const formData = new FormData();

    // Append basic product details
    formData.append('brandId', productItem.brandId);
    formData.append('points', productItem.points);
    formData.append('isVisible', productItem.isVisible);
    formData.append('price', productItem.price);
    formData.append('name', productItem.name);
    formData.append('pointDescription', productItem.pointDescription);
    formData.append('isDeleted', productItem.isDeleted);
    formData.append('description', productItem.description);
    formData.append('categoryId', productItem.categoryId);

    // Append complex objects as JSON strings or empty string if not present
    formData.append('sizes', productItem.sizes ? JSON.stringify(productItem.sizes) : '');
    formData.append('homeEssentialProducts', productItem.homeEssentialProducts ? JSON.stringify(productItem.homeEssentialProducts) : '');
    formData.append('cosmeticProducts', productItem.cosmeticProducts ? JSON.stringify(productItem.cosmeticProducts) : '');
    formData.append('medicalDetails', productItem.medicalDetails ? JSON.stringify(productItem.medicalDetails) : '');
    formData.append('medicalEquipment', productItem.medicalEquipment ? JSON.stringify(productItem.medicalEquipment) : '');
    formData.append('clothingDetails', productItem.clothingDetails ? JSON.stringify(productItem.clothingDetails) : '');

    // Append images
    if (productItem.images && Array.isArray(productItem.images)) {
      productItem.images.forEach((file) => {
        formData.append('images', file);
      });
    } else if (productItem.images) {
      formData.append('images', productItem.images);
    }

    const response = await axios.put(
      `${productBaseUrl}/api/products/${productItem.id}`,
      formData,
      {
        headers: {
          'accept': 'application/json',
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
      }
    );

    if (response.status === 200) {
      return { success: true, data: response.data.data };
    } else {
      response.data.errors.forEach((element) => {
        throw new Error(element.errorDescription);
      });
    }
  } catch (error) {
    return { success: false, error: error.message };
  }
}



export async function deleteProduct (productId, token){
    try {
        const response = await axios.delete(`${productBaseUrl}/api/products/${productId}`, {
          headers: {
            'accept': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
    
        if (response.status === 200) {
          return { success: true, data: response.data };
        } else {
            response.data.errors.forEach(element => {
                throw new Error(element.errorDescription);
             });      
        }
      } catch (error) {
        return { success: false, error: error.message };
      }
}

export async function getProductCategoryWise(categoryName){
  try {
    const response = await axios.get(`${productBaseUrl}/api/products/category/${categoryName}`);
    if (response.status === 200) {
      return { success: true, data: response.data.data };
    } else {
      response.data.errors.forEach((element) => {
        throw new Error(element.errorDescription);
      });
    }
  } catch (error) {
    if (error.response && error.response.status === 400) {
      // Handle 400 error gracefully
      return { success: false, error: 'No products found for this category', data: [] };
    } else {
      // Handle other errors
      return { success: false, error: error.message, data: [] };
    }
  }
}


export async function getProductById(productId) {
    try {
        const response = await axios.get(`${productBaseUrl}/api/products/${productId}`, {
          headers: {
            'accept': 'application/json',
          }
        });
        if (response.status === 200) {
          return { success: true, data: response.data.data };
        } else {
            response.data.errors.forEach(element => {
                throw new Error(element.errorDescription);
             });      
        }
      } catch (error) {
        return { success: false, error: error.message };
      }
}
