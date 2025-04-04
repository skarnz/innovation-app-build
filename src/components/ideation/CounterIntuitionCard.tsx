import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb, RefreshCw } from 'lucide-react';

// Pool of counter-intuitive prompts
const prompts = [
  "What if your target audience is completely wrong?",
  "How would this idea work with zero budget?",
  "What's the most boring, unsexy version of this idea?",
  "If this idea failed spectacularly, what would be the main reason?",
  "How could you make this product 10x more complicated?",
  "What if the core problem you're solving doesn't actually exist?",
  "Imagine the opposite of your solution. What benefits does it have?",
  "What existing, successful product is this idea trying to kill? Why won't it work?",
  "How would you design this for people who absolutely hate your product category?",
  "If you had to launch this tomorrow, what single feature would you build?"
];

const CounterIntuitionCard: React.FC = () => {
  const [currentPrompt, setCurrentPrompt] = useState<string>("");

  const getRandomPrompt = () => {
    const randomIndex = Math.floor(Math.random() * prompts.length);
    // Ensure the new prompt is different from the current one, if possible
    let newPrompt = prompts[randomIndex];
    if (prompts.length > 1 && newPrompt === currentPrompt) {
      return getRandomPrompt(); // Try again
    }
    return newPrompt;
  };

  // Set initial prompt on mount
  useEffect(() => {
    setCurrentPrompt(getRandomPrompt());
  }, []);

  const handleRefreshPrompt = () => {
    setCurrentPrompt(getRandomPrompt());
  };

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb size={18} className="text-yellow-400" />
          Counter-Intuition Prompt
        </CardTitle>
        <CardDescription>
          Challenge your assumptions with a thought-provoking question.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-lg font-medium text-white/90 min-h-[60px] flex items-center justify-center text-center">
          {currentPrompt}
        </p>
        <Button variant="outline" onClick={handleRefreshPrompt} className="w-full border-white/20 text-white">
          <RefreshCw className="mr-2 h-4 w-4" />
          New Prompt
        </Button>
      </CardContent>
    </Card>
  );
};

export default CounterIntuitionCard; 