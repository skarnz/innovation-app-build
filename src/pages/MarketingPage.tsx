import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { PhaseStepper } from '@/components/layout/PhaseStepper'; // Import the stepper
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import {
  Users,
  Megaphone,
  DollarSign,
  CalendarCheck,
  ChevronRight,
  ChevronLeft,
  Target,
  Mail,
  MessageSquare,
  Globe,
  BarChart,
  Edit3,
  Trash2,
  AlertTriangle
} from 'lucide-react';

// Define types and initial states
type AudiencePersona = {
  name: string;
  ageRange: string;
  interests: string;
  painPoints: string;
};

type MarketingChannels = {
  socialMedia: boolean;
  emailMarketing: boolean;
  contentMarketing: boolean;
  paidAds: boolean;
  seo: boolean;
};

type MarketingBudget = {
  totalBudget: number;
  socialMediaAllocation: number; // Percentage
  emailAllocation: number; // Percentage
  contentAllocation: number; // Percentage
  paidAdsAllocation: number; // Percentage
  seoAllocation: number; // Percentage
};

type ContentIdea = {
  title: string;
  format: string; // e.g., Blog Post, Video, Podcast
  channel: string; // e.g., Social Media, Email
};

// Define steps for the stepper
const marketingSteps = [
  { title: 'Audience', icon: <Users size={18} /> },
  { title: 'Channels', icon: <Megaphone size={18} /> },
  { title: 'Budget', icon: <DollarSign size={18} /> },
  { title: 'Content', icon: <CalendarCheck size={18} /> }
];

