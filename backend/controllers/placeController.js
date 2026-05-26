import {
  findAllPlaces,
  findPlaceById,
  insertPlace,
  editPlaceById,
  removePlaceById,
} from "../services/placeService.js";
import {
  createPlacePayload,
  updatePlacePayload,
} from "../utils/placePayload.js";
import { successResponse, errorResponse } from "../utils/response.js";
import {
  validateCreatePlace,
  validateUpdatePlace,
} from "../validations/placeValidation.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";
import { MESSAGE } from "../constants/message.js";
import { uploadImageToStorage } from "../services/storageService.js";

// Controller untuk get all places
export const getPlaces = async (req, res) => {
  try {
    const { data, error } = await findAllPlaces();

    if (error) {
      return errorResponse(
        res,
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        MESSAGE.PLACE.FETCH_FAILED,
        error.message,
      );
    }

    return successResponse(
      res,
      HTTP_STATUS.OK,
      MESSAGE.PLACE.FETCH_SUCCESS,
      data,
    );
  } catch (error) {
    return errorResponse(
      res,
      HTTP_STATUS.INTERNAL_SERVER_ERROR,
      MESSAGE.GENERAL.INTERNAL_SERVER_ERROR,
      error.message,
    );
  }
};

// Controller untuk get place by id
export const getPlaceById = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await findPlaceById(id);

    if (error) {
      return errorResponse(
        res,
        HTTP_STATUS.BAD_REQUEST,
        MESSAGE.PLACE.FETCH_BY_ID_FAILED,
        error.message,
      );
    }

    if (!data) {
      return errorResponse(res, HTTP_STATUS.NOT_FOUND, MESSAGE.PLACE.NOT_FOUND);
    }

    return successResponse(
      res,
      HTTP_STATUS.OK,
      MESSAGE.PLACE.FETCH_BY_ID_SUCCESS,
      data,
    );
  } catch (error) {
    return errorResponse(
      res,
      HTTP_STATUS.INTERNAL_SERVER_ERROR,
      MESSAGE.GENERAL.INTERNAL_SERVER_ERROR,
      error.message,
    );
  }
};

// Controller untuk create place
export const createPlace = async (req, res) => {
  try {
    const validationErrors = validateCreatePlace(req.body);

    if (validationErrors.length > 0) {
      return errorResponse(
        res,
        HTTP_STATUS.BAD_REQUEST,
        MESSAGE.GENERAL.VALIDATION_FAILED,
        validationErrors,
      );
    }

    let imageUrl = req.body.image_url || null;

    if (req.file) {
      const { imageUrl: uploadedImageUrl, error: uploadError } =
        await uploadImageToStorage(req.file);

      if (uploadError) {
        return errorResponse(
          res,
          HTTP_STATUS.BAD_REQUEST,
          MESSAGE.PLACE.UPLOAD_FAILED,
          uploadError.message,
        );
      }
      imageUrl = uploadedImageUrl;
    }

    const payload = createPlacePayload(
      {
        ...req.body,
        image_url: imageUrl,
      },
      req.user.id,
    );

    const { data, error } = await insertPlace(payload);

    if (error) {
      return errorResponse(
        res,
        HTTP_STATUS.BAD_REQUEST,
        MESSAGE.PLACE.CREATE_FAILED,
        error.message,
      );
    }

    return successResponse(
      res,
      HTTP_STATUS.CREATED,
      MESSAGE.PLACE.CREATE_SUCCESS,
      data,
    );
  } catch (error) {
    return errorResponse(
      res,
      HTTP_STATUS.INTERNAL_SERVER_ERROR,
      MESSAGE.GENERAL.INTERNAL_SERVER_ERROR,
      error.message,
    );
  }
};

// Controller untuk update place by id
export const updatePlace = async (req, res) => {
  try {
    const { id } = req.params;

    const validationErrors = validateUpdatePlace(req.body);

    if (validationErrors.length > 0) {
      return errorResponse(
        res,
        HTTP_STATUS.BAD_REQUEST,
        MESSAGE.GENERAL.VALIDATION_FAILED,
        validationErrors,
      );
    }

    let imageUrl = req.body.image_url || null;

    if (req.file) {
      const { imageUrl: uploadedImageUrl, error: uploadError } =
        await uploadImageToStorage(req.file);

      if (uploadError) {
        return errorResponse(
          res,
          HTTP_STATUS.BAD_REQUEST,
          MESSAGE.PLACE.UPLOAD_FAILED,
          uploadError.message,
        );
      }
      imageUrl = uploadedImageUrl;
    }

    const payload = updatePlacePayload({ ...req.body, image_url: imageUrl });

    const { data, error } = await editPlaceById(id, payload);

    if (error) {
      return errorResponse(
        res,
        HTTP_STATUS.BAD_REQUEST,
        MESSAGE.PLACE.UPDATE_FAILED,
        error.message,
      );
    }

    if (!data) {
      return errorResponse(res, HTTP_STATUS.NOT_FOUND, MESSAGE.PLACE.NOT_FOUND);
    }

    return successResponse(
      res,
      HTTP_STATUS.OK,
      MESSAGE.PLACE.UPDATE_SUCCESS,
      data,
    );
  } catch (error) {
    return errorResponse(
      res,
      HTTP_STATUS.INTERNAL_SERVER_ERROR,
      MESSAGE.GENERAL.INTERNAL_SERVER_ERROR,
      error.message,
    );
  }
};

// Controller untuk delete place by id
export const deletePlace = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await removePlaceById(id);

    if (error) {
      return errorResponse(
        res,
        HTTP_STATUS.BAD_REQUEST,
        MESSAGE.PLACE.DELETE_FAILED,
        error.message,
      );
    }

    if (!data) {
      return errorResponse(res, HTTP_STATUS.NOT_FOUND, MESSAGE.PLACE.NOT_FOUND);
    }

    return successResponse(
      res,
      HTTP_STATUS.OK,
      MESSAGE.PLACE.DELETE_SUCCESS,
      data,
    );
  } catch (error) {
    return errorResponse(
      res,
      HTTP_STATUS.INTERNAL_SERVER_ERROR,
      MESSAGE.GENERAL.INTERNAL_SERVER_ERROR,
      error.message,
    );
  }
};
