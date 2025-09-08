import axios from "axios";
import { coreAssociateBaseUrl } from "../constant/Constant";


export const getAccounts = async (token) => {
    
    try {
        const response = await axios.get(`${coreAssociateBaseUrl}/api/pgm-accounts/accounts`, {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        console.log("errr", response)
        return response.data;
    } catch (error) {
        throw error;
    }
};

 export const getTransactions = async (token, accountId) => {
    try {
        const response = await axios.get(`${coreAssociateBaseUrl}/api/pgm-accounts/transactions/${accountId}`, {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};
