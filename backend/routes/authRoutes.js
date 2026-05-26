import express from "express";
import { login } from "../controllers/authController.js";

const router = express.Router();

// Route untuk login user dengan email dan password
router.post("/login", login);

export default router;
