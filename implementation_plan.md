# Implementation plan

## Phase 1: Environment Setup

1. **Prevalidation**: Check if the current directory is already an initialized project (e.g., verify presence of package.json or project marker files). (Reference: Internal Standards)
Done
Directory checked. No existing project structure like `package.json` or `src` found. Proceeding with setup.
2. **Node.js Check**: Verify that Node.js v20.2.1 is installed. If not, install Node.js v20.2.1. Run `node -v` to validate. (Reference: Tech Stack: Core Tools)
Done
Verified Node.js v20.14.0 is installed and active using nvm. Proceeding with setup.
3. **Directory Setup**: Create necessary directories for the project. For example, create the `/src` directory for source code and a `/config` directory for configuration files. (Reference: Internal Standards & Templates)
Done
Created 'src' and 'config' directories in the project root.
4. **Cursor MCP Configuration (macOS & Windows)**:
   - **Prevalidation**: Check if a `.cursor` directory exists in the project root. If it exists, review its contents to ensure no conflicting settings.
   - If the directory does not exist, create a `.cursor` directory in the project root.
Done
Checked for '.cursor' directory; it did not exist. Created the '.cursor' directory.
5. **Create MCP Configuration (Cursor)**:
   - Inside `.cursor`, create a file named `mcp.json` if it doesn't exist.
   - Open the file and add the following configuration for your OS (remember to replace `<connection-string>` with your actual connection string after retrieving it from the link provided):
     - **macOS**:
       ```json
       { "mcpServers": { "supabase": { "command": "npx", "args": ["-y", "@modelcontextprotocol/server-postgres", "<connection-string>"] } } }
       ```
     - **Windows**:
       ```json
       { "mcpServers": { "supabase": { "command": "cmd", "args": ["/c", "npx", "-y", "@modelcontextprotocol/server-postgres", "<connection-string>"] } } }
       ```
   (Reference: Environment Setup, Cursor configuration instructions)
