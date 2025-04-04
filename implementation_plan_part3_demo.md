# Implementation Plan Part 3: MVP Demo Readiness

**Document Version:** 1.0
**Date:** 2024-04-04
**Target Branch:** `feature/ui-enhancements`

**Overall Goal:** Prepare the application for pilot user demos by implementing core AI-driven workflows (Ideation, Visualization, Planning, Launch Prep, Marketing Assets) alongside essential UI refinements (Sidebar, Headers, Theme Toggle) and the necessary backend infrastructure.

**Note on Scope:** This document details Phases 0 and 1 of the MVP Demo implementation. Subsequent phases (MVP Workflow implementation, Post-MVP features) will be detailed later or in separate documents. Features explicitly marked as "(Post-MVP)" are out of scope for this initial demo build.

---

## Phase 0: Foundational Backend & Infrastructure

**Objective:** Establish the necessary server-side components, APIs, and storage mechanisms required to support the MVP's functional features, particularly AI interactions and asset management. This phase focuses on *creating the infrastructure*, not necessarily implementing the full logic within each endpoint yet (that happens in later phases when integrating specific features).

**Rationale:** A robust backend is crucial for securely managing API keys, handling potentially long-running AI tasks, processing data, storing user assets, and providing a stable interface for the frontend. Centralizing this logic improves security, maintainability, and scalability.

**Key Technologies:** Node.js, Express.js (existing `backend/` structure), `dotenv`, `@gradio/client`, OpenAI SDK, potentially cloud storage SDKs (e.g., `@supabase/storage-js`, `aws-sdk`), `pg` (if using Supabase DB for metadata).

---

### Step 0.1: Setup/Verify Backend API Framework

*   **Status:** Not Started
*   **Action:** Review and configure the existing Express.js application within the `backend/` directory.
*   **Detailed Steps:**
    1.  **Navigate to Backend Directory:** Ensure terminal context is `cd backend`.
    2.  **Verify Dependencies:** Check `backend/package.json`. Ensure core dependencies like `express`, `cors`, `dotenv`, `pg` (if needed), `express-session`, `passport` (for auth) are present and versions are reasonable. Run `npm install` within `backend/` if necessary.
    3.  **Environment Variables (`backend/.env`):**
        *   Verify/create `backend/.env` based on `backend/.env.example` (if it exists, otherwise create).
        *   Ensure essential variables are present: `PORT` (for backend server, distinct from frontend), `DATABASE_URL` (if using DB), `SESSION_SECRET`, auth provider keys (`GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`, etc.), and placeholders for *new* AI keys (`OPENAI_API_KEY`, `HUGGINGFACE_TOKEN`, `IMAGE_API_KEY`, `VIDEO_API_KEY`, `GRADIO_HF_SPACE_URL` - for Hunyuan3D).
        *   Add `FRONTEND_URL` (e.g., `http://localhost:5173` or `http://localhost:8080`) for CORS configuration.
    4.  **Core Server File (`backend/index.js` or similar):**
        *   Review the main server entry point.
        *   Confirm basic Express app setup (`const app = express();`).
        *   Confirm `dotenv` is configured early (`require('dotenv').config();`).
        *   Confirm essential middleware is used:
            *   `express.json()` for parsing JSON request bodies.
            *   `express.urlencoded({ extended: true })` for parsing URL-encoded bodies.
            *   `cors` middleware configured with `origin: process.env.FRONTEND_URL` and `credentials: true` to allow requests from the frontend.
            *   Session middleware (`express-session`) configured with secret, `resave: false`, `saveUninitialized: false`, and potentially a store (like `connect-pg-simple` if using Postgres for sessions).
            *   Passport middleware (`passport.initialize()`, `passport.session()`) initialized *after* session middleware.
    5.  **Basic Routing Structure:**
        *   Verify a root route (`/`) or health check route (`/health`) exists for basic server testing.
        *   Verify existing auth routes (`/auth/github`, `/auth/status`, `/auth/logout`) are mounted.
        *   Create a main API router (e.g., `const apiRouter = express.Router();`) and mount it at `/api` (`app.use('/api', apiRouter);`). Future MVP endpoints will be added to this `apiRouter`.
    6.  **Error Handling:** Implement basic Express error handling middleware (a final `app.use((err, req, res, next) => ...)` handler) to catch unhandled errors and send a generic 500 response.
    7.  **Server Start Logic:** Ensure `app.listen(process.env.PORT, () => ...)` is present to start the server.
    8.  **Test Basic Startup:** Run `npm start` (or the defined start script) within the `backend/` directory. Verify the server starts without crashing and logs the listening port. Test the health check route if available.
