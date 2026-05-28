import api from "./axiosInstance";

// Get all places
export const getPlaces = async () => {
  const response = await api.get("/places");
  return response.data;
};

// Get place by id
export const getPlaceById = async (id) => {
  const response = await api.get(`/places/${id}`);
  return response.data;
};

// Create place
export const createPlace = async (formData) => {
  const response = await api.post(`/places`, formData);
  return response.data;
};

// Update place
export const updatePlace = async (id, formData) => {
  const response = await api.put(`/places/${id}`, formData);
  return response.data;
};

// Delete place
export const deletePlace = async (id) => {
  const response = await api.delete(`/places/${id}`);
  return response.data;
};
