 import {coreAssociateBaseUrl} from "../constant/Constant";
export const createGallery = async (title, description, images) => {
  const formData = new FormData();
  formData.append('title', title);
  formData.append('description', description);
  images.forEach(image => {
    formData.append('images', image);
  });

  const response = await fetch(`${coreAssociateBaseUrl}/galleries/gallery`, {
    method: 'POST',
    body: formData,
  });

  const data = await response.json();

  return data;
}

export const getGalleries = async () => {
  const response = await fetch(`${coreAssociateBaseUrl}/galleries/gallery`, {
    method: 'GET',
    headers: {
      'accept': 'application/json'
    }
  });

  const data = await response.json();

  return data;
}

export const deleteGallery = async (id) => {
  const response = await fetch(`${coreAssociateBaseUrl}/galleries/gallery/${id}`, {
    method: 'DELETE',
    headers: {
      'accept': '*/*'
    }
  });

  const data = await response.json();
  return data;
}

