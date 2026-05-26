import multer from "multer";

// Konfigurasi storage untuk menyimpan file di memori
const storage = multer.memoryStorage();

// Konfigurasi multer untuk upload gambar tempat
export const uploadPlaceImage = multer({
  storage,
  limits: {
    fileSize: 2 * 1024 * 1024, // 2MB
  },
  fileFilter: (req, file, cb) => {
    const allowedMimeTypes = ["image/jpeg", "image/png", "image/webp"];

    if (!allowedMimeTypes.includes(file.mimetype)) {
      return cb(new Error("File harus berupa gambar JPG, PNG, atau WEBP"));
    }
    cb(null, true);
  },
});
