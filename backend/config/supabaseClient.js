const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') }); // Load .env from parent directory

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.warn("WARN: Supabase URL or Service Key not found in .env. File storage features will not work.");
}

// Create a single Supabase client for interacting with your database
// IMPORTANT: Use the Service Role Key ONLY on the backend.
const supabase = (supabaseUrl && supabaseServiceKey) ? createClient(supabaseUrl, supabaseServiceKey) : null;

module.exports = supabase; 