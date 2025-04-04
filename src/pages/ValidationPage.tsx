import React, { useState } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams
import axios from 'axios'; // Import axios
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card'; // Used for partners list
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useToast } from "@/components/ui/use-toast"; // Import useToast
import { Plus, Sparkles, ChevronDown, ChevronUp, BarChart2, Search, MessageCircle, List, Loader2 } from 'lucide-react'; // Icons and Loader2
import { Label } from '@/components/ui/label';
// Import PhaseStepper if it's meant to be used here (Plan C.5 suggests applying later)

// Types (simplified for initial setup)
type DataPartner = {
  id: string;
  name: string;
  icon: string; // Using emoji for now
  description: string;
};
interface Survey {
  id: string;
  name: string;
  status: 'Draft' | 'Sent' | 'Completed';
}

// Mock Data Partners
const dataPartnersList: DataPartner[] = [
  { id: 'pollfish', name: 'Pollfish', icon: '🔍', description: 'Instant mobile surveys' },
  { id: 'prolific', name: 'Prolific', icon: '👥', description: 'Diverse participant pool' },
  { id: 'typeform', name: 'Typeform', icon: '📝', description: 'Interactive, user-friendly forms' },
  { id: 'exa', name: 'Exa.ai', icon: '🔮', description: 'Advanced business datasets' },
  { id: 'perplexity', name: 'Perplexity', icon: '🧠', description: 'AI research aggregator' },
  { id: 'mintel', name: 'Mintel', icon: '📊', description: 'Market intelligence & consumer data' }
];

