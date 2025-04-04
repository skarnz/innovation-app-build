import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose
} from "@/components/ui/sheet";
import { Textarea } from '@/components/ui/textarea';
import { Loader2, SearchCode } from 'lucide-react';

interface AgentScraperProps {
  projectId?: string;
  ideaContext: string;
  disabled?: boolean;
}

const AgentScraper: React.FC<AgentScraperProps> = ({ projectId, ideaContext, disabled }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyzeTrends = async () => {
    if (!ideaContext) {
        setError("Please provide an idea context first.");
        return;
    }
    setIsLoading(true);
    setError(null);
    setAnalysisResult(null);

    try {
      console.log('Calling /api/ai/scrape-trends with:', { ideaContext, projectId });
      const response = await fetch('/api/ai/scrape-trends', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ideaContext, projectId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to analyze trends');
      }

      const data = await response.json();
      setAnalysisResult(data.analysis);

    } catch (err: any) {
      console.error('Error analyzing trends:', err);
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      setAnalysisResult(null);
      setError(null);
      setIsLoading(false);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={handleOpenChange}>
      <SheetTrigger asChild>
        <Button variant="outline" disabled={disabled} className="w-full">
            <SearchCode className="mr-2 h-4 w-4" />
            Analyze Market Trends (Simulated)
        </Button>
      </SheetTrigger>
      <SheetContent className="sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Simulated Trend Analysis</SheetTitle>
          <SheetDescription>
            Based on your idea context, here's a simulated analysis of potential trends from public sources like Reddit, Quora, and Google Trends.
            <br/><strong className='text-destructive'>Note: This data is simulated for demo purposes.</strong>
          </SheetDescription>
        </SheetHeader>
        <div className="py-6 space-y-4">
            <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Idea Context:</p>
                <Textarea 
                    value={ideaContext}
                    readOnly
                    rows={4}
                    className="bg-muted/50 text-sm"
                />
            </div>
           <Button onClick={handleAnalyzeTrends} disabled={isLoading || !ideaContext} className="w-full">
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                {isLoading ? 'Analyzing...' : 'Run Simulated Analysis'}
            </Button>
             {error && <p className="text-sm text-destructive text-center pt-2">Error: {error}</p>}

            {analysisResult && (
                 <div className="space-y-2 pt-4">
                    <p className="text-sm font-medium">Analysis Results:</p>
                    <Textarea 
                        value={analysisResult}
                        readOnly
                        rows={8}
                        className="bg-muted/50 whitespace-pre-wrap text-sm"
                    />
                </div>
            )}
             {!isLoading && !analysisResult && !error && (
                 <p className="text-sm text-muted-foreground text-center pt-4">Click 'Run Simulated Analysis' to generate trends based on your idea context.</p>
            )}
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button variant="outline">Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default AgentScraper; 