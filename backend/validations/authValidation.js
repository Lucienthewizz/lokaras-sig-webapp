// Validasi untuk login
export const validateLogin = (body) => {
  const errors = [];
  const { email, password } = body;

  // Validasi email wajib diisi
  if (!email || email.trim() === "") {
    errors.push("Email wajib diisi");
  }
  // Validasi format email
  if (email && !isValidEmail(email)) {
    errors.push("Format email tidak valid");
  }
  // Validasi password wajib diisi
  if (!password || password.trim() === "") {
    errors.push("Password wajib diisi");
  }
  // Validasi password minimal 6 karakter
  if (password && password.length < 6) {
    errors.push("Password minimal 6 karakter");
  }

  return errors;
};

// Fungsi untuk validasi format email
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