export default function ValidationPage() {
  const { projectId } = useParams<{ projectId: string }>(); // Get projectId
  const { toast } = useToast(); // Initialize toast
  const [activeTab, setActiveTab] = useState("data-partners");
  const [showNewSurveyForm, setShowNewSurveyForm] = useState(false);
  // Mock surveys state
  const [surveys, setSurveys] = useState<Survey[]>([
    { id: 's1', name: 'Initial Feature Feedback', status: 'Draft' },
    { id: 's2', name: 'Pricing Sensitivity Check', status: 'Sent' }
  ]);
  const [newSurveyName, setNewSurveyName] = useState("");
  const [newSurveyDesc, setNewSurveyDesc] = useState(""); // State for description
  const [isCreatingSurvey, setIsCreatingSurvey] = useState(false); // Loading state
  const [researchQuery, setResearchQuery] = useState("");
  const [isGeneratingQuestions, setIsGeneratingQuestions] = useState(false);
  const [isResearching, setIsResearching] = useState(false);
  const [researchResult, setResearchResult] = useState<string | null>(null);

  const handleCreateSurvey = async () => {
    if (!projectId) {
      toast({ variant: "destructive", title: "Error", description: "Project ID is missing." });
      return;
    }
    if (!newSurveyName.trim()) {
      toast({ variant: "destructive", title: "Error", description: "Survey name cannot be empty." });
      return;
    }

    setIsCreatingSurvey(true);
    try {
      console.log(`Calling POST /api/projects/${projectId}/surveys`);
      const response = await axios.post(`/api/projects/${projectId}/surveys`, {
        name: newSurveyName,
        description: newSurveyDesc,
      }, { withCredentials: true });

      // Assuming backend returns { success: true, surveyId: '...' }
      if (response.data.success && response.data.surveyId) {
          const newSurvey: Survey = {
            id: response.data.surveyId, // Use ID from backend
            name: newSurveyName,
            status: 'Draft'
          };
          setSurveys(prev => [...prev, newSurvey]);
          setNewSurveyName("");
          setNewSurveyDesc("");
          setShowNewSurveyForm(false);
          toast({ title: "Success", description: "Survey draft created." });
      } else {
          throw new Error(response.data.message || 'Failed to create survey draft.');
      }

    } catch (error: any) {
      console.error("Error creating survey:", error);
      toast({
        variant: "destructive",
        title: "Survey Creation Failed",
        description: error.response?.data?.message || error.message || "An unknown error occurred",
      });
    } finally {
      setIsCreatingSurvey(false);
    }
  };

  const handleGenerateQuestions = async () => {
    if (!newSurveyName.trim()) {
      toast({ variant: "destructive", title: "Error", description: "Please enter a survey name first to generate relevant questions." });
      return;
    }
    // Note: We might want projectId and full idea context from the parent project state later
    const ideaContext = "Placeholder Idea Context - Fetch from project state";

    setIsGeneratingQuestions(true);
    try {
      console.log("Calling POST /api/ai/generate-survey-questions");
      const response = await axios.post('/api/ai/generate-survey-questions', {
        surveyName: newSurveyName,
        ideaContext: ideaContext,
        // Optionally pass projectId if needed by backend
        // projectId: projectId
      }, { withCredentials: true });

      if (response.data.success && response.data.questions) {
        console.log("Generated Questions:", response.data.questions);
        toast({ title: "AI Complete", description: "Survey questions generated (logged to console)." });
        // TODO: Need state/UI to actually display/use these generated questions
        // For now, we just log them.
      } else {
        throw new Error(response.data.message || 'Failed to generate questions.');
      }

    } catch (error: any) {
      console.error("Error generating questions:", error);
      toast({
        variant: "destructive",
        title: "AI Question Generation Failed",
        description: error.response?.data?.message || error.message || "An unknown error occurred",
      });
    } finally {
      setIsGeneratingQuestions(false);
    }
  };

  const handleResearch = async () => {
    if (!researchQuery.trim()) {
        toast({ variant: "destructive", title: "Error", description: "Please enter a research query." });
        return;
    }
    const ideaContext = "Placeholder Idea Context - Fetch from project state"; // Placeholder

    setIsResearching(true);
    setResearchResult(null); // Clear previous results
    try {
        console.log("Calling POST /api/ai/deep-research");
        const response = await axios.post('/api/ai/deep-research', {
            query: researchQuery,
            ideaContext: ideaContext,
            // projectId: projectId // Optionally pass projectId
        }, { withCredentials: true });

        if (response.data.success && response.data.researchSummary) {
            setResearchResult(response.data.researchSummary);
            toast({ title: "AI Complete", description: "Deep research analysis generated." });
        } else {
            throw new Error(response.data.message || 'Failed to perform research.');
        }

    } catch (error: any) {
        console.error("Error performing research:", error);
        toast({
            variant: "destructive",
            title: "AI Research Failed",
            description: error.response?.data?.message || error.message || "An unknown error occurred",
        });
        setResearchResult("Error retrieving research results."); // Show error in result area
    } finally {
        setIsResearching(false);
    }
  };

  const renderDeepResearch = () => (
    <Card className="bg-card text-card-foreground p-6 space-y-4">
       <CardHeader className="p-0 mb-2">
         <CardTitle className="flex items-center gap-2"><Search size={18}/> AI Deep Research</CardTitle>
         <CardDescription>Ask specific questions or request research on topics related to your idea.</CardDescription>
       </CardHeader>
       <CardContent className="p-0 space-y-3">
         <Textarea
           placeholder="Enter your research query... e.g., 'Analyze competitor pricing strategies in the SaaS market for AI tools.'"
           value={researchQuery}
           onChange={(e) => setResearchQuery(e.target.value)}
           className="bg-input border-border min-h-[100px]"
           disabled={isResearching}
         />
         <Button onClick={handleResearch} disabled={isResearching} variant="default" className="w-full">
           {isResearching ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Search className="mr-2 h-4 w-4" />}
           {isResearching ? 'Researching...' : 'Start Research (AI)'}
         </Button>
         <div className="border-t border-border pt-4 mt-4">
           <h4 className="font-medium mb-2 text-foreground">Research Results:</h4>
            <div className="text-muted-foreground p-4 bg-muted/30 rounded min-h-[150px]">
              {isResearching && (
                <div className="flex justify-center items-center h-full">
                   <Loader2 className="h-6 w-6 animate-spin text-primary" />
                </div>
              )}
              {!isResearching && researchResult && (
                <p className="whitespace-pre-wrap">{researchResult}</p>
              )}
              {!isResearching && !researchResult && (
                <p className="text-center italic text-muted-foreground/60">AI research results will appear here.</p>
              )}
            </div>
         </div>
       </CardContent>
     </Card>
 );

  return (
    <div className="container mx-auto px-4 py-8 text-foreground">
      {/* TODO: Integrate PhaseStepper here later if applicable to Validation sub-steps */}

      <h1 className="text-3xl md:text-4xl font-orbitron font-bold text-electric-purple mb-2">
        Validation Phase
      </h1>
      <p className="text-white/70 mb-8">
        Test and validate your ideas with real users and market data to refine your concept.
      </p>

      <Tabs defaultValue="data-partners" className="w-full" onValueChange={setActiveTab}>
        {/* Use theme variables for TabsList */}
        <TabsList className="grid w-full grid-cols-4 bg-muted p-1 rounded-lg mb-8">
           {/* Use theme variables for TabsTrigger */}
          <TabsTrigger value="data-partners" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-muted-foreground hover:text-foreground rounded-md">
            <Search size={16} className="mr-2"/> Data Partners
          </TabsTrigger>
          <TabsTrigger value="surveys" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-muted-foreground hover:text-foreground rounded-md">
             <MessageCircle size={16} className="mr-2"/> Surveys
          </TabsTrigger>
          <TabsTrigger value="results" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-muted-foreground hover:text-foreground rounded-md">
             <BarChart2 size={16} className="mr-2"/> Results
          </TabsTrigger>
          <TabsTrigger value="research" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-muted-foreground hover:text-foreground rounded-md">
             <Sparkles size={16} className="mr-2"/> Deep Research
          </TabsTrigger>
        </TabsList>

        {/* --- Data Partners Tab --- */}
        <TabsContent value="data-partners">
          {/* Use bg-card and text-card-foreground, remove .glass-card */}
          <div className="bg-card text-card-foreground p-6 md:p-8 rounded-xl"> 
            <h2 className="text-2xl font-orbitron font-bold text-foreground mb-6">Available Data Partners</h2> {/* Use text-foreground */}
            <p className="text-muted-foreground mb-6">Explore potential partners for surveys and market data access. (Integration not implemented)</p> {/* Use text-muted-foreground */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dataPartnersList.map((partner) => (
                 /* Apply card styles, border, hover effects using theme variables */
                <div key={partner.id} className="bg-card/50 p-4 flex items-center gap-4 border border-border hover:border-primary/50 transition-colors rounded-lg">
                  <div className="text-3xl flex-shrink-0">{partner.icon}</div> {/* Icon color might need adjustment */}
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{partner.name}</h3> {/* Use text-foreground */}
                    <p className="text-sm text-muted-foreground">{partner.description}</p> {/* Use text-muted-foreground */}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* --- Surveys Tab --- */}
        <TabsContent value="surveys">
           {/* Use bg-card and text-card-foreground, remove .glass-card */}
          <div className="bg-card text-card-foreground p-6 md:p-8 space-y-6 rounded-xl"> 
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-orbitron font-bold text-foreground">Survey Manager</h2> {/* Use text-foreground */}
              <Button
                variant="secondary" // Use secondary variant for purple
                className="flex items-center gap-2"
                onClick={() => setShowNewSurveyForm(!showNewSurveyForm)}
              >
                {showNewSurveyForm ? 'Cancel' : 'Create New Survey'}
                {!showNewSurveyForm && <Plus size={16} />}
              </Button>
            </div>

            {/* New Survey Form (Conditional) */}
            {showNewSurveyForm && (
               /* Use card variables */
              <Card className="bg-muted/50 p-4"> 
                <CardHeader><CardTitle>New Survey Details</CardTitle></CardHeader>
                <CardContent className="space-y-3">
                  <Label htmlFor="surveyName">Survey Name</Label>
                  <Input
                    id="surveyName"
                    value={newSurveyName}
                    onChange={(e) => setNewSurveyName(e.target.value)}
                    placeholder="e.g., Early Adopter Feedback"
                    className="bg-input border-border" // Use input/border variables
                    disabled={isCreatingSurvey || isGeneratingQuestions}
                  />
                  <Label htmlFor="surveyDesc">Description (Optional)</Label>
                  <Textarea
                      id="surveyDesc"
                      placeholder="Purpose of this survey?"
                      className="bg-input border-border" // Use input/border variables
                      value={newSurveyDesc}
                      onChange={(e) => setNewSurveyDesc(e.target.value)}
                      disabled={isCreatingSurvey || isGeneratingQuestions}
                  />
                  <div className="flex justify-between items-center pt-2">
                    <Button
                      variant="outline" // Use outline variant
                      onClick={handleGenerateQuestions}
                      disabled={isGeneratingQuestions || isCreatingSurvey}
                    >
                      {isGeneratingQuestions ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4"/>}
                      {isGeneratingQuestions ? 'Generating...' : 'Generate Questions (AI)'}
                    </Button>
                    <Button onClick={handleCreateSurvey} disabled={isCreatingSurvey || isGeneratingQuestions} variant="secondary"> {/* Use secondary variant */}
                      {isCreatingSurvey ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                      {isCreatingSurvey ? 'Creating...' : 'Create Draft'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Existing Surveys List */}
            <div>
              <h3 className="text-xl font-medium text-foreground mb-4">Your Surveys</h3> {/* Use text-foreground */}
              {surveys.length === 0 ? (
                <p className="text-muted-foreground text-center py-6">No surveys created yet.</p> // Use muted-foreground
              ) : (
                <div className="space-y-4">
                  {surveys.map((survey) => (
                    <Collapsible
                      key={survey.id}
                      // open={activeTab === survey.id} // Keep internal state for collapsibles?
                      // onOpenChange={() => setActiveTab(survey.id)} // Might conflict with main Tabs state
                    >
                       {/* Apply card styles, border, maybe hover/active states */}
                      <div className={`bg-card/50 p-4 border rounded-lg ${activeTab === survey.id ? 'border-secondary/50' : 'border-border'}`}> 
                        <CollapsibleTrigger asChild>
                           <div className="flex items-center gap-4 cursor-pointer">
                              {/* Status Indicator - Keep colors for now */}
                              <div className={`w-3 h-3 rounded-full flex-shrink-0 ${survey.status === 'Draft' ? 'bg-yellow-400' : survey.status === 'Sent' ? 'bg-blue-400' : 'bg-green-400'}`}></div>
                              <div className="flex-grow">
                                <h4 className="text-foreground font-medium">{survey.name}</h4> {/* Use foreground */}
                                <p className="text-sm text-muted-foreground capitalize">
                                  {survey.status}
                                </p>
                              </div>
                              {/* Icon color should follow text */}
                              <ChevronDown size={20} className="collapsible-chevron" /> 
                           </div>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                           {/* Use border variable */}
                          <div className="pt-4 mt-4 border-t border-border space-y-3 text-sm">
                             <p><strong className="text-muted-foreground">Status:</strong> {survey.status}</p>
                          </div>
                        </CollapsibleContent>
                      </div>
                    </Collapsible>
                  ))}
                </div>
              )}
            </div>
          </div>
        </TabsContent>

        {/* --- Results Tab --- */}
        <TabsContent value="results">
           {/* Use card variables */}
          <div className="bg-card text-card-foreground p-6 md:p-8 rounded-xl">
            <h2 className="text-2xl font-orbitron font-bold text-foreground mb-6">Survey Results</h2>
            <p className="text-muted-foreground text-center py-10">Survey results display will be implemented here.</p>
          </div>
        </TabsContent>

        {/* --- Deep Research Tab --- */}
        <TabsContent value="research">
          {renderDeepResearch()}
        </TabsContent>

      </Tabs>
    </div>
  );
} 