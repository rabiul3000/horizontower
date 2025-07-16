import axios from "axios";
import { BASE_URL } from "../api/api";
import auth from "../firebase.init";

// Axios instances
export const axiosPublic = axios.create({
  baseURL: BASE_URL,
});

export const axiosSecure = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// Async token injection
axiosSecure.interceptors.request.use(
  async (config) => {
    const user = auth.currentUser;
    if (user) {
      const token = await user.getIdToken();
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

const useAxios = () => {
  return { axiosPublic, axiosSecure };
};

export default useAxios;
