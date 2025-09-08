import axios from "axios";
import { userBaseUrl } from "../constant/Constant";
import { getFromLocalStorage, setToLocalStorage } from "../components/helper/Helper";

export const updateTokenWithRefreshToken = async () => {
  try {
    const refreshtoken = getFromLocalStorage('refreshToken');
    const response = await axios.post(`${userBaseUrl}/auth/refresh-token`, { refreshToken: refreshtoken });
    const { success, data } = response.data;
    if (success) {
      const newToken = data.accessToken;
      setToLocalStorage("token", newToken);
      // localStorage.setItem('token', newToken);
      return newToken;
    } else {
      return "";
    }
  } catch (error) {
    return "";
  }
};

