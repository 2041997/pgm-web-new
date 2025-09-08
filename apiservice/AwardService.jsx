import axios from "axios";
import { coreAssociateBaseUrl } from "../constant/Constant";


export const getListofAwards = async (token) => {
    try {
        const response = await axios.get(`${coreAssociateBaseUrl}/awards`, {
            headers: {
                'accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};