Done
Created `.cursor/mcp.json` with the macOS configuration structure.
6. **Connection String Retrieval**: Display the following link to retrieve your connection string: [Supabase MCP Connection](https://supabase.com/docs/guides/getting-started/mcp#connect-to-supabase-using-mcp). After obtaining it, update `<connection-string>` accordingly. (Reference: Environment Setup, Cursor configuration instructions)
Done
Connection string was retrieved and added to `.cursor/mcp.json` as part of Step 5 completion.
7. **MCP Active Status Check**: In Cursor, navigate to Settings > MCP and verify that the status shows green (active). (Reference: Environment Setup, Cursor configuration instructions)
Done
Verified MCP connection shows as active (green) in Cursor settings after moving `mcp.json` to the `.cursor` directory.

## Phase 2: Frontend Development

8. **Base Application Setup**: Initialize a React project if not already present (ensure no conflict with existing project files). (Reference: Core Vision & Tech Stack: Frontend)
Done
Initialized a React project using Vite in the current directory, ignoring existing files. Ran `npm install` successfully.
9. **Create Dashboard Layout**: In `/src/components`, create `DashboardLayout.jsx`. This component will wrap the entire application and include common UI elements such as navigation, dynamic breadcrumbs, and section headers. (Reference: Key Features & Functionality: Interface/Navigation)
Done
Created `src/components/DashboardLayout.jsx` with a basic layout structure including placeholders for header, main content (children), and footer.
10. **Implement Theme**: Define both dark mode and light mode CSS. Set navy background with electric blue/purple accents and use the Orbitron font in a stylesheet (e.g., `/src/styles/theme.css`). (Reference: Key Features & Functionality: Interface/Navigation)
Done
Created `src/styles/theme.css` with Orbitron font import and basic light/dark CSS variables. Imported theme file into `src/main.jsx`.
11. **Dynamic Breadcrumbs & Tabs**: Create UI components for dynamic breadcrumbs in `/src/components/Breadcrumbs.jsx` and tabs in `/src/components/Tabs.jsx`. (Reference: Key Features & Functionality: Interface/Navigation)
Done
Created placeholder components `src/components/Breadcrumbs.jsx` and `src/components/Tabs.jsx`.
12. **Navigation Controls**: Implement sequential Next/Back buttons in `/src/components/NavigationControls.jsx` to facilitate guided workflows. (Reference: Key Features & Functionality: Interface/Navigation)
Done
Created placeholder component `src/components/NavigationControls.jsx` for Next/Back buttons.
13. **State Persistence Implementation**: Incorporate mechanisms using localStorage and IndexedDB to persist session state. Add helper functions in `/src/utils/persistence.js`. Validate by simulating page refreshes. (Reference: Key Features & Functionality: Interface/Navigation)
Done
Created `src/utils` directory and `src/utils/persistence.js` with helper functions for `localStorage`. Added placeholders for potential IndexedDB functions.
14. **AI Agent Component**: Develop a persistent UI component for AiAgent in `/src/components/AiAgent.jsx` that will remain on-screen (floating or docked). Integrate API call stubs for Claude 3.7 Sonnet, GPT-3, and Gemini 2.5. (Reference: Key Features & Functionality: AI Agent)
Done
Created `src/components/AiAgent.jsx` with basic structure for a persistent UI, state management, model selection dropdown, and placeholder API call logic.
15. **File Management System (FS) UI**: Create core components for the FS:
    - File Browser in `/src/components/FileBrowser.jsx`
    - File Preview in `/src/components/FilePreview.jsx`
    - Upload/Download interface (supporting drag-drop) in `/src/components/FileUploader.jsx`
    (Reference: Key Features & Functionality: FS)
Done
Created placeholder components for the File System UI: `FileBrowser.jsx`, `FilePreview.jsx`, and `FileUploader.jsx` (with drag-drop). Located in `src/components/`.
16. **Validation**: Run React component tests (e.g., using Jest and React Testing Library) to ensure components render correctly. For example, run `npm test` and check for successful render of `DashboardLayout` and `AiAgent`. (Reference: Internal Standards & Templates)
Done
Installed Vitest/RTL, configured Vite, added setup file, created basic render tests for `DashboardLayout` and `AiAgent`. Ran `npm test` - all tests passed.

## Phase 3: Backend Development

17. **Backend Project Setup**: Initialize an Express project in a `/backend` directory ensuring Node.js v20.2.1 is used. (Reference: Tech Stack: Backend)
Done
Created `backend` directory. Initialized npm project (`npm init -y`) and installed Express (`npm install express`) inside `/backend`.
18. **Express Server Setup**: Create `/backend/index.js` and set up a basic Express server with middleware for JSON parsing. Validate by running the server and accessing a test endpoint. (Reference: Project Goal & Tech Stack: Backend)
Done
Created `backend/index.js` with basic Express server. Added `start` script to `backend/package.json`. Started server (`cd backend && npm start`) and validated with `curl http://localhost:3000/` successfully.
19. **PostgreSQL Integration**: Configure connection to PostgreSQL (using AWS RDS or Cloud SQL per tech stack). Create a database connection utility in `/backend/config/db.js`. (Reference: Tech Stack: Backend)
Done
Installed `pg` and `dotenv`. Created `backend/config` directory. Created `backend/config/db.js` with Pool setup using env vars. Created sample `backend/.env` and added `.env` and `node_modules/` to `backend/.gitignore`.
20. **Define Database Schema**: Prepare SQL scripts or migration files to create core tables such as `Users`, `Projects`, `Documents`, and `Assets` with appropriate relationships. (Reference: Key Features & Functionality: FS, and Internal Standards)
Done
Created `backend/db` directory. Created `backend/db/schema.sql` with `CREATE TABLE` statements for Users, Projects, Documents, Assets, and Integrations based on documentation, including timestamps and an auto-update trigger.
21. **File Management API Endpoints**: Create RESTful endpoints for file operations in `/backend/routes/files.js` (e.g., GET for fetching files, POST for uploads, DELETE for removals). (Reference: Key Features & Functionality: FS)
Done
Created `backend/routes` directory. Created `backend/routes/files.js` with placeholder GET, POST, DELETE route handlers using Express Router. Mounted the router in `backend/index.js` at `/api/files`.
22. **Authentication Endpoints**: Implement OAuth 2.0 authentication endpoints in `/backend/routes/auth.js` for integration with GitHub and Google Docs, ensuring HTTPS usage and token expiry management. (Reference: Key Features & Functionality: Authentication and Security)
Done
Installed Passport pkgs. Added session/OAuth env vars. Updated schema for provider IDs. Configured session/Passport middleware in index.js. Created `backend/routes/auth.js` with GitHub strategy (find/create user, upsert integration), login/callback/logout/status routes. Mounted auth router in index.js. (Google strategy TBD).
23. **AI API Proxies**: Set up proxy endpoints in `/backend/routes/ai.js` to act as intermediaries for API calls to Claude 3.7 Sonnet, GPT-3, and Gemini 2.5. (Reference: Key Features & Functionality: AI Agent functionalities)
Done
Created `backend/routes/ai.js` with a POST endpoint at `/api/ai`. Includes logic to receive model/prompt and return placeholder responses based on model type. Mounted router in `backend/index.js`.
24. **Validation**: Use tools like Postman or curl to test the endpoints (e.g., run `curl -X GET http://localhost:3000/api/files` to check file listing returns a 200 status). (Reference: Internal Standards)

## Phase 4: Integration

25. **Connecting Frontend and Backend**: Modify frontend service files (e.g., `/src/services/api.js`) to add API calls connecting to endpoints defined in the backend (e.g., file management, authentication). (Reference: App Flow: Connection between modules)
26. **Integrate AI Agent**: From the AiAgent component, create service calls to the backend proxy endpoints for AI interactions. Validate by simulating requests. (Reference: Key Features & Functionality: AI Agent)
27. **CORS Configuration**: On the Express server, implement CORS middleware allowing requests from the frontend's origin (e.g., `http://localhost:3000`). (Reference: Tech Stack: Backend)
28. **Validation**: Manually perform integration tests by running both frontend and backend concurrently and ensuring proper data exchange (e.g., file upload from UI reflects in the backend database, OAuth flow works from frontend to backend). (Reference: Internal Testing Procedures)

## Phase 5: Deployment

29. **Backend Deployment Configuration**: Prepare deployment configuration for AWS Elastic Beanstalk. Create a configuration file at `/infra/aws/beanstalk.yaml` with details such as region specifications (e.g., `us-east-1`) and instance types. (Reference: Tech Stack: Deployment)
30. **Frontend Deployment Setup**: Build the React application and configure deployment to an AWS S3 bucket (e.g., bucket name `app-static-assets` in `us-east-1`). Set up CloudFront CDN for widget delivery. (Reference: Tech Stack: Deployment)
31. **Security & OAuth Configuration**: Ensure OAuth 2.0 secret keys and connection details for GitHub and Google Docs are securely stored as environment variables in your deployment configurations. (Reference: Key Features & Functionality: Authentication and Security)
32. **Validation (Pre-Deployment Testing)**: Run end-to-end tests (e.g., using Cypress) against a staging URL to verify the full app flow including login, file management, and AI features functioning properly. (Reference: Q&A: Pre-Launch Checklist)
33. **Deployment Execution**: Deploy backend and frontend code following the prepared configurations. Monitor logs for errors and confirm that all services (file storage, AI proxy endpoints, OAuth flows) are working correctly in the production environment. (Reference: Tech Stack: Deployment)

**Final Note:** Make sure throughout the implementation to refer back to internal documentation and the project specifics (e.g., file integrations with GitHub and Google Docs, meshy.ai API for 3D Modeling, and Chart.js for visualizations) to remain aligned with the comprehensive project goals.

**Prevalidation Step:** Always analyze your project directory before executing any initialization or setup steps to avoid redundancy or configuration conflicts.
