import pg from "pg";

const { Pool } = pg;

const pool = new Pool({
  user: "postgres", // Replace with your username
  host: "localhost", // Replace with your host
  database: "postgres", // Replace with your database name
  password: "lol", // Replace with your password
  port: 5432,
});

// Run this once at startup
async function createTableIfNotExists() {
  const query = `
        CREATE TABLE IF NOT EXISTS shared_images (
            id SERIAL PRIMARY KEY,
            image_url TEXT UNIQUE NOT NULL,
            image_name TEXT
            
        );
    `;
  await pool.query(query);
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
  } catch (err) {
    console.error("Error saving data:", err);
  }
}

createTableIfNotExists();
console.log("Database connection established");
export { saveData, pool };