*   **Dependencies:** Node.js, npm, existing `backend/` code structure.
*   **Verification:** Backend server starts successfully, `.env` variables are loaded, basic routes (health check, existing auth) are reachable via tools like `curl` or Postman. CORS configured correctly.
*   **Potential Challenges:** Dependency conflicts, incorrect `.env` setup, middleware order issues, CORS misconfiguration.

---

### Step 0.2: Implement File Storage Solution

*   **Status:** Not Started
*   **Action:** Select, configure, and implement backend functions for storing and retrieving files.
*   **Detailed Steps:**
    1.  **Decision: Local vs. Cloud:**
        *   **Local Filesystem:**
            *   *Pros:* Simplest setup for local development, no extra costs.
            *   *Cons:* Not scalable, not suitable for production/sharing, potential persistence issues (e.g., if server restarts in a container).
            *   *Implementation:* Use Node.js `fs` module (`fs.promises` preferably). Create an `assets/` or `uploads/` directory within `backend/` (ensure it's in `.gitignore`). Write functions like `saveFile(buffer, filename)` and `getFileStream(filename)`. Need a mechanism to serve these files (e.g., `express.static` middleware or a dedicated `/api/files/:filename` route). Need to manage unique filenames to avoid collisions.
        *   **Cloud Storage (Recommended - Supabase Storage Example):**
            *   *Pros:* Scalable, persistent, globally accessible URLs, often integrates well with database/auth (like Supabase). Free tiers usually sufficient for MVP.
            *   *Cons:* Requires cloud account setup, SDK integration, managing access control/permissions.
            *   *Implementation (Supabase):*
                1.  **Supabase Project Setup:** Ensure a Supabase project exists. Enable Storage via the Supabase dashboard. Create a bucket (e.g., `user-assets`). Configure bucket policies (e.g., public read access if needed for generated images/models, or private with signed URLs).
                2.  **Backend SDK:** Install `@supabase/supabase-js` in the `backend/` directory (`npm install @supabase/supabase-js`).
                3.  **Initialize Client:** Create a Supabase client instance in the backend using the Project URL and Service Role Key (store these securely in `backend/.env`). *Never expose the Service Role Key to the frontend.*
                4.  **Upload Function:** Create a backend utility function `uploadAsset(fileBuffer, fileName, contentType)` that uses `supabase.storage.from('user-assets').upload(fileName, fileBuffer, { contentType: contentType, upsert: true })`. Ensure unique filenames (e.g., using user ID + timestamp + original name hash). Handle potential errors.
                5.  **Get URL Function:** Create a backend utility function `getAssetUrl(fileName)` that uses `supabase.storage.from('user-assets').getPublicUrl(fileName)` (if bucket is public) or `supabase.storage.from('user-assets').createSignedUrl(fileName, expiresInSeconds)` (if private).
                6.  **Internal Docs:** Upload hardcoded MVP spec prompt documents manually to a separate (likely private) bucket (e.g., `internal-docs`). Create a backend function `getInternalDoc(docName)` to retrieve these using the service role client.
    2.  **Backend API for Frontend Uploads (If Needed):** While many AI outputs are generated *by* the backend, if users need to upload *initial* assets (like sketches), create a dedicated backend endpoint (e.g., `POST /api/upload/asset`) that uses middleware like `multer` to handle `multipart/form-data` uploads, then calls the chosen storage solution's upload function. This endpoint should be protected (require authentication).
    3.  **Configuration:** Store bucket names, storage keys/secrets in `backend/.env`.
*   **Dependencies:** Node.js, `fs` (local) OR Cloud provider account + SDK (e.g., Supabase, `@supabase/supabase-js`), potentially `multer`.
*   **Verification:** Files can be uploaded via backend functions/endpoints and stored correctly (locally or in cloud bucket). Accessible URLs/URIs can be generated. Internal docs can be retrieved by the backend.
*   **Potential Challenges:** Cloud storage permissions/policy configuration, handling large file uploads, error handling during uploads/retrievals, securing service keys, choosing appropriate bucket privacy.

---

### Step 0.3: Create Backend Endpoints for AI Calls

*   **Status:** Not Started
*   **Action:** Define and implement the basic structure for backend API routes that will handle interactions with various AI services.
*   **Detailed Steps:**
    1.  **API Router (`backend/routes/api.js` or similar):** Ensure the main `apiRouter` from Step 0.1 is set up.
    2.  **Define Routes (Stub Implementation):** Create route handlers for each required AI interaction. Initially, these can just accept the request, log it, and return a placeholder success/error or mock data.
        *   `POST /api/ai/ideate`: For GPT-4o ideation. Expects `problemStatement`, `solutionIdea` in body.
        *   `POST /api/generate/image`: For image generation. Expects `prompt` in body.
        *   `POST /api/generate/model`: For 3D model generation. Expects `prompt` in body. *Consider making this async/long-polling or use webhooks if generation is slow.*
        *   `POST /api/generate/video`: For video generation. Expects `prompt` or `script` in body. *Likely async.*
        *   `POST /api/mvp-chat`: For the guided MVP spec chat. Expects `message`, `history` (chat context) in body. Needs to fetch hardcoded docs from storage (Step 0.2).
        *   `POST /api/pitch-deck`: For generating pitch deck content. Expects relevant context (problem, solution, idea, mvp summary) in body.
    3.  **Authentication Middleware:** Apply authentication middleware (e.g., checking `req.isAuthenticated()` provided by Passport) to protect these endpoints. Only logged-in users should be able to trigger AI generations tied to their work.
    4.  **Input Validation:** Use a library like `zod` (install if needed: `npm install zod`) to define schemas for the expected request bodies for each endpoint and validate incoming requests. Return 400 Bad Request errors if validation fails.
    5.  **API Key Handling:** Within each (stubbed) route handler, ensure logic exists (even if commented out initially) to securely retrieve the relevant API key from `process.env` (e.g., `process.env.OPENAI_API_KEY`). *Crucially, never hardcode keys.*
    6.  **Gradio Client Setup (for 3D):** Install `@gradio/client` (`npm install @gradio/client`). In the `/api/generate/model` stub, include commented-out boilerplate for initializing the Gradio client using the HF Space URL from `.env`: `const client = await Client.connect(process.env.GRADIO_HF_SPACE_URL, { hf_token: process.env.HUGGINGFACE_TOKEN });`. Add placeholder logic for calling `client.predict('/endpoint_name', { prompt: req.body.prompt });`. (Referencing `game-asset-mcp` repo for specific endpoint names and parameters for Hunyuan3D will be key later).
    7.  **OpenAI SDK Setup:** Install OpenAI SDK (`npm install openai`). In relevant stubs (`/ideate`, `/mvp-chat`, `/pitch-deck`), include commented-out boilerplate for initializing the client (`const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });`) and making a chat completion call (`await openai.chat.completions.create(...)`).
    8.  **Placeholder Responses:** Ensure each stub returns a meaningful JSON response, e.g., `{ success: true, message: "Endpoint reached, processing not implemented yet." }` or `{ success: true, data: { imageUrl: "placeholder.jpg" } }`.
*   **Dependencies:** Express Router, Auth Middleware (Passport), `zod`, `dotenv`, `@gradio/client`, `openai`. Specific Image/Video API SDKs (TBD later).
*   **Verification:** API routes are defined and mounted correctly under `/api`. Authentication protects the routes. Basic input validation rejects invalid requests. Placeholder responses are returned successfully when hitting the endpoints via Postman or `curl` (with appropriate authentication/session cookie). Environment variables for keys are referenced (even if not used yet).
*   **Potential Challenges:** Correctly implementing async handlers, handling Gradio client connections/predictions (especially long-running ones), managing diverse AI SDKs, robust input validation, securing endpoints.

---

## Phase 1: Sidebar & Theme Refinement (MVP UI Scope)

**Objective:** Finalize the core UI layout elements including the sidebar's dual-state functionality (expanded/miniaturized), theme switching, and ensure related components like the TopBar adapt correctly.

**Rationale:** Provides the polished navigation and visual foundation requested for the MVP demo, incorporating key elements inspired by the CodeGuide reference.

**Key Technologies:** React, TypeScript, Tailwind CSS, `lucide-react`, ShadCN UI (`Tooltip`, `Button`, `DropdownMenu`), `next-themes`.

---

### Step 1.1: Finalize Miniaturized Sidebar State

*   **Status:** In Progress (Issues reported with hover/functionality in previous attempts) -> Needs Re-verification after Single Component Refactor.
*   **Action:** Verify and refine the single `Sidebar` component implementation (`src/components/Sidebar.tsx`) and its integration with `DashboardLayout.tsx`.
*   **Detailed Steps:**
    1.  **Verify Width Transition:** Ensure the `width` property transition (`w-64` <-> `w-20`) applied via `cn()` and `transition-all` in `Sidebar.tsx` is smooth when `isOpen` changes. Check transition duration/easing (`duration-300 ease-in-out`).
    2.  **Verify Conditional Rendering (`Sidebar.tsx`):**
        *   Double-check the logic within `CombinedNavLink` and `CombinedCategoryToggle`. When `isOpen` is false, ensure *only* the icon is rendered within a centered container (`justify-center`) and the label is hidden (`<span className="sr-only">`).
        *   When `isOpen` is true, ensure the icon, label, number/badge are rendered correctly with appropriate spacing (`gap-3`, `px-4`).
        *   Ensure category children are only rendered if `isExpanded && isOpen`.
    3.  **Verify Tooltips (`Sidebar.tsx`):**
        *   Confirm `TooltipProvider`, `Tooltip`, `TooltipTrigger`, `TooltipContent` wrap the icon-only links/categories correctly when `isOpen` is false.
        *   Check `TooltipContent` `side="right"` positioning and styling.
        *   Ensure tooltips are *disabled* (`disableHoverableContent={isOpen}`) when the sidebar is open to prevent interference.
    4.  **Verify Hover Effects (`Sidebar.tsx`):**
        *   Check the CSS classes applied for hover states (`hover:text-white/80`, `hover:bg-navy-dark`) on both the expanded links/buttons and the icon-only links. Ensure they provide clear visual feedback.
        *   Check active states (`bg-navy-dark`, `text-electric-blue`) are applied correctly based on `useLocation()`.
    5.  **Verify Layout Adjustments (`DashboardLayout.tsx`):**
        *   Confirm the main content `div` correctly applies `ml-64` or `ml-20` using `cn()` based on `isSidebarOpen`. Check the `transition-all` on this div for smooth margin changes.
        *   Confirm the `TopBar` component correctly applies `left-64` or `left-20` using `cn()` based on the `isSidebarOpen` prop it receives. Check its `transition-all`.
    6.  **Verify Toggle Button (`DashboardLayout.tsx`):**
        *   Confirm the `onClick={toggleSidebar}` handler is working reliably.
        *   Verify the dynamic `style={{ left: ... }}` calculation correctly positions the button just outside the sidebar edge in both open (`calc(16rem - 1.25rem)`) and closed (`calc(5rem - 1.25rem)`) states.
        *   Ensure the button has a sufficient `z-index` (e.g., `z-[60]`) to be clickable above other elements.
        *   Confirm the tooltip for the toggle button works correctly.
    7.  **Cross-Browser Check (Basic):** Briefly check in Chrome and Firefox/Safari if possible to catch major rendering inconsistencies.
*   **Dependencies:** `Sidebar.tsx`, `DashboardLayout.tsx`, `TopBar.tsx`, `sidebarNavItems` config, ShadCN Tooltip.
*   **Verification:** Sidebar smoothly transitions width between open/closed. Content/TopBar margins/positions adjust smoothly. Icon-only state shows icons+tooltips correctly. Hover/active states work as expected. Toggle button works reliably. No visual glitches or overlaps.
*   **Potential Challenges:** CSS specificity issues, transition conflicts, tooltip positioning/rendering bugs, precise alignment calculations for the toggle button, state synchronization issues between components.

---

### Step 1.5: Finalize Light/Dark Mode Toggle

*   **Status:** Done (Needs final verification, especially light theme styles).
*   **Action:** Verify the theme toggle functionality and ensure basic light theme styles are defined.
*   **Detailed Steps:**
    1.  **Verify Toggle Component (`ThemeToggle.tsx` & `Sidebar.tsx`):**
        *   Confirm the toggle button appears correctly at the bottom of the sidebar in both open and closed states.
        *   Confirm clicking the button opens the dropdown with "Light", "Dark", "System" options.
        *   Confirm the dropdown styling (including glass morphism added earlier) looks acceptable.
    2.  **Verify Theme Switching:**
        *   Click "Light". Does the `<html>` element get the `class="light"` attribute? Does the UI *attempt* to change (even if styles aren't perfect)?
        *   Click "Dark". Does the `<html>` element get `class="dark"`? Does the UI switch back to the dark theme?
        *   Click "System". Does the theme match the OS setting?
    3.  **Define Basic Light Theme Styles (Tailwind):**
        *   **Review `tailwind.config.ts`:** While the current config is dark-first, check if any `light:` variants or light-theme-specific color definitions exist. If not, we need to add some basic overrides.
        *   **Add Light Theme Colors (Example in `tailwind.config.ts` -> `theme.extend.colors`):**
            ```javascript
            // Inside theme.extend.colors:
            light: { // Define a scope for light theme overrides
              background: 'hsl(0 0% 100%)', // White background
              foreground: 'hsl(222.2 84% 4.9%)', // Dark text
              card: 'hsl(0 0% 100%)', // White cards
              'card-foreground': 'hsl(222.2 84% 4.9%)',
              popover: 'hsl(0 0% 100%)',
              'popover-foreground': 'hsl(222.2 84% 4.9%)',
              primary: 'hsl(222.2 47.4% 11.2%)',
              'primary-foreground': 'hsl(210 40% 98%)',
              secondary: 'hsl(210 40% 96.1%)',
              'secondary-foreground': 'hsl(222.2 47.4% 11.2%)',
              muted: 'hsl(210 40% 96.1%)',
              'muted-foreground': 'hsl(215.4 16.3% 46.9%)',
              accent: 'hsl(210 40% 96.1%)',
              'accent-foreground': 'hsl(222.2 47.4% 11.2%)',
              destructive: 'hsl(0 84.2% 60.2%)',
              'destructive-foreground': 'hsl(210 40% 98%)',
              border: 'hsl(214.3 31.8% 91.4%)',
              input: 'hsl(214.3 31.8% 91.4%)',
              ring: 'hsl(222.2 84% 4.9%)',
              // Custom overrides if needed
              'navy-light': 'hsl(210 40% 96.1%)', // Example: Light gray instead of navy
              'slate-dark': 'hsl(222.2 84% 4.9%)', // Dark text for slate
            }
            ```
        *   **Add Light Theme Variables (If using CSS Variables in `index.css`):** Define `--color-light-background`, `--color-light-text`, etc., and use them within a `:root.light { ... }` block or apply via Tailwind `light:` prefixes. *Tailwind class-based approach is generally simpler with `next-themes`.*
        *   **Apply `light:` Prefixes:** Review key components (`Sidebar`, `TopBar`, `DashboardLayout`, `AiAgent`, common UI elements like `Button`, `Input`, `Card`) and add `light:` prefixed classes where needed to override dark defaults (e.g., `bg-navy-darkest light:bg-light-background`, `text-slate-light light:text-light-foreground`).
    4.  **Test Light Theme:** Activate light mode again and check if the core background, text, sidebar, and topbar colors adapt reasonably. Fine-tuning can happen later, but it should be usable.
*   **Dependencies:** `next-themes`, `ThemeProvider` setup, `ThemeToggle.tsx`, Tailwind config (`darkMode: 'class'`), CSS/Tailwind styles.
*   **Verification:** Theme toggle dropdown works. Selecting Light/Dark/System applies the correct class to `<html>`. Basic light theme styles are applied, making the UI readable in light mode. Dark mode remains the default and fully functional.
*   **Potential Challenges:** Defining a comprehensive set of light theme styles, ensuring overrides work correctly with Tailwind specificity, handling system preference changes gracefully.

---

*(End of Phase 0 & 1 Detailed Plan)* 