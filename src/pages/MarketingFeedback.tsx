
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Plus, ChevronDown, ChevronUp, Youtube, Instagram, Twitter, Linkedin, Facebook, MessageSquare, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { useProductType } from '@/contexts/ProductTypeContext';
import AiAgent from '@/components/AiAgent';

// Social platform icons with their colors
const platforms = [
  { name: 'YouTube', icon: Youtube, color: 'text-red-500' },
  { name: 'Instagram', icon: Instagram, color: 'text-pink-500' },
  { name: 'Twitter', icon: Twitter, color: 'text-blue-400' },
  { name: 'LinkedIn', icon: Linkedin, color: 'text-blue-600' },
  { name: 'Facebook', icon: Facebook, color: 'text-blue-500' },
];

// Define channel types
const channelTypes = [
  { id: 'video', name: 'Video Content', icon: Youtube },
  { id: 'image', name: 'Image Posts', icon: Instagram },
  { id: 'text', name: 'Text Posts', icon: Twitter },
  { id: 'seo', name: 'SEO Content', icon: Search },
  { id: 'arcads', name: 'ARcads', icon: Plus }
];

const MarketingFeedback = () => {
  const { productType } = useProductType();
  const [activeChannel, setActiveChannel] = useState<string | null>(null);
  const [videoStudioOpen, setVideoStudioOpen] = useState(false);
  const [expandedTimeline, setExpandedTimeline] = useState<string[]>(['video']);
  
  const toggleChannel = (channelId: string) => {
    if (activeChannel === channelId) {
      setActiveChannel(null);
    } else {
      setActiveChannel(channelId);
    }
  };

  const toggleVideoStudio = () => {
    setVideoStudioOpen(!videoStudioOpen);
  };

  const toggleTimelineExpand = (channelId: string) => {
    if (expandedTimeline.includes(channelId)) {
      setExpandedTimeline(expandedTimeline.filter(id => id !== channelId));
    } else {
      setExpandedTimeline([...expandedTimeline, channelId]);
    }
  };

  // Check if product type is set
  if (!productType) {
    return (
      <div className="min-h-screen bg-navy flex items-center justify-center">
        <div className="glass-card p-8 max-w-lg text-center">
          <h2 className="text-xl font-bold text-white mb-4">Product Type Not Set</h2>
          <p className="text-white/70 mb-6">
            Please complete the project setup to define your product type before accessing the marketing features.
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
        <div className="mb-8 flex justify-between items-center">
          <div>
            <div className="flex items-center gap-2 text-white/60 mb-4">
              <Link to="/dashboard" className="hover:text-white flex items-center gap-1">
                <ArrowLeft size={16} />
                Back to Dashboard
              </Link>
              <span>/</span>
              <span>Marketing</span>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-orbitron font-bold text-electric-blue mb-2">
              Marketing & Promotion
            </h1>
            <p className="text-white/70">
              Create a comprehensive marketing strategy and timeline for your {productType} product.
            </p>
          </div>
        </div>

        {/* Main content area with timeline and tools */}
        <div className="mb-10">
          {/* Marketing Timeline */}
          <div className="glass-card p-6 mb-6">
            <h2 className="text-xl font-semibold text-white mb-6">Marketing Timeline</h2>
            
            <div className="overflow-x-auto pb-4">
              <div className="min-w-[800px]">
                {/* Timeline header with weeks */}
                <div className="flex border-b border-white/10 pb-2 mb-4">
                  <div className="w-1/6 text-white/70">Channel</div>
                  <div className="w-5/6 flex">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(week => (
                      <div key={week} className="flex-1 text-center text-white/70">
                        Week {week}
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Timeline rows by channel */}
                {channelTypes.map(channel => (
                  <div key={channel.id} className="mb-6">
                    <div 
                      className="flex items-center cursor-pointer mb-2" 
                      onClick={() => toggleTimelineExpand(channel.id)}
                    >
                      <div className="w-1/6 flex items-center gap-2 text-white">
                        {expandedTimeline.includes(channel.id) ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        <channel.icon size={18} />
                        <span>{channel.name}</span>
                      </div>
                      
                      {/* Timeline blocks - only shown when expanded */}
                      {expandedTimeline.includes(channel.id) && (
                        <div className="w-5/6 flex">
                          {[1, 2, 3, 4, 5, 6, 7, 8].map(week => (
                            <div 
                              key={week} 
                              className={`
                                flex-1 border-l border-white/10 h-10 
                                ${week <= 2 ? 'bg-electric-blue/20' : ''}
                                flex items-center justify-center relative group
                              `}
                            >
                              {week <= 2 && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                  {channel.id === 'video' && week === 1 && 
                                    <span className="text-xs text-white/80">Intro Video</span>}
                                  {channel.id === 'image' && week === 1 && 
                                    <span className="text-xs text-white/80">Product Shots</span>}
                                  {channel.id === 'text' && week === 1 && 
                                    <span className="text-xs text-white/80">Launch Posts</span>}
                                </div>
                              )}
                              <button 
                                className="opacity-0 group-hover:opacity-100 absolute z-10 bg-electric-purple text-white w-6 h-6 rounded-full flex items-center justify-center"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (channel.id === 'video') {
                                    toggleVideoStudio();
                                  } else {
                                    toggleChannel(channel.id);
                                  }
                                }}
                              >
                                <Plus size={14} />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    {/* Channel details when expanded but no popup */}
                    {expandedTimeline.includes(channel.id) && !activeChannel && !videoStudioOpen && (
                      <div className="ml-[16.67%] pl-4 pr-4 py-2 text-white/70 text-sm border-l border-white/10">
                        <p>Click + to add content for this channel in the selected week.</p>
                        {channel.id === 'video' && (
                          <p className="mt-2">Video content typically includes product demos, tutorials, and testimonials.</p>
                        )}
                        {channel.id === 'image' && (
                          <p className="mt-2">Image posts should showcase your product's features, benefits, and use cases.</p>
                        )}
                        {channel.id === 'text' && (
                          <p className="mt-2">Text posts include tweets, status updates, and short announcements.</p>
                        )}
                        {channel.id === 'seo' && (
                          <p className="mt-2">SEO content includes blog posts, articles, and other long-form content.</p>
                        )}
                        {channel.id === 'arcads' && (
                          <p className="mt-2">ARcads integration for immersive advertising experiences.</p>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Social Platform Tools */}
          <div className="glass-card p-6 mb-6">
            <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
              Marketing Platforms
              <span className="text-sm text-white/50 font-normal">(Drag to marketing timeline)</span>
            </h2>
            
            <div className="flex flex-wrap gap-4">
              {platforms.map((platform) => (
                <div 
                  key={platform.name}
                  className="flex flex-col items-center p-4 bg-navy-light rounded-lg cursor-move hover:bg-navy-light/80 transition-colors"
                  draggable="true"
                >
                  <platform.icon size={24} className={platform.color} />
                  <span className="mt-2 text-white text-sm">{platform.name}</span>
                </div>
              ))}
              <div 
                className="flex flex-col items-center p-4 bg-navy-light rounded-lg cursor-move hover:bg-navy-light/80 transition-colors"
                draggable="true"
              >
                <X size={24} className="text-slate-500" />
                <span className="mt-2 text-white text-sm">Twitter/X</span>
              </div>
              <div 
                className="flex flex-col items-center p-4 bg-navy-light rounded-lg cursor-move hover:bg-navy-light/80 transition-colors"
                draggable="true"
              >
                <div className="text-pink-500 font-bold">AR</div>
                <span className="mt-2 text-white text-sm">ARcads</span>
              </div>
            </div>
          </div>
          
          {/* Automation Flow Tools */}
          <div className="glass-card p-6 mb-6">
            <h2 className="text-xl font-semibold text-white mb-6">Automation Flow</h2>
            
            <div className="bg-navy-light/50 p-6 rounded-lg text-center">
              <p className="text-white/70 mb-4">
                Connect your marketing channels into an automated workflow. Drag platforms from above to create connections.
              </p>
              <div className="flex flex-wrap gap-4 justify-center mb-6">
                <div className="p-4 border border-dashed border-white/30 rounded-lg w-40 h-28 flex items-center justify-center text-white/50">
                  Drop platform here
                </div>
                <div className="p-4 border border-dashed border-white/30 rounded-lg w-40 h-28 flex items-center justify-center text-white/50">
                  Drop platform here
                </div>
                <div className="p-4 border border-dashed border-white/30 rounded-lg w-40 h-28 flex items-center justify-center text-white/50">
                  Drop platform here
                </div>
              </div>
              <Button variant="outline" className="border-electric-purple text-electric-purple">
                Create Automation Flow
              </Button>
            </div>
          </div>
          
          {/* AI Chat for Marketing */}
          <div className="glass-card p-6 relative">
            <div className="absolute inset-0 rounded-lg overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-electric-purple/20 to-electric-blue/20 animate-pulse"></div>
            </div>
            
            <div className="relative z-10">
              <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                <MessageSquare size={20} className="text-electric-purple" />
                Marketing Assistant
              </h2>
              
              <div className="bg-navy-dark/70 p-4 rounded-lg mb-4 max-h-[300px] overflow-y-auto">
                <div className="text-white/80 mb-4">
                  <p className="mb-2"><span className="text-electric-purple font-medium">AI:</span> How can I help with your marketing strategy today?</p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <Textarea 
                  placeholder="Ask for marketing advice, content ideas, or timeline suggestions..." 
                  className="bg-navy-light/70 text-white border-white/20 focus:border-electric-purple"
                />
                <Button className="bg-electric-purple hover:bg-electric-purple/90 self-end">
                  Send
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Video Generation Studio - Shown when videoStudioOpen is true */}
        {videoStudioOpen && (
          <div className="fixed inset-0 z-50 bg-navy-dark/95 flex flex-col overflow-hidden">
            <div className="p-4 border-b border-white/10 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                <Youtube size={20} className="text-red-500" />
                Video Generation Studio
              </h2>
              <Button variant="ghost" size="sm" onClick={toggleVideoStudio}>
                <X size={20} />
              </Button>
            </div>
            
            <div className="flex-grow flex overflow-hidden">
              {/* Left Sidebar - Tools */}
              <div className="w-64 border-r border-white/10 p-4 overflow-y-auto">
                <div className="mb-6">
                  <h3 className="text-white font-medium mb-3">Script</h3>
                  <Textarea 
                    placeholder="Write your video script here..." 
                    className="h-32 bg-navy-light text-white border-white/20 focus:border-electric-purple"
                  />
                </div>
                
                <div className="mb-6">
                  <h3 className="text-white font-medium mb-3">Style</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {['Modern', 'Retro', 'Professional', 'Fun', 'Minimalist', 'Bold'].map(style => (
                      <Button 
                        key={style} 
                        variant="outline" 
                        size="sm"
                        className="border-white/20 text-white/80 hover:bg-electric-blue/20 hover:border-electric-blue"
                      >
                        {style}
                      </Button>
                    ))}
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-white font-medium mb-3">Characters</h3>
                  <Button variant="outline" className="w-full border-white/20 text-white/80 flex items-center gap-2">
                    <Plus size={16} />
                    Add Character
                  </Button>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-white font-medium mb-3">Reference Images</h3>
                  <Button variant="outline" className="w-full border-white/20 text-white/80 flex items-center gap-2">
                    <Plus size={16} />
                    Upload Reference
                  </Button>
                </div>
              </div>
              
              {/* Main Content - Preview */}
              <div className="flex-grow p-6 overflow-y-auto">
                <div className="bg-black rounded-lg aspect-video flex items-center justify-center mb-6">
                  <p className="text-white/50">Video preview will appear here</p>
                </div>
                
                <div className="flex gap-3 mb-6">
                  <Button className="bg-electric-blue hover:bg-electric-blue/90">
                    Generate Video
                  </Button>
                  <Button variant="outline" className="border-white/20 text-white">
                    Save to Timeline
                  </Button>
                </div>
                
                <div className="glass-card p-4">
                  <h3 className="text-white font-medium mb-3">Timeline</h3>
                  <div className="bg-navy-dark rounded-lg p-3 min-h-[100px] flex items-center justify-center">
                    <p className="text-white/50">Video timeline segments will appear here</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Channel Content Popup - Shown when activeChannel is set */}
        {activeChannel && (
          <div className="fixed inset-0 z-50 bg-navy-dark/95 flex items-center justify-center">
            <div className="glass-card p-6 max-w-2xl w-full">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-white">
                  {channelTypes.find(c => c.id === activeChannel)?.name} Content
                </h2>
                <Button variant="ghost" size="sm" onClick={() => setActiveChannel(null)}>
                  <X size={20} />
                </Button>
              </div>
              
              <div className="mb-6">
                <h3 className="text-white font-medium mb-3">Content Details</h3>
                <Textarea 
                  placeholder="Describe your content here..." 
                  className="min-h-[100px] bg-navy-light text-white border-white/20 focus:border-electric-blue"
                />
              </div>
              
              <div className="flex justify-end gap-3">
                <Button variant="outline" className="border-white/20 text-white" onClick={() => setActiveChannel(null)}>
                  Cancel
                </Button>
                <Button className="bg-electric-blue hover:bg-electric-blue/90">
                  Save to Timeline
                </Button>
              </div>
            </div>
          </div>
        )}
        
        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <Link to="/project/launch">
            <Button variant="outline" className="border-white/20 text-white flex items-center gap-2">
              <ArrowLeft size={16} />
              Back to Launch
            </Button>
          </Link>
          
          <Link to="/project/scaling">
            <Button className="bg-electric-purple hover:bg-electric-purple/90 flex items-center gap-2">
              Next: Scaling & Operations
              <ArrowLeft size={16} className="rotate-180" />
            </Button>
          </Link>
        </div>
      </div>
      
      <AiAgent />
    </div>
  );
};

export default MarketingFeedback;

// Missing Search icon definition
function Search(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}
