import { signInWithEmailPassword } from "../services/authService.js";
import { successResponse, errorResponse } from "../utils/response.js";

// Controller untuk login user dengan email dan password
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { data, error } = await signInWithEmailPassword(email, password);

    if (error) {
      return errorResponse(res, 401, "Login gagal", error.message);
    }

    return successResponse(res, 200, "Login berhasil", {
      session: data.session,
      user: data.user,
    });
  } catch (error) {
    return errorResponse(res, 500, "Internal server error", error.message);
  }
};
