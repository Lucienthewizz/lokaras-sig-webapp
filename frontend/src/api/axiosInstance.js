import axios from "axios";

// Membuat instance axios dengan konfigurasi baseURL
const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

// fungsi untuk menghapus data session dari localStorage
const clearStoredSession = () => {
  localStorage.removeItem("lokaras_token");
  localStorage.removeItem("lokaras_user");
};

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

// Interceptor untuk menangani response error seperti token expired
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const requestUrl = error.config?.url || "";
    const hasStoredToken = Boolean(localStorage.getItem("lokaras_token"));
    const isLoginRequest = requestUrl.includes("/auth/login");

    if (status === 401 && hasStoredToken && !isLoginRequest) {
      const message =
        error.response?.data?.message ||
        "Sesi login sudah berakhir. Silakan login kembali.";

      clearStoredSession();

      window.dispatchEvent(
        new CustomEvent("lokaras:session-expired", {
          detail: { message },
        }),
      );
    }

    return Promise.reject(error);
  },
);

export default api;
