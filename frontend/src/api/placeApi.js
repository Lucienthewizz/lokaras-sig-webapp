import api from "./axiosInstance";

// fungsi untuk mengambil semua data tempat dari backend
export const getPlaces = async () => {
  const response = await api.get("/places");
  return response.data;
};

// fungsi untuk mengambil detail tempat berdasarkan id
export const getPlaceById = async (id) => {
  const response = await api.get(`/places/${id}`);
  return response.data;
};

// fungsi untuk menambahkan tempat baru ke backend
export const createPlace = async (formData) => {
  const response = await api.post(`/places`, formData);
  return response.data;
};

// fungsi untuk memperbarui data tempat berdasarkan id
export const updatePlace = async (id, formData) => {
  const response = await api.put(`/places/${id}`, formData);
  return response.data;
};

// fungsi untuk menghapus tempat berdasarkan id
export const deletePlace = async (id) => {
  const response = await api.delete(`/places/${id}`);
  return response.data;
};
