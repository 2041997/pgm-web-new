import axios from "axios";
import { userBaseUrl } from "../constant/Constant";

export const createContact = async (contactData) => {
    try {
        const response = await axios.post(
            `${userBaseUrl}/contacts`,
            contactData,
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }
        );
        return { data: response.data, error: null };
    } catch (error) {
        if (error.response) {
            // Server responded with a status other than 2xx
            return { data: null, error: error.response.data || error.response.statusText };
        } else if (error.request) {
            // Request was made but no response received
            return { data: null, error: "No response from server." };
        } else {
            // Something else happened
            return { data: null, error: error.message };
        }
    }
};

export const getContacts = async (page = 1, limit = 10, token) => {
    try {
        const response = await axios.get(
            `${userBaseUrl}/contacts`,
            {
                params: { page, limit },
                headers: {
                    'accept': '*/*',
                    'Authorization': `Bearer ${token}`
                }
            }
        );
        return { data: response.data, error: null };
    } catch (error) {
        if (error.response) {
            return { data: null, error: error.response.data || error.response.statusText };
        } else if (error.request) {
            return { data: null, error: "No response from server." };
        } else {
            return { data: null, error: error.message };
        }
    }
};