import axiosInstance from "../axiosCalls/axios";

export const fetchProducts = async (
  { search = "", category = "", sort = "" } = {},
  signal,
) => {
  const response = await axiosInstance.get("/products", {
    params: {
      search: search || undefined,
      category: category || undefined,
      sort: sort || undefined,
    },
    signal,
  });
  return response.data;
};

export const fetchProduct = async (id, signal) => {
  const response = await axiosInstance.get(`/products/${id}`, { signal });
  return response.data.product;
};

export const addToWishlist = async (productId) => {
  const response = await axiosInstance.post(`/wishlist/${productId}`);
  return response.data;
};

export const fetchWishlist = async (signal) => {
  const response = await axiosInstance.get("/wishlist", { signal });
  return response.data;
};

export const removeFromWishlist = async (productId) => {
  const response = await axiosInstance.delete(`/wishlist/${productId}`);
  return response.data;
};
