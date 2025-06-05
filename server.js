import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { supabase } from "./supabaseClient.js";
import { saveData } from "./src/components/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: [process.env.FRONTEND_URL || 'http://localhost:5173', 'https://imageuploadfrontend.vercel.app'],
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
    console.error("Error in /api/saveImage:", err);
    next(err);
  }
});

// Get image URL by filename
app.get("/api/getImageUrl", async (req, res, next) => {
  try {
    const { filename } = req.query;
    if (!filename) {
      return res.status(400).json({ success: false, error: 'Filename is required' });
    }

    const { data, error } = await supabase
      .from('shared_images')
      .select('image_url')
      .eq('image_name', filename)
      .single();

    if (error) {
      console.error("Error fetching image:", error);
      return res.status(404).json({ success: false, error: 'Image not found' });
    }

    if (!data) {
      return res.status(404).json({ success: false, error: 'Image not found' });
    }

    res.json({ success: true, image_url: data.image_url });
  } catch (err) {
    console.error("Error in /api/getImageUrl:", err);
    next(err);
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
