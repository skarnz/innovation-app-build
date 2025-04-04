
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Box, 
  Cloud, 
  Code, 
  ChevronRight,
  Database,
  CheckCircle2, 
  Github, 
  LayoutDashboard, 
  Server
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import { useProductType } from '@/contexts/ProductTypeContext';
import AiAgent from '@/components/AiAgent';

const ProductionDeployment = () => {
  const { productType } = useProductType();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [deploying, setDeploying] = useState(false);
  const [step, setStep] = useState(1);

  const handleDeploy = () => {
    setDeploying(true);
    
    // Simulate deployment process
    setTimeout(() => {
      setStep(2);
      
      setTimeout(() => {
        setStep(3);
        
        setTimeout(() => {
          setDeploying(false);
          setStep(1);
          toast({
            title: "Deployment Successful",
            description: "Your product has been successfully deployed to production.",
          });
        }, 2000);
      }, 2000);
    }, 2000);
  };

  // If product type is not set, show message to complete setup
  if (!productType) {
    return (
      <div className="min-h-screen bg-navy p-6">
        <div className="container mx-auto px-4 py-8 max-w-5xl">
          <Card className="glass-card hover-glow">
            <CardHeader>
              <CardTitle className="text-2xl font-orbitron text-electric-blue">Please Complete Project Setup</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-white/70 mb-6">
                You need to select a product type in the Project Setup section before continuing with Production Deployment.
              </p>
              <Button 
                onClick={() => navigate('/project/setup')}
                className="bg-electric-blue hover:bg-electric-blue/90"
              >
                Go to Project Setup
                <ChevronRight size={16} className="ml-2" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-navy">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-white/60 mb-4">
            <Link to="/dashboard" className="hover:text-white flex items-center gap-1">
              <ArrowLeft size={16} />
              Back to Dashboard
            </Link>
            <span>/</span>
            <span>Production Deployment</span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-orbitron font-bold text-electric-blue mb-2">
            Production Deployment
          </h1>
          <p className="text-white/70">
            Configure and manage the production environment for your {productType} product.
          </p>
        </div>
        
        <Tabs defaultValue="deployment" className="space-y-8">
          <TabsList className="grid w-full grid-cols-3 h-12">
            <TabsTrigger value="deployment" className="text-base">Deployment</TabsTrigger>
            <TabsTrigger value="monitoring" className="text-base">Monitoring</TabsTrigger>
            <TabsTrigger value="scaling" className="text-base">Scaling</TabsTrigger>
          </TabsList>
          
          {/* Deployment Tab */}
          <TabsContent value="deployment">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Deployment Card */}
              <Card className="glass-card lg:col-span-2">
                <CardHeader>
                  <CardTitle className="text-2xl">Deployment Configuration</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {productType === 'software' && (
                    <>
                      <div className="space-y-2">
                        <h3 className="text-lg font-medium">Infrastructure Provider</h3>
                        <div className="grid grid-cols-2 gap-4">
                          <Button className="h-auto py-6 flex flex-col items-center gap-2 bg-navy-light hover:bg-navy-light/80">
                            <Cloud size={24} />
                            <span>AWS</span>
                          </Button>
                          <Button className="h-auto py-6 flex flex-col items-center gap-2 bg-navy-light hover:bg-navy-light/80">
                            <Cloud size={24} />
                            <span>Vercel</span>
                          </Button>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <h3 className="text-lg font-medium">Database Configuration</h3>
                        <div className="grid grid-cols-2 gap-4">
                          <Button className="h-auto py-6 flex flex-col items-center gap-2 bg-navy-light hover:bg-navy-light/80 border-2 border-electric-blue">
                            <Database size={24} />
                            <span>Supabase</span>
                            <span className="text-xs text-white/60">Recommended</span>
                          </Button>
                          <Button className="h-auto py-6 flex flex-col items-center gap-2 bg-navy-light hover:bg-navy-light/80">
                            <Database size={24} />
                            <span>MongoDB</span>
                          </Button>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <h3 className="text-lg font-medium">Source Control</h3>
                        <Button className="w-full justify-start gap-2 bg-navy-light hover:bg-navy-light/80">
                          <Github size={20} />
                          Connect to GitHub
                        </Button>
                      </div>
                      
                      <div className="space-y-2">
                        <h3 className="text-lg font-medium">Environment Variables</h3>
                        <div className="space-y-3">
                          <div className="grid grid-cols-3 gap-3">
                            <div className="col-span-1">
                              <Input placeholder="KEY" className="bg-navy-light border-white/10" />
                            </div>
                            <div className="col-span-2">
                              <Input placeholder="VALUE" className="bg-navy-light border-white/10" />
                            </div>
                          </div>
                          <Button variant="outline" className="w-full">Add Environment Variable</Button>
                        </div>
                      </div>
                    </>
                  )}
                  
                  {productType === 'physical' && (
                    <>
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Manufacturing Status</h3>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-green-400">
                            <CheckCircle2 size={18} />
                            <span>Production line configured</span>
                          </div>
                          <div className="flex items-center gap-2 text-green-400">
                            <CheckCircle2 size={18} />
                            <span>Quality assurance protocols established</span>
                          </div>
                          <div className="flex items-center gap-2 text-green-400">
                            <CheckCircle2 size={18} />
                            <span>Supply chain management integrated</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <h3 className="text-lg font-medium">Production Timeline</h3>
                        <div className="bg-navy-light p-4 rounded-lg">
                          <p className="text-white/70">Initial batch production estimated completion: <span className="text-white">June 15, 2023</span></p>
                          <p className="text-white/70 mt-2">Full-scale production start date: <span className="text-white">July 1, 2023</span></p>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <h3 className="text-lg font-medium">Inventory Management</h3>
                        <Button className="w-full justify-start gap-2 bg-navy-light hover:bg-navy-light/80">
                          <LayoutDashboard size={20} />
                          Configure Inventory System
                          <ChevronRight size={16} className="ml-auto" />
                        </Button>
                      </div>
                    </>
                  )}
                  
                  {productType === 'service' && (
                    <>
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Service Deployment Checklist</h3>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-green-400">
                            <CheckCircle2 size={18} />
                            <span>Staff training materials prepared</span>
                          </div>
                          <div className="flex items-center gap-2 text-green-400">
                            <CheckCircle2 size={18} />
                            <span>Service level agreements defined</span>
                          </div>
                          <div className="flex items-center gap-2 text-green-400">
                            <CheckCircle2 size={18} />
                            <span>Customer onboarding process established</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <h3 className="text-lg font-medium">Service Delivery Platform</h3>
                        <div className="grid grid-cols-2 gap-4">
                          <Button className="h-auto py-6 flex flex-col items-center gap-2 bg-navy-light hover:bg-navy-light/80 border-2 border-electric-blue">
                            <Cloud size={24} />
                            <span>Cloud-Based</span>
                            <span className="text-xs text-white/60">Recommended</span>
                          </Button>
                          <Button className="h-auto py-6 flex flex-col items-center gap-2 bg-navy-light hover:bg-navy-light/80">
                            <Server size={24} />
                            <span>On-Premise</span>
                          </Button>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <h3 className="text-lg font-medium">Client Management System</h3>
                        <Button className="w-full justify-start gap-2 bg-navy-light hover:bg-navy-light/80">
                          <LayoutDashboard size={20} />
                          Configure Client Portal
                          <ChevronRight size={16} className="ml-auto" />
                        </Button>
                      </div>
                    </>
                  )}
                  
                  <Separator className="my-6" />
                  
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Deployment Settings</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm text-white/70">Environment</label>
                        <div className="flex gap-2">
                          <Button variant="outline" className="flex-1">Staging</Button>
                          <Button className="flex-1 bg-electric-blue hover:bg-electric-blue/90">Production</Button>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm text-white/70">Region</label>
                        <div className="relative">
                          <Button variant="outline" className="w-full justify-between">
                            <span>US East (N. Virginia)</span>
                            <Database size={16} />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    onClick={handleDeploy} 
                    disabled={deploying}
                    className="w-full md:w-auto bg-electric-blue hover:bg-electric-blue/90"
                  >
                    {deploying ? `Deploying (Step ${step}/3)...` : 'Deploy to Production'}
                    <ChevronRight size={16} className="ml-2" />
                  </Button>
                </CardFooter>
              </Card>
              
              {/* Deployment History */}
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="text-xl">Deployment History</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-500"></span>
                        <span className="text-sm font-medium">v1.0.0-production</span>
                      </div>
                      <span className="text-xs text-white/60">Today</span>
                    </div>
                    <p className="text-xs text-white/60">Deployed by: You</p>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-500"></span>
                        <span className="text-sm font-medium">v0.9.5-staging</span>
                      </div>
                      <span className="text-xs text-white/60">Yesterday</span>
                    </div>
                    <p className="text-xs text-white/60">Deployed by: You</p>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                        <span className="text-sm font-medium">v0.9.0-staging</span>
                      </div>
                      <span className="text-xs text-white/60">3 days ago</span>
                    </div>
                    <p className="text-xs text-white/60">Deployed by: You</p>
                  </div>
                  
                  <Button variant="outline" className="w-full mt-4">View All Deployments</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          {/* Monitoring Tab */}
          <TabsContent value="monitoring">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-2xl">Monitoring & Observability</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-white/70">
                  Configure monitoring and alerts for your production environment.
                </p>
                <Button className="bg-electric-blue hover:bg-electric-blue/90">
                  <Code size={16} className="mr-2" />
                  Configure Monitoring Tools
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Scaling Tab */}
          <TabsContent value="scaling">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-2xl">Scaling Configuration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-white/70">
                  Set up automatic scaling rules and capacity planning for your production environment.
                </p>
                <Button className="bg-electric-blue hover:bg-electric-blue/90">
                  <ChevronRight size={16} className="mr-2" />
                  Configure Auto-Scaling
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      <AiAgent />
    </div>
  );
};

export default ProductionDeployment;
