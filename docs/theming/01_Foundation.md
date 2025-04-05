# Theming Plan - Phase 0: Theme Foundation Definition & Setup

**Goal:** Establish the core configuration for the new theme, including color definitions, CSS variables, Tailwind setup, and global styles. No visual changes to components are made in this phase, but the groundwork is laid.

## Steps:

1.  **Define Color Palette Semantics:**
    *   **Action:** Map the chosen Primary Palette hex codes to the standard semantic names used by ShadCN UI and Tailwind CSS variables. Define additional custom names for clarity.
    *   **Details:**
        *   `--background`: `#0b0e1e` (deep-navy) -> HSL: `228, 66%, 8%` (approx)
        *   `--foreground`: `#f4f7ff` (pale-blue) -> HSL: `225, 100%, 98%` (approx)
        *   `--muted`: `#242735` (slate-gray) -> HSL: `228, 18%, 18%` (approx) - *Used for less prominent surfaces.*
        *   `--muted-foreground`: `#aba8d3` (lavender-gray) -> HSL: `244, 33%, 75%` (approx)
        *   `--card`: `#171a2c` (charcoal-blue) -> HSL: `230, 33%, 13%` (approx) - *Slightly lighter than background for cards.*
        *   `--card-foreground`: `#f4f7ff` (pale-blue) -> HSL: `225, 100%, 98%` (approx)
        *   `--popover`: `#171a2c` (charcoal-blue) -> HSL: `230, 33%, 13%` (approx) - *Same as card for now.*
        *   `--popover-foreground`: `#f4f7ff` (pale-blue) -> HSL: `225, 100%, 98%` (approx)
        *   `--primary`: `#6051f0` (periwinkle) -> HSL: `246, 86%, 66%` (approx)
        *   `--primary-foreground`: `#f4f7ff` (pale-blue) -> HSL: `225, 100%, 98%` (approx) - *Light text on Periwinkle.*
        *   `--secondary`: `#796abb` (violet-gray) -> HSL: `255, 26%, 60%` (approx)
        *   `--secondary-foreground`: `#f4f7ff` (pale-blue) -> HSL: `225, 100%, 98%` (approx)
        *   `--accent`: `#bb71ea` (lavender) -> HSL: `279, 70%, 68%` (approx) - *Using Lavender as accent.*
        *   `--accent-foreground`: `#f4f7ff` (pale-blue) -> HSL: `225, 100%, 98%` (approx)
        *   `--destructive`: `#EF4444` (Red-500) -> HSL: `0, 84%, 60%`
        *   `--destructive-foreground`: `#FFFFFF` -> HSL: `0, 0%, 100%`
        *   `--border`: `#393c4a` (cool-gray) -> HSL: `227, 13%, 25%` (approx)
        *   `--input`: `#525362` (neutral-gray) -> HSL: `237, 9%, 35%` (approx) - *Background for inputs.*
        *   `--ring`: `#6051f0` (periwinkle) -> HSL: `246, 86%, 66%` (approx) - *Focus ring color.*
        *   `--radius`: `0.5rem` (Default ShadCN, verify consistency).
    *   **Rationale:** Provides a clear mapping for configuration and ensures ShadCN components adopt the theme via CSS variables. Explicit HSL values are needed for CSS variable definition.

