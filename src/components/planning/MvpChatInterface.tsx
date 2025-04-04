import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2, Send } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import { cn } from '@/lib/utils';

interface Message {
    role: 'user' | 'assistant';
    content: string;
}

interface MvpChatInterfaceProps {
    projectId?: string;
    ideaContext?: string;
}

const MvpChatInterface: React.FC<MvpChatInterfaceProps> = ({ projectId, ideaContext }) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputMessage, setInputMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const scrollAreaRef = useRef<HTMLDivElement>(null);
    const { toast } = useToast();

    const scrollToBottom = () => {
        setTimeout(() => {
            if (scrollAreaRef.current) {
                 const scrollViewport = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
                 if (scrollViewport) {
                     scrollViewport.scrollTop = scrollViewport.scrollHeight;
                 }
            }
        }, 0);
    };

    useEffect(() => {
        // Initial message - consider making this dynamic based on context or first API call
        setMessages([{ role: 'assistant', content: "Let's start drafting your MVP spec. What is the single most important core feature for your initial launch?" }]);
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = async () => {
        if (!inputMessage.trim()) return;

        const newUserMessage: Message = { role: 'user', content: inputMessage };
        setMessages(prev => [...prev, newUserMessage]);
        const currentInput = inputMessage;
        setInputMessage('');
        setIsLoading(true);
        scrollToBottom();

        try {
            console.log('Sending to /api/mvp-chat:', { message: currentInput, history: messages, projectId, ideaContext });
            const response = await fetch('/api/mvp-chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    message: currentInput, 
                    history: messages, 
                    projectId, 
                    ideaContext: ideaContext || "No idea context provided for chat." 
                }),
            });

            const data = await response.json();

            if (!response.ok || !data.success) {
                throw new Error(data.message || 'Failed to get chat reply');
            }

            const assistantReply: Message = { role: 'assistant', content: data.reply };
            setMessages(prev => [...prev, assistantReply]);

        } catch (err: any) {
            console.error("Error in MVP chat:", err);
            toast({ title: "Error", description: err.message || "Failed to get reply.", variant: "destructive" });
            setMessages(prev => [...prev, { role: 'assistant', content: `Error: ${err.message || "Could not get reply."}` }]);
        } finally {
            setIsLoading(false);
            scrollToBottom(); 
        }
    };

    return (
        <Card className="glass-card w-full h-[600px] flex flex-col">
            <CardHeader>
                <CardTitle>Draft MVP Specification (AI Assisted)</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col p-0">
                <ScrollArea className="flex-grow p-4" ref={scrollAreaRef}>
                    <div className="space-y-4">
                        {messages.map((msg, index) => (
                            <div key={index} className={cn(
                                "flex",
                                msg.role === 'user' ? 'justify-end' : 'justify-start'
                            )}>
                                <div className={cn(
                                    "p-3 rounded-lg max-w-[75%] whitespace-pre-wrap",
                                    msg.role === 'user' ? 'bg-electric-blue text-white' : 'bg-muted'
                                )}>
                                    {msg.content}
                                </div>
                            </div>
                        ))}
                         {isLoading && (
                             <div className="flex justify-start">
                                 <div className="p-3 rounded-lg bg-muted animate-pulse">
                                     Thinking...
                                 </div>
                             </div>
                        )}
                    </div>
                </ScrollArea>
                <div className="p-4 border-t border-border">
                    <div className="flex gap-2">
                        <Input 
                            placeholder="Type your message..."
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && !isLoading && handleSendMessage()}
                            disabled={isLoading}
                        />
                        <Button onClick={handleSendMessage} disabled={isLoading || !inputMessage.trim()} size="icon">
                            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default MvpChatInterface; 