
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, LayoutDashboard, Plus, Download, Save, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import AiAgent from '@/components/AiAgent';

const BusinessCanvas = () => {
  const [canvasData, setCanvasData] = useState({
    keyPartners: '',
    keyActivities: '',
    keyResources: '',
    valuePropositions: '',
    customerRelationships: '',
    channels: '',
    customerSegments: '',
    costStructure: '',
    revenueStreams: ''
  });
  
  const handleChange = (field: keyof typeof canvasData, value: string) => {
    setCanvasData({
      ...canvasData,
      [field]: value
    });
  };
  
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
            <span>Business Model Canvas</span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-orbitron font-bold text-electric-blue mb-2">
            Business Model Canvas
          </h1>
          <p className="text-white/70">
            Document the key elements of your business model in a structured format.
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
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Left Column */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Key Partners</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea 
                  value={canvasData.keyPartners}
                  onChange={(e) => handleChange('keyPartners', e.target.value)}
                  placeholder="Who are your key partners and suppliers? What resources are you acquiring from them?"
                  className="min-h-[120px] bg-navy-light/50"
                />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Key Activities</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea 
                  value={canvasData.keyActivities}
                  onChange={(e) => handleChange('keyActivities', e.target.value)}
                  placeholder="What key activities does your value proposition require?"
                  className="min-h-[120px] bg-navy-light/50"
                />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Key Resources</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea 
                  value={canvasData.keyResources}
                  onChange={(e) => handleChange('keyResources', e.target.value)}
                  placeholder="What key resources does your value proposition require?"
                  className="min-h-[120px] bg-navy-light/50"
                />
              </CardContent>
            </Card>
          </div>
          
          {/* Middle Column */}
          <div className="space-y-4">
            <Card className="border-electric-blue/50">
              <CardHeader>
                <CardTitle className="text-electric-blue">Value Propositions</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea 
                  value={canvasData.valuePropositions}
                  onChange={(e) => handleChange('valuePropositions', e.target.value)}
                  placeholder="What value do you deliver to the customer? Which customer problems are you solving?"
                  className="min-h-[200px] bg-navy-light/50"
                />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Customer Relationships</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea 
                  value={canvasData.customerRelationships}
                  onChange={(e) => handleChange('customerRelationships', e.target.value)}
                  placeholder="What type of relationship does each customer segment expect?"
                  className="min-h-[120px] bg-navy-light/50"
                />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Channels</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea 
                  value={canvasData.channels}
                  onChange={(e) => handleChange('channels', e.target.value)}
                  placeholder="Through which channels do your customer segments want to be reached?"
                  className="min-h-[120px] bg-navy-light/50"
                />
              </CardContent>
            </Card>
          </div>
          
          {/* Right Column */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Customer Segments</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea 
                  value={canvasData.customerSegments}
                  onChange={(e) => handleChange('customerSegments', e.target.value)}
                  placeholder="For whom are you creating value? Who are your most important customers?"
                  className="min-h-[120px] bg-navy-light/50"
                />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Cost Structure</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea 
                  value={canvasData.costStructure}
                  onChange={(e) => handleChange('costStructure', e.target.value)}
                  placeholder="What are the most important costs inherent in your business model?"
                  className="min-h-[120px] bg-navy-light/50"
                />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Revenue Streams</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea 
                  value={canvasData.revenueStreams}
                  onChange={(e) => handleChange('revenueStreams', e.target.value)}
                  placeholder="For what value are your customers willing to pay? How would they prefer to pay?"
                  className="min-h-[120px] bg-navy-light/50"
                />
              </CardContent>
            </Card>
          </div>
        </div>
        
        <div className="mt-8 flex justify-between">
          <Button variant="outline" className="gap-2 border-transparent hover:border-white/20 hover:bg-transparent">
            <Link to="/project/value-chain" className="flex items-center gap-2">
              Next: Value Chain Analysis
              <ArrowLeft size={16} className="rotate-180" />
            </Link>
          </Button>
        </div>
      </div>
      
      <AiAgent />
    </div>
  );
};

export default BusinessCanvas;
