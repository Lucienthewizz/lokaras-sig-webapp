import express from "express";
import {
  createPlace,
  deletePlace,
  getPlaces,
  getPlaceById,
  updatePlace,
} from "../controllers/placeController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { uploadPlaceImage } from "../middlewares/uploadMiddleware.js";

const router = express.Router();

// Route yang tidak membutuhkan autentikasi
router.get("/", getPlaces);
router.get("/:id", getPlaceById);

// Route yang membutuhkan autentikasi
router.post("/", authMiddleware, uploadPlaceImage.single("image"), createPlace);
router.put(
  "/:id",
  authMiddleware,
  uploadPlaceImage.single("image"),
  updatePlace,
);
router.delete("/:id", authMiddleware, deletePlace);

export default router;
