// Utility untuk mengirim response sukses ke client
export const successResponse = (
  res,
  statusCode = 200,
  message = "Success",
  data = null,
) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

// Utility untuk mengirim response error ke client
export const errorResponse = (
  res,
  statusCode = 500,
  message = "Internal Server Error",
  error = null,
) => {
  return res.status(statusCode).json({
    success: false,
    message,
    error,
  });
};
