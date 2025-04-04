import { useState, useRef, useEffect } from 'react';
import { Bot, ChevronDown, ChevronUp, Maximize2, Minimize2, SendHorizontal, X, FileText, FolderOpen, Save, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { getAiReply } from '@/lib/api';

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
  const [isAgentReplying, setIsAgentReplying] = useState(false);
  
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
  
  const handleSendMessage = async () => {
    if (!input.trim() || isAgentReplying) return;

    const userMessageContent = input;
    setInput('');

    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      type: 'user',
      content: userMessageContent,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);

    setIsAgentReplying(true);

    try {
      // Call the actual API function
      // TODO: Decide what context to send (e.g., last few messages, project ID?)
      const response = await getAiReply(userMessageContent, { history: messages.slice(-5) });

      // Add agent response message
      const agentMessage: Message = {
        id: `agent-${Date.now()}`,
        type: 'agent',
        content: response.reply || 'Sorry, I could not process that.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, agentMessage]);

    } catch (error) {
      console.error("Error getting AI reply:", error);
      // Add an error message to the chat
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        type: 'agent',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
       toast({
          variant: "destructive",
          title: "AI Error",
          description: "Could not get a response from the assistant.",
      })
    } finally {
      setIsAgentReplying(false);
    }
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
          className={`fixed right-6 bottom-6 w-[380px] rounded-lg shadow-xl transition-all z-50 bg-navy-darkest/80 backdrop-blur-md border border-navy-medium overflow-hidden ${
            isMinimized ? 'h-14' : 'h-[500px]'
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-3 border-b border-navy-medium bg-navy-dark/80">
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
                            ? 'bg-electric-blue text-white'
                            : 'bg-navy-light text-white/90'
                        }`}
                      >
                        <p>{message.content}</p>
                        <div
                          className={`text-xs mt-1 ${
                            message.type === 'user' ? 'text-white/60' : 'text-white/50'
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
                  {isAgentReplying && (
                    <div className="flex justify-start">
                      <div className="max-w-[80%] p-3 rounded-lg bg-navy-light text-white/90 flex items-center">
                         <Loader2 className="h-4 w-4 animate-spin mr-2" />
                         <span>Thinking...</span>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </div>
              
              {/* Document Actions */}
              <div className="border-t border-navy-medium bg-navy-dark/80 p-2">
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
              <div className="p-3 border-t border-navy-medium bg-navy-dark/80">
                <div className="flex items-center gap-2">
                  <Input
                    type="text"
                    placeholder="Ask me anything..."
                    className="flex-1 bg-navy-darkest border border-navy-medium focus:border-electric-blue text-slate-light placeholder:text-slate-dark ring-offset-navy-dark focus-visible:ring-electric-blue rounded-md px-3 py-2 text-sm"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    disabled={isAgentReplying}
                  />
                  <Button
                    size="icon"
                    className="bg-electric-blue hover:bg-electric-blue/80 text-white disabled:opacity-50"
                    onClick={handleSendMessage}
                    disabled={isAgentReplying || !input.trim()}
                  >
                    <SendHorizontal size={18} />
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
