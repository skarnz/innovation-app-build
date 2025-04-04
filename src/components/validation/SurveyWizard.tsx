import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2 } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";

interface SurveyWizardProps {
  projectId?: string;
  targetMarketData?: any;
  onSimulationComplete: (results: any) => void; // Callback with results
}

// Mock Questions for MVP
const mockQuestions = [
    "How likely are you to recommend this product? (1-5)",
    "What feature is most appealing?",
    "What is your biggest concern?"
];

const SurveyWizard: React.FC<SurveyWizardProps> = ({ projectId, targetMarketData, onSimulationComplete }) => {
  const [surveyTitle, setSurveyTitle] = useState('');
  const [isLoadingSurvey, setIsLoadingSurvey] = useState(false);
  const [surveyError, setSurveyError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleRunSimulation = async () => {
    setIsLoadingSurvey(true);
    setSurveyError(null);
    console.log('Running survey simulation for project:', projectId, 'Title:', surveyTitle);

    try {
        // Simulate API Call & Mock Result Generation
        await new Promise(resolve => setTimeout(resolve, 1500));
        const mockData = {
            summary: `Simulated results for '${surveyTitle || 'Untitled Survey'}' based on target market: ${targetMarketData?.demographics?.substring(0, 30) || 'N/A'}...`,
            recommendationScoreAvg: (Math.random() * 2 + 3).toFixed(1),
            featureInterest: ["Feature A", "Feature B", "Feature C"].sort(() => 0.5 - Math.random()),
            concerns: ["Pricing", "Complexity", "Integration"].sort(() => 0.5 - Math.random())
        };
        
        onSimulationComplete(mockData); // Pass results back to parent
        toast({ title: "Simulation Complete", description: "Mock survey results generated." });

    } catch (err: any) {
        console.error('Error simulating survey:', err);
        setSurveyError("Failed to simulate survey results.");
        toast({ title: "Error", description: "Failed to simulate survey.", variant: "destructive" });
        onSimulationComplete(null); // Indicate failure
    } finally {
        setIsLoadingSurvey(false);
    }
  };

  return (
    <div className="space-y-4">
        <div className="space-y-1">
        <Label htmlFor="surveyTitle">Survey Title</Label>
        <Input id="surveyTitle" placeholder="e.g., Initial Concept Feedback" value={surveyTitle} onChange={(e) => setSurveyTitle(e.target.value)} />
        </div>
        <div className="space-y-1">
        <Label>Target Audience (from Step 1)</Label>
        <Textarea 
            readOnly 
            value={targetMarketData ? `Demographics: ${targetMarketData.demographics}\nPsychographics: ${targetMarketData.psychographics}` : 'Define target market first.'}
            rows={3}
            className="bg-muted/50 text-sm"
        />
        </div>
            <div className="space-y-1">
        <Label>Survey Questions (MVP - Predefined)</Label>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 pl-2">
                {mockQuestions.map((q, i) => <li key={i}>{q}</li>)}
            </ul>
        </div>
        {surveyError && <p className="text-sm text-destructive">{surveyError}</p>}
        <Button onClick={handleRunSimulation} disabled={isLoadingSurvey || !targetMarketData} className="w-full">
        {isLoadingSurvey ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
        {isLoadingSurvey ? 'Simulating...' : 'Run Simulated Survey'}
        </Button>
    </div>
  );
};

export default SurveyWizard; 