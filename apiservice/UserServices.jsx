
import axios from "axios";
import { coreAssociateBaseUrl, userBaseUrl } from "../constant/Constant";
import { updateTokenWithRefreshToken } from "./RefreshTokenHandler";

export async function getAllUser(token) {
    
    try {
        const response = await axios.get(`${userBaseUrl}/admin/users/all`, {
            headers: {
              'accept': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          });
      if (response.status === 200) {
        return { success: true, data: response.data };
      } else {
        throw new Error('Failed to fetch users');
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

export async function getUserRequestById(token, id) {
    try {
        const response = await axios.get(`${coreAssociateBaseUrl}/requests/user/${id}`, {
            headers: {
              'accept': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          });
          
            if (response.status === 401) {
      const res = await updateTokenWithRefreshToken();
      if (res === "") {
        return { success: false, error: "Token expired" };
      }
      return await getUserRequestById(token, id);
    }
        if (response.status === 200) {
          return { success: true, data: response.data };
        } else {
            throw new Error('Failed to fetch users');
        }
      } catch (error) {
        return { success: false, error: error.message };
      }
}

export async function getUserRequestByToken(token, source) {
  try {
      const response = await axios.get(`${coreAssociateBaseUrl}/requests/all/${source}`, {
          headers: {
            'accept': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        
      if (response.status === 200) {
        return { success: true, data: response.data };
      } else {
          throw new Error('Failed to fetch users');
      }
    } catch (error) {
      console.error(error);
      return { success: false, error: error.message };
    }
}

export const approvedRequestById = async (token, id) => {
  try {
    const response = await axios.put(
      `${coreAssociateBaseUrl}/requests/${id}/approve`,
      {},
      {
        headers: {
          'accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      }
    );

    if (response.status === 200) {
      return { success: true, data: response.data };
    } else {
      throw new Error('Failed to fetch users');
    }
  } catch (error) {
    console.error(error);
    return { success: false, error: error.message };
  }
}

export const checkTokenVerification = async (token) => {
  try {
    const response = await axios.post(`${userBaseUrl}/auth/verify-token`, { token }, {
      headers: {
        'accept': '*/*',
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 200) {
      return { success: true, data: response.data };
    } else {
      throw new Error('Failed to verify token');
    }
  } catch (error) {
    console.error('Error verifying token:', error.message);
    return { success: false, error: error.message };
  }
}

export async function uploadDocument(formData, token) {
  console.log("service", formData, token)
  try {
    const formDatas = new FormData();
    formDatas.append('documentType', formData.documentType);
    formDatas.append('fileType', formData.fileType);
    formDatas.append('documents', formData.file, formData.file.name);

    const response = await axios.post(`${userBaseUrl}/documents`, formDatas, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log("File uploaded successfully:", response.data);
  } catch (error) {
    console.error("Error uploading file:", error.response ? error.response.data : error.message);
  }
}

export async function getAddresses(token) {
  try {
    const response = await axios.get(`${userBaseUrl}/addresses`, {
      headers: {
        'accept': '*/*',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      return { success: true, data: response.data };
    } else {
      throw new Error('Failed to fetch addresses');
    }
  } catch (error) {
    console.error('Error fetching addresses:', error.message);
    return { success: false, error: error.message };
  }
}

// Token Verification valide or not
export async function verifyToken(token) {
  try {
    const response = await axios.post(`${userBaseUrl}/auth/verify-token`, { token }, {
      headers: {
        'accept': '*/*',
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 200) {
      return { success: true, data: response.data, message: response.message };
    } else {
      throw new Error('Failed to verify token');
    }
  } catch (error) {
    console.error('Error verifying token:', error.message);
    return { success: false, error: error.message };
  }
}

// when token is expire then using refresh token make a new token
export async function refreshToken(refreshToken) {
  try {
    const response = await axios.post(`${userBaseUrl}/auth/refresh-token`, { refreshToken }, {
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 200) {
      return { success: true, data: response.data };
    } else {
      throw new Error('Failed to refresh token');
    }
  } catch (error) {
    console.error('Error refreshing token:', error.message);
    return { success: false, error: error.message };
  }
}

export async function registerUser(userData) {
  try {
    const response = await axios.post(
      `${userBaseUrl}/auth/register`,
      userData,
      {
        headers: {
          'accept': '*/*',
          'Content-Type': 'application/json',
        },
      }
    );
 console.log("ssssss", response)
    if (response.status === 200 || response.status === 201) {
      return { success: true, data: response.data };
    } else {
      console.log("first", response)
      throw new Error('Failed to register user');
    }
  } catch (error) {
    console.log("first", error)
    return { success: false, error: error.response.data.errors || error.response.data };
  }
}

export async function verifyOtp({ destination, otp, type }) {
  try {
    const response = await axios.post(
      `${userBaseUrl}/auth/verify-otp`,
      { destination, otp, type },
      {
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.status === 200) {
      return { success: true, data: response.data };
    } else {
      throw new Error('Failed to verify OTP');
    }
  } catch (error) {
    console.error('Error verifying OTP:', error.message);
    return { success: false, error: error.message };
  }
}

export async function sendOtp(destination) {
  try {
    const response = await axios.post(
      `${userBaseUrl}/auth/send-otp`,
      { destination },
      {
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.status === 200) {
      return { success: true, data: response.data };
    } else {
      throw new Error('Failed to send OTP');
    }
  } catch (error) {
    console.error('Error sending OTP:', error.message);
    return { success: false, error: error.message };
  }
}

export async function updateUserPassword(token, newPassword, confirmPassword) {
  try {
    const response = await axios.put(
      `${userBaseUrl}/user/update/password`,
      { newPassword, confirmPassword },
      {
        headers: {
          'accept': '*/*',
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.status === 200) {
      return { success: true, data: response.data };
    } else {
      throw new Error('Failed to update password');
    }
  } catch (error) {
    console.error('Error updating password:', error.message);
    return { success: false, error: error.message };
  }
}



// For React Native, the image should be a valid file object with uri, name, and type
export const updateUserProfile = async (userId, data, token) => {
  const {
    firstName,
    midName,
    lastName,
    gender,
    dob,
    primaryPhone,
    alternatePhone,
    primaryEmail,
    alternateEmails,
    imageFile, // { uri, name, type }
  } = data;
 console.log("sssssss", imageFile)
  const formData = new FormData();

  formData.append('firstName', firstName || '');
  formData.append('midName', midName || '');
  formData.append('lastName', lastName || '');
  formData.append('gender', gender || '');
  formData.append('dob', dob || '');
  formData.append('primaryPhone', primaryPhone || '');
  formData.append('alternatePhone', alternatePhone || '');
  formData.append('primaryEmail', primaryEmail || '');
  formData.append('alternateEmails', alternateEmails || '');
console.log("first", imageFile.uri, imageFile.name, imageFile.type)

    formData.append('imageUrl', imageFile);
  

  try {
    const response = await axios.patch(
      `https://user.pgmbusiness.com/user/${userId}/partial`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Update Profile Error:', error.response?.data || error.message);
    throw error;
  }
};


