# Integration Plan - Phase C: Integrating `8uild` UI Features into App Phases (Detailed)

This is the most substantial phase, focusing on integrating the specific UI components, workflows, and features observed in the `8uild` commit's phase-specific pages (`ProjectValidation.tsx`, `LaunchProduction.tsx`, `MarketingFeedback.tsx`) into the existing `innovation-platform` application structure. Key objectives include recreating the visual presentation (using Phase A styles), implementing the core functionality (forms, calculators, checklists), establishing the chronological step-by-step flow using a reusable `PhaseStepper` component, and carefully merging these new features with the existing AI chat capabilities where relevant.

---

## C.1: Create Reusable `PhaseStepper` Component

*   **Objective:** To develop a reusable React component that displays the sub-steps within a larger application phase (like Ideation, Validation, Launch) and visually indicates the user's progress through these steps using a progress bar and step titles/icons, mirroring the stepper UI seen in `8uild`'s Launch and Marketing pages.

*   **Detailed Steps & Rationale:**

    1.  **Component Creation (`PhaseStepper.tsx`):**
        *   **Action:** Create a new file `src/components/layout/PhaseStepper.tsx`.
        *   **Rationale:** Centralizes the stepper logic and presentation, making it easy to apply consistently across different phase pages.

    2.  **Define Props:**
        *   **Action:** Define the component's props interface. It should accept an array of steps and the index of the currently active step.
        *   **Code Example:**
            ```typescript
            import React from 'react';
            import { Progress } from '@/components/ui/progress'; // Import ShadCN Progress
            import { cn } from '@/lib/utils'; // For conditional classes

            interface Step {
              title: string;
              icon?: React.ReactNode; // Optional icon component
            }

            interface PhaseStepperProps {
              steps: Step[];
              currentStepIndex: number;
              className?: string; // Allow custom styling
            }

            export const PhaseStepper: React.FC<PhaseStepperProps> = ({
              steps,
              currentStepIndex,
              className,
            }) => {
              // ... implementation ...
            };
            ```
        *   **Rationale:** A clear props interface makes the component predictable and easy to use. `steps` defines the structure, `currentStepIndex` controls the visual state, and `className` allows for flexible styling adjustments.

    3.  **Implement Progress Bar:**
        *   **Action:** Use the ShadCN `Progress` component. Calculate the progress percentage based on the `currentStepIndex` and the total number of `steps`.
        *   **Code Snippet (within component):**
            ```jsx
            const totalSteps = steps.length;
            // Progress represents completed steps + fraction of the current step (visually simpler to show progress based on reaching a step)
            const progressValue = totalSteps > 0 ? ((currentStepIndex + 1) / totalSteps) * 100 : 0;

            return (
              <div className={cn("mb-8", className)}> {/* Apply base margin and custom class */}
                <Progress value={progressValue} className="h-2 bg-navy-light" indicatorClassName="bg-electric-blue" /> {/* Style progress bar */}
                {/* ... Step titles below ... */}
              </div>
            );
            ```
        *   **Rationale:** Leverages the pre-built, themeable `Progress` component. The calculation ensures the bar visually reflects how far the user has advanced through the defined steps. Styling (`h-2`, `bg-navy-light`, `indicatorClassName`) matches the slim, themed look from `8uild`.

    4.  **Render Step Titles/Icons:**
        *   **Action:** Map through the `steps` array. For each step, render its title and optional icon. Use conditional styling (`cn` utility or ternary operators) to visually differentiate between completed steps, the active step, and upcoming steps.
        *   **Code Snippet (within component, below Progress):**
            ```jsx
             <div className={`grid grid-cols-${totalSteps} gap-2 mt-2 text-center`}> {/* Dynamic grid columns */}
               {steps.map((step, index) => (
                 <div
                   key={step.title}
                   className={cn(
                     "text-xs truncate transition-colors duration-300",
                     index === currentStepIndex ? "text-white font-medium" : // Active step
                     index < currentStepIndex ? "text-electric-blue/80" : // Completed step (using blue for done)
                     "text-white/40" // Upcoming step
                   )}
                 >
                   {step.icon && <div className="inline-block mr-1 align-middle">{step.icon}</div>}
                   <span>{step.title}</span>
                 </div>
               ))}
             </div>
            ```
        *   **Rationale:** Creates a clear visual representation of the workflow sequence. Using distinct colors/styles for active, completed, and upcoming steps provides immediate feedback on the user's position within the phase. Dynamic grid columns ensure the layout adapts to the number of steps.

