# Frontend Structure Document (Phase 2 - Lovable Base)

This document describes the frontend structure after replacing the initial placeholder with the codebase from the 'skarnz/8uild' repository.

## 1. Core Technologies

*   **Framework/Library:** React
*   **Language:** TypeScript
*   **Build Tool:** Vite
*   **Styling:** Tailwind CSS (utility-first CSS framework)
*   **Component Library:** Likely shadcn/ui (based on `components.json` and common Tailwind setup), providing pre-built accessible components.
*   **Routing:** react-router-dom (to be verified/integrated)
*   **State Management:** (To be determined - likely React Context API or potentially Zustand/Jotai if used in the original repo)
*   **Package Manager:** npm (or Bun, needs confirmation based on usage)

## 2. Project Structure (`src` directory)

Based on initial exploration:

*   **`main.tsx`:** Application entry point. Configures React root rendering and potentially global providers (like Router).
*   **`App.tsx`:** Main application component. Likely sets up routing and global layout.
*   **`index.css`:** Contains base Tailwind directives and potentially global custom styles.
*   **`components/`:** Contains reusable UI components.
    *   `ui/`: Often present with shadcn/ui, holding the generated primitive components (Button, Card, Input, etc.).
    *   Custom components specific to the application (e.g., ProjectCard, PhaseIndicator).
*   **`pages/`:** Components representing distinct application views/pages (e.g., Dashboard, FilesPage, IdeationPage).
*   **`layouts/`:** Components defining overall page structure (e.g., `DashboardLayout` containing Sidebar, TopBar, and content outlet).
*   **`lib/`:** Utility functions, helper modules. (Candidate location for `api.ts`).
*   **`utils/`:** General utility functions.
*   **`hooks/`:** Custom React hooks.
*   **`contexts/`:** React Context API providers and consumers for global state.

## 3. Key Components (Initial Identification - Requires Deeper Review)

*   **Layout:** Expect a main layout component in `src/layouts/` responsible for rendering the sidebar, top bar, and the main content area (`<Outlet />` from react-router-dom).
*   **Sidebar:** A component likely in `src/components/` defining the navigation links, categories, and icons.
*   **Top Bar:** A component likely in `src/components/` containing search, buttons, user actions.
*   **Dashboard/Overview Page:** A component in `src/pages/` displaying the main dashboard content (cards, project list).
*   **Files Page:** A component in `src/pages/` for file browsing/management.

## 4. Styling Approach

*   Primarily uses **Tailwind CSS** utility classes directly in component JSX (`className="..."`).
*   Global styles and Tailwind base layers are defined in `src/index.css`.
*   `tailwind.config.ts` defines theme customizations (colors, fonts) and plugins.
*   `postcss.config.js` configures PostCSS, necessary for Tailwind.
*   Component-specific styles might exist in separate CSS files if needed, but utility-first is the primary approach.

## 5. Integration Points (Plan)

*   **API Calls:** Centralized in `src/lib/api.ts` (or `src/services/api.ts`).
*   **Authentication:** State managed likely in `App.tsx` or a dedicated AuthContext, interacting with UI elements in the Top Bar or specific Login pages.
*   **Routing:** Managed by `react-router-dom`, configured in `main.tsx` or `App.tsx`, linking Sidebar items to components in `src/pages/`.

*(This document will be refined as the integration progresses and the codebase is examined in more detail.)* 