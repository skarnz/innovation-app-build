
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Users, Box, Monitor, Laptop, HeartHandshake, Sparkles, Image, Pencil, ArrowRight } from 'lucide-react';
import { useProductType } from '@/contexts/ProductTypeContext';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import AiAgent from '@/components/AiAgent';

// Components for each product type's prototyping approach
const PhysicalPrototyping = () => (
  <div className="space-y-6">
    <div className="glass-card p-6">
      <h2 className="text-xl font-semibold text-white mb-4">3D Modeling & Rendering</h2>
      <p className="text-white/70 mb-6">
        Create a detailed 3D model of your physical product to visualize design, dimensions, and features.
      </p>

      <div className="bg-navy-dark/40 rounded-lg p-8 text-center mb-6">
        <div className="inline-block p-6 border-2 border-dashed border-electric-blue/30 rounded-lg mb-4">
          <Box size={60} className="text-electric-blue/70" />
        </div>
        <p className="text-white/60 mb-6">Upload sketches or reference images to generate a 3D model</p>
        <Button className="bg-electric-blue hover:bg-electric-blue/90">
          Upload Images
        </Button>
      </div>
    </div>
    
    <div className="glass-card p-6">
      <h2 className="text-xl font-semibold text-white mb-4">Materials & Manufacturing</h2>
      <p className="text-white/70 mb-6">
        Specify materials, manufacturing processes, and other physical characteristics.
      </p>
      
      <Textarea 
        placeholder="Describe the materials and manufacturing processes for your product..." 
        className="min-h-[120px] bg-navy-light/50 text-white placeholder-white/40 border-white/20 focus:border-electric-blue mb-6"
      />
      
      <Button variant="outline" className="border-electric-blue/50 text-electric-blue hover:bg-electric-blue/10">
        Generate Materials Recommendation
      </Button>
    </div>
  </div>
);

const SoftwarePrototyping = () => (
  <div className="space-y-6">
    <div className="glass-card p-6">
      <h2 className="text-xl font-semibold text-white mb-4">UI/UX Wireframes</h2>
      <p className="text-white/70 mb-6">
        Create wireframes and mockups of your software interface to visualize user experience.
      </p>

      <div className="bg-navy-dark/40 rounded-lg p-8 text-center mb-6">
        <div className="inline-block p-6 border-2 border-dashed border-electric-blue/30 rounded-lg mb-4">
          <Laptop size={60} className="text-electric-blue/70" />
        </div>
        <p className="text-white/60 mb-6">Create or upload wireframes for your software application</p>
        <Button className="bg-electric-blue hover:bg-electric-blue/90">
          Start Wireframing
        </Button>
      </div>
    </div>
    
    <div className="glass-card p-6">
      <h2 className="text-xl font-semibold text-white mb-4">Architecture & Flow</h2>
      <p className="text-white/70 mb-6">
        Define the technical architecture and user flows of your software product.
      </p>
      
      <Textarea 
        placeholder="Describe the technical architecture and key user flows of your software..." 
        className="min-h-[120px] bg-navy-light/50 text-white placeholder-white/40 border-white/20 focus:border-electric-blue mb-6"
      />
      
      <Button variant="outline" className="border-electric-blue/50 text-electric-blue hover:bg-electric-blue/10">
        Generate Architecture Diagram
      </Button>
    </div>
  </div>
);

const ServicePrototyping = () => (
  <div className="space-y-6">
    <div className="glass-card p-6">
      <h2 className="text-xl font-semibold text-white mb-4">Service Blueprint</h2>
      <p className="text-white/70 mb-6">
        Create a service blueprint to map out customer interactions, behind-the-scenes processes, and touchpoints.
      </p>

      <div className="bg-navy-dark/40 rounded-lg p-8 text-center mb-6">
        <div className="inline-block p-6 border-2 border-dashed border-electric-blue/30 rounded-lg mb-4">
          <Users size={60} className="text-electric-blue/70" />
        </div>
        <p className="text-white/60 mb-6">Create a service blueprint to visualize your customer journey</p>
        <Button className="bg-electric-blue hover:bg-electric-blue/90">
          Start Blueprint
        </Button>
      </div>
    </div>
    
    <div className="glass-card p-6">
      <h2 className="text-xl font-semibold text-white mb-4">Operational Flow</h2>
      <p className="text-white/70 mb-6">
        Define the operational processes and resources needed to deliver your service.
      </p>
      
      <Textarea 
        placeholder="Describe the operational processes and resources needed for your service..." 
        className="min-h-[120px] bg-navy-light/50 text-white placeholder-white/40 border-white/20 focus:border-electric-blue mb-6"
      />
      
      <Button variant="outline" className="border-electric-blue/50 text-electric-blue hover:bg-electric-blue/10">
        Generate Operational Flow
      </Button>
    </div>
  </div>
);

