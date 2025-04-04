import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2 } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

interface TargetMarketFormProps {
  projectId: string;
  initialData?: {
    demographics?: string;
    psychographics?: string;
    needsPainPoints?: string;
  };
  onSave?: (data: any) => void; // Callback after save
}

const TargetMarketForm: React.FC<TargetMarketFormProps> = ({ 
  projectId,
  initialData = { demographics: '', psychographics: '', needsPainPoints: '' },
  onSave
}) => {
  const [demographics, setDemographics] = useState(initialData.demographics || '');
  const [psychographics, setPsychographics] = useState(initialData.psychographics || '');
  const [needsPainPoints, setNeedsPainPoints] = useState(initialData.needsPainPoints || '');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setDemographics(initialData.demographics || '');
    setPsychographics(initialData.psychographics || '');
    setNeedsPainPoints(initialData.needsPainPoints || '');
  }, [initialData]);

  const handleSave = async () => {
    setIsLoading(true);
    const marketData = { demographics, psychographics, needsPainPoints };
    console.log(`Saving target market for project ${projectId}:`, marketData);
    
    try {
        // TODO: Replace with actual API call `PUT /api/projects/:projectId`
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
        const response = { ok: true }; 

        if (!response.ok) {
             throw new Error('Failed to save target market (Simulated Error)');
        }

        toast({
            title: "Success",
            description: "Target market details saved.",
        });
        if (onSave) {
            onSave(marketData); // Notify parent component
        }

    } catch (err: any) {
        console.error('Error saving target market:', err);
        toast({
            title: "Error",
            description: err.message || "An unexpected error occurred while saving.",
            variant: "destructive",
        });
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
          <Textarea 
            placeholder="e.g., Age range, location, education, occupation..." 
            id="demographics"
            value={demographics}
            onChange={(e) => setDemographics(e.target.value)}
            rows={3}
            disabled={isLoading}
          />
        </div>
        <div className="grid w-full gap-1.5">
          <Label htmlFor="psychographics">Psychographics</Label>
          <Textarea 
            placeholder="e.g., Lifestyle, interests, values, attitudes, personality traits..." 
            id="psychographics"
            value={psychographics}
            onChange={(e) => setPsychographics(e.target.value)}
            rows={3}
            disabled={isLoading}
           />
        </div>
        <div className="grid w-full gap-1.5">
          <Label htmlFor="needsPainPoints">Needs & Pain Points</Label>
          <Textarea 
            placeholder="e.g., What problems do they face? What unmet needs exist? What motivates them related to your idea?" 
            id="needsPainPoints"
            value={needsPainPoints}
            onChange={(e) => setNeedsPainPoints(e.target.value)}
            rows={4}
            disabled={isLoading}
          />
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

export default TargetMarketForm; 