import { getUserByToken } from "../services/authService.js";
import { errorResponse } from "../utils/response.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";
import { MESSAGE } from "../constants/message.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return errorResponse(
        res,
        HTTP_STATUS.UNAUTHORIZED,
        MESSAGE.AUTH.TOKEN_NOT_FOUND,
      );
    }

    const token = authHeader.replace("Bearer ", "");

    const {
      data: { user },
      error,
    } = await getUserByToken(token);

    if (error || !user) {
      const isTokenExpired = error?.message?.toLowerCase().includes("expired");

      return errorResponse(
        res,
        HTTP_STATUS.UNAUTHORIZED,
        isTokenExpired
          ? MESSAGE.AUTH.TOKEN_EXPIRED
          : MESSAGE.AUTH.TOKEN_INVALID,
      );
    }

    req.user = user;
    next();
  } catch (error) {
    return errorResponse(
      res,
      HTTP_STATUS.INTERNAL_SERVER_ERROR,
      MESSAGE.GENERAL.INTERNAL_SERVER_ERROR,
      error.message,
    );
  }
};
