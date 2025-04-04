import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import Navbar from '@/components/Navbar';

const Index = () => {
  const isMobile = useIsMobile();
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  return (
    <div className="bg-navy min-h-screen overflow-x-hidden">
      <Navbar />
      
      <header className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0">
          <video 
            src="/bg-video.mp4" 
            autoPlay 
            loop 
            muted 
            className="w-full h-full object-cover" 
          />
          <div className="absolute inset-0 bg-navy opacity-80"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="font-orbitron text-5xl md:text-6xl lg:text-7xl font-bold text-gradient mb-4">
            Unleash Your Entrepreneurial Vision
          </h1>
          <p className="text-white/80 text-lg md:text-xl lg:text-2xl mb-8">
            Build your startup with AI-powered tools and a guided, step-by-step process.
          </p>
          <div className="flex justify-center">
            <Link to="/project/setup" className="btn-primary">
              Get Started
            </Link>
            <Link to="/dashboard" className="btn-primary">
              Go to Dashboard
            </Link>
          </div>
        </div>
      </header>
      
      <section id="features" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="font-orbitron text-4xl font-bold text-white text-center mb-12">
            Key Features
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="glass-card p-6">
              <h3 className="text-xl font-semibold text-white mb-2">AI-Powered Assistance</h3>
              <p className="text-white/70">
                Get guidance and insights from our AI assistant at every stage of your startup journey.
              </p>
            </div>
            
            <div className="glass-card p-6">
              <h3 className="text-xl font-semibold text-white mb-2">Step-by-Step Guidance</h3>
              <p className="text-white/70">
                Follow our structured process to ideate, validate, build, and launch your product.
              </p>
            </div>
            
            <div className="glass-card p-6">
              <h3 className="text-xl font-semibold text-white mb-2">Integrated Toolset</h3>
              <p className="text-white/70">
                Access a suite of tools for market research, prototyping, MVP development, and more.
              </p>
            </div>
            
            <div className="glass-card p-6">
              <h3 className="text-xl font-semibold text-white mb-2">Community Support</h3>
              <p className="text-white/70">
                Connect with fellow entrepreneurs, share ideas, and get feedback on your project.
              </p>
            </div>
            
            <div className="glass-card p-6">
              <h3 className="text-xl font-semibold text-white mb-2">Progress Tracking</h3>
              <p className="text-white/70">
                Monitor your progress and stay on track with clear milestones and actionable tasks.
              </p>
            </div>
            
            <div className="glass-card p-6">
              <h3 className="text-xl font-semibold text-white mb-2">Resource Library</h3>
              <p className="text-white/70">
                Access a curated collection of resources, templates, and guides to help you succeed.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <section id="about" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="font-orbitron text-4xl font-bold text-white text-center mb-12">
            About BUILD
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <p className="text-white/70 mb-4">
                BUILD is a platform designed to empower entrepreneurs and solopreneurs to bring their ideas to life. We provide a comprehensive set of tools, resources, and guidance to help you navigate the complexities of building a startup.
              </p>
              <p className="text-white/70 mb-4">
                Our AI-powered assistant is here to support you every step of the way, from ideation to launch. Whether you're a seasoned entrepreneur or just starting out, BUILD has everything you need to succeed.
              </p>
            </div>
            
            <div>
              <img 
                src="/about-image.jpg" 
                alt="About BUILD" 
                className="rounded-lg shadow-lg" 
              />
            </div>
          </div>
        </div>
      </section>
      
      <footer className="py-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-white/60">
            &copy; {new Date().getFullYear()} BUILD. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
