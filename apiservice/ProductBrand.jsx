
import axios from "axios";
import { productBaseUrl } from "../constant/Constant";

export async function getProductBrand() {
  try {
    const response = await axios.get(`${productBaseUrl}/api/brands`);
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
export async function createProductBrand(productBrand, token) {
    try {
        const formData = new FormData();
        formData.append("name", productBrand.name);
        formData.append("description", productBrand.description)
        formData.append("brandSlogan", productBrand.brandSlogan)
        formData.append("brandImage", productBrand.brandImage)
        console.log(formData)
        const response = await axios.post(`${productBaseUrl}/api/brands`, formData,
         {
            headers: {
                "Content-Type": "multipart/form-data",
                'Authorization': `Bearer ${token}`
              },
        });   
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
export async function updateProductBrnad(brandId, brandData, token) {
    console.log("id", brandId)
    console.log( brandData)

    try {
        const formData = new FormData();
        formData.append('name', brandData.name);
        formData.append('description', brandData.description);
        formData.append('brandSlogan', brandData.brandSlogan);
        if (brandData.brandImage) {
          formData.append('brandImage', brandData.brandImage);
        }
    
        const response = await axios.put(`${productBaseUrl}/api/brands/${brandId}`, formData, {
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

export async function deleteProductBrand(brandId, token) {

    try {
        const response = await axios.delete(`${productBaseUrl}/api/brands/${brandId}`, {
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
