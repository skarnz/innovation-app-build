import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2 } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import TargetMarketForm from '@/components/validation/TargetMarketForm';
import SurveyWizard from '@/components/validation/SurveyWizard';
import SurveyResultsDisplay from '@/components/validation/SurveyResultsDisplay';

// --- TargetMarketForm Placeholder (Integrated directly due to component creation issues) ---
const TargetMarketFormPlaceholder = ({ projectId, onSave }: { projectId?: string, onSave: (data: any) => void }) => {
  const [demographics, setDemographics] = useState('');
  const [psychographics, setPsychographics] = useState('');
  const [needsPainPoints, setNeedsPainPoints] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // TODO: Fetch initialData if needed when API is ready

  const handleSave = async () => {
    setIsLoading(true);
    const marketData = { demographics, psychographics, needsPainPoints };
    console.log(`Saving target market for project ${projectId}:`, marketData);
    
    try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000)); 
        const response = { ok: true }; 

        if (!response.ok) {
             throw new Error('Failed to save target market (Simulated Error)');
        }
        toast({ title: "Success", description: "Target market details saved." });
        onSave(marketData);
    } catch (err: any) {
        console.error('Error saving target market:', err);
        toast({ title: "Error", description: err.message || "An unexpected error occurred.", variant: "destructive" });
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <Card className="glass-card w-full">
      <CardHeader>
        <CardTitle>1. Define Your Target Market</CardTitle>
        <CardDescription>Describe the audience you intend to reach with your product idea.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid w-full gap-1.5">
          <Label htmlFor="demographics">Demographics</Label>
          <Textarea placeholder="e.g., Age range, location..." id="demographics" value={demographics} onChange={(e) => setDemographics(e.target.value)} rows={3} disabled={isLoading} />
        </div>
        <div className="grid w-full gap-1.5">
          <Label htmlFor="psychographics">Psychographics</Label>
          <Textarea placeholder="e.g., Lifestyle, interests, values..." id="psychographics" value={psychographics} onChange={(e) => setPsychographics(e.target.value)} rows={3} disabled={isLoading} />
        </div>
        <div className="grid w-full gap-1.5">
          <Label htmlFor="needsPainPoints">Needs & Pain Points</Label>
          <Textarea placeholder="e.g., What problems do they face?..." id="needsPainPoints" value={needsPainPoints} onChange={(e) => setNeedsPainPoints(e.target.value)} rows={4} disabled={isLoading} />
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSave} disabled={isLoading} className="w-full sm:w-auto">
          {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          {isLoading ? 'Saving...' : 'Save Target Market'}
        </Button>
      </CardFooter>
    </Card>
  );
};
// --- End of TargetMarketForm Placeholder ---

// --- Placeholder Components for Steps 4.3 - 4.5 ---
const QualitativeSummaryPlaceholder = () => (
    <Card className="glass-card">
        <CardHeader><CardTitle>3. Qualitative Summary (Sim)</CardTitle></CardHeader>
        <CardContent>
            <p className="text-sm text-muted-foreground italic">
                "Simulated Summary: Interviews suggest strong interest in core value proposition but concerns about pricing transparency. Feature [X] frequently requested for post-MVP..."
            </p>
        </CardContent>
    </Card>
);

const ValidationScorePlaceholder = ({ score }: { score?: number | null }) => (
    <Card className="glass-card">
        <CardHeader><CardTitle>4. Validation Score (Sim)</CardTitle></CardHeader>
        <CardContent className="text-center">
            {score ? (
                <p className="text-4xl font-bold">{score}<span className="text-lg text-muted-foreground">/100</span></p>
            ) : (
                <p className="text-sm text-muted-foreground">Score calculated after survey simulation.</p>
            )}
            <p className="text-xs text-muted-foreground mt-1">Based on simulated survey data.</p>
        </CardContent>
    </Card>
);

