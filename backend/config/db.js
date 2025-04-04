require('dotenv').config(); // Load environment variables from .env file

const { Pool } = require('pg');

// Create a new connection pool using environment variables
// These variables should be set in your environment (e.g., in a .env file for development)
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT || 5432, // Default PostgreSQL port
  // Optional: Add SSL configuration if required (e.g., for cloud databases)
  // ssl: {
  //   rejectUnauthorized: false // Adjust based on your provider's requirements
  // }
});

// Test the connection (optional, but good practice)
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
  } else {
    console.log('Database connection established successfully.');
    // console.log('Current time from DB:', res.rows[0].now);
  }
});

// Export the pool for use in other parts of the application
module.exports = pool; 