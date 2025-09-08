import { productBaseUrl } from '../constant/Constant';

export const addToWishlist = async (productData, token) => {
  try {
    const response = await fetch(`${productBaseUrl}/api/wishlist`, {
      method: 'POST',
      headers: {
        'accept': '*/*',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(productData)
    });
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error adding to wishlist:', error);
    throw error;
  }
};

export const checkIfInWishlist = async (productId, token) => {
  try {
    const response = await fetch(`${productBaseUrl}/api/wishlist`, {
      headers: {
        'accept': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    const data = await response.json();
    return data.data.some(item => item.productId === productId);
  } catch (error) {
    console.error('Error checking wishlist:', error);
    return false;
  }
};

export const getWishlist = async (token) => {
        try {
                const response = await fetch(`${productBaseUrl}/api/wishlist`, {
                        headers: {
                                'accept': 'application/json',
                                'Authorization': `Bearer ${token}`
                        }
                });
                const data = await response.json();
                return data;
        } catch (error) {
                console.error('Error fetching wishlist:', error);
                throw error;
        }
};


export const removeFromWishlist = async (wishlistId, token) => {
        try {
                const response = await fetch(`${productBaseUrl}/api/wishlist/${wishlistId}`, {
                        method: 'DELETE',
                        headers: {
                                'accept': '*/*',
                                'Authorization': `Bearer ${token}`
                        }
                });
                if (!response.ok) {
                        throw new Error('Failed to remove from wishlist');
                }
                return true;
        } catch (error) {
                console.error('Error removing from wishlist:', error);
                throw error;
        }
};