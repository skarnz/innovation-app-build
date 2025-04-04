# Implementation Plan Part 3: MVP Demo Readiness

**Document Version:** 1.1
**Date:** 2024-04-04 (Updated 2024-05-16)
**Target Branch:** `feature/mvp-demo-build`

**Overall Goal:** Prepare the application for pilot user demos by implementing core AI-driven workflows (**Ideation, Project Setup, Validation, Visualization, MVP Spec**, Launch Prep, Marketing Assets) alongside essential UI refinements (Sidebar, Headers, Theme Toggle) and the necessary backend infrastructure.

**Note on Scope:** This document details the MVP Demo implementation. **Validation features rely on simulated data for the demo.** Features explicitly marked as "(Post-MVP)" are out of scope for this initial demo build and detailed in `implementation_plan_post_mvp.md`.

**MVP UI Requirements (Covered by parent branch `feature/ui-enhancements` baseline & Phase 1)**
*   Miniaturized Sidebar (Step 1.1)
*   Light/Dark Mode Toggle (Step 1.5)
*   Large Page Headers (Step 1.6)

**MVP Functional Requirements (To be implemented on this branch - Requires Backend)**
*   Project Details Input & Asset Upload (Phase 2)
*   Structured Initial Input (Step 3.1)
*   AI Ideation (GPT-4o) (Step 3.2)
*   Simulated AI Agent Scraper (Step 3.3)
*   Counter-Intuition Prompts (Step 3.4)
*   Target Market Definition (Step 4.1)
*   Simulated Survey Setup & Results (Step 4.2)
*   Simulated Score & Forecasting (Steps 4.4, 4.5)
*   AI Concept Imagery (Image Gen API - Mock) (Step 5.1)
*   Simplified MVP Specification (GPT-4o + Hardcoded Docs) (Step 5.2)
*   AI Pitch Deck Content (GPT-4o) (Step 6.1)
*   Interactive Launch Plan (Step 6.2)
*   Generative Ad Copy & Mock Visuals (Steps 7.1, 7.2)
*   Basic Profile Display (Phase 8)


---

## Phase 0: Foundational Backend & Infrastructure

**Objective:** Establish the necessary server-side components, APIs, and storage mechanisms required to support the MVP's functional features, particularly AI interactions and asset management. This phase focuses on *creating the infrastructure*, not necessarily implementing the full logic within each endpoint yet (that happens in later phases when integrating specific features).

**Rationale:** A robust backend is crucial for securely managing API keys, handling potentially long-running AI tasks, processing data, storing user assets, and providing a stable interface for the frontend. Centralizing this logic improves security, maintainability, and scalability.

**Key Technologies:** Node.js, Express.js (existing `backend/` structure), `dotenv`, `@gradio/client`, OpenAI SDK, potentially cloud storage SDKs (e.g., `@supabase/storage-js`, `aws-sdk`), `pg` (if using Supabase DB for metadata), `zod`, `multer`.

---

### Step 0.1: Setup/Verify Backend API Framework

*   **Status:** Done
*   **Action:** Review and configure the existing Express.js application within the `backend/` directory.
*   **Detailed Steps:**
    1.  **Navigate & Install:** `cd backend`, `npm install` if needed.
    2.  **Verify Dependencies:** Check `backend/package.json` for `express`, `cors`, `dotenv`, `pg` (if needed), `express-session`, `passport`, `zod`, `@supabase/supabase-js` (if using Supabase), `openai`, `@gradio/client`, `multer`.
    3.  **Environment Variables (`backend/.env`):**
        *   Verify/create based on `.env.example`.
        *   Ensure: `PORT`, `DATABASE_URL` (if needed), `SESSION_SECRET`, `GITHUB_CLIENT_ID/SECRET`, `OPENAI_API_KEY`, `HUGGINGFACE_TOKEN`, `IMAGE_API_KEY` (placeholder ok), `VIDEO_API_KEY` (placeholder ok), `GRADIO_HF_SPACE_URL`, `FRONTEND_URL`, `SUPABASE_URL`, `SUPABASE_SERVICE_KEY` (if using Supabase).
    4.  **Core Server File (`backend/index.js`):**
        *   Review entry point. Confirm `express()`, `dotenv.config()`.
        *   Confirm Middleware: `express.json()`, `express.urlencoded()`, `cors({ origin: process.env.FRONTEND_URL, credentials: true })`, `express-session`, `passport.initialize()`, `passport.session()`.
    5.  **Basic Routing Structure:**
        *   Verify `/health` or `/` route.
        *   Verify `/auth/*` routes.
        *   Ensure main API router mounted: `const apiRouter = express.Router(); app.use('/api', apiRouter);`. **Apply auth middleware to `apiRouter` globally or per-route group.**
    6.  **Error Handling:** Basic `app.use((err, req, res, next) => ...)` handler.
    7.  **Server Start Logic:** `app.listen(...)`.
    8.  **Test Basic Startup:** `npm start` in `backend/`. Test `/health`.
