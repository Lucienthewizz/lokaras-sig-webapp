// Validasi Create Place
export const validateCreatePlace = (body) => {
  const errors = [];

  const {
    name,
    category,
    description,
    address,
    latitude,
    longitude,
    image_url,
    opening_hours,
    phone,
    rating,
    price_level,
    is_halal,
    is_featured,
    marker_icon,
  } = body;

  // Validasi Nama Place
  if (!name || name.trim() === "") {
    errors.push("Nama tempat wajib diisi");
  }
  // Validasi Kategori
  if (!category || category.trim() === "") {
    errors.push("Kategori wajib diisi");
  }
  // Validasi Alamat
  if (!address || address.trim() === "") {
    errors.push("Alamat wajib diisi");
  }
  // Validasi Latitude
  if (latitude === undefined || latitude === null || latitude === "") {
    errors.push("Latitude wajib diisi");
  }
  // Validasi Longitude
  if (longitude === undefined || longitude === null || longitude === "") {
    errors.push("Longitude wajib diisi");
  }
  // Validasi Koordinat Latitude
  if (latitude !== undefined && latitude !== null && latitude !== "") {
    const lat = Number(latitude);

    if (Number.isNaN(lat)) {
      errors.push("Latitude harus berupa angka");
    } else if (lat < -90 || lat > 90) {
      errors.push("Latitude harus berada di antara -90 sampai 90");
    }
  }
  // Validasi Koordinat Longitude
  if (longitude !== undefined && longitude !== null && longitude !== "") {
    const lng = Number(longitude);

    if (Number.isNaN(lng)) {
      errors.push("Longitude harus berupa angka");
    } else if (lng < -180 || lng > 180) {
      errors.push("Longitude harus berada di antara -180 sampai 180");
    }
  }

  // Validasi Deskripsi
  if (description && description.length > 500) {
    errors.push("Deskripsi maksimal 500 karakter");
  }
  // Validasi Image URL
  if (image_url && typeof image_url !== "string") {
    errors.push("Image URL harus berupa teks");
  }
  // Validasi Opening Hours
  if (opening_hours && typeof opening_hours !== "string") {
    errors.push("Opening hours harus berupa teks");
  }
  // Validasi Nomor Telepon
  if (phone && typeof phone !== "string") {
    errors.push("Nomor telepon harus berupa teks");
  }
  // Validasi Marker Icon
  if (marker_icon && typeof marker_icon !== "string") {
    errors.push("Marker icon harus berupa teks");
  }
  // Validasi Rating
  if (rating !== undefined && rating !== null && rating !== "") {
    const ratingNumber = Number(rating);

    if (Number.isNaN(ratingNumber)) {
      errors.push("Rating harus berupa angka");
    } else if (ratingNumber < 0 || ratingNumber > 5) {
      errors.push("Rating harus berada di antara 0 sampai 5");
    }
  }
  // Validasi Harga Level
  if (price_level !== undefined && price_level !== null && price_level !== "") {
    const priceLevelNumber = Number(price_level);

    if (!Number.isInteger(priceLevelNumber)) {
      errors.push("Price level harus berupa angka bulat");
    } else if (priceLevelNumber < 1 || priceLevelNumber > 4) {
      errors.push("Price level harus berada di antara 1 sampai 4");
    }
  }

  // Validasi boolean-like
  const isBooleanLike = (value) => {
    return typeof value === "boolean" || value === "true" || value === "false";
  };

  // Validasi is_halal
  if (is_halal !== undefined && !isBooleanLike(is_halal)) {
    errors.push("Is halal harus bernilai true atau false");
  }

  // Validasi is_featured
  if (is_featured !== undefined && !isBooleanLike(is_featured)) {
    errors.push("Is featured harus bernilai true atau false");
  }

  return errors;
};

// Validasi untuk update place
export const validateUpdatePlace = (body) => {
  const errors = [];

  const {
    name,
    category,
    description,
    address,
    latitude,
    longitude,
    image_url,
    opening_hours,
    phone,
    rating,
    price_level,
    is_halal,
    is_featured,
    marker_icon,
  } = body;

  // Validasi untuk update place
  if (name !== undefined && name.trim() === "") {
    errors.push("Nama tempat tidak boleh kosong");
  }
  // Validasi untuk update category
  if (category !== undefined && category.trim() === "") {
    errors.push("Kategori tidak boleh kosong");
  }
  // Validasi untuk update address
  if (address !== undefined && address.trim() === "") {
    errors.push("Alamat tidak boleh kosong");
  }
  // Validasi untuk update latitude
  if (latitude !== undefined && latitude !== null && latitude !== "") {
    const lat = Number(latitude);

    if (Number.isNaN(lat)) {
      errors.push("Latitude harus berupa angka");
    } else if (lat < -90 || lat > 90) {
      errors.push("Latitude harus berada di antara -90 sampai 90");
    }
  }
  // Validasi untuk update longitude
  if (longitude !== undefined && longitude !== null && longitude !== "") {
    const lng = Number(longitude);

    if (Number.isNaN(lng)) {
      errors.push("Longitude harus berupa angka");
    } else if (lng < -180 || lng > 180) {
      errors.push("Longitude harus berada di antara -180 sampai 180");
    }
  }

  // Validasi untuk update description
  if (description && description.length > 500) {
    errors.push("Deskripsi maksimal 500 karakter");
  }
  // Validasi untuk update image_url
  if (
    image_url !== undefined &&
    image_url !== null &&
    typeof image_url !== "string"
  ) {
    errors.push("Image URL harus berupa teks");
  }

  // Validasi untuk update opening_hours
  if (
    opening_hours !== undefined &&
    opening_hours !== null &&
    typeof opening_hours !== "string"
  ) {
    errors.push("Opening hours harus berupa teks");
  }

  // Validasi untuk update phone
  if (phone !== undefined && phone !== null && typeof phone !== "string") {
    errors.push("Nomor telepon harus berupa teks");
  }

  // Validasi untuk update marker_icon
  if (
    marker_icon !== undefined &&
    marker_icon !== null &&
    typeof marker_icon !== "string"
  ) {
    errors.push("Marker icon harus berupa teks");
  }

  // Validasi untuk update rating
  if (rating !== undefined && rating !== null && rating !== "") {
    const ratingNumber = Number(rating);

    if (Number.isNaN(ratingNumber)) {
      errors.push("Rating harus berupa angka");
    } else if (ratingNumber < 0 || ratingNumber > 5) {
      errors.push("Rating harus berada di antara 0 sampai 5");
    }
  }

  // Validasi untuk update price_level
  if (price_level !== undefined && price_level !== null && price_level !== "") {
    const priceLevelNumber = Number(price_level);

    if (!Number.isInteger(priceLevelNumber)) {
      errors.push("Price level harus berupa angka bulat");
    } else if (priceLevelNumber < 1 || priceLevelNumber > 4) {
      errors.push("Price level harus berada di antara 1 sampai 4");
    }
  }

  // Validasi boolean-like
  const isBooleanLike = (value) => {
    return typeof value === "boolean" || value === "true" || value === "false";
  };

  // Validasi untuk update is_halal
  if (is_halal !== undefined && !isBooleanLike(is_halal)) {
    errors.push("Is halal harus bernilai true atau false");
  }
  // Validasi untuk update is_featured
  if (is_featured !== undefined && !isBooleanLike(is_featured)) {
    errors.push("Is featured harus bernilai true atau false");
  }

  return errors;
};
