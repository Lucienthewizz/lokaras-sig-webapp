import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { supabase } from "./config/supabase.js"

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
  res.send("LOKARAS API is running")
})

app.get("/api/places", async (req, res) => {
  const { data, error } = await supabase
    .from("places")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    return res.status(500).json({
      message: "Gagal mengambil data places",
      error: error.message,
    })
  }

  res.json({
    message: "Berhasil mengambil data places",
    data,
  })
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`LOKARAS API running on port ${PORT}`)
})