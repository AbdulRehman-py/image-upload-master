import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { saveData, pool } from "./src/components/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, error: 'Something went wrong!' });
});

// Save image URL and name
app.post("/api/saveImage", async (req, res, next) => {
  try {
    const { image_url, image_name } = req.body;
    if (!image_url || !image_name) {
      return res.status(400).json({ success: false, error: 'Missing required fields' });
    }
    const savedImage = await saveData(image_url, image_name);
    res.json({ success: true, data: savedImage });
  } catch (err) {
    next(err);
  }
});

// Get all images
app.get("/api/AllImages", async (req, res, next) => {
  try {
    const { rows } = await pool.query(
      "SELECT image_url, image_name FROM shared_images ORDER BY id DESC"
    );
    res.json({ success: true, data: rows });
  } catch (err) {
    next(err);
  }
});

// Get specific image by filename
app.get("/api/getImageUrl", async (req, res, next) => {
  try {
    let { filename } = req.query;
    if (!filename) {
      return res.status(400).json({ success: false, error: 'Filename is required' });
    }
    filename = decodeURIComponent(filename);
    const { rows } = await pool.query(
      "SELECT image_url FROM shared_images WHERE image_name = $1 LIMIT 1",
      [filename]
    );
    if (rows.length > 0) {
      res.json({ success: true, image_url: rows[0].image_url });
    } else {
      res.status(404).json({ success: false, error: 'Image not found' });
    }
  } catch (err) {
    next(err);
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
