import {coreAssociateBaseUrl} from "../constant/Constant";
export const createDistributor = async (token, data) => {
  const response = await fetch(`${coreAssociateBaseUrl}/distributors`, {
    method: 'POST',
    headers: {
      'accept': '*/*',
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  const res = await response.json();

  if (response.ok) {
    return res;
  } else {
    return { data: res};
  }
}


export const getAllDistributors = async (token) => {
  const response = await fetch(`${coreAssociateBaseUrl}/distributors`, {
    method: 'GET',
    headers: {
      'accept': '*/*',
      'Authorization': `Bearer ${token}`,
    },
  });

  const res = await response.json();

  if (response.ok) {
    return res;
  } else {
    return { data: res};
  }
}
