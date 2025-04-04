
import { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Minimize2, Maximize2, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const AIAgent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! I\'m your AI assistant. How can I help with your project today?',
      timestamp: new Date()
    }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen, isMinimized]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: message,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setMessage('');

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `I'll help you with "${message}". What specific information would you like to know?`,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
    }, 1000);
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (isMinimized) setIsMinimized(false);
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  if (!isOpen) {
    return (
      <Button
        className="fixed bottom-6 right-6 rounded-full w-12 h-12 bg-electric-blue shadow-lg hover:bg-electric-blue/90 z-50"
        onClick={toggleChat}
      >
        <MessageSquare size={20} />
      </Button>
    );
  }

  return (
    <div 
      className={cn(
        "fixed bottom-6 right-6 bg-navy-light border border-white/10 rounded-lg shadow-xl z-50 transition-all duration-300 ease-in-out",
        isMinimized ? "w-64 h-14" : "w-80 md:w-96 h-[32rem]"
      )}
    >
      <div className="flex items-center justify-between p-3 border-b border-white/10">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-electric-blue flex items-center justify-center mr-2">
            <MessageSquare size={16} className="text-white" />
          </div>
          <h3 className="font-medium text-white">AI Assistant</h3>
        </div>
        <div className="flex items-center space-x-1">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-7 w-7 hover:bg-white/10 text-white/70"
            onClick={toggleMinimize}
          >
            {isMinimized ? <Maximize2 size={14} /> : <Minimize2 size={14} />}
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-7 w-7 hover:bg-white/10 text-white/70"
            onClick={toggleChat}
          >
            <X size={14} />
          </Button>
        </div>
      </div>

      {!isMinimized && (
        <>
          <div className="p-3 h-[calc(100%-114px)] overflow-y-auto">
            {messages.map((msg) => (
              <div key={msg.id} className={cn(
                "mb-4 max-w-[85%] rounded-lg p-3",
                msg.role === 'user' 
                  ? "bg-electric-blue/20 ml-auto" 
                  : "bg-navy mr-auto"
              )}>
                <p className="text-white text-sm">{msg.content}</p>
                <p className="text-white/40 text-xs mt-1">
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-3 border-t border-white/10">
            <div className="flex">
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ask me anything..."
                className="resize-none bg-navy border-white/20 text-white"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
              />
              <Button 
                className="ml-2 bg-electric-blue hover:bg-electric-blue/90" 
                onClick={handleSendMessage}
              >
                <Send size={16} />
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AIAgent;