const UserExperienceModule = () => (
  <div className="space-y-6">
    <div className="glass-card p-6">
      <h2 className="text-xl font-semibold text-white mb-4">User Experience Modeling</h2>
      <p className="text-white/70 mb-6">
        Define how you want users to feel when interacting with your product or service.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="glass-card p-4 hover:border-electric-blue/40 cursor-pointer transition-colors">
          <div className="text-center mb-3">
            <div className="inline-block p-3 rounded-full bg-blue-500/20 mb-2">
              <Sparkles size={24} className="text-blue-400" />
            </div>
            <h3 className="text-white font-medium">Futuristic</h3>
          </div>
          <p className="text-white/70 text-sm">Cutting-edge, innovative, ahead of its time</p>
        </div>
        
        <div className="glass-card p-4 hover:border-electric-blue/40 cursor-pointer transition-colors">
          <div className="text-center mb-3">
            <div className="inline-block p-3 rounded-full bg-green-500/20 mb-2">
              <HeartHandshake size={24} className="text-green-400" />
            </div>
            <h3 className="text-white font-medium">Friendly</h3>
          </div>
          <p className="text-white/70 text-sm">Approachable, warm, easy to use</p>
        </div>
        
        <div className="glass-card p-4 hover:border-electric-blue/40 cursor-pointer transition-colors">
          <div className="text-center mb-3">
            <div className="inline-block p-3 rounded-full bg-purple-500/20 mb-2">
              <Monitor size={24} className="text-purple-400" />
            </div>
            <h3 className="text-white font-medium">Professional</h3>
          </div>
          <p className="text-white/70 text-sm">Reliable, trustworthy, expert-level</p>
        </div>
      </div>
      
      <Textarea 
        placeholder="Describe your ideal user experience in detail..." 
        className="min-h-[120px] bg-navy-light/50 text-white placeholder-white/40 border-white/20 focus:border-electric-blue mb-6"
      />
    </div>
  </div>
);

const SketchAndPrototypeModule = () => (
  <div className="space-y-6">
    <div className="glass-card p-6">
      <h2 className="text-xl font-semibold text-white mb-4">Sketches & Visual Concepts</h2>
      <p className="text-white/70 mb-6">
        Create or upload sketches and visual concepts of your product or service.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="glass-card p-4 hover:border-electric-blue/40 cursor-pointer transition-colors">
          <div className="text-center mb-3">
            <div className="inline-block p-3 rounded-full bg-yellow-500/20 mb-2">
              <Pencil size={24} className="text-yellow-400" />
            </div>
            <h3 className="text-white font-medium">Create Sketches</h3>
          </div>
          <p className="text-white/70 text-sm">Use our drawing tools to create concept sketches</p>
        </div>
        
        <div className="glass-card p-4 hover:border-electric-blue/40 cursor-pointer transition-colors">
          <div className="text-center mb-3">
            <div className="inline-block p-3 rounded-full bg-pink-500/20 mb-2">
              <Image size={24} className="text-pink-400" />
            </div>
            <h3 className="text-white font-medium">Upload Images</h3>
          </div>
          <p className="text-white/70 text-sm">Upload existing sketches or reference images</p>
        </div>
      </div>
      
      <div className="bg-navy-dark/40 rounded-lg p-8 text-center">
        <div className="border-2 border-dashed border-white/30 p-8 rounded-lg">
          <p className="text-white/60 mb-3">Drag and drop your images here or click to browse</p>
          <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
            Upload Images
          </Button>
        </div>
      </div>
    </div>
  </div>
);

const Prototyping = () => {
  const { productType } = useProductType();
  const [activeTab, setActiveTab] = useState("user-experience");
  
  // Check if product type is set
  if (!productType) {
    return (
      <div className="min-h-screen bg-navy flex items-center justify-center">
        <div className="glass-card p-8 max-w-lg text-center">
          <h2 className="text-xl font-bold text-white mb-4">Product Type Not Set</h2>
          <p className="text-white/70 mb-6">
            Please complete the project setup to define your product type before accessing the prototyping tools.
          </p>
          <Link to="/dashboard">
            <Button>
              Go to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-navy pb-20">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-white/60 mb-4">
            <Link to="/dashboard" className="hover:text-white flex items-center gap-1">
              <ArrowLeft size={16} />
              Back to Dashboard
            </Link>
            <span>/</span>
            <span>Prototyping</span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-orbitron font-bold text-electric-blue mb-2">
            Prototype & Concept Visualization
          </h1>
          <p className="text-white/70">
            Create visual mockups and prototypes to bring your {productType} product to life.
          </p>
        </div>
        
        {/* Main Tabs */}
        <Tabs defaultValue="user-experience" className="mb-10" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-navy-light mb-6">
            <TabsTrigger value="user-experience" className="data-[state=active]:bg-electric-blue data-[state=active]:text-white">
              User Experience
            </TabsTrigger>
            <TabsTrigger value="sketch-prototype" className="data-[state=active]:bg-electric-blue data-[state=active]:text-white">
              Sketch & Prototype
            </TabsTrigger>
            <TabsTrigger value="prototype-tools" className="data-[state=active]:bg-electric-blue data-[state=active]:text-white">
              {productType === 'physical' ? 'Physical Prototype' : 
               productType === 'software' ? 'Software Prototype' : 'Service Prototype'}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="user-experience">
            <UserExperienceModule />
          </TabsContent>
          
          <TabsContent value="sketch-prototype">
            <SketchAndPrototypeModule />
          </TabsContent>
          
          <TabsContent value="prototype-tools">
            {productType === 'physical' && <PhysicalPrototyping />}
            {productType === 'software' && <SoftwarePrototyping />}
            {productType === 'service' && <ServicePrototyping />}
          </TabsContent>
        </Tabs>
        
        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <Link to="/project/mvp">
            <Button variant="outline" className="border-white/20 text-white flex items-center gap-2">
              <ArrowLeft size={16} />
              Back to MVP Spec
            </Button>
          </Link>
          
          <Link to="/project/launch">
            <Button className="bg-electric-purple hover:bg-electric-purple/90 flex items-center gap-2">
              Next: Launch
              <ArrowRight size={16} />
            </Button>
          </Link>
        </div>
      </div>
      
      <AiAgent />
    </div>
  );
};

export default Prototyping;
