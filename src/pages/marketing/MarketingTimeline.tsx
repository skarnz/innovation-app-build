
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Plus, Calendar, Clock, Tag, X, Save, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import AiAgent from '@/components/AiAgent';
import { toast } from '@/components/ui/use-toast';

// Task types
type TaskType = 'content' | 'social' | 'email' | 'pr' | 'advertising';

// Task interface
interface MarketingTask {
  id: number;
  title: string;
  description: string;
  startDate: string;
  duration: number; // in days
  type: TaskType;
}

const taskTypeColors: Record<TaskType, string> = {
  content: 'bg-blue-500/20 text-blue-300',
  social: 'bg-purple-500/20 text-purple-300',
  email: 'bg-green-500/20 text-green-300',
  pr: 'bg-yellow-500/20 text-yellow-300',
  advertising: 'bg-red-500/20 text-red-300'
};

const taskTypeLabels: Record<TaskType, string> = {
  content: 'Content Creation',
  social: 'Social Media',
  email: 'Email Marketing',
  pr: 'PR & Outreach',
  advertising: 'Paid Advertising'
};

const MarketingTimeline = () => {
  const [tasks, setTasks] = useState<MarketingTask[]>([
    { 
      id: 1, 
      title: 'Website Launch Announcement',
      description: 'Create blog post and social announcements for website launch',
      startDate: '2023-11-15',
      duration: 7,
      type: 'content'
    },
    { 
      id: 2, 
      title: 'Product Hunt Launch',
      description: 'Prepare and schedule Product Hunt launch campaign',
      startDate: '2023-11-25',
      duration: 3,
      type: 'pr'
    },
    { 
      id: 3, 
      title: 'Email Newsletter #1',
      description: 'Send first newsletter to early subscribers',
      startDate: '2023-12-01',
      duration: 1,
      type: 'email'
    }
  ]);
  
  const [newTask, setNewTask] = useState<Omit<MarketingTask, 'id'>>({
    title: '',
    description: '',
    startDate: '',
    duration: 1,
    type: 'content'
  });
  
  const [editingId, setEditingId] = useState<number | null>(null);
  
  const handleAddTask = () => {
    if (!newTask.title || !newTask.startDate) {
      toast({
        description: "Title and start date are required",
        variant: "destructive"
      });
      return;
    }
    
    const id = tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1;
    setTasks([...tasks, { ...newTask, id }]);
    setNewTask({
      title: '',
      description: '',
      startDate: '',
      duration: 1,
      type: 'content'
    });
    
    toast({
      description: "Marketing task added successfully!"
    });
  };
  
  const handleDeleteTask = (id: number) => {
    setTasks(tasks.filter(t => t.id !== id));
    toast({
      description: "Task deleted"
    });
  };
  
  const handleEditTask = (task: MarketingTask) => {
    setEditingId(task.id);
    setNewTask({
      title: task.title,
      description: task.description,
      startDate: task.startDate,
      duration: task.duration,
      type: task.type
    });
  };
  
  const handleUpdateTask = () => {
    if (editingId) {
      setTasks(tasks.map(t => 
        t.id === editingId ? { ...t, ...newTask, id: editingId } : t
      ));
      setEditingId(null);
      setNewTask({
        title: '',
        description: '',
        startDate: '',
        duration: 1,
        type: 'content'
      });
      
      toast({
        description: "Task updated successfully!"
      });
    }
  };
  
  // Helper to format dates
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };
  
  // Calculate end date
  const calculateEndDate = (startDate: string, durationDays: number) => {
    const date = new Date(startDate);
    date.setDate(date.getDate() + durationDays - 1); // -1 because the start day counts
    return formatDate(date.toISOString());
  };

  return (
    <div className="min-h-screen bg-navy pb-20">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <div className="flex items-center gap-2 text-white/60 mb-4">
            <Link to="/project/marketing" className="hover:text-white flex items-center gap-1">
              <ArrowLeft size={16} />
              Back to Marketing
            </Link>
            <span>/</span>
            <span>Marketing Timeline</span>
          </div>
          
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl md:text-4xl font-orbitron font-bold text-electric-blue mb-2">
                Marketing Timeline
              </h1>
              <p className="text-white/70">
                Schedule and manage your marketing activities
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              <Button 
                className="bg-electric-blue hover:bg-electric-blue/90"
                onClick={() => toast({ description: "Timeline saved to project" })}
              >
                <Save size={16} className="mr-2" />
                Save Timeline
              </Button>
            </div>
          </div>
        </div>
        
        {/* Timeline Visualization */}
        <div className="glass-card p-6 mb-8">
          <h2 className="text-xl font-medium text-white mb-4">Marketing Campaign Timeline</h2>
          
          <div className="relative overflow-x-auto">
            <div className="min-w-[800px]">
              {/* Timeline Header */}
              <div className="flex border-b border-white/10 pb-3 mb-4">
                <div className="w-1/4 text-white/70 font-medium">Task</div>
                <div className="w-1/4 text-white/70 font-medium">Type</div>
                <div className="w-1/4 text-white/70 font-medium">Timeline</div>
                <div className="w-1/4 text-white/70 font-medium">Actions</div>
              </div>
              
              {/* Timeline Tasks */}
              <div className="space-y-4">
                {tasks.map((task) => (
                  <div key={task.id} className="flex items-center bg-navy-light/40 rounded-lg p-3 border border-white/10">
                    <div className="w-1/4">
                      <h3 className="text-white font-medium">{task.title}</h3>
                      <p className="text-white/60 text-sm">{task.description}</p>
                    </div>
                    
                    <div className="w-1/4">
                      <span className={`text-xs px-2 py-1 rounded-full ${taskTypeColors[task.type]}`}>
                        {taskTypeLabels[task.type]}
                      </span>
                    </div>
                    
                    <div className="w-1/4">
                      <div className="flex items-center text-white/70 text-sm">
                        <Calendar size={14} className="mr-1" />
                        <span>{formatDate(task.startDate)} - {calculateEndDate(task.startDate, task.duration)}</span>
                      </div>
                      <div className="flex items-center text-white/70 text-sm mt-1">
                        <Clock size={14} className="mr-1" />
                        <span>{task.duration} day{task.duration !== 1 ? 's' : ''}</span>
                      </div>
                    </div>
                    
                    <div className="w-1/4 flex items-center gap-2">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-white/70 hover:bg-white/10"
                        onClick={() => handleEditTask(task)}
                      >
                        <Edit size={16} />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-white/70 hover:bg-white/10"
                        onClick={() => handleDeleteTask(task.id)}
                      >
                        <X size={16} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Add/Edit Task Form */}
        <div className="glass-card p-6">
          <h2 className="text-xl font-medium text-white mb-4">
            {editingId ? 'Edit Task' : 'Add New Marketing Task'}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-white/70 mb-1 text-sm">Task Title</label>
                <Input 
                  placeholder="Enter task title"
                  className="bg-navy-light/50 border-white/20 text-white"
                  value={newTask.title}
                  onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-white/70 mb-1 text-sm">Description</label>
                <Textarea 
                  placeholder="Describe the marketing task"
                  className="bg-navy-light/50 border-white/20 text-white min-h-[100px]"
                  value={newTask.description}
                  onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-white/70 mb-1 text-sm">Task Type</label>
                <div className="flex flex-wrap gap-2">
                  {(Object.keys(taskTypeLabels) as TaskType[]).map((type) => (
                    <Button 
                      key={type}
                      type="button"
                      variant={newTask.type === type ? 'default' : 'outline'}
                      className={
                        newTask.type === type 
                          ? 'bg-electric-blue' 
                          : 'border-white/20 text-white'
                      }
                      onClick={() => setNewTask({...newTask, type})}
                    >
                      {taskTypeLabels[type]}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-white/70 mb-1 text-sm">Start Date</label>
                <Input 
                  type="date"
                  className="bg-navy-light/50 border-white/20 text-white"
                  value={newTask.startDate}
                  onChange={(e) => setNewTask({...newTask, startDate: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-white/70 mb-1 text-sm">Duration (days)</label>
                <Input 
                  type="number"
                  min="1"
                  className="bg-navy-light/50 border-white/20 text-white"
                  value={newTask.duration}
                  onChange={(e) => setNewTask({...newTask, duration: parseInt(e.target.value) || 1})}
                />
              </div>
              
              <div className="flex justify-end mt-8">
                {editingId ? (
                  <>
                    <Button 
                      variant="outline" 
                      className="border-white/20 text-white mr-2"
                      onClick={() => {
                        setEditingId(null);
                        setNewTask({
                          title: '',
                          description: '',
                          startDate: '',
                          duration: 1,
                          type: 'content'
                        });
                      }}
                    >
                      Cancel
                    </Button>
                    <Button 
                      className="bg-electric-blue hover:bg-electric-blue/90"
                      onClick={handleUpdateTask}
                    >
                      Update Task
                    </Button>
                  </>
                ) : (
                  <Button 
                    className="bg-electric-blue hover:bg-electric-blue/90"
                    onClick={handleAddTask}
                  >
                    <Plus size={16} className="mr-2" />
                    Add Task
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <AiAgent />
    </div>
  );
};

export default MarketingTimeline;
