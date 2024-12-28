// filepath: /e:/MERN/expense-tracker/client/src/axiosInstance.ts
import axios from 'axios';
import { toast } from 'react-toastify';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    // Show loader
    document.body.classList.add('loading-indicator');
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    // Hide loader
    document.body.classList.remove('loading-indicator');
    return response;
  },
  (error) => {
    // Hide loader
    document.body.classList.remove('loading-indicator');
    if (error.response && error.response.data) {
      toast.error(error.response.data.message || 'An error occurred');
    } else {
      toast.error('An error occurred');
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;