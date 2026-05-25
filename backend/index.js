import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import placeRoutes from "./routes/placeRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("LOKARAS API is running");
});

app.use("/api/auth", authRoutes);
app.use("/api/places", placeRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`LOKARAS API running on port ${PORT}`);
});
