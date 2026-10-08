import axiosInstance from "../axiosCalls/axios";

export const fetchCart = async (signal) => {
  const response = await axiosInstance.get("/cart", {
    signal,
  });

  return response.data;
};

export const addCartItem = async (productId) => {
  const response = await axiosInstance.post(`/cart/${productId}`);

  return response.data;
};

export const updateCartItem = async (productId, quantity) => {
  const response = await axiosInstance.patch(`/cart/${productId}`, {
    quantity,
  });

  return response.data;
};

export const removeCartItem = async (productId) => {
  const response = await axiosInstance.delete(`/cart/${productId}`);

  return response.data;
};