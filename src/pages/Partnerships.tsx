
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Handshake, Building, ArrowUpRight, Rocket, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AiAgent from '@/components/AiAgent';

const Partnerships = () => {
  const [partnershipStrategy, setPartnershipStrategy] = useState('');
  const [fundingStrategy, setFundingStrategy] = useState('');
  const [exitStrategy, setExitStrategy] = useState('');
  
  return (
    <div className="min-h-screen bg-navy">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-white/60 mb-4">
            <Link to="/project/scaling" className="hover:text-white flex items-center gap-1">
              <ArrowLeft size={16} />
              Back to Scaling & Operations
            </Link>
            <span>/</span>
            <span>Partnerships & Exit</span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-orbitron font-bold text-electric-blue mb-2">
            Partnerships, Funding & Exit Strategy
          </h1>
          <p className="text-white/70">
            Plan your strategic partnerships, funding approach, and potential exit strategies for your business.
          </p>
        </div>
        
        <Tabs defaultValue="partnerships" className="w-full">
          <TabsList className="mb-6 bg-navy-light/50">
            <TabsTrigger value="partnerships" className="data-[state=active]:bg-electric-blue">
              Strategic Partnerships
            </TabsTrigger>
            <TabsTrigger value="funding" className="data-[state=active]:bg-electric-blue">
              Funding Strategy
            </TabsTrigger>
            <TabsTrigger value="exit" className="data-[state=active]:bg-electric-blue">
              Exit Strategy
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="partnerships">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Handshake size={20} className="text-electric-blue" />
                  Strategic Partnerships
                </CardTitle>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-medium text-white mb-3">Partnership Strategy</h3>
                      <Textarea 
                        value={partnershipStrategy}
                        onChange={(e) => setPartnershipStrategy(e.target.value)}
                        placeholder="Describe your approach to strategic partnerships. What types of partners would complement your business? What value would you offer partners? What channels or introductions would help?"
                        className="min-h-[200px] bg-navy-light/50"
                      />
                    </div>
                    
                    <div className="glass-card p-6">
                      <h3 className="text-lg font-medium text-white mb-4">Partnership Types</h3>
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <Building size={18} className="text-electric-blue mt-1" />
                          <div>
                            <h4 className="font-medium text-white">Channel Partners</h4>
                            <p className="text-white/70 text-sm">
                              Partners who help distribute or resell your product/service to their audience.
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-3">
                          <Handshake size={18} className="text-electric-blue mt-1" />
                          <div>
                            <h4 className="font-medium text-white">Integration Partners</h4>
                            <p className="text-white/70 text-sm">
                              Partners whose products/services integrate with yours to create added value.
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-3">
                          <Rocket size={18} className="text-electric-blue mt-1" />
                          <div>
                            <h4 className="font-medium text-white">Strategic Alliances</h4>
                            <p className="text-white/70 text-sm">
                              Partners who collaborate with you on joint initiatives, co-marketing, or resource sharing.
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-3">
                          <ArrowUpRight size={18} className="text-electric-blue mt-1" />
                          <div>
                            <h4 className="font-medium text-white">Supply Chain Partners</h4>
                            <p className="text-white/70 text-sm">
                              Partners who are part of your production or delivery process.
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
          
          <TabsContent value="funding">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign size={20} className="text-electric-blue" />
                  Funding Strategy
                </CardTitle>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-6">
                  <h3 className="text-lg font-medium text-white mb-3">Funding Approach</h3>
                  <Textarea 
                    value={fundingStrategy}
                    onChange={(e) => setFundingStrategy(e.target.value)}
                    placeholder="Outline your funding strategy. Will you bootstrap, seek investors, or use other funding methods? What milestones will trigger funding rounds? How much funding will you need at each stage?"
                    className="min-h-[200px] bg-navy-light/50"
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="glass-card p-6">
                      <h3 className="text-lg font-medium text-white mb-4">Funding Options</h3>
                      <div className="space-y-4">
                        <div className="p-3 bg-navy-light/30 rounded-md">
                          <h4 className="font-medium text-white mb-1">Bootstrapping</h4>
                          <p className="text-white/70 text-sm">
                            Self-funding your business using personal savings and revenue.
                          </p>
                        </div>
                        
                        <div className="p-3 bg-navy-light/30 rounded-md">
                          <h4 className="font-medium text-white mb-1">Angel Investment</h4>
                          <p className="text-white/70 text-sm">
                            Funding from individual investors in exchange for equity.
                          </p>
                        </div>
                        
                        <div className="p-3 bg-navy-light/30 rounded-md">
                          <h4 className="font-medium text-white mb-1">Venture Capital</h4>
                          <p className="text-white/70 text-sm">
                            Investment from VC firms for high-growth businesses.
                          </p>
                        </div>
                        
                        <div className="p-3 bg-navy-light/30 rounded-md">
                          <h4 className="font-medium text-white mb-1">Crowdfunding</h4>
                          <p className="text-white/70 text-sm">
                            Raising small amounts from many people, often for pre-orders.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="glass-card p-6">
                      <h3 className="text-lg font-medium text-white mb-4">Funding Timeline</h3>
                      <div className="space-y-4">
                        <div className="p-3 bg-navy-light/30 rounded-md">
                          <h4 className="font-medium text-white mb-1">Pre-Seed</h4>
                          <p className="text-white/70 text-sm">
                            Earliest funding to develop initial concept/prototype.
                          </p>
                        </div>
                        
                        <div className="p-3 bg-navy-light/30 rounded-md">
                          <h4 className="font-medium text-white mb-1">Seed</h4>
                          <p className="text-white/70 text-sm">
                            Funding to develop product, validate market, reach initial traction.
                          </p>
                        </div>
                        
                        <div className="p-3 bg-navy-light/30 rounded-md">
                          <h4 className="font-medium text-white mb-1">Series A</h4>
                          <p className="text-white/70 text-sm">
                            Funding to optimize product and scale user base.
                          </p>
                        </div>
                        
                        <div className="p-3 bg-navy-light/30 rounded-md">
                          <h4 className="font-medium text-white mb-1">Series B+</h4>
                          <p className="text-white/70 text-sm">
                            Funding to expand market reach and scale operations.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="exit">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ArrowUpRight size={20} className="text-electric-blue" />
                  Exit Strategy
                </CardTitle>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-6">
                  <h3 className="text-lg font-medium text-white mb-3">Exit Planning</h3>
                  <Textarea 
                    value={exitStrategy}
                    onChange={(e) => setExitStrategy(e.target.value)}
                    placeholder="Outline your potential exit strategies. What is your long-term vision for the business? Would you consider acquisition, IPO, or do you plan to build a legacy business? What timeline are you considering for an exit?"
                    className="min-h-[200px] bg-navy-light/50"
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="glass-card p-4">
                      <h4 className="font-medium text-white mb-3">Acquisition</h4>
                      <p className="text-white/70 text-sm mb-3">
                        Selling your business to a larger company or competitor.
                      </p>
                      <ul className="space-y-2 text-white/70 text-sm list-disc pl-4">
                        <li>Strategic acquirers in your industry</li>
                        <li>Potential valuation multiples</li>
                        <li>Timeline considerations</li>
                        <li>How to position for acquisition</li>
                      </ul>
                    </div>
                    
                    <div className="glass-card p-4">
                      <h4 className="font-medium text-white mb-3">IPO</h4>
                      <p className="text-white/70 text-sm mb-3">
                        Taking your company public through an initial public offering.
                      </p>
                      <ul className="space-y-2 text-white/70 text-sm list-disc pl-4">
                        <li>Scale requirements for IPO</li>
                        <li>Financial benchmarks needed</li>
                        <li>Regulatory considerations</li>
                        <li>Timeline and costs</li>
                      </ul>
                    </div>
                    
                    <div className="glass-card p-4">
                      <h4 className="font-medium text-white mb-3">Legacy Business</h4>
                      <p className="text-white/70 text-sm mb-3">
                        Building a long-term business with no immediate exit plan.
                      </p>
                      <ul className="space-y-2 text-white/70 text-sm list-disc pl-4">
                        <li>Sustainable profitability model</li>
                        <li>Dividend or profit-sharing strategy</li>
                        <li>Leadership succession planning</li>
                        <li>Long-term governance structure</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <div className="mt-8 flex justify-between">
          <Button variant="outline" className="gap-2 border-transparent hover:border-white/20 hover:bg-transparent">
            <Link to="/project/scaling" className="flex items-center gap-2">
              <ArrowLeft size={16} />
              Back to Scaling & Operations
            </Link>
          </Button>
        </div>
      </div>
      
      <AiAgent />
    </div>
  );
};

export default Partnerships;
