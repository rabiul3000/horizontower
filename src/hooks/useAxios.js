import axios from "axios";
import { BASE_URL } from "../api/api";

// Public instance - no auth, just baseURL
export const axiosPublic = axios.create({
  baseURL: BASE_URL,
});

// Secure instance - adds credentials and Authorization header
export const axiosSecure = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// Optional: Add a request interceptor to inject token
axiosSecure.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access-token"); // or use cookies/sessionStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Optional React wrapper (if you want to return it as a hook)
const useAxios = () => {
  return { axiosPublic, axiosSecure };
};

export default useAxios;