*   **Dependencies:** Node.js, npm, existing `backend/` structure, `.env` file.
*   **Verification:** Backend server starts, `.env` loaded, basic/auth routes reachable, CORS works, API routes are protected.
*   **Potential Challenges:** Dependency conflicts, `.env` setup, middleware order, CORS, auth middleware application.

---

### Step 0.2: Implement File Storage Solution

*   **Status:** Done (Pending manual Supabase setup/doc upload)
*   **Action:** Select, configure, and implement backend functions for storing and retrieving files (user uploads and AI-generated assets).
*   **Detailed Steps:**
    1.  **Decision:** Strongly recommend Cloud Storage (Supabase example). Local FS is not suitable for sharing/persistence needed.
    2.  **Cloud Storage (Supabase Example):**
        *   **Supabase Project Setup:** Ensure project exists, Storage enabled. Create buckets: `user-assets` (potentially public or private with signed URLs), `internal-docs` (private). Configure policies.
        *   **Backend SDK:** Install/verify `@supabase/supabase-js`.
        *   **Initialize Client:** Create backend Supabase client using `SUPABASE_URL` and `SUPABASE_SERVICE_KEY` from `.env`.
        *   **Upload Function:** Create `uploadAsset(fileBuffer, fileName, contentType)` utility using `supabase.storage.from('user-assets').upload(...)`. Ensure unique filenames (e.g., `userId/projectId/timestamp-hash`). Handle errors.
        *   **Get URL Function:** Create `getAssetUrl(fileName)` utility using `getPublicUrl` or `createSignedUrl`.
        *   **Internal Docs:** Manually upload necessary docs (e.g., `mvp_spec_template.md`) to `internal-docs` bucket. Create `getInternalDoc(docName)` utility using the service client.
    3.  **Backend API for Frontend Uploads (`POST /api/projects/:projectId/upload-asset`):**
        *   Create this new endpoint within project routes, protected by auth.
        *   Use `multer` middleware to handle `multipart/form-data` (limit file size/types).
        *   Extract `projectId` from `req.params`.
        *   Generate unique filename incorporating user ID and project ID.
        *   Call `uploadAsset` utility with `req.file.buffer`, generated filename, and `req.file.mimetype`.
        *   Return the asset URL or relevant metadata: `{ success: true, assetUrl: url, filename: generatedFilename }`. Handle upload errors.
    4.  **Configuration:** Store bucket names, Supabase keys in `.env`.
*   **Dependencies:** Cloud provider account (Supabase), `@supabase/supabase-js`, `multer`.
*   **Verification:** Files uploaded via the new endpoint are stored correctly in the cloud bucket under the right path. Accessible URLs generated. Internal docs retrievable.
*   **Potential Challenges:** Cloud storage permissions, large file uploads, `multer` configuration, securing service keys, unique filename generation, error handling during uploads.

---

### Step 0.3: Create Backend Endpoints Stubs

*   **Status:** Done
*   **Action:** Define API routes for AI interactions and basic project data management. Stubs initially, logic filled in later phases.
*   **Detailed Steps:**
    1.  **API Router Setup:** Ensure `apiRouter` from Step 0.1 exists and has auth middleware applied.
    2.  **Define Route Groups:** Organize routes logically using Express Routers.
        ```javascript
        // backend/routes/api.js (example)
        const projectRoutes = require('./projectRoutes');
        const aiRoutes = require('./aiRoutes');
        const validationRoutes = require('./validationRoutes');

        apiRouter.use('/projects', projectRoutes); // For project CRUD, asset uploads
        apiRouter.use('/ai', aiRoutes); // For AI generation tasks
        apiRouter.use('/validation', validationRoutes); // For validation steps
        // Mount other routers as needed...
        ```
    3.  **Define Route Stubs:** Create handlers in respective route files (e.g., `backend/routes/projectRoutes.js`). Apply input validation (Zod) and return placeholders.
        *   **(Project Routes - `projectRoutes.js`)**
            *   `POST /`: Create new project. Expects name, description, type. Returns `{ projectId }`.
            *   `GET /:projectId`: Get project details.
            *   `PUT /:projectId`: Update project details (e.g., save target market).
            *   `POST /:projectId/upload-asset`: (Logic defined in Step 0.2).
            *   `POST /:projectId/surveys`: Create a new survey draft. Expects `{ name: string, description?: string }`. Returns `{ surveyId }`.
        *   **(AI Routes - `aiRoutes.js`)**
            *   `POST /ideate`: GPT-4o ideation. Expects `problemStatement`, `solutionIdea`. Returns `{ ideas: [...] }`.
            *   `POST /scrape-trends`: **Simulated** web scraping. Expects `ideaContext`. Returns mock trend data.
            *   `POST /generate/image`: Image generation. Expects `prompt`. Returns mock URL for MVP.
            *   `POST /generate/video`: Video generation. Expects `context`. Returns mock script for MVP.
            *   `POST /mvp-chat`: Guided MVP spec chat. Expects `message`, `history`, `context`. Needs `getInternalDoc`.
            *   `POST /pitch-deck`: Pitch deck content. Expects `section`, `context`.
            *   `POST /generate/ad-copy`: Ad copy generation. Expects `copyType`, `platform`, `context`.
            *   `POST /generate-survey-questions`: Generate questions for a survey. Expects `{ surveyName: string, ideaContext: string }`. Returns `{ questions: string[] }`.
            *   `POST /deep-research`: Perform AI research on a query. Expects `{ query: string, ideaContext: string }`. Returns `{ researchSummary: string }`.
        *   **(Validation Routes - `validationRoutes.js`)**
            *   `POST /simulate-survey`: Simulate survey run. Expects survey params. Returns mock results.
            *   `POST /forecast`: Simulate market forecast. Expects market signals, context. Returns mock forecast.
    4.  **Authentication:** Ensure auth middleware is applied consistently (e.g., `apiRouter.use(ensureAuthenticated);`).
    5.  **Input Validation:** Implement Zod schemas for all expected request bodies/params in each route handler.
    6.  **API Key Handling:** Reference keys via `process.env` within actual implementation later.
    7.  **SDK Setup Boilerplate:** Add commented-out SDK init/call examples later.
    8.  **Placeholder Responses:** Return meaningful JSON placeholders, e.g., `{ success: true, message: 'Endpoint stub hit' }`.
