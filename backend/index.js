const express = require('express');
const session = require('express-session');
const passport = require('passport');
const cors = require('cors'); // Import cors
require('dotenv').config(); // Ensure env vars are loaded early

const app = express();
const PORT = process.env.PORT || 3001; // Use environment variable (updated default)

// CORS Configuration
if (!process.env.FRONTEND_URL) {
  console.warn('WARN: FRONTEND_URL not set in .env, CORS might not work correctly.');
}
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173', // Allow frontend origin
  credentials: true, // Allow cookies/session info to be sent
}));

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

// Health Check Route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

// Basic test route
app.get('/', (req, res) => {
  res.send('Hello from the Backend!');
});

// Mount Routers

// Authentication Routes (Separate - typically doesn't go under /api)
const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);

// --- API Router Setup ---
const apiRouter = express.Router();

// TODO: Add authentication middleware to protect API routes, e.g.:
// const ensureAuthenticated = (req, res, next) => { ... };
// apiRouter.use(ensureAuthenticated);

// Mount specific API route modules onto the main API router
const fileRoutes = require('./routes/files');
apiRouter.use('/files', fileRoutes); // Now at /api/files

// AI API Proxy Route
const aiRoutes = require('./routes/ai');
apiRouter.use('/ai', aiRoutes); // Now at /api/ai

// Mount Project routes
const projectRoutes = require('./routes/projectRoutes'); // Corrected filename
apiRouter.use('/projects', projectRoutes);

// Mount Validation routes (To be created)
const validationRoutes = require('./routes/validationRoutes'); // Corrected filename
apiRouter.use('/validation', validationRoutes);

// Mount the main API router at /api
app.use('/api', apiRouter);
// ------------------------

// Basic Error Handling Middleware (Place after all routes)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error', error: err.message });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 