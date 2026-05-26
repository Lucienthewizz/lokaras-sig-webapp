import { getUserByToken } from "../services/authService.js";
import { errorResponse } from "../utils/response.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return errorResponse(res, 401, "Token tidak ditemukan");
    }

    const token = authHeader.replace("Bearer ", "");

    const {
      data: { user },
      error,
    } = await getUserByToken(token);

    if (error || !user) {
      return errorResponse(res, 401, "Token tidak valid");
    }

    req.user = user;

    next();
  } catch (error) {
    return errorResponse(res, 500, "Internal server error", error.message);
  }
};
