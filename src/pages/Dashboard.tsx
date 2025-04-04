import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, ChevronRight, FileText, Layers, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { PageHeader } from '@/components/layout/PageHeader';

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const recentProjects = [
    {
      id: 1,
      name: 'Project Alpha',
      stage: 'Ideation',
      lastUpdated: '2 days ago',
      progress: 25
    },
    {
      id: 2,
      name: 'SaaS Platform',
      stage: 'Validation',
      lastUpdated: '5 days ago',
      progress: 50
    }
  ];
  
  return (
    <div className="space-y-8">
      <PageHeader 
        title="Dashboard"
        actions={
          <div className="flex gap-2">
             <div className="relative flex-grow md:flex-grow-0 md:w-64">
               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
               <Input 
                 className="pl-10"
                 placeholder="Search projects..."
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
               />
             </div>
             <Link to="/project/setup">
               <Button className="bg-electric-blue hover:bg-electric-blue/90">
                 <Plus size={18} className="mr-2" /> New Project
               </Button>
             </Link>
          </div>
        }
      />

      <div className="px-8">
        <div className="mb-8">
          <h2 className="text-2xl font-orbitron font-semibold text-white mb-4">Getting Started</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="glass-card bg-navy-light border-white/10 hover:border-electric-blue/40 transition-all">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-electric-blue/20 flex items-center justify-center">
                    <Plus size={18} className="text-electric-blue" />
                  </div>
                  New Project Setup
                </CardTitle>
                <CardDescription>
                  Configure your project type and start building
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-white/70">
                  Define your product type (physical, software, or service) and start your entrepreneurial journey.
                </p>
              </CardContent>
              <CardFooter>
                <Link to="/project/setup" className="w-full">
                  <Button variant="outline" className="w-full border-white/20 text-white hover:bg-navy-dark">
                    Get Started <ChevronRight size={16} className="ml-2" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
            
            <Card className="glass-card bg-navy-light border-white/10 hover:border-electric-blue/40 transition-all">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-electric-blue/20 flex items-center justify-center">
                    <FileText size={18} className="text-electric-blue" />
                  </div>
                  Documentation
                </CardTitle>
                <CardDescription>
                  Learn how to use BUILD
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-white/70">
                  Explore our documentation and guides to get the most out of BUILD.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full border-white/20 text-white hover:bg-navy-dark">
                  View Docs <ChevronRight size={16} className="ml-2" />
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="glass-card bg-navy-light border-white/10 hover:border-electric-blue/40 transition-all">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-electric-blue/20 flex items-center justify-center">
                    <Layers size={18} className="text-electric-blue" />
                  </div>
                  Templates
                </CardTitle>
                <CardDescription>
                  Start with a pre-built template
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-white/70">
                  Jump-start your project with our pre-configured templates for various types of businesses.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full border-white/20 text-white hover:bg-navy-dark">
                  Browse Templates <ChevronRight size={16} className="ml-2" />
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
        
        <div>
          <h2 className="text-2xl font-orbitron font-semibold text-white mb-4">Recent Projects</h2>
          
          <div className="space-y-4">
            {recentProjects.map((project) => (
              <Card key={project.id} className="glass-card bg-navy-light border-white/10 hover:border-electric-blue/40 transition-all">
                <div className="flex flex-col md:flex-row md:items-center justify-between p-4">
                  <div className="mb-4 md:mb-0">
                    <h3 className="text-lg font-medium text-white">{project.name}</h3>
                    <div className="flex items-center gap-2 text-white/60 text-sm mt-1">
                      <span>Stage: {project.stage}</span>
                      <span>•</span>
                      <span>Updated {project.lastUpdated}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="hidden md:flex items-center gap-2">
                      <div className="w-32 h-2 bg-navy-dark rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-electric-blue" 
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-white/60 text-sm">{project.progress}%</span>
                    </div>
                    
                    <Link to="/project/overview">
                      <Button variant="outline" className="border-white/20 text-white hover:bg-navy-dark">
                        Open Project
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
            
            {recentProjects.length === 0 && (
              <div className="text-center py-8">
                <Activity size={48} className="mx-auto text-white/20 mb-4" />
                <p className="text-white/60">No recent projects found</p>
                <p className="text-white/40 text-sm mt-2">Create a new project to get started</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
