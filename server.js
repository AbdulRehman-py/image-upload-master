import express from "express";
import cors from "cors";
import { saveData, pool } from "./src/components/db.js"; // Import pool here

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/saveImage", async (req, res) => {
  try {
    const { image_url, image_name } = req.body;
    await saveData(image_url, image_name);
    res.json({ success: true, data: { image_url, image_name } });
  } catch (err) {
    res.json({ success: false, error: err.message });
  }
});

app.get("/api/AllImages", async (res) => {
  const { rows } = await pool.query("SELECT image_url FROM shared_images");
  res.json({ success: true, data: rows });
});

app.get("/api/getImageUrl", async (req, res) => {
  let { filename } = req.query;
  filename = decodeURIComponent(filename); // <-- decode URL-encoded spaces
  const { rows } = await pool.query(
    "SELECT image_url FROM shared_images WHERE image_name = $1 LIMIT 1",
    [filename]
  );
  if (rows.length > 0) {
    res.json({ success: true, image_url: rows[0].image_url });
  } else {
    res.json({ success: false });
  }
});

app.listen(3000, () => {
  console.log("Backend server running on http://localhost:3000");
});
