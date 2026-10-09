import axiosInstance from "../axiosCalls/axios";

export const getAdminOverview = async (signal) => {
  const response = await axiosInstance.get("/admin/overview", { signal });
  return response.data;
};

export const getAdminProducts = async (signal) => {
  const response = await axiosInstance.get("/admin/products", { signal });
  return response.data;
};

export const getAdminOrders = async (signal) => {
  const response = await axiosInstance.get("/admin/orders", { signal });
  return response.data;
};

export const createAdminProduct = async (product) => {
  const response = await axiosInstance.post("/products", product);
  return response.data;
};

export const updateAdminProduct = async (id, product) => {
  const response = await axiosInstance.patch(`/products/${id}`, product);
  return response.data;
};

export const deleteAdminProduct = async (id) => {
  const response = await axiosInstance.delete(`/products/${id}`);
  return response.data;
};

export const updateAdminOrderStatus = async (id, status) => {
  const response = await axiosInstance.patch(`/admin/orders/${id}/status`, { status });
  return response.data;
};