*   **Integration & Flow:**
    *   Phase-specific pages (Validation, Launch, Marketing, etc.) will import `PhaseStepper`.
    *   Each page will define its own `steps` array (titles, icons).
    *   The page's state management will track the `currentStepIndex`.
    *   The `PhaseStepper` component will be rendered near the top of the page, receiving the `steps` and the current `currentStepIndex` as props, automatically updating its visual state as the user progresses.

*   **Verification:**
    1.  Create a temporary page or use an existing one (like `LaunchPrepPage`).
    2.  Import and render `PhaseStepper`, passing a sample `steps` array (e.g., 4 steps) and a state variable for `currentStepIndex`.
    3.  Verify the `Progress` bar renders correctly with the themed colors (`navy-light` background, `electric-blue` indicator).
    4.  Verify the step titles/icons render below the progress bar in the correct grid layout.
    5.  Create buttons or logic to increment/decrement the `currentStepIndex` state variable.
    6.  Verify that changing `currentStepIndex`:
        *   Updates the `Progress` bar value correctly.
        *   Changes the styling of the step titles (active step is white, completed steps are blue-ish, upcoming steps are grayed out).
    7.  Check responsiveness – ensure titles truncate or wrap reasonably on smaller screens if necessary.

---

## C.2: Integrate `8uild` Validation Features (`ValidationPage.tsx`)

*   **Objective:** To refactor the existing `ValidationPage.tsx` to incorporate the key UI sections (Data Partners, Surveys, Results, Deep Research) and functionalities from `8uild/src/pages/ProjectValidation.tsx`, using a tabbed interface, applying Phase A styling (`glass-card`), and integrating AI features for survey question generation and research.

