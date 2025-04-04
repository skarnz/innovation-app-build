
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Lightbulb, ThumbsUp, ThumbsDown, Check, Plus, X, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import AiAgent from '@/components/AiAgent';
import { toast } from '@/components/ui/use-toast';

interface CounterIdea {
  id: number;
  original: string;
  counter: string;
  rating: number; // -3 to +3 where +3 is highly promising
  notes: string;
}

const CounterIntuition = () => {
  const [ideas, setIdeas] = useState<CounterIdea[]>([
    {
      id: 1,
      original: "A subscription-based meal delivery service",
      counter: "A meal exchange platform where users trade home-cooked meals",
      rating: 2,
      notes: "Could build community while solving the same problem"
    },
    {
      id: 2,
      original: "A productivity app with task management",
      counter: "An 'anti-productivity' app that schedules mandatory breaks and limits work time",
      rating: 1,
      notes: "Interesting angle but may have limited market appeal"
    },
  ]);
  
  const [newIdea, setNewIdea] = useState({
    original: '',
    counter: '',
    rating: 0,
    notes: ''
  });
  
  const [isGenerating, setIsGenerating] = useState(false);
  
  const handleAddIdea = () => {
    if (!newIdea.original || !newIdea.counter) {
      toast({
        description: "Both original and counter-intuitive ideas are required",
        variant: "destructive"
      });
      return;
    }
    
    const id = ideas.length > 0 ? Math.max(...ideas.map(idea => idea.id)) + 1 : 1;
    setIdeas([...ideas, { ...newIdea, id }]);
    setNewIdea({ original: '', counter: '', rating: 0, notes: '' });
    
    toast({
      description: "Counter-intuitive idea added successfully!"
    });
  };
  
  const handleDeleteIdea = (id: number) => {
    setIdeas(ideas.filter(idea => idea.id !== id));
    toast({
      description: "Idea deleted"
    });
  };
  
  const handleGenerateCounterIdea = () => {
    if (!newIdea.original) {
      toast({
        description: "Please enter your original idea first",
        variant: "destructive"
      });
      return;
    }
    
    setIsGenerating(true);
    
    // Simulate AI generation
    setTimeout(() => {
      const counterIdeas = [
        "A platform where users collaborate on meal planning and take turns cooking for the group",
        "A service connecting people with excess food to those who need meals, reducing waste",
        "A 'mystery meal' subscription where users receive ingredients without knowing what they're making until they start"
      ];
      
      const randomIdea = counterIdeas[Math.floor(Math.random() * counterIdeas.length)];
      
      setNewIdea({
        ...newIdea,
        counter: randomIdea
      });
      
      setIsGenerating(false);
      
      toast({
        description: "Counter-intuitive idea generated!"
      });
    }, 2000);
  };
  
  const getRatingColor = (rating: number) => {
    if (rating >= 2) return "text-green-400";
    if (rating >= 0) return "text-yellow-400";
    return "text-red-400";
  };
  
  const getRatingLabel = (rating: number) => {
    if (rating === 3) return "Highly Promising";
    if (rating === 2) return "Promising";
    if (rating === 1) return "Somewhat Promising";
    if (rating === 0) return "Neutral";
    if (rating === -1) return "Questionable";
    if (rating === -2) return "Problematic";
    return "Not Viable";
  };
  
  return (
    <div className="min-h-screen bg-navy pb-20">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <div className="flex items-center gap-2 text-white/60 mb-4">
            <Link to="/project/ideate" className="hover:text-white flex items-center gap-1">
              <ArrowLeft size={16} />
              Back to Ideation
            </Link>
            <span>/</span>
            <span>Counter-Intuition</span>
          </div>
          
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl md:text-4xl font-orbitron font-bold text-electric-blue mb-2">
                Counter-Intuition Workshop
              </h1>
              <p className="text-white/70">
                Challenge your assumptions by exploring counter-intuitive alternatives to your ideas
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              <Button 
                className="bg-electric-blue hover:bg-electric-blue/90"
                onClick={() => toast({ description: "Counter-intuitive ideas saved to project" })}
              >
                <Save size={16} className="mr-2" />
                Save Ideas
              </Button>
            </div>
          </div>
        </div>
        
        {/* Info Box */}
        <div className="glass-card p-6 mb-8 border-l-4 border-l-electric-blue">
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <Lightbulb size={24} className="text-electric-blue" />
            </div>
            <div>
              <h2 className="text-lg font-medium text-white mb-2">What is Counter-Intuition?</h2>
              <p className="text-white/70">
                Counter-intuition is a powerful ideation technique that challenges your initial assumptions. By exploring ideas that go against your first instinct, you may discover innovative approaches that solve problems in unexpected ways.
              </p>
              <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-navy-light/60 p-3 rounded-md">
                  <h3 className="text-sm font-medium text-white mb-1">How to use this tool:</h3>
                  <ol className="text-white/70 text-sm list-decimal pl-4 space-y-1">
                    <li>Enter your original business idea or concept</li>
                    <li>Generate or create a counter-intuitive alternative</li>
                    <li>Rate how promising the counter-idea seems</li>
                    <li>Add notes on why it might work (or not)</li>
                  </ol>
                </div>
                <div className="bg-navy-light/60 p-3 rounded-md">
                  <h3 className="text-sm font-medium text-white mb-1">Example:</h3>
                  <p className="text-white/70 text-sm">
                    <span className="text-electric-blue">Original:</span> A food delivery app that brings restaurant meals to your door.<br />
                    <span className="text-electric-blue">Counter:</span> A platform where restaurants bid to have customers come eat at their establishment during off-peak hours.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Ideas List */}
        <div className="glass-card p-6 mb-8">
          <h2 className="text-xl font-medium text-white mb-4">My Counter-Intuitive Ideas</h2>
          
          <div className="space-y-6">
            {ideas.map((idea) => (
              <div key={idea.id} className="bg-navy-light/40 rounded-lg p-4 border border-white/10">
                <div className="flex justify-between items-start">
                  <div className="w-full">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                      <div>
                        <h3 className="text-sm font-medium text-white/60 mb-1">Original Idea:</h3>
                        <p className="text-white">{idea.original}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-white/60 mb-1">Counter-Intuitive Alternative:</h3>
                        <p className="text-white">{idea.counter}</p>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
                      <div>
                        <h3 className="text-sm font-medium text-white/60 mb-1">Rating:</h3>
                        <div className="flex items-center">
                          <span className={`font-medium ${getRatingColor(idea.rating)}`}>{getRatingLabel(idea.rating)}</span>
                          <div className="flex ml-2">
                            {Array.from({ length: 7 }).map((_, idx) => {
                              const value = idx - 3;
                              return (
                                <div 
                                  key={idx}
                                  className={`w-4 h-4 rounded-full mx-0.5 flex items-center justify-center ${
                                    value === idea.rating 
                                      ? getRatingColor(value)
                                      : 'bg-navy-light/70'
                                  }`}
                                >
                                  {value === idea.rating && <Check size={10} />}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                      
                      {idea.notes && (
                        <div className="flex-grow">
                          <h3 className="text-sm font-medium text-white/60 mb-1">Notes:</h3>
                          <p className="text-white/80 text-sm">{idea.notes}</p>
                        </div>
                      )}
                      
                      <div className="ml-auto">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-white/70 hover:bg-white/10"
                          onClick={() => handleDeleteIdea(idea.id)}
                        >
                          <X size={16} />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Add New Idea Form */}
        <div className="glass-card p-6">
          <h2 className="text-xl font-medium text-white mb-4">Add New Counter-Intuitive Idea</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-white/70 mb-1 text-sm">Original Idea</label>
              <Textarea 
                placeholder="Enter your original business idea or concept"
                className="bg-navy-light/50 border-white/20 text-white min-h-[100px]"
                value={newIdea.original}
                onChange={(e) => setNewIdea({...newIdea, original: e.target.value})}
              />
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-white/70 text-sm">Counter-Intuitive Alternative</label>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-white/20 text-white text-xs h-7"
                  onClick={handleGenerateCounterIdea}
                  disabled={isGenerating}
                >
                  {isGenerating ? 'Generating...' : 'Generate with AI'}
                </Button>
              </div>
              <Textarea 
                placeholder="Enter or generate a counter-intuitive alternative"
                className="bg-navy-light/50 border-white/20 text-white min-h-[100px]"
                value={newIdea.counter}
                onChange={(e) => setNewIdea({...newIdea, counter: e.target.value})}
              />
            </div>
            
            <div>
              <label className="block text-white/70 mb-2 text-sm">Rate How Promising This Counter-Idea Is:</label>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <ThumbsDown size={16} className="text-red-400 mr-1" />
                  <span className="text-white/60 text-xs">Not Viable</span>
                </div>
                
                <div className="flex gap-1">
                  {Array.from({ length: 7 }).map((_, idx) => {
                    const value = idx - 3;
                    return (
                      <button
                        key={idx}
                        type="button"
                        className={`w-8 h-8 rounded-full flex items-center justify-center border ${
                          value === newIdea.rating 
                            ? 'border-electric-blue bg-navy-light/80' 
                            : 'border-white/20 bg-navy-light/40'
                        }`}
                        onClick={() => setNewIdea({...newIdea, rating: value})}
                      >
                        <span className="text-white text-xs">{value}</span>
                      </button>
                    );
                  })}
                </div>
                
                <div className="flex items-center">
                  <span className="text-white/60 text-xs">Highly Promising</span>
                  <ThumbsUp size={16} className="text-green-400 ml-1" />
                </div>
              </div>
              <div className="mt-2 text-center">
                <span className={`text-sm font-medium ${getRatingColor(newIdea.rating)}`}>
                  {getRatingLabel(newIdea.rating)}
                </span>
              </div>
            </div>
            
            <div>
              <label className="block text-white/70 mb-1 text-sm">Notes (Optional)</label>
              <Textarea 
                placeholder="Why might this counter-intuitive idea work? What strengths does it have?"
                className="bg-navy-light/50 border-white/20 text-white"
                value={newIdea.notes}
                onChange={(e) => setNewIdea({...newIdea, notes: e.target.value})}
              />
            </div>
          </div>
          
          <div className="mt-6 flex justify-end">
            <Button 
              className="bg-electric-blue hover:bg-electric-blue/90"
              onClick={handleAddIdea}
            >
              <Plus size={16} className="mr-2" />
              Add Counter-Intuitive Idea
            </Button>
          </div>
        </div>
      </div>
      
      <AiAgent />
    </div>
  );
};

export default CounterIntuition;
