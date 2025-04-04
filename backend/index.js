const express = require('express');
const session = require('express-session');
const passport = require('passport');
const cors = require('cors'); // Import cors
require('dotenv').config(); // Ensure env vars are loaded early

const app = express();
const PORT = process.env.PORT || 3000; // Use environment variable or default to 3000

// CORS Configuration
const corsOptions = {
  origin: 'http://localhost:5174', // Update to allow current frontend port
  credentials: true, // Allow cookies/session info to be sent
};
app.use(cors(corsOptions));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Needed for form submissions / OAuth callbacks

// Session Configuration
if (!process.env.SESSION_SECRET) {
  console.error('FATAL ERROR: SESSION_SECRET is not defined. Please set it in your .env file.');
  process.exit(1); // Exit if secret is missing
}
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false, // Don't save sessions until something is stored
  // Configure session store later if needed (e.g., connect-pg-simple)
  cookie: {
    // secure: process.env.NODE_ENV === 'production', // Use secure cookies in production (HTTPS)
    // httpOnly: true, // Prevent client-side JS access
    // maxAge: 1000 * 60 * 60 * 24 // Optional: e.g., 1 day
  }
}));

// Passport Configuration
app.use(passport.initialize());
app.use(passport.session());

// --- Passport Strategy Configuration (will be in a separate config file or auth routes later) ---
// Placeholder: We need to tell Passport HOW to authenticate users (strategies)
// And how to serialize/deserialize user info into/from the session
passport.serializeUser((user, done) => {
  // Example: Serialize user ID into the session
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  // Example: Fetch user from DB based on ID stored in session
  try {
    // Replace with actual DB call later
    // const pool = require('./config/db');
    // const result = await pool.query('SELECT * FROM Users WHERE id = $1', [id]);
    // const user = result.rows[0]; 
    const user = { id: id, username: 'temp_user' }; // Dummy user for now
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});
// ---------------------------------------------------------------------------------------------

// Basic test route
app.get('/', (req, res) => {
  res.send('Hello from the Backend!');
});

// API routes
const fileRoutes = require('./routes/files');
app.use('/api/files', fileRoutes);

// Authentication Routes
const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);

// AI API Proxy Route
const aiRoutes = require('./routes/ai');
app.use('/api/ai', aiRoutes);

// Placeholder for other API routes
// app.use('/api/ai', require('./routes/ai'));

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 