*   **Dependencies:** Express Router, Auth Middleware, `zod`, `dotenv`.
*   **Verification:** All API routes defined, mounted, protected. Input validation rejects invalid requests. Placeholder responses returned.
*   **Potential Challenges:** Organizing routes effectively, consistent auth application, comprehensive input validation later.

---

## Phase 1: UI Refinements (Final Verification)

**Objective:** Finalize the core UI layout elements including the sidebar's dual-state functionality, theme switching, and **implement large page headers.**

**Rationale:** Provides the polished navigation, visual foundation, and consistent page structure needed for the MVP demo.

**Key Technologies:** React, TypeScript, Tailwind CSS, `lucide-react`, ShadCN UI (`Tooltip`, `Button`, `DropdownMenu`, **`Breadcrumb`**), `next-themes`.

---

### Step 1.1: Finalize Miniaturized Sidebar State

*   **Status:** In Progress -> Needs Re-verification.
*   **Action:** Verify and refine the single `Sidebar` component and its integration.
*   **Detailed Steps:** (Content unchanged)
*   **Dependencies:** (Content unchanged)
*   **Verification:** (Content unchanged)
*   **Potential Challenges:** (Content unchanged)

---

### Step 1.5: Finalize Light/Dark Mode Toggle

*   **Status:** Done -> Needs final verification.
*   **Action:** Verify theme toggle and ensure basic light theme styles are usable.
*   **Detailed Steps:** (Content unchanged)
*   **Dependencies:** (Content unchanged)
*   **Verification:** (Content unchanged)
*   **Potential Challenges:** (Content unchanged)

---

### Step 1.6: Implement Large Page Headers (Moved from old Phase 2)

*   **Status:** Done
*   **Action:** Create a reusable `PageHeader` component and integrate it into main pages.
*   **Detailed Steps:**
    1.  **Component Creation (`src/components/layout/PageHeader.tsx`):** Props: `title`, `breadcrumbs?`, `actions?`. Layout: Title (large/bold), Breadcrumbs (ShadCN `Breadcrumb` components), Actions (buttons on right). Padding/border. Theme-aware background.

---

## Phase 2: Project Setup (New)

**Objective:** Allow users to define essential project details immediately after initial onboarding/ideation selection, including name, description, business type, and preliminary assets.

**Rationale:** Captures core project context early, informing subsequent AI interactions and validation steps. Provides a place for initial user artifacts.

**Key Technologies:** React, TypeScript, Tailwind CSS, ShadCN UI (`Input`, `Textarea`, `Button`, `Card`, `Label`, `Select` or `RadioGroup`), File Input/Dropzone library (e.g., `react-dropzone`), Axios, Backend API.

---

### Step 2.1: Project Setup Form UI

*   **Status:** Done
*   **Action:** Create a form for users to input core project details.
*   **Detailed Steps:**
    1.  **Component Creation (`src/pages/ProjectSetup.tsx` or `src/components/setup/ProjectDetailsForm.tsx`):**
        *   Likely presented after user selects an initial idea or starts a new project.
        *   Use ShadCN `Card` for structure.
        *   **Input Fields:**
            *   `Project Name`: ShadCN `Input`, required.
            *   `Project Description`: ShadCN `Textarea`, required.
            *   `Business Type`: ShadCN `Select` or `RadioGroup` (Physical, Software, Service). **Assumption:** Type confirmed/selected here. Required.
            *   (Optional) `Primary Objective`: ShadCN `Textarea`.
    2.  **State Management:** Use `useState` for form field values. Implement `onChange` / `onValueChange` handlers.
    3.  **Styling:** Use Tailwind utilities for layout, spacing, labels. Ensure responsiveness.
