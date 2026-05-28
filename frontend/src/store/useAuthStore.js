import { create } from "zustand";
import { loginUser } from "../api/authApi";

// fungsi untuk mendapatkan token dari localStorage
const getStoredToken = () => {
  return localStorage.getItem("lokaras_token");
};

// fungsi untuk mendapatkan user dari localStorage
const getStoredUser = () => {
  const user = localStorage.getItem("lokaras_user");
  return user ? JSON.parse(user) : null;
};

// fungsi untuk mengelola autentikasi user
export const useAuthStore = create((set) => ({
  user: getStoredUser(),
  token: getStoredToken(),
  isAuthenticated: !!getStoredToken(),
  loading: false,
  error: null,

  // fungsi untuk login user
  login: async (payload) => {
    try {
      set({ loading: true, error: null });

      const response = await loginUser(payload);

      const token = response.data.session.access_token;
      const user = response.data.user;

      localStorage.setItem("lokaras_token", token);
      localStorage.setItem("lokaras_user", JSON.stringify(user));

      set({
        user,
        token,
        isAuthenticated: true,
        loading: false,
        error: null,
      });

      return {
        success: true,
        message: response.message,
      };
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Login gagal";

      set({
        loading: false,
        error: errorMessage,
        isAuthenticated: false,
      });

      return {
        success: false,
        message: errorMessage,
      };
    }
  },

  // fungsi untuk logout user
  logout: () => {
    localStorage.removeItem("lokaras_token");
    localStorage.removeItem("lokaras_user");

    set({
      user: null,
      token: null,
      isAuthenticated: false,
      error: null,
    });
  },
}));
