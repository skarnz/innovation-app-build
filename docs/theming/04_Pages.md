# Theming Plan - Phase 3: Page-Specific Content Styling

**Goal:** To ensure the content *within* individual application pages (`src/pages/*`) consistently uses the established theme, leveraging the themed layout (Phase 1) and common components (Phase 2). This phase focuses on typography, spacing, sectioning, and the application of themed components within page-specific contexts.

**Prerequisites:** Phase 0, 1, and 2 complete. Layout components (`DashboardLayout`, `DashboardNavbar`, `Sidebar`) and common UI components (`Button`, `Input`, `Card`, etc.) are styled according to the theme.

**Files Primarily Affected:**

*   All files within `src/pages/` (e.g., `Dashboard.tsx`, `ProjectSetup.tsx`, `FileManagement.tsx`, `Ideation.tsx`, `Validation.tsx`, `MVPSpecification.tsx`, etc.).
*   Any custom components used exclusively within a single page or related group of pages.

## Strategy:

*   **Component Reuse:** Prioritize using the already-themed common UI components (Buttons, Inputs, Cards, etc.) from `src/components/ui/` instead of native HTML elements or unstyled custom components.
*   **Consistency:** Maintain consistent typography (fonts, sizes, colors), spacing (padding, margins, gaps), and visual hierarchy across all pages.
*   **Contextual Application:** Apply theme elements like Cards or Glassmorphism logically to structure page content and highlight key areas.

## Steps:

1.  **Standardize Page Headers:**
    *   **Action:** Ensure every page rendered within `DashboardLayout` utilizes the `<PageHeader>` component (created in previous plans/stash) for its main title and optional breadcrumbs/subtitle.
    *   **Details:**
        *   Pass the main page title via the `title` prop. Style should be `font-orbitron`, large (e.g., `text-3xl`), and use `text-foreground` (`pale-blue`) or potentially the `text-gradient-hero`.
        *   Pass breadcrumbs if applicable. Style breadcrumb links using standard link styles (`text-muted-foreground hover:text-foreground`) or primary link style (`text-primary`).
        *   Pass subtitle/description text if needed. Style using `text-muted-foreground` (`lavender-gray`).
    *   **Verification:** Scan all page components in `src/pages/` for `<h1>` or other top-level title elements and replace them with `<PageHeader>`.

2.  **Enforce Consistent Typography:**
    *   **Action:** Review all text content within pages.
    *   **Details:**
        *   **Body Text:** Standard paragraphs (`<p>`) should use `font-sans` (`Inter`) and `text-foreground` (`pale-blue`).
        *   **Secondary Text:** Descriptions, captions, helper text should use `text-muted-foreground` (`lavender-gray`).
        *   **Section Headings (`h2`, `h3`, etc.):** Decide on a consistent style. Option 1: Use `font-orbitron` like the main PageHeader title but smaller sizes (e.g., `text-2xl`, `text-xl`) and `text-foreground`. Option 2: Use `font-sans` but bold (`font-semibold`) and larger sizes (`text-xl`, `text-lg`) with `text-foreground`. *Recommendation: Use Option 2 (bold Inter) for section headings to differentiate from the main Orbitron title.*
        *   **Labels (`<label>`):** Use `font-sans`, `font-medium`, `text-foreground`.
        *   **Links:** Inline links (`<a>`) should use `text-primary` (`periwinkle`) and `hover:underline`.
    *   **Verification:** Inspect text elements across key pages for correct font family, size, weight, and color application according to theme rules. Remove hardcoded text colors.

3.  **Standardize Layout and Spacing:**
    *   **Action:** Review the layout structure within page components.
    *   **Details:**
        *   **Padding:** Apply consistent padding around the main content area of each page (e.g., `p-4 md:p-6 lg:p-8` is already applied in `DashboardLayout`'s `<main>`, ensure content doesn't add excessive extra padding). Use consistent padding within cards and sections (e.g., `p-6`).
        *   **Margins:** Use standard Tailwind margin utilities (`mb-4`, `mb-6`, `mb-8`) consistently for vertical spacing between elements and sections.
        *   **Gaps:** Use standard Tailwind gap utilities (`gap-4`, `gap-6`, `gap-8`) for spacing in grid and flex layouts.
    *   **Verification:** Check visual spacing consistency between elements (headings, paragraphs, cards, form groups) on different pages.