const MarketForecastPlaceholder = ({ projectId }: { projectId?: string }) => {
    // Basic state simulation for forecast generation
    const [signals, setSignals] = useState('');
    const [forecast, setForecast] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleGenerateForecast = async () => {
        setIsLoading(true);
        setForecast(null);
        console.log('Simulating forecast for:', projectId, 'with signals:', signals);
        await new Promise(resolve => setTimeout(resolve, 1200)); // Simulate API call
        setForecast("Simulated Market Forecast:\n1. Potential for rapid adoption in niche [Y] if pricing is competitive.\n2. Risk of saturation by Q4 if competitor [Z] launches similar feature.\n3. Opportunity exists to expand into adjacent market [A] with minor tweaks.");
        setIsLoading(false);
    };

    return (
        <Card className="glass-card">
            <CardHeader><CardTitle>5. Market Forecast (Sim)</CardTitle></CardHeader>
            <CardContent className="space-y-3">
                <div>
                    <Label htmlFor="marketSignals" className="text-xs">Key Market Signals (Optional)</Label>
                    <Textarea 
                        id="marketSignals"
                        placeholder="e.g., New competitor, regulation change, related tech trend..."
                        value={signals}
                        onChange={(e) => setSignals(e.target.value)}
                        rows={2}
                        className="text-sm"
                        disabled={isLoading}
                    />
                </div>
                <Button onClick={handleGenerateForecast} disabled={isLoading} className="w-full">
                    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                    Generate Simulated Forecast
                </Button>
                {forecast && (
                    <div className="pt-2">
                        <p className="text-xs font-medium text-muted-foreground">Generated Forecast:</p>
                        <p className="text-sm whitespace-pre-wrap">{forecast}</p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};
// --- End of Placeholder Components ---

const ValidationPage = () => {
    const { projectId } = useParams();
    const [targetMarketData, setTargetMarketData] = useState<any>(null);
    const [simulatedScore, setSimulatedScore] = useState<number | null>(null);
    
    // State for Survey Step 4.2
    const [surveyView, setSurveyView] = useState<'setup' | 'results'>('setup');
    const [surveyResults, setSurveyResults] = useState<any>(null);

    // Callback for SurveyWizard completion
    const handleSimulationComplete = (results: any) => {
        if (results) {
            setSurveyResults(results);
            setSurveyView('results');
            // Update score based on results (example)
            if (results.recommendationScoreAvg) {
                setSimulatedScore(Math.round(parseFloat(results.recommendationScoreAvg) * 20));
            } else {
                setSimulatedScore(null);
            }
        } else {
            // Handle simulation error case if needed (e.g., keep view as setup)
            setSurveyResults(null);
            setSurveyView('setup');
            setSimulatedScore(null);
        }
    };

    // Callback for ResultsDisplay to go back to setup
    const handleRunSurveyAgain = () => {
        setSurveyResults(null);
        setSurveyView('setup');
        setSimulatedScore(null);
    };

    return (
        <div className="space-y-8">
            <PageHeader 
                title={`Project Validation ${projectId ? `(${projectId.substring(0,6)}...)` : ''}`}
                breadcrumbs={[{ label: 'Dashboard', path: '/' }, { label: `Project ${projectId ? projectId.substring(0,6)+'...' : ''}`, path: `/project/${projectId}/ideation` }, {label: 'Validation', path: '#'}]}
            />
            <div className="px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
                {/* Column 1: Target Market */}
                <div className="md:col-span-1 lg:col-span-1">
                   <TargetMarketForm projectId={projectId!} onSave={setTargetMarketData} />
                </div>

                {/* Column 2: Survey */}
                <div className="md:col-span-1 lg:col-span-1">
                    <Card className="glass-card w-full">
                        <CardHeader>
                            <CardTitle>2. Simulated Survey</CardTitle>
                            <CardDescription>
                                {surveyView === 'setup' 
                                    ? "Set up and run a simulated survey based on your target market."
                                    : "Review the simulated results from your survey."}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {surveyView === 'setup' ? (
                                <SurveyWizard 
                                    projectId={projectId} 
                                    targetMarketData={targetMarketData} 
                                    onSimulationComplete={handleSimulationComplete} 
                                />
                            ) : (
                                <SurveyResultsDisplay 
                                    results={surveyResults} 
                                    onRunAgain={handleRunSurveyAgain} 
                                />
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Column 3: Other Placeholders */}
                 <div className="md:col-span-1 lg:col-span-1 space-y-8">
                    <QualitativeSummaryPlaceholder />
                    <ValidationScorePlaceholder score={simulatedScore} />
                    <MarketForecastPlaceholder projectId={projectId} />
                 </div>
            </div>
        </div>
    );
};

export default ValidationPage; 