
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Sparkles, Save, Download, ArrowRight, Plus, Trash2, ArrowRightLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AiAgent from '@/components/AiAgent';

type Scenario = {
  id: string;
  title: string;
  description: string;
  probability: number;
  impact: 'high' | 'medium' | 'low';
  response: string;
  alternatives: string[];
};

const MazeOfOutcomes = () => {
  const [scenarios, setScenarios] = useState<Scenario[]>([
    {
      id: '1',
      title: 'Market Growth Exceeds Expectations',
      description: 'The market grows faster than anticipated, creating unexpected demand.',
      probability: 30,
      impact: 'high',
      response: 'Scale operations quickly and secure additional funding if needed.',
      alternatives: [
        'Partner with established companies to handle overflow',
        'Implement waiting list system to manage customer expectations'
      ]
    },
    {
      id: '2',
      title: 'New Competitor Enters Market',
      description: 'A well-funded competitor enters the market with similar offering.',
      probability: 60,
      impact: 'medium',
      response: 'Focus on unique value proposition and double down on customer experience.',
      alternatives: [
        'Consider strategic price adjustments',
        'Accelerate feature development roadmap'
      ]
    }
  ]);
  
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(null);
  const [newAlternative, setNewAlternative] = useState('');
  
  const addScenario = () => {
    const newScenario: Scenario = {
      id: Date.now().toString(),
      title: 'New Scenario',
      description: '',
      probability: 50,
      impact: 'medium',
      response: '',
      alternatives: []
    };
    
    setScenarios([...scenarios, newScenario]);
    setSelectedScenario(newScenario);
  };
  
  const updateScenario = (field: keyof Scenario, value: string | number | string[] | 'high' | 'medium' | 'low') => {
    if (!selectedScenario) return;
    
    const updatedScenario = {
      ...selectedScenario,
      [field]: value
    };
    
    setSelectedScenario(updatedScenario);
    setScenarios(scenarios.map(s => 
      s.id === updatedScenario.id ? updatedScenario : s
    ));
  };
  
  const deleteScenario = (id: string) => {
    setScenarios(scenarios.filter(s => s.id !== id));
    if (selectedScenario?.id === id) {
      setSelectedScenario(null);
    }
  };
  
  const addAlternative = () => {
    if (!newAlternative.trim() || !selectedScenario) return;
    
    const updatedAlternatives = [...selectedScenario.alternatives, newAlternative];
    updateScenario('alternatives', updatedAlternatives);
    setNewAlternative('');
  };
  
  const removeAlternative = (index: number) => {
    if (!selectedScenario) return;
    
    const updatedAlternatives = [...selectedScenario.alternatives];
    updatedAlternatives.splice(index, 1);
    updateScenario('alternatives', updatedAlternatives);
  };
  
  const getImpactColor = (impact: 'high' | 'medium' | 'low') => {
    switch (impact) {
      case 'high':
        return 'bg-red-500/20 text-red-400';
      case 'medium':
        return 'bg-orange-500/20 text-orange-400';
      case 'low':
        return 'bg-green-500/20 text-green-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };
  
  return (
    <div className="min-h-screen bg-navy">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-white/60 mb-4">
            <Link to="/project/market" className="hover:text-white flex items-center gap-1">
              <ArrowLeft size={16} />
              Back to Market Analysis
            </Link>
            <span>/</span>
            <span>Maze of Outcomes</span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-orbitron font-bold text-electric-blue mb-2">
            Maze of Outcomes
          </h1>
          <p className="text-white/70">
            Plan for different scenarios, pivots, and potential outcomes to create a resilient business strategy.
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
                    <Sparkles size={20} className="text-electric-blue" />
                    <span>Scenarios</span>
                  </div>
                  <Button size="sm" variant="outline" onClick={addScenario} className="h-8 gap-1">
                    <Plus size={14} />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Add Scenario</span>
                  </Button>
                </CardTitle>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-2">
                  {scenarios.map(scenario => (
                    <div 
                      key={scenario.id}
                      className={`p-3 rounded-md cursor-pointer hover:bg-navy-light transition-colors flex justify-between items-center ${
                        selectedScenario?.id === scenario.id ? "bg-navy-light border border-electric-blue/30" : "bg-navy-dark"
                      }`}
                      onClick={() => setSelectedScenario(scenario)}
                    >
                      <div className="flex-grow">
                        <div className="font-medium">{scenario.title}</div>
                        <div className="flex items-center gap-2 text-sm">
                          <span className="text-white/60">{scenario.probability}% probability</span>
                          <span className={`px-2 py-0.5 rounded-full text-xs ${getImpactColor(scenario.impact)}`}>
                            {scenario.impact} impact
                          </span>
                        </div>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteScenario(scenario.id);
                        }}
                        className="text-white/50 hover:text-red-400 p-1 h-auto"
                      >
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  ))}
                  
                  {scenarios.length === 0 && (
                    <div className="text-center p-4 text-white/60">
                      <p>No scenarios added yet.</p>
                      <Button onClick={addScenario} variant="outline" className="mt-2">
                        Add Scenario
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="lg:col-span-2">
            {selectedScenario ? (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <Input 
                      value={selectedScenario.title}
                      onChange={(e) => updateScenario('title', e.target.value)}
                      className="max-w-[350px] bg-navy-light/50 font-semibold"
                    />
                    <div className="flex items-center gap-2">
                      <select 
                        value={selectedScenario.impact}
                        onChange={(e) => updateScenario('impact', e.target.value as 'high' | 'medium' | 'low')}
                        className="bg-navy-light/50 border border-white/20 rounded text-sm p-1"
                      >
                        <option value="high">High Impact</option>
                        <option value="medium">Medium Impact</option>
                        <option value="low">Low Impact</option>
                      </select>
                    </div>
                  </CardTitle>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="description">Scenario Description</Label>
                      <Textarea 
                        id="description"
                        value={selectedScenario.description}
                        onChange={(e) => updateScenario('description', e.target.value)}
                        placeholder="Describe this potential scenario or outcome..."
                        className="min-h-[100px] bg-navy-light/50"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="probability">Probability (%)</Label>
                      <Input 
                        id="probability"
                        type="number"
                        min="0"
                        max="100"
                        value={selectedScenario.probability}
                        onChange={(e) => updateScenario('probability', parseInt(e.target.value) || 0)}
                        className="bg-navy-light/50"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="response">Planned Response</Label>
                      <Textarea 
                        id="response"
                        value={selectedScenario.response}
                        onChange={(e) => updateScenario('response', e.target.value)}
                        placeholder="How will you respond if this scenario occurs?"
                        className="min-h-[100px] bg-navy-light/50"
                      />
                    </div>
                    
                    <div>
                      <Label className="mb-2 flex items-center gap-2">
                        <ArrowRightLeft size={16} />
                        Alternative Paths
                      </Label>
                      
                      <div className="space-y-2 mb-4">
                        {selectedScenario.alternatives.map((alternative, index) => (
                          <div key={index} className="flex items-start gap-2 bg-navy-light/30 p-3 rounded">
                            <div className="flex-grow">{alternative}</div>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => removeAlternative(index)} 
                              className="text-white/50 hover:text-red-400 p-1 h-auto"
                            >
                              <Trash2 size={14} />
                            </Button>
                          </div>
                        ))}
                        
                        {selectedScenario.alternatives.length === 0 && (
                          <div className="text-white/60 italic p-2">
                            No alternative paths added yet.
                          </div>
                        )}
                      </div>
                      
                      <div className="flex gap-2">
                        <Input 
                          value={newAlternative}
                          onChange={(e) => setNewAlternative(e.target.value)}
                          placeholder="Add a new alternative path..."
                          className="bg-navy-light/50"
                          onKeyDown={(e) => e.key === 'Enter' && addAlternative()}
                        />
                        <Button onClick={addAlternative} size="sm" disabled={!newAlternative.trim()}>
                          <Plus size={16} />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="glass-card p-8 text-center">
                <Sparkles size={48} className="mx-auto mb-4 text-white/40" />
                <h3 className="text-xl font-medium text-white mb-2">No Scenario Selected</h3>
                <p className="text-white/60 mb-6">
                  Select a scenario from the list or create a new one to get started.
                </p>
                <Button onClick={addScenario} className="bg-electric-blue hover:bg-electric-blue/90 flex items-center gap-2 mx-auto">
                  <Plus size={16} />
                  Create New Scenario
                </Button>
              </div>
            )}
          </div>
        </div>
        
        <div className="mt-8 flex justify-between">
          <Button variant="outline" className="gap-2 border-transparent hover:border-white/20 hover:bg-transparent">
            <Link to="/project/market" className="flex items-center gap-2">
              <ArrowLeft size={16} />
              Back to Market Analysis
            </Link>
          </Button>
        </div>
      </div>
      
      <AiAgent />
    </div>
  );
};

export default MazeOfOutcomes;
