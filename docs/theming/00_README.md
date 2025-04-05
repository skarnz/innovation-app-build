# Theming Initiative: "Landing Page Look & Feel" Implementation Plan

**Version:** 1.0
**Date:** 2023-10-27
**Status:** Planning

## 1. Goal

To comprehensively refactor the entire application's user interface (focusing on authenticated `/app/*` routes and shared components) to achieve visual consistency with the newly styled landing page (`src/pages/Index.tsx`). This involves adopting a specific dark theme, color palette, typography, component styles, and interactive elements defined herein.

**Key Objectives:**

*   Implement the defined **Primary Color Palette** (Deep Navy, Periwinkle, Lavender, Grays, etc.) consistently across all UI elements.
*   Establish and apply consistent **Typography** using "Inter" (sans-serif) and "Orbitron" (display/headings).
*   Standardize **Component Styling** for all common elements (Buttons, Inputs, Cards, Modals, Menus, etc.), incorporating specific styles like skewed gradient buttons and glassmorphism where appropriate.
*   Ensure proper **Layout and Spacing** consistency based on the new theme.
*   Address and resolve **Contrast Issues**, specifically ensuring adequate contrast for text on colored backgrounds (e.g., text on primary/accent colors).
*   Integrate subtle **Background Elements** (e.g., blurred circles) for visual depth.
*   Ensure a cohesive and modern **User Experience** throughout the application.

## 2. Scope

*   **In Scope:** All components and pages within the `src/` directory, particularly those rendered under the `/app/*` routes via `DashboardLayout.tsx`. Shared UI components (`src/components/ui/`, `src/components/layout/`, custom components like `AiAgent`, `FileExplorer`). Configuration files (`tailwind.config.ts`, `src/index.css`).
*   **Out of Scope (Initially):** Landing page (`src/pages/Index.tsx` - already styled), Authentication pages (`/login`, `/signup` - unless trivially updated), Backend code, Major functional changes (UI styling only).

## 3. Core Design Principles & Palette

*   **Primary Palette:** This plan exclusively uses the "Primary Palette" provided:
    *   `#0b0e1e` (deep-navy): Main background
    *   `#171a2c` (charcoal-blue): Container/Surface background
    *   `#242735` (slate-gray): Card base/Text blocks
    *   `#393c4a` (cool-gray): Borders/Lines
    *   `#525362` (neutral-gray): Input fields/elements background
    *   `#6051f0` (periwinkle): Primary brand color (buttons, highlights, active states)
    *   `#796abb` (violet-gray): Secondary brand color (accents, potentially secondary buttons)
    *   `#6373f0` (medium-blue): Gradient Start (e.g., for skewed buttons)
    *   `#bb71ea` (lavender): Gradient End / Accent (e.g., for skewed buttons)
    *   `#4170cb` (cerulean): Button highlight (potentially hover/focus ring?) - *Note: Need to confirm usage vs. Periwinkle for rings.*
    *   `#aba8d3` (lavender-gray): Muted text (subtitles, descriptions)
    *   `#f4f7ff` (pale-blue): Highlight/Primary text (high contrast foreground)
*   **Foreground Contrast:** The primary text color (`pale-blue`) provides high contrast against the dark backgrounds (`deep-navy`, `charcoal-blue`, `slate-gray`). Text on colored backgrounds (e.g., on `periwinkle` buttons) MUST use a contrasting color - likely `pale-blue` itself or pure white (`#FFFFFF`). The previous white-on-cyan issue is avoided by using `periwinkle` as the primary interactive color.
*   **Typography:** "Inter" for body/UI text, "Orbitron" for major headings/logos.
*   **Style Elements:** Glassmorphism (subtle blur/transparency on cards/surfaces), skewed primary buttons, gradient accents, soft hover glows.

## 4. Implementation Plan Files

This document serves as the entry point. Detailed steps are broken down by phase:

*   [Phase 0: Theme Foundation Definition & Setup](./01_Foundation.md)
*   [Phase 1: Core Layout Components Styling](./02_Layout.md)
*   [Phase 2: Common UI Component Styling](./03_Components.md)
*   [Phase 3: Page-Specific Content Styling](./04_Pages.md)
*   [Phase 4: Special Effects & Polish](./05_Polish.md)
*   [Phase 5: Testing & Refinement](./06_Testing.md)

## 5. Key Considerations & Risks

*   **Codebase State:** Assumes starting from branch `fix/landing-page-styling` commit `e2fd00e` (or latest). The stash contains related but potentially unwanted changes that need careful handling if applied later.
*   **Component Coverage:** The plan relies on identifying common components. Unforeseen custom components will need ad-hoc styling.
*   **ShadCN UI:** Heavy reliance on ShadCN components inheriting styles via CSS variables. Errors in variable definition will have widespread impact.
*   **Custom Styling Overrides:** Existing custom CSS or inline styles might conflict with the new theme and require removal/refactoring.
*   **Performance:** Excessive use of blur (glassmorphism) or complex gradients might impact performance on lower-end devices. Apply judiciously.
*   **Testing:** Thorough visual and functional testing is critical across different browsers and screen sizes. Contrast checking is mandatory. 