import { supabase } from "../../supabaseClient.js";

// Run this once at startup
async function createTableIfNotExists() {
  // Check if table exists first
  const checkTable = `
    SELECT EXISTS (
      SELECT FROM information_schema.tables 
      WHERE table_name = 'shared_images'
    );
  `;
  
  const tableExists = await supabase.from('shared_images').select('*', { count: 'exact' });
  
  // Only create table if it doesn't exist
  if (tableExists.count === 0) {
    const { data, error } = await supabase.from('shared_images').insert([
      { image_url: 'placeholder', image_name: 'placeholder' }
    ]).select();
    
    if (error) {
      console.error("Error creating table:", error);
    } else {
      console.log("Table created successfully");
    }
  } else {
    console.log("Table already exists");
  }
}

async function saveData(image_url, image_name) {
  try {
    const { data, error } = await supabase
      .from('shared_images')
      .insert([
        { image_url, image_name }
      ])
      .select()
      .single();
    
    if (error) {
      console.error("Error saving data:", error);
      throw error;
    }
    
    console.log("Data saved:", data);
    return data;
  } catch (err) {
    console.error("Error in saveData:", err);
    throw err;
  }
}

// Initialize
console.log("Database connection established");

createTableIfNotExists().catch(console.error);

export { saveData };

