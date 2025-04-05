# Theming Plan - Phase 5: Testing & Refinement

**Goal:** To rigorously validate the implemented theme across the entire application, ensuring visual consistency, functional integrity, accessibility compliance, responsiveness, and cross-browser compatibility. This phase involves systematic testing, bug fixing, and final adjustments based on feedback.

**Prerequisites:** Phases 0, 1, 2, 3, and 4 complete. The theme should be applied across layouts, components, pages, and effects.

**Team & Roles (Example):**

*   **Lead Developer/Themer:** Oversees the testing process, consolidates feedback, makes final code adjustments.
*   **QA Tester(s):** Executes systematic test cases for visuals, functionality, and accessibility.
*   **Designer (Optional):** Provides expert visual review and feedback on consistency and aesthetics.
*   **Other Developers:** Can assist with testing specific features they worked on.

## Strategy:

*   **Systematic Approach:** Use checklists and defined test cases covering various aspects (visual, functional, accessibility, etc.).
*   **Multiple Environments:** Test on different browsers, operating systems, and screen sizes (desktop, tablet, mobile).
*   **Combine Automated & Manual Testing:** Use tools for contrast checking but rely heavily on manual visual inspection and interaction testing.
*   **Iterative Refinement:** Expect to find issues and iterate on styling fixes based on test results.

## Testing Checklist & Procedures:

**1. Visual Consistency Testing (Manual):**

*   **Action:** Compare key pages and components against the styled Landing Page (`src/pages/Index.tsx`) and the defined theme guidelines (Phase 0).
*   **Checklist:**
    *   [ ] **Colors:** Backgrounds (main, card, popover, input), Text (foreground, muted), Accents (primary, secondary), Borders match the defined palette? Gradients applied correctly (buttons, text)?
    *   [ ] **Typography:** Correct fonts used (Inter, Orbitron)? Correct sizes and weights for headings, body text, labels, buttons? Consistent line heights?
    *   [ ] **Spacing:** Consistent padding within pages, cards, components? Consistent margins between elements? Consistent gaps in flex/grid layouts?
    *   [ ] **Borders & Radius:** Consistent border thickness and color (`border-border`)? Consistent corner rounding (`rounded-md`, `rounded-lg`, `rounded-full`)?
    *   [ ] **Iconography:** Icons consistently sized and colored (e.g., `text-primary`, `text-muted-foreground`)?
    *   [ ] **Component Styles:** Do instances of Button, Input, Card, etc., look identical when using the same variant?
    *   [ ] **Special Effects:** Are background circles positioned correctly and subtly visible? Is glassmorphism applied appropriately and consistently where intended? Are hover glows consistent? Is button skew applied correctly?
*   **Method:** Open multiple pages side-by-side or use screenshots for comparison. Focus on detail.

**2. Functional Regression Testing (Manual):**

*   **Action:** Test core application workflows to ensure UI changes haven't broken functionality.
*   **Checklist (Example Workflows):**
    *   [ ] **Authentication:** Login via GitHub (redirect, callback, authenticated state update). Logout.
    *   [ ] **Project Creation:** Navigate to setup, fill form, create project (check API call if possible, or at least navigation).
    *   [ ] **File Management:** View file list (check loading state). Select files/folders. Create/Rename/Delete (verify UI update, even if API calls are placeholders). Open editor.
    *   [ ] **AI Agent:** Open/close/minimize window. Send message, receive reply (check loading/error states).
    *   [ ] **Navigation:** Click all Sidebar links. Click Navbar links (Logo, New Project). Use breadcrumbs if present.
    *   [ ] **Forms:** Submit any other forms present in different phases (Validation, MVP spec inputs, etc.). Check validation messages if any.
*   **Method:** Follow standard user paths through the application. Monitor browser developer console for errors.

**3. Accessibility Testing (Manual & Automated):**

