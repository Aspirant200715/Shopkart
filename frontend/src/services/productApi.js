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
