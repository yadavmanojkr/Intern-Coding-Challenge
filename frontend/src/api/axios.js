import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000", // Backend API base URL
});

// Optional: attach token to every request if needed
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