4.  **Structure Content with Themed Elements:**
    *   **Action:** Use themed Cards and backgrounds to organize page content visually.
    *   **Details:**
        *   **Sectioning:** Wrap distinct logical sections of a page within themed `<Card>` components (`bg-card`, `border`, `rounded-lg`) or simpler `div`s with `bg-card p-6 rounded-lg`. Use `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter` appropriately within Cards.
        *   **Glassmorphism:** Apply the `.glass-card` style *selectively* to specific cards or sections where the effect enhances the UI (e.g., feature highlights, dashboards), avoiding overuse which can make the UI busy or impact performance.
    *   **Verification:** Review pages for logical content grouping and consistent use of card/background styles for sectioning.

5.  **Verify Themed Component Usage on Key Pages:**
    *   **Action:** Explicitly check major pages to ensure they utilize the themed components correctly.
    *   **Details (`Dashboard.tsx`):**
        *   Verify "Getting Started" cards use themed `<Card>` components. Check internal text and button (`variant="outline"`) styling.
        *   Verify "Recent Projects" uses themed `<Card>`. Check text styling and "Open Project" button (`variant="outline"`).
    *   **Details (`ProjectSetup.tsx` - Based on Stashed Version):**
        *   Verify the form uses themed `<Label>`, `<Input>`, `<Textarea>`, `<Select>`, `<Button>` (likely the primary variant for submit).
        *   Style the `<AssetUploader>` component: apply themed styles to the dropzone area (background, border - potentially dashed), file list items, and any action buttons.
    *   **Details (`FileManagement.tsx`):**
        *   Verify `<Tabs>` uses themed list/trigger styles.
        *   Verify `<FileExplorer>` and `<FileEditor>` content reflects the theme (list item selection/hover, editor background/text - assuming basic styling, not full syntax highlighting theme). Check action buttons (`New Folder`, `New File`) use appropriate themed variants.
    *   **Details (Other Core Phase Pages - `Ideation`, `Validation`, `MVP`, `Prototyping`, `Launch`, `Marketing`, etc.):**
        *   Perform a high-level review of each page.
        *   Identify primary interactive elements (buttons, forms, inputs) and ensure they use themed components.
        *   Check text styles for consistency (headings, paragraphs).
        *   Verify layout and spacing.
        *   Note any unique custom components on these pages that require manual theming.

6.  **Style Data Visualizations (If Applicable):**
    *   **Action:** Identify any charting libraries used (e.g., Recharts, Chart.js) and configure their appearance.
    *   **Details:**
        *   Pass theme colors (e.g., `primary`, `secondary`, `accent`, `muted-foreground`) as props for lines, bars, fills, axes, labels, tooltips.
        *   Set font families for chart text elements (`font-sans`).
        *   Ensure chart backgrounds are transparent or match the container card background.
    *   **Verification:** Check pages like `Dashboard`, `Validation`, `Forecasting` for charts and verify their styling matches the theme.

7.  **Review Custom Page-Specific Components:**
    *   **Action:** Identify any remaining custom components not covered in Phase 2 that are specific to certain pages.
    *   **Details:** Manually refactor their styles using the same principles: replace hardcoded values with theme classes/variables, ensure consistency with common components.
    *   **Verification:** Requires systematically reviewing the component structure of each page.

## Expected Outcome for Phase 3:

*   All application pages present a consistent visual style aligned with the landing page theme.
*   Typography is standardized across page content.
*   Layout and spacing are consistent and visually balanced.
*   Themed components are used correctly for interaction elements and content structuring.
*   Page-specific elements and data visualizations adhere to the theme palette and style. 