# Integration Plan (Phase 2 - Lovable Frontend)

This plan details the steps to replace the initial placeholder frontend with the codebase from the 'skarnz/8uild' repository (referred to as Lovable Frontend) and integrate the existing backend functionality.

## Phase 1: Codebase Transition

1.  **Backup & Clean (Manual Recommended):**
    *   *Action:* Manually backup or confirm deletion is acceptable for the current root-level frontend files/folders: `src/`, `public/`, `.gitignore`, `index.html`, `vite.config.js`, `package.json`, `package-lock.json`, `eslint.config.js`, `tsconfig.*`.
    *   *Rationale:* Prepares the workspace for the new frontend codebase, avoiding conflicts.
    *   *Note:* The existing `backend/`, `infra/`, `.cursor/`, `config/`, documentation (`*.md`), and plan files (`*.md`, `*.mdc`) should **remain**.

2.  **Copy Lovable Frontend Code:**
    *   *Action:* Copy all contents from the temporary clone directory (`lovable-frontend-temp/`) **except** its `.git` directory into the project root (`/Users/skarnz/innovation-platform`).
    *   *Rationale:* Replaces the old frontend structure with the new one.

3.  **Merge Dependencies (`package.json`):**
    *   *Action:* Carefully review the `package.json` from `lovable-frontend-temp` and merge its dependencies and scripts into the root `package.json` that was kept (or if the root `package.json` was deleted in step 1, use the one from Lovable as the new root). Ensure necessary packages like `react-router-dom`, `react-icons`, and any others needed for backend integration are present. Add any missing dev dependencies for TypeScript, Tailwind, etc.
    *   *Rationale:* Consolidates project dependencies for both frontend and potentially shared tooling.

4.  **Install Dependencies:**
    *   *Action:* Run `npm install` in the project root directory.
    *   *Rationale:* Downloads all required packages for the new frontend and any merged dependencies.

5.  **Initial Verification:**
    *   *Action:* Attempt to run the new frontend's dev server (likely `npm run dev`). Resolve any immediate startup errors related to missing dependencies or basic configuration.
    *   *Rationale:* Ensure the copied frontend code is runnable before integration.
    *   *Status:* Done. Frontend starts successfully on localhost:8080.

## Phase 2: Core Service & Auth Integration

6.  **Integrate API Service Layer:**
    *   *Action:* Copy the previously created `api.js` (containing `getFiles`, `getAiReply`, `getAuthStatus`, etc.) into the new frontend structure (e.g., `src/lib/api.ts` or `src/services/api.ts`). Convert to TypeScript if necessary, ensuring types align.
    *   *Rationale:* Makes backend communication functions available to the new frontend.

7.  **Integrate Auth Status Check:**
    *   *Action:* Modify the main application component (`src/App.tsx` or a layout component) to include the `useEffect` hook that calls `getAuthStatus` from the API service on load.
    *   *Rationale:* Checks if the user is already logged in when the app loads.

8.  **Integrate Login/Logout UI:**
    *   *Action:* Identify the UI elements for login (e.g., buttons, potentially in a header or dedicated login page) and connect their `onClick` handlers to call `loginWithGithub` (and later `loginWithGoogle`) from the API service.
    *   *Action:* Identify UI elements for displaying user info (when logged in) and the logout button. Connect these to the state updated by `getAuthStatus` and wire the logout button to call the `logout` function from the API service.
    *   *Rationale:* Connects the visual login/logout elements to the backend authentication flow.

## Phase 3: Feature Integration

9.  **Integrate AI Agent:**
    *   *Action:* Copy the previously created `AiAgent.jsx` component into the new `src/components` directory. Convert to TypeScript (`AiAgent.tsx`) adjusting types as needed. Import necessary functions from the API service.
    *   *Action:* Ensure the `AiAgent.tsx` component is rendered within the main application layout defined by the Lovable structure.
    *   *Rationale:* Adds the AI chat functionality to the new UI.

10. **Integrate Files Page:**
    *   *Action:* Identify the component responsible for displaying the file list (likely within `src/pages/Files` or similar). Modify it to fetch data using the `getFiles` function from the API service when the component mounts or when a project is selected (requires state management/prop drilling).
    *   *Rationale:* Connects the Files view to the backend file listing endpoint.

11. **Integrate Overview/Dashboard Page:**
    *   *Action:* Identify the main dashboard/overview component (`src/pages/Dashboard` or similar). Update its structure to display the cards and project list as shown in the screenshot. Add placeholder logic or simple API calls if backend endpoints for project lists exist or are created.
    *   *Rationale:* Populates the main dashboard view with relevant data/actions.

## Phase 4: Routing & Polish

12. **Configure Routing:**
    *   *Action:* Ensure `react-router-dom` is set up correctly (likely in `src/main.tsx` or `src/App.tsx`) to define routes for `/`, `/overview`, `/files`, `/ideation`, etc., corresponding to the sidebar links. Ensure the main layout component wraps these routes.
    *   *Rationale:* Enables navigation between different sections of the application.

13. **Sidebar Link Alignment:**
    *   *Action:* Verify/update the links and icons in the Lovable Sidebar component (`src/components/Sidebar` or similar) to match the required items (Dashboard, Overview, Files, Ideation, Validation, MVP Spec, Prototyping, Marketing, Chat, Support), omitting the excluded ones.
    *   *Rationale:* Ensures sidebar navigation matches the project requirements.

14. **Styling Polish (Optional):**
    *   *Action:* Make minor adjustments to Tailwind classes or CSS to refine UI elements like corner radiuses for a more polished look, without extensive redesign.
    *   *Rationale:* Improves visual appeal for the demo based on user request.

## Phase 5: Validation

15. **Manual Integration Testing:**
    *   *Action:* Start both backend and frontend servers.
    *   *Action:* Thoroughly test the integrated features: Login/Logout flow (if credentials configured), AI Agent communication, navigating between pages (Dashboard, Files), checking for console errors.
    *   *Rationale:* Confirms the integration work was successful.

16. **Commit Changes:**
    *   *Action:* Stage and commit all the changes related to the frontend replacement and integration.
    *   *Action:* Push the changes to the GitHub repository.
    *   *Rationale:* Saves the integrated state to version control. 