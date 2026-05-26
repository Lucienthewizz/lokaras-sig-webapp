import {
  findAllPlaces,
  findPlaceById,
  insertPlace,
  editPlaceById,
  removePlaceById,
} from "../services/placeService.js";
import { successResponse, errorResponse } from "../utils/response.js";
import {
  validateCreatePlace,
  validateUpdatePlace,
} from "../validations/placeValidation.js";

// Controller untuk get all places
export const getPlaces = async (req, res) => {
  try {
    const { data, error } = await findAllPlaces();

    if (error) {
      return errorResponse(
        res,
        500,
        "Gagal mengambil data places",
        error.message,
      );
    }

    return successResponse(res, 200, "Berhasil mengambil data places", data);
  } catch (error) {
    return errorResponse(res, 500, "Internal server error", error.message);
  }
};

// Controller untuk get place by id
export const getPlaceById = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await findPlaceById(id);

    if (error) {
      return errorResponse(res, 400, "Gagal mengambil place", error.message);
    }

    if (!data) {
      return errorResponse(res, 404, "Place tidak ditemukan");
    }

    return successResponse(res, 200, "Berhasil mengambil place", data);
  } catch (error) {
    return errorResponse(res, 500, "Internal server error", error.message);
  }
};

// Controller untuk create place
export const createPlace = async (req, res) => {
  try {
    const validationErrors = validateCreatePlace(req.body);

    if (validationErrors.length > 0) {
      return errorResponse(res, 400, "Validasi gagal", validationErrors);
    }

    const payload = {
      ...req.body,
      latitude: Number(req.body.latitude),
      longitude: Number(req.body.longitude),
      created_by: req.user.id,
    };

    const { data, error } = await insertPlace(payload);

    if (error) {
      return errorResponse(res, 400, "Gagal menambahkan place", error.message);
    }

    return successResponse(res, 201, "Berhasil menambahkan place", data);
  } catch (error) {
    return errorResponse(res, 500, "Internal server error", error.message);
  }
};

// Controller untuk update place by id
export const updatePlace = async (req, res) => {
  try {
    const { id } = req.params;

    const validationErrors = validateUpdatePlace(req.body);

    if (validationErrors.length > 0) {
      return errorResponse(res, 400, "Validasi gagal", validationErrors);
    }

    const payload = {
      ...req.body,
    };

    if (req.body.latitude !== undefined) {
      payload.latitude = Number(req.body.latitude);
    }

    if (req.body.longitude !== undefined) {
      payload.longitude = Number(req.body.longitude);
    }

    const { data, error } = await editPlaceById(id, payload);

    if (error) {
      return errorResponse(res, 400, "Gagal mengupdate place", error.message);
    }

    if (!data) {
      return errorResponse(res, 404, "Place tidak ditemukan");
    }

    return successResponse(res, 200, "Berhasil mengupdate place", data);
  } catch (error) {
    return errorResponse(res, 500, "Internal server error", error.message);
  }
};

// Controller untuk delete place by id
export const deletePlace = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await removePlaceById(id);

    if (error) {
      return errorResponse(res, 400, "Gagal menghapus place", error.message);
    }

    if (!data) {
      return errorResponse(res, 404, "Place tidak ditemukan");
    }

    return successResponse(res, 200, "Berhasil menghapus place", data);
  } catch (error) {
    return errorResponse(res, 500, "Internal server error", error.message);
  }
};