*   **Dependencies:** React (`useState`), ShadCN UI (`Card`, `Input`, `Textarea`, `Select` or `RadioGroup`, `Label`, `Button`).
*   **Verification:** Form renders correctly with required fields. User input updates state. Business type selection works.
*   **Potential Challenges:** Handling business type selection logic (global vs. local), form validation.

---

### Step 2.2: Asset Upload Component

*   **Status:** Done
*   **Action:** Implement a file drag-and-drop component for uploading initial assets (sketches, diagrams).
*   **Detailed Steps:**
    1.  **Library Integration:** Choose and install `react-dropzone`.
    2.  **Component Creation (`src/components/setup/AssetUploader.tsx`):**
        *   Integrate `react-dropzone`. Provide visual feedback (border change on drag hover).
        *   Display list of selected/uploaded files (name, size, status).
        *   Include traditional file input fallback.
        *   Handle file selection/drop (`onDrop` callback).
    3.  **State Management:** Use `useState` to track selected files and their upload progress/status.
    4.  **Styling:** Style dropzone, file list, progress indicators.
*   **Dependencies:** React (`useState`), `react-dropzone`, ShadCN UI.
*   **Verification:** User can drag/select files. Files are listed. UI provides clear feedback.
*   **Potential Challenges:** Library integration, multiple files, progress display, styling.

---

### Step 2.3: Backend Integration for Project Creation & Upload

*   **Status:** Done
*   **Action:** Implement frontend logic to submit project details and uploaded files to the backend.
*   **Detailed Steps:**
    1.  **Combine Form & Uploader:** Integrate `ProjectDetailsForm` and `AssetUploader` into the main `ProjectSetup` page/component.
    2.  **Submission Logic:**
        *   Add main "Create Project" / "Save Setup" button.
        *   Implement `onSubmit` handler.
        *   **Step 1: Create Project:** Call `POST /api/projects` with form data. Handle loading/error. Retrieve `projectId`.
        *   **Step 2: Upload Assets:** If project created and files exist, iterate through files. For each file, call `POST /api/projects/:projectId/upload-asset` with `FormData`. Update UI status. Handle individual errors.
        *   **Navigation:** On success, navigate to the next step (e.g., Ideation page for this project).
    3.  **Error Handling:** Implement robust error handling for both API calls. Provide user feedback.
*   **Dependencies:** React (`useState`), Axios, Backend Endpoints (`/api/projects`, `/api/projects/:projectId/upload-asset`).
*   **Verification:** Submit button calls create endpoint, then upload endpoint for each file using correct `projectId`. UI shows progress/status. Errors handled. Navigation occurs on success.
*   **Potential Challenges:** Coordinating multiple API calls, state management for progress/errors, large file handling, correct `projectId` usage.

---

## Phase 3: Ideation (Enhanced)

**Objective:** Implement the initial steps of the core user workflow: capturing the user's problem statement/idea, **using AI for brainstorming & simulated trend analysis**, and provoking counter-intuitive thinking.

**Rationale:** Forms the foundation of the AI-driven innovation process, adding simulated market context and creative prompts early on.

**Key Technologies:** React, TypeScript, Tailwind CSS, ShadCN UI (`Input`, `Textarea`, `Button`, `Card`, **`Dialog` / `Sheet`**), Axios, OpenAI SDK (backend), Zod (backend).

---

### Step 3.1: Structured Initial Input

*   **Status:** Done
*   **Action:** Create UI for users to input problem statement and initial solution idea. (Entry point to Ideation phase for a *specific project*).
*   **Detailed Steps:**
    1.  **Create Page/Component (`src/pages/Ideation.tsx` or `src/components/ideation/InitialInputForm.tsx`):** **Note:** This might be integrated directly into the Ideation page for the current project, potentially pre-filling from Phase 2. Fields: Problem Statement, Initial Solution Idea.
    2.  State Management (`useState`).
    3.  Submission Logic (`onSubmit`): Validate, prepare payload, trigger Step 3.2.
    4.  Styling and Layout.
*   **Dependencies:** React (`useState`), ShadCN UI (`Card`, `Input`, `Textarea`, `Button`, `Label`). Requires Project Context (`projectId`).
*   **Verification:** Form renders (potentially pre-filled), input updates state, validation works, submit triggers next step.
*   **Potential Challenges:** Integrating with project context, deciding on pre-filling logic.

---

### Step 3.2: AI-Powered Ideation (GPT-4o)

*   **Status:** Done
*   **Action:** Implement backend/frontend to call OpenAI for generating alternative ideas. (Content mostly unchanged)
*   **Detailed Steps:**
    1.  **Backend Endpoint (`POST /api/ai/ideate`):** Auth, Validate Input (Zod), Get Key, Init OpenAI Client, Construct Prompt (System: Expert assistant, User: Problem/Idea -> 5 alternatives), API Call (`gpt-4o`), Parse Response (optional), Send Response (`{ success: true, ideas: resultText_or_parsedArray }`). Needs `projectId` for context/saving later.
    2.  **Frontend API Call:** Async function, `axios`/`fetch` to `/api/ai/ideate`, pass `projectId` and form data, `withCredentials`, loading state, error handling.
    3.  **Display Results (`src/components/ideation/IdeationResults.tsx`):** `useState` for ideas, render as list/cards, loading/error indicators. Add "Save Idea" buttons (links to Post-MVP refinement).
    4.  **Integrate Components:** Trigger API from form, pass results to display.
