# Implementation Plan: Post-MVP Features

**Document Version:** 1.0
**Date:** 2024-04-04
**Target Branch:** (Likely `main` or specific feature branches after MVP release)

**Overall Goal:** Implement advanced features and full phase functionalities deferred from the initial MVP demo build.

**Note:** This document details features identified as Post-MVP during the planning of the MVP Demo (`implementation_plan_part3_demo.md`). Refer to that document for the MVP scope.

---

## Phase 5: Prototyping (Full Implementation)

**Objective:** Enable users to transform MVP specs into tangible prototypes tailored to their product type (Hardware, Software, Service), leveraging AI and visualization tools.

**Key Technologies:** React, `react-three-fiber` / `drei`, Tailwind CSS, Backend API, Gradio Client (for HF Spaces), potentially Blender scripting integration, Mermaid.js (for flowcharts).

---

### Step 5.1: Text-to-3D Model Generation

*   **Status:** Not Started
*   **Action:* Create UI for 3D generation prompt/display. Implement backend endpoint `/api/generate/model` interaction with Hunyuan3D-2 Hugging Face Space.
*   **Detailed Steps:**
    1.  **Frontend UI (`src/pages/prototyping/ModelGeneration.tsx`?):**
        *   Create a dedicated page or component within the Prototyping section.
        *   Include a text input (`Textarea`) for the detailed 3D model prompt.
        *   Add configuration options (dropdowns/sliders) corresponding to Hunyuan3D-2 parameters (e.g., Octree Resolution, Guidance Scale, Seed) - potentially under an "Advanced Settings" toggle.
        *   Include a "Generate Model" button.
        *   Implement loading state (e.g., spinner, progress message) after clicking Generate.
        *   Provide an area to display the generated 3D model using `react-three-fiber`.
        *   Add controls for the 3D viewer (orbit, zoom, pan) using `@react-three/drei`'s `OrbitControls`.
        *   Add a button/link to download the generated model file (OBJ/GLB).
    2.  **Backend Endpoint (`POST /api/generate/model`):**
        *   Implement the full logic for this endpoint (expanding on the stub from Phase 0).
        *   Validate incoming request body (prompt, optional config parameters).
        *   Retrieve HF Token and Space URL from environment variables.
        *   Initialize Gradio client: `await Client.connect(process.env.GRADIO_HF_SPACE_URL, { hf_token: process.env.HUGGINGFACE_TOKEN });`
        *   Call `client.predict('/generation_all', { ...payload... });`, mapping frontend parameters to the expected API payload for Hunyuan3D-2. (Reference `game-asset-mcp` for exact payload structure).
        *   **Handle Long-Running Task:** Gradio predictions can be slow. Determine if `predict` returns a job ID for polling or if the connection needs to be kept open (potentially using Server-Sent Events or WebSockets if standard HTTP timeout is insufficient). *Initial implementation might assume completion within timeout.*
        *   On successful generation, the Gradio client should return information about the output files (likely paths within the HF space).
        *   Download the generated model file(s) (e.g., `.glb`, potentially `.obj` and textures) from the HF space output path using the Gradio client or direct fetch.
        *   Save the downloaded model file(s) to the configured File Storage (Step 0.2), using a unique filename.
        *   Return the public URL or signed URL of the saved model file to the frontend.
        *   Implement robust error handling for API calls, downloads, and file saving.
    3.  **Frontend Display:**
        *   When the backend returns the model URL, update the component state.
        *   Use `@react-three/drei`'s `useGLTF` hook to load the model from the URL: `const { scene } = useGLTF(modelUrl)`. Ensure CORS is configured correctly on the file storage if needed.
        *   Render the loaded `scene` within the `Canvas` component: `<primitive object={scene} />`.
        *   Add basic lighting (`ambientLight`, `directionalLight`) to the scene for visibility.
*   **Dependencies:** Backend Endpoint (0.3), File Storage (0.2), Gradio Client (`@gradio/client`), `react-three-fiber`, `@react-three/drei`, User-provided HF Space URL/Token.
*   **Verification:** User can enter a prompt, generate a 3D model via the backend calling the HF Space, the model is saved, and the frontend displays the interactive 3D model. Configuration options influence the output. Download works.
*   **Potential Challenges:** Handling Gradio API nuances and potential long prediction times, 3D model loading performance/errors in the browser, CORS issues with model URLs, mapping frontend config options to API parameters accurately.

---

### Step 5.2: Implement Software Prototyping Track