*   **Action:** Verify theme meets basic accessibility standards, focusing on contrast and keyboard navigation.
*   **Checklist:**
    *   [ ] **Color Contrast:**
        *   Use browser dev tools (inspector) or online contrast checkers (e.g., WebAIM Contrast Checker) to measure ratios for:
            *   `text-foreground` on `bg-background`.
            *   `text-foreground` on `bg-card`.
            *   `text-primary-foreground` on `bg-primary` (CRITICAL: light text on Periwinkle).
            *   `text-secondary-foreground` on `bg-secondary`.
            *   `text-muted-foreground` on `bg-background`.
            *   Placeholder text within inputs (`bg-input`).
        *   Ensure ratios meet WCAG AA minimums (4.5:1 for normal text, 3:1 for large text/UI components). Adjust HSL values in CSS variables if needed.
    *   [ ] **Keyboard Navigation:**
        *   Tab through *all* interactive elements on key pages (`LandingNavbar`, `DashboardNavbar`, `Sidebar`, `HeroSection` buttons, forms, `FileExplorer`, `AiAgent` buttons/input).
        *   Confirm logical tab order.
        *   Confirm a clear focus indicator (`ring-ring` - Periwinkle) is visible on *every* focused element.
    *   [ ] **Screen Reader (Basic Check - Optional):** Use a screen reader (VoiceOver, NVDA) to navigate key pages. Ensure main landmarks, headings, links, and form controls are announced reasonably. (Full screen reader testing is extensive and may be out of scope).
*   **Method:** Combine automated tool checks (contrast checkers) with manual keyboard navigation and visual inspection of focus states.

**4. Responsiveness Testing (Manual):**

*   **Action:** Test the application appearance and layout on different viewport sizes.
*   **Checklist:**
    *   [ ] **Breakpoints:** Use browser dev tools to simulate common device widths (e.g., 375px, 768px, 1024px, 1280px, 1536px+).
    *   [ ] **Layout:** Does the layout adapt correctly (e.g., grids wrap, sidebar collapses/adjusts margin)? No horizontal scrollbars?
    *   [ ] **Text:** Is text readable? Does large text (e.g., hero logo/heading) wrap awkwardly or become too small?
    *   [ ] **Component Scaling:** Do buttons, inputs, cards resize reasonably? Are tap targets large enough on mobile?
    *   [ ] **Navigation:** Is mobile navigation accessible (e.g., hamburger menu for `LandingNavbar`, potentially collapsed `Sidebar` state)?
*   **Method:** Resize browser window extensively. Use device emulation in dev tools. Test on physical devices if possible.

**5. Cross-Browser Testing (Manual):**

*   **Action:** Verify consistent appearance and functionality in the latest versions of major target browsers.
*   **Checklist:**
    *   [ ] **Chrome (Latest)**
    *   [ ] **Firefox (Latest)**
    *   [ ] **Safari (Latest)**
    *   [ ] **Edge (Latest)**
*   **Focus Areas:** Check rendering of gradients, shadows, blur effects (glassmorphism), flexbox/grid layouts, custom fonts, focus rings, and animations.
*   **Method:** Open the application in each target browser and perform spot checks on key pages and components. Note any significant visual or functional discrepancies.

**6. Refinement & Bug Fixing:**

*   **Action:** Address all issues identified during testing phases.
*   **Process:**
    *   Consolidate feedback and bug reports.
    *   Prioritize issues (e.g., functional blockers > contrast issues > minor visual inconsistencies).
    *   Make necessary code adjustments (CSS variables, Tailwind classes, component styles).
    *   Re-test fixed issues.
    *   Perform a final quick regression check after all fixes are applied.

## Expected Outcome for Phase 5:

*   The application theme is validated across different environments and use cases.
*   Visual inconsistencies and functional regressions introduced by theming are resolved.
*   Accessibility standards (especially color contrast and focus visibility) are met.
*   The application provides a consistent and polished user experience on supported browsers and screen sizes.
*   The `feature/global-theming` branch is stable and ready for review/merge. 