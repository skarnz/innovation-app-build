
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, TrendingUp, ArrowRight, ArrowDown, Save, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AiAgent from '@/components/AiAgent';

const ValueChain = () => {
  const [primaryActivities, setPrimaryActivities] = useState({
    inboundLogistics: '',
    operations: '',
    outboundLogistics: '',
    marketingAndSales: '',
    service: ''
  });
  
  const [supportActivities, setSupportActivities] = useState({
    firmInfrastructure: '',
    humanResources: '',
    technologyDevelopment: '',
    procurement: ''
  });
  
  const [margin, setMargin] = useState('');
  
  const handlePrimaryChange = (field: keyof typeof primaryActivities, value: string) => {
    setPrimaryActivities({
      ...primaryActivities,
      [field]: value
    });
  };
  
  const handleSupportChange = (field: keyof typeof supportActivities, value: string) => {
    setSupportActivities({
      ...supportActivities,
      [field]: value
    });
  };
  
  return (
    <div className="min-h-screen bg-navy">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-white/60 mb-4">
            <Link to="/project/business-canvas" className="hover:text-white flex items-center gap-1">
              <ArrowLeft size={16} />
              Back to Business Canvas
            </Link>
            <span>/</span>
            <span>Value Chain</span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-orbitron font-bold text-electric-blue mb-2">
            Value Chain Analysis
          </h1>
          <p className="text-white/70">
            Analyze your business activities and identify how they create value for your customers.
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
        
        <div className="space-y-8">
          {/* Support Activities */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp size={20} className="text-electric-blue" />
                Support Activities
              </CardTitle>
            </CardHeader>
            
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label className="mb-2 block">Firm Infrastructure</Label>
                  <Textarea 
                    value={supportActivities.firmInfrastructure}
                    onChange={(e) => handleSupportChange('firmInfrastructure', e.target.value)}
                    placeholder="General management, finance, accounting, legal, quality management..."
                    className="min-h-[100px] bg-navy-light/50"
                  />
                </div>
                
                <div>
                  <Label className="mb-2 block">Human Resource Management</Label>
                  <Textarea 
                    value={supportActivities.humanResources}
                    onChange={(e) => handleSupportChange('humanResources', e.target.value)}
                    placeholder="Recruiting, hiring, training, development, compensation..."
                    className="min-h-[100px] bg-navy-light/50"
                  />
                </div>
                
                <div>
                  <Label className="mb-2 block">Technology Development</Label>
                  <Textarea 
                    value={supportActivities.technologyDevelopment}
                    onChange={(e) => handleSupportChange('technologyDevelopment', e.target.value)}
                    placeholder="R&D, process automation, design, redesign of products..."
                    className="min-h-[100px] bg-navy-light/50"
                  />
                </div>
                
                <div>
                  <Label className="mb-2 block">Procurement</Label>
                  <Textarea 
                    value={supportActivities.procurement}
                    onChange={(e) => handleSupportChange('procurement', e.target.value)}
                    placeholder="Purchasing inputs such as materials, supplies, equipment..."
                    className="min-h-[100px] bg-navy-light/50"
                  />
                </div>
              </div>
              
              <div className="mt-4 text-center">
                <ArrowDown size={24} className="mx-auto text-electric-blue" />
              </div>
            </CardContent>
          </Card>
          
          {/* Primary Activities */}
          <Card>
            <CardHeader>
              <CardTitle>Primary Activities</CardTitle>
            </CardHeader>
            
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4 relative">
                <div className="flex-1 p-4 border border-white/10 rounded-md bg-navy-light/30">
                  <Label className="mb-2 block">Inbound Logistics</Label>
                  <Textarea 
                    value={primaryActivities.inboundLogistics}
                    onChange={(e) => handlePrimaryChange('inboundLogistics', e.target.value)}
                    placeholder="Receiving, storing, and distributing inputs..."
                    className="min-h-[100px] bg-navy-light/50"
                  />
                </div>
                
                <ArrowRight size={24} className="hidden md:block self-center text-electric-blue" />
                
                <div className="flex-1 p-4 border border-white/10 rounded-md bg-navy-light/30">
                  <Label className="mb-2 block">Operations</Label>
                  <Textarea 
                    value={primaryActivities.operations}
                    onChange={(e) => handlePrimaryChange('operations', e.target.value)}
                    placeholder="Transforming inputs into the final product..."
                    className="min-h-[100px] bg-navy-light/50"
                  />
                </div>
                
                <ArrowRight size={24} className="hidden md:block self-center text-electric-blue" />
                
                <div className="flex-1 p-4 border border-white/10 rounded-md bg-navy-light/30">
                  <Label className="mb-2 block">Outbound Logistics</Label>
                  <Textarea 
                    value={primaryActivities.outboundLogistics}
                    onChange={(e) => handlePrimaryChange('outboundLogistics', e.target.value)}
                    placeholder="Collecting, storing, and distributing the product..."
                    className="min-h-[100px] bg-navy-light/50"
                  />
                </div>
                
                <ArrowRight size={24} className="hidden md:block self-center text-electric-blue" />
                
                <div className="flex-1 p-4 border border-white/10 rounded-md bg-navy-light/30">
                  <Label className="mb-2 block">Marketing & Sales</Label>
                  <Textarea 
                    value={primaryActivities.marketingAndSales}
                    onChange={(e) => handlePrimaryChange('marketingAndSales', e.target.value)}
                    placeholder="Informing buyers about products, promotions, pricing..."
                    className="min-h-[100px] bg-navy-light/50"
                  />
                </div>
                
                <ArrowRight size={24} className="hidden md:block self-center text-electric-blue" />
                
                <div className="flex-1 p-4 border border-white/10 rounded-md bg-navy-light/30">
                  <Label className="mb-2 block">Service</Label>
                  <Textarea 
                    value={primaryActivities.service}
                    onChange={(e) => handlePrimaryChange('service', e.target.value)}
                    placeholder="Support after the sale, customer service, maintenance..."
                    className="min-h-[100px] bg-navy-light/50"
                  />
                </div>
              </div>
              
              <div className="mt-6 p-4 border border-electric-blue/30 rounded-md bg-navy-light/50">
                <Label className="mb-2 block">Margin</Label>
                <Textarea 
                  value={margin}
                  onChange={(e) => setMargin(e.target.value)}
                  placeholder="Describe how your value chain activities create margin and competitive advantage..."
                  className="min-h-[100px] bg-navy-light/50"
                />
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="mt-8 flex justify-between">
          <Button variant="outline" className="gap-2 border-transparent hover:border-white/20 hover:bg-transparent">
            <Link to="/project/business-canvas" className="flex items-center gap-2">
              <ArrowLeft size={16} />
              Back to Business Canvas
            </Link>
          </Button>
          
          <Button variant="outline" className="gap-2 border-transparent hover:border-white/20 hover:bg-transparent">
            <Link to="/project/competition" className="flex items-center gap-2">
              Next: Competition Analysis
              <ArrowRight size={16} />
            </Link>
          </Button>
        </div>
      </div>
      
      <AiAgent />
    </div>
  );
};

export default ValueChain;
