import api from "./axiosInstance";

// fungsi untuk mengirim request login user ke backend
export const loginUser = async (payload) => {
  const response = await api.post("/auth/login", payload);
  return response.data;
};
