import axios from "axios";
import { getToken } from "./token";

const base_url = import.meta.env.VITE_BASE_URL;

const axiosInstance = axios.create({
  baseURL: base_url,
  withCredentials: true,
});

// attach token automatically
axiosInstance.interceptors.request.use((config) => {
  const token = getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default axiosInstance;