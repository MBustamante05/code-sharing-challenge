import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.MODE === "development" ? "http://localhost:5000/api/v1/code" : "/api/v1/code",
  withCredentials: true
});

export default axiosInstance;