*   **Detailed Steps & Rationale:**

    1.  **Implement Tabbed Interface:**
        *   **Action:** Use ShadCN's `Tabs`, `TabsList`, `TabsTrigger`, and `TabsContent` components to structure the page. Define triggers for "Data Partners", "Surveys", "Results", and "Deep Research". Style the `TabsList` and `TabsTrigger` to match the `8uild` look (e.g., `bg-navy-light` container, `bg-electric-purple text-white` for active trigger, `text-white/60 hover:text-white` for inactive).
        *   **Code Snippet (Structure):**
            ```jsx
            // src/pages/ValidationPage.tsx
            import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
            // Import components for each tab's content

            export default function ValidationPage() {
              // State for managing surveys, results etc.
              const [activeTab, setActiveTab] = useState("partners"); // Or manage via Tabs component's defaultValue

              return (
                <div className="container mx-auto px-4 py-8">
                  {/* Page Header (if any) */}
                  <h1 className="text-3xl md:text-4xl font-orbitron font-bold text-electric-purple mb-2">Validation Phase</h1>
                  <p className="text-white/70 mb-8">Test and validate your ideas...</p>

                  <Tabs defaultValue="partners" className="w-full" onValueChange={setActiveTab}>
                    <TabsList className="grid w-full grid-cols-4 bg-navy-light p-1 rounded-lg mb-8">
                      <TabsTrigger value="partners" className="data-[state=active]:bg-electric-purple data-[state=active]:text-white text-white/60 hover:text-white rounded-md">Data Partners</TabsTrigger>
                      <TabsTrigger value="surveys" className="data-[state=active]:bg-electric-purple data-[state=active]:text-white text-white/60 hover:text-white rounded-md">Surveys</TabsTrigger>
                      <TabsTrigger value="results" className="data-[state=active]:bg-electric-purple data-[state=active]:text-white text-white/60 hover:text-white rounded-md">Results</TabsTrigger>
                      <TabsTrigger value="research" className="data-[state=active]:bg-electric-purple data-[state=active]:text-white text-white/60 hover:text-white rounded-md">Deep Research</TabsTrigger>
                    </TabsList>

                    <TabsContent value="partners">
                      <div className="glass-card p-6 md:p-8">
                        <h2 className="text-2xl font-orbitron font-bold text-white mb-6">Select Data Partners</h2>
                        {/* ... Data Partners content ... */}
                      </div>
                    </TabsContent>
                    <TabsContent value="surveys">
                       <div className="glass-card p-6 md:p-8">
                         <h2 className="text-2xl font-orbitron font-bold text-white mb-6">Survey Manager</h2>
                         {/* ... Surveys content ... */}
                       </div>
                    </TabsContent>
                    <TabsContent value="results">
                       <div className="glass-card p-6 md:p-8">
                          <h2 className="text-2xl font-orbitron font-bold text-white mb-6">Survey Results</h2>
                          {/* ... Results content ... */}
                       </div>
                    </TabsContent>
                    <TabsContent value="research">
                       <div className="glass-card p-6 md:p-8">
                         <h2 className="text-2xl font-orbitron font-bold text-white mb-6">Deep Research</h2>
                         {/* ... Deep Research content ... */}
                       </div>
                    </TabsContent>
                  </Tabs>
                </div>
              );
            }
            ```
        *   **Rationale:** `Tabs` provide a standard and accessible way to organize distinct sections within a single page view, matching the `8uild` layout. Styling the triggers ensures visual consistency. Wrapping content in `glass-card` applies the theme.

    2.  **Implement Data Partners Tab:**
        *   **Action:** Statically display the list of potential data partners (Pollfish, Prolific, Typeform, Exa, Perplexity, Mintel) identified in `8uild`. Use `Card` or simple `div` elements with `glass-card` styling for each partner, showing their icon, name, and description. *Initial scope:* No interactive selection needed, just informational display.
        *   **Rationale:** Provides users with context about potential validation resources without the initial complexity of implementing the interactive carousel and selection logic from `8uild`.

    3.  **Implement Surveys Tab:**
        *   **Action:**
            *   Recreate the "Survey Manager" UI: Add a button ("Create New Survey") that toggles the visibility of a form.
            *   Build the "Create New Survey" form within a `glass-card`, using ShadCN `Input` for title/audience, `Textarea` for description, and a dynamic list for questions (an `Input` field + "Add" button to push questions into state, display added questions with "Remove" buttons).
            *   Implement state (`useState`) to manage the new survey form data and the list of existing surveys.
            *   Display existing surveys using mapped `Collapsible` components, styled with `glass-card`. Show title, status (Draft/Live/Completed), response count. The `CollapsibleContent` should show description, audience, and the list of questions. Include a "Launch Survey" button for drafts.
            *   **AI Integration:** Add a button (e.g., with a `Sparkles` icon) next to the "Add Question" input. Clicking this button should trigger the existing AI chat interface (modal or sidebar). Pass context (project idea, survey title/description if available) to the AI with a prompt like "Suggest 3-5 potential survey questions for this product idea and survey goal." The AI response should appear in the chat, and the user can copy/paste or potentially click suggested questions to add them to the form.
        *   **Rationale:** Replicates the core survey creation and management functionality from `8uild` using standard forms and interactive components. `Collapsible` allows users to view survey details without cluttering the UI. Integrating AI for question generation adds significant value and leverages the platform's core strength.

    4.  **Implement Results Tab:**
        *   **Action:** Recreate the basic structure of the results view. Add a ShadCN `Select` component to choose from the list of created surveys (use the survey state from the Surveys tab). Display mock overview statistics (Responses, Completion Rate, Avg. Time) using `Card` or styled `div` elements with `glass-card`. Recreate the visual *layout* for response breakdowns (e.g., Likert scale results using styled `div`s with percentage widths, a placeholder area for the word cloud) but populate them with static/mock data initially.
        *   **Rationale:** Provides the user with the expected interface for viewing results, even if the data is initially mocked up. This allows the UI structure to be built and tested before backend data integration.

    5.  **Implement Deep Research Tab:**
        *   **Action:** Recreate the UI elements: `Label`, `Input` field for the research query, and a "Research" button. Add the text indicating "Powered by..." sources. Create an area to display research findings (initially empty or with placeholder text).
        *   **AI Integration:** When the user types a query and clicks "Research" (or potentially clicks an "Open AI Research Assistant" button):
            *   Prevent default form submission.
            *   Get the `researchQuery` from the input field's state.
            *   Trigger the existing AI chat interface (modal/sidebar).
            *   Send the `researchQuery` to the AI backend with a suitable prompt (e.g., "Perform market research based on the following query related to [Project Context]: [researchQuery]. Provide key findings, potential competitor information, and relevant trends.").
            *   Display the AI's streaming response within the chat interface.
            *   *Optionally:* Update the "Research Findings" area on the main tab with a summary or link to the chat conversation once the AI response is complete. This mimics the `8uild` behavior where results appeared on the page *and* in the assistant.
        *   **Rationale:** Directly integrates the platform's core AI capability into the validation workflow, providing users with powerful research assistance based on their specific queries, simulating the advanced data aggregation suggested in `8uild`.

