// axiosClient.js
import axios from "axios";
import { API_BASE_URL } from "../constants/endpoints";

const axiosClient = axios.create({
  baseURL: API_BASE_URL,
});

axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); 

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config; 
  },
  (error) => {
    return Promise.reject(error); 
  }
);

axiosClient.interceptors.response.use(
  (response) => {
    return response; 
  },
  (error) => {
    return Promise.reject(error); 
  }
);

export default axiosClient;
