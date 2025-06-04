import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;

// Create connection pool using Supabase connection string
const pool = new Pool({
  connectionString: process.env.SUPABASE_DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

// Run this once at startup
async function createTableIfNotExists() {
  // Check if table exists first
  const checkTable = `
    SELECT EXISTS (
      SELECT FROM information_schema.tables 
      WHERE table_name = 'shared_images'
    );
  `;
  
  const tableExists = await pool.query(checkTable);
  
  // Only create table if it doesn't exist
  if (!tableExists.rows[0].exists) {
    const query = `
      CREATE TABLE IF NOT EXISTS shared_images (
        id SERIAL PRIMARY KEY,
        image_url TEXT UNIQUE NOT NULL,
        image_name TEXT
      );
    `;
    await pool.query(query);
    console.log("Table created successfully");
  } else {
    console.log("Table already exists");
  }
}

async function saveData(image_url, image_name) {
  const query = `
    INSERT INTO shared_images (image_url, image_name)
    VALUES ($1, $2)
    RETURNING *;
  `;
  const values = [image_url, image_name];
  
  try {
    const res = await pool.query(query, values);
    console.log("Data saved:", res.rows[0]);
    return res.rows[0];
  } catch (err) {
    console.error("Error saving data:", err);
    throw err;
  }
}

// Test database connection
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Database connection error:', err);
  } else {
    console.log('Database connected successfully');
  }
});

createTableIfNotExists().catch(console.error);
console.log("Database connection established");
export { saveData, pool };

