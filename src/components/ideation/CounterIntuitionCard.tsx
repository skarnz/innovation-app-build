import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

// Provocative prompts to challenge assumptions
const counterIntuitionPrompts = [
  "What if your primary target audience is actually the *wrong* one?",
  "How could this idea become 10x *worse*? What does that tell you?",
  "If you had to launch this tomorrow with $0 budget, what would it look like?",
  "What existing successful product could you combine with this idea to make it absurd?",
  "Imagine your biggest competitor launches this exact idea. How do you pivot?",
  "What would make users actively *hate* this product?",
  "How would this idea work if it had to be entirely offline?",
  "If you could only keep one feature, which one is it and why?",
  "What's the most unethical way this product could be used? How can you prevent it?",
  "How could this idea be applied in a completely different industry?",
  "What if the core problem you're solving doesn't actually exist?",
  "Assume your initial idea is fundamentally flawed. What's plan B?",
  "What if this needed to serve children under 10? How would it change?",
  "How can you make this idea *more* complicated instead of less?",
  "What technology from 20 years ago could surprisingly enhance this idea?"
];

const CounterIntuitionCard: React.FC = () => {
  const [currentPrompt, setCurrentPrompt] = useState<string>('');

  const getRandomPrompt = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * counterIntuitionPrompts.length);
    setCurrentPrompt(counterIntuitionPrompts[randomIndex]);
  }, []);

  // Set initial prompt on mount
  useEffect(() => {
    getRandomPrompt();
  }, [getRandomPrompt]);

  return (
    <Card className="glass-card">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium">3. Challenge Assumptions</CardTitle>
         <Button variant="ghost" size="icon" onClick={getRandomPrompt} aria-label="Refresh Prompt">
           <RefreshCw className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground italic">
          "{currentPrompt}"
        </p>
      </CardContent>
    </Card>
  );
};

export default CounterIntuitionCard; 