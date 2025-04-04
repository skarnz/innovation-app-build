
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Search, BookOpen, PlayCircle, MessageCircle, FileText, Lightbulb, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AiAgent from '@/components/AiAgent';

const Support = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const supportCategories = [
    {
      icon: <BookOpen size={24} className="text-electric-blue" />,
      title: "Getting Started",
      description: "Learn the basics and set up your first project",
      links: [
        { title: "Quick Start Guide", url: "/support/getting-started" },
        { title: "Project Setup", url: "/support/project-setup" },
        { title: "Understanding the Dashboard", url: "/support/dashboard" }
      ]
    },
    {
      icon: <FileText size={24} className="text-electric-blue" />,
      title: "Documentation",
      description: "Comprehensive guides for all features",
      links: [
        { title: "File Management", url: "/support/file-management" },
        { title: "AI Assistant", url: "/support/ai-assistant" },
        { title: "Project Phases", url: "/support/phases" }
      ]
    },
    {
      icon: <PlayCircle size={24} className="text-electric-blue" />,
      title: "Tutorial Videos",
      description: "Visual guides for key features",
      links: [
        { title: "Building Your First MVP", url: "/support/video/mvp" },
        { title: "Prototype Creation", url: "/support/video/prototype" },
        { title: "Launching Your Product", url: "/support/video/launch" }
      ]
    },
    {
      icon: <MessageCircle size={24} className="text-electric-blue" />,
      title: "Community & Support",
      description: "Get help from our team and community",
      links: [
        { title: "Community Forum", url: "/support/community" },
        { title: "Contact Support", url: "/support/contact" },
        { title: "FAQ", url: "/support/faq" }
      ]
    }
  ];
  
  const quickHelp = [
    {
      icon: <Lightbulb size={20} className="text-yellow-400" />,
      title: "How to validate my idea?",
      url: "/support/validation-guide"
    },
    {
      icon: <FileText size={20} className="text-green-400" />,
      title: "Creating effective MVP specifications",
      url: "/support/mvp-guide"
    },
    {
      icon: <HelpCircle size={20} className="text-purple-400" />,
      title: "Troubleshooting file management",
      url: "/support/troubleshooting"
    }
  ];
  
  return (
    <div className="min-h-screen bg-navy pb-20">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <div className="flex items-center gap-2 text-white/60 mb-4">
            <Link to="/dashboard" className="hover:text-white flex items-center gap-1">
              <ArrowLeft size={16} />
              Back to Dashboard
            </Link>
            <span>/</span>
            <span>Support Documentation</span>
          </div>
          
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-orbitron font-bold text-electric-blue mb-2">
                Support Documentation
              </h1>
              <p className="text-white/70">
                Find guides, tutorials, and help for your BUILD journey
              </p>
            </div>
            
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40" size={16} />
              <Input
                type="text"
                placeholder="Search documentation..."
                className="pl-9 bg-navy-light/50 text-white border-white/20 focus:border-electric-blue w-[200px] md:w-[300px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          {/* Support Categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {supportCategories.map((category, index) => (
              <div key={index} className="glass-card p-6 transition-all hover:shadow-glow-blue">
                <div className="flex items-center gap-3 mb-4">
                  {category.icon}
                  <h2 className="text-xl font-medium text-white">{category.title}</h2>
                </div>
                <p className="text-white/70 mb-4">{category.description}</p>
                <ul className="space-y-2">
                  {category.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a 
                        href={link.url} 
                        className="text-electric-blue hover:underline text-sm flex items-center gap-1"
                      >
                        <span>→</span> {link.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          {/* Popular Articles Section */}
          <div className="mb-10">
            <h2 className="text-2xl font-orbitron font-bold text-white mb-6">Popular Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="glass-card p-6">
                <h3 className="text-lg font-medium text-white mb-3">Getting Started with BUILD</h3>
                <p className="text-white/70 mb-4">
                  A comprehensive guide to setting up your first project and understanding the BUILD platform.
                </p>
                <Button className="bg-electric-blue hover:bg-electric-blue/90 w-full">
                  Read Article
                </Button>
              </div>
              
              <div className="glass-card p-6">
                <h3 className="text-lg font-medium text-white mb-3">Prototype Creation Guide</h3>
                <p className="text-white/70 mb-4">
                  Learn how to create effective prototypes for your product using our integrated tools.
                </p>
                <Button className="bg-electric-blue hover:bg-electric-blue/90 w-full">
                  Read Article
                </Button>
              </div>
              
              <div className="glass-card p-6">
                <h3 className="text-lg font-medium text-white mb-3">Maximizing the AI Assistant</h3>
                <p className="text-white/70 mb-4">
                  Tips and tricks for getting the most out of your AI assistant throughout your project.
                </p>
                <Button className="bg-electric-blue hover:bg-electric-blue/90 w-full">
                  Read Article
                </Button>
              </div>
            </div>
          </div>
          
          {/* Quick Help Section */}
          <div>
            <h2 className="text-2xl font-orbitron font-bold text-white mb-6">Quick Help</h2>
            <div className="glass-card p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium text-white mb-3">Common Questions</h3>
                  <ul className="space-y-3">
                    {quickHelp.map((item, index) => (
                      <li key={index}>
                        <a href={item.url} className="flex items-center gap-2 text-white/80 hover:text-white">
                          {item.icon}
                          <span>{item.title}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-white mb-3">Need More Help?</h3>
                  <p className="text-white/70 mb-4">
                    Can't find what you're looking for? Reach out to our support team or community.
                  </p>
                  <div className="flex flex-col gap-3">
                    <Button className="bg-electric-blue hover:bg-electric-blue/90 w-full">
                      Contact Support
                    </Button>
                    <Button variant="outline" className="border-white/20 text-white w-full">
                      Join Community
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <AiAgent />
    </div>
  );
};

export default Support;
