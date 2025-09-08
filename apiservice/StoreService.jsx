
import axios from "axios";
import { productBaseUrl } from "../constant/Constant";

export async function createStoreData(storeData, token) {
   console.log(storeData)
   const formData={
    productId: storeData.productId,
    quantity: parseInt(storeData.quantity),
    alertQuantity: parseInt(storeData.alertQuantity)
   }
    // const formData = new FormData();
    // formData.append("productId", storeData.productId);
    // formData.append("quantity", parseInt(storeData.quantity))
    // formData.append("alertQuantity", parseInt(storeData.alertQuantity))
    try {
        const response = await axios.post(`${productBaseUrl}/api/stores`, formData, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          return { success: true, data: response.data };
        } else {
            response.data.errors.forEach(element => {
                throw new Error(element.errorDescription);
             });         }
      } catch (error) {
        // Extract error message from response if available
        const errorMessage = error.response?.data?.message || error.message;
        return { success: false, error: errorMessage };
      }
    }

    export async function getStoreData() {
        try {
          const response = await axios.get(`${productBaseUrl}/api/stores/`);
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

    export async function updateStoreData(storeData, token){
        const formData ={quantity : parseInt(storeData.quantity)}
        try {
            
            const response = await axios.post(`${productBaseUrl}/api/stores/${storeData.id}`, formData, {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
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
    export async function addStoreData(storeData, token){
        const formData ={quantity : parseInt(storeData.quantity)}
        try {
            
            const response = await axios.post(`${productBaseUrl}/api/stores/add/${storeData.id}`, formData, {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
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

    export async function deleteStoreData(id, token) {
        console.log(id)
        try {
            const response = await axios.delete(`${productBaseUrl}/api/stores/${id}`, {
              headers: {
                'accept': 'application/json',
                'Authorization': `Bearer ${token}`,
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

    // export async function createStoreDataWithAuth(storeData, token) {
    //   const formData = {
    //     productId: storeData.productId,
    //     quantity: parseInt(storeData.quantity),
    //   };
    //   try {
    //     const response = await axios.post(`${productBaseUrl}/api/stores`, formData, {
    //       headers: {
    //         'Content-Type': 'application/json',
    //         'Authorization': `Bearer ${token}`,
    //       },
    //     });

    //     if (response.status === 200) {
    //       return { success: true, data: response.data };
    //     } else {
    //       response.data.errors.forEach(element => {
    //         throw new Error(element.errorDescription);
    //       });
    //     }
    //   } catch (error) {
    //     const errorMessage = error.response?.data?.message || error.message;
    //     return { success: false, error: errorMessage };
    //   }
    // }
