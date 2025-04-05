# Theming Plan - Phase 2: Common UI Component Styling

**Goal:** To apply the defined theme (colors, typography, styles) consistently to all reusable UI components, primarily those from the ShadCN UI library (`src/components/ui/`) but also including identified custom components (`AiAgent`, `FileExplorer`, etc.). This ensures a unified look and feel for interactive elements across the application.

**Prerequisites:** Phase 0 (Theme Foundation) complete. CSS variables (`--primary`, `--card`, etc.) and Tailwind configuration (colors, fonts, gradients) are correctly set up.

**Files Primarily Affected:**

*   All files within `src/components/ui/` (Button, Input, Card, Textarea, Select, DropdownMenu, Tabs, Badge, Avatar, Tooltip, Toast, etc.) - Modifications may be needed to base styles or variants.
*   Custom shared components like `src/components/AiAgent.tsx`, `src/components/FileManager/*`, `src/components/ProductTypeSelector.tsx` (if still used), etc.
*   Usage points of these components throughout `src/pages/` to apply correct variants and props.

## Component Styling Strategy:

*   **Leverage CSS Variables:** Rely primarily on the CSS variables (`--background`, `--foreground`, `--primary`, etc.) defined in `src/index.css`. ShadCN components are built to use these, minimizing direct modifications needed within component files.
*   **Verify Default Variants:** Check the default appearance of each ShadCN component against the theme. Adjust base styles in the component's source file (`src/components/ui/component.tsx`) ONLY if the default derived from CSS variables is incorrect.
*   **Define/Refine Variants:** Modify or add variants within component files (e.g., `buttonVariants` in `button.tsx`) to achieve specific themed looks (e.g., the primary skewed button, glass card).
*   **Apply Classes at Usage:** For one-off styles or specific contexts, apply themed Tailwind utility classes directly where the component is used in pages (`src/pages/*`).
*   **Custom Components:** Manually refactor custom component styles to remove hardcoded values and use theme variables/classes.

## Specific Component Styling Plan:

1.  **Button (`src/components/ui/button.tsx`):**
    *   **Action:** Review `buttonVariants`. Ensure variants align with the theme definition from Phase 0. Implement the skewed primary button.
    *   **Details:**
        *   `variant: "default"` (Primary Action):
            *   Target Style: Skewed parallelogram with blue-to-lavender gradient background, light text.
            *   Implementation:
                *   Add `relative overflow-hidden -skew-x-12` to the base classes applied by the variant.
                *   The component structure likely needs modification to include two inner `<span>` elements: one for the absolute positioned gradient (`bg-hero-gradient`) and one for the relatively positioned, counter-skewed (`skew-x-12`) text content (`text-white` or `text-pale-blue`).
                *   This might require making the default variant more complex or creating a *new* variant specifically for this (e.g., `variant: "skewed"`). *Recommendation: Create a new `skewed` variant to avoid breaking standard default button usage.*
                *   Disabled state: `opacity-60` on gradient span, `cursor-not-allowed`.
        *   `variant: "primary"` (Alternative Primary - Non-Skewed):
            *   Target Style: Solid Periwinkle background, light text.
            *   Implementation: Ensure classes are `bg-primary text-primary-foreground hover:bg-primary/90`. Use `pale-blue` for foreground.
        *   `variant: "secondary"`: `bg-secondary` (`violet-gray`), `text-secondary-foreground` (`pale-blue`), `hover:bg-secondary/80`.
        *   `variant: "destructive"`: `bg-destructive text-destructive-foreground hover:bg-destructive/90`.
        *   `variant: "outline"`: `border border-input` (`border-cool-gray` or `border-neutral-gray`), `bg-transparent`, `text-primary` (`periwinkle`), `hover:bg-accent/10` (`lavender`/10), `hover:text-accent`.
        *   `variant: "ghost"`: `bg-transparent`, `text-primary` (`periwinkle`), `hover:bg-accent/10`, `hover:text-accent`. Or use `text-muted-foreground` (`lavender-gray`) for less emphasis, `hover:text-foreground`. Define contextually.
        *   `variant: "link"`: `text-primary underline-offset-4 hover:underline`.
    *   **Focus State:** Ensure all variants correctly apply `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background` (using `--ring` variable - periwinkle).
    *   **Integration Check:** Update usages of primary buttons across the app to use the new `skewed` variant where desired (e.g., main CTAs) or the standard `primary` variant elsewhere.