*   **Integration & Flow:**
    *   Users navigate the Validation phase using the tabs.
    *   They can define survey goals and use AI to help generate questions.
    *   They can view (mock) results.
    *   They can initiate deep market research using the AI chat, prompted directly from the research tab.
    *   All sections utilize the consistent `glass-card` styling and Phase A theme.

*   **Verification:**
    1.  Load the `ValidationPage`. Verify the tabbed interface renders correctly and switching tabs displays the appropriate content sections.
    2.  Verify the "Data Partners" tab shows the static list styled with `glass-card`.
    3.  In the "Surveys" tab:
        *   Verify the "Create New Survey" button toggles the form visibility.
        *   Verify the form fields work and adding/removing questions updates the state and UI.
        *   Verify clicking the "Generate Survey Questions with AI" button opens the AI chat interface. Test sending a prompt and receiving suggestions.
        *   Verify creating a survey adds it to the list of `Collapsible` components. Verify collapsibles expand/collapse and show details.
    4.  In the "Results" tab:
        *   Verify the `Select` dropdown populates with survey titles.
        *   Verify the mock stats and visualization layouts render correctly.
    5.  In the "Deep Research" tab:
        *   Verify the input field and button render correctly.
        *   Verify clicking "Research" opens the AI chat interface, passes the query, and displays the AI response.
    6.  Ensure all sections use `glass-card` and adhere to the Phase A theme (colors, fonts). Check responsiveness.

---

## C.3: Integrate `8uild` Launch Features (`LaunchPrepPage.tsx`)

*   **Objective:** To refactor `src/pages/LaunchPrepPage.tsx` to incorporate the multi-step workflow (`PhaseStepper`), UI components (product type selection, financial calculator, launch planner), and content from `8uild/src/pages/LaunchProduction.tsx`, ensuring a guided experience for preparing a product launch.

