import { productBaseUrl } from "../constant/Constant";
const getOrdersbyUserId = async (userId, token) => {
  try {
    const response = await fetch(
      `${productBaseUrl}/api/orders/user/${userId}`,
      {
        method: "GET",
        headers: {
          Accept: "*/*",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch user orders');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching user orders:', error.message);
    return { success: false, error: error.message };
  }
};


const getAllOrders = async (token) => {
  try {
    const response = await fetch(`${productBaseUrl}/api/orders`, {
      method: "GET",
      headers: {
        Accept: "*/*",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch orders');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching orders:', error.message);
    return { success: false, error: error.message };
  }
};

const updateOrderStatus = async (order, actionType, selectedReason, token) => {
  try {
    const orderStatus = actionType === 'cancel' ? 'CANCELLED' : 'RETURN_PENDING';
    const orderStatusMessage = actionType === 'cancel' ? 'cancelled' : 'returned requested';
    const response = await fetch(
          `${productBaseUrl}/api/orders/${order.id}/status`,
          {
            method: 'PUT',
            headers: {
              Accept: "*/*",
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              status: orderStatus,
              message: orderStatusMessage,
              data: { reason: selectedReason }
          })
      }
    );

    if (!response.ok) {
      throw new Error('Failed to update order status');
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating order status:', error.message);
    return { success: false, error: error.message };
  }
};

const getOrderStats = async (token) => {
  try {
    const response = await fetch(`${productBaseUrl}/api/orders/stats`, {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch order statistics');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching order statistics:', error.message);
    return { success: false, error: error.message };
  }
};

export { getOrdersbyUserId, getAllOrders, updateOrderStatus, getOrderStats };