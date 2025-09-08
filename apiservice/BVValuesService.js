import axios from 'axios';
import { productBaseUrl } from '../constant/Constant';

export const getBVPoints = async (token, userId) => {
  try {
    const response = await axios.get(`${productBaseUrl}/api/bvPoints/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch BV points' };
  }
};