*   **Dependencies:** Backend API Framework (0.1), OpenAI SDK, `axios`, React (`useState`, `useEffect`), ShadCN UI (`Card`, `Button`, Spinner). Requires Project Context.
*   **Verification:** Input -> Backend -> OpenAI -> Backend -> Frontend display. Auth works. Loading/error states handled.
*   **Potential Challenges:** Prompt engineering, API latency, response parsing, API costs, error handling.

---

### Step 3.3: Simulated AI Agent Scraper

*   **Status:** Done
*   **Details:** Created `src/components/ideation/AgentScraper.tsx`. Component includes a textarea for query input (pre-filled with idea context), a button to trigger analysis, loading state, and displays mock trends on completion. Integrated into the left column of `src/pages/Ideation.tsx`.
*   **Action:** Create UI component for simulated trend analysis.
*   **Detailed Steps:**
    1.  **Define Prompts:** (Handled via mock data in component). Use cases like competitor analysis, market sentiment, relevant news.
    2.  **UI Component (`src/components/ideation/AgentScraper.tsx`):**
        *   `Card` structure. Title: "Simulated Trend Analysis".
        *   `Textarea` for user query/keywords (optional, can default to idea context).
        *   "Run Simulated Analysis" button (`Button`).
        *   Loading indicator (`Loader2`).
        *   Display area for mock results (list).
    3.  **Integration (`src/pages/Ideation.tsx`):**
        *   Import and render `AgentScraper`.
        *   Pass `ideaContext` (problem + initial idea) as a prop.
*   **Dependencies:** React (`useState`), ShadCN UI (`Card`, `Textarea`, `Button`, `Label`), `lucide-react`.
*   **Verification:** Component renders, button triggers simulation, mock results appear.
*   **Potential Challenges:** Making simulation feel realistic enough.

---

### Step 3.4: Counter-Intuition Prompts

*   **Status:** Done
*   **Details:** Created `src/components/ideation/CounterIntuitionCard.tsx`. Component displays a random prompt from a predefined list and includes a button to refresh the prompt. Integrated into the left column of `src/pages/Ideation.tsx`.
*   **Action:** Display provocative prompts to encourage non-traditional thinking after initial ideation.
*   **Detailed Steps:**
    1.  **Define Prompts:** Create array of ~10-15 diverse prompts (e.g., "What if budget was zero?", "Opposite of your idea?", "Target audience is wrong?").
    2.  **UI Component (`src/components/ideation/CounterIntuitionCard.tsx`):**
        *   `Card` structure. Title: "Counter-Intuition Prompt".
        *   Display area for the current prompt text.
        *   "New Prompt" button (`Button` with `RefreshCw` icon).
    3.  **Logic:** `useState` for current prompt. `useEffect` to load initial prompt. Button handler selects random prompt from array (ensuring it differs from current if possible).
    4.  **Integration (`src/pages/Ideation.tsx`):**
        *   Import and render `CounterIntuitionCard`.
*   **Dependencies:** React (`useState`, `useEffect`), ShadCN UI (`Card`, `Button`), `lucide-react`.
*   **Verification:** Card displays prompt, refresh button works.
*   **Potential Challenges:** Writing good, diverse prompts.

---

## Phase 4: Validation (MVP Simulation) (New)

**Objective:** Allow users to define their target market and simulate idea validation using mock survey data and trend analysis, providing a basis for refinement before detailed planning.

**Rationale:** Addresses the critical validation step described in Document 2, using simulation to provide a functional demo experience without requiring complex real-world integrations for MVP.

**Key Technologies:** React, TypeScript, Tailwind CSS, ShadCN UI (`Input`, `Textarea`, `Button`, `Card`, Stepper?, Charting library e.g., `recharts`), Axios, Backend API (Mock Endpoints), Zod.

---

### Step 4.1: Target Market Definition

*   **Status:** Done
*   **Details:** Created `TargetMarketForm.tsx` component and integrated into `ValidationPage.tsx`.
*   **Action:** Create a UI form for users to define their target market segments for the current project.
*   **Detailed Steps:**
    1.  **UI Component (`src/components/validation/TargetMarketForm.tsx`):**
        *   Place at start of Validation page/section for the current project.
        *   ShadCN `Card`. Fields: `Demographics` (Textarea), `Psychographics` (Textarea), `Needs/Pain Points` (Textarea).
    2.  **State Management:** `useState` for fields. Fetch existing data if available for the project.
    3.  **Submission Logic:**
        *   "Save Target Market" button.
        *   On submit, call `PUT /api/projects/:projectId` with form data.
        *   Provide success/error feedback.
