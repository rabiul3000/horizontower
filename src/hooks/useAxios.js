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
  query: {
    email: auth?.currentUser?.email,
  },
});

// Async token injection
axiosSecure.interceptors.request.use(
  async (config) => {
    const user = auth.currentUser;
    const email = auth.currentUser.email;
    if (user) {
      if (email) {
        const token = await user.getIdToken();
        config.headers.Authorization = `Bearer ${token}`;
        config.params = {
          ...config.params,
          email,
        };
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

const useAxios = () => {
  return { axiosPublic, axiosSecure };
};

export default useAxios;
