# Implementation Part Two - Follow-up Tasks

This document outlines tasks deferred from the initial setup phase, primarily focusing on completing and refining the authentication system.

## 1. Complete OAuth Configuration & Testing

*   **Register GitHub OAuth App:**
    *   Go to GitHub Developer Settings > OAuth Apps > New OAuth App.
    *   Use `http://localhost:5174` for Homepage URL (or final frontend URL).
    *   Use `http://localhost:3000/auth/github/callback` for Authorization callback URL (or final backend URL + path).
*   **Get Credentials:** Obtain the Client ID and generate a Client Secret from the registered GitHub OAuth App.
*   **Update `.env`:** Replace placeholder values for `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET` in `backend/.env` with the real credentials.
*   **Restart Backend:** Restart the backend server (`npm start` in `backend/`) after updating `.env`.
*   **Test GitHub Login Flow:**
    *   Start both backend and frontend (`npm run dev`) servers.
    *   Open the frontend app (`http://localhost:5174` or relevant port).
    *   Click the "Login with GitHub" button.
    *   Verify redirection to GitHub authorization page.
    *   Authorize the application.
    *   Verify redirection back to the frontend app.
    *   Verify the frontend UI updates to show a logged-in state (e.g., "Welcome, User!").
    *   Verify the "Logout" button works.

## 2. Implement Google OAuth Strategy

*   Register an application in Google Cloud Console to get OAuth 2.0 Client ID and Secret.
*   Update `backend/.env` with `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`.
*   Uncomment and complete the Google Strategy configuration in `backend/routes/auth.js` (similar logic to GitHub: find/create user, upsert integration).
*   Add routes (`/auth/google`, `/auth/google/callback`) in `backend/routes/auth.js`.
*   Add a "Login with Google" button to the frontend (`src/App.jsx`) that redirects to `/auth/google`.
*   Test the Google login flow thoroughly.

## 3. Enhance Security & User Experience

*   **Secure Token Storage:** Implement encryption for `access_token` and `refresh_token` stored in the `Integrations` table (e.g., using Node.js `crypto` module and a separate encryption key stored securely as an environment variable).
*   **Refined Redirects:** Update the frontend and backend to handle redirects after login/logout more gracefully (e.g., redirecting to a dashboard page or the originally requested page instead of just `/`).
*   **Error Handling:** Improve error handling and user feedback on the frontend for login failures.
*   **Session Store:** For production, configure a persistent session store (like `connect-pg-simple`) in `backend/index.js` instead of the default memory store.
*   **HTTPS:** Ensure HTTPS is used in production for secure communication, especially for OAuth callbacks.

## 4. Implement Other Deferred TODOs

*   Review code for other `// TODO:` comments added during initial setup (e.g., actual file upload logic, database interactions in routes, adding authentication middleware to protected API endpoints). 