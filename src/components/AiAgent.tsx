
import { useState, useRef, useEffect } from 'react';
import { Bot, ChevronDown, ChevronUp, Maximize2, Minimize2, SendHorizontal, X, FileText, FolderOpen, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';

type Message = {
  id: string;
  type: 'user' | 'agent';
  content: string;
  timestamp: Date;
};

const AiAgent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'agent',
      content: 'Hi there! I\'m your BUILD assistant. How can I help you today?',
      timestamp: new Date()
    }
  ]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  const toggleOpen = () => {
    setIsOpen(!isOpen);
    if (isMinimized) setIsMinimized(false);
  };
  
  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };
  
  const handleSendMessage = () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      type: 'user',
      content: input,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    
    // Simulate AI response after a short delay
    setTimeout(() => {
      const botResponses = [
        "I'm analyzing that for you now. Let me check our data sources.",
        "Great question! Here's what I found based on your project context.",
        "I can help with that. Would you like me to create a survey for this?",
        "Based on market data, I would recommend focusing on these areas first.",
        "I've processed your request. Would you like me to show some visualization options?"
      ];
      
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      
      const botMessage: Message = {
        id: `agent-${Date.now()}`,
        type: 'agent',
        content: randomResponse,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };
  
  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);
  
  // Handle Enter key to send message
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };
  
  // Position the window within viewport on resize
  useEffect(() => {
    const handleResize = () => {
      if (chatContainerRef.current) {
        const rect = chatContainerRef.current.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        
        if (rect.right > viewportWidth) {
          chatContainerRef.current.style.left = `${viewportWidth - rect.width - 20}px`;
        }
        
        if (rect.bottom > viewportHeight) {
          chatContainerRef.current.style.top = `${viewportHeight - rect.height - 20}px`;
        }
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isOpen]);

  // Actions
  const handleOpenFile = () => {
    toast({
      description: "File browser opened. Select a file to work with.",
    });
  };

  const handleInsertText = () => {
    toast({
      description: "Text has been inserted into the current document.",
    });
  };

  const handleSaveDocument = () => {
    toast({
      description: "Document has been saved successfully!",
    });
  };
  
  return (
    <>
      {/* AI Agent Button */}
      <button
        className={`fixed right-6 bottom-6 w-14 h-14 rounded-full flex items-center justify-center transition-all z-50 ${
          isOpen ? 'bg-transparent' : 'bg-electric-blue shadow-glow-blue'
        }`}
        onClick={toggleOpen}
        aria-label="AI Assistant"
      >
        {!isOpen && <Bot className="text-white" size={24} />}
      </button>
      
      {/* AI Agent Window */}
      {isOpen && (
        <div
          ref={chatContainerRef}
          className={`fixed right-6 bottom-6 w-[380px] rounded-lg shadow-xl transition-all z-50 glass-card border border-white/20 overflow-hidden ${
            isMinimized ? 'h-14' : 'h-[500px]'
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-3 border-b border-white/10 bg-navy-light">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-electric-blue flex items-center justify-center">
                <Bot size={18} className="text-white" />
              </div>
              <div>
                <h3 className="font-medium text-white">BUILD Assistant</h3>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-green-400"></div>
                  <span className="text-white/60 text-xs">Online</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-1">
              <button
                onClick={toggleMinimize}
                className="p-1 text-white/60 hover:text-white rounded-md"
              >
                {isMinimized ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </button>
              
              <button
                onClick={toggleOpen}
                className="p-1 text-white/60 hover:text-white rounded-md"
              >
                <X size={18} />
              </button>
            </div>
          </div>
          
          {/* Chat Body */}
          {!isMinimized && (
            <>
              <div className="flex-grow p-4 overflow-y-auto h-[calc(500px-170px)]">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] p-3 rounded-lg ${
                          message.type === 'user'
                            ? 'bg-electric-blue/20 text-white'
                            : 'bg-navy-light/80 text-white/90'
                        }`}
                      >
                        <p>{message.content}</p>
                        <div
                          className={`text-xs mt-1 ${
                            message.type === 'user' ? 'text-white/50' : 'text-white/40'
                          }`}
                        >
                          {message.timestamp.toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </div>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </div>
              
              {/* Document Actions */}
              <div className="border-t border-white/10 bg-navy-dark/30 p-2">
                <div className="flex justify-between items-center">
                  <div className="text-xs text-white/50 ml-2">Document Actions</div>
                  <div className="flex gap-1">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-white/70 hover:text-white hover:bg-white/10"
                      onClick={handleOpenFile}
                      title="Open File"
                    >
                      <FileText size={16} />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-white/70 hover:text-white hover:bg-white/10"
                      onClick={handleOpenFile}
                      title="Browse Files"
                    >
                      <FolderOpen size={16} />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-white/70 hover:text-white hover:bg-white/10"
                      onClick={handleInsertText}
                      title="Insert Text to Document"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 10h18M6 14h12M9 18h6"/></svg>
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-white/70 hover:text-white hover:bg-white/10"
                      onClick={handleSaveDocument}
                      title="Save Document"
                    >
                      <Save size={16} />
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* Input Area */}
              <div className="p-3 border-t border-white/10">
                <div className="flex">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask me anything..."
                    className="resize-none bg-navy border-white/20 text-white"
                    onKeyDown={handleKeyDown}
                  />
                  <Button 
                    className="ml-2 bg-electric-blue hover:bg-electric-blue/90" 
                    onClick={handleSendMessage}
                  >
                    <SendHorizontal size={16} />
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default AiAgent;
