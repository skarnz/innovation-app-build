import { useState, useEffect, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, MessageSquare, Check, Circle, Sparkles, Star, Search, Plus, RefreshCw, X, ThumbsUp } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AiAgent from '@/components/AiAgent';
import { useProductType } from '@/contexts/ProductTypeContext';

const ProjectIdeation = () => {
  const [activeTab, setActiveTab] = useState('Problem');
  const location = useLocation();
  const navigate = useNavigate();
  const { productType } = useProductType();
  
  // Idea Discovery States
  const [initialIdea, setInitialIdea] = useState('');
  const [ideaType, setIdeaType] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedIdeas, setGeneratedIdeas] = useState<string[]>([]);
  const [savedIdeas, setSavedIdeas] = useState<string[]>([]);
  const [notes, setNotes] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showDiscovery, setShowDiscovery] = useState(false);

  // Ideation states for the checklist
  const checklistItems = [
    { 
      id: 'problem', 
      label: 'Problem description', 
      status: 'incomplete',
      meta: '(0/100 characters)'
    },
    { 
      id: 'solution', 
      label: 'Solution description', 
      status: 'incomplete',
      meta: '(0/100 characters)'
    },
    { 
      id: 'market', 
      label: 'Market size analysis', 
      status: 'incomplete',
      meta: '(TAM, SAM, and SOM required)'
    },
    { 
      id: 'competitor', 
      label: 'Competitor analysis', 
      status: 'incomplete',
      meta: '(0/3 competitors)'
    }
  ];
  
  useEffect(() => {
    // If we have idea data from the home page, show the discovery UI
    if (location.state && (location.state.idea || location.state.type)) {
      if (location.state.idea) {
        setInitialIdea(location.state.idea);
      }
      if (location.state.type) {
        setIdeaType(location.state.type);
      }
      setShowDiscovery(true);
    }
  }, [location.state]);
  
  // Wrap handleGenerateIdeas in useCallback
  const handleGenerateIdeas = useCallback(() => {
    if (!initialIdea.trim()) return;
    
    setIsGenerating(true);
    setGeneratedIdeas([]);
    
    // Simulate AI generation with a delay
    setTimeout(() => {
      let ideas: string[] = [];
      
      if (ideaType === 'have-idea') {
        // Generate variations of the user's idea
        ideas = [
          `${initialIdea} with subscription-based revenue model`,
          `${initialIdea} targeted at enterprise customers`,
          `Mobile app version of ${initialIdea}`,
          `${initialIdea} with AI-powered features`,
          `${initialIdea} as a marketplace platform`,
          `${initialIdea} with gamification elements`
        ];
      } else {
        // Generate ideas based on user's interests
        ideas = [
          `AI-powered personal assistant for ${initialIdea} enthusiasts`,
          `Subscription box service for ${initialIdea} products`,
          `Social platform for connecting ${initialIdea} experts with beginners`,
          `On-demand marketplace for ${initialIdea} services`,
          `Educational platform teaching ${initialIdea} skills`,
          `Analytics dashboard for tracking ${initialIdea} metrics`
        ];
      }
      
      setGeneratedIdeas(ideas);
      setIsGenerating(false);
    }, 2000);
  }, [initialIdea, ideaType]);
  
  // Generate ideas based on the initial input
  useEffect(() => {
    if (initialIdea && !generatedIdeas.length && showDiscovery) {
      handleGenerateIdeas();
    }
  }, [initialIdea, generatedIdeas.length, showDiscovery, handleGenerateIdeas]);
  
  const handleSaveIdea = (idea: string) => {
    if (!savedIdeas.includes(idea)) {
      setSavedIdeas([...savedIdeas, idea]);
    }
  };
  
  const handleRemoveSavedIdea = (ideaToRemove: string) => {
    setSavedIdeas(savedIdeas.filter(idea => idea !== ideaToRemove));
  };
  
  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    setSearchResults([]);
    
    // Simulate search API with a delay
    setTimeout(() => {
      // Fake search results
      const results = [
        `Recent Reddit discussions show growing interest in ${searchQuery}`,
        `Google Trends data indicates a 34% increase in searches for ${searchQuery} over the past 6 months`,
        `Top competitors in the ${searchQuery} space include CompanyX, CompanyY, and CompanyZ`,
        `Common pain points mentioned in Quora: complexity, high cost, and poor user experience`,
        `Market size for ${searchQuery} estimated at $2.4B with 12% annual growth rate`
      ];
      
      setSearchResults(results);
      setIsSearching(false);
    }, 1500);
  };

  const toggleView = () => {
    setShowDiscovery(!showDiscovery);
  };
  
  return (
    <div className="min-h-screen bg-navy pb-20">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-white/60 mb-4">
            <Link to="/dashboard" className="hover:text-white flex items-center gap-1">
              <ArrowLeft size={16} />
              Back to Dashboard
            </Link>
            <span>/</span>
            <span>{showDiscovery ? "Idea Discovery" : "Ideation"}</span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-orbitron font-bold text-electric-blue mb-2">
            {showDiscovery ? "Idea Discovery" : "Ideation Phase"}
          </h1>
          <p className="text-white/70">
            {showDiscovery 
              ? "Explore, refine, and save your best ideas. Use AI to generate variations or research external data."
              : "Explore and validate your project ideas. Focus on identifying problems and potential solutions."}
          </p>
        </div>
        
        <div className="mb-8">
          <Button 
            variant="outline" 
            className="flex items-center gap-2 bg-electric-blue/10 border-electric-blue/30 text-electric-blue hover:bg-electric-blue/20"
            onClick={toggleView}
          >
            <MessageSquare size={18} />
            Switch to {showDiscovery ? "Ideation" : "Idea Discovery"}
          </Button>
        </div>

        {showDiscovery ? (
          // Idea Discovery View
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Initial Idea Input */}
              <div className="glass-card p-6">
                <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <Sparkles size={20} className="text-electric-blue" />
                  {ideaType === 'have-idea' ? 'Your Initial Idea' : 'Generate Ideas Based On'}
                </h2>
                
                <div className="mb-6">
                  <Textarea
                    value={initialIdea}
                    onChange={(e) => setInitialIdea(e.target.value)}
                    placeholder={ideaType === 'have-idea' 
                      ? "Describe your idea in detail..." 
                      : "What are you interested in?"}
                    className="min-h-[100px] bg-navy-light/50 text-white placeholder-white/40 border-white/20 focus:border-electric-blue"
                  />
                </div>
                
                <div className="flex justify-end">
                  <Button
                    onClick={handleGenerateIdeas}
                    disabled={!initialIdea.trim() || isGenerating}
                    className="bg-electric-blue hover:bg-electric-blue/90 flex items-center gap-2"
                  >
                    {isGenerating ? (
                      <>
                        <RefreshCw size={16} className="animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Sparkles size={16} />
                        {generatedIdeas.length > 0 ? 'Regenerate Ideas' : 'Generate Ideas'}
                      </>
                    )}
                  </Button>
                </div>
              </div>
              
              {/* Generated Ideas */}
              {generatedIdeas.length > 0 && (
                <div className="glass-card p-6">
                  <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                    <Sparkles size={20} className="text-electric-purple" />
                    Generated Ideas
                  </h2>
                  
                  <div className="space-y-3">
                    {generatedIdeas.map((idea, index) => (
                      <div 
                        key={index}
                        className="glass-card p-4 flex items-start justify-between gap-3 hover:border-electric-blue/30 transition-all duration-300"
                      >
                        <p className="text-white/90 flex-grow">{idea}</p>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-white/40 hover:text-electric-blue hover:bg-transparent"
                          onClick={() => handleSaveIdea(idea)}
                          title="Save this idea"
                        >
                          <Star size={18} />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* AI Agent Scraper */}
              <div className="glass-card p-6">
                <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <Search size={20} className="text-electric-blue" />
                  Research External Data
                </h2>
                
                <p className="text-white/70 mb-4">
                  Search for trends, market data, and user discussions from Reddit, Quora, Google Trends, and more.
                </p>
                
                <div className="flex gap-2 mb-6">
                  <Input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="e.g., market trends for productivity apps"
                    className="bg-navy-light/50 text-white placeholder-white/40 border-white/20 focus:border-electric-blue"
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  />
                  <Button
                    onClick={handleSearch}
                    disabled={!searchQuery.trim() || isSearching}
                    className="bg-electric-purple hover:bg-electric-purple/90"
                  >
                    {isSearching ? (
                      <RefreshCw size={16} className="animate-spin" />
                    ) : (
                      <Search size={16} />
                    )}
                  </Button>
                </div>
                
                {searchResults.length > 0 && (
                  <div className="space-y-3 mb-4">
                    {searchResults.map((result, index) => (
                      <div 
                        key={index}
                        className="glass-card p-4 flex items-start justify-between gap-3 hover:border-electric-purple/30 transition-all duration-300"
                      >
                        <p className="text-white/90 flex-grow">{result}</p>
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-white/40 hover:text-electric-blue hover:bg-transparent"
                            onClick={() => handleSaveIdea(result)}
                            title="Save as idea"
                          >
                            <Plus size={16} />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                
                <div className="mt-4">
                  <Button
                    variant="outline"
                    className="w-full border-electric-purple/30 text-electric-purple hover:bg-electric-purple/10"
                  >
                    <MessageSquare size={16} className="mr-2" />
                    Open AI Research Assistant
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Right Column - Saved Ideas */}
            <div className="space-y-6">
              <div className="glass-card p-6">
                <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <Star size={20} className="text-yellow-400" />
                  Saved Ideas
                </h2>
                
                {savedIdeas.length > 0 ? (
                  <div className="space-y-3">
                    {savedIdeas.map((idea, index) => (
                      <div 
                        key={index}
                        className="glass-card p-4 relative group"
                      >
                        <button 
                          className="absolute top-2 right-2 text-white/40 hover:text-white group-hover:opacity-100 opacity-0 transition-opacity"
                          onClick={() => handleRemoveSavedIdea(idea)}
                        >
                          <X size={16} />
                        </button>
                        <p className="text-white/90">{idea}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="glass-card p-4 text-center">
                    <p className="text-white/60">
                      No ideas saved yet. Generate ideas or search for external data, then save the ones you like.
                    </p>
                  </div>
                )}
              </div>
              
              {/* Notes */}
              <div className="glass-card p-6">
                <h2 className="text-xl font-semibold text-white mb-4">Notes</h2>
                
                <Textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add your thoughts and notes here..."
                  className="min-h-[150px] bg-navy-light/50 text-white placeholder-white/40 border-white/20 focus:border-electric-blue mb-4"
                />
                
                <div className="flex justify-between">
                  <Button
                    variant="outline"
                    className="border-white/20 text-white"
                  >
                    Save Notes
                  </Button>
                  
                  <Link to="/project/validate">
                    <Button 
                      className="bg-electric-purple hover:bg-electric-purple/90 flex items-center gap-2"
                      disabled={savedIdeas.length === 0}
                    >
                      Next: Validation
                      <ArrowLeft size={16} className="rotate-180" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Ideation View
          <div>
            <div className="glass-card p-6 mb-8">
              <div className="flex items-center gap-2 mb-6">
                <Check size={24} className="text-electric-blue" />
                <h2 className="text-xl font-orbitron font-semibold text-white">Checklist</h2>
              </div>
              
              <div className="space-y-4">
                {checklistItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <div className="rounded-full w-6 h-6 flex items-center justify-center border border-white/30">
                      <Circle size={14} className="text-white/40" />
                    </div>
                    <div className="flex-grow">
                      <span className="text-white">
                        {item.label} <span className="text-white/50 text-sm">{item.meta}</span>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              
              <Separator className="my-8 bg-white/10" />
            </div>
            
            <div className="mb-8">
              <div className="flex mb-6 bg-navy-light rounded-lg p-1">
                {['Problem', 'Market Analysis', 'Competitors'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-6 py-3 rounded-md text-sm font-medium transition-colors ${
                      activeTab === tab 
                        ? 'bg-electric-blue text-white' 
                        : 'bg-transparent text-white/60 hover:text-white'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              
              {activeTab === 'Problem' && (
                <div className="glass-card p-6">
                  <h3 className="text-lg font-medium text-white mb-4">Describe the problem</h3>
                  <Textarea 
                    placeholder="What problem are you trying to solve?" 
                    className="min-h-32 bg-navy-light text-white placeholder:text-white/40 border-white/20 focus:border-electric-blue"
                  />
                  
                  <h3 className="text-lg font-medium text-white mt-8 mb-4">Describe the solution</h3>
                  <Textarea 
                    placeholder="Describe your proposed solution" 
                    className="min-h-32 bg-navy-light text-white placeholder:text-white/40 border-white/20 focus:border-electric-blue"
                  />
                  
                  <div className="mt-6 flex justify-end">
                    <Button className="bg-electric-blue hover:bg-electric-blue/90">
                      Save & Continue
                    </Button>
                  </div>
                </div>
              )}
              
              {activeTab === 'Market Analysis' && (
                <div className="glass-card p-6">
                  <h3 className="text-lg font-medium text-white mb-4">Market size analysis</h3>
                  <p className="text-white/60 mb-6">
                    Define your TAM (Total Addressable Market), SAM (Serviceable Addressable Market), and SOM (Serviceable Obtainable Market).
                  </p>
                  
                  <Textarea 
                    placeholder="Describe your market analysis..." 
                    className="min-h-32 bg-navy-light text-white placeholder:text-white/40 border-white/20 focus:border-electric-blue"
                  />
                  
                  <div className="mt-6 flex justify-end">
                    <Button className="bg-electric-blue hover:bg-electric-blue/90">
                      Save & Continue
                    </Button>
                  </div>
                </div>
              )}
              
              {activeTab === 'Competitors' && (
                <div className="glass-card p-6">
                  <h3 className="text-lg font-medium text-white mb-4">Competitor analysis</h3>
                  <p className="text-white/60 mb-6">
                    Identify at least 3 competitors and analyze their strengths and weaknesses.
                  </p>
                  
                  <Textarea 
                    placeholder="List your competitors and analyze them..." 
                    className="min-h-32 bg-navy-light text-white placeholder:text-white/40 border-white/20 focus:border-electric-blue"
                  />
                  
                  <div className="mt-6 flex justify-end">
                    <Button className="bg-electric-blue hover:bg-electric-blue/90">
                      Save & Continue
                    </Button>
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-between">
              <Link to="/dashboard">
                <Button variant="outline" className="flex items-center gap-2">
                  <ArrowLeft size={16} />
                  Back to Dashboard
                </Button>
              </Link>
              <Link to="/project/validate">
                <Button className="bg-electric-purple hover:bg-electric-purple/90 flex items-center gap-2">
                  Next: Validation
                  <ArrowLeft size={16} className="rotate-180" />
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
      
      <AiAgent />
    </div>
  );
};

export default ProjectIdeation;