*   **Dependencies:** React (`useState`), ShadCN UI (`Card`, `Textarea`, `Button`, `Label`), Backend Endpoint (`PUT /api/projects/:projectId`). Requires Project Context.
*   **Verification:** Form renders (pre-fills if data exists). User can input/save details. Backend called correctly. Feedback provided.
*   **Potential Challenges:** Appropriate fields. Integrating save/load with project data.

---

### Step 4.2: Simulated Survey Setup & Results

*   **Status:** Done
*   **Details:** Created `SurveyWizard.tsx` and `SurveyResultsDisplay.tsx` components and integrated them into `ValidationPage.tsx`. Uses frontend mock data simulation.
*   **Action:** Implement a wizard-like UI for setting up a survey and displaying **simulated** results.
*   **Detailed Steps:**
    1.  **Survey Setup UI (`src/components/validation/SurveyWizard.tsx`):**
        *   Multi-step form (tabs/accordion/stepper).
        *   Step 1: Title, Audience (prefill from 4.1).
        *   Step 2: Questions (predefine 3-5 standard questions for MVP).
        *   Step 3: Mock Config (Budget, Respondents).
        *   "Run Simulated Survey" button.
    2.  **Backend Endpoint (`POST /api/validation/simulate-survey` - Mock):**
        *   Auth. Validate input (survey params, `projectId`).
        *   **Simulation Logic:** Generate plausible mock structured JSON results. Can be random or use GPT-4o for summary text. Example: `{ success: true, results: { q1: { ... }, q2_scale: { avg: 3.8, dist: [...] }, q3_summary: "Simulated themes..." } }`.
        *   Handle errors.
    3.  **Results Display UI (`src/components/validation/SurveyResultsDisplay.tsx`):**
        *   Receives simulated results JSON.
        *   Use `recharts` for charts (Bar/Pie).
        *   Display text summaries.
        *   Label clearly: "Simulated Results".
    4.  **Frontend Logic:**
        *   Manage wizard state.
        *   "Run" button -> Loading -> Call `/api/validation/simulate-survey` with params & `projectId`.
        *   On success: Hide wizard, show Results Display with mock data. Handle errors.
*   **Dependencies:** React (`useState`), ShadCN UI (Wizard components), `recharts`, Axios, Backend Endpoint (Mock). Requires Project Context.
*   **Verification:** Wizard works. Run button calls backend. Backend returns mock structured data. Results displayed with charts/text. Simulation indicated. Loading/errors handled.
*   **Potential Challenges:** Wizard UI. Generating plausible mock data. Chart integration. Communicating simulation.

---

### Step 4.3: Simulated Qualitative Feedback Placeholder

*   **Status:** Done
*   **Details:** Implemented as a static text placeholder card within `ValidationPage.tsx`.
*   **Action:** Provide a placeholder area representing synthesized qualitative feedback.
*   **Detailed Steps:**
    1.  **UI Component (`src/components/validation/QualitativeSummary.tsx`):**
        *   ShadCN `Card`. Title: "Qualitative Feedback Summary (Simulated)".
        *   Static placeholder text: "Simulated Summary: Interviews suggest... concerns about pricing... Feature [X] requested..."
*   **Dependencies:** React, ShadCN UI (`Card`).
*   **Verification:** Placeholder card with static text displayed.
*   **Potential Challenges:** Writing plausible text.

---

### Step 4.4: Aggregated Score (Simulated)

*   **Status:** Done
*   **Details:** Implemented as a placeholder card within `ValidationPage.tsx` displaying a mock score.
*   **Action:** Display a simulated "Product-Market Fit Score" based on the mock validation data.
*   **Detailed Steps:**
    1.  **UI Component (`src/components/validation/ValidationScore.tsx`):**
        *   `Card`. Title: "Product-Market Fit Score (Simulated)".
        *   **Score Calculation (Frontend Mock):** Calculate score based on *received simulated survey results* (state from Step 4.2). Simple logic (e.g., average scale scores).
        *   Display score visually (large number, gauge?).
        *   Note: "Score based on simulated survey data."
*   **Dependencies:** React (`useState`), ShadCN UI (`Card`). Needs access to simulated survey results state.
*   **Verification:** Score displays after simulated results available. Calculation logic simple. Simulation indicated.
*   **Potential Challenges:** Devising simple scoring logic. Visualization.

---

### Step 4.5: Simulated Market Forecasting ("Future Triplet")

