
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, BarChart2, Save, Download, ArrowRight, Percent, TrendingUp, PieChart, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AiAgent from '@/components/AiAgent';

const MarketAnalysis = () => {
  const [marketSize, setMarketSize] = useState({
    tam: '',
    sam: '',
    som: '',
    tamDescription: '',
    samDescription: '',
    somDescription: ''
  });
  
  const [marketTrends, setMarketTrends] = useState('');
  const [marketSegmentation, setMarketSegmentation] = useState('');
  const [buyerPersonas, setBuyerPersonas] = useState('');
  const [growthRate, setGrowthRate] = useState('');
  
  return (
    <div className="min-h-screen bg-navy">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-white/60 mb-4">
            <Link to="/project/competition" className="hover:text-white flex items-center gap-1">
              <ArrowLeft size={16} />
              Back to Competition
            </Link>
            <span>/</span>
            <span>Market Analysis</span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-orbitron font-bold text-electric-blue mb-2">
            Market Analysis
          </h1>
          <p className="text-white/70">
            Analyze the market size, trends, and opportunities to inform your business strategy.
          </p>
        </div>
        
        <div className="mb-6 flex justify-end gap-2">
          <Button variant="outline" className="gap-2">
            <Save size={16} />
            Save
          </Button>
          <Button variant="outline" className="gap-2">
            <Download size={16} />
            Export
          </Button>
        </div>
        
        <Tabs defaultValue="market-size" className="w-full">
          <TabsList className="mb-6 bg-navy-light/50">
            <TabsTrigger value="market-size" className="data-[state=active]:bg-electric-blue">
              Market Size
            </TabsTrigger>
            <TabsTrigger value="trends" className="data-[state=active]:bg-electric-blue">
              Trends & Growth
            </TabsTrigger>
            <TabsTrigger value="segmentation" className="data-[state=active]:bg-electric-blue">
              Segmentation
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="market-size">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign size={20} className="text-electric-blue" />
                    TAM, SAM, & SOM Analysis
                  </CardTitle>
                </CardHeader>
                
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="border-electric-blue/20 bg-navy-light/30">
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                          <span className="text-base">Total Addressable Market (TAM)</span>
                        </CardTitle>
                      </CardHeader>
                      
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <Label>Market Size ($)</Label>
                            <Input 
                              value={marketSize.tam}
                              onChange={(e) => setMarketSize({...marketSize, tam: e.target.value})}
                              placeholder="e.g., 1,000,000,000"
                              className="bg-navy-light/50"
                            />
                          </div>
                          
                          <div>
                            <Label>Description</Label>
                            <Textarea 
                              value={marketSize.tamDescription}
                              onChange={(e) => setMarketSize({...marketSize, tamDescription: e.target.value})}
                              placeholder="Describe your total addressable market..."
                              className="min-h-[120px] bg-navy-light/50"
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="border-electric-blue/20 bg-navy-light/30">
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                          <span className="text-base">Serviceable Addressable Market (SAM)</span>
                        </CardTitle>
                      </CardHeader>
                      
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <Label>Market Size ($)</Label>
                            <Input 
                              value={marketSize.sam}
                              onChange={(e) => setMarketSize({...marketSize, sam: e.target.value})}
                              placeholder="e.g., 100,000,000"
                              className="bg-navy-light/50"
                            />
                          </div>
                          
                          <div>
                            <Label>Description</Label>
                            <Textarea 
                              value={marketSize.samDescription}
                              onChange={(e) => setMarketSize({...marketSize, samDescription: e.target.value})}
                              placeholder="Describe your serviceable addressable market..."
                              className="min-h-[120px] bg-navy-light/50"
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="border-electric-blue/20 bg-navy-light/30">
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                          <span className="text-base">Serviceable Obtainable Market (SOM)</span>
                        </CardTitle>
                      </CardHeader>
                      
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <Label>Market Size ($)</Label>
                            <Input 
                              value={marketSize.som}
                              onChange={(e) => setMarketSize({...marketSize, som: e.target.value})}
                              placeholder="e.g., 10,000,000"
                              className="bg-navy-light/50"
                            />
                          </div>
                          
                          <div>
                            <Label>Description</Label>
                            <Textarea 
                              value={marketSize.somDescription}
                              onChange={(e) => setMarketSize({...marketSize, somDescription: e.target.value})}
                              placeholder="Describe your serviceable obtainable market..."
                              className="min-h-[120px] bg-navy-light/50"
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="mt-6 p-6 glass-card">
                    <h3 className="text-lg font-medium text-white mb-4">Market Size Visualization</h3>
                    <div className="flex items-center justify-center min-h-[200px]">
                      <div className="text-center">
                        <PieChart size={100} className="mx-auto mb-4 text-electric-blue" />
                        <p className="text-white/70">
                          Market size data will be visualized here when provided.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="trends">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp size={20} className="text-electric-blue" />
                    Market Trends & Growth
                  </CardTitle>
                </CardHeader>
                
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label className="mb-2 block">Market Trends</Label>
                      <Textarea 
                        value={marketTrends}
                        onChange={(e) => setMarketTrends(e.target.value)}
                        placeholder="Describe current and emerging trends in your market..."
                        className="min-h-[200px] bg-navy-light/50"
                      />
                    </div>
                    
                    <div className="space-y-6">
                      <div>
                        <Label className="mb-2 block">Growth Rate</Label>
                        <div className="flex items-center gap-2">
                          <Input 
                            value={growthRate}
                            onChange={(e) => setGrowthRate(e.target.value)}
                            placeholder="Annual growth rate"
                            className="bg-navy-light/50"
                          />
                          <Percent size={20} className="text-white/60" />
                        </div>
                      </div>
                      
                      <div className="p-6 glass-card">
                        <h3 className="text-lg font-medium text-white mb-4">Growth Visualization</h3>
                        <div className="flex items-center justify-center min-h-[150px]">
                          <div className="text-center">
                            <BarChart2 size={80} className="mx-auto mb-4 text-electric-blue" />
                            <p className="text-white/70">
                              Market growth data will be visualized here when provided.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="segmentation">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart size={20} className="text-electric-blue" />
                    Market Segmentation & Buyer Personas
                  </CardTitle>
                </CardHeader>
                
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label className="mb-2 block">Market Segmentation</Label>
                      <Textarea 
                        value={marketSegmentation}
                        onChange={(e) => setMarketSegmentation(e.target.value)}
                        placeholder="Describe how you segment your market (demographics, geography, behavior, etc.)..."
                        className="min-h-[200px] bg-navy-light/50"
                      />
                    </div>
                    
                    <div>
                      <Label className="mb-2 block">Buyer Personas</Label>
                      <Textarea 
                        value={buyerPersonas}
                        onChange={(e) => setBuyerPersonas(e.target.value)}
                        placeholder="Describe your ideal customer profiles or buyer personas..."
                        className="min-h-[200px] bg-navy-light/50"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="mt-8 flex justify-between">
          <Button variant="outline" className="gap-2 border-transparent hover:border-white/20 hover:bg-transparent">
            <Link to="/project/competition" className="flex items-center gap-2">
              <ArrowLeft size={16} />
              Back to Competition
            </Link>
          </Button>
          
          <Button variant="outline" className="gap-2 border-transparent hover:border-white/20 hover:bg-transparent">
            <Link to="/project/outcomes" className="flex items-center gap-2">
              Next: Maze of Outcomes
              <ArrowRight size={16} />
            </Link>
          </Button>
        </div>
      </div>
      
      <AiAgent />
    </div>
  );
};

export default MarketAnalysis;
