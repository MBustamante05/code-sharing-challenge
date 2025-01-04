import axios from 'axios';

axios.defaults.withCredentials = true;
const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api/v1/code',
});

export default axiosInstance;