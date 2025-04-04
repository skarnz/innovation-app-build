
import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, BarChart2, Check, ChevronDown, ChevronUp, Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import AiAgent from '@/components/AiAgent';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type DataPartner = {
  id: string;
  name: string;
  icon: string;
  description: string;
  active: boolean;
};

type Survey = {
  id: string;
  title: string;
  description: string;
  targetAudience: string;
  questions: string[];
  responses: number;
  status: 'draft' | 'live' | 'completed';
};

const ProjectValidation = () => {
  const [activeTab, setActiveTab] = useState('partners');
  const [dataPartners, setDataPartners] = useState<DataPartner[]>([
    { 
      id: 'pollfish', 
      name: 'Pollfish', 
      icon: '🔍', 
      description: 'Instant mobile surveys',
      active: false
    },
    { 
      id: 'prolific', 
      name: 'Prolific', 
      icon: '👥', 
      description: 'Diverse participant pool',
      active: false
    },
    { 
      id: 'typeform', 
      name: 'Typeform', 
      icon: '📝', 
      description: 'Interactive, user-friendly forms',
      active: false
    },
    { 
      id: 'exa', 
      name: 'exa.ai', 
      icon: '🔮', 
      description: 'Advanced business datasets',
      active: false
    },
    { 
      id: 'perplexity', 
      name: 'Perplexity', 
      icon: '🧠', 
      description: 'AI research aggregator',
      active: false
    },
    { 
      id: 'mintel', 
      name: 'Mintel', 
      icon: '📊', 
      description: 'Market intelligence & consumer data',
      active: false
    }
  ]);
  
  const [surveys, setSurveys] = useState<Survey[]>([
    {
      id: '1',
      title: 'Initial Product Validation',
      description: 'Testing the viability of our product concept with potential users',
      targetAudience: 'Tech-savvy professionals, 25-45 years old',
      questions: [
        'How likely are you to use this product?',
        'What problem would this product solve for you?',
        'How much would you pay for this solution?'
      ],
      responses: 28,
      status: 'live'
    }
  ]);
  
  const [newSurvey, setNewSurvey] = useState({
    title: '',
    description: '',
    targetAudience: '',
    questionText: '',
    questions: [] as string[]
  });
  
  const [showNewSurveyForm, setShowNewSurveyForm] = useState(false);
  const [researchQuery, setResearchQuery] = useState('');
  const [researchResults, setResearchResults] = useState<string[]>([]);
  const [activeSurvey, setActiveSurvey] = useState<string | null>(null);
  const [showAiResearch, setShowAiResearch] = useState(false);
  
  const carouselRef = useRef<HTMLDivElement>(null);
  const selectedPartnersRef = useRef<HTMLDivElement>(null);
  
  const handlePartnerToggle = (id: string) => {
    setDataPartners(partners => 
      partners.map(partner => 
        partner.id === id 
          ? { ...partner, active: !partner.active } 
          : partner
      )
    );
  };
  
  const handleAddQuestion = () => {
    if (newSurvey.questionText.trim()) {
      setNewSurvey({
        ...newSurvey,
        questions: [...newSurvey.questions, newSurvey.questionText],
        questionText: ''
      });
    }
  };
  
  const handleRemoveQuestion = (index: number) => {
    setNewSurvey({
      ...newSurvey,
      questions: newSurvey.questions.filter((_, i) => i !== index)
    });
  };
  
  const handleCreateSurvey = () => {
    if (newSurvey.title && newSurvey.questions.length > 0) {
      const survey: Survey = {
        id: `survey-${Date.now()}`,
        title: newSurvey.title,
        description: newSurvey.description,
        targetAudience: newSurvey.targetAudience,
        questions: newSurvey.questions,
        responses: 0,
        status: 'draft'
      };
      
      setSurveys([...surveys, survey]);
      setNewSurvey({
        title: '',
        description: '',
        targetAudience: '',
        questionText: '',
        questions: []
      });
      setShowNewSurveyForm(false);
    }
  };
  
  const handleSubmitResearch = () => {
    if (researchQuery.trim()) {
      // Simulate API call for research results
      setTimeout(() => {
        const fakeResults = [
          `Found 8 relevant Reddit discussions about "${researchQuery}"`,
          `Market data shows a 24% growth in related sectors`,
          `Competitors in this space include: Company A, Company B, and Company C`,
          `Common user pain points: complexity, high cost, and lack of integration`
        ];
        setResearchResults(fakeResults);
      }, 1500);
    }
  };
  
  const handleLaunchSurvey = (surveyId: string) => {
    setSurveys(surveys.map(survey => 
      survey.id === surveyId 
        ? { ...survey, status: 'live' } 
        : survey
    ));
  };
  
  const getActivePartners = () => {
    return dataPartners.filter(partner => partner.active);
  };
  
  const scrollCarousel = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };
  
  const toggleSurveyDetails = (surveyId: string) => {
    setActiveSurvey(activeSurvey === surveyId ? null : surveyId);
  };
  
  useEffect(() => {
    // Automatically scroll to selected partners when one is added or removed
    if (getActivePartners().length > 0 && selectedPartnersRef.current) {
      selectedPartnersRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [dataPartners]);
  
  return (
    <div className="min-h-screen bg-navy pb-20">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <div className="flex items-center gap-2 text-white/60 mb-4">
            <Link to="/dashboard" className="hover:text-white flex items-center gap-1">
              <ArrowLeft size={16} />
              Back to Project
            </Link>
            <span>/</span>
            <span>Validation</span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-orbitron font-bold text-electric-purple mb-2">
            Validation Phase
          </h1>
          <p className="text-white/70 mb-8">
            Test and validate your ideas with real users and market data to refine your concept.
          </p>
          
          {/* Navigation Tabs */}
          <div className="flex mb-8 bg-navy-light rounded-lg p-1 overflow-x-auto">
            {[
              { id: 'partners', label: 'Data Partners' },
              { id: 'surveys', label: 'Surveys' },
              { id: 'results', label: 'Results' },
              { id: 'research', label: 'Deep Research' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
                  activeTab === tab.id 
                    ? 'bg-electric-purple text-white' 
                    : 'bg-transparent text-white/60 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
        
        {/* Data Partners Tab */}
        {activeTab === 'partners' && (
          <div className="space-y-8">
            <div className="glass-card p-8">
              <h2 className="text-2xl font-orbitron font-bold text-white mb-6">Select Data Partners</h2>
              
              {/* Partner Carousel */}
              <div className="relative mb-8">
                <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="bg-navy-light border-white/10 text-white rounded-full"
                    onClick={() => scrollCarousel('left')}
                  >
                    <ChevronLeft size={18} />
                  </Button>
                </div>
                
                <div 
                  ref={carouselRef}
                  className="flex gap-4 overflow-x-auto py-4 px-10 scrollbar-hide"
                >
                  {dataPartners.map((partner) => (
                    <div 
                      key={partner.id} 
                      className={`flex-shrink-0 w-48 h-48 glass-card p-4 flex flex-col items-center justify-center gap-3 cursor-pointer transition-all ${
                        partner.active 
                          ? 'border-2 border-electric-purple shadow-glow-purple' 
                          : 'border border-white/10 hover:border-white/30'
                      }`}
                      onClick={() => handlePartnerToggle(partner.id)}
                    >
                      <div className="text-4xl">{partner.icon}</div>
                      <h3 className="text-white font-medium text-center">{partner.name}</h3>
                      <p className="text-white/60 text-sm text-center">{partner.description}</p>
                    </div>
                  ))}
                </div>
                
                <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="bg-navy-light border-white/10 text-white rounded-full"
                    onClick={() => scrollCarousel('right')}
                  >
                    <ChevronRight size={18} />
                  </Button>
                </div>
              </div>
              
              {/* Selected Partners */}
              <div ref={selectedPartnersRef}>
                <h3 className="text-xl font-medium text-white mb-4">Your Validation Stack</h3>
                
                {getActivePartners().length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {getActivePartners().map((partner) => (
                      <div 
                        key={partner.id}
                        className="glass-card p-4 flex items-center gap-3 relative group"
                      >
                        <div className="text-2xl">{partner.icon}</div>
                        <div>
                          <h4 className="text-white font-medium">{partner.name}</h4>
                          <p className="text-white/60 text-sm">{partner.description}</p>
                        </div>
                        <button 
                          className="absolute top-2 right-2 text-white/40 hover:text-white"
                          onClick={() => handlePartnerToggle(partner.id)}
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="glass-card p-8 text-center">
                    <p className="text-white/60">
                      No data partners selected. Click on the partners above to add them to your validation stack.
                    </p>
                  </div>
                )}
              </div>
              
              <div className="mt-8 flex justify-end">
                <Button 
                  className="bg-electric-purple hover:bg-electric-purple/90 flex items-center gap-2"
                  onClick={() => setActiveTab('surveys')}
                >
                  Next: Create Surveys
                  <ArrowRight size={16} />
                </Button>
              </div>
            </div>
          </div>
        )}
        
        {/* Surveys Tab */}
        {activeTab === 'surveys' && (
          <div className="space-y-8">
            <div className="glass-card p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-orbitron font-bold text-white">Survey Manager</h2>
                
                <Button 
                  className="bg-electric-purple hover:bg-electric-purple/90 flex items-center gap-2"
                  onClick={() => setShowNewSurveyForm(!showNewSurveyForm)}
                >
                  {showNewSurveyForm ? 'Cancel' : 'Create New Survey'}
                  {!showNewSurveyForm && <Plus size={16} />}
                </Button>
              </div>
              
              {/* New Survey Form */}
              {showNewSurveyForm && (
                <div className="glass-card p-6 mb-8 border border-electric-purple/30">
                  <h3 className="text-xl font-medium text-white mb-4">Create a New Survey</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="survey-title" className="block text-white/80 mb-1">Survey Title</label>
                      <Input
                        id="survey-title"
                        value={newSurvey.title}
                        onChange={(e) => setNewSurvey({...newSurvey, title: e.target.value})}
                        className="bg-navy-light border-white/20 text-white"
                        placeholder="e.g., Product Feature Validation"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="survey-desc" className="block text-white/80 mb-1">Description</label>
                      <Textarea
                        id="survey-desc"
                        value={newSurvey.description}
                        onChange={(e) => setNewSurvey({...newSurvey, description: e.target.value})}
                        className="bg-navy-light border-white/20 text-white min-h-20"
                        placeholder="What is the purpose of this survey?"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="target-audience" className="block text-white/80 mb-1">Target Audience</label>
                      <Input
                        id="target-audience"
                        value={newSurvey.targetAudience}
                        onChange={(e) => setNewSurvey({...newSurvey, targetAudience: e.target.value})}
                        className="bg-navy-light border-white/20 text-white"
                        placeholder="e.g., Professionals, 25-45 years old"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-white/80 mb-1">Questions</label>
                      
                      <div className="space-y-2 mb-4">
                        {newSurvey.questions.map((question, index) => (
                          <div key={index} className="flex items-center gap-2 bg-navy-light/50 p-3 rounded-md">
                            <span className="text-white/80 flex-grow">{question}</span>
                            <button 
                              className="text-white/40 hover:text-white"
                              onClick={() => handleRemoveQuestion(index)}
                            >
                              <X size={16} />
                            </button>
                          </div>
                        ))}
                      </div>
                      
                      <div className="flex gap-2">
                        <Input
                          value={newSurvey.questionText}
                          onChange={(e) => setNewSurvey({...newSurvey, questionText: e.target.value})}
                          className="bg-navy-light border-white/20 text-white flex-grow"
                          placeholder="Enter a new question..."
                          onKeyDown={(e) => e.key === 'Enter' && handleAddQuestion()}
                        />
                        <Button 
                          variant="outline"
                          className="border-white/20 text-white"
                          onClick={handleAddQuestion}
                        >
                          Add
                        </Button>
                      </div>
                    </div>
                    
                    <div className="pt-4 flex justify-end">
                      <Button 
                        className="bg-electric-purple hover:bg-electric-purple/90"
                        onClick={handleCreateSurvey}
                        disabled={!newSurvey.title || newSurvey.questions.length === 0}
                      >
                        Create Survey
                      </Button>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Survey List */}
              {surveys.length > 0 ? (
                <div className="space-y-4">
                  {surveys.map((survey) => (
                    <Collapsible 
                      key={survey.id}
                      open={activeSurvey === survey.id}
                      onOpenChange={() => toggleSurveyDetails(survey.id)}
                    >
                      <div 
                        className={`glass-card p-4 border ${
                          activeSurvey === survey.id
                            ? 'border-electric-purple/50'
                            : 'border-white/10'
                        }`}
                      >
                        <CollapsibleTrigger asChild>
                          <div className="flex items-center gap-4 cursor-pointer">
                            <div className={`w-3 h-3 rounded-full ${
                              survey.status === 'draft' ? 'bg-yellow-400' :
                              survey.status === 'live' ? 'bg-green-400' :
                              'bg-blue-400'
                            }`}></div>
                            
                            <div className="flex-grow">
                              <h3 className="text-white font-medium">{survey.title}</h3>
                              <p className="text-white/60 text-sm">
                                {survey.status === 'draft' ? 'Draft' :
                                 survey.status === 'live' ? 'Live' : 'Completed'} 
                                 {survey.responses > 0 ? ` • ${survey.responses} responses` : ''}
                              </p>
                            </div>
                            
                            <div>
                              {activeSurvey === survey.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                            </div>
                          </div>
                        </CollapsibleTrigger>
                        
                        <CollapsibleContent>
                          <div className="pt-4 mt-4 border-t border-white/10">
                            <div className="space-y-4">
                              <div>
                                <h4 className="text-white/80 font-medium mb-1">Description</h4>
                                <p className="text-white/70">{survey.description}</p>
                              </div>
                              
                              <div>
                                <h4 className="text-white/80 font-medium mb-1">Target Audience</h4>
                                <p className="text-white/70">{survey.targetAudience}</p>
                              </div>
                              
                              <div>
                                <h4 className="text-white/80 font-medium mb-2">Questions</h4>
                                <div className="space-y-2">
                                  {survey.questions.map((question, index) => (
                                    <div key={index} className="bg-navy-light/50 p-3 rounded-md">
                                      <p className="text-white/80">{question}</p>
                                    </div>
                                  ))}
                                </div>
                              </div>
                              
                              {survey.status === 'draft' && (
                                <div className="pt-2 flex justify-end">
                                  <Button 
                                    className="bg-green-500 hover:bg-green-600"
                                    onClick={() => handleLaunchSurvey(survey.id)}
                                  >
                                    Launch Survey
                                  </Button>
                                </div>
                              )}
                            </div>
                          </div>
                        </CollapsibleContent>
                      </div>
                    </Collapsible>
                  ))}
                </div>
              ) : (
                <div className="glass-card p-8 text-center">
                  <p className="text-white/60">
                    No surveys created yet. Click "Create New Survey" to get started.
                  </p>
                </div>
              )}
              
              <div className="mt-8 flex justify-between">
                <Button 
                  variant="outline"
                  className="border-white/20 text-white"
                  onClick={() => setActiveTab('partners')}
                >
                  Back to Partners
                </Button>
                
                <Button 
                  className="bg-electric-purple hover:bg-electric-purple/90 flex items-center gap-2"
                  onClick={() => setActiveTab('results')}
                >
                  Next: View Results
                  <ArrowRight size={16} />
                </Button>
              </div>
            </div>
          </div>
        )}
        
        {/* Results Tab */}
        {activeTab === 'results' && (
          <div className="space-y-8">
            <div className="glass-card p-8">
              <h2 className="text-2xl font-orbitron font-bold text-white mb-6">Survey Results</h2>
              
              {/* Survey Selector */}
              <div className="mb-8">
                <label htmlFor="survey-select" className="block text-white/80 mb-2">Select Survey</label>
                <Select defaultValue={surveys[0]?.id}>
                  <SelectTrigger className="w-full md:w-80 bg-navy-light border-white/20 text-white">
                    <SelectValue placeholder="Select a survey" />
                  </SelectTrigger>
                  <SelectContent className="bg-navy-light border-white/20 text-white">
                    {surveys.map((survey) => (
                      <SelectItem key={survey.id} value={survey.id}>{survey.title}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {/* Stats Overview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="glass-card p-6 flex flex-col items-center justify-center">
                  <h3 className="text-white/80 text-sm mb-1">Total Responses</h3>
                  <p className="text-3xl font-bold text-electric-purple">28</p>
                </div>
                
                <div className="glass-card p-6 flex flex-col items-center justify-center">
                  <h3 className="text-white/80 text-sm mb-1">Completion Rate</h3>
                  <p className="text-3xl font-bold text-electric-blue">92%</p>
                </div>
                
                <div className="glass-card p-6 flex flex-col items-center justify-center">
                  <h3 className="text-white/80 text-sm mb-1">Avg. Time to Complete</h3>
                  <p className="text-3xl font-bold text-green-500">3m 42s</p>
                </div>
              </div>
              
              {/* Mock Results Visualization */}
              <div className="mb-8">
                <h3 className="text-xl font-medium text-white mb-4">Response Breakdown</h3>
                
                <div className="glass-card p-6 mb-4">
                  <h4 className="text-white/80 font-medium mb-4">How likely are you to use this product?</h4>
                  
                  <div className="space-y-3">
                    {[
                      { label: 'Very Likely', percentage: 45, color: 'bg-green-500' },
                      { label: 'Somewhat Likely', percentage: 32, color: 'bg-blue-500' },
                      { label: 'Neutral', percentage: 15, color: 'bg-yellow-500' },
                      { label: 'Somewhat Unlikely', percentage: 5, color: 'bg-orange-500' },
                      { label: 'Very Unlikely', percentage: 3, color: 'bg-red-500' }
                    ].map((item, index) => (
                      <div key={index} className="space-y-1">
                        <div className="flex justify-between">
                          <span className="text-white/80">{item.label}</span>
                          <span className="text-white/80">{item.percentage}%</span>
                        </div>
                        <div className="w-full bg-navy-light/50 h-2 rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${item.color}`} 
                            style={{ width: `${item.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="glass-card p-6">
                  <h4 className="text-white/80 font-medium mb-4">What problem would this product solve for you?</h4>
                  
                  {/* Word Cloud Simulation */}
                  <div className="h-40 flex flex-wrap justify-center items-center gap-4 mb-4">
                    {[
                      { text: 'Time Management', size: 'text-2xl', color: 'text-electric-blue' },
                      { text: 'Productivity', size: 'text-3xl', color: 'text-electric-purple' },
                      { text: 'Organization', size: 'text-xl', color: 'text-green-400' },
                      { text: 'Collaboration', size: 'text-2xl', color: 'text-blue-400' },
                      { text: 'Communication', size: 'text-lg', color: 'text-pink-400' },
                      { text: 'Workflow', size: 'text-xl', color: 'text-yellow-400' },
                      { text: 'Integration', size: 'text-base', color: 'text-indigo-400' },
                      { text: 'Automation', size: 'text-2xl', color: 'text-cyan-400' },
                      { text: 'Data Analysis', size: 'text-lg', color: 'text-red-400' },
                    ].map((word, index) => (
                      <div 
                        key={index} 
                        className={`${word.size} ${word.color} font-medium`}
                      >
                        {word.text}
                      </div>
                    ))}
                  </div>
                  
                  <div className="text-white/60 text-sm text-center">
                    Word cloud based on 28 responses
                  </div>
                </div>
              </div>
              
              <div className="mt-8 flex justify-between">
                <Button 
                  variant="outline"
                  className="border-white/20 text-white"
                  onClick={() => setActiveTab('surveys')}
                >
                  Back to Surveys
                </Button>
                
                <Button 
                  className="bg-electric-purple hover:bg-electric-purple/90 flex items-center gap-2"
                  onClick={() => setActiveTab('research')}
                >
                  Next: Deep Research
                  <ArrowRight size={16} />
                </Button>
              </div>
            </div>
          </div>
        )}
        
        {/* Deep Research Tab */}
        {activeTab === 'research' && (
          <div className="space-y-8">
            <div className="glass-card p-8">
              <h2 className="text-2xl font-orbitron font-bold text-white mb-6">Deep Research</h2>
              
              <div className="mb-8">
                <label htmlFor="research-query" className="block text-white/80 mb-2">Ask anything about your market, competitors, or trends</label>
                <div className="flex gap-2">
                  <Input
                    id="research-query"
                    value={researchQuery}
                    onChange={(e) => setResearchQuery(e.target.value)}
                    className="bg-navy-light border-white/20 text-white flex-grow"
                    placeholder="e.g., What are the top trends in my industry?"
                    onKeyDown={(e) => e.key === 'Enter' && handleSubmitResearch()}
                  />
                  <Button 
                    className="bg-electric-purple hover:bg-electric-purple/90"
                    onClick={handleSubmitResearch}
                  >
                    Research
                  </Button>
                </div>
                
                <div className="text-white/60 text-sm mt-2">
                  Powered by exa.ai, Perplexity, and Mintel
                </div>
              </div>
              
              {/* Research Results */}
              {researchResults.length > 0 ? (
                <div>
                  <h3 className="text-xl font-medium text-white mb-4">Research Findings</h3>
                  
                  <div className="space-y-4">
                    {researchResults.map((result, index) => (
                      <div key={index} className="glass-card p-4 hover:border-electric-purple/30 transition-all duration-300 hover:shadow-glow-purple">
                        <div className="flex justify-between items-start">
                          <div className="flex items-start gap-3">
                            <div className="min-w-8 h-8 flex items-center justify-center rounded-full bg-electric-purple/20 text-electric-purple">
                              {index === 0 ? '🔍' : index === 1 ? '📊' : index === 2 ? '🏢' : '💬'}
                            </div>
                            <p className="text-white/80">{result}</p>
                          </div>
                          <button 
                            className="text-white/40 hover:text-electric-purple"
                            title="Pin this insight"
                          >
                            <BookmarkIcon size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-8 text-center">
                    <Button 
                      variant="outline" 
                      className="border-electric-purple/30 text-electric-purple"
                      onClick={() => setShowAiResearch(true)}
                    >
                      Open AI Research Assistant
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="glass-card p-8 text-center">
                  <p className="text-white/60 mb-6">
                    Enter a research query to get advanced market insights and competitive analysis.
                  </p>
                  
                  <Button 
                    className="bg-electric-purple hover:bg-electric-purple/90"
                    onClick={() => setShowAiResearch(true)}
                  >
                    Open AI Research Assistant
                  </Button>
                </div>
              )}
              
              <div className="mt-8 flex justify-between">
                <Button 
                  variant="outline"
                  className="border-white/20 text-white"
                  onClick={() => setActiveTab('results')}
                >
                  Back to Results
                </Button>
                
                <Link to="/project/build">
                  <Button 
                    className="bg-electric-blue hover:bg-electric-blue/90 flex items-center gap-2"
                  >
                    Next: Prototyping
                    <ArrowRight size={16} />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* AI Research Assistant Popup */}
      {showAiResearch && (
        <div className="fixed inset-0 flex items-center justify-center bg-navy/80 backdrop-blur-sm z-50">
          <div className="glass-card w-full max-w-3xl max-h-[80vh] overflow-hidden flex flex-col relative">
            <div className="p-4 border-b border-white/10 flex justify-between items-center">
              <h3 className="text-xl font-medium text-white">AI Research Assistant</h3>
              <button 
                className="text-white/60 hover:text-white"
                onClick={() => setShowAiResearch(false)}
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 flex-grow overflow-y-auto">
              <div className="flex flex-col space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-electric-purple flex items-center justify-center">
                    <BotIcon size={16} className="text-white" />
                  </div>
                  <div className="glass-card p-3 max-w-[80%]">
                    <p className="text-white/90">
                      I can help you gather market insights, competitor analysis, and user sentiment. What would you like to research today?
                    </p>
                  </div>
                </div>
                
                {researchQuery && (
                  <>
                    <div className="flex items-start gap-4 justify-end">
                      <div className="glass-card p-3 max-w-[80%] bg-electric-purple/20">
                        <p className="text-white/90">{researchQuery}</p>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-electric-blue flex items-center justify-center">
                        <UserIcon size={16} className="text-white" />
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-electric-purple flex items-center justify-center">
                        <BotIcon size={16} className="text-white" />
                      </div>
                      <div className="glass-card p-3 max-w-[80%]">
                        <p className="text-white/90">
                          I've analyzed multiple sources including Reddit, industry reports, and competitor websites. Here's what I found:
                        </p>
                        <ul className="text-white/80 mt-2 space-y-2">
                          {researchResults.map((result, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <span>•</span>
                              <span>{result}</span>
                            </li>
                          ))}
                        </ul>
                        <p className="text-white/80 mt-4">
                          Would you like me to dive deeper into any specific aspect of this research?
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
            
            <div className="p-4 border-t border-white/10">
              <div className="flex gap-2">
                <Input
                  placeholder="Ask a follow-up question..."
                  className="bg-navy-light border-white/20 text-white flex-grow"
                />
                <Button className="bg-electric-purple hover:bg-electric-purple/90">
                  Send
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* AI Agent */}
      <AiAgent />
    </div>
  );
};

// Lucide icon components needed for this page
const ChevronRight = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    {...props}
  >
    <path d="m9 18 6-6-6-6"/>
  </svg>
);

const ChevronLeft = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    {...props}
  >
    <path d="m15 18-6-6 6-6"/>
  </svg>
);

const BookmarkIcon = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    {...props}
  >
    <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/>
  </svg>
);

const BotIcon = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    {...props}
  >
    <path d="M12 8V4H8"/>
    <rect width="16" height="12" x="4" y="8" rx="2"/>
    <path d="M2 14h2"/>
    <path d="M20 14h2"/>
    <path d="M15 13v2"/>
    <path d="M9 13v2"/>
  </svg>
);

const UserIcon = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    {...props}
  >
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);

export default ProjectValidation;
