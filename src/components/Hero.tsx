
import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import BuildLogo from './BuildLogo';
import { useIsMobile } from '@/hooks/use-mobile';
import { ArrowDown, ArrowRight, MessageSquare } from 'lucide-react';

const Hero = () => {
  const isMobile = useIsMobile();
  const [isVisible, setIsVisible] = useState(false);
  const [ideaInput, setIdeaInput] = useState('');
  const [needIdeaInput, setNeedIdeaInput] = useState('');
  const [isTypingIdea, setIsTypingIdea] = useState(false);
  const [isTypingNeedIdea, setIsTypingNeedIdea] = useState(false);
  const navigate = useNavigate();
  const ideaInputRef = useRef<HTMLInputElement>(null);
  const needIdeaInputRef = useRef<HTMLInputElement>(null);
  const startInputRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Trigger animations after component mounts
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleIdeaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (ideaInput.trim()) {
      navigate('/project/discovery', { state: { idea: ideaInput, type: 'have-idea' } });
    }
  };
  
  const handleNeedIdeaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (needIdeaInput.trim()) {
      navigate('/project/discovery', { state: { idea: needIdeaInput, type: 'need-idea' } });
    }
  };
  
  const handleIdeaFocus = () => {
    setIsTypingIdea(true);
  };
  
  const handleNeedIdeaFocus = () => {
    setIsTypingNeedIdea(true);
  };

  const scrollToInput = () => {
    startInputRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  return (
    <section className="min-h-screen pt-32 pb-20 flex flex-col justify-center items-center relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Small chip with text above logo */}
          <div 
            className={`inline-block px-4 py-1.5 rounded-full bg-electric-blue/10 border border-electric-blue/30 mb-8 transition-all duration-1000 ${
              isVisible ? 'opacity-100 transform-none' : 'opacity-0 -translate-y-4'
            }`}
          >
            <span className="text-electric-blue text-sm font-medium">
              Introducing The Ultimate Idea Hub
            </span>
          </div>
          
          {/* BUILD Logo */}
          <div 
            className={`transition-all duration-1000 ${
              isVisible ? 'opacity-100 transform-none' : 'opacity-0 scale-95'
            }`}
          >
            <BuildLogo />
          </div>
          
          {/* Subheadline description */}
          <p 
            className={`mt-8 text-lg sm:text-xl md:text-2xl text-white/70 max-w-2xl mx-auto transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 transform-none' : 'opacity-0 translate-y-4'
            }`}
          >
            The ultimate platform for entrepreneurs to brainstorm, validate, and launch groundbreaking ideas.
          </p>
          
          {/* Chat windows for idea input */}
          <div 
            ref={startInputRef}
            className={`mt-10 flex flex-col md:flex-row justify-center items-stretch gap-6 transition-all duration-1000 delay-500 ${
              isVisible ? 'opacity-100 transform-none' : 'opacity-0 translate-y-4'
            }`}
          >
            {/* I have an idea chat window */}
            <div className="glass-card p-4 flex-1 flex flex-col">
              <div className="flex items-center gap-2 mb-3">
                <MessageSquare size={18} className="text-electric-blue" />
                <h3 className="text-white font-medium">I have an idea</h3>
              </div>
              <form onSubmit={handleIdeaSubmit} className="flex-1 flex flex-col">
                <div className="relative flex-1 mb-3">
                  <input
                    ref={ideaInputRef}
                    type="text"
                    value={ideaInput}
                    onChange={(e) => setIdeaInput(e.target.value)}
                    onFocus={handleIdeaFocus}
                    className="bg-navy-light/50 text-white placeholder-white/40 border border-white/10 rounded-md px-4 py-3 w-full h-20 focus:border-electric-blue focus:outline-none transition-colors"
                    placeholder={isTypingIdea ? "" : "Tell us about your idea..."}
                  />
                </div>
                <button 
                  type="submit" 
                  className="relative inline-flex items-center justify-center gap-2 group overflow-hidden w-full h-12 transform -skew-x-12"
                  disabled={!ideaInput.trim()}
                >
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-electric-blue/80 to-electric-purple/80 opacity-90 hover:opacity-100 transition-opacity"></span>
                  <span className="relative text-white font-medium skew-x-12 flex items-center justify-center gap-2 w-full">
                    Get Started
                    <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </button>
              </form>
            </div>
            
            {/* I need an idea chat window */}
            <div className="glass-card p-4 flex-1 flex flex-col">
              <div className="flex items-center gap-2 mb-3">
                <MessageSquare size={18} className="text-electric-purple" />
                <h3 className="text-white font-medium">I need an idea</h3>
              </div>
              <form onSubmit={handleNeedIdeaSubmit} className="flex-1 flex flex-col">
                <div className="relative flex-1 mb-3">
                  <input
                    ref={needIdeaInputRef}
                    type="text"
                    value={needIdeaInput}
                    onChange={(e) => setNeedIdeaInput(e.target.value)}
                    onFocus={handleNeedIdeaFocus}
                    className="bg-navy-light/50 text-white placeholder-white/40 border border-white/10 rounded-md px-4 py-3 w-full h-20 focus:border-electric-purple focus:outline-none transition-colors"
                    placeholder={isTypingNeedIdea ? "" : "What are you interested in?"}
                  />
                </div>
                <button 
                  type="submit" 
                  className="relative inline-flex items-center justify-center gap-2 group overflow-hidden w-full h-12 transform -skew-x-12"
                  disabled={!needIdeaInput.trim()}
                >
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-electric-purple/80 to-electric-blue/80 opacity-90 hover:opacity-100 transition-opacity"></span>
                  <span className="relative text-white font-medium skew-x-12 flex items-center justify-center gap-2 w-full">
                    Generate Ideas
                    <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </button>
              </form>
            </div>
          </div>
        </div>
        
        {/* Abstract decorative elements */}
        <div className="absolute top-1/4 -left-20 w-64 h-64 rounded-full bg-electric-blue/10 blur-[100px] animate-pulse-glow"></div>
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 rounded-full bg-electric-purple/10 blur-[120px] animate-pulse-glow animation-delay-1000"></div>
      </div>
      
      {/* Scroll indicator */}
      <div 
        className={`absolute bottom-12 left-1/2 -translate-x-1/2 transition-all duration-1000 delay-1000 ${
          isVisible ? 'opacity-100 transform-none' : 'opacity-0 translate-y-4'
        }`}
      >
        <div className="flex flex-col items-center gap-3">
          <span className="text-white/80 text-base uppercase tracking-wider font-semibold">Scroll Down</span>
          <div className="w-10 h-16 rounded-full border-2 border-white/30 flex justify-center">
            <div className="w-3 h-5 bg-white/60 rounded-full animate-float mt-2"></div>
          </div>
          <ArrowDown className="text-white/60 animate-bounce mt-1" size={28} />
        </div>
      </div>
    </section>
  );
};

export default Hero;