2.  **Input (`src/components/ui/input.tsx`):**
    *   **Action:** Verify base styles inherited from CSS variables.
    *   **Details:** Expect `bg-input` (`neutral-gray`), `border border-border` (`cool-gray`), `text-foreground` (`pale-blue`), `placeholder:text-muted-foreground` (`lavender-gray`). Verify focus ring: `focus-visible:ring-ring` (`periwinkle`). Rounded corners (`rounded-md`).
    *   **Integration Check:** Check forms in `ProjectSetup`, `DashboardNavbar` search, `AiAgent`.

3.  **Textarea (`src/components/ui/textarea.tsx`):**
    *   **Action:** Verify base styles, similar to Input.
    *   **Details:** Expect `bg-input` (`neutral-gray`), `border border-border`, `text-foreground`, `placeholder:text-muted-foreground`, focus ring (`ring-ring`). Note: Landing page used `bg-hero-textarea-bg` (`#0F1120`), which is darker than `neutral-gray`. Decide if `input` variable should be this darker color, or if Textareas need a specific variant/class. *Recommendation: Update `--input` variable to `#0F1120` HSL equivalent for consistency.*
    *   **Integration Check:** Check hero section, any multi-line input fields.

4.  **Card (`src/components/ui/card.tsx`):**
    *   **Action:** Verify base styles. Define a "glass" variant if needed.
    *   **Details:** Base style should use `bg-card` (`charcoal-blue`), `text-card-foreground` (`pale-blue`), `border border-border` (`cool-gray`), `rounded-lg`.
    *   **Glass Variant:** If the `.glass-card` utility wasn't created, add a variant to `card.tsx` or apply classes manually: `bg-card/70 backdrop-blur-md border border-border`.
    *   **Integration Check:** Review cards in `Dashboard`, `FeaturesSection`, `AboutSection`, `CTASection`, `ProjectSetup`. Apply glass effect selectively.

5.  **DropdownMenu (`src/components/ui/dropdown-menu.tsx`):**
    *   **Action:** Verify styles for trigger (often a Button) and content.
    *   **Details:**
        *   `DropdownMenuContent`: `bg-popover` (`charcoal-blue`), `text-popover-foreground` (`pale-blue`), `border border-border`, `rounded-md shadow-md`. Consider applying glass effect (`bg-popover/80 backdrop-blur-sm`).
        *   `DropdownMenuItem`: Default text `text-popover-foreground`. Apply `focus:bg-accent/10 focus:text-accent` (Lavender) or `focus:bg-primary/10 focus:text-primary` (Periwinkle) for hover/focus. Use `rounded-sm`.
        *   `DropdownMenuSeparator`: `bg-border/50`.
        *   `DropdownMenuLabel`, `DropdownMenuGroup`: Style text appropriately (`text-foreground`, `text-muted-foreground`).
    *   **Integration Check:** Check User menu in `DashboardNavbar`, any select-like dropdowns.

6.  **Select (`src/components/ui/select.tsx`):**
    *   **Action:** Style trigger and content.
    *   **Details:**
        *   `SelectTrigger`: Style like `Input` (`bg-input`, `border-border`, etc.). Ensure focus ring.
        *   `SelectContent`: Style like `DropdownMenuContent` (`bg-popover`, `border-border`, etc.).
        *   `SelectItem`: Style like `DropdownMenuItem`.
    *   **Integration Check:** Check `ProjectSetup` business type selector, any other forms using Select.

