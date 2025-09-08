import axios from "axios";
import { productBaseUrl } from "../constant/Constant";


export const addToCartItem = async (cartData, token) => {
    const url = `${productBaseUrl}/api/cart`;
    const headers = {
        'accept': '*/*',
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    };
    try {
        const response = await axios.post(url, cartData, { headers });
        return { success: true, data: response.data };
    } catch (error) {
        if (error.response) {
            // Server responded with a status other than 2xx
            return { success: false, error: error.response.data, status: error.response.status };
        } else if (error.request) {
            // Request was made but no response received
            return { success: false, error: "No response from server", status: null };
        } else {
            // Something else happened
            return { success: false, error: error.message, status: null };
        }
    }
};

export const getCartByUserId = async (userId, token) => {
    const url = `${productBaseUrl}/api/cart/user/${userId}`;
    const headers = {
        'accept': 'application/json',
        'Authorization': `Bearer ${token}`
    };
    try {
        const response = await axios.get(url, { headers });
        return { success: true, data: response.data };
    } catch (error) {
        if (error.response) {
            return { success: false, error: error.response.data, status: error.response.status };
        } else if (error.request) {
            return { success: false, error: "No response from server", status: null };
        } else {
            return { success: false, error: error.message, status: null };
        }
    }
};

export const deleteCartById = async (cartId, token) => {
    const url = `${productBaseUrl}/api/cart/${cartId}`;
    const headers = {
        'accept': '*/*',
        'Authorization': `Bearer ${token}`
    };
    try {
        const response = await axios.delete(url, { headers });
        return { success: true, data: response.data };
    } catch (error) {
        if (error.response) {
            return { success: false, error: error.response.data, status: error.response.status };
        } else if (error.request) {
            return { success: false, error: "No response from server", status: null };
        } else {
            return { success: false, error: error.message, status: null };
        }
    }
};