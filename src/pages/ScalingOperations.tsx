
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, TrendingUp, BarChart2, Settings, Users, LineChart, Scale, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AiAgent from '@/components/AiAgent';

const ScalingOperations = () => {
  const [scalingPlan, setScalingPlan] = useState('');
  const [internalProcesses, setInternalProcesses] = useState('');
  const [metrics, setMetrics] = useState('');
  const [teamExpansion, setTeamExpansion] = useState('');
  
  return (
    <div className="min-h-screen bg-navy">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-white/60 mb-4">
            <Link to="/project/marketing" className="hover:text-white flex items-center gap-1">
              <ArrowLeft size={16} />
              Back to Marketing
            </Link>
            <span>/</span>
            <span>Scaling & Operations</span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-orbitron font-bold text-electric-blue mb-2">
            Scaling & Ongoing Operations
          </h1>
          <p className="text-white/70">
            Plan for scaling your business, optimize internal processes, and set up key metrics for monitoring growth.
          </p>
        </div>
        
        <Tabs defaultValue="scaling" className="w-full">
          <TabsList className="mb-6 bg-navy-light/50">
            <TabsTrigger value="scaling" className="data-[state=active]:bg-electric-blue">
              Scaling Plan
            </TabsTrigger>
            <TabsTrigger value="processes" className="data-[state=active]:bg-electric-blue">
              Internal Processes
            </TabsTrigger>
            <TabsTrigger value="metrics" className="data-[state=active]:bg-electric-blue">
              Key Metrics
            </TabsTrigger>
            <TabsTrigger value="team" className="data-[state=active]:bg-electric-blue">
              Team Expansion
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="scaling">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp size={20} className="text-electric-blue" />
                  Scaling Strategy
                </CardTitle>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-medium text-white mb-3">Growth Planning</h3>
                      <Textarea 
                        value={scalingPlan}
                        onChange={(e) => setScalingPlan(e.target.value)}
                        placeholder="Describe your plan for scaling the business. What are your growth targets? What resources will you need? What challenges do you anticipate?"
                        className="min-h-[200px] bg-navy-light/50"
                      />
                    </div>
                    
                    <div className="glass-card p-6">
                      <h3 className="text-lg font-medium text-white mb-4">Scaling Considerations</h3>
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <Scale size={18} className="text-electric-blue mt-1" />
                          <div>
                            <h4 className="font-medium text-white">Operational Scalability</h4>
                            <p className="text-white/70 text-sm">
                              Ensure your operational processes can handle increased volume without proportional increases in costs.
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-3">
                          <Users size={18} className="text-electric-blue mt-1" />
                          <div>
                            <h4 className="font-medium text-white">Team Structure</h4>
                            <p className="text-white/70 text-sm">
                              Plan your hiring roadmap and organizational structure to support growth.
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-3">
                          <LineChart size={18} className="text-electric-blue mt-1" />
                          <div>
                            <h4 className="font-medium text-white">Growth Metrics</h4>
                            <p className="text-white/70 text-sm">
                              Define KPIs to track and measure your growth progress and success.
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-3">
                          <Settings size={18} className="text-electric-blue mt-1" />
                          <div>
                            <h4 className="font-medium text-white">Technical Scalability</h4>
                            <p className="text-white/70 text-sm">
                              Ensure your infrastructure and technology can support increased users/customers.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="processes">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings size={20} className="text-electric-blue" />
                  Internal Processes & Optimization
                </CardTitle>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-6">
                  <h3 className="text-lg font-medium text-white mb-3">Process Documentation</h3>
                  <Textarea 
                    value={internalProcesses}
                    onChange={(e) => setInternalProcesses(e.target.value)}
                    placeholder="Document your key internal processes. How will you optimize these processes for scale? What automation can be implemented? What bottlenecks need to be addressed?"
                    className="min-h-[250px] bg-navy-light/50"
                  />
                  
                  <div className="glass-card p-6">
                    <h3 className="text-lg font-medium text-white mb-4">Process Areas to Consider</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-navy-light/30 rounded-md">
                        <h4 className="font-medium text-white mb-2">Customer Onboarding</h4>
                        <p className="text-white/70 text-sm">
                          How will you efficiently bring new customers into your product or service?
                        </p>
                      </div>
                      
                      <div className="p-4 bg-navy-light/30 rounded-md">
                        <h4 className="font-medium text-white mb-2">Support & Service</h4>
                        <p className="text-white/70 text-sm">
                          How will you handle increased support volume as you grow?
                        </p>
                      </div>
                      
                      <div className="p-4 bg-navy-light/30 rounded-md">
                        <h4 className="font-medium text-white mb-2">Production & Fulfillment</h4>
                        <p className="text-white/70 text-sm">
                          How will you scale production or service delivery with quality?
                        </p>
                      </div>
                      
                      <div className="p-4 bg-navy-light/30 rounded-md">
                        <h4 className="font-medium text-white mb-2">Financial Processes</h4>
                        <p className="text-white/70 text-sm">
                          How will you manage accounting, billing, and financial reporting at scale?
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="metrics">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart2 size={20} className="text-electric-blue" />
                  Key Performance Metrics
                </CardTitle>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-6">
                  <h3 className="text-lg font-medium text-white mb-3">Metrics & Analytics</h3>
                  <Textarea 
                    value={metrics}
                    onChange={(e) => setMetrics(e.target.value)}
                    placeholder="Define the key metrics you'll track to measure success. What are your primary KPIs? How will you monitor growth? What tools will you use for analytics?"
                    className="min-h-[200px] bg-navy-light/50"
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="glass-card p-4">
                      <h4 className="font-medium text-white mb-3">Growth Metrics</h4>
                      <ul className="space-y-2 text-white/70 text-sm list-disc pl-4">
                        <li>Customer/user acquisition rate</li>
                        <li>Revenue growth</li>
                        <li>Market share percentage</li>
                        <li>Expansion into new markets</li>
                      </ul>
                    </div>
                    
                    <div className="glass-card p-4">
                      <h4 className="font-medium text-white mb-3">Customer Metrics</h4>
                      <ul className="space-y-2 text-white/70 text-sm list-disc pl-4">
                        <li>Customer retention rate</li>
                        <li>Customer Lifetime Value (CLV)</li>
                        <li>Net Promoter Score (NPS)</li>
                        <li>Customer Acquisition Cost (CAC)</li>
                      </ul>
                    </div>
                    
                    <div className="glass-card p-4">
                      <h4 className="font-medium text-white mb-3">Operational Metrics</h4>
                      <ul className="space-y-2 text-white/70 text-sm list-disc pl-4">
                        <li>Production efficiency</li>
                        <li>Fulfillment speed</li>
                        <li>Error/defect rates</li>
                        <li>Customer support response time</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="team">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users size={20} className="text-electric-blue" />
                  Team Expansion Planning
                </CardTitle>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-6">
                  <h3 className="text-lg font-medium text-white mb-3">Team Growth Strategy</h3>
                  <Textarea 
                    value={teamExpansion}
                    onChange={(e) => setTeamExpansion(e.target.value)}
                    placeholder="Outline your plan for growing your team. What key roles will you need to hire for? How will you structure your organization? What's your hiring timeline?"
                    className="min-h-[200px] bg-navy-light/50"
                  />
                  
                  <div className="glass-card p-6">
                    <h3 className="text-lg font-medium text-white mb-4">Organizational Structure</h3>
                    <p className="text-white/70 mb-4">
                      Sketch your organizational structure as you grow. Consider departments, reporting lines, and leadership roles.
                    </p>
                    
                    <div className="p-8 bg-navy-light/30 rounded-md text-center">
                      <p className="text-white/60">Organizational chart visualization will appear here.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <div className="mt-8 flex justify-between">
          <Button variant="outline" className="gap-2 border-transparent hover:border-white/20 hover:bg-transparent">
            <Link to="/project/marketing" className="flex items-center gap-2">
              <ArrowLeft size={16} />
              Back to Marketing
            </Link>
          </Button>
          
          <Button variant="outline" className="gap-2 border-transparent hover:border-white/20 hover:bg-transparent">
            <Link to="/project/partnerships" className="flex items-center gap-2">
              Next: Partnerships & Exit
              <ArrowRight size={16} />
            </Link>
          </Button>
        </div>
      </div>
      
      <AiAgent />
    </div>
  );
};

export default ScalingOperations;
