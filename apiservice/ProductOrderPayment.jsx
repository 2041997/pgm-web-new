import axios from "axios";
import { productBaseUrl, coreAssociateBaseUrl } from "../constant/Constant";
import {v4 as uuidv4} from 'uuid'
export const createOrder = async (authorizationToken, products, subtotal, total) => {
  try {
    const data = {
      // razorpay_order_id: `order_${(Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2)).substring(0, 14)}`,
      razorpay_order_id: uuidv4(),
      quantity: "1",
      totalAmount: total.toString(),
      item: products,
      receipt: uuidv4(),
      other_info: null,
    };
    const response = await axios.post(`${productBaseUrl}/api/orders`, data, {
      headers: {
        Authorization: `Bearer ${authorizationToken}`,
        "Content-Type": "application/json",
        accept: "*/*",
      },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    } else {
      return { success: false, error: error.message };
    }
  }
};

const getOrderStatus= (status) =>  {
  switch (status) {
    case "PENDING":
      return "PENDING";
    case "CONFIRMED":
      return "CONFIRMED";
    case "CANCELLED":
      return "CANCELLED";
    case "FAILED":
      return "FAILED";
    default:
      return status;
  }
}

export const createPayment = async (authorizationToken, data) => {
  try {
    const datas = {
            // razorpay_signature: data.signature,
            amount: data.order.totalAmount,
            mode:"ONLINE",
            type:"PURCHASE",
            transactionId:data.paymentId,
            status: getOrderStatus(data.order.status),
            others:{data},
            orderId: data.order.id,
            recieverId: null,
            senderId: data.order.userId,
            bankDetailId: null,
            currency: "INR",
    }
    const response = await axios.post(
      `${productBaseUrl}/api/payments`,datas,
      {
        headers: {
          Authorization: `Bearer ${authorizationToken}`,
          "Content-Type": "application/json",
          accept: "*/*",
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    } else {
      return { success: false, error: error.message };
    }
  }
};