*   **Status:** Not Started
*   **Action:** Develop features for creating wireframes, UI mockups, and flow diagrams.
*   **Detailed Steps:**
    1.  **Wireframing/Mockup Tool:**
        *   *Option A (Integration):* Explore integrating a library like `tldraw` or a similar open-source wireframing canvas component.
        *   *Option B (Simple):* Create a basic drag-and-drop interface with predefined UI elements (buttons, inputs, text blocks) that can be arranged on a canvas. Save layout as JSON.
        *   Allow exporting the view as an image.
    2.  **Flow Diagram Tool:**
        *   Integrate `mermaid.js` library.
        *   Provide a text input where users can write Mermaid syntax for flowcharts/diagrams.
        *   Render the diagram dynamically below the input using `mermaid.render()`.
        *   Allow saving the Mermaid source text and exporting the diagram as SVG/PNG.
*   **Dependencies:** `mermaid.js`, potentially `tldraw` or other canvas libraries.
*   **Verification:** Users can create basic wireframes/mockups and flow diagrams related to their software MVP spec.

---

### Step 5.3: Implement Service Prototyping Track

*   **Status:** Not Started
*   **Action:** Develop features for creating service blueprints and storyboards.
*   **Detailed Steps:**
    1.  **Service Blueprint Tool:**
        *   Create a structured form or canvas for mapping out service blueprint components (Customer Actions, Frontstage Actions, Backstage Actions, Support Processes, Physical Evidence).
        *   Allow linking between steps.
        *   Save the blueprint data (likely JSON).
    2.  **Storyboard Tool:**
        *   Provide a sequence of panels/cards.
        *   Each panel allows adding a sketch/image (upload or generated via AI Image Gen - Step 4.1) and a text description.
        *   Allow reordering panels.
*   **Dependencies:** File Storage (0.2), AI Image Generation API (optional).
*   **Verification:** Users can create basic service blueprints and visual storyboards.

---

*(Add details for other deferred phases like Full Launch, Full Marketing, Scaling, Partnerships similarly)*

---

## Phase 8: Dashboard Layout Refactor (Post-MVP)

*   **Status:** Not Started
*   **Action:* Modify `src/pages/Dashboard.tsx` to match the CodeGuide-inspired layout.
*   **Detailed Steps:**
    1.  **Implement Grid Layout:** Use Tailwind CSS grid classes (`grid grid-cols-1 lg:grid-cols-3 gap-6`) for the main dashboard content area.
    2.  **Create Reusable Card Component:** If not already done, ensure a standardized Card component exists (using ShadCN UI `Card`, `CardHeader`, `CardTitle`, `CardContent`, `CardFooter`).
    3.  **Develop Content Sections as Cards:**
        *   **"Recent Projects" Card:** Fetch and display a list of the user's recent projects (requires project data model/storage). Include links to each project.
        *   **"Inspiration" Card:** Display curated links, images, or ideas (potentially fetched dynamically or hardcoded initially).
        *   **"Project Templates" Card:** Show predefined project templates (e.g., SaaS App, E-commerce Store, Physical Product) that users can start from.
        *   **"Helpful Tips" Card:** Display contextual tips or links to documentation/guides.
    4.  **Data Fetching:** Implement placeholder data fetching logic initially. Replace with actual API calls when project data management is implemented.
    5.  **Styling:** Ensure consistent spacing, padding, and typography within and between cards.
*   **Dependencies:** ShadCN UI Card component, Project data model/API (eventually).
*   **Verification:** Dashboard displays content in a multi-column grid layout using styled cards. Placeholder data is shown correctly.

---

## Phase 9: Community Page Integration (Post-MVP)

*   **Status:** Not Started
*   **Action:* Build out the full Community page feature set.
*   **Detailed Steps:**
    1.  **Create Page & Components (`Community.tsx`, `ChannelsSidebar.tsx`, etc.):** Implement the basic file structure and component shells with placeholder content based on the screenshot layout (two-column).
    2.  **Channel List (`ChannelsSidebar.tsx`):** Hardcode or fetch a list of channels (e.g., #announcements, #general, #introductions, #feedback). Display list with icons. Implement selection state management (e.g., `useState` in `Community.tsx` or React Context).
    3.  **Post Feed (`PostFeed.tsx`):** Based on the selected channel, display a list of placeholder posts. Define the structure/style of a single post (avatar, username, timestamp, content, reply indicator).
    4.  **Message Input (`MessageInput.tsx`):** Implement the text input area at the bottom. Include state management for the input value. Add a non-functional Send button.
    5.  **Routing (Optional):** Implement sub-routes if needed (e.g., `/community/:channelName`).
    6.  **(Later) Backend Integration:** Create backend models (User, Channel, Post, Message) and API endpoints for fetching channels, posts, and submitting messages.
*   **Dependencies:** React Router, State Management.
*   **Verification:** Community page renders with channel list, placeholder post feed, and message input. Selecting channels updates the displayed feed (with placeholders).

--- 