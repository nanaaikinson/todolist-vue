import type { AxiosInstance } from "axios";
import axios from "axios";

const instance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASEURL as string,
});

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers = {
        Authorization: `Bearer ${accessToken}`,
      };
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export const http = instance;
