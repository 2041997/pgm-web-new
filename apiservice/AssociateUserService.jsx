
import axios from "axios";
import { coreAssociateBaseUrl } from "../constant/Constant";


export async function getAllAssociateUser(token) {
    try {
      const response = await axios.get(`${coreAssociateBaseUrl}/associates`, {
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

  export async function updateAssociate(token, associateId, updateData) { // Replace with your base URL
  
    try {
      const response = await axios.put(`${coreAssociateBaseUrl}/associates/${associateId}`, updateData, {
        headers: {
          'accept': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
  
      if (response.status === 200) {
        return { success: true, data: response.data };
      } else {
        throw new Error('Failed to update associate');
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  export async function getDownLineAssociateUser(token, id) {
    try {
      const response = await axios.get(`${coreAssociateBaseUrl}/associates//downstream/${id}`, {
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
  export async function getupLineAssociateUser(token, id) {
    try {
      const response = await axios.get(`${coreAssociateBaseUrl}/associates//upstream/${id}`, {
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


  

  export async function getAssociateTree(token, id) {
    try {
      const response = await axios.get(`${coreAssociateBaseUrl}/associates/tree/${id}`, {
        headers: {
          'accept': '*/*',
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.status === 200) {
        return { success: true, data: response.data };
      } else {
        throw new Error('Failed to fetch associate tree');
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  export async function getReferredUsers(token) {
    try {
      const response = await axios.get(`${coreAssociateBaseUrl}/associates/referred/users`, {
        headers: {
          'accept': '*/*',
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.status === 200) {
        return { success: true, data: response.data };
      } else {
        throw new Error('Failed to fetch referred users');
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  export async function updateAssociateParent(token, associateId, parentId, bvValue) {
    try {
      const response = await axios.put(
        `${coreAssociateBaseUrl}/associates/${associateId}/parent`,
        { parentId, bvValue },
        {
          headers: {
            'accept': '/',
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      if (response.status === 200) {
        return { success: true, data: response.data };
      } else {
        throw new Error('Failed to update associate parent');
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  export async function createAssociate(token, associateData) {
    try {
      const response = await axios.post(`${coreAssociateBaseUrl}/associates`, associateData, {
      headers: {
        'accept': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
      });
      if (response.status === 200) {
      return { success: true, data: response.data };
      } else {
      throw new Error(`Failed to create associate: ${response.statusText}`);
      }
    } catch (error) {
      return { success: false, error: error.response?.data?.message || error.message };
    }
    }


    export async function getSelfAssociateData(token) {
      try {
        const response = await axios.get(`${coreAssociateBaseUrl}/associates/self/data`, {
          headers: {
            'accept': '*/*',
            'Authorization': `Bearer ${token}`
          }
        });
        if (response.status === 200) {
          return { success: true, data: response.data };
        } else {
          throw new Error('Failed to fetch self associate data');
        }
      } catch (error) {
        return { success: false, error: error.message };
      }
    }


    export async function getNodePaymentHistory(token, nodeId) {
      try {
        const response = await axios.get(`${coreAssociateBaseUrl}/api/nodePaymentHistory/${nodeId}`, {
          headers: {
            'accept': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        if (response.status === 200) {
          return { success: true, data: response.data };
        } else {
          throw new Error('Failed to fetch node payment history');
        }
      } catch (error) {
        return { success: false, error: error.message };
      }
    }

    export async function getNodePaymentHistorySummary(token, nodeId) {
      try {
        const response = await axios.get(`${coreAssociateBaseUrl}/api/nodePaymentHistory/summary/${nodeId}`, {
          headers: {
            'accept': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        if (response.status === 200) {
          return { success: true, data: response.data };
        } else {
          throw new Error('Failed to fetch node payment history summary');
        }
      } catch (error) {
        return { success: false, error: error.message };
      }
    }

    export async function getAssociateRepurchaseSummary(token, id) {
      try {
        const response = await axios.get(`${coreAssociateBaseUrl}/associates/${id}/repurchase-summary`, {
          headers: {
            'accept': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        if (response.status === 200) {
          return { success: true, data: response.data };
        } else {
          throw new Error('Failed to fetch repurchase summary');
        }
      } catch (error) {
        return { success: false, error: error.message };
      }
    }


    // export async function getAssociateRepurchaseSummaryById(token, associateId) {
    //   console.log("sssssssssssssssssssssss111111111111")
    //   try {
    //     const response = await axios.get(
    //       `${coreAssociateBaseUrl}/associates/${associateId}/repurchase-summary`,
    //       {
    //         headers: {
    //           'accept': 'application/json',
    //           'Authorization': `Bearer ${token}`
    //         }
    //       }
    //     );
    //     console.log("responseddd", response)
    //     if (response.status === 200) {
    //       return { success: true, data: response.data };
    //     } else {
    //       throw new Error('Failed to fetch repurchase summary');
    //     }
    //   } catch (error) {
    //     return { success: false, error: error.message };
    //   }
    // }

    export async function getAssociateReferralByCode(token, referralCode) {
      try {
        const response = await axios.get(
          `${coreAssociateBaseUrl}/associates/referral/${referralCode}`,
          {
            headers: {
              'accept': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          }
        );
        if (response.status === 200) {
          return { success: true, data: response.data };
        } else {
          throw new Error('Failed to fetch associate referral');
        }
      } catch (error) {
        return { success: false, error: error.message };
      }
    }