import express from 'express';
import multer from 'multer';
import cors from 'cors';
import { saveData } from './src/components/db.js'; // Adjust path if needed

const app = express();
const upload = multer();
app.use(cors());

app.post('/api/saveImage', upload.single('image_data'), async (req, res) => {
  try {
    const { image_url, image_name } = req.body;
    const image_data = req.file.buffer;
    await saveData(image_url, image_name, image_data);
    res.json({ success: true, data: { image_url, image_name } });
  } catch (err) {
    res.json({ success: false, error: err.message });
  }
});

app.listen(3000, () => {
  console.log('Backend server running on http://localhost:3000');
});