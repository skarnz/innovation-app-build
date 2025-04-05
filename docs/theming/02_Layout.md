# Theming Plan - Phase 1: Core Layout Components Styling

**Goal:** Apply the defined theme foundation (colors, typography) to the primary layout structure (`DashboardLayout.tsx`) and its core persistent elements (`DashboardNavbar.tsx`, `Sidebar.tsx`). This phase establishes the main visual shell for the authenticated application experience.

**Prerequisites:** Phase 0 (Theme Foundation) must be complete. CSS variables and Tailwind configuration should be correctly set up.

**Files Primarily Affected:**

*   `src/layouts/DashboardLayout.tsx`
*   `src/components/layout/DashboardNavbar.tsx`
*   `src/components/Sidebar.tsx`
*   `src/config/sidebarNav.ts` (If used for sidebar structure)
*   `src/components/BuildLogo.tsx` (If styling needs adjustment)

## Steps:

1.  **Style `DashboardLayout.tsx` Root:**
    *   **Action:** Apply background and setup for background elements.
    *   **Details:**
        *   Ensure the root `div` has `bg-background` (which maps to `bg-deep-navy` via CSS var).
        *   Add `relative overflow-hidden` to the root `div` to contain the background circles.
        *   Implement the background circle `div` elements:
            ```html
            {/* Background Circles - Place *before* the main content wrapper */}
            <div className="absolute -top-1/3 -left-1/4 w-3/4 h-3/4 rounded-full bg-gradient-blue opacity-[0.07] blur-[120px] pointer-events-none -z-10"></div>
            <div className="absolute -bottom-1/3 -right-1/4 w-3/4 h-3/4 rounded-full bg-gradient-purple opacity-[0.07] blur-[120px] pointer-events-none -z-10"></div>
            {/* Main Content Wrapper (must have relative positioning) */}
            <div className="relative z-0 flex flex-grow ...">
                {/* Sidebar, Navbar, Outlet go here */}
            </div>
            ```
            *Note: Used `gradient-blue`/`gradient-purple` for circles based on landing page; adjust if `circle-blue`/`circle-purple` names were intended for different shades. Added `-z-10` to ensure they are behind everything.*
        *   Verify the main content wrapper `div` (the one that gets dynamic margins) has `relative` positioning (or `z-0`) so its content appears above the background circles.
    *   **Integration Check:** Confirm no existing background styles conflict. Ensure `overflow-hidden` doesn't clip necessary popups originating from within the layout (unlikely, but possible).

2.  **Style `DashboardNavbar.tsx`:**
    *   **Action:** Apply theme to the main navbar for authenticated users.
    *   **Details:**
        *   **Container (`<nav>`):** Apply `bg-card` (`charcoal-blue`) or optionally `glass-card` utility (if defined in Phase 0, e.g., `bg-card/70 backdrop-blur-md border-b border-border`). Use `sticky top-0 z-40`. Apply `border-b border-border` (`cool-gray`). Height `h-16`. Text default `text-foreground` (`pale-blue`).
        *   **Logo (`BuildLogo`):** Verify it uses `text-gradient` or `text-gradient-hero` (from `medium-blue` to `lavender`). Ensure it scales appropriately (`h-6` seems okay).
        *   **Search Input:** Apply themed classes: `bg-input` (`neutral-gray`), `border border-border` (`cool-gray`), `text-foreground` (`pale-blue`), `placeholder:text-muted-foreground` (`lavender-gray`), focus styles (`focus:border-primary focus:ring-1 focus:ring-primary` - using `periwinkle`). Adjust padding (`pl-10`) and height (`h-9`) as needed. Ensure icon color is `text-muted-foreground`.
        *   **"New Project" Button:**
            *   Apply skewed button style. Add classes `relative overflow-hidden -skew-x-12`.
            *   Add inner `<span>` for gradient: `<span className="absolute inset-0 bg-hero-gradient ..."></span>`.
            *   Add inner `<span>` for text: `<span className="relative z-10 skew-x-12 text-white ...">New Project</span>`. Use `text-white` or `text-pale-blue` for contrast.
            *   *Alternative:* If skew is too complex here, use a standard primary button: `bg-primary` (`periwinkle`), `text-primary-foreground` (`pale-blue`), standard `Button` component `variant="default"`. *Recommendation: Use standard primary button here for simplicity unless skew is essential.*
        *   **Icon Buttons (Bell, User):** Apply `variant="ghost"` (`text-muted-foreground`, `hover:bg-accent/10`, `hover:text-accent`). Ensure icons use appropriate size (e.g., `size={18}`).
        *   **User Dropdown (Placeholder):** The user button should eventually trigger a themed `DropdownMenu`. Ensure the placeholder button style is consistent (`variant="ghost"`).
    *   **Integration Check:** Verify class names match Tailwind config. Ensure Navbar height (`h-16`) is accounted for in `DashboardLayout`'s main content `mt-16` margin. Check responsiveness - does search input shrink gracefully? Does "New Project" text wrap or get hidden? (Use `hidden sm:flex` as currently implemented).

