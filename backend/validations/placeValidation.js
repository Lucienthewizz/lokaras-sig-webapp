// Validasi untuk create place
export const validateCreatePlace = (body) => {
  const errors = [];
  const { name, category, description, latitude, longitude } = body;

  // Validasi required fields
  if (!name || name.trim() === "") {
    errors.push("Nama tempat wajib diisi");
  }
  // Validasi category
  if (!category || category.trim() === "") {
    errors.push("Kategori wajib diisi");
  }
  // Validasi latitude
  if (latitude === undefined || latitude === null || latitude === "") {
    errors.push("Latitude wajib diisi");
  }
  // Validasi longitude
  if (longitude === undefined || longitude === null || longitude === "") {
    errors.push("Longitude wajib diisi");
  }
  // Validasi format latitude
  if (latitude !== undefined && latitude !== null && latitude !== "") {
    const lat = Number(latitude);

    if (Number.isNaN(lat)) {
      errors.push("Latitude harus berupa angka");
    } else if (lat < -90 || lat > 90) {
      errors.push("Latitude harus berada di antara -90 sampai 90");
    }
  }

  // Validasi format longitude
  if (longitude !== undefined && longitude !== null && longitude !== "") {
    const lng = Number(longitude);

    if (Number.isNaN(lng)) {
      errors.push("Longitude harus berupa angka");
    } else if (lng < -180 || lng > 180) {
      errors.push("Longitude harus berada di antara -180 sampai 180");
    }
  }

  // Validasi deskripsi maksimal 500 karakter
  if (description && description.length > 500) {
    errors.push("Deskripsi maksimal 500 karakter");
  }

  return errors;
};

// Validasi untuk update place
export const validateUpdatePlace = (body) => {
  const errors = [];
  const { name, category, description, latitude, longitude } = body;

  // Validasi jika field name diisi
  if (name !== undefined && name.trim() === "") {
    errors.push("Nama tempat tidak boleh kosong");
  }
  // Validasi jika field category diisi
  if (category !== undefined && category.trim() === "") {
    errors.push("Kategori tidak boleh kosong");
  }
  // Validasi format latitude jika diisi
  if (latitude !== undefined && latitude !== null && latitude !== "") {
    const lat = Number(latitude);

    if (Number.isNaN(lat)) {
      errors.push("Latitude harus berupa angka");
    } else if (lat < -90 || lat > 90) {
      errors.push("Latitude harus berada di antara -90 sampai 90");
    }
  }

  // Validasi format longitude jika diisi
  if (longitude !== undefined && longitude !== null && longitude !== "") {
    const lng = Number(longitude);

    if (Number.isNaN(lng)) {
      errors.push("Longitude harus berupa angka");
    } else if (lng < -180 || lng > 180) {
      errors.push("Longitude harus berada di antara -180 sampai 180");
    }
  }

  // Validasi deskripsi maksimal 500 karakter
  if (description && description.length > 500) {
    errors.push("Deskripsi maksimal 500 karakter");
  }

  return errors;
};
