const express = require('express');
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
// const GoogleStrategy = require('passport-google-oauth20').Strategy; // Add later
const pool = require('../config/db'); // Database pool
const router = express.Router();

// --- GitHub Strategy Configuration ---
if (process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET) {
    passport.use(new GitHubStrategy({
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: `${process.env.APP_BASE_URL || 'http://localhost:3000'}/auth/github/callback`,
        scope: ['user:email', 'repo'], // Request user email and repo access
    },
    async (accessToken, refreshToken, profile, done) => {
        // This verify callback runs after successful GitHub auth
        const { id, username, displayName, emails, photos } = profile;
        const email = emails?.[0]?.value; // Primary email from GitHub
        const avatarUrl = photos?.[0]?.value;

        try {
            // 1. Check if user exists by github_id
            let userResult = await pool.query('SELECT * FROM Users WHERE github_id = $1', [id]);
            let user = userResult.rows[0];

            // 2. If user doesn't exist by github_id, check by email (if available)
            if (!user && email) {
                userResult = await pool.query('SELECT * FROM Users WHERE email = $1', [email]);
                user = userResult.rows[0];
                // If found by email, link the github_id
                if (user) {
                    await pool.query('UPDATE Users SET github_id = $1, updated_at = NOW() WHERE id = $2', [id, user.id]);
                }
            }

            // 3. If user still doesn't exist, create a new user
            if (!user) {
                if (!email) {
                    // Cannot create user without an email from GitHub
                    return done(new Error('GitHub profile did not provide an email address. Please ensure your GitHub email is public or verified.'), null);
                }
                const newUserResult = await pool.query(
                    'INSERT INTO Users (email, display_name, username, avatar_url, github_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
                    [email, displayName || username, username, avatarUrl, id]
                );
                user = newUserResult.rows[0];
            }

            // 4. Upsert the Integration record (create or update)
            // Store access token securely (encryption recommended in production)
            await pool.query(
                `INSERT INTO Integrations (user_id, service_name, external_user_id, external_username, access_token, refresh_token, scopes)
                 VALUES ($1, 'github', $2, $3, $4, $5, $6)
                 ON CONFLICT (user_id, service_name)
                 DO UPDATE SET access_token = EXCLUDED.access_token, 
                               refresh_token = EXCLUDED.refresh_token, 
                               external_username = EXCLUDED.external_username,
                               scopes = EXCLUDED.scopes,
                               updated_at = NOW()`,
                [user.id, id, username, accessToken, refreshToken, profile.scope ? profile.scope.join(',') : '']
            );
            
            // Pass the user object from OUR database to Passport
            return done(null, user);
        } catch (err) {
            console.error('Error during GitHub OAuth verification:', err);
            return done(err, null);
        }
    }));
} else {
    console.warn('GitHub OAuth credentials not found in environment variables. GitHub login disabled.');
}

// --- Google Strategy Configuration (Add Later) ---
// passport.use(new GoogleStrategy({...}, async (...) => { ... }));


// --- Authentication Routes ---

// GitHub Auth Routes
router.get('/github', passport.authenticate('github'));

router.get('/github/callback',
    passport.authenticate('github', { 
        // successRedirect: '/dashboard', // Redirect on frontend later
        failureRedirect: '/login/failed' // Redirect on frontend later
    }),
    (req, res) => {
        // Successful authentication, redirect to frontend.
        // The user info is available in req.user thanks to Passport sessions
        console.log('GitHub auth successful, user:', req.user);
        // TODO: Redirect to a meaningful frontend page, possibly passing a token or session info
        res.redirect('/'); // Simple redirect for now
    }
);

// Google Auth Routes (Add Later)
// router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
// router.get('/google/callback', passport.authenticate('google', ...));

// Logout Route
router.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) { return next(err); }
        req.session.destroy((err) => { // Destroy the session
             if (err) {
                console.error('Error destroying session:', err);
                return res.status(500).send('Could not log out.');
             }
             res.clearCookie('connect.sid'); // Clear the session cookie
             // TODO: Redirect to login page on frontend
             res.redirect('/'); // Redirect to home for now
        });
    });
});

// Example route to check auth status (useful for frontend)
router.get('/status', (req, res) => {
    if (req.isAuthenticated()) {
        res.json({ authenticated: true, user: req.user }); // req.user comes from deserializeUser
    } else {
        res.json({ authenticated: false });
    }
});

module.exports = router; 