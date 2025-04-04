# Integration Plan - Phase A: Global Styling & Theme Foundation (Detailed)

This foundational phase is critical for establishing the core visual identity derived from the `8uild` commit (`22bcf60...`) across the entire `innovation-platform` application. It involves integrating the distinct color palette, typography, and common UI patterns like glassmorphism and specific hover effects. We must ensure these styles are correctly configured for both dark and light modes, providing a consistent and aesthetically pleasing experience regardless of user preference. This phase sets the stage for all subsequent UI work in Phases B and C.

---

## A.1: Define Color Palette & Apply Theme

*   **Objective:** To replace the current application's color scheme with the vibrant `navy` and `electric` palette from `8uild` and ensure seamless integration with ShadCN components for both dark and light modes. This involves defining custom colors in Tailwind, mapping them to ShadCN's theme variables via CSS, and defining necessary gradients and animations.

*   **Detailed Steps & Rationale:**

    1.  **Analyze `8uild` Color Usage:**
        *   **`navy` (`#0B0E1E`, `hsl(224 71% 4%)`):** This serves as the primary dark background color, providing a deep, tech-focused canvas. It will replace the current dark mode background.
        *   **`navy-light` (`#1A1F36`, `hsl(224 34% 16%)`):** Used for slightly lighter background elements in dark mode, such as card backgrounds within cards, input fields, or hover states for subtle differentiation.
        *   **`electric-blue` (`#2F80ED`, `hsl(213 90% 45%)`):** The primary accent color. Used extensively for buttons ("Get Started", "Next"), active states, links, icons, progress bars, highlights, and the `.hover-glow` effect. This color conveys action and modernity. It will likely map to the `--primary` CSS variable.
        *   **`electric-purple` (`#BB6BD9`, `hsl(271 67% 63%)`):** A secondary accent color, often used in gradients alongside electric blue (like the `text-gradient`), for highlights (e.g., active tabs in Validation), and potentially secondary buttons or specific UI elements. It adds vibrancy and distinguishes secondary actions or states. Could map to `--accent`.
        *   **`electric-pink` (`#FF0080`, `hsl(330 100% 50%)`):** Used more sparingly in `8uild`, potentially for tertiary accents, specific highlights, or within visualizations (like the mock word cloud). We need to decide if and where to incorporate this strategically.
        *   **`White/Grays` (`hsl(213 31% 91%)`, etc.):** Various opacities of white (`text-white/90`, `text-white/70`, `text-white/60`, etc.) are used for foreground text and descriptions, ensuring readability against the dark navy background. These will map to `--foreground` and `--muted-foreground`.

    2.  **Update `tailwind.config.ts`:**
        *   **Action:** Modify the `theme.extend.colors` object within `tailwind.config.ts`.
        *   **Code Example:**
            ```typescript
            // tailwind.config.ts
            import type { Config } from "tailwindcss"

            const config = {
              // ... other config (darkMode, content, prefix)
              theme: {
                container: {
                  // ... existing container settings
                },
                extend: {
                  colors: {
                    border: "hsl(var(--border))",
                    input: "hsl(var(--input))",
                    ring: "hsl(var(--ring))",
                    background: "hsl(var(--background))",
                    foreground: "hsl(var(--foreground))",
                    primary: {
                      DEFAULT: "hsl(var(--primary))",
                      foreground: "hsl(var(--primary-foreground))",
                    },
                    secondary: {
                      DEFAULT: "hsl(var(--secondary))",
                      foreground: "hsl(var(--secondary-foreground))",
                    },
                    destructive: {
                      DEFAULT: "hsl(var(--destructive))",
                      foreground: "hsl(var(--destructive-foreground))",
                    },
                    muted: {
                      DEFAULT: "hsl(var(--muted))",
                      foreground: "hsl(var(--muted-foreground))",
                    },
                    accent: {
                      DEFAULT: "hsl(var(--accent))",
                      foreground: "hsl(var(--accent-foreground))",
                    },
                    popover: {
                      DEFAULT: "hsl(var(--popover))",
                      foreground: "hsl(var(--popover-foreground))",
                    },
                    card: {
                      DEFAULT: "hsl(var(--card))",
                      foreground: "hsl(var(--card-foreground))",
                    },
                    // Add 8uild custom colors
                    navy: {
                      DEFAULT: '#0B0E1E', // hsl(224 71% 4%)
                      light: '#1A1F36', // hsl(224 34% 16%)
                    },
                    electric: {
                      blue: '#2F80ED', // hsl(213 90% 45%)
                      purple: '#BB6BD9', // hsl(271 67% 63%)
                      pink: '#FF0080', // hsl(330 100% 50%) - Use sparingly if needed
                    },
                    // Potentially add neon colors if used:
                    // neon: {
                    //   blue: '#00FFFF', // hsl(180 100% 50%)
                    //   purple: '#BB6BD9', // hsl(271 67% 63%)
                    // }
                  },
                  borderRadius: {
                    lg: "var(--radius)",
                    md: "calc(var(--radius) - 2px)",
                    sm: "calc(var(--radius) - 4px)",
                  },
                  keyframes: {
                    // Keyframes will be added in step A.3
                  },
                  animation: {
                    // Animations will be added in step A.3
                  },
                  backgroundImage: {
                    'text-gradient': 'linear-gradient(90deg, var(--electric-blue-hex, #2F80ED), var(--electric-purple-hex, #BB6BD9), var(--electric-blue-hex, #2F80ED))',
                    // Add gradient-radial if needed from 8uild config
                    // 'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                  },
                  // Add backdropFilter if needed for glassmorphism (though usually handled in CSS directly)
                  // backdropFilter: {
                  //   'none': 'none',
                  //   'blur': 'blur(8px)',
                  // },
                },
              },
              plugins: [require("tailwindcss-animate")],
            } satisfies Config

            export default config
            ```
        *   **Rationale:** We keep the standard ShadCN color definitions (`primary`, `secondary`, `card`, etc.) which rely on CSS variables. We then add the specific named colors (`navy`, `electric`) from `8uild` so they can be used directly via Tailwind classes (e.g., `bg-navy`, `text-electric-blue`). This provides flexibility – using semantic variables for ShadCN components and direct colors for custom styling. The `text-gradient` is defined here for easy application via a utility class. We use placeholder CSS variables (`--electric-blue-hex`, etc.) in the gradient definition which we'll define in `globals.css` for consistency.

    3.  **Update CSS Variables in `globals.css`:**
        *   **Action:** Modify the `:root` (light mode default) and `.dark` selectors in `src/app/globals.css` (or your project's equivalent global CSS file) to define the HSL values for ShadCN's theme system, mapping them to the `8uild` palette.
        *   **Code Example:**
            ```css
            /* src/app/globals.css */
            @tailwind base;
            @tailwind components;
            @tailwind utilities;

            @layer base {
              :root {
                /* Light Mode Theme Configuration - ADJUST AS NEEDED */
                --background: 0 0% 100%; /* White */
                --foreground: 224 71% 4%; /* Navy text on white */
                --card: 0 0% 100%; /* White */
                --card-foreground: 224 71% 4%; /* Navy */
                --popover: 0 0% 100%; /* White */
                --popover-foreground: 224 71% 4%; /* Navy */
                --primary: 213 90% 45%; /* Electric Blue */
                --primary-foreground: 0 0% 100%; /* White */
                --secondary: 271 67% 63%; /* Electric Purple - Optional secondary */
                --secondary-foreground: 0 0% 100%; /* White */
                --muted: 220 13% 91%; /* Light Gray */
                --muted-foreground: 220 9% 46%; /* Medium Gray */
                --accent: 220 13% 91%; /* Light Gray */
                --accent-foreground: 224 71% 4%; /* Navy */
                --destructive: 0 84% 60%; /* Default Red */
                --destructive-foreground: 0 0% 100%; /* White */
                --border: 220 13% 91%; /* Light Gray */
                --input: 220 13% 91%; /* Light Gray */
                --ring: 213 90% 45%; /* Electric Blue */
                --radius: 0.5rem;

                /* Define hex colors for Tailwind utilities like gradients */
                --electric-blue-hex: #2F80ED;
                --electric-purple-hex: #BB6BD9;
                --navy-hex: #0B0E1E;
                --navy-light-hex: #1A1F36;
              }

              .dark {
                /* Dark Mode Theme (8uild) */
                --background: 224 71% 4%; /* Navy */
                --foreground: 213 31% 91%; /* Light Gray/White Text */
                --card: 224 34% 16%; /* Navy Light (Subtle contrast for cards) */
                --card-foreground: 213 31% 91%; /* Light Gray/White Text */
                --popover: 224 71% 4%; /* Navy */
                --popover-foreground: 213 31% 91%; /* Light Gray/White Text */
                --primary: 213 90% 45%; /* Electric Blue */
                --primary-foreground: 0 0% 100%; /* White Text on Blue */
                --secondary: 271 67% 63%; /* Electric Purple */
                --secondary-foreground: 0 0% 100%; /* White Text on Purple */
                --muted: 224 34% 16%; /* Navy Light */
                --muted-foreground: 215 16% 57%; /* Lighter Gray/White Text */
                --accent: 271 67% 63%; /* Electric Purple */
                --accent-foreground: 0 0% 100%; /* White */
                --destructive: 0 84.2% 60.2%; /* Default Red */
                --destructive-foreground: 0 0% 100%; /* White */
                --border: 215 28% 17%; /* Slightly lighter navy for borders */
                --input: 215 28% 17%; /* Slightly lighter navy for inputs */
                --ring: 213 90% 45%; /* Electric Blue for focus rings */

                /* Hex variables remain the same */
              }
            }

            @layer base {
              * {
                @apply border-border; /* Apply border color globally */
              }
              body {
                @apply bg-background text-foreground;
                /* Font will be applied in Step A.2 */
                /* Add antialiased for smoother fonts if desired */
                 -webkit-font-smoothing: antialiased;
                -moz-osx-font-smoothing: grayscale;
              }
            }

            /* Other global styles, @layer components, @layer utilities */
            ```
        *   **Rationale:** This is the core of the theming. By defining these CSS variables, we instruct ShadCN components (which use `hsl(var(--variable))` syntax) how to render in both light and dark modes. The `.dark` block specifically implements the `8uild` aesthetic using the navy background and electric blue/purple accents. The `:root` block defines the light mode theme – here, we've chosen a standard light theme with electric blue as the primary accent for consistency, but this can be customized further. Defining hex variables ensures utilities like `bg-text-gradient` work correctly. Applying `border-border` globally ensures components pick up the theme's border color. Setting `bg-background` and `text-foreground` on `body` applies the base theme colors.

    4.  **Implement Theme Switching:**
        *   **Action:** Ensure a theme toggle mechanism (like the one potentially implemented in `Sidebar.tsx` or a dedicated `ThemeToggle` component using `next-themes` or similar) correctly adds/removes the `.dark` class to the `<html>` or `<body>` tag.
        *   **Rationale:** This mechanism is essential for the CSS variable definitions (`:root` vs. `.dark`) to take effect and switch the application's appearance.

    5.  **Define `text-shimmer` Animation:**
        *   **Action:** Add the `text-shimmer` keyframes and animation utility to `tailwind.config.ts`.
        *   **Code Example (within `theme.extend`):**
            ```typescript
            // tailwind.config.ts (inside theme.extend)
            keyframes: {
              // ... other keyframes (accordion, etc.)
              'text-shimmer': {
                '0%': { backgroundPosition: '-200% 0' },
                '100%': { backgroundPosition: '200% 0' },
              },
              // ... add other 8uild keyframes (float, pulse-glow, etc.) in Step A.3
            },
            animation: {
              // ... other animations
              'text-shimmer': 'text-shimmer 8s infinite linear',
              // ... add other 8uild animations in Step A.3
            },
            ```
        *   **Rationale:** Defines the animation needed for the `text-gradient` effect to shimmer across the text. The `animation` definition creates a utility class `animate-text-shimmer`.

*   **Integration & Flow:**
    *   Once these changes are applied, all standard ShadCN components (`Button`, `Card`, `Input`, `Select`, etc.) should automatically adopt the new color scheme in both light and dark modes because they are built using the `--background`, `--foreground`, `--primary`, etc., CSS variables.
    *   Custom components will need to explicitly use the new Tailwind classes (`bg-navy`, `text-electric-blue`, `bg-primary`, `text-primary-foreground`, `bg-card`, `text-card-foreground`, etc.) to match the theme.
    *   The theme toggle component will control the application of the `.dark` class, allowing users to switch between the defined light theme and the `8uild`-inspired dark theme.

*   **Verification:**
    1.  Run the development server (`npm run dev` or similar).
    2.  Inspect existing pages containing ShadCN components. Verify they render with the correct colors in the default mode (light or dark, depending on system/initial setup).
        *   Check `Button` variants (default, destructive, outline, secondary, ghost, link) – primary buttons should use `electric-blue`.
        *   Check `Card` background/text colors – should use `navy-light` background in dark mode.
        *   Check `Input`, `Select`, `Textarea` backgrounds and borders.
        *   Check `Popover`, `Dialog` backgrounds.
    3.  Use the theme toggle. Verify all components correctly switch to the alternate theme's colors.
    4.  Apply the `text-gradient` and `animate-text-shimmer` classes to a heading temporarily (`<h1 className="text-gradient animate-text-shimmer">Test</h1>`) and verify the gradient appears and animates.
    5.  Check for any visual regressions or unstyled elements.

---

## A.2: Integrate Fonts

*   **Objective:** To incorporate the specific typography (`Orbitron` for headings, `Inter` for body text) used in the `8uild` commit into the `innovation-platform`, ensuring consistent font application across the application and enhancing the desired futuristic/tech aesthetic.

*   **Detailed Steps & Rationale:**

    1.  **Verify Current Font Setup:**
        *   **Action:** Check the existing `src/app/layout.tsx` (or equivalent root layout file) and `src/app/globals.css` to see which fonts are currently being loaded and applied. Often, Next.js projects use `next/font` for optimization.
        *   **Rationale:** We need to understand the current mechanism to integrate the new fonts smoothly, avoiding conflicts or redundant loading.

    2.  **Load Fonts:**
        *   **Option A (Recommended: `next/font`):** If using Next.js, leverage `next/font` for optimized loading.
            *   **Action:** Import `Inter` and `Orbitron` from `next/font/google`. Define font variables in `src/app/layout.tsx`. Apply the `Inter` variable to the `<body>` tag's `className` and potentially store the `Orbitron` variable's `className` in a CSS variable for easier application via Tailwind.
            *   **Code Example (`src/app/layout.tsx`):**
                ```typescript
                import { Inter, Orbitron } from 'next/font/google'
                import './globals.css' // Ensure globals.css is imported

                const fontInter = Inter({
                  subsets: ['latin'],
                  variable: '--font-inter', // CSS variable for Inter
                })

                const fontOrbitron = Orbitron({
                  subsets: ['latin'],
                  weight: ['400', '500', '600', '700', '800', '900'], // Load desired weights
                  variable: '--font-orbitron', // CSS variable for Orbitron
                })

                export default function RootLayout({ children }: { children: React.ReactNode }) {
                  return (
                    <html lang="en" suppressHydrationWarning>
                      {/* Apply variables to html or body tag */}
                      {/* Applying font-sans ensures Inter is default */}
                      <body className={`${fontInter.variable} ${fontOrbitron.variable} font-sans`}>
                        {/* ThemeProvider, etc. */}
                        {children}
                      </body>
                    </html>
                  )
                }
                ```
            *   **Rationale:** `next/font` automatically optimizes font loading (including self-hosting), prevents layout shifts (CLS), and makes fonts readily available via CSS variables. Using `--font-inter` and `--font-orbitron` CSS variables allows Tailwind integration.
        *   **Option B (Alternative: Google Fonts `@import`):** If not using `next/font` or encountering issues.
            *   **Action:** Add the `@import` rule to the top of `src/app/globals.css`.
            *   **Code Example (`src/app/globals.css`):**
                ```css
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Orbitron:wght@400..900&display=swap');

                /* Rest of globals.css */
                /* ... */
                ```
            *   **Rationale:** Simpler setup but less performant than `next/font` as it relies on external requests and doesn't offer the same level of optimization.

    3.  **Configure Tailwind for Font Utilities:**
        *   **Action:** Update `tailwind.config.ts` to recognize the new font families, preferably using the CSS variables defined by `next/font`.
        *   **Code Example (`tailwind.config.ts` within `theme.extend`):**
            ```typescript
            // tailwind.config.ts (inside theme.extend)
            fontFamily: {
              sans: ['var(--font-inter)', 'sans-serif'], // Set Inter as the default sans-serif
              orbitron: ['var(--font-orbitron)', 'sans-serif'], // Custom utility for Orbitron
            },
            ```
        *   **Rationale:** This configures Tailwind:
            *   `fontFamily.sans`: Makes `Inter` the default font applied by the `font-sans` utility (which should be on the `<body>` tag).
            *   `fontFamily.orbitron`: Creates a new utility class `font-orbitron` specifically for applying the Orbitron font, typically used for headings.

    4.  **Apply Fonts in Components:**
        *   **Action:** Ensure the default font (`Inter`) is applied via `font-sans` on the `<body>`. Apply the `font-orbitron` class to headings (e.g., `h1`, `h2`, specific component titles) where the Orbitron style is desired, matching the `8uild` design.
        *   **Example Usage:** `<h1 className="font-orbitron text-3xl ...">Page Title</h1>`
        *   **Rationale:** Explicitly apply `font-orbitron` where needed for headings/display text, while `Inter` serves as the readable default for body content.

*   **Integration & Flow:**
    *   With `next/font` setup, fonts are loaded efficiently alongside the application code.
    *   Tailwind's configuration makes applying the correct font family straightforward using `font-sans` (implicitly via body) and `font-orbitron` (explicitly on headings).
    *   Developers will use `font-orbitron` for titles and major headings, aligning with the `8uild` visual hierarchy.

*   **Verification:**
    1.  Inspect the application in the browser's developer tools. Check the `<body>` tag to confirm `Inter` (or `--font-inter`) is the primary font-family.
    2.  Verify that headings and titles where `font-orbitron` is applied are rendering correctly using the Orbitron font.
    3.  Check network tab to confirm fonts are being loaded (either self-hosted via `next/font` or from Google Fonts if using `@import`).
    4.  Ensure text remains readable and well-rendered in both light and dark modes.

---

## A.3: Define Global Styles/Utilities

*   **Objective:** To replicate common custom styles and animations from `8uild` as reusable Tailwind utilities or global CSS classes, ensuring consistency for elements like glassmorphic cards, hover glows, and link underlines across the `innovation-platform`.

*   **Detailed Steps & Rationale:**

    1.  **Implement `.glass-card` Utility:**
        *   **Action:** Define the `.glass-card` style in `src/app/globals.css` within the `@layer components` directive.
        *   **Code Example (`src/app/globals.css`):**
            ```css
            @layer components {
              .glass-card {
                /* Using hex codes directly for background color to ensure specific opacity */
                /* Consider defining --glass-bg-color: rgba(255, 255, 255, 0.1) if preferred */
                @apply bg-white/10 backdrop-blur-md border border-white/20 rounded-xl;
                /* Dark mode adjustments if needed - likely okay as is, relies on backdrop */
              }

              .text-gradient {
                 /* Apply the background gradient defined in tailwind.config */
                 /* Use background clip and text fill color transparent */
                @apply bg-text-gradient bg-clip-text text-transparent bg-[length:200%_auto];
                /* Animation will be added via className="animate-text-shimmer" */
              }

              /* Add other custom component styles here if needed */
            }
            ```
        *   **Rationale:** Defines a reusable component class for the characteristic glassmorphism effect seen throughout `8uild`. Using `@layer components` is the standard Tailwind practice for custom component styles. The `bg-white/10` provides the subtle white tint, `backdrop-blur-md` creates the blur effect on elements behind it, `border-white/20` adds a faint edge, and `rounded-xl` gives it soft corners. The `.text-gradient` utility is also defined here, applying the gradient background and clipping it to the text.

    2.  **Implement `.hover-glow` & `.underline-animation` Utilities:**
        *   **Action:** Define these utility classes in `src/app/globals.css` within the `@layer utilities` directive.
        *   **Code Example (`src/app/globals.css`):**
            ```css
             @layer utilities {
               .hover-glow {
                 @apply transition-all duration-300;
               }
               .hover-glow:hover {
                  /* Using electric-blue as the glow color, adjust if needed */
                 box-shadow: 0 0 15px 2px rgba(47, 128, 237, 0.5); /* Adjust alpha/spread as needed */
               }

               /* Define underline animation */
               .underline-animation {
                 @apply relative inline-block;
               }
               .underline-animation::after {
                 @apply content-[''] absolute bottom-0 left-0 h-[1px] w-0 bg-electric-blue transition-all duration-300 ease-out;
                 /* Use theme('colors.electric.blue') if using Tailwind plugin, or var(--primary) maybe */
               }
               .underline-animation:hover::after {
                 @apply w-full;
               }

               /* Define font-orbitron and font-inter here if NOT using Tailwind fontFamily config */
               /* .font-orbitron { font-family: 'Orbitron', sans-serif; } */
               /* .font-inter { font-family: 'Inter', sans-serif; } */
             }
            ```
        *   **Rationale:** Creates reusable utilities: `.hover-glow` adds an interactive blue shadow, enhancing affordance. `.underline-animation` provides a refined hover effect for links using the primary color. Defining these in `@layer utilities` ensures they work like standard Tailwind utilities and can be combined easily.

    3.  **Integrate Animations & Keyframes:**
        *   **Action:** Add the keyframe definitions and corresponding animation utilities found in `8uild`'s `tailwind.config.ts` to the `innovation-platform`'s `tailwind.config.ts`.
        *   **Code Example (`tailwind.config.ts` within `theme.extend`):**
            ```typescript
            // tailwind.config.ts (inside theme.extend)
             keyframes: {
               'accordion-down': { /* ... ShadCN default ... */ },
               'accordion-up': { /* ... ShadCN default ... */ },
               'text-shimmer': { /* Defined in Step A.1 */ },
               'float': {
                 '0%, 100%': { transform: 'translateY(0)' },
                 '50%': { transform: 'translateY(-10px)' }, // Subtle float effect
               },
               'pulse-glow': {
                 '0%, 100%': { opacity: '1', filter: 'brightness(1)' },
                 '50%': { opacity: '0.8', filter: 'brightness(1.2)' }, // Subtle pulse/brightness
               },
               'fade-in': {
                 '0%': { opacity: '0', transform: 'translateY(10px)' },
                 '100%': { opacity: '1', transform: 'translateY(0)' },
               },
               'fade-out': {
                  '0%': { opacity: '1', transform: 'translateY(0)' },
                  '100%': { opacity: '0', transform: 'translateY(10px)' },
               },
               'scale-in': {
                 '0%': { transform: 'scale(0.95)', opacity: '0' },
                 '100%': { transform: 'scale(1)', opacity: '1' },
               },
               'slide-up': {
                 '0%': { transform: 'translateY(20px)', opacity: '0' },
                 '100%': { transform: 'translateY(0)', opacity: '1' },
               },
               'slide-down': {
                 '0%': { transform: 'translateY(-20px)', opacity: '0' },
                 '100%': { transform: 'translateY(0)', opacity: '1' },
               },
               // Add spin-slow if needed
             },
             animation: {
               'accordion-down': 'accordion-down 0.2s ease-out',
               'accordion-up': 'accordion-up 0.2s ease-out',
               'text-shimmer': 'text-shimmer 8s infinite linear', // Defined in Step A.1
               'float': 'float 6s ease-in-out infinite',
               'pulse-glow': 'pulse-glow 4s ease-in-out infinite',
               'fade-in': 'fade-in 0.6s ease-out forwards', // Use forwards to keep final state
               'fade-out': 'fade-out 0.6s ease-out forwards',
               'scale-in': 'scale-in 0.6s ease-out forwards',
               'slide-up': 'slide-up 0.6s ease-out forwards',
               'slide-down': 'slide-down 0.6s ease-out forwards',
               // Add spin-slow if needed
             },
            ```
        *   **Rationale:** Makes the various subtle animations (`float`, `pulse-glow`, `fade-in`, etc.) from `8uild` available as standard Tailwind utility classes (e.g., `animate-float`, `animate-fade-in`). These can be applied selectively to add dynamic visual flair to elements like icons, cards, or section transitions. Using `forwards` ensures fade/slide/scale animations remain in their final state after completion.

*   **Integration & Flow:**
    *   Developers can now apply `.glass-card` to container elements (like sections in Validation, Launch, Marketing phases) to achieve the consistent blurred background effect.
    *   The `.hover-glow` utility can be added to interactive elements like project cards on the dashboard or feature cards on the landing page.
    *   The `.underline-animation` can be applied to navigation links or other inline text links for a refined hover effect.
    *   The various `animate-*` utilities can be used to add subtle motion to icons, images, or components as they load (e.g., `animate-fade-in`, `animate-slide-up`) or during specific interactions.

*   **Verification:**
    1.  Apply the `.glass-card` class to a `<div>` containing some text, placed over a background image or colored section. Verify the blur effect, border, and background tint are visible and consistent with `8uild`.
    2.  Apply `.hover-glow` to a card or button component. Verify the blue shadow appears correctly on hover.
    3.  Apply `.underline-animation` to an `<a>` tag. Verify the underline animates in smoothly on hover.
    4.  Temporarily apply various `animate-*` classes (e.g., `animate-fade-in`, `animate-float`, `animate-pulse-glow`) to elements and verify the animations play correctly and look as intended.
    5.  Check that these utilities and animations function correctly and look appropriate in both light and dark modes (e.g., ensure glow/underline colors contrast sufficiently).

--- 