7.  **Tabs (`src/components/ui/tabs.tsx`):**
    *   **Action:** Style the list and triggers.
    *   **Details:**
        *   `TabsList`: `bg-input` or `bg-card` background, `rounded-md`.
        *   `TabsTrigger`: Inactive state: `text-muted-foreground`, `hover:text-foreground`. Active state: `bg-primary` (`periwinkle`), `text-primary-foreground` (`pale-blue`), `rounded-sm shadow-sm`.
    *   **Integration Check:** Check `FileManagement` page tabs.

8.  **Badge (`src/components/ui/badge.tsx`):**
    *   **Action:** Define variants. Focus on contrast.
    *   **Details:**
        *   `variant: "default"` (Primary): `bg-primary` (`periwinkle`), `text-primary-foreground` (`pale-blue` - VERIFY contrast, may need darker if `pale-blue` on periwinkle isn't enough). *Alternative:* `bg-primary/10`, `text-primary`.
        *   `variant: "secondary"`: `bg-secondary` (`violet-gray`), `text-secondary-foreground` (`pale-blue`). *Alternative:* `bg-secondary/10`, `text-secondary`.
        *   `variant: "destructive"`: `bg-destructive`, `text-destructive-foreground`.
        *   `variant: "outline"`: `text-foreground border border-border`.
    *   **Integration Check:** Identify where badges are used or intended (e.g., marking "New" features).

9.  **Other ShadCN Components:**
    *   **Action:** Review Tooltip, Toast, Avatar, Table, Dialog, Sheet, Accordion, Checkbox, RadioGroup, Slider, Switch, etc.
    *   **Details:** For most, relying on the base CSS variables for background, foreground, border, primary, accent, ring should provide good defaults. Manually verify key states (hover, focus, checked, selected) and adjust component base styles or variants if necessary. Pay attention to contrast on interactive elements like Checkbox/Radio/Switch when checked (use `primary` color).
    *   **Integration Check:** Locate usages of these components and verify styling.

10. **Custom Components:**
    *   **Action:** Refactor styles to use theme classes/variables.
    *   **Details (`AiAgent.tsx` Example):**
        *   Floating Button: `bg-primary`, `text-primary-foreground`.
        *   Window Container: `bg-popover/80 backdrop-blur-md border border-border`.
        *   Header: `bg-popover` (solid or slightly transparent). Text `text-foreground`. Icons `text-muted-foreground`.
        *   Chat Bubbles: User: `bg-primary`, `text-primary-foreground`. Agent: `bg-card`, `text-foreground`. Timestamp: `text-muted-foreground`.
        *   Input Area: `bg-input`, `border-border`. Input styled as per `Input`. Send button styled as `primary` or `skewed`.
        *   Document Action Buttons: Use `ghost` variant.
    *   **Details (`FileExplorer.tsx` Example):**
        *   Background: Use `bg-card` or transparent.
        *   List Items: Hover state `bg-accent/10`. Selected state `bg-primary/10`.
        *   Text/Icons: Use `text-foreground` / `text-muted-foreground`. Folder/File icons potentially use `primary`/`secondary`.
    *   **Integration Check:** Requires careful review of each custom component's JSX and styling approach. Replace any instances of `className="bg-blue-500"` or similar with theme classes.

## Expected Outcome for Phase 2:

*   All standard UI components (Buttons, Inputs, Cards, etc.) consistently reflect the new dark theme, color palette, and typography.
*   Interactive states (hover, focus, active, disabled) are visually consistent and meet contrast requirements.
*   Specific styles like skewed gradient buttons and glassmorphism are implemented correctly on relevant components/variants.
*   Key custom components (`AiAgent`, `FileExplorer`) are refactored to use the theme.
*   The application starts feeling visually cohesive across different interactive elements. 