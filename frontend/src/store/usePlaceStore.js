import { create } from "zustand";
import {
  getPlaces,
  getPlaceById,
  createPlace,
  updatePlace,
  deletePlace,
} from "../api/placeApi";

// fungsi untuk mengambil pesan error API, termasuk detail validasi backend
const getApiErrorMessage = (error, fallbackMessage) => {
  const responseData = error.response?.data;

  if (Array.isArray(responseData?.error)) {
    return responseData.error.join("\n");
  }

  return responseData?.message || fallbackMessage;
};

// fungsi untuk mengelola state place, termasuk fetching, creating, updating, dan deleting places
export const usePlaceStore = create((set, get) => ({
  places: [],
  selectedPlace: null,
  loading: false,
  error: null,

  // fungsi untuk mengambil semua places dari API
  fetchPlaces: async () => {
    try {
      set({ loading: true, error: null });

      const response = await getPlaces();

      set({
        places: response.data,
        loading: false,
        error: null,
      });
    } catch (error) {
      const errorMessage = getApiErrorMessage(
        error,
        "Gagal mengambil data places",
      );

      set({
        loading: false,
        error: errorMessage,
      });
    }
  },

  // fungsi untuk mengambil place berdasarkan ID dari API
  fetchPlaceById: async (id) => {
    try {
      set({ loading: true, error: null });

      const response = await getPlaceById(id);

      set({
        selectedPlace: response.data,
        loading: false,
        error: null,
      });
    } catch (error) {
      const errorMessage = getApiErrorMessage(
        error,
        "Gagal mengambil places by id",
      );

      set({
        loading: false,
        error: errorMessage,
      });

      return null;
    }
  },

  // fungsi untuk mengatur place yang dipilih
  setSelectedPlace: (place) => {
    set({ selectedPlace: place });
  },

  // fungsi untuk menambahkan place baru ke API
  addPlace: async (formData) => {
    try {
      set({ loading: true, error: null });

      const response = await createPlace(formData);

      await get().fetchPlaces();

      set({
        loading: false,
        error: null,
      });

      return {
        success: true,
        message: response.message,
      };
    } catch (error) {
      const errorMessage = getApiErrorMessage(error, "Gagal menambahkan place");

      set({
        loading: false,
        error: errorMessage,
      });

      return {
        success: false,
        message: errorMessage,
      };
    }
  },

  // fungsi untuk mengedit place yang sudah ada di API
  editPlace: async (id, formData) => {
    try {
      set({ loading: true, error: null });

      const response = await updatePlace(id, formData);

      await get().fetchPlaces();

      set((state) => ({
        selectedPlace:
          state.selectedPlace?.id === id ? response.data : state.selectedPlace,
        loading: false,
        error: null,
      }));

      return {
        success: true,
        message: response.message,
      };
    } catch (error) {
      const errorMessage = getApiErrorMessage(error, "Gagal mengupdate place");

      set({
        loading: false,
        error: errorMessage,
      });

      return {
        success: false,
        message: errorMessage,
      };
    }
  },

  // fungsi untuk menghapus place yang sudah ada di API
  removePlace: async (id) => {
    try {
      set({ loading: true, error: null });

      const response = await deletePlace(id);

      await get().fetchPlaces();

      set({
        loading: false,
        error: null,
      });

      return {
        success: true,
        message: response.message,
      };
    } catch (error) {
      const errorMessage = getApiErrorMessage(error, "Gagal menghapus place");

      set({
        loading: false,
        error: errorMessage,
      });

      return {
        success: false,
        message: errorMessage,
      };
    }
  },
}));
