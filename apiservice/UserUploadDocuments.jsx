import axios from "axios";
import {  userBaseUrl } from "../constant/Constant";


export const uploadUserDocument = async (token, documentType, file) => {
    try {
        const formData = new FormData();
        formData.append("documentType", documentType);
        formData.append("documents", file);

        const response = await axios.post(
            `${userBaseUrl}/documents`,
            formData,
            {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                    "accept": "application/json"
                }
            }
        );
        return response.data;
    } catch (error) {
        // Optionally, you can handle/log the error here
        throw error;
    }
};

export const getUserDocuments = async (token, userId) => {
    try {
        const response = await axios.get(
            `${userBaseUrl}/documents/user/${userId}`,
            {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "accept": "application/json"
                }
            }
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deleteUserDocument = async (token, documentId) => {
    try {
        const response = await axios.delete(
            `${userBaseUrl}/documents/${documentId}`,
            {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "accept": "*/*"
                }
            }
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};