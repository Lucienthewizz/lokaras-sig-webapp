import { signInWithEmailPassword } from "../services/authService.js";
import { successResponse, errorResponse } from "../utils/response.js";
import { validateLogin } from "../validations/authValidation.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";
import { MESSAGE } from "../constants/message.js";

// Controller untuk login user dengan email dan password
export const login = async (req, res) => {
  try {
    const validateErrors = validateLogin(req.body);

    if (validateErrors.length > 0) {
      return errorResponse(
        res,
        HTTP_STATUS.BAD_REQUEST,
        MESSAGE.GENERAL.VALIDATION_FAILED,
        validateErrors,
      );
    }

    const { email, password } = req.body;
    const { data, error } = await signInWithEmailPassword(email, password);

    if (error) {
      return errorResponse(
        res,
        HTTP_STATUS.UNAUTHORIZED,
        MESSAGE.AUTH.LOGIN_FAILED,
        error.message,
      );
    }

    return successResponse(res, HTTP_STATUS.OK, MESSAGE.AUTH.LOGIN_SUCCESS, {
      session: data.session,
      user: data.user,
    });
  } catch (error) {
    return errorResponse(
      res,
      HTTP_STATUS.INTERNAL_SERVER_ERROR,
      MESSAGE.GENERAL.INTERNAL_SERVER_ERROR,
      error.message,
    );
  }
};
