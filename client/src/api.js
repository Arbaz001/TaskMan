import axios from 'axios';

const api = axios.create({
  baseURL: 'https://taskman-bf5f.onrender.com/api',
});

// Attach token if present
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api; 