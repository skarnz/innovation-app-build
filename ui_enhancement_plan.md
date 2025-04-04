# Plan: UI Enhancements (Based on CodeGuide Inspiration)

**Note on Scope:** This plan outlines UI refinements inspired by CodeGuide. Features marked as "(Post-MVP)" and the full Dashboard Refactor (Step 7) are intended for implementation on the `feature/ui-enhancements` branch *after* the core MVP integration is complete. The MVP UI requirements include the Miniaturized Sidebar (Step 1), Large Page Headers (Step 6), and the Light/Dark Mode Toggle (Step 1.5).

This plan details the steps to refine the UI of the Innovation Platform, drawing inspiration from the provided CodeGuide screenshots, focusing on specific layout and component styles.

**Phase 1: Sidebar & Theme Refinement (MVP Scope)**

1.  **Miniaturized Sidebar State:**
    *   *Status:* In Progress
    *   *Action:* Modify `src/components/Sidebar.tsx` and `src/layouts/DashboardLayout.tsx`.
    *   *Details:*
        *   When the sidebar is closed (`isSidebarOpen` is false), instead of completely disappearing or just changing the margin, render only the icons for each primary navigation item, vertically centered. The text labels should be hidden.
        *   Adjust the `DashboardLayout`'s main content margin (`ml-`) dynamically. When the sidebar is open, use the full width margin (`ml-64`). When closed, use a smaller margin corresponding to the width of the icon-only sidebar (e.g., `ml-16` or `ml-20`).
        *   Ensure the toggle button (`PanelLeft`/`PanelRight`) still functions correctly and is positioned appropriately relative to the miniaturized or full sidebar.
        *   Update the `Sidebar` component's internal layout to support this icon-only view, perhaps using conditional rendering based on the `isOpen` prop.
    *   *Rationale:* Mimics the space-saving collapsed sidebar behavior from the reference image.

1.5. **Implement Light/Dark Mode Toggle (MVP Scope):**
    *   *Action:* Install `next-themes`, configure Tailwind, add `ThemeProvider`, create and place a toggle component.
    *   *Details:*
        *   Install the `next-themes` package (`npm install next-themes`).
        *   Update `tailwind.config.ts` to enable class-based dark mode (`darkMode: 'class'`).
        *   Wrap the main application in `src/main.tsx` or `src/App.tsx` with a `ThemeProvider` from `next-themes`.
        *   Create a `ThemeToggle.tsx` component using ShadCN UI components (e.g., a `Button` or `DropdownMenu` with Sun/Moon icons) that utilizes the `useTheme` hook from `next-themes` to switch between 'light', 'dark', and potentially 'system' themes.
        *   Place the `ThemeToggle` component in a suitable location, such as the bottom of the `Sidebar` or within the `TopBar` user menu.
    *   *Rationale:* Provides user control over the application's color scheme, a requested MVP feature.

2.  **Add 'Support' Link:**
    *   *Status:* Done (Implemented during Step 1 refactor)
    *   *Action:* Modify `src/components/Sidebar.tsx`.
    *   *Details:* Add a new navigation item for "Support" towards the bottom of the sidebar, potentially below a separator. Use an appropriate icon (e.g., `LifeBuoy` from `lucide-react`). Link it to a placeholder route like `/support` for now.
    *   *Rationale:* Incorporates the support link placement seen in the reference.

3.  **Add 'Community' Link:**
    *   *Status:* Done (Implemented during Step 1 refactor)
    *   *Action:* Modify `src/components/Sidebar.tsx`.
    *   *Details:* Add a new navigation item for "Community" within the main navigation list. Use an appropriate icon (e.g., `Users` from `lucide-react`). Link it to a placeholder route like `/community`.
    *   *Rationale:* Adds the community element mentioned.

**Phase 2: Content Area & Headers (MVP Scope)**

4.  **Add 'Deep Research' Tab/Link:**
    *   *Status:* Done (Implemented during Step 1 refactor)
    *   *Action:* Modify `src/components/Sidebar.tsx`.
    *   *Details:* Add a new navigation item for "Deep Research" under a "RESOURCES" heading or similar grouping within the sidebar. Use an appropriate icon (e.g., `Search` or `BrainCircuit` from `lucide-react`). Link it to a placeholder route like `/deep-research`. Mark it as "New" using a small badge if desired (using `Badge` component from ShadCN).
    *   *Rationale:* Adds the universal deep research element.

