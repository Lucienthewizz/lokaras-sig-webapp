import api from "./axiosInstance";

// fungsi untuk login user
export const loginUser = async (payload) => {
  const response = await api.post("/auth/login", payload);
  return response.data;
};