2.  **Define CSS Custom Properties (`src/index.css`):**
    *   **Action:** Add the `@layer base` directive and define all the CSS variables from Step 1 within the `.dark` selector, using the calculated HSL values.
    *   **Example Snippet:**
        ```css
        @tailwind base;
        @tailwind components;
        @tailwind utilities;

        @layer base {
          :root {
            /* Define light mode fallbacks or base radius */
            --radius: 0.5rem;
          }

          .dark {
            --background: 228 66% 8%; /* #0b0e1e */
            --foreground: 225 100% 98%; /* #f4f7ff */
            --muted: 228 18% 18%; /* #242735 */
            --muted-foreground: 244 33% 75%; /* #aba8d3 */
            --card: 230 33% 13%; /* #171a2c */
            --card-foreground: 225 100% 98%; /* #f4f7ff */
            --popover: 230 33% 13%; /* #171a2c */
            --popover-foreground: 225 100% 98%; /* #f4f7ff */
            --primary: 246 86% 66%; /* #6051f0 */
            --primary-foreground: 225 100% 98%; /* #f4f7ff */
            --secondary: 255 26% 60%; /* #796abb */
            --secondary-foreground: 225 100% 98%; /* #f4f7ff */
            --accent: 279 70% 68%; /* #bb71ea */
            --accent-foreground: 225 100% 98%; /* #f4f7ff */
            --destructive: 0 84% 60%; /* #EF4444 */
            --destructive-foreground: 0 0% 100%; /* #FFFFFF */
            --border: 227 13% 25%; /* #393c4a */
            --input: 237 9% 35%; /* #525362 */
            --ring: 246 86% 66%; /* #6051f0 */
            /* Ensure --radius matches Tailwind config */
            --radius: 0.5rem;
          }
        }
        /* ... rest of index.css ... */
        ```
    *   **Verification:** Double-check variable names and HSL values against ShadCN documentation and the chosen palette.

3.  **Configure Tailwind (`tailwind.config.ts`):**
    *   **Action:** Update the `theme.extend.colors` and `theme.extend.backgroundImage` sections.
    *   **Details (Colors):**
        *   Define semantic colors using `hsl(var(--...))` syntax: `background: 'hsl(var(--background))'`, `foreground: 'hsl(var(--foreground))'`, `primary: { DEFAULT: 'hsl(var(--primary))', foreground: 'hsl(var(--primary-foreground))' }`, `secondary: { ... }`, `accent: { ... }`, `muted: { ... }`, `destructive: { ... }`, `card: { ... }`, `popover: { ... }`, `border: 'hsl(var(--border))'`, `input: 'hsl(var(--input))'`, `ring: 'hsl(var(--ring))'`. 
        *   Define named custom colors using hex codes: `'deep-navy': '#0b0e1e'`, `'charcoal-blue': '#171a2c'`, `'slate-gray': '#242735'`, `'cool-gray': '#393c4a'`, `'neutral-gray': '#525362'`, `'periwinkle': '#6051f0'`, `'violet-gray': '#796abb'`, `'medium-blue': '#6373f0'`, `'lavender': '#bb71ea'`, `'cerulean': '#4170cb'`, `'lavender-gray': '#aba8d3'`, `'pale-blue': '#f4f7ff'`. 
    *   **Details (Gradients):** Define `hero-gradient` using the named hex codes (`medium-blue`, `lavender`). Consider `text-gradient-hero`. 
        ```js
        backgroundImage: theme => ({
            'hero-gradient': `linear-gradient(90deg, ${theme('colors.medium-blue')} 0%, ${theme('colors.lavender')} 100%)`,
            // ... other gradients
        }),
        ```
    *   **Details (Fonts):** Ensure `fontFamily` includes `sans: ['Inter', ...]` and `orbitron: ['Orbitron', ...]`. 
    *   **Verification:** Run Tailwind build process (e.g., `npm run dev`) and inspect generated CSS or use browser dev tools to confirm classes apply the correct HSL variables. Check that custom color classes work.

4.  **Setup Global Styles (`src/index.css`):**
    *   **Action:** Apply base styles to the `body` or root element.
    *   **Details:**
        ```css
        @layer base {
          /* ... variable definitions ... */
          body {
            @apply bg-background text-foreground font-sans;
          }
        }
        ```
    *   Ensure font imports are present (e.g., using Google Fonts link in `index.html` or `@import` in `index.css`).

5.  **Define Custom Utilities (Optional - `tailwind.config.ts` Plugin or `index.css`):**
    *   **Action:** Define `.glass-card` and potentially `.text-gradient-hero` utilities.
    *   **Details (`index.css` example):**
        ```css
        @layer utilities {
          .glass-card {
            @apply bg-card/70 backdrop-blur-md border border-border; /* Adjust opacity/blur */
          }
          .text-gradient-hero {
             @apply text-transparent bg-clip-text bg-gradient-to-r from-medium-blue to-lavender;
          }
        }
        ```

</rewritten_file> 