5.  **Implement Large Page Headers (MVP Scope):**
    *   *Action:* Create a reusable `PageHeader.tsx` component and integrate it into key page components (e.g., `src/pages/Dashboard.tsx`, `src/pages/ProjectSetup.tsx`).
    *   *Details:*
        *   The `PageHeader` component should accept `title` and optional `subtitle` props.
        *   It should render the `title` in a large, bold font (e.g., `text-2xl` or `text-3xl font-bold`) and the `subtitle` below it in a smaller, lighter font (e.g., `text-sm text-slate-dark`).
        *   Refactor existing page components to use this `<PageHeader>` at the top of their content, removing any existing smaller title elements.
    *   *Rationale:* Achieves the prominent page titles seen in the reference images.

**Phase 3: Dashboard Layout (Post-MVP)**

6.  **Refactor Dashboard Layout:**
    *   *Action:* Modify `src/pages/Dashboard.tsx`.
    *   *Details:*
        *   Analyze the current dashboard structure (`Dashboard.tsx` likely needs reading/modification).
        *   Reorganize the layout to resemble the reference image's dashboard:
            *   Use a grid layout (e.g., `grid grid-cols-1 lg:grid-cols-3 gap-6`).
            *   Create card components (using `Card` from ShadCN) for sections like "Recent Projects", "Inspiration", "Project Templates", and "Tips".
            *   Populate these cards with placeholder data or simplified versions of existing logic.
            *   Ensure appropriate titles (`CardHeader`, `CardTitle`) and potentially "View All" links within each card.
            *   Focus on clean spacing and alignment.
    *   *Rationale:* Implements the simpler, high-functionality dashboard layout inspired by the reference.

**Phase 4: Community Page Integration (Post-MVP)**

7.  **Create Community Page Structure:**
    *   *Action:* Create `src/pages/Community.tsx` and necessary sub-components.
    *   *Details:*
        *   The main page should use a two-column layout (similar to the screenshot).
        *   Create a `ChannelsSidebar.tsx` component to display the list of community channels (Announcements, Events, Introduction, General Chat, etc.) with icons.
        *   Create a `PostFeed.tsx` component for the main content area to display posts/threads.
        *   Create a `MessageInput.tsx` component for the bottom input area, including text input and potentially attachment/emoji buttons.
    *   *Rationale:* Sets up the basic layout and components for the community section.

8.  **Implement Channel Selection & Display:**
    *   *Action:* Add state management to `Community.tsx` or a context.
    *   *Details:*
        *   Clicking a channel in `ChannelsSidebar` should update the application state.
        *   `PostFeed` should display placeholder posts relevant to the selected channel.
        *   Implement basic routing if different channels require distinct URLs (e.g., `/community/cofounder`).
    *   *Rationale:* Enables navigation between different community channels.

9.  **Implement Post/Message Display:**
    *   *Action:* Refine the `PostFeed.tsx` component.
    *   *Details:*
        *   Develop the visual style for individual posts/messages, including user avatars, names, timestamps, content, and reply indicators (based on screenshot).
        *   Add placeholder data fetching logic (simulating API calls).
    *   *Rationale:* Displays community content in the desired format.

10. **Implement Message Input:**
    *   *Action:* Refine the `MessageInput.tsx` component.
    *   *Details:*
        *   Style the input field and send button.
        *   Connect the input field to component state.
        *   Implement placeholder logic for sending a message (e.g., adding it to the local state for display).
    *   *Rationale:* Allows users to interact by typing messages.

**Phase 5: Validation & Cleanup (Post-MVP Focus)**

11. **UI Review & Testing:**
    *   *Action:* Manually review all modified pages and components (Sidebar, Headers, Dashboard, Community).
    *   *Details:* Check for layout consistency, correct sidebar behavior, header appearance, dashboard organization, community page functionality, and responsiveness. Test navigation links.
    *   *Rationale:* Ensure the UI changes are implemented correctly and consistently.

12. **Commit & Push:**
    *   *Action:* Stage all modified files.
    *   *Action:* Commit the changes with a descriptive message (e.g., "Feat: Implement UI enhancements inspired by CodeGuide").
    *   *Action:* Push the `feature/ui-enhancements` branch to the remote repository.
    *   *Rationale:* Save the completed UI enhancement work. 