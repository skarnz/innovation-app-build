import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // Import hooks
import { PhaseStepper } from '@/components/layout/PhaseStepper';
import { format } from 'date-fns'; // Import format
// ... other imports ...
import { CheckSquare, Check } from 'lucide-react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Define steps for the PhaseStepper
const launchSteps = [
  { title: 'Production Setup' },
  { title: 'Financials' },
  { title: 'Launch Plan' },
  { title: 'Review' }
];

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

  // Placeholder state for variables used in renderReview
  const [productType, setProductType] = useState<string>('SaaS'); // Example value
  const [financials, setFinancials] = useState({ initialCosts: 5000, monthlyRecurring: 1000, monthlyNonRecurring: 200 }); // Example values

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

  // Placeholder calculation functions for renderReview
  const calculateTotalMonthlyCosts = () => financials.monthlyRecurring + financials.monthlyNonRecurring;
  const calculateRunwayMonths = () => {
    const totalMonthly = calculateTotalMonthlyCosts();
    return totalMonthly > 0 ? financials.initialCosts / totalMonthly : Infinity;
  };

  // Milestone handler
  const handleMilestoneChange = (key: string, checked: boolean) => {
    setLaunchPlan(prev => ({
      ...prev,
      milestones: { ...prev.milestones, [key]: checked }
    }));
  };

  // --- Step 1: Production Setup Placeholder ---
  const renderProductionSetup = () => (
    <div className="space-y-6">
        <h2 className="text-2xl font-semibold font-orbitron mb-4 text-foreground">1. Production Setup</h2>
        <Card className="p-6">
            <CardContent>
                <p>Production setup details will go here...</p>
            </CardContent>
        </Card>
    </div>
  );

  // --- Step 2: Financials Placeholder ---
  const renderFinancials = () => (
    <div className="space-y-6">
        <h2 className="text-2xl font-semibold font-orbitron mb-4 text-foreground">2. Financials</h2>
        <Card className="p-6">
            <CardContent>
                <p>Financial planning details will go here...</p>
            </CardContent>
        </Card>
    </div>
  );

  // --- Step 3: Launch Plan Content ---
  const renderLaunchPlan = () => (
    <div className="space-y-6">
       <h2 className="text-2xl font-semibold font-orbitron mb-4 text-foreground">3. Launch Plan</h2>
      {/* ... Title, Launch Type, Launch Date ... */} 
      <div>
        <h3 className="font-medium mb-2 text-foreground">Key Milestones</h3>
        <Accordion type="multiple" className="w-full space-y-2">
          {milestoneStructure.map(phase => (
            <AccordionItem key={phase.key} value={phase.key} className="bg-card/50 rounded-md border border-border px-4">
              <AccordionTrigger className="text-muted-foreground hover:text-foreground py-3">{phase.title}</AccordionTrigger>
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
                      <Label htmlFor={milestoneKey} className="text-sm font-normal text-muted-foreground">{item}</Label>
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
    // Calculate completed milestones and map keys to text
    const milestoneKeyToTextMap: Record<string, string> = {};
    milestoneStructure.forEach(phase => {
        phase.items.forEach(item => {
            milestoneKeyToTextMap[getMilestoneKey(phase.key, item)] = item;
        });
    });

    const completedMilestoneKeys = Object.entries(launchPlan.milestones)
                                     .filter(([_, completed]) => completed)
                                     .map(([key]) => key);
    const totalMilestones = Object.keys(launchPlan.milestones).length;

    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold font-orbitron mb-4 text-foreground">4. Review & Next Steps</h2>
        <Card className="p-6">
          <CardHeader>
            <CardTitle>Launch Production Summary</CardTitle>
            <CardDescription>Review your production and launch plan before proceeding.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div><strong className="text-muted-foreground">Product Type:</strong> <span className="capitalize text-foreground ml-2">{productType || 'Not Selected'}</span></div>
            <div className="bg-muted/50 p-3 rounded space-y-1 border border-border">
               <h4 className="font-medium text-foreground mb-1">Financial Overview:</h4>
               <p className="text-muted-foreground">Initial Costs: ${financials.initialCosts.toLocaleString()}</p>
               <p className="text-muted-foreground">Total Monthly Costs: ${calculateTotalMonthlyCosts().toLocaleString()}</p>
               <p className="text-muted-foreground">Runway: {calculateRunwayMonths() === Infinity ? 'N/A' : `${calculateRunwayMonths()} months`}</p>
            </div>
            <div><strong className="text-muted-foreground">Launch Type:</strong> <span className="capitalize text-foreground ml-2">{launchPlan.launchType}</span></div>
            <div><strong className="text-muted-foreground">Launch Date:</strong> <span className="text-foreground ml-2">{launchPlan.launchDate ? format(launchPlan.launchDate, "PPP") : 'Not Set'}</span></div>
            <div className="bg-muted/50 p-3 rounded space-y-1 border border-border">
               <h4 className="font-medium text-foreground mb-1">Milestone Progress:</h4>
               <p className="text-muted-foreground">
                 Completed: <span className="font-semibold text-primary">{completedMilestoneKeys.length}</span> / {totalMilestones}
               </p>
               {completedMilestoneKeys.length > 0 ? (
                   <ul className="list-disc list-inside pl-4 pt-1 text-xs text-muted-foreground">
                     {completedMilestoneKeys.map(key => (
                       <li key={key}>{milestoneKeyToTextMap[key] || key}</li>
                     ))}
                   </ul>
                ) : null}
            </div>
            <div className="border-t border-border pt-4 mt-4">
              <h3 className="font-medium text-foreground mb-2">Next Steps</h3>
              <p className="text-muted-foreground">Proceed to Marketing setup.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  // --- Function to render content based on active step ---
  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return renderProductionSetup();
      case 1:
        return renderFinancials();
      case 2:
        return renderLaunchPlan();
      case 3:
        return renderReview();
      default:
        return <div>Unknown Step</div>;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-foreground">Launch Preparation</h1>

      {/* Render the Stepper */}
      <PhaseStepper steps={launchSteps} currentStepIndex={activeStep} />

      {/* Render the active step's content */}
      <div className="mt-8">
        {renderStepContent()}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8">
        <Button variant="outline" onClick={prevStep} disabled={activeStep === 0}>
          <ChevronLeft size={16} className="mr-1" />
          Back
        </Button>
        {activeStep < launchSteps.length - 1 ? (
          <Button variant="default" onClick={nextStep}>
            Continue <ChevronRight size={16} className="ml-1" />
          </Button>
        ) : (
          <Button variant="secondary" onClick={goToMarketingPlan}>
            Next: Marketing <ChevronRight size={16} className="ml-1" />
          </Button>
        )}
      </div>
    </div>
  );
} 