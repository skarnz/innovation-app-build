
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Users, Plus, Trash2, Save, Download, Star, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AiAgent from '@/components/AiAgent';

type Competitor = {
  id: string;
  name: string;
  url: string;
  strengths: string;
  weaknesses: string;
  opportunitiesThreats: string;
  keyDifferentiators: string;
  rating: number;
};

const CompetitionAnalysis = () => {
  const [competitors, setCompetitors] = useState<Competitor[]>([
    {
      id: '1',
      name: 'Competitor 1',
      url: 'https://competitor1.com',
      strengths: 'Established brand presence, Large customer base',
      weaknesses: 'Outdated technology, Poor customer service',
      opportunitiesThreats: 'Expanding into new markets, Threatened by new technologies',
      keyDifferentiators: 'Premium pricing, Enterprise focus',
      rating: 4
    },
    {
      id: '2',
      name: 'Competitor 2',
      url: 'https://competitor2.com',
      strengths: 'Innovative features, Modern UI',
      weaknesses: 'Limited market reach, Less features',
      opportunitiesThreats: 'Growing rapidly, Vulnerable to larger competitors',
      keyDifferentiators: 'Budget-friendly option, Focus on small businesses',
      rating: 3
    }
  ]);
  
  const [selectedCompetitor, setSelectedCompetitor] = useState<Competitor | null>(null);
  
  const addCompetitor = () => {
    const newCompetitor: Competitor = {
      id: Date.now().toString(),
      name: 'New Competitor',
      url: '',
      strengths: '',
      weaknesses: '',
      opportunitiesThreats: '',
      keyDifferentiators: '',
      rating: 3
    };
    
    setCompetitors([...competitors, newCompetitor]);
    setSelectedCompetitor(newCompetitor);
  };
  
  const updateCompetitor = (field: keyof Competitor, value: string | number) => {
    if (!selectedCompetitor) return;
    
    const updatedCompetitor = {
      ...selectedCompetitor,
      [field]: value
    };
    
    setSelectedCompetitor(updatedCompetitor);
    setCompetitors(competitors.map(comp => 
      comp.id === updatedCompetitor.id ? updatedCompetitor : comp
    ));
  };
  
  const deleteCompetitor = (id: string) => {
    setCompetitors(competitors.filter(comp => comp.id !== id));
    if (selectedCompetitor?.id === id) {
      setSelectedCompetitor(null);
    }
  };
  
  return (
    <div className="min-h-screen bg-navy">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-white/60 mb-4">
            <Link to="/project/value-chain" className="hover:text-white flex items-center gap-1">
              <ArrowLeft size={16} />
              Back to Value Chain
            </Link>
            <span>/</span>
            <span>Competition Analysis</span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-orbitron font-bold text-electric-blue mb-2">
            Competition Analysis
          </h1>
          <p className="text-white/70">
            Analyze your competitors to understand your market position and identify opportunities.
          </p>
        </div>
        
        <div className="mb-6 flex justify-end gap-2">
          <Button variant="outline" className="gap-2">
            <Save size={16} />
            Save
          </Button>
          <Button variant="outline" className="gap-2">
            <Download size={16} />
            Export
          </Button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users size={20} className="text-electric-blue" />
                    <span>Competitors</span>
                  </div>
                  <Button size="sm" variant="outline" onClick={addCompetitor} className="h-8 gap-1">
                    <Plus size={14} />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Add Competitor</span>
                  </Button>
                </CardTitle>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-2">
                  {competitors.map(competitor => (
                    <div 
                      key={competitor.id}
                      className={`p-3 rounded-md cursor-pointer hover:bg-navy-light transition-colors flex justify-between items-center ${
                        selectedCompetitor?.id === competitor.id ? "bg-navy-light border border-electric-blue/30" : "bg-navy-dark"
                      }`}
                      onClick={() => setSelectedCompetitor(competitor)}
                    >
                      <div className="flex-grow">
                        <div className="font-medium">{competitor.name}</div>
                        <div className="text-sm text-white/60 truncate">
                          {competitor.url || 'No URL provided'}
                        </div>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteCompetitor(competitor.id);
                        }}
                        className="text-white/50 hover:text-red-400 p-1 h-auto"
                      >
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  ))}
                  
                  {competitors.length === 0 && (
                    <div className="text-center p-4 text-white/60">
                      <p>No competitors added yet.</p>
                      <Button onClick={addCompetitor} variant="outline" className="mt-2">
                        Add Competitor
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="lg:col-span-2">
            {selectedCompetitor ? (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <Input 
                      value={selectedCompetitor.name}
                      onChange={(e) => updateCompetitor('name', e.target.value)}
                      className="max-w-[250px] bg-navy-light/50 font-semibold"
                    />
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star 
                          key={star}
                          size={16}
                          className={`cursor-pointer ${
                            star <= selectedCompetitor.rating 
                              ? "text-yellow-400 fill-yellow-400" 
                              : "text-white/30"
                          }`}
                          onClick={() => updateCompetitor('rating', star)}
                        />
                      ))}
                    </div>
                  </CardTitle>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="url">Website URL</Label>
                      <Input 
                        id="url"
                        value={selectedCompetitor.url}
                        onChange={(e) => updateCompetitor('url', e.target.value)}
                        placeholder="https://competitor.com"
                        className="bg-navy-light/50"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="strengths">Strengths</Label>
                      <Textarea 
                        id="strengths"
                        value={selectedCompetitor.strengths}
                        onChange={(e) => updateCompetitor('strengths', e.target.value)}
                        placeholder="What are this competitor's strengths?"
                        className="min-h-[100px] bg-navy-light/50"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="weaknesses">Weaknesses</Label>
                      <Textarea 
                        id="weaknesses"
                        value={selectedCompetitor.weaknesses}
                        onChange={(e) => updateCompetitor('weaknesses', e.target.value)}
                        placeholder="What are this competitor's weaknesses?"
                        className="min-h-[100px] bg-navy-light/50"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="opportunities-threats">Opportunities & Threats</Label>
                      <Textarea 
                        id="opportunities-threats"
                        value={selectedCompetitor.opportunitiesThreats}
                        onChange={(e) => updateCompetitor('opportunitiesThreats', e.target.value)}
                        placeholder="What opportunities or threats does this competitor face?"
                        className="min-h-[100px] bg-navy-light/50"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="differentiators">Key Differentiators</Label>
                      <Textarea 
                        id="differentiators"
                        value={selectedCompetitor.keyDifferentiators}
                        onChange={(e) => updateCompetitor('keyDifferentiators', e.target.value)}
                        placeholder="What makes this competitor unique in the market?"
                        className="min-h-[100px] bg-navy-light/50"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="glass-card p-8 text-center">
                <Users size={48} className="mx-auto mb-4 text-white/40" />
                <h3 className="text-xl font-medium text-white mb-2">No Competitor Selected</h3>
                <p className="text-white/60 mb-6">
                  Select a competitor from the list or create a new one to get started.
                </p>
                <Button onClick={addCompetitor} className="bg-electric-blue hover:bg-electric-blue/90 flex items-center gap-2 mx-auto">
                  <Plus size={16} />
                  Add Competitor
                </Button>
              </div>
            )}
          </div>
        </div>
        
        <div className="mt-8 flex justify-between">
          <Button variant="outline" className="gap-2 border-transparent hover:border-white/20 hover:bg-transparent">
            <Link to="/project/value-chain" className="flex items-center gap-2">
              <ArrowLeft size={16} />
              Back to Value Chain
            </Link>
          </Button>
          
          <Button variant="outline" className="gap-2 border-transparent hover:border-white/20 hover:bg-transparent">
            <Link to="/project/market" className="flex items-center gap-2">
              Next: Market Analysis
              <ArrowRight size={16} />
            </Link>
          </Button>
        </div>
      </div>
      
      <AiAgent />
    </div>
  );
};

export default CompetitionAnalysis;
