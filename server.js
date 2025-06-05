import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { supabase } from "./supabaseClient.js";
import { saveData } from "./src/components/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Simple CORS configuration
const corsOptions = {
  origin: 'https://imageuploadfrontend.vercel.app',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Accept'],
  credentials: false
};

app.use(cors(corsOptions));
app.use(express.json());

// Request logging
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - Origin: ${req.headers.origin}`);
  next();
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, error: 'Something went wrong!' });
});

// Save image URL and name
app.post("/api/saveImage", async (req, res, next) => {
  try {
    console.log("Received request body:", req.body);
    const { image_url, image_name } = req.body;
    
    if (!image_url || !image_name) {
      console.log("Missing fields:", { image_url, image_name });
      return res.status(400).json({ 
        success: false, 
        error: 'Missing required fields',
        received: { image_url, image_name }
      });
    }
    
    const savedImage = await saveData(image_url, image_name);
    console.log("Successfully saved image:", savedImage);
    res.json({ success: true, data: savedImage });
  } catch (err) {
    console.error("Error in /api/saveImage:", err);
    res.status(500).json({ 
      success: false, 
      error: err.message || 'Internal server error'
    });
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