*   **Status:** Done
*   **Details:** Implemented as a placeholder card within `ValidationPage.tsx` with input for signals and a button to generate mock forecast text.
*   **Action:** Implement UI for inputting market signals and displaying **simulated** forecasts.
*   **Detailed Steps:**
    1.  **Backend Endpoint (`POST /api/validation/forecast` - Mock):**
        *   Auth. Validate input (Zod: `marketSignals: string[]`, `projectId`, `ideaContext`).
        *   **Simulation Logic:** Use GPT-4o for mock forecast. Prompt: "Based on idea {ideaContext} and signals {marketSignals}, generate brief, simulated 3-point market forecast. Preface with 'Simulated Market Forecast:'."
        *   Return: `{ success: true, forecast: generated_mock_text }`. Handle errors.
    2.  **UI Component (`src/components/validation/MarketForecast.tsx`):**
        *   `Card`. Title: "Market Forecast (Simulated)".
        *   Input fields for "Key Market Signals".
        *   "Generate Forecast" button.
        *   Display area for result text.
    3.  **Frontend Logic:**
        *   Manage state for signals/result.
        *   Button click -> Loading -> Call `/api/validation/forecast` with signals, `projectId`, context.
        *   On success: Display `forecast` text. Handle errors.
*   **Dependencies:** React (`useState`), ShadCN UI (`Card`, `Input`, `Textarea`, `Button`), Axios, Backend Endpoint (Mock), OpenAI SDK. Requires Project Context.
*   **Verification:** User inputs signals, triggers generation. Backend returns mock forecast text. Result displayed. Loading/errors handled. Simulation indicated.
*   **Potential Challenges:** Effective GPT prompts for mock forecasts. UI design.

---

## Phase C: Core Feature Implementation (8uild Integration)

**Objective:** Implement the core multi-step workflows for Validation, Launch Prep, and Marketing, integrating key UI patterns and features inspired by the `8uild` project.

**Rationale:** Builds the primary user journey through the application's main phases, leveraging the `PhaseStepper` for consistent navigation.

**Key Technologies:** React, TypeScript, Tailwind CSS, ShadCN UI (PhaseStepper, Tabs, Card, Input, Button, etc.), Lucide Icons.

---

### Step C.1: Create Reusable `PhaseStepper` Component

*   **Status:** Done
*   **Details:** Created the `src/components/layout/PhaseStepper.tsx` component. It accepts steps with titles/icons and the current index, displaying progress and step titles dynamically.
*   **Action:** Create a reusable component to visualize progress through multi-step phases.
*   **Dependencies:** React, ShadCN UI (`Progress`).
*   **Verification:** Component renders steps and progress correctly based on props.

---

### Step C.2: Integrate `8uild` Validation Features

*   **Status:** Done
*   **Details:** Created `src/pages/ValidationPage.tsx`. Implemented a tabbed interface (Data Partners, Surveys, Results, Deep Research) using ShadCN Tabs. Added basic structure and static content for Data Partners and Surveys tabs.
*   **Action:** Refactor/Create `ValidationPage` to include a tabbed interface for different validation methods.
*   **Dependencies:** React, ShadCN UI (`Tabs`, `Card`, `Button`, etc.), `lucide-react`.
*   **Verification:** Page renders with tabs; initial content for Data Partners and Surveys is present.

---

### Step C.3: Integrate `8uild` Launch Features

*   **Status:** Done
*   **Details:** Created `src/pages/LaunchPrepPage.tsx`. Integrated `PhaseStepper` for a 4-step launch process (Production, Financials, Plan, Review). Implemented state management and UI components (forms, calculators, checklists, date picker) for each step.
*   **Action:** Refactor/Create `LaunchPrepPage` with `PhaseStepper` and multi-step UI for launch planning.
*   **Dependencies:** React, `PhaseStepper`, ShadCN UI (various components), `lucide-react`, `date-fns`.
*   **Verification:** Page renders stepper; each step's content is displayed correctly; navigation works.

---

### Step C.4: Add `8uild` Marketing Features

*   **Status:** Done
*   **Details:** Created `src/pages/MarketingPage.tsx`. Integrated `PhaseStepper` for a 4-step marketing planning process (Audience, Channels, Budget, Content). Implemented state management and UI components (forms, checklists, sliders, content idea list) for each step.
*   **Action:** Refactor/Create `MarketingPage` with `PhaseStepper` and multi-step UI for marketing planning.
*   **Dependencies:** React, `PhaseStepper`, ShadCN UI (various components), `lucide-react`.
*   **Verification:** Page renders stepper; each step's content is displayed correctly; navigation works.

---

## Phase 5: Visualization & MVP Specification (Renamed/Repositioned)

**Objective:** Allow users to visualize their validated idea with AI-generated concept imagery (**using mocks**) and then use AI assistance, guided by templates, to draft a simplified MVP specification.

**Rationale:** Makes the validated idea more tangible and provides a structured roadmap (MVP spec) for subsequent phases.

**Key Technologies:** React, TypeScript, Tailwind CSS, ShadCN UI (`Button`, `Card`, `Image`?, `Textarea`, **`ScrollArea`**), Axios, Backend API, OpenAI SDK, File Storage Solution (Step 0.2).

---

### Step 5.1: AI Concept Imagery (Mock) (Old Step 4.1)

