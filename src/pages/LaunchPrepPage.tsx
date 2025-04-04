import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // Import hooks
import { PhaseStepper } from '@/components/layout/PhaseStepper';
// ... other imports ...
import { CheckSquare, Check } from 'lucide-react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// ... types and steps definition ...

type LaunchPlan = {
  launchType: 'soft' | 'beta' | 'full';
  launchDate: Date | undefined;
  milestones: Record<string, boolean>; // Key: unique milestone identifier, Value: completed status
};

// Define the structure of milestones for rendering
const milestoneStructure = [
  { key: 'pre', title: 'Pre-Launch', items: ["Final QA Testing", "Marketing Materials Ready", "Team Briefing"] },
  { key: 'day', title: 'Launch Day', items: ["Product Release", "Announcement Posts", "Support Ready"] },
  { key: 'post', title: 'Post-Launch', items: ["Gather Initial Feedback", "First Bug-fix Release", "Marketing Analysis"] },
];

// Function to generate unique keys for milestones
const getMilestoneKey = (phaseKey: string, item: string) => `${phaseKey}-${item}`;

export default function LaunchPrepPage() {
  const navigate = useNavigate(); // Initialize navigate
  const { projectId } = useParams<{ projectId: string }>(); // Get projectId
  const [activeStep, setActiveStep] = useState(0);
  // ... rest of the state ...

  // Initialize milestones state based on structure
  const [launchPlan, setLaunchPlan] = useState<LaunchPlan>(() => {
      const initialMilestones: Record<string, boolean> = {};
      milestoneStructure.forEach(phase => {
          phase.items.forEach(item => {
              initialMilestones[getMilestoneKey(phase.key, item)] = false;
          });
      });
      return { launchType: 'soft', launchDate: undefined, milestones: initialMilestones };
  });

  // Navigation handlers
  const nextStep = () => setActiveStep((prev) => Math.min(prev + 1, launchSteps.length - 1));
  const prevStep = () => setActiveStep((prev) => Math.max(prev - 1, 0));

  // Navigate to Marketing Plan
  const goToMarketingPlan = () => {
    if (projectId) {
      navigate(`/project/${projectId}/marketing-plan`);
    } else {
      console.warn("Missing projectId, cannot navigate to marketing plan.");
      // Optionally show a user-facing error/toast
    }
  };

  // ... financial handlers ...

  // Milestone handler
  const handleMilestoneChange = (key: string, checked: boolean) => {
    setLaunchPlan(prev => ({
      ...prev,
      milestones: { ...prev.milestones, [key]: checked }
    }));
  };

  // ... renderProductionSetup ...
  // ... renderFinancials ...

  // --- Step 3: Launch Plan Content ---
  const renderLaunchPlan = () => (
    <div className="space-y-6">
      {/* ... Title, Launch Type, Launch Date ... */} 
      <div>
        <h3 className="font-medium mb-2 text-white/90">Key Milestones</h3>
        <Accordion type="multiple" className="w-full space-y-2">
          {milestoneStructure.map(phase => (
            <AccordionItem key={phase.key} value={phase.key} className="bg-navy-light/50 rounded-md border border-white/10 px-4">
              <AccordionTrigger className="text-white/80 hover:text-white py-3">{phase.title}</AccordionTrigger>
              <AccordionContent className="space-y-2 pb-4">
                {phase.items.map(item => {
                  const milestoneKey = getMilestoneKey(phase.key, item);
                  return (
                    <div key={milestoneKey} className="flex items-center gap-2">
                      <Checkbox
                        id={milestoneKey}
                        checked={!!launchPlan.milestones[milestoneKey]}
                        onCheckedChange={(checked) => handleMilestoneChange(milestoneKey, !!checked)}
                      />
                      <Label htmlFor={milestoneKey} className="text-sm font-normal text-white/80">{item}</Label>
                    </div>
                  );
                })}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );

  // --- Step 4: Review Content ---
  const renderReview = () => {
    // Calculate completed milestones
    const completedMilestones = Object.entries(launchPlan.milestones)
                                     .filter(([_, completed]) => completed)
                                     .map(([key]) => key);
    const totalMilestones = Object.keys(launchPlan.milestones).length;

    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold font-orbitron mb-4 text-white">4. Review & Next Steps</h2>
        <Card className="glass-card p-6">
          <CardHeader>
            <CardTitle>Launch Production Summary</CardTitle>
            <CardDescription>Review your production and launch plan before proceeding.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div><strong className="text-white/80">Product Type:</strong> <span className="capitalize text-white/90 ml-2">{productType || 'Not Selected'}</span></div>
            <div className="bg-navy-light/50 p-3 rounded space-y-1 border border-white/10">
               <h4 className="font-medium text-white/90 mb-1">Financial Overview:</h4>
               <p>Initial Costs: ${financials.initialCosts.toLocaleString()}</p>
               <p>Total Monthly Costs: ${calculateTotalMonthlyCosts().toLocaleString()}</p>
               <p>Runway: {calculateRunwayMonths() === Infinity ? 'N/A' : `${calculateRunwayMonths()} months`}</p>
            </div>
            <div><strong className="text-white/80">Launch Type:</strong> <span className="capitalize text-white/90 ml-2">{launchPlan.launchType}</span></div>
            <div><strong className="text-white/80">Launch Date:</strong> <span className="text-white/90 ml-2">{launchPlan.launchDate ? format(launchPlan.launchDate, "PPP") : 'Not Set'}</span></div>
            <div className="bg-navy-light/50 p-3 rounded space-y-1 border border-white/10">
               <h4 className="font-medium text-white/90 mb-1">Milestone Progress:</h4>
               <p className="text-white/80">
                 Completed: <span className="font-semibold text-electric-blue">{completedMilestones.length}</span> / {totalMilestones}
               </p>
               {/* Optionally list completed items */}
               {completedMilestones.length > 0 && (
                 <ul className="list-disc list-inside pl-4 pt-1 text-xs text-white/70">
                   {completedMilestones.map(key => {
                     // Find the item text from the structure (can be optimized)
                     let itemText = '';
                     milestoneStructure.forEach(phase => phase.items.forEach(item => {
                       if (getMilestoneKey(phase.key, item) === key) itemText = item;
                     }));
                     return <li key={key}>{itemText || key}</li>;
                   })}
                 </ul>
               )}
            </div>
            <div className="border-t border-white/10 pt-4 mt-4">
              <h3 className="font-medium text-white/90 mb-2">Next Steps</h3>
              <p className="text-white/70">Proceed to Marketing setup.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  // ... renderStepContent ...

  return (
    // ... container and header ...

      {/* Render the Stepper */}
      <PhaseStepper steps={launchSteps} currentStepIndex={activeStep} />

      {/* Render the active step's content */}
      <div className="mt-8">
        {renderStepContent()}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8">
        <Button variant="outline" onClick={prevStep} disabled={activeStep === 0} className="border-white/20 text-white disabled:opacity-50">
          <ChevronLeft size={16} className="mr-1" />
          Back
        </Button>
        {activeStep < launchSteps.length - 1 ? (
          <Button onClick={nextStep} className="bg-electric-blue hover:bg-electric-blue/90">
            Continue <ChevronRight size={16} className="ml-1" />
          </Button>
        ) : (
          // Updated button to use navigation function
          <Button onClick={goToMarketingPlan} className="bg-electric-purple hover:bg-electric-purple/90">
            Next: Marketing <ChevronRight size={16} className="ml-1" />
          </Button>
        )}
      </div>
    // ... closing div
  );
} 