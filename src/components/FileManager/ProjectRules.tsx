
import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';

interface Rule {
  id: string;
  content: string;
}

const ProjectRules = () => {
  const [userRules, setUserRules] = useState<Rule[]>([
    { id: '1', content: '**Use cursor_project_rules as the Knowledge Base**: Always refer to cursor_project_rules to understand the context of the project.' },
    { id: '2', content: '**Verify Information**: Always verify information from the context before presenting it.' },
    { id: '3', content: '**Follow implementation-plan.md for Feature Development**: When implementing a new feature, strictly follow the steps outlined in implementation-plan.md.' },
    { id: '4', content: '**File-by-File Changes**: Make changes file by file and give the user a chance to spot mistakes.' },
    { id: '5', content: '**No Apologies**: Never use apologies.' }
  ]);
  
  const [projectRules, setProjectRules] = useState<Rule[]>([]);
  const [newRule, setNewRule] = useState('');

  const handleAddUserRule = () => {
    if (newRule.trim()) {
      const newRuleObj = {
        id: Date.now().toString(),
        content: newRule.trim()
      };
      setUserRules([...userRules, newRuleObj]);
      setNewRule('');
    }
  };

  const handleAddProjectRule = () => {
    if (newRule.trim()) {
      const newRuleObj = {
        id: Date.now().toString(),
        content: newRule.trim()
      };
      setProjectRules([...projectRules, newRuleObj]);
      setNewRule('');
    }
  };

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="text-2xl font-orbitron text-electric-blue">Rules</CardTitle>
        <p className="text-white/70">
          Rules provide more context to AI models to help them follow your personal preferences and operate more efficiently in your codebase.
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-medium mb-2">User Rules</h3>
            <p className="text-sm text-white/70 mb-4">
              These preferences get sent to the AI on all chats, composers and Command-K sessions.
            </p>
            
            <div className="space-y-3 mb-4">
              {userRules.map((rule, index) => (
                <div key={rule.id} className="p-3 bg-navy-light rounded-md">
                  <div className="flex items-start gap-2">
                    <span className="text-white/70 font-mono">{index + 1}.</span>
                    <div className="text-sm" dangerouslySetInnerHTML={{ __html: rule.content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                  </div>
                </div>
              ))}
            </div>
            
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-1"
              onClick={handleAddUserRule}
            >
              <PlusCircle size={14} /> Add Rule
            </Button>
          </div>
          
          <Separator />
          
          <div>
            <h3 className="text-xl font-medium mb-2">Project Rules</h3>
            <p className="text-sm text-white/70 mb-4">
              Project-specific rules that help the AI understand your codebase and follow your project's conventions. They can be automatically included or fetched by an agent. These are synced with your codebase.
            </p>
            
            {projectRules.length > 0 ? (
              <div className="space-y-3 mb-4">
                {projectRules.map((rule, index) => (
                  <div key={rule.id} className="p-3 bg-navy-light rounded-md">
                    <div className="flex items-start gap-2">
                      <span className="text-white/70 font-mono">{index + 1}.</span>
                      <div className="text-sm" dangerouslySetInnerHTML={{ __html: rule.content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 bg-navy-light/50 rounded-md mb-4">
                <p className="text-sm text-white/60">No project rules found. Click the + button to add a new rule.</p>
              </div>
            )}
            
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-1"
              onClick={handleAddProjectRule}
            >
              <PlusCircle size={14} /> Add Rule
            </Button>
          </div>
          
          <div className="mt-4">
            <label className="block text-sm font-medium text-white/70 mb-2">
              New Rule
            </label>
            <Textarea 
              value={newRule}
              onChange={(e) => setNewRule(e.target.value)}
              placeholder="Enter a new rule... Use ** for bold text."
              className="bg-navy-light border-white/10 mb-2"
            />
            <div className="flex items-center">
              <Input
                type="checkbox"
                className="mr-2 h-4 w-4"
                id="includeFile"
              />
              <label htmlFor="includeFile" className="text-sm text-white/70">
                Include .cursorrules file
              </label>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectRules;