3.  **Style `Sidebar.tsx`:**
    *   **Action:** Apply theme to the collapsible sidebar.
    *   **Details:**
        *   **Container (`<div ref={sidebarRef}>`):** Apply `bg-card` (`charcoal-blue`). Ensure `border-r border-border` (`cool-gray`). Verify `transition-transform` for smooth open/close. Ensure `fixed top-0 left-0 h-screen z-40`. Adjust width classes (`w-64`, potentially `w-20` for collapsed state if implemented based on `ui_enhancement_plan.md`).
        *   **Header (`<div>` with "BUILD" or icon):** Apply `h-16` (match Navbar), `border-b border-border`. Style "BUILD" text (`font-orbitron text-lg uppercase text-foreground`) or icon (`text-primary`). Center content vertically (`flex items-center`).
        *   **Nav Links (`NavLink` component):**
            *   **Inactive State:** `text-muted-foreground` (`lavender-gray`), `hover:text-foreground`. Icon color `text-muted-foreground`. Background transparent.
            *   **Active State:** Apply styling based on decision in Phase 1. *Recommendation: `text-primary` (`periwinkle`), `border-l-2 border-primary`, keep background transparent.* Apply this conditionally using `cn()` based on `active` prop. Icon color `text-primary`.
            *   **Typography:** Use `font-sans text-sm font-medium`.
            *   **Padding/Spacing:** Adjust `py-3 px-4 gap-3` as needed for visual balance.
        *   **Category Toggles (`CategoryToggle` component):**
            *   Style button similar to inactive `NavLink`.
            *   Style expand/collapse icon (`ChevronDown/Up`) color: `text-muted-foreground`.
            *   Style indented links within toggle using `NavLink` styles. Adjust indentation (`ml-8 pl-3 border-l border-border/50`).
        *   **Section Headers (e.g., "PHASES"):** Style using `font-orbitron uppercase text-xs text-muted-foreground px-4 mt-4 mb-1`.
        *   **Bottom Section (Support, etc.):** Apply `mt-auto border-t border-border p-2`. Style links using `NavLink` styles. Ensure `ThemeToggle` (if added from stash/plan) is styled appropriately (likely `ghost` button).
    *   **Integration Check:** Verify props like `isOpen`, `projectId` are handled correctly. Ensure active state logic (`useLocation`) works reliably. Check scroll behavior (`overflow-y-auto`) for long sidebars. If collapsed state (`w-20`) is implemented, ensure icons-only view is styled correctly (centered icons, tooltips for labels).

4.  **Style `BuildLogo.tsx` (If Necessary):**
    *   **Action:** Review the `BuildLogo` component itself.
    *   **Details:** Ensure it correctly applies the `text-gradient` or `text-gradient-hero` classes when used with those classes. If it's an SVG, ensure `fill="currentColor"` is used so text color utilities work. If it has internal hover effects, disable them for the navbar instance. No changes likely needed if it's simple text/SVG inheriting color.
    *   **Integration Check:** Verify logo appears correctly in both `LandingNavbar` (smaller) and `DashboardNavbar` (smaller), and `HeroSection` (large, responsive).

## Expected Outcome for Phase 1:

*   The main application layout (Sidebar, Navbar, main background) uses the new dark color scheme (deep navy, charcoal blue, cool gray borders).
*   Background circles provide subtle visual depth.
*   Navbar includes a themed search bar and action buttons (New Project potentially skewed or primary-colored).
*   Sidebar uses themed colors for active/inactive links and icons.
*   Typography (Inter/Orbitron) is applied correctly in layout components.
*   Layout components are prepared for themed content to be placed within them in subsequent phases. 