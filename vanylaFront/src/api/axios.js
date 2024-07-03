import axios from 'axios';
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
    const token = Cookies.get('token');
  if (token) {
    config.headers['x-auth-token'] = token;
  }
  return config;
});

export default api;
