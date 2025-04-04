import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  CheckSquare, 
  Clock, 
  Users, 
  AlertTriangle, 
  Plus, 
  Trash2, 
  ChevronRight,
  ArrowRight,
  FileText,
  Save,
  TextQuote,
  Cog,
  CalendarClock,
  ShieldAlert,
  BookOpen,
  ListChecks
} from 'lucide-react';
import AIAgent from '@/components/FileManager/AIAgent';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

interface Feature {
  id: string;
  name: string;
  description: string;
  priority: 'must-have' | 'should-have' | 'nice-to-have';
  completed: boolean;
}

interface Milestone {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  features: string[];
}

interface Resource {
  id: string;
  name: string;
  role: string;
  hours: number;
}

interface Risk {
  id: string;
  name: string;
  impact: 'low' | 'medium' | 'high';
  mitigation: string;
}

const safeNavigateToTab = (tabValue: string) => {
  const tabElement = document.querySelector(`[data-value="${tabValue}"]`) as HTMLButtonElement | null;
  if (tabElement) {
    tabElement.click();
  }
};

const MVPSpecification = () => {
  const [features, setFeatures] = useState<Feature[]>([
    {
      id: '1',
      name: 'User Authentication',
      description: 'Allow users to sign up and log in to the application',
      priority: 'must-have',
      completed: false
    },
    {
      id: '2',
      name: 'Dashboard',
      description: 'Main view showing project overview and statistics',
      priority: 'must-have',
      completed: false
    },
    {
      id: '3',
      name: 'File Upload',
      description: 'Enable users to upload files and documents',
      priority: 'should-have',
      completed: false
    }
  ]);

  const [milestones, setMilestones] = useState<Milestone[]>([
    {
      id: '1',
      name: 'Planning Phase',
      startDate: '2023-06-01',
      endDate: '2023-06-15',
      features: []
    },
    {
      id: '2',
      name: 'Development Sprint 1',
      startDate: '2023-06-16',
      endDate: '2023-06-30',
      features: ['1', '2']
    },
    {
      id: '3',
      name: 'Development Sprint 2',
      startDate: '2023-07-01',
      endDate: '2023-07-15',
      features: ['3']
    }
  ]);

  const [resources, setResources] = useState<Resource[]>([
    {
      id: '1',
      name: 'John Doe',
      role: 'Frontend Developer',
      hours: 80
    },
    {
      id: '2',
      name: 'Jane Smith',
      role: 'Backend Developer',
      hours: 60
    }
  ]);

  const [risks, setRisks] = useState<Risk[]>([
    {
      id: '1',
      name: 'API Integration Delays',
      impact: 'high',
      mitigation: 'Start integration early, have backup plan for mock data'
    },
    {
      id: '2',
      name: 'User Testing Feedback Requires Significant Changes',
      impact: 'medium',
      mitigation: 'Build in buffer time in the schedule for iterations'
    }
  ]);

  const [newFeature, setNewFeature] = useState<Omit<Feature, 'id' | 'completed'>>({
    name: '',
    description: '',
    priority: 'should-have'
  });
  
  const [newMilestone, setNewMilestone] = useState<Omit<Milestone, 'id'>>({
    name: '',
    startDate: '',
    endDate: '',
    features: []
  });
  
  const [newResource, setNewResource] = useState<Omit<Resource, 'id'>>({
    name: '',
    role: '',
    hours: 0
  });
  
  const [newRisk, setNewRisk] = useState<Omit<Risk, 'id'>>({
    name: '',
    impact: 'medium',
    mitigation: ''
  });

  const handleAddFeature = () => {
    if (newFeature.name.trim() === '') return;
    
    const feature: Feature = {
      id: Date.now().toString(),
      ...newFeature,
      completed: false
    };
    
    setFeatures([...features, feature]);
    setNewFeature({
      name: '',
      description: '',
      priority: 'should-have'
    });
  };

  const handleAddMilestone = () => {
    if (newMilestone.name.trim() === '') return;
    
    const milestone: Milestone = {
      id: Date.now().toString(),
      ...newMilestone
    };
    
    setMilestones([...milestones, milestone]);
    setNewMilestone({
      name: '',
      startDate: '',
      endDate: '',
      features: []
    });
  };

  const handleAddResource = () => {
    if (newResource.name.trim() === '') return;
    
    const resource: Resource = {
      id: Date.now().toString(),
      ...newResource
    };
    
    setResources([...resources, resource]);
    setNewResource({
      name: '',
      role: '',
      hours: 0
    });
  };

  const handleAddRisk = () => {
    if (newRisk.name.trim() === '') return;
    
    const risk: Risk = {
      id: Date.now().toString(),
      ...newRisk
    };
    
    setRisks([...risks, risk]);
    setNewRisk({
      name: '',
      impact: 'medium',
      mitigation: ''
    });
  };

  const handleDeleteFeature = (id: string) => {
    setFeatures(features.filter(feature => feature.id !== id));
  };

  const handleDeleteMilestone = (id: string) => {
    setMilestones(milestones.filter(milestone => milestone.id !== id));
  };

  const handleDeleteResource = (id: string) => {
    setResources(resources.filter(resource => resource.id !== id));
  };

  const handleDeleteRisk = (id: string) => {
    setRisks(risks.filter(risk => risk.id !== id));
  };

  const toggleFeatureCompletion = (id: string) => {
    setFeatures(features.map(feature => 
      feature.id === id ? { ...feature, completed: !feature.completed } : feature
    ));
  };

  const handleMilestoneFeatureToggle = (milestoneId: string, featureId: string) => {
    setMilestones(milestones.map(milestone => {
      if (milestone.id === milestoneId) {
        const features = [...milestone.features];
        const index = features.indexOf(featureId);
        
        if (index === -1) {
          features.push(featureId);
        } else {
          features.splice(index, 1);
        }
        
        return { ...milestone, features };
      }
      
      return milestone;
    }));
  };

  return (
    <div className="min-h-screen bg-navy p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center mb-6 text-sm text-white/60">
          <span>Project</span>
          <span className="mx-2">/</span>
          <span className="text-white">MVP Specification</span>
        </div>
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">MVP Specification & Development Path</h1>
          <p className="text-white/60">
            Define your Minimum Viable Product scope, features, timeline, and resource requirements.
          </p>
          
          <Button className="mt-4 flex items-center gap-2 px-4 py-2 bg-electric-blue/10 text-electric-blue rounded-lg hover:bg-electric-blue/20 transition-colors">
            <FileText size={18} />
            Save to Project Docs
          </Button>
        </div>

        <Tabs defaultValue="features" className="space-y-8">
          <TabsList className="bg-navy-light p-1">
            <TabsTrigger 
              value="features" 
              className="data-[state=active]:bg-electric-blue data-[state=active]:text-white"
            >
              <CheckSquare size={16} className="mr-2" />
              Core Features
            </TabsTrigger>
            <TabsTrigger 
              value="timeline" 
              className="data-[state=active]:bg-electric-blue data-[state=active]:text-white"
            >
              <Clock size={16} className="mr-2" />
              Timeline & Milestones
            </TabsTrigger>
            <TabsTrigger 
              value="resources" 
              className="data-[state=active]:bg-electric-blue data-[state=active]:text-white"
            >
              <Users size={16} className="mr-2" />
              Resources & Team
            </TabsTrigger>
            <TabsTrigger 
              value="risks" 
              className="data-[state=active]:bg-electric-blue data-[state=active]:text-white"
            >
              <AlertTriangle size={16} className="mr-2" />
              Dependencies & Risks
            </TabsTrigger>
            <TabsTrigger 
              value="review" 
              className="data-[state=active]:bg-electric-blue data-[state=active]:text-white"
            >
              <BookOpen size={16} className="mr-2" />
              Final Review
            </TabsTrigger>
          </TabsList>

          <TabsContent value="features" className="mt-6 space-y-6">
            <Card className="bg-navy-light border-white/10">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-white flex items-center">
                    <ListChecks className="mr-2" size={20} />
                    MVP Core Features
                  </h2>
                  <div className="text-sm text-white/60">
                    {features.filter(f => f.completed).length} of {features.length} completed
                  </div>
                </div>
                
                <div className="space-y-4 mb-6">
                  {features.map((feature) => (
                    <div 
                      key={feature.id} 
                      className="p-4 rounded-lg border border-white/10 bg-navy"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <Checkbox 
                            id={`feature-${feature.id}`}
                            checked={feature.completed}
                            onCheckedChange={() => toggleFeatureCompletion(feature.id)}
                            className="mt-1 data-[state=checked]:bg-electric-blue"
                          />
                          <div>
                            <label 
                              htmlFor={`feature-${feature.id}`}
                              className="text-white font-medium cursor-pointer"
                            >
                              {feature.name}
                            </label>
                            <p className="text-white/60 text-sm mt-1">{feature.description}</p>
                            <div className="mt-2">
                              <span 
                                className={`inline-block px-2 py-1 text-xs rounded-full
                                  ${feature.priority === 'must-have' 
                                    ? 'bg-red-500/20 text-red-300' 
                                    : feature.priority === 'should-have' 
                                      ? 'bg-yellow-500/20 text-yellow-300' 
                                      : 'bg-green-500/20 text-green-300'
                                  }`}
                              >
                                {feature.priority === 'must-have' ? 'Must Have' : 
                                  feature.priority === 'should-have' ? 'Should Have' : 'Nice to Have'}
                              </span>
                            </div>
                          </div>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleDeleteFeature(feature.id)}
                          className="text-white/60 hover:text-white hover:bg-red-500/20"
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <Separator className="my-6 bg-white/10" />
                
                <div className="space-y-4">
                  <h3 className="text-white font-medium">Add New Feature</h3>
                  
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="feature-name" className="text-white/70">Feature Name</Label>
                      <Input 
                        id="feature-name"
                        value={newFeature.name}
                        onChange={(e) => setNewFeature({...newFeature, name: e.target.value})}
                        placeholder="Enter feature name"
                        className="bg-navy border-white/20 text-white"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="feature-description" className="text-white/70">Description</Label>
                      <Textarea 
                        id="feature-description"
                        value={newFeature.description}
                        onChange={(e) => setNewFeature({...newFeature, description: e.target.value})}
                        placeholder="Describe the feature"
                        className="bg-navy border-white/20 text-white"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="feature-priority" className="text-white/70">Priority</Label>
                      <div className="flex gap-2 mt-1">
                        <Button 
                          type="button"
                          variant={newFeature.priority === 'must-have' ? 'default' : 'outline'}
                          className={newFeature.priority === 'must-have' 
                            ? 'bg-red-500 hover:bg-red-600' 
                            : 'border-white/20 text-white'
                          }
                          onClick={() => setNewFeature({...newFeature, priority: 'must-have'})}
                        >
                          Must Have
                        </Button>
                        <Button 
                          type="button"
                          variant={newFeature.priority === 'should-have' ? 'default' : 'outline'}
                          className={newFeature.priority === 'should-have' 
                            ? 'bg-yellow-500 hover:bg-yellow-600' 
                            : 'border-white/20 text-white'
                          }
                          onClick={() => setNewFeature({...newFeature, priority: 'should-have'})}
                        >
                          Should Have
                        </Button>
                        <Button 
                          type="button"
                          variant={newFeature.priority === 'nice-to-have' ? 'default' : 'outline'}
                          className={newFeature.priority === 'nice-to-have' 
                            ? 'bg-green-500 hover:bg-green-600' 
                            : 'border-white/20 text-white'
                          }
                          onClick={() => setNewFeature({...newFeature, priority: 'nice-to-have'})}
                        >
                          Nice to Have
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <Button 
                    onClick={handleAddFeature}
                    className="mt-4 bg-electric-blue"
                    disabled={newFeature.name.trim() === ''}
                  >
                    <Plus size={16} className="mr-2" />
                    Add Feature
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <div className="flex justify-end">
              <Button 
                className="bg-electric-blue"
                onClick={() => safeNavigateToTab('timeline')}
              >
                Next: Timeline & Milestones
                <ArrowRight size={16} className="ml-2" />
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="timeline" className="mt-6 space-y-6">
            <Card className="bg-navy-light border-white/10">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-white flex items-center">
                    <CalendarClock className="mr-2" size={20} />
                    Timeline & Milestones
                  </h2>
                </div>
                
                <div className="space-y-6 mb-6">
                  {milestones.map((milestone) => (
                    <div 
                      key={milestone.id} 
                      className="p-4 rounded-lg border border-white/10 bg-navy"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-white font-medium">{milestone.name}</h3>
                          <p className="text-white/60 text-sm mt-1">
                            {new Date(milestone.startDate).toLocaleDateString()} - {new Date(milestone.endDate).toLocaleDateString()}
                          </p>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleDeleteMilestone(milestone.id)}
                          className="text-white/60 hover:text-white hover:bg-red-500/20"
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                      
                      <div className="mt-4">
                        <h4 className="text-white/70 text-sm mb-2">Features in this milestone:</h4>
                        <div className="space-y-2">
                          {features.map((feature) => (
                            <div key={feature.id} className="flex items-center">
                              <Checkbox 
                                id={`milestone-${milestone.id}-feature-${feature.id}`}
                                checked={milestone.features.includes(feature.id)}
                                onCheckedChange={() => handleMilestoneFeatureToggle(milestone.id, feature.id)}
                                className="mr-2 data-[state=checked]:bg-electric-blue"
                              />
                              <label 
                                htmlFor={`milestone-${milestone.id}-feature-${feature.id}`}
                                className="text-white cursor-pointer"
                              >
                                {feature.name}
                              </label>
                            </div>
                          ))}
                          
                          {features.length === 0 && (
                            <p className="text-white/40 text-sm">No features defined yet.</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <Separator className="my-6 bg-white/10" />
                
                <div className="space-y-4">
                  <h3 className="text-white font-medium">Add New Milestone</h3>
                  
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="milestone-name" className="text-white/70">Milestone Name</Label>
                      <Input 
                        id="milestone-name"
                        value={newMilestone.name}
                        onChange={(e) => setNewMilestone({...newMilestone, name: e.target.value})}
                        placeholder="Enter milestone name"
                        className="bg-navy border-white/20 text-white"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="milestone-start-date" className="text-white/70">Start Date</Label>
                        <Input 
                          id="milestone-start-date"
                          type="date"
                          value={newMilestone.startDate}
                          onChange={(e) => setNewMilestone({...newMilestone, startDate: e.target.value})}
                          className="bg-navy border-white/20 text-white"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="milestone-end-date" className="text-white/70">End Date</Label>
                        <Input 
                          id="milestone-end-date"
                          type="date"
                          value={newMilestone.endDate}
                          onChange={(e) => setNewMilestone({...newMilestone, endDate: e.target.value})}
                          className="bg-navy border-white/20 text-white"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <Button 
                    onClick={handleAddMilestone}
                    className="mt-4 bg-electric-blue"
                    disabled={newMilestone.name.trim() === '' || !newMilestone.startDate || !newMilestone.endDate}
                  >
                    <Plus size={16} className="mr-2" />
                    Add Milestone
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <div className="flex justify-end">
              <Button 
                className="bg-electric-blue"
                onClick={() => safeNavigateToTab('resources')}
              >
                Next: Resources & Team
                <ArrowRight size={16} className="ml-2" />
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="resources" className="mt-6 space-y-6">
            <Card className="bg-navy-light border-white/10">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-white flex items-center">
                    <Users className="mr-2" size={20} />
                    Resources & Team
                  </h2>
                </div>
                
                <div className="space-y-4 mb-6">
                  {resources.map((resource) => (
                    <div 
                      key={resource.id} 
                      className="p-4 rounded-lg border border-white/10 bg-navy flex items-center justify-between"
                    >
                      <div>
                        <h3 className="text-white font-medium">{resource.name}</h3>
                        <p className="text-white/60 text-sm">{resource.role}</p>
                        <p className="text-white/60 text-sm">{resource.hours} hours</p>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleDeleteResource(resource.id)}
                        className="text-white/60 hover:text-white hover:bg-red-500/20"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  ))}
                </div>
                
                <Separator className="my-6 bg-white/10" />
                
                <div className="space-y-4">
                  <h3 className="text-white font-medium">Add New Resource</h3>
                  
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="resource-name" className="text-white/70">Name</Label>
                      <Input 
                        id="resource-name"
                        value={newResource.name}
                        onChange={(e) => setNewResource({...newResource, name: e.target.value})}
                        placeholder="Enter name"
                        className="bg-navy border-white/20 text-white"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="resource-role" className="text-white/70">Role</Label>
                      <Input 
                        id="resource-role"
                        value={newResource.role}
                        onChange={(e) => setNewResource({...newResource, role: e.target.value})}
                        placeholder="Enter role"
                        className="bg-navy border-white/20 text-white"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="resource-hours" className="text-white/70">Hours</Label>
                      <Input 
                        id="resource-hours"
                        type="number"
                        value={newResource.hours.toString()}
                        onChange={(e) => setNewResource({
                          ...newResource, 
                          hours: parseInt(e.target.value) || 0
                        })}
                        placeholder="Enter estimated hours"
                        className="bg-navy border-white/20 text-white"
                      />
                    </div>
                  </div>
                  
                  <Button 
                    onClick={handleAddResource}
                    className="mt-4 bg-electric-blue"
                    disabled={newResource.name.trim() === '' || newResource.role.trim() === ''}
                  >
                    <Plus size={16} className="mr-2" />
                    Add Resource
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <div className="flex justify-end">
              <Button 
                className="bg-electric-blue"
                onClick={() => safeNavigateToTab('risks')}
              >
                Next: Dependencies & Risks
                <ArrowRight size={16} className="ml-2" />
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="risks" className="mt-6 space-y-6">
            <Card className="bg-navy-light border-white/10">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-white flex items-center">
                    <ShieldAlert className="mr-2" size={20} />
                    Dependencies & Risks
                  </h2>
                </div>
                
                <div className="space-y-4 mb-6">
                  {risks.map((risk) => (
                    <div 
                      key={risk.id} 
                      className="p-4 rounded-lg border border-white/10 bg-navy"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-white font-medium">{risk.name}</h3>
                            <span 
                              className={`inline-block px-2 py-1 text-xs rounded-full
                                ${risk.impact === 'high' 
                                  ? 'bg-red-500/20 text-red-300' 
                                  : risk.impact === 'medium' 
                                    ? 'bg-yellow-500/20 text-yellow-300' 
                                    : 'bg-green-500/20 text-green-300'
                                }`}
                            >
                              {risk.impact.charAt(0).toUpperCase() + risk.impact.slice(1)} Impact
                            </span>
                          </div>
                          <p className="text-white/60 text-sm mt-2">
                            <strong className="text-white/80">Mitigation:</strong> {risk.mitigation}
                          </p>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleDeleteRisk(risk.id)}
                          className="text-white/60 hover:text-white hover:bg-red-500/20"
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <Separator className="my-6 bg-white/10" />
                
                <div className="space-y-4">
                  <h3 className="text-white font-medium">Add New Risk or Dependency</h3>
                  
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="risk-name" className="text-white/70">Risk Name</Label>
                      <Input 
                        id="risk-name"
                        value={newRisk.name}
                        onChange={(e) => setNewRisk({...newRisk, name: e.target.value})}
                        placeholder="Enter risk or dependency name"
                        className="bg-navy border-white/20 text-white"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="risk-impact" className="text-white/70">Impact Level</Label>
                      <div className="flex gap-2 mt-1">
                        <Button 
                          type="button"
                          variant={newRisk.impact === 'low' ? 'default' : 'outline'}
                          className={newRisk.impact === 'low' 
                            ? 'bg-green-500 hover:bg-green-600' 
                            : 'border-white/20 text-white'
                          }
                          onClick={() => setNewRisk({...newRisk, impact: 'low'})}
                        >
                          Low
                        </Button>
                        <Button 
                          type="button"
                          variant={newRisk.impact === 'medium' ? 'default' : 'outline'}
                          className={newRisk.impact === 'medium' 
                            ? 'bg-yellow-500 hover:bg-yellow-600' 
                            : 'border-white/20 text-white'
                          }
                          onClick={() => setNewRisk({...newRisk, impact: 'medium'})}
                        >
                          Medium
                        </Button>
                        <Button 
                          type="button"
                          variant={newRisk.impact === 'high' ? 'default' : 'outline'}
                          className={newRisk.impact === 'high' 
                            ? 'bg-red-500 hover:bg-red-600' 
                            : 'border-white/20 text-white'
                          }
                          onClick={() => setNewRisk({...newRisk, impact: 'high'})}
                        >
                          High
                        </Button>
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="risk-mitigation" className="text-white/70">Mitigation Plan</Label>
                      <Textarea 
                        id="risk-mitigation"
                        value={newRisk.mitigation}
                        onChange={(e) => setNewRisk({...newRisk, mitigation: e.target.value})}
                        placeholder="How will you mitigate this risk?"
                        className="bg-navy border-white/20 text-white"
                      />
                    </div>
                  </div>
                  
                  <Button 
                    onClick={handleAddRisk}
                    className="mt-4 bg-electric-blue"
                    disabled={newRisk.name.trim() === '' || newRisk.mitigation.trim() === ''}
                  >
                    <Plus size={16} className="mr-2" />
                    Add Risk
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <div className="flex justify-end">
              <Button 
                className="bg-electric-blue"
                onClick={() => safeNavigateToTab('review')}
              >
                Next: Final Review
                <ArrowRight size={16} className="ml-2" />
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="review" className="mt-6 space-y-6">
            <Card className="bg-navy-light border-white/10">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-white flex items-center">
                    <TextQuote className="mr-2" size={20} />
                    MVP Specification Review
                  </h2>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-white font-medium flex items-center">
                      <CheckSquare size={16} className="mr-1" />
                      Features Summary
                    </h3>
                    <p className="text-white/60 text-sm mt-1">
                      {features.length} features defined, {features.filter(f => f.priority === 'must-have').length} must-have features
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-white font-medium flex items-center">
                      <Clock size={16} className="mr-1" />
                      Timeline Summary
                    </h3>
                    <p className="text-white/60 text-sm mt-1">
                      {milestones.length} milestones defined
                      {milestones.length > 0 && (
                        <>, spanning from {new Date(milestones.reduce((earliest, m) => 
                          new Date(m.startDate) < new Date(earliest) ? m.startDate : earliest, 
                          milestones[0].startDate
                        )).toLocaleDateString()}
                        to {new Date(milestones.reduce((latest, m) => 
                          new Date(m.endDate) > new Date(latest) ? m.endDate : latest, 
                          milestones[0].endDate
                        )).toLocaleDateString()}</>
                      )}
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-white font-medium flex items-center">
                      <Users size={16} className="mr-1" />
                      Resources Summary
                    </h3>
                    <p className="text-white/60 text-sm mt-1">
                      {resources.length} team members, total of {resources.reduce((sum, r) => sum + r.hours, 0)} hours
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-white font-medium flex items-center">
                      <AlertTriangle size={16} className="mr-1" />
                      Risks Summary
                    </h3>
                    <p className="text-white/60 text-sm mt-1">
                      {risks.length} risks identified, {risks.filter(r => r.impact === 'high').length} high-impact risks
                    </p>
                  </div>
                  
                  <Separator className="my-6 bg-white/10" />
                  
                  <div>
                    <h3 className="text-white font-medium">Additional Notes</h3>
                    <Textarea 
                      placeholder="Add any final notes or comments about the MVP specification"
                      className="bg-navy border-white/20 text-white mt-2 min-h-[120px]"
                    />
                  </div>
                  
                  <div className="flex justify-end mt-6">
                    <Button className="bg-electric-blue">
                      <Save size={16} className="mr-2" />
                      Save MVP Specification
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="flex justify-between">
              <Button variant="outline" className="border-white/20 text-white">
                Export as PDF
              </Button>
              
              <Button className="bg-green-600 hover:bg-green-700">
                <Cog size={16} className="mr-2" />
                Proceed to Development
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <AIAgent />
    </div>
  );
};

export default MVPSpecification;
