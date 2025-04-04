import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Loader2, Sparkles, Search } from 'lucide-react';

// Mock simulated trend data
const mockTrends = [
  "Increasing adoption of AI in creative workflows.",
  "Demand for personalized user experiences is rising.",
  "Sustainability and ethical considerations are becoming key factors in tech.",
  "Shift towards decentralized platforms and Web3 technologies.",
  "Growth in low-code/no-code development tools."
];

interface AgentScraperProps {
  ideaContext?: string; // Optional context from the main idea
}

const AgentScraper: React.FC<AgentScraperProps> = ({ ideaContext }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<string[]>([]);
  const [query, setQuery] = useState("Analyze current tech trends relevant to: " + (ideaContext || "[your idea]"));

  const handleSimulateAnalysis = () => {
    setIsLoading(true);
    setResults([]);
    console.log("Simulating AI Agent Scraper for query:", query);
    // Simulate API call delay
    setTimeout(() => {
      // Randomly select a few mock trends
      const numResults = Math.floor(Math.random() * 3) + 2; // 2 to 4 results
      const shuffled = mockTrends.sort(() => 0.5 - Math.random());
      setResults(shuffled.slice(0, numResults));
      setIsLoading(false);
    }, 1500); // Simulate 1.5 seconds delay
  };

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search size={18} className="text-electric-blue" />
          Simulated Trend Analysis
        </CardTitle>
        <CardDescription>
          Mimics an AI agent analyzing market trends based on your idea or query.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="trend-query">Analysis Query:</Label>
          <Textarea
            id="trend-query"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter keywords or a question about market trends..."
            className="bg-navy-light border-white/20 mt-1 min-h-[80px]"
          />
        </div>
        <Button onClick={handleSimulateAnalysis} disabled={isLoading} className="w-full">
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Sparkles className="mr-2 h-4 w-4" />
          )}
          {isLoading ? 'Analyzing Trends...' : 'Run Simulated Analysis'}
        </Button>

        {results.length > 0 && (
          <div className="pt-4 border-t border-white/10">
            <h4 className="font-medium text-white/90 mb-2">Simulated Trends Found:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-white/80">
              {results.map((trend, index) => (
                <li key={index}>{trend}</li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AgentScraper; 