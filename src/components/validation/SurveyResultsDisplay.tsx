import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
// Placeholder for charting library
// import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface SurveyResultsDisplayProps {
  results: any; // Expects the mockData structure from SurveyWizard
  onRunAgain: () => void; // Callback to reset to setup view
}

const SurveyResultsDisplay: React.FC<SurveyResultsDisplayProps> = ({ results, onRunAgain }) => {
  if (!results) {
    return <p className="text-muted-foreground">No results to display.</p>;
  }

  return (
     <div className="space-y-4">
         <h4 className="font-medium">Simulated Results:</h4>
         <p className="text-sm text-muted-foreground">{results.summary}</p>
         <div className="grid grid-cols-2 gap-4 text-sm">
             <div><strong>Avg. Recommendation:</strong> {results.recommendationScoreAvg} / 5</div>
             <div><strong>Top Feature Interest:</strong> {results.featureInterest[0]}</div>
         </div>
         <div>
             <p className="font-medium text-sm">Key Concerns:</p>
             <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 pl-2">
                {results.concerns.slice(0,2).map((c: string, i: number) => <li key={i}>{c}</li>)}
             </ul>
         </div>
        {/* Placeholder for charts */}
         <div className="h-[150px] bg-muted/30 flex items-center justify-center text-muted-foreground text-sm rounded-md border border-dashed">
            Chart Placeholder
        </div> 
         <Button variant="outline" onClick={onRunAgain} className="w-full">
            Run New Simulation
         </Button>
     </div>
  );
};

export default SurveyResultsDisplay; 