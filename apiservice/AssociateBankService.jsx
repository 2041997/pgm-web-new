import axios from 'axios';

import { coreAssociateBaseUrl } from "../constant/Constant";
// import { updateTokenWithRefreshToken } from './RefreshTokenHandler';

export async function getBankDetails(token) {
  try {
    const response = await axios.get(`${coreAssociateBaseUrl}/bankDetails`, {
      headers: {
        'accept': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    // if (response.status === 401) {
    //   const res = await updateTokenWithRefreshToken();
    //   if (res === "") {
    //     return { success: false, error: "Token expired" };
    //   }
    //   return await getBankDetails(localStorage.getItem('token'));
    // }
    if (response.status === 200) {
      return { success: true, data: response.data };
    } else {
      throw new Error('Failed to fetch bank details');
    }
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function addBankDetails(token, bankDetails) {
    console.log("first, token", token, bankDetails)
    try {
      const response = await axios.post(`${coreAssociateBaseUrl}/bankDetails`, bankDetails, {
        headers: {
          'accept': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      if (response.status === 201) { // Assuming 201 Created on successful POST
        return { success: true, data: response.data };
      } else {
        throw new Error('Failed to add bank details');
      }
    } catch (error) {
        console.log("error", error.response?.data?.message)
      return { success: false, error: error.response?.data?.message || error.message };
    }
  }

  export async function updateBankDetails(token, bankId, bankDetails) {
    try {
      const response = await axios.put(`${coreAssociateBaseUrl}/bankDetails/${bankId}`, bankDetails, {
        headers: {
          'accept': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
  
      if (response.status === 200) { // Assuming 200 OK on successful PUT
        return { success: true, data: response.data };
      } else {
        throw new Error('Failed to update bank details');
      }
    } catch (error) {
      return { success: false, error: error.response?.data?.message || error.message };
    }
  }

  
  export async function getBankDetailById(token, id) {
    try {
      const response = await axios.get(`${coreAssociateBaseUrl}/bankDetails/${id}`,{
        headers: {
          'accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      });
  
      if (response.status === 200) {
        return { success: true, data: response.data };
      } else {
        throw new Error('Failed to fetch bank detail');
      }
    } catch (error) {
      return { success: false, error: error.response?.data?.message || error.message };
    }
  }


//   export const getBankDetails = async (token) => {
//   try {
//     const response = await axios.get(`${coreAssociateBaseUrl}/bankDetails`, {
//       headers: {
//         'accept': 'application/json',
//         'Authorization': `Bearer ${token}`,
//       },
//     });

//     console.log('Bank Details:', response.data);
//     return response.data;

//   } catch (error) {
//     console.error('Error fetching bank details:', error.response?.data || error.message);
//     throw error;
//   }
// };
