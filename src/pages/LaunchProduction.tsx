
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Box, ChevronRight, CloudCog, Code, ExternalLink, Github, MonitorSmartphone, Server } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useProductType } from '@/contexts/ProductTypeContext';
import AiAgent from '@/components/AiAgent';

const LaunchProduction = () => {
  const { productType } = useProductType();
  const [activeTab, setActiveTab] = useState('hosting');
  
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
                You need to select a product type in the Project Setup section before continuing with Launch.
              </p>
              <Button 
                onClick={() => window.location.href = '/project/setup'}
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
            <span>Launch & Production</span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-orbitron font-bold text-electric-blue mb-2">
            Launch & Production
          </h1>
          <p className="text-white/70">
            Deploy your {productType} product and prepare for launch
          </p>
        </div>
        
        <Tabs defaultValue="hosting" className="space-y-8" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 h-12">
            <TabsTrigger value="hosting" className="text-base">Hosting & Deployment</TabsTrigger>
            <TabsTrigger value="integrations" className="text-base">Integrations</TabsTrigger>
            <TabsTrigger value="pilot" className="text-base">Pilot Program</TabsTrigger>
          </TabsList>
          
          {/* Hosting & Deployment Tab */}
          <TabsContent value="hosting">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-2xl">Hosting & Deployment</CardTitle>
                <CardDescription>
                  {productType === 'software' 
                    ? 'Configure hosting and deploy your software application' 
                    : productType === 'physical' 
                      ? 'Set up manufacturing and production for your physical product'
                      : 'Prepare your service infrastructure for launch'}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {productType === 'software' && (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <Card className="bg-navy-light/50 hover:bg-navy-light/70 transition-colors border-white/10 cursor-pointer group">
                        <CardHeader>
                          <div className="rounded-full w-12 h-12 flex items-center justify-center bg-blue-950 mb-4">
                            <Server className="text-blue-500" size={24} />
                          </div>
                          <CardTitle className="text-xl">AWS/Cloudflare</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-white/70 mb-4">
                            Deploy to Amazon Web Services or Cloudflare Pages for scalable infrastructure
                          </p>
                          <Button variant="outline" className="border-white/10 group-hover:border-white/30 w-full mt-2">
                            Configure <ExternalLink size={14} className="ml-2" />
                          </Button>
                        </CardContent>
                      </Card>
                      
                      <Card className="bg-navy-light/50 hover:bg-navy-light/70 transition-colors border-white/10 cursor-pointer group">
                        <CardHeader>
                          <div className="rounded-full w-12 h-12 flex items-center justify-center bg-purple-950 mb-4">
                            <MonitorSmartphone className="text-purple-500" size={24} />
                          </div>
                          <CardTitle className="text-xl">Vercel</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-white/70 mb-4">
                            Easy deployment with preview environments and global CDN
                          </p>
                          <Button variant="outline" className="border-white/10 group-hover:border-white/30 w-full mt-2">
                            Configure <ExternalLink size={14} className="ml-2" />
                          </Button>
                        </CardContent>
                      </Card>
                      
                      <Card className="bg-navy-light/50 hover:bg-navy-light/70 transition-colors border-white/10 cursor-pointer group">
                        <CardHeader>
                          <div className="rounded-full w-12 h-12 flex items-center justify-center bg-green-950 mb-4">
                            <CloudCog className="text-green-500" size={24} />
                          </div>
                          <CardTitle className="text-xl">Custom Hosting</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-white/70 mb-4">
                            Configure custom hosting or other deployment options
                          </p>
                          <Button variant="outline" className="border-white/10 group-hover:border-white/30 w-full mt-2">
                            Configure <ExternalLink size={14} className="ml-2" />
                          </Button>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <div className="mt-8">
                      <h3 className="text-xl font-medium mb-4">Deployment Configuration</h3>
                      <div className="bg-navy-light/50 p-6 rounded-lg border border-white/10">
                        <p className="text-white/70 mb-4">
                          Connect your codebase to your chosen hosting provider and set up continuous deployment
                        </p>
                        <div className="space-y-4">
                          <Button variant="outline" className="gap-2 w-full justify-start">
                            <Github size={18} /> Connect GitHub Repository
                          </Button>
                          <Button variant="outline" className="gap-2 w-full justify-start">
                            <Code size={18} /> Configure Build Settings
                          </Button>
                          <Button variant="outline" className="gap-2 w-full justify-start">
                            <Server size={18} /> Set Up Environment Variables
                          </Button>
                        </div>
                      </div>
                    </div>
                  </>
                )}
                
                {productType === 'physical' && (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card className="bg-navy-light/50 hover:bg-navy-light/70 transition-colors border-white/10">
                        <CardHeader>
                          <div className="rounded-full w-12 h-12 flex items-center justify-center bg-blue-950 mb-4">
                            <Box className="text-blue-500" size={24} />
                          </div>
                          <CardTitle className="text-xl">Manufacturing Setup</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-white/70 mb-4">
                            Configure your manufacturing process and supply chain for your physical product
                          </p>
                          <div className="space-y-4">
                            <Button variant="outline" className="gap-2 w-full justify-start">
                              <Box size={18} /> Configure Manufacturing Process
                            </Button>
                            <Button variant="outline" className="gap-2 w-full justify-start">
                              <Box size={18} /> Set Up Supply Chain
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card className="bg-navy-light/50 hover:bg-navy-light/70 transition-colors border-white/10">
                        <CardHeader>
                          <div className="rounded-full w-12 h-12 flex items-center justify-center bg-purple-950 mb-4">
                            <Box className="text-purple-500" size={24} />
                          </div>
                          <CardTitle className="text-xl">Production Planning</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-white/70 mb-4">
                            Plan your production timeline, quantities, and quality control process
                          </p>
                          <div className="space-y-4">
                            <Button variant="outline" className="gap-2 w-full justify-start">
                              <Box size={18} /> Create Production Timeline
                            </Button>
                            <Button variant="outline" className="gap-2 w-full justify-start">
                              <Box size={18} /> Set Up Quality Control
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </>
                )}
                
                {productType === 'service' && (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card className="bg-navy-light/50 hover:bg-navy-light/70 transition-colors border-white/10">
                        <CardHeader>
                          <CardTitle className="text-xl">Service Delivery Planning</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-white/70 mb-4">
                            Set up your service delivery process and required infrastructure
                          </p>
                          <div className="space-y-4">
                            <Button variant="outline" className="gap-2 w-full justify-start">
                              Configure Service Process
                            </Button>
                            <Button variant="outline" className="gap-2 w-full justify-start">
                              Set Up Delivery Infrastructure
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card className="bg-navy-light/50 hover:bg-navy-light/70 transition-colors border-white/10">
                        <CardHeader>
                          <CardTitle className="text-xl">Operations Setup</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-white/70 mb-4">
                            Plan your operational processes, team structure, and quality control
                          </p>
                          <div className="space-y-4">
                            <Button variant="outline" className="gap-2 w-full justify-start">
                              Create Operations Manual
                            </Button>
                            <Button variant="outline" className="gap-2 w-full justify-start">
                              Set Up Quality Assurance
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </>
                )}
              </CardContent>
              <CardFooter className="border-t border-white/10 pt-4 flex justify-between">
                <Button variant="outline" className="border-white/20" disabled={activeTab === 'hosting'}>
                  Back
                </Button>
                <Button 
                  className="bg-electric-blue hover:bg-electric-blue/90"
                  onClick={() => setActiveTab('integrations')}
                >
                  Next: Integrations
                  <ChevronRight size={16} className="ml-2" />
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          {/* Integrations Tab */}
          <TabsContent value="integrations">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-2xl">Integrations</CardTitle>
                <CardDescription>
                  Connect your project with essential services and tools
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="bg-navy-light/50 hover:bg-navy-light/70 transition-colors border-white/10 cursor-pointer group">
                    <CardHeader>
                      <div className="rounded-full w-12 h-12 flex items-center justify-center bg-black mb-4">
                        <Github className="text-white" size={24} />
                      </div>
                      <CardTitle className="text-xl">GitHub</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-white/70 mb-4">
                        Connect to GitHub for version control and code repository management
                      </p>
                      <Button variant="outline" className="border-white/10 group-hover:border-white/30 w-full mt-2">
                        Connect <ExternalLink size={14} className="ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-navy-light/50 hover:bg-navy-light/70 transition-colors border-white/10 cursor-pointer group">
                    <CardHeader>
                      <div className="rounded-full w-12 h-12 flex items-center justify-center bg-emerald-950 mb-4">
                        <Server className="text-emerald-500" size={24} />
                      </div>
                      <CardTitle className="text-xl">Supabase</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-white/70 mb-4">
                        Integrate with Supabase for backend services and database management
                      </p>
                      <Button variant="outline" className="border-white/10 group-hover:border-white/30 w-full mt-2">
                        Connect <ExternalLink size={14} className="ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-navy-light/50 hover:bg-navy-light/70 transition-colors border-white/10 cursor-pointer group">
                    <CardHeader>
                      <div className="rounded-full w-12 h-12 flex items-center justify-center bg-purple-950 mb-4">
                        <CloudCog className="text-purple-500" size={24} />
                      </div>
                      <CardTitle className="text-xl">Additional Services</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-white/70 mb-4">
                        Connect additional services based on your project needs
                      </p>
                      <Button variant="outline" className="border-white/10 group-hover:border-white/30 w-full mt-2">
                        Browse Services <ExternalLink size={14} className="ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="mt-8">
                  <h3 className="text-xl font-medium mb-4">In-Picture Development</h3>
                  <div className="bg-navy-light/50 p-6 rounded-lg border border-white/10">
                    <p className="text-white/70 mb-4">
                      Access your development environment directly within the platform
                    </p>
                    <div className="space-y-4">
                      <Button variant="outline" className="gap-2 w-full justify-start">
                        <Code size={18} /> Open Development Environment
                      </Button>
                      <Button variant="outline" className="gap-2 w-full justify-start">
                        <CloudCog size={18} /> Configure Development Settings
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t border-white/10 pt-4 flex justify-between">
                <Button 
                  variant="outline" 
                  className="border-white/20"
                  onClick={() => setActiveTab('hosting')}
                >
                  Back
                </Button>
                <Button 
                  className="bg-electric-blue hover:bg-electric-blue/90"
                  onClick={() => setActiveTab('pilot')}
                >
                  Next: Pilot Program
                  <ChevronRight size={16} className="ml-2" />
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          {/* Pilot Program Tab */}
          <TabsContent value="pilot">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-2xl">Pilot Program</CardTitle>
                <CardDescription>
                  Set up an early access or pilot program to gather initial feedback
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="bg-navy-light/50 border-white/10">
                    <CardHeader>
                      <CardTitle className="text-xl">Pilot Program Setup</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-white/70 mb-4">
                        Define the scope, timeline, and goals for your pilot program
                      </p>
                      <div className="space-y-4">
                        <Button variant="outline" className="gap-2 w-full justify-start">
                          Define Pilot Scope
                        </Button>
                        <Button variant="outline" className="gap-2 w-full justify-start">
                          Set Timeline
                        </Button>
                        <Button variant="outline" className="gap-2 w-full justify-start">
                          Establish Success Metrics
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-navy-light/50 border-white/10">
                    <CardHeader>
                      <CardTitle className="text-xl">Participant Recruitment</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-white/70 mb-4">
                        Recruit participants from your target market for your pilot program
                      </p>
                      <div className="space-y-4">
                        <Button variant="outline" className="gap-2 w-full justify-start">
                          Define Ideal Participants
                        </Button>
                        <Button variant="outline" className="gap-2 w-full justify-start">
                          Create Recruitment Plan
                        </Button>
                        <Button variant="outline" className="gap-2 w-full justify-start">
                          Set Up Application Process
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="mt-8">
                  <h3 className="text-xl font-medium mb-4">Feedback Collection</h3>
                  <div className="bg-navy-light/50 p-6 rounded-lg border border-white/10">
                    <p className="text-white/70 mb-4">
                      Plan how you'll collect and analyze feedback from your pilot participants
                    </p>
                    <div className="space-y-4">
                      <Button variant="outline" className="gap-2 w-full justify-start">
                        Create Feedback Forms
                      </Button>
                      <Button variant="outline" className="gap-2 w-full justify-start">
                        Set Up User Testing Process
                      </Button>
                      <Button variant="outline" className="gap-2 w-full justify-start">
                        Plan Analysis Methods
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t border-white/10 pt-4 flex justify-between">
                <Button 
                  variant="outline" 
                  className="border-white/20"
                  onClick={() => setActiveTab('integrations')}
                >
                  Back
                </Button>
                <Button 
                  className="bg-electric-blue hover:bg-electric-blue/90"
                  onClick={() => window.location.href = '/project/marketing'}
                >
                  Continue to Marketing
                  <ChevronRight size={16} className="ml-2" />
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      <AiAgent />
    </div>
  );
};

export default LaunchProduction;
