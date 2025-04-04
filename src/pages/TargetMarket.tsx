
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Target, Users, ChevronRight, Filter, CheckCircle2, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AiAgent from '@/components/AiAgent';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const TargetMarket = () => {
  const [segments, setSegments] = useState([
    { 
      id: 1, 
      name: 'Primary Segment', 
      demographics: '', 
      psychographics: '', 
      behaviors: '', 
      needs: '',
      size: '',
      reachability: '',
      potential: 'high'
    }
  ]);
  
  const addSegment = () => {
    const newId = segments.length + 1;
    setSegments([
      ...segments,
      { 
        id: newId, 
        name: `Segment ${newId}`, 
        demographics: '', 
        psychographics: '', 
        behaviors: '', 
        needs: '',
        size: '',
        reachability: '',
        potential: 'medium'
      }
    ]);
  };
  
  const handleChange = (id: number, field: string, value: string) => {
    setSegments(segments.map(segment => 
      segment.id === id ? { ...segment, [field]: value } : segment
    ));
  };
  
  return (
    <div className="min-h-screen bg-navy">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-white/60 mb-4">
            <Link to="/project/validate" className="hover:text-white flex items-center gap-1">
              <ArrowLeft size={16} />
              Back to Validation
            </Link>
            <span>/</span>
            <span>Target Market</span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-orbitron font-bold text-electric-blue mb-2">
            Target Market Analysis
          </h1>
          <p className="text-white/70">
            Define and analyze your target market segments to better understand your audience and tailor your product.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users size={20} className="text-electric-blue" />
                  Target Market Segments
                </CardTitle>
              </CardHeader>
              
              <CardContent>
                <Tabs defaultValue="segments" className="w-full">
                  <TabsList className="mb-4">
                    <TabsTrigger value="segments">Segments</TabsTrigger>
                    <TabsTrigger value="analysis">Analysis & Insights</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="segments">
                    {segments.map((segment) => (
                      <div key={segment.id} className="mb-8 p-6 glass-card">
                        <div className="mb-4 flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <Target size={18} className="text-electric-blue" />
                            <Input 
                              value={segment.name}
                              onChange={(e) => handleChange(segment.id, 'name', e.target.value)}
                              className="max-w-[200px] bg-navy-light/50"
                            />
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-white/60">Potential:</span>
                            <select 
                              value={segment.potential}
                              onChange={(e) => handleChange(segment.id, 'potential', e.target.value)}
                              className="bg-navy-light/50 border border-white/20 rounded text-sm p-1"
                            >
                              <option value="high">High</option>
                              <option value="medium">Medium</option>
                              <option value="low">Low</option>
                            </select>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <Label htmlFor={`demographics-${segment.id}`}>Demographics</Label>
                            <Textarea 
                              id={`demographics-${segment.id}`}
                              placeholder="Age, gender, location, income, education..."
                              value={segment.demographics}
                              onChange={(e) => handleChange(segment.id, 'demographics', e.target.value)}
                              className="bg-navy-light/50 min-h-[100px]"
                            />
                          </div>
                          <div>
                            <Label htmlFor={`psychographics-${segment.id}`}>Psychographics</Label>
                            <Textarea 
                              id={`psychographics-${segment.id}`}
                              placeholder="Values, interests, attitudes, lifestyle..."
                              value={segment.psychographics}
                              onChange={(e) => handleChange(segment.id, 'psychographics', e.target.value)}
                              className="bg-navy-light/50 min-h-[100px]"
                            />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <Label htmlFor={`behaviors-${segment.id}`}>Behaviors</Label>
                            <Textarea 
                              id={`behaviors-${segment.id}`}
                              placeholder="Purchase behavior, usage patterns, brand interactions..."
                              value={segment.behaviors}
                              onChange={(e) => handleChange(segment.id, 'behaviors', e.target.value)}
                              className="bg-navy-light/50 min-h-[100px]"
                            />
                          </div>
                          <div>
                            <Label htmlFor={`needs-${segment.id}`}>Needs & Pain Points</Label>
                            <Textarea 
                              id={`needs-${segment.id}`}
                              placeholder="Problems faced, desired solutions, unmet needs..."
                              value={segment.needs}
                              onChange={(e) => handleChange(segment.id, 'needs', e.target.value)}
                              className="bg-navy-light/50 min-h-[100px]"
                            />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor={`size-${segment.id}`}>Market Size</Label>
                            <Input 
                              id={`size-${segment.id}`}
                              placeholder="Estimated size of this segment"
                              value={segment.size}
                              onChange={(e) => handleChange(segment.id, 'size', e.target.value)}
                              className="bg-navy-light/50"
                            />
                          </div>
                          <div>
                            <Label htmlFor={`reachability-${segment.id}`}>Reachability</Label>
                            <Input 
                              id={`reachability-${segment.id}`}
                              placeholder="How easy is it to reach this segment?"
                              value={segment.reachability}
                              onChange={(e) => handleChange(segment.id, 'reachability', e.target.value)}
                              className="bg-navy-light/50"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    <Button 
                      variant="outline" 
                      onClick={addSegment}
                      className="flex items-center gap-2 mt-4 border-dashed border-white/30"
                    >
                      <PlusCircle size={16} />
                      Add Another Segment
                    </Button>
                  </TabsContent>
                  
                  <TabsContent value="analysis">
                    <div className="space-y-6">
                      <div className="glass-card p-6">
                        <h3 className="text-lg font-medium text-white mb-4">Target Market Insights</h3>
                        <Textarea 
                          placeholder="Summarize key insights about your target market..."
                          className="bg-navy-light/50 min-h-[150px]"
                        />
                      </div>
                      
                      <div className="glass-card p-6">
                        <h3 className="text-lg font-medium text-white mb-4">Market Opportunity</h3>
                        <Textarea 
                          placeholder="Describe the opportunity in this market..."
                          className="bg-navy-light/50 min-h-[150px]"
                        />
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter size={20} className="text-electric-blue" />
                  Market Validation
                </CardTitle>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={18} className="text-electric-blue" />
                    <span>Reference in Validation</span>
                  </div>
                  <p className="text-white/70 text-sm">
                    Your target market definitions will be available throughout the Validation phase, including Interviews and Scoring.
                  </p>
                  
                  <div className="flex items-center gap-2 mt-4">
                    <CheckCircle2 size={18} className="text-electric-blue" />
                    <span>Use in Launch/Pilot</span>
                  </div>
                  <p className="text-white/70 text-sm">
                    Target market segments will be used during the Launch phase to help you identify pilot users and early adopters.
                  </p>
                </div>
                
                <div className="mt-6">
                  <Button className="w-full bg-electric-blue hover:bg-electric-blue/90">
                    Save Market Segments
                  </Button>
                  
                  <Link to="/project/validate">
                    <Button variant="outline" className="w-full mt-2 flex items-center justify-center gap-2">
                      Back to Validation
                      <ChevronRight size={16} />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <AiAgent />
    </div>
  );
};

export default TargetMarket;
