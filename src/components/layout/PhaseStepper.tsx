import React from 'react';
import { Progress } from '@/components/ui/progress'; // Import ShadCN Progress
import { cn } from '@/lib/utils'; // For conditional classes

// Interface for individual step data
interface Step {
  title: string;
  icon?: React.ReactNode; // Optional icon component (e.g., from lucide-react)
}

// Props interface for the PhaseStepper component
interface PhaseStepperProps {
  steps: Step[];
  currentStepIndex: number; // Zero-based index of the currently active step
  className?: string; // Allow passing additional custom classes
}

/**
 * A component that displays a progress bar and step titles/icons
 * to indicate progress through a multi-step phase within the application.
 */
export const PhaseStepper: React.FC<PhaseStepperProps> = ({
  steps,
  currentStepIndex,
  className,
}) => {
  const totalSteps = steps.length;

  // Calculate progress percentage. Example: If 4 steps, step 0 is 25%, step 1 is 50% etc.
  const progressValue = totalSteps > 0 ? ((currentStepIndex + 1) / totalSteps) * 100 : 0;

  // Basic validation for step index
  if (currentStepIndex < 0 || currentStepIndex >= totalSteps) {
    console.warn(`PhaseStepper: currentStepIndex (${currentStepIndex}) is out of bounds for ${totalSteps} steps.`);
    // Optionally handle this case, e.g., clamp the index or return null
  }

  return (
    <div className={cn("mb-8 w-full", className)}> {/* Added w-full */} 
      {/* Progress Bar - styled according to Phase A theme */}
      <Progress
        value={progressValue}
        className="h-2 bg-navy-light" // Background from theme (dark mode)
        indicatorClassName="bg-electric-blue" // Indicator color from theme
        aria-label={`Phase progress: step ${currentStepIndex + 1} of ${totalSteps}`}
      />

      {/* Step Titles/Icons - dynamically create grid columns */}
      <div
        className={cn(
          'grid items-start gap-2 mt-2 text-center',
          // Dynamically set grid columns based on number of steps
          // Note: Tailwind needs explicit classes, so handle common cases or use style attribute
          totalSteps === 1 ? 'grid-cols-1' :
          totalSteps === 2 ? 'grid-cols-2' :
          totalSteps === 3 ? 'grid-cols-3' :
          totalSteps === 4 ? 'grid-cols-4' :
          totalSteps === 5 ? 'grid-cols-5' :
          'grid-cols-4' // Default fallback or handle more cases
        )}
      >
        {steps.map((step, index) => (
          <div
            key={step.title} // Use title as key assuming titles are unique within a stepper
            className={cn(
              "text-xs transition-colors duration-300",
              // Styling based on step status
              index === currentStepIndex
                ? "text-white font-medium" // Active step
                : index < currentStepIndex
                ? "text-electric-blue/80" // Completed step
                : "text-white/40" // Upcoming step
            )}
            aria-current={index === currentStepIndex ? 'step' : undefined}
          >
            {/* Render icon if provided */} 
            {step.icon && (
              <div className="inline-flex items-center justify-center h-4 w-4 mr-1 align-middle mb-0.5">
                {step.icon}
              </div>
            )}
            {/* Truncate long titles if necessary */} 
            <span className="truncate">{step.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
}; 