*   **Status:** Done
*   **Details:** Implemented mock backend endpoint `/api/generate/image` and frontend page `Visualize.tsx` to display a placeholder image based on a prompt.
*   **Action:** Implement UI/backend for generating **mock** concept images based on the validated idea.
*   **Detailed Steps:**
    1.  **Backend Endpoint (`POST /api/generate/image` - Mock Impl):** Auth, Validate (prompt, `projectId`). **Return hardcoded placeholder URL:** `{ success: true, imageUrl: '/placeholders/concept-image.png' }`. (No real API call or storage needed for mock).
    2.  **Frontend UI (`src/pages/Visualize.tsx` or integrated):** Section for image gen, display idea context, `Textarea` for prompt, "Generate Concept Image" button.
    3.  **Frontend API Call & Display:** Async function, loading state, call `/api/generate/image` (with prompt, `projectId`), receive `imageUrl`, display using `<img>`, handle errors. Label "Concept Image (Placeholder)".
*   **Dependencies:** Backend Endpoint (Mock), Axios, React (`useState`), ShadCN UI (`Textarea`, `Button`, `Card`). Requires Project Context.
*   **Verification:** User triggers generation. Backend returns mock URL. Frontend displays placeholder image. Loading/errors handled. Placeholder clearly indicated.
*   **Potential Challenges:** Ensuring placeholder image exists and is served correctly. Clear communication.

---

### Step 5.2: Simplified MVP Specification (AI Chat) (Old Step 4.2)

*   **Status:** Done
*   **Details:** Created `MvpChatInterface.tsx` component and integrated into `PlanPage.tsx`. Backend uses basic system prompt (no doc fetching for MVP).
*   **Action:** Implement AI chat interface for collaboratively drafting an MVP specification, guided by internal documents. (Content mostly unchanged)
*   **Detailed Steps:**
    1.  **Backend Endpoint (`POST /api/mvp-chat`):** Auth, Validate (Zod: `message`, `history`, `projectId`, `ideaContext`), Get Key, Init OpenAI Client, **Fetch Guiding Docs (`getInternalDoc`)**, Construct Prompt (System: Assistant using template/guide, User: History + Message), API Call (`gpt-4o`), Send Response (`{ success: true, reply: ... }`).
    2.  **Frontend Chat UI (`src/components/planning/MvpChatInterface.tsx`?):** `useState` for history/input, render history, input field, send button. Use `ScrollArea`.
    3.  **Frontend Logic:** Send message -> Add user msg -> Clear input -> Loading -> Call `/api/mvp-chat` (with history, msg, `projectId`, context) -> Add assistant reply -> Hide loading -> Handle errors. Scroll to bottom.
    4.  **Integration:** Place component on "Plan" page, pass validated idea context and `projectId`.
*   **Dependencies:** Backend Endpoint, File Storage (Internal Docs), OpenAI SDK, Axios, React (`useState`, `useEffect`), ShadCN UI (`Input`, `Button`, `Card`, `ScrollArea`). Requires Project Context.
*   **Verification:** Chat UI works. Backend fetches docs, calls OpenAI correctly. AI guides user based on template. History maintained. Auth/errors handled.
*   **Potential Challenges:** Effective system prompts with docs, long histories (token limits), reliable doc fetching, chat UI complexity.

---

## Phase 6: Launch Prep (Renumbered - Old Phase 6)

**Objective:** Assist the user in preparing key materials for launching their product idea (pitch deck content, launch plan checklist).

**Rationale:** Translates the MVP spec into actionable launch assets.

**Key Technologies:** React, TypeScript, Tailwind CSS, ShadCN UI (`Button`, `Card`, `Textarea`, `Accordion`?, **`Checkbox`**), Axios, OpenAI SDK.

---

### Step 6.1: AI Pitch Deck Content

*   **Status:** Done
*   **Details:** Implemented backend endpoint `/api/pitch-deck` and frontend page `LaunchPrep.tsx` using an accordion to generate content for different deck sections.
*   **Action:** Implement UI/backend to generate AI content for pitch deck sections based on project context. (Content mostly unchanged)
*   **Detailed Steps:**
    1.  **Backend Endpoint (`POST /api/pitch-deck`):** Auth, Validate (Zod: `section`, `context` [problem, solution, mvpSummary...], `projectId`), Get Key, Init OpenAI, Construct Prompt, API Call (`gpt-4o`), Send Response (`{ success: true, content: ... }`).
    2.  **Frontend UI (`src/pages/LaunchPrep.tsx`?):** `Accordion`/Tabs for sections. Title, "Generate" button, `Textarea`.
    3.  **Frontend Logic:** State per section. Button click -> Loading -> Gather context (from project state/props) -> Call `/api/pitch-deck` (with context, `projectId`) -> Update state/textarea -> Hide loading -> Handle errors.
    4.  **Context Management:** Ensure context (problem, solution, MVP summary from Phase 5) is available, linked to `

### Step 6.2: Launch Checklist

*   **Status:** Done
*   **Details:** Added a static checklist with interactive checkboxes to `LaunchPrep.tsx`.
*   **Action:** Display a static, standard launch checklist.
*   **Detailed Steps:**
    1.  **Define Items:** Standard checklist (Legal, Pricing, Hosting, Domain, Analytics, Monitoring, Support, Marketing, Testing, Backup).