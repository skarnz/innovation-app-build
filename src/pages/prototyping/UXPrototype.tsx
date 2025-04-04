import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Plus, Upload, Download, Trash, Monitor, Save, Layers, Smartphone, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import AiAgent from '@/components/AiAgent';
import { toast } from '@/components/ui/use-toast';

interface ScreenTemplate {
  id: number;
  name: string;
  device: 'desktop' | 'mobile' | 'tablet';
  description: string;
  thumbnailUrl: string;
}

const templates: ScreenTemplate[] = [
  {
    id: 1,
    name: "Login Screen",
    device: "desktop",
    description: "User authentication screen with email and password fields",
    thumbnailUrl: "https://via.placeholder.com/200x150?text=Login+Screen"
  },
  {
    id: 2,
    name: "Dashboard",
    device: "desktop",
    description: "Main dashboard with statistics and navigation",
    thumbnailUrl: "https://via.placeholder.com/200x150?text=Dashboard"
  },
  {
    id: 3,
    name: "User Profile",
    device: "mobile",
    description: "User profile settings and information",
    thumbnailUrl: "https://via.placeholder.com/200x150?text=User+Profile"
  },
  {
    id: 4,
    name: "Product List",
    device: "tablet",
    description: "List of products with filtering options",
    thumbnailUrl: "https://via.placeholder.com/200x150?text=Product+List"
  }
];

interface PrototypeScreen {
  id: number;
  name: string;
  description: string;
  device: 'desktop' | 'mobile' | 'tablet';
  imageUrl: string;
  createdAt: Date;
}

