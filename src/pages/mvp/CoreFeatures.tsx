
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Plus, X, Save, Edit, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import AiAgent from '@/components/AiAgent';
import { toast } from '@/components/ui/use-toast';

const CoreFeatures = () => {
  const [features, setFeatures] = useState([
    { id: 1, name: 'User Authentication', description: 'Login, registration, and profile management', priority: 'High' },
    { id: 2, name: 'Payment Processing', description: 'Secure payment gateway integration', priority: 'High' },
    { id: 3, name: 'Dashboard', description: 'User dashboard with analytics and controls', priority: 'Medium' },
  ]);
  
  const [newFeature, setNewFeature] = useState({ name: '', description: '', priority: 'Medium' });
  const [editingId, setEditingId] = useState<number | null>(null);
  
  const handleAddFeature = () => {
    if (!newFeature.name) {
      toast({
        description: "Feature name is required",
        variant: "destructive"
      });
      return;
    }
    
    const id = features.length > 0 ? Math.max(...features.map(f => f.id)) + 1 : 1;
    setFeatures([...features, { ...newFeature, id }]);
    setNewFeature({ name: '', description: '', priority: 'Medium' });
    
    toast({
      description: "Feature added successfully!"
    });
  };
  
  const handleDeleteFeature = (id: number) => {
    setFeatures(features.filter(f => f.id !== id));
    toast({
      description: "Feature deleted"
    });
  };
  
  const handleEditFeature = (feature: any) => {
    setEditingId(feature.id);
    setNewFeature({
      name: feature.name,
      description: feature.description,
      priority: feature.priority
    });
  };
  
  const handleUpdateFeature = () => {
    if (editingId) {
      setFeatures(features.map(f => 
        f.id === editingId ? { ...f, ...newFeature } : f
      ));
      setEditingId(null);
      setNewFeature({ name: '', description: '', priority: 'Medium' });
      
      toast({
        description: "Feature updated successfully!"
      });
    }
  };
  
  const handleGenerateFeatures = () => {
    toast({
      description: "AI is generating feature suggestions based on your project...",
    });
    
    // Simulated AI response
    setTimeout(() => {
      const aiSuggestions = [
        { id: features.length + 1, name: 'Notification System', description: 'Real-time notifications for users', priority: 'Medium' },
        { id: features.length + 2, name: 'Search Functionality', description: 'Advanced search with filters', priority: 'High' }
      ];
      
      setFeatures([...features, ...aiSuggestions]);
      
      toast({
        description: "New feature suggestions added!"
      });
    }, 2000);
  };
  
  return (
    <div className="min-h-screen bg-navy pb-20">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <div className="flex items-center gap-2 text-white/60 mb-4">
            <Link to="/project/mvp" className="hover:text-white flex items-center gap-1">
              <ArrowLeft size={16} />
              Back to MVP Specification
            </Link>
            <span>/</span>
            <span>Core Features</span>
          </div>
          
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl md:text-4xl font-orbitron font-bold text-electric-blue mb-2">
                Core Features
              </h1>
              <p className="text-white/70">
                Define the essential features for your Minimum Viable Product
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                className="border-white/20 text-white"
                onClick={handleGenerateFeatures}
              >
                <Sparkles size={16} className="mr-2" />
                AI Generate Features
              </Button>
              
              <Button 
                className="bg-electric-blue hover:bg-electric-blue/90"
                onClick={() => toast({ description: "All features saved to project file" })}
              >
                <Save size={16} className="mr-2" />
                Save All
              </Button>
            </div>
          </div>
        </div>
        
        {/* Features List */}
        <div className="glass-card p-6 mb-8">
          <h2 className="text-xl font-medium text-white mb-4">My Core Features</h2>
          
          <div className="space-y-4">
            {features.map((feature) => (
              <div key={feature.id} className="bg-navy-light/40 rounded-lg p-4 border border-white/10">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-medium text-white">{feature.name}</h3>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        feature.priority === 'High' ? 'bg-red-500/20 text-red-300' :
                        feature.priority === 'Medium' ? 'bg-yellow-500/20 text-yellow-300' :
                        'bg-green-500/20 text-green-300'
                      }`}>
                        {feature.priority}
                      </span>
                    </div>
                    <p className="text-white/70 mt-1">{feature.description}</p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-white/70 hover:bg-white/10"
                      onClick={() => handleEditFeature(feature)}
                    >
                      <Edit size={16} />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-white/70 hover:bg-white/10"
                      onClick={() => handleDeleteFeature(feature.id)}
                    >
                      <X size={16} />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Add/Edit Feature Form */}
        <div className="glass-card p-6">
          <h2 className="text-xl font-medium text-white mb-4">
            {editingId ? 'Edit Feature' : 'Add New Feature'}
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-white/70 mb-1 text-sm">Feature Name</label>
              <Input 
                placeholder="Enter feature name"
                className="bg-navy-light/50 border-white/20 text-white"
                value={newFeature.name}
                onChange={(e) => setNewFeature({...newFeature, name: e.target.value})}
              />
            </div>
            
            <div>
              <label className="block text-white/70 mb-1 text-sm">Description</label>
              <Textarea 
                placeholder="Describe the feature functionality"
                className="bg-navy-light/50 border-white/20 text-white min-h-[100px]"
                value={newFeature.description}
                onChange={(e) => setNewFeature({...newFeature, description: e.target.value})}
              />
            </div>
            
            <div>
              <label className="block text-white/70 mb-1 text-sm">Priority</label>
              <div className="flex gap-3">
                {['High', 'Medium', 'Low'].map((priority) => (
                  <Button 
                    key={priority}
                    type="button"
                    variant={newFeature.priority === priority ? 'default' : 'outline'}
                    className={
                      newFeature.priority === priority 
                        ? 'bg-electric-blue' 
                        : 'border-white/20 text-white'
                    }
                    onClick={() => setNewFeature({...newFeature, priority})}
                  >
                    {priority}
                  </Button>
                ))}
              </div>
            </div>
            
            <div className="flex justify-end mt-4">
              {editingId ? (
                <>
                  <Button 
                    variant="outline" 
                    className="border-white/20 text-white mr-2"
                    onClick={() => {
                      setEditingId(null);
                      setNewFeature({ name: '', description: '', priority: 'Medium' });
                    }}
                  >
                    Cancel
                  </Button>
                  <Button 
                    className="bg-electric-blue hover:bg-electric-blue/90"
                    onClick={handleUpdateFeature}
                  >
                    Update Feature
                  </Button>
                </>
              ) : (
                <Button 
                  className="bg-electric-blue hover:bg-electric-blue/90"
                  onClick={handleAddFeature}
                >
                  <Plus size={16} className="mr-2" />
                  Add Feature
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <AiAgent />
    </div>
  );
};

export default CoreFeatures;