export default function MarketingPage() {
  const navigate = useNavigate(); // Initialize navigate
  const [activeStep, setActiveStep] = useState(0);
  const [persona, setPersona] = useState<AudiencePersona>({ name: '', ageRange: '', interests: '', painPoints: '' });
  const [channels, setChannels] = useState<MarketingChannels>({ socialMedia: false, emailMarketing: false, contentMarketing: false, paidAds: false, seo: false });
  const [budget, setBudget] = useState<MarketingBudget>({ totalBudget: 0, socialMediaAllocation: 25, emailAllocation: 15, contentAllocation: 20, paidAdsAllocation: 30, seoAllocation: 10 });
  const [contentIdeas, setContentIdeas] = useState<ContentIdea[]>([]);
  const [newIdea, setNewIdea] = useState<Partial<ContentIdea>>({});

  // Navigation handlers
  const nextStep = () => setActiveStep((prev) => Math.min(prev + 1, marketingSteps.length - 1));
  const prevStep = () => setActiveStep((prev) => Math.max(prev - 1, 0));

  // Navigate to Dashboard
  const goToDashboard = () => {
    navigate('/dashboard');
  };

  // Input Handlers
  const handlePersonaChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPersona((prev) => ({ ...prev, [name]: value }));
  };

  const handleChannelChange = (key: keyof MarketingChannels, checked: boolean) => {
    setChannels((prev) => ({ ...prev, [key]: checked }));
  };

  const handleBudgetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBudget((prev) => ({ ...prev, [name]: parseFloat(value) || 0 }));
  };

  const handleSliderChange = (key: keyof MarketingBudget, value: number[]) => {
    // Basic allocation - doesn't enforce 100% total yet
    setBudget(prev => ({ ...prev, [key]: value[0] }));
  };

  const handleNewIdeaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
     const { name, value } = e.target;
     setNewIdea((prev) => ({ ...prev, [name]: value }));
  };

  const addContentIdea = () => {
    if(newIdea.title && newIdea.format && newIdea.channel) {
        setContentIdeas(prev => [...prev, newIdea as ContentIdea]);
        setNewIdea({}); // Reset form
    }
  };

  // Calculate total allocation
  const calculateTotalAllocation = () => {
    let total = 0;
    if (channels.socialMedia) total += budget.socialMediaAllocation;
    if (channels.emailMarketing) total += budget.emailAllocation;
    if (channels.contentMarketing) total += budget.contentAllocation;
    if (channels.paidAds) total += budget.paidAdsAllocation;
    if (channels.seo) total += budget.seoAllocation;
    return total;
  };

  // Handler to delete a content idea
  const deleteContentIdea = (indexToDelete: number) => {
    setContentIdeas(prev => prev.filter((_, index) => index !== indexToDelete));
  };

  // --- Step 1: Audience Persona --- 
  const renderAudience = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold font-orbitron mb-4 text-white">1. Define Your Target Audience</h2>
      <Card className="glass-card p-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Target size={20} /> Create Audience Persona</CardTitle>
          <CardDescription>Understand who you're trying to reach.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div><Label htmlFor="personaName">Persona Name</Label><Input id="personaName" name="name" value={persona.name} onChange={handlePersonaChange} placeholder="e.g., Tech-Savvy Tina" className="bg-navy-light border-white/20" /></div>
          <div><Label htmlFor="ageRange">Age Range</Label><Input id="ageRange" name="ageRange" value={persona.ageRange} onChange={handlePersonaChange} placeholder="e.g., 25-35" className="bg-navy-light border-white/20" /></div>
          <div><Label htmlFor="interests">Interests & Hobbies</Label><Textarea id="interests" name="interests" value={persona.interests} onChange={handlePersonaChange} placeholder="e.g., AI, Startups, Sci-Fi Movies" className="bg-navy-light border-white/20" /></div>
          <div><Label htmlFor="painPoints">Pain Points & Needs</Label><Textarea id="painPoints" name="painPoints" value={persona.painPoints} onChange={handlePersonaChange} placeholder="e.g., Difficulty finding reliable market data, time constraints" className="bg-navy-light border-white/20" /></div>
        </CardContent>
      </Card>
    </div>
  );

  // --- Step 2: Marketing Channels --- 
  const renderChannels = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold font-orbitron mb-4 text-white">2. Select Marketing Channels</h2>
       <Card className="glass-card p-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Megaphone size={20} /> Choose Your Platforms</CardTitle>
          <CardDescription>Where will you reach your audience?</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {[ { key: 'socialMedia', label: 'Social Media', icon: MessageSquare },
             { key: 'emailMarketing', label: 'Email Marketing', icon: Mail },
             { key: 'contentMarketing', label: 'Content Marketing (Blog, SEO)', icon: Edit3 },
             { key: 'paidAds', label: 'Paid Advertising (Google, Social)', icon: BarChart },
             { key: 'seo', label: 'Search Engine Optimization (SEO)', icon: Globe }
            ].map(({ key, label, icon: Icon }) => (
             <div key={key} className="flex items-center space-x-3 bg-navy-light/30 p-3 rounded-md border border-transparent hover:border-white/20 transition-colors">
               <Checkbox id={key} checked={channels[key as keyof MarketingChannels]} onCheckedChange={(checked) => handleChannelChange(key as keyof MarketingChannels, !!checked)} />
               <Label htmlFor={key} className="flex items-center gap-2 cursor-pointer text-sm font-medium text-white/90">
                 <Icon size={18} className="text-electric-blue" />
                 {label}
               </Label>
             </div>
          ))}
          <Textarea placeholder="Briefly outline your strategy for the selected channels..." className="bg-navy-light border-white/20 mt-4" />
        </CardContent>
       </Card>
    </div>
  );

  // --- Step 3: Marketing Budget --- 
  const renderBudget = () => {
    const totalAllocation = calculateTotalAllocation();

    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold font-orbitron mb-4 text-white">3. Allocate Marketing Budget</h2>
         <Card className="glass-card p-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><DollarSign size={20} /> Budget Allocation</CardTitle>
            <CardDescription>Distribute your funds across chosen channels.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div><Label htmlFor="totalBudget">Total Marketing Budget ($)</Label><Input id="totalBudget" name="totalBudget" type="number" min="0" value={budget.totalBudget || ''} onChange={handleBudgetChange} placeholder="Overall budget for the next 3-6 months" className="bg-navy-light border-white/20" /></div>

            <div className="space-y-4">
               <div className="flex justify-between items-center mb-2">
                 <h4 className="font-medium text-white/90">Channel Allocation (%)</h4>
                 <span className={`text-sm font-bold ${totalAllocation !== 100 ? 'text-yellow-400' : 'text-green-400'}`}>
                   Total: {totalAllocation}%
                   {totalAllocation !== 100 && <AlertTriangle size={14} className="inline-block ml-1 mb-0.5"/>}
                 </span>
               </div>
               {/* TODO: Make these sliders interact to ensure 100% total */} 
               {[ { key: 'socialMediaAllocation', label: 'Social Media', channelKey: 'socialMedia' },
                  { key: 'emailAllocation', label: 'Email Marketing', channelKey: 'emailMarketing' },
                  { key: 'contentAllocation', label: 'Content Marketing', channelKey: 'contentMarketing' },
                  { key: 'paidAdsAllocation', label: 'Paid Ads', channelKey: 'paidAds' },
                  { key: 'seoAllocation', label: 'SEO', channelKey: 'seo' },
               ].map(({ key, label, channelKey }) => channels[channelKey as keyof MarketingChannels] && (
                 <div key={key} className="space-y-1">
                   <div className="flex justify-between items-center">
                     <Label htmlFor={key} className="text-sm text-white/80">{label}</Label>
                     <span className="text-sm font-medium text-electric-blue">{budget[key as keyof MarketingBudget]}%</span>
                   </div>
                   <Slider
                      id={key}
                      name={key}
                      defaultValue={[budget[key as keyof MarketingBudget]]}
                      max={100}
                      step={1}
                      onValueChange={(value) => handleSliderChange(key as keyof MarketingBudget, value)}
                      className="[&>span:first-child]:h-1 [&>span:first-child>span]:bg-electric-blue [&>span:first-child]:bg-navy-light"
                      aria-label={`${label} Budget Allocation`}
                   />
                 </div>
               ))}
               {Object.values(channels).every(v => !v) && <p className="text-sm text-white/60 text-center py-4">Select channels in Step 2 to allocate budget.</p>}
            </div>
          </CardContent>
         </Card>
      </div>
    );
  };

  // --- Step 4: Content Calendar --- 
  const renderContent = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold font-orbitron mb-4 text-white">4. Plan Your Content</h2>
      <Card className="glass-card p-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Edit3 size={20} /> Content Ideas & Calendar</CardTitle>
          <CardDescription>Outline key content pieces to create.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Form to add new ideas */} 
          <div className="flex flex-wrap gap-4 p-4 bg-navy-light/30 rounded-md border border-white/10">
            <Input name="title" value={newIdea.title || ''} onChange={handleNewIdeaChange} placeholder="Content Title" className="flex-1 min-w-[150px] bg-navy-light border-white/20" />
            <Input name="format" value={newIdea.format || ''} onChange={handleNewIdeaChange} placeholder="Format (e.g., Blog, Video)" className="flex-1 min-w-[120px] bg-navy-light border-white/20" />
            <Input name="channel" value={newIdea.channel || ''} onChange={handleNewIdeaChange} placeholder="Channel (e.g., LinkedIn)" className="flex-1 min-w-[120px] bg-navy-light border-white/20" />
            <Button onClick={addContentIdea} size="sm" className="bg-electric-purple hover:bg-electric-purple/90">Add Idea</Button>
          </div>

          {/* List of content ideas */} 
          <div className="space-y-2 mt-4">
             {contentIdeas.length === 0 && <p className="text-sm text-white/60 text-center py-4">No content ideas added yet.</p>}
             {contentIdeas.map((idea, index) => (
               <div key={index} className="flex justify-between items-center p-3 bg-navy-light/50 rounded-md text-sm gap-2">
                 <span className="font-medium text-white/90 flex-1 mr-1 truncate" title={idea.title}>{idea.title}</span>
                 <span className="text-white/70 mr-1">({idea.format})</span>
                 <span className="text-xs bg-electric-blue/20 text-electric-blue px-2 py-0.5 rounded mr-1 whitespace-nowrap">{idea.channel}</span>
                 <Button variant="ghost" size="icon" className="h-7 w-7 text-red-400/70 hover:text-red-400 hover:bg-red-400/10" onClick={() => deleteContentIdea(index)} title="Delete Idea">
                   <Trash2 size={14} />
                 </Button>
               </div>
             ))}
          </div>
          {/* Content Calendar Placeholder */} 
          <div className="border-t border-white/10 pt-4 mt-6">
             <h4 className="font-medium text-white/90 mb-2">Content Calendar</h4>
             <p className="text-sm text-white/70 italic">
               {/* TODO: Add a simple calendar view or link to external tool */} 
               A calendar view for scheduling content will be added here. For now, use the list above to track ideas.
             </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // --- Render Logic ---
  const renderStepContent = () => {
    switch (activeStep) {
      case 0: return renderAudience();
      case 1: return renderChannels();
      case 2: return renderBudget();
      case 3: return renderContent();
      default: return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 text-foreground">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold font-orbitron text-white mb-2 text-gradient">Marketing & Growth</h1>
        <p className="text-white/70 max-w-3xl mx-auto">
          Plan your marketing strategy, define your audience, choose channels, allocate budget, and schedule content.
        </p>
      </header>

      {/* Render the Stepper */} 
      <PhaseStepper steps={marketingSteps} currentStepIndex={activeStep} />

      {/* Render the active step's content */} 
      <div className="mt-8">
        {renderStepContent()}
      </div>

      {/* Navigation Buttons */} 
      <div className="flex justify-between mt-8">
        <Button variant="outline" onClick={prevStep} disabled={activeStep === 0} className="border-white/20 text-white disabled:opacity-50">
          <ChevronLeft size={16} className="mr-1" />
          Back
        </Button>
        {activeStep < marketingSteps.length - 1 ? (
          <Button onClick={nextStep} className="bg-electric-blue hover:bg-electric-blue/90">
            Continue <ChevronRight size={16} className="ml-1" />
          </Button>
        ) : (
          <Button onClick={goToDashboard} className="bg-electric-purple hover:bg-electric-purple/90">
            Complete Marketing Plan <ChevronRight size={16} className="ml-1" />
          </Button>
        )}
      </div>
    </div>
  );
} 