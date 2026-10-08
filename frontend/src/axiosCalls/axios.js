// baseUrl -
// Header - ; content-type - json
// cookies

import axios from "axios";

const apiUrl =
  import.meta.env.VITE_API_URL ||
  `${window.location.protocol}//${window.location.hostname}:5050`;

const axiosInstance = axios.create({
  baseURL: apiUrl.replace(/\/$/, ""),
  withCredentials: true,
  headers: {
    "Content-type": "application/json",
  },
});

export default axiosInstance;
