import axios from "axios";

// Membuat instance axios dengan konfigurasi baseURL
const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

// Interceptor untuk menambahkan token ke header request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("lokaras_token");

    // Jika token ada, tambahkan ke header Authorization
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  // Interceptor untuk menangani error request
  (error) => {
    return Promise.reject(error);
  },
);

export default api;