const UXPrototype = () => {
  const [screens, setScreens] = useState<PrototypeScreen[]>([
    {
      id: 1,
      name: "Home Page",
      description: "Main landing page with feature highlights",
      device: "desktop",
      imageUrl: "https://via.placeholder.com/800x600?text=Home+Page+Prototype",
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // 7 days ago
    },
    {
      id: 2,
      name: "Sign Up Flow",
      description: "New user registration process",
      device: "mobile",
      imageUrl: "https://via.placeholder.com/400x800?text=Sign+Up+Flow",
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) // 3 days ago
    }
  ]);
  
  const [activeScreenId, setActiveScreenId] = useState<number | null>(1);
  const [selectedTemplateId, setSelectedTemplateId] = useState<number | null>(null);
  
  const activeScreen = screens.find(s => s.id === activeScreenId);
  
  const handleAddScreen = () => {
    if (selectedTemplateId) {
      const template = templates.find(t => t.id === selectedTemplateId);
      if (template) {
        const newScreen: PrototypeScreen = {
          id: screens.length > 0 ? Math.max(...screens.map(s => s.id)) + 1 : 1,
          name: template.name,
          description: template.description,
          device: template.device,
          imageUrl: template.thumbnailUrl,
          createdAt: new Date()
        };
        
        setScreens([...screens, newScreen]);
        setActiveScreenId(newScreen.id);
        setSelectedTemplateId(null);
        
        toast({
          description: "New screen added to prototype"
        });
      }
    }
  };
  
  const handleDeleteScreen = (id: number) => {
    setScreens(screens.filter(s => s.id !== id));
    
    if (activeScreenId === id) {
      setActiveScreenId(screens.length > 1 ? screens[0].id : null);
    }
    
    toast({
      description: "Screen deleted from prototype"
    });
  };
  
  const handleUploadImage = () => {
    toast({
      description: "Image upload feature would be implemented here"
    });
  };
  
  const handleExportPrototype = () => {
    toast({
      description: "Prototype exported successfully"
    });
  };
  
  const getDeviceIcon = (device: 'desktop' | 'mobile' | 'tablet') => {
    switch (device) {
      case 'desktop':
        return <Monitor size={16} />;
      case 'mobile':
        return <Smartphone size={16} />;
      case 'tablet':
        return <Monitor size={16} />;
    }
  };
  
  return (
    <div className="min-h-screen bg-navy pb-20">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <div className="flex items-center gap-2 text-white/60 mb-4">
            <Link to="/project/prototype" className="hover:text-white flex items-center gap-1">
              <ArrowLeft size={16} />
              Back to Prototyping
            </Link>
            <span>/</span>
            <span>UX Prototype</span>
          </div>
          
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl md:text-4xl font-orbitron font-bold text-electric-blue mb-2">
                User Experience Prototype
              </h1>
              <p className="text-white/70">
                Create and manage wireframes and UI mockups
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                className="border-white/20 text-white"
                onClick={handleUploadImage}
              >
                <Upload size={16} className="mr-2" />
                Upload Screen
              </Button>
              
              <Button 
                className="bg-electric-blue hover:bg-electric-blue/90"
                onClick={handleExportPrototype}
              >
                <Download size={16} className="mr-2" />
                Export Prototype
              </Button>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <div className="glass-card p-4">
              <h2 className="text-lg font-medium text-white mb-3">Prototype Screens</h2>
              
              <div className="space-y-2 mb-4">
                {screens.map((screen) => (
                  <button
                    key={screen.id}
                    className={`w-full text-left p-3 rounded-md transition-colors ${
                      activeScreenId === screen.id 
                        ? 'bg-electric-blue/20 text-white' 
                        : 'bg-navy-light/30 text-white/70 hover:bg-navy-light/50'
                    }`}
                    onClick={() => setActiveScreenId(screen.id)}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-medium">{screen.name}</div>
                        <div className="flex items-center gap-1 text-xs text-white/50 mt-1">
                          {getDeviceIcon(screen.device)}
                          <span>{screen.device.charAt(0).toUpperCase() + screen.device.slice(1)}</span>
                        </div>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-7 w-7 text-white/50 hover:text-white hover:bg-white/10"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteScreen(screen.id);
                        }}
                      >
                        <Trash size={14} />
                      </Button>
                    </div>
                  </button>
                ))}
              </div>
              
              <h3 className="text-sm font-medium text-white/70 mb-2">Add from Template</h3>
              
              <div className="space-y-2">
                {templates.map((template) => (
                  <button
                    key={template.id}
                    className={`w-full text-left p-3 rounded-md transition-colors ${
                      selectedTemplateId === template.id 
                        ? 'bg-electric-blue/20 text-white' 
                        : 'bg-navy-light/30 text-white/70 hover:bg-navy-light/50'
                    }`}
                    onClick={() => setSelectedTemplateId(template.id)}
                  >
                    <div className="flex items-center gap-2">
                      {getDeviceIcon(template.device)}
                      <span>{template.name}</span>
                    </div>
                    <div className="text-xs text-white/50 mt-1">
                      {template.description}
                    </div>
                  </button>
                ))}
              </div>
              
              <Button 
                className="w-full bg-electric-blue hover:bg-electric-blue/90 mt-3"
                onClick={handleAddScreen}
                disabled={!selectedTemplateId}
              >
                <Plus size={16} className="mr-1" />
                Add Selected Template
              </Button>
            </div>
          </div>
          
          <div className="lg:col-span-3">
            {activeScreen ? (
              <div className="glass-card p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-xl font-medium text-white">{activeScreen.name}</h2>
                    <div className="flex items-center gap-2 text-white/60 text-sm mt-1">
                      <div className="flex items-center gap-1">
                        {getDeviceIcon(activeScreen.device)}
                        <span>{activeScreen.device.charAt(0).toUpperCase() + activeScreen.device.slice(1)}</span>
                      </div>
                      <span>•</span>
                      <div>Created: {activeScreen.createdAt.toLocaleDateString()}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="outline" 
                      className="border-white/20 text-white"
                    >
                      <Edit size={16} className="mr-2" />
                      Edit Screen
                    </Button>
                    <Button 
                      className="bg-electric-blue hover:bg-electric-blue/90"
                    >
                      <Save size={16} className="mr-2" />
                      Save Changes
                    </Button>
                  </div>
                </div>
                
                <p className="text-white/70 mb-4">{activeScreen.description}</p>
                
                <div className="bg-navy-light/40 rounded-lg p-4 flex items-center justify-center">
                  <img 
                    src={activeScreen.imageUrl} 
                    alt={activeScreen.name}
                    className="max-w-full object-contain border border-white/10 rounded shadow-lg"
                  />
                </div>
                
                <div className="mt-4">
                  <h3 className="text-lg font-medium text-white mb-2">Screen Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white/70 mb-1 text-sm">Screen Name</label>
                      <Input 
                        defaultValue={activeScreen.name}
                        className="bg-navy-light/50 border-white/20 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-white/70 mb-1 text-sm">Device Type</label>
                      <div className="flex gap-2">
                        {(['desktop', 'mobile', 'tablet'] as const).map((device) => (
                          <Button 
                            key={device}
                            variant={activeScreen.device === device ? 'default' : 'outline'}
                            className={
                              activeScreen.device === device 
                                ? 'bg-electric-blue' 
                                : 'border-white/20 text-white'
                            }
                          >
                            {getDeviceIcon(device)}
                            <span className="ml-2">{device.charAt(0).toUpperCase() + device.slice(1)}</span>
                          </Button>
                        ))}
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-white/70 mb-1 text-sm">Description</label>
                      <Textarea 
                        defaultValue={activeScreen.description}
                        className="bg-navy-light/50 border-white/20 text-white"
                        rows={3}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="glass-card p-6 flex flex-col items-center justify-center h-[400px]">
                <Layers size={48} className="text-white/20 mb-4" />
                <h2 className="text-xl font-medium text-white mb-2">No Screen Selected</h2>
                <p className="text-white/60 mb-4 text-center">
                  Select a screen from the sidebar or add a new one from templates
                </p>
                <Button 
                  className="bg-electric-blue hover:bg-electric-blue/90"
                  onClick={() => selectedTemplateId && handleAddScreen()}
                  disabled={!selectedTemplateId}
                >
                  <Plus size={16} className="mr-2" />
                  Add Selected Template
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <AiAgent />
    </div>
  );
};

export default UXPrototype;
