
import axios from "axios";
import { productBaseUrl } from "../constant/Constant";

export async function createCategoryProducts(categoryData, token) {
      try {
        const formData = new FormData();
        formData.append("name", categoryData.name);
        formData.append("description", categoryData.description)
        formData.append("categoryImage", categoryData.categoryImage)
        const response = await axios.post(`${productBaseUrl}/api/categories`, formData,
         {
            headers: {
                "Content-Type": "multipart/form-data",
                'Authorization': `Bearer ${token}`
              },
        });
        // const data = await response.json();       
        if (response.status === 200) {
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


export async function createCategory(categoryData, token) {
  console.log("first, ",categoryData)
  try {
    const formData = new FormData();
    formData.append("name", categoryData.name);
    // formData.append("categoryUniqueName", categoryData.categoryUniqueName);
    formData.append("description", categoryData.description);
    formData.append("categoryImage", categoryData.categoryImage);
    formData.append("isDeleted", categoryData.isDeleted);
    formData.append("subCategories", categoryData.subCategories);
    

    const response = await axios.post(`${productBaseUrl}/api/categories`, formData, {
      headers: {
        'accept': 'multipart/form-data',
        'Content-Type': 'multipart/form-data',
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
export async function getCategoryProducts() {
    try {
      const response = await axios.get(`${productBaseUrl}/api/categories`);
      if (response.status === 200) {
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
export async function deleteCategoryProducts(categoryId, token){
  console.log(categoryId)
    try {
        const response = await axios.delete(`${productBaseUrl}/api/categories/${categoryId}`, {
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

export async function updateCategoryProducts(categoryId, categoryData, token) {
    try {
      const formData = new FormData();
      formData.append('name', categoryData.name);
      formData.append('description', categoryData.description);
      if (categoryData.categoryImage) {
        formData.append('categoryImage', categoryData.categoryImage);
      }
  
      const response = await axios.put(`${productBaseUrl}/api/categories/${categoryId}`, formData, {
        headers: {
          'accept': 'application/json',
          'Content-Type': 'multipart/form-data',
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
