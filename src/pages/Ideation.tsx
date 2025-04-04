import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2 } from 'lucide-react';
import AgentScraper from '@/components/ideation/AgentScraper';
import { RefreshCw } from 'lucide-react';

// Placeholder components (to be created)
// const IdeationResults = ({ ideas }) => <div>Ideation Results Placeholder</div>;
// const AgentScraper = ({ projectId, ideaContext }) => <Button>Analyze Trends Placeholder</Button>;
// const CounterIntuitionCard = () => <div>Counter Intuition Placeholder</div>;

// Placeholder for CounterIntuitionCard
const CounterIntuitionCard = () => (
    <Card className="glass-card">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
const IdeationPage = () => {
  // TODO: Get projectId from URL params or context
  const { projectId } = useParams(); // Example: if route is /project/:projectId/ideation
  const [problemStatement, setProblemStatement] = useState('');
  const [initialIdea, setInitialIdea] = useState('');
  const [isLoadingIdeation, setIsLoadingIdeation] = useState(false);
  const [ideationError, setIdeationError] = useState<string | null>(null);
  const [generatedIdeas, setGeneratedIdeas] = useState<any[]>([]); // State for Step 3.2 results

  const handleGenerateIdeas = async () => {
    setIsLoadingIdeation(true);
    setIdeationError(null);
    setGeneratedIdeas([]);

    if (!problemStatement || !initialIdea) {
        setIdeationError('Please enter both a problem statement and an initial idea.');
        setIsLoadingIdeation(false);
        return;
    }

    try {
      // --- API Call for Step 3.2 (AI-Powered Ideation) ---
      console.log('Calling /api/ai/ideate with:', { problemStatement, initialIdea, projectId });
      const response = await fetch('/api/ai/ideate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ problemStatement, solutionIdea: initialIdea, projectId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to generate ideas');
      }

      const data = await response.json();
      console.log('Received ideas:', data.ideas);
      setGeneratedIdeas(data.ideas || []); // Assuming backend returns { ideas: [...] }
      // -----------------------------------------------------

    } catch (err: any) {
      console.error('Error generating ideas:', err);
      setIdeationError(err.message || 'An unexpected error occurred.');
    } finally {
      setIsLoadingIdeation(false);
    }
  };

  // Combine problem and idea for context needed by scraper/counter-intuition
  const ideaContext = `Problem: ${problemStatement}\nIdea: ${initialIdea}`;

  return (
    <div className="space-y-8">
      <PageHeader 
        title={`Project Ideation ${projectId ? `(${projectId.substring(0,6)}...)` : ''}`}
        // TODO: Update breadcrumbs based on actual routing
        breadcrumbs={[{ label: 'Dashboard', path: '/' }, { label: 'Project Setup', path: '/project/setup' }, {label: 'Ideation', path: '#'}]}
      />
      <div className="px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column: Input & Controls */}
        <div className="md:col-span-1 space-y-6">
            <Card className="glass-card">
                <CardHeader>
                    <CardTitle>1. Define Your Concept</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="problemStatement">Problem Statement</Label>
                        <Textarea 
                            id="problemStatement" 
                            placeholder="What customer problem are you solving?" 
                            value={problemStatement}
                            onChange={(e) => setProblemStatement(e.target.value)}
                            rows={4}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="initialIdea">Initial Solution Idea</Label>
                        <Textarea 
                            id="initialIdea" 
                            placeholder="How do you initially propose to solve it?" 
                            value={initialIdea}
                            onChange={(e) => setInitialIdea(e.target.value)}
                             rows={4}
                        />
                    </div>
                     <Button 
                        onClick={handleGenerateIdeas} 
                        disabled={isLoadingIdeation || !problemStatement || !initialIdea}
                        className="w-full bg-electric-blue hover:bg-electric-blue/90"
                     >
                        {isLoadingIdeation ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                        {isLoadingIdeation ? 'Generating Alternatives...' : 'Generate Alternative Ideas'}
                    </Button>
                    {ideationError && <p className="text-sm text-destructive">{ideationError}</p>}
                </CardContent>
            </Card>

            {/* Placeholder for Agent Scraper Button (Step 3.3) */}
            <Card className="glass-card">
                 <CardHeader><CardTitle>2. Analyze Trends (Simulated)</CardTitle></CardHeader>
                 <CardContent>
                     <AgentScraper 
                        projectId={projectId} 
                        ideaContext={ideaContext} 
                        disabled={!initialIdea || !problemStatement}
                     /> 
                 </CardContent>
            </Card>

             {/* Placeholder for Counter Intuition (Step 3.4) */}
             {/* <CounterIntuitionCard /> */}
             <Card className="glass-card bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/10">
                 <CardHeader><CardTitle>Challenge Assumptions</CardTitle></CardHeader>
                 <CardContent className="text-center text-muted-foreground italic">
                     Counter Intuition Placeholder
                 </CardContent>
            </Card>
        </div>

        {/* Right Column: Results */}
        <div className="md:col-span-2">
            <Card className="glass-card min-h-[400px]">
                 <CardHeader>
                    <CardTitle>Generated Ideas</CardTitle>
                </CardHeader>
                 <CardContent>
                    {isLoadingIdeation && <p className="text-muted-foreground">Generating ideas...</p>}
                    {!isLoadingIdeation && generatedIdeas.length === 0 && (
                        <p className="text-muted-foreground">Enter a problem and idea, then click 'Generate' to see AI-powered alternatives here.</p>
                    )}
                    {/* Placeholder for IdeationResults component (Step 3.2) */}
                    {/* <IdeationResults ideas={generatedIdeas} /> */}
                     {generatedIdeas.length > 0 && (
                        <div className="space-y-4">
                            {generatedIdeas.map((idea, index) => (
                                <Card key={index} className="bg-muted/30">
                                    <CardHeader><CardTitle>{idea.title || `Idea ${index + 1}`}</CardTitle></CardHeader>
                                    <CardContent><p>{idea.description || 'No description provided.'}</p></CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                 </CardContent>
            </Card>
        </div>

      </div>
    </div>
  );
};

export default IdeationPage; 