*   **Detailed Steps & Rationale:**

    1.  **Integrate `PhaseStepper` and State:**
        *   **Action:** Import and render the `PhaseStepper` component at the top of `LaunchPrepPage.tsx`. Define the steps array: `[{ title: 'Production/Deployment', icon: <Package /> }, { title: 'Financials', icon: <DollarSign /> }, { title: 'Launch Plan', icon: <Rocket /> }, { title: 'Review', icon: <Flag /> }]`. Implement state (`useState`) to manage the `activeStep` index (initially 0) and potentially other form data collected across steps (product type, financials, launch date, etc.).
        *   **Rationale:** Establishes the core step-by-step navigation structure for the page, visually guiding the user through the launch preparation process. Centralized state management is crucial for collecting data across multiple steps.

    2.  **Implement Step 1: Production/Deployment Setup:**
        *   **Action:**
            *   Conditionally render this section's content when `activeStep === 0`.
            *   Implement the "What type of product?" selection using clickable `Card` components (Hardware/Software/Service) as seen in `8uild`. Store the selected `productType` in state. Apply `border-electric-blue bg-navy-light/50` to the selected card.
            *   Based on the selected `productType`, conditionally render the corresponding setup form/checklist from `8uild` within `Card` components:
                *   **Hardware:** Form for Supplier, Lead Time, Unit Cost (`Input`, `Label`). Manufacturing Checklist (`Checkbox`, `Label`).
                *   **Software:** Hosting Solution (`RadioGroup`), Provider (`Input`), Domain (`Input`). Deployment Checklist (`Checkbox`, `Label`).
                *   **Service:** Delivery Method (`RadioGroup`), Staff/Resources (`Input`), Capacity Limit (`Input`). Service Checklist (`Checkbox`, `Label`).
            *   Style all forms and checklists using Phase A styles (`glass-card` maybe for outer container, `Input`/`Label`/`Checkbox`/`RadioGroup` will inherit theme styles). Use `lucide-react` icons.
        *   **Rationale:** Guides the user to provide production/deployment details relevant to their specific product type, using clear visual selection and structured forms/checklists.

    3.  **Implement Step 2: Financials & Overheads:**
        *   **Action:**
            *   Conditionally render when `activeStep === 1`.
            *   Recreate the "Financial Calculator" UI within a `Card`. Use `Input` components (type="number") for Initial Costs, Monthly Costs, Marketing Budget, Available Funds, and Expected Revenue. Bind these inputs to a `financials` state object using an `onChange` handler (`handleFinancialsChange`).
            *   Implement the calculation logic (`calculateTotalMonthlyCosts`, `calculateRunway`) based on the `financials` state.
            *   Recreate the "Financial Summary" display area, showing calculated totals and the estimated runway, formatted clearly (e.g., using `toLocaleString()`). Style this summary area, potentially using `bg-navy-light/30` as in `8uild`.
        *   **Rationale:** Provides a dedicated tool for users to input and visualize crucial financial projections related to their launch, including runway estimation.

    4.  **Implement Step 3: Launch Plan & Date:**
        *   **Action:**
            *   Conditionally render when `activeStep === 2`.
            *   Implement the "Launch Strategy" section within a `Card`. Use ShadCN `Form` (with `react-hook-form` recommended for handling) and `RadioGroup` for selecting the Launch Type (Soft/Beta/Full).
            *   Implement the "Target Launch Date" selection using ShadCN `Popover` containing the `Calendar` component, storing the selected `date` in state.
            *   Implement the "Key Milestones" section using ShadCN `Accordion` (`AccordionItem`, `AccordionTrigger`, `AccordionContent`). Recreate the Pre-Launch, Launch Day, and Post-Launch checklists using `Checkbox` and `Label` components within the accordion content.
        *   **Rationale:** Allows users to define their launch strategy, select a target date, and outline key milestones using interactive and organized UI components.

    5.  **Implement Step 4: Review & Next Steps:**
        *   **Action:**
            *   Conditionally render when `activeStep === 3`.
            *   Create a read-only summary `Card` displaying the key information collected in the previous steps: Product Type, Financial Overview (key calculated values), Launch Date, Launch Type.
            *   Include a "Next Steps" section outlining subsequent actions (e.g., Proceed to Marketing).
        *   **Rationale:** Provides a final confirmation screen summarizing the user's launch plan before they proceed to the next phase.

    6.  **Implement Navigation:**
        *   **Action:** Add "Next" (`<Button>Continue <ChevronRight /></Button>`) and "Back" (`<Button variant="outline">Back</Button>`) buttons at the bottom of each step (except Back on step 0, Next on step 3). The `onClick` handlers should update the `activeStep` state, causing the conditionally rendered content to change. The final "Next" button might navigate the user to the Marketing page (`/marketing` or similar).
        *   **Rationale:** Enables users to move forwards and backwards through the launch preparation workflow.

*   **Integration & Flow:**
    *   Users enter the `LaunchPrepPage`. The `PhaseStepper` shows their progress.
    *   They fill out information step-by-step, clicking "Next" to advance `activeStep` and reveal the next section.
    *   Data entered (product type, financials, dates) is stored in the component's state.
    *   The final step provides a summary and navigates them towards the marketing phase.
    *   AI chat could potentially be integrated here (though not explicitly in `8uild`'s version) for tasks like "Estimate typical monthly software hosting costs" or "Suggest pre-launch marketing milestones".

*   **Verification:**
    1.  Load the `LaunchPrepPage`. Verify the `PhaseStepper` renders correctly for the Launch steps.
    2.  Verify Step 1 renders: Test product type selection and confirm the correct conditional form/checklist appears.
    3.  Click "Next". Verify Step 2 renders: Test the financial calculator inputs and confirm the summary updates dynamically.
    4.  Click "Next". Verify Step 3 renders: Test the launch type selection, date picker functionality, and accordion milestone checklists.
    5.  Click "Next". Verify Step 4 renders: Confirm the summary displays data entered in previous steps correctly.
    6.  Test the "Back" buttons on steps 1, 2, and 3.
    7.  Verify the final "Next" button navigates to the appropriate next page (e.g., Marketing).
    8.  Ensure consistent Phase A styling (`glass-card`, fonts, colors) is applied throughout. Check responsiveness.

---

## C.4: Integrate `8uild` Marketing Features (`MarketingPage.tsx`)

*   **Objective:** To create or refactor `src/pages/MarketingPage.tsx` to include the comprehensive multi-step workflow (`PhaseStepper`) and detailed UI components for marketing channel setup, SEO/content strategy, feedback/analytics, and iteration planning from `8uild/src/pages/MarketingFeedback.tsx`.

*   **Detailed Steps & Rationale:**

    1.  **Integrate `PhaseStepper` and State:**
        *   **Action:** Import and render `PhaseStepper` at the top of `MarketingPage.tsx`. Define steps: `[{ title: 'Channel Setup', icon: <Megaphone /> }, { title: 'SEO & Content', icon: <Search /> }, { title: 'Feedback & Analytics', icon: <MessageCircle /> }, { title: 'Iteration', icon: <RefreshCw /> }]`. Implement state for `activeStep` (initially 0) and potentially marketing budget, channel allocations, content plans, etc.
        *   **Rationale:** Establishes the guided workflow for the marketing and feedback phase.

    2.  **Implement Step 1: Marketing Channel Setup:**
        *   **Action:**
            *   Conditionally render when `activeStep === 0`.
            *   Recreate the "Marketing Budget Allocation" `Card`: `Input` for total budget, `Slider` components for % allocation to Facebook, Instagram, Twitter, LinkedIn, Other. Display the % and calculated $ amount next to each slider. Implement state and handlers (`adSpend`, `updateAdSpend`) to manage allocations. Show the "Remaining Budget Allocation" feedback.
            *   Recreate the "Email Marketing Campaign" `Card`: `Input` for subject, `Textarea` for content, `Input` for CTA, `Select` for send timing. Include `Checkbox` options for follow-up emails.
            *   Recreate the "Influencer & Partnership Outreach" `Card`: `RadioGroup` for influencer type, `Textarea` for outreach template, simple table/form structure for tracking outreach contacts (`Input`, `Select`).
        *   **Rationale:** Provides tools for planning marketing budget distribution, setting up initial email campaigns, and organizing influencer outreach efforts, mirroring the `8uild` features.

    3.  **Implement Step 2: SEO & Content Strategy:**
        *   **Action:**
            *   Conditionally render when `activeStep === 1`.
            *   Recreate the "Keyword Research" `Card`: `Input` fields for primary/secondary keywords, `Textarea` for competitor URLs. Include the static "Keyword Strategy Tips" list.
            *   Recreate the "Content Calendar" `Card`: Use `Accordion` to structure content ideas by week/phase (Launch Content, Deep Dives, Ongoing). Use `Checkbox` for ongoing content types. Include a button to "Add New Content Item" (initially non-functional or opens a simple form).
            *   Recreate the "Community Engagement" `Card`: `Textarea` inputs for relevant Reddit/Quora communities. Include the `Checkbox` list for the engagement strategy.
        *   **Rationale:** Guides users through planning their SEO foundations, content schedule, and community interaction strategy.

    4.  **Implement Step 3: Early Feedback & Analytics:**
        *   **Action:**
            *   Conditionally render when `activeStep === 2`.
            *   Recreate the "Feedback Collection Methods" section using clickable `Card` components containing `Checkbox` inputs (In-App, Surveys, Interviews).
            *   Recreate the "Survey Questions" section: `Input` fields for NPS question and open-ended questions, potentially a structure for defining multiple-choice options.
            *   Recreate the "Analytics Setup" `Card`: `RadioGroup` for selecting the analytics tool (GA, Mixpanel, etc.). Include the `Checkbox` list for key metrics to track (Acquisition, Engagement, Retention, Revenue). Recreate the mock analytics dashboard visualization using styled divs and icons.
        *   **Rationale:** Helps users plan how they will gather crucial early feedback and define the key metrics they need to track for measuring success.

    5.  **Implement Step 4: Iteration & Next Steps:**
        *   **Action:**
            *   Conditionally render when `activeStep === 3`.
            *   Recreate the "Feedback Implementation Plan" `Card`: Use `Textarea` components structured within a prioritization matrix (High Impact/Low Effort, High/High, Low/Low, Low/High).
            *   Recreate the "Release Schedule" UI using `Textarea` components for Short-term, Mid-term, and Long-term plans.
            *   Recreate the "Growth Strategy" `Card`: `RadioGroup` for Growth Path (Organic/Paid/Hybrid), `Textarea` for Key Growth Metrics, `Checkbox` list for Scaling Considerations.
            *   Recreate the final summary section showing completion status and outlining next steps. Include the "Complete & Save" button.
        *   **Rationale:** Provides a framework for translating feedback and analytics into actionable iteration plans and defining a longer-term growth strategy.

    6.  **Implement Navigation:**
        *   **Action:** Add "Next" and "Back" buttons to each step (managed via `activeStep` state). The final "Complete & Save" button might eventually trigger saving the data or navigating back to the dashboard.
        *   **Rationale:** Allows navigation through the detailed marketing planning steps.

*   **Integration & Flow:**
    *   Users progress through the four steps using the `PhaseStepper` and Next/Back buttons.
    *   They configure budget, channels, content, feedback mechanisms, and iteration plans using the provided UI components.
    *   AI chat could be integrated here for tasks like "Suggest blog post ideas for [Product Topic]" or "Draft an outreach email template for micro-influencers".

*   **Verification:**
    1.  Load the `MarketingPage`. Verify the `PhaseStepper` renders correctly.
    2.  Verify Step 1 renders: Test budget sliders, email form inputs, influencer tracking inputs.
    3.  Click "Next". Verify Step 2 renders: Test keyword/community inputs, content calendar accordion/checkboxes.
    4.  Click "Next". Verify Step 3 renders: Test feedback method checkboxes, survey question inputs, analytics tool selection/metrics checkboxes, mock dashboard appearance.
    5.  Click "Next". Verify Step 4 renders: Test prioritization/schedule textareas, growth strategy inputs, final summary.
    6.  Test "Back" button navigation.
    7.  Verify the final "Complete & Save" button exists.
    8.  Ensure consistent Phase A styling and responsiveness.

---

## C.5: Apply `PhaseStepper` to Other Phases

*   **Objective:** To ensure the consistent step-by-step workflow UI (`PhaseStepper`) is applied to all relevant application phases (Ideation, MVP Spec, Prototyping) that have distinct sub-steps, reinforcing the chronological user flow across the entire platform.

*   **Detailed Steps & Rationale:**

    1.  **Identify Sub-steps per Phase:**
        *   **Action:** Review the existing structure and planned features for `IdeationPage`, `MVPSpecPage`, `PrototypingPage` (and any others). Define the logical sub-steps within each phase that the `PhaseStepper` should represent.
        *   **Example (Ideation):** Steps might be `['Problem Definition', 'Initial Idea', 'AI Ideation', 'Counter-Intuition', 'Trend Analysis']`.
        *   **Example (MVP Spec):** Steps might be `['Core Features', 'User Flow', 'Tech Stack', 'Data Model', 'Review']`.
        *   **Rationale:** Clearly defining the steps for each phase is necessary before implementing the stepper UI.

    2.  **Implement Stepper and State:**
        *   **Action:** For each relevant page (`IdeationPage.tsx`, etc.):
            *   Import `PhaseStepper`.
            *   Define the `steps` array based on the identified sub-steps for that phase.
            *   Implement state (`useState`) to track the `currentStepIndex` within that page.
            *   Render the `<PhaseStepper steps={steps} currentStepIndex={currentStepIndex} />` near the top of the page layout.
        *   **Rationale:** Adds the visual stepper UI to these pages.

    3.  **Integrate Stepper Logic:**
        *   **Action:** Connect the page's internal navigation or workflow logic to update the `currentStepIndex` state. For example:
            *   If the page uses tabs for sub-sections, update `currentStepIndex` when the active tab changes.
            *   If the page is a single scrolling view with sections, potentially update `currentStepIndex` based on scroll position (more complex) or when the user completes actions in a section.
            *   If the page already uses Next/Back buttons for internal steps, ensure these buttons also update `currentStepIndex`.
        *   **Rationale:** Ensures the `PhaseStepper` accurately reflects the user's actual progress within the page's workflow.

*   **Integration & Flow:**
    *   The `PhaseStepper` now provides a consistent visual indicator of sub-step progress across *all* major phases of the application that have internal steps.
    *   Users have a clearer understanding of where they are within each phase and what comes next.

*   **Verification:**
    1.  Navigate to `IdeationPage`, `MVPSpecPage`, `PrototypingPage`.
    2.  Verify the `PhaseStepper` is rendered at the top with the correct steps defined for that phase.
    3.  Interact with the page's workflow (e.g., switch tabs, complete forms, click existing Next buttons).
    4.  Verify the `PhaseStepper` updates its `Progress` bar and step title styling correctly based on the user's actions within the page.
    5.  Ensure the stepper integrates cleanly with the existing layout of